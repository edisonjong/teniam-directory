'use server';

import { slugify } from '@/lib/utils';
import type { Category, CoreTechnologies, Tag } from '@/sanity.types';
import { sanityClient } from '@/sanity/lib/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { deepseek } from '@ai-sdk/deepseek';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import mql from '@microlink/mql';

/**
 * Website info schema - Mini Review Format
 *
 * 1. when AI generates the image and icon, it will return the image URL and icon URL
 * 2. when the image and icon are uploaded to Sanity, the image reference Id and icon reference Id will be set to the image and icon
 * 3. when this server action is called, it will return the image url and icon url, and the image reference Id and icon reference Id
 */
const PricingSnapshotSchema = z.object({
  free_plan: z.enum(['yes', 'no', 'unknown']).default('unknown').describe('Whether a free plan is available'),
  trial: z.enum(['yes', 'no', 'unknown']).default('unknown').describe('Whether a trial is available'),
  paid: z.enum(['yes', 'no', 'unknown']).default('unknown').describe('Whether paid plans are available'),
  notes: z.string().default('').optional().describe('Short and cautious pricing notes (avoid guessing)'),
});

const AlternativeSchema = z.object({
  name: z.string().default('').describe('Name of the alternative tool'),
  best_for_reason: z.string().default('').describe('Why this alternative is best for specific use cases'),
});

const FAQSchema = z.object({
  question: z.string().default('').describe('FAQ question'),
  answer: z.string().default('').describe('FAQ answer'),
});

const WebsiteInfoSchema = z.object({
  name: z.string().default('Tool').describe('Tool name'),
  one_liner: z
    .string()
    .max(90)
    .default('')
    .describe('Outcome-based tagline, max 90 characters'),
  what_it_does: z
    .string()
    .default('')
    .describe('2-3 lines in plain English explaining what the tool does (no buzzwords)'),
  best_for: z
    .array(z.string())
    .min(0)
    .max(10)
    .default([])
    .describe('3 bullets describing who this tool is best for (flexible count)'),
  key_features: z
    .array(z.string())
    .min(0)
    .max(10)
    .default([])
    .describe('5 bullets with specific, not generic features (flexible count)'),
  pros: z
    .array(z.string())
    .min(0)
    .max(10)
    .default([])
    .describe('3 bullets with pros/advantages (flexible count)'),
  cons: z
    .array(z.string())
    .min(0)
    .max(10)
    .default([])
    .describe('2 bullets with cons/limitations (flexible count)'),
  pricing_snapshot: PricingSnapshotSchema.default({
    free_plan: 'unknown',
    trial: 'unknown',
    paid: 'unknown',
    notes: '',
  }).describe('Pricing information'),
  setup_time: z
    .enum(['5 min', '30 min', '1–2 hours', 'varies'])
    .default('varies')
    .describe('Estimated setup time'),
  learning_curve: z
    .enum(['easy', 'medium', 'advanced'])
    .default('medium')
    .describe('Learning curve difficulty'),
  use_this_if: z
    .array(z.string())
    .min(0)
    .max(10)
    .default([])
    .describe('2 bullets describing when to use this tool (flexible count)'),
  skip_this_if: z
    .array(z.string())
    .min(0)
    .max(10)
    .default([])
    .describe('2 bullets describing when to skip this tool (flexible count)'),
  alternatives: z
    .array(AlternativeSchema)
    .min(0)
    .max(10)
    .default([])
    .describe('3 alternative tools with name and best_for_reason (flexible count)'),
  faq: z
    .array(FAQSchema)
    .min(0)
    .max(10)
    .default([])
    .describe('3 FAQ items with question and answer (flexible count)'),
  tags: z
    .array(z.string())
    .min(0)
    .max(20)
    .default([])
    .describe('5-8 tags from the available tag list (flexible count)'),
  category: z
    .string()
    .default('')
    .describe('ONE category from the available category list'),
  // Legacy fields for backward compatibility
  description: z
    .string()
    .max(160)
    .default('')
    .optional()
    .describe('One sentence summary (legacy field, can use one_liner)'),
  introduction: z
    .string()
    .default('')
    .optional()
    .describe('Detailed introduction in markdown format (legacy field)'),
  categories: z
    .array(z.string())
    .default([])
    .optional()
    .describe('Array of category names (legacy field, use category instead)'),
  coreTechnologies: z
    .array(z.string())
    .default([])
    .optional()
    .describe('Array of core technologies names'),
  image: z.string().default('').describe('Website screenshot image URL'),
  icon: z.string().default('').describe('Website logo image URL'),
  imageId: z
    .string()
    .optional()
    .describe('Website screenshot image reference Id'),
  iconId: z.string().optional().describe('Website logo image reference Id'),
});

export type ServerActionResponse = {
  status: 'success' | 'error';
  message?: string;
  data?: z.infer<typeof WebsiteInfoSchema>;
};

/**
 * fetch info for the specified url
 */
export async function fetchWebsite(url: string): Promise<ServerActionResponse> {
  try {
    if (!process.env.DEFAULT_AI_PROVIDER) {
      return {
        status: 'error',
        message: 'AI submit is not supported',
      };
    }

    const data = await fetchWebsiteInfo(url);
    if (data === null) {
      return {
        status: 'error',
        message: 'Failed to fetch website info',
      };
    }
    return {
      status: 'success',
      message: 'Successfully fetched website info',
      data,
    };
  } catch (error) {
    console.error('fetchWebsite, fetch website:', url, 'error:', error);
    return {
      status: 'error',
      message: 'Failed to fetch website info',
    };
  }
}

/**
 * fetch website info for the specified url with Microlink and AI SDK
 */
export const fetchWebsiteInfo = async (url: string) => {
  try {
    const fetchedData = await fetchWebsiteInfoWithAI(url);

    // If AI fetch fails, create a minimal fallback structure
    if (fetchedData === null || !fetchedData.object) {
      console.warn('fetchWebsiteInfo, AI fetch failed, using fallback data');
      let fallbackName = 'Tool';
      try {
        const urlObj = new URL(url);
        fallbackName = urlObj.hostname.replace('www.', '').split('.')[0] || 'Tool';
      } catch (urlError) {
        console.warn('fetchWebsiteInfo, URL parsing failed in fallback:', urlError);
      }

      return WebsiteInfoSchema.parse({
        name: fallbackName,
        one_liner: '',
        what_it_does: '',
        best_for: [],
        key_features: [],
        pros: [],
        cons: [],
        pricing_snapshot: {
          free_plan: 'unknown',
          trial: 'unknown',
          paid: 'unknown',
          notes: '',
        },
        setup_time: 'varies',
        learning_curve: 'medium',
        use_this_if: [],
        skip_this_if: [],
        alternatives: [],
        faq: [],
        tags: [],
        category: '',
        description: '',
        introduction: '',
        categories: [],
        coreTechnologies: [],
        image: '',
        icon: `https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=128`,
      });
    }

    // The data from fetchWebsiteInfoWithAI is already mapped and validated
    // Use it directly - no need to re-parse
    const websiteInfo = fetchedData.object;

    // Log summary to verify all fields are populated
    console.log('fetchWebsiteInfo, data summary:', {
      name: websiteInfo.name,
      hasDescription: !!websiteInfo.description,
      hasOneLiner: !!websiteInfo.one_liner,
      hasWhatItDoes: !!websiteInfo.what_it_does,
      hasIntroduction: !!websiteInfo.introduction,
      tagsCount: websiteInfo.tags?.length || 0,
      categoriesCount: websiteInfo.categories?.length || 0,
      coreTechnologiesCount: websiteInfo.coreTechnologies?.length || 0,
      hasImage: !!websiteInfo.image,
      hasIcon: !!websiteInfo.icon,
    });

    // Enrich image/icon with Microlink metadata when missing
    try {
      if (!websiteInfo.image || !websiteInfo.icon) {
        const microlinkResult = await mql(url, {});
        const microlinkData: any = microlinkResult?.data;

        if (!websiteInfo.image && microlinkData?.image?.url) {
          websiteInfo.image = microlinkData.image.url;
        }
        if (!websiteInfo.icon && microlinkData?.logo?.url) {
          websiteInfo.icon = microlinkData.logo.url;
        }
      }
    } catch (microlinkError) {
      console.warn('fetchWebsiteInfo, Microlink enrichment failed, will use placeholder if needed:', microlinkError);
    }

    // Use placeholder.svg as fallback for missing images/icons
    let usingPlaceholderImage = false;
    let usingPlaceholderIcon = false;

    if (!websiteInfo.image || !websiteInfo.icon) {
      try {
        // Fetch placeholder from public folder
        const placeholderUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/placeholder.svg`;
        const placeholderResponse = await fetch(placeholderUrl);

        if (placeholderResponse.ok) {
          const placeholderBuffer = Buffer.from(await placeholderResponse.arrayBuffer());

          // Upload placeholder to Sanity
          const placeholderAsset = await sanityClient.assets.upload('image', placeholderBuffer, {
            filename: 'placeholder.svg',
          });

          if (!websiteInfo.image) {
            websiteInfo.image = placeholderAsset.url;
            websiteInfo.imageId = placeholderAsset._id;
            usingPlaceholderImage = true;
            console.log('fetchWebsiteInfo, using placeholder for image - user can upload their own');
          }
          if (!websiteInfo.icon) {
            websiteInfo.icon = placeholderAsset.url;
            websiteInfo.iconId = placeholderAsset._id;
            usingPlaceholderIcon = true;
            console.log('fetchWebsiteInfo, using placeholder for icon - user can upload their own');
          }
        }
      } catch (placeholderError) {
        console.warn('fetchWebsiteInfo, failed to load placeholder, images will be empty:', placeholderError);
      }
    }

    // Safely fetch and upload actual images with error handling (skip if placeholder was used)
    if (websiteInfo.image && websiteInfo.icon && !usingPlaceholderImage && !usingPlaceholderIcon) {
      try {
        const [iconResponse, imageResponse] = await Promise.allSettled([
          fetch(websiteInfo.icon),
          fetch(websiteInfo.image),
        ]);

        // Only proceed if both fetches succeeded
        if (iconResponse.status === 'fulfilled' && imageResponse.status === 'fulfilled') {
          const iconRes = iconResponse.value;
          const imageRes = imageResponse.value;

          if (iconRes.ok && imageRes.ok) {
            console.log('fetchWebsiteInfo, start fetching icon and image');
            const [iconArrayBuffer, imageArrayBuffer] = await Promise.all([
              iconRes.arrayBuffer(),
              imageRes.arrayBuffer(),
            ]);

            // Convert ArrayBuffer to Buffer for Sanity upload
            const [iconBuffer, imageBuffer] = [
              Buffer.from(iconArrayBuffer),
              Buffer.from(imageArrayBuffer),
            ];

            console.log('fetchWebsiteInfo, start uploading icon and image to sanity');
            // Upload icon and image to sanity with error handling
            try {
              const [iconAsset, imageAsset] = await Promise.all([
                sanityClient.assets.upload('image', iconBuffer, {
                  filename: `${slugify(websiteInfo.name)}_logo.png`,
                }),
                sanityClient.assets.upload('image', imageBuffer, {
                  filename: `${slugify(websiteInfo.name)}_image.png`,
                }),
              ]);

              console.log('fetchWebsiteInfo, url:', url, 'iconAsset:', iconAsset);
              console.log('fetchWebsiteInfo, url:', url, 'imageAsset:', imageAsset);

              websiteInfo.icon = iconAsset.url;
              websiteInfo.image = imageAsset.url;
              websiteInfo.iconId = iconAsset._id;
              websiteInfo.imageId = imageAsset._id;
            } catch (uploadError) {
              console.error('fetchWebsiteInfo, upload error:', uploadError);
              // If upload fails, fallback to placeholder
              if (!websiteInfo.imageId) {
                try {
                  const placeholderUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/placeholder.svg`;
                  const placeholderResponse = await fetch(placeholderUrl);
                  if (placeholderResponse.ok) {
                    const placeholderBuffer = Buffer.from(await placeholderResponse.arrayBuffer());
                    const placeholderAsset = await sanityClient.assets.upload('image', placeholderBuffer, {
                      filename: 'placeholder.svg',
                    });
                    websiteInfo.image = placeholderAsset.url;
                    websiteInfo.imageId = placeholderAsset._id;
                    usingPlaceholderImage = true;
                    console.log('fetchWebsiteInfo, using placeholder for image after upload failure - user can upload their own');
                  }
                } catch (placeholderError) {
                  console.warn('fetchWebsiteInfo, placeholder fallback also failed:', placeholderError);
                }
              }
            }
          } else {
            // If fetch fails, use placeholder
            if (!websiteInfo.imageId) {
              try {
                const placeholderUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/placeholder.svg`;
                const placeholderResponse = await fetch(placeholderUrl);
                if (placeholderResponse.ok) {
                  const placeholderBuffer = Buffer.from(await placeholderResponse.arrayBuffer());
                  const placeholderAsset = await sanityClient.assets.upload('image', placeholderBuffer, {
                    filename: 'placeholder.svg',
                  });
                  websiteInfo.image = placeholderAsset.url;
                  websiteInfo.imageId = placeholderAsset._id;
                  usingPlaceholderImage = true;
                  console.log('fetchWebsiteInfo, using placeholder for image after fetch failure - user can upload their own');
                }
              } catch (placeholderError) {
                console.warn('fetchWebsiteInfo, placeholder fallback failed:', placeholderError);
              }
            }
          }
        }
      } catch (imageError) {
        console.error('fetchWebsiteInfo, image processing error:', imageError);
        // Use placeholder as fallback
        if (!websiteInfo.imageId) {
          try {
            const placeholderUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/placeholder.svg`;
            const placeholderResponse = await fetch(placeholderUrl);
            if (placeholderResponse.ok) {
              const placeholderBuffer = Buffer.from(await placeholderResponse.arrayBuffer());
              const placeholderAsset = await sanityClient.assets.upload('image', placeholderBuffer, {
                filename: 'placeholder.svg',
              });
              websiteInfo.image = placeholderAsset.url;
              websiteInfo.imageId = placeholderAsset._id;
              usingPlaceholderImage = true;
              console.log('fetchWebsiteInfo, using placeholder for image after processing error - user can upload their own');
            }
          } catch (placeholderError) {
            console.warn('fetchWebsiteInfo, placeholder fallback failed:', placeholderError);
          }
        }
      }
    }

    return websiteInfo;
  } catch (error) {
    console.error('fetchWebsiteInfo, unexpected error:', error);
    // Return minimal fallback structure
    let fallbackName = 'Tool';
    try {
      const urlObj = new URL(url);
      fallbackName = urlObj.hostname.replace('www.', '').split('.')[0] || 'Tool';
    } catch (urlError) {
      // If URL parsing fails, use default name
      console.warn('fetchWebsiteInfo, URL parsing failed in fallback:', urlError);
    }

    return WebsiteInfoSchema.parse({
      name: fallbackName,
      one_liner: '',
      what_it_does: '',
      best_for: [],
      key_features: [],
      pros: [],
      cons: [],
      pricing_snapshot: {
        free_plan: 'unknown',
        trial: 'unknown',
        paid: 'unknown',
        notes: '',
      },
      setup_time: 'varies',
      learning_curve: 'medium',
      use_this_if: [],
      skip_this_if: [],
      alternatives: [],
      faq: [],
      tags: [],
      category: '',
      description: '',
      introduction: '',
      categories: [],
      coreTechnologies: [],
      image: '',
      icon: `https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=128`,
    });
  }
};

/**
 * fetch website info for the specified url with AI SDK
 */
export const fetchWebsiteInfoWithAI = async (url: string) => {
  try {
    // Validate URL
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (urlError) {
      console.error('fetchWebsiteInfoWithAI, invalid URL:', url, urlError);
      return null;
    }

    // get all categories and tags with error handling
    let categories: Category[] = [];
    let tags: Tag[] = [];
    let coreTechnologies: CoreTechnologies[] = [];

    try {
      [categories, tags, coreTechnologies] = await Promise.all([
        sanityClient.fetch<Category[]>(`*[_type == "category"]`),
        sanityClient.fetch<Tag[]>(`*[_type == "tag"]`),
        sanityClient.fetch<CoreTechnologies[]>(`*[_type == "coreTechnologies"]`),
      ]);
    } catch (fetchError) {
      console.error('fetchWebsiteInfoWithAI, error fetching categories/tags:', fetchError);
      // Continue with empty arrays
    }

    const availableCategories = (categories || []).map((cat) => cat.name).filter(Boolean);
    const availableTags = (tags || []).map((tag) => tag.name).filter(Boolean);
    const availableCoreTechnologies = (coreTechnologies || []).map((tag) => tag.name).filter(Boolean);

    // Fetch website content with error handling
    let response;
    try {
      response = await fetch(url, {
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      if (!response.ok) {
        console.warn('fetchWebsiteInfoWithAI, non-OK response:', response.status);
      }
    } catch (fetchError) {
      console.error('fetchWebsiteInfoWithAI, error fetching URL:', url, fetchError);
      return null;
    }
    // TODO: we need to convert htmlContent to simple content for AI to analyze (save time and cost)
    // TODO: if the content is too long, error will be thrown, so sometimes AI submit will fail
    // Google Gemini model support more tokens than DeepSeek model, so we prefer Google Gemini model
    // Thanks to Justin3go for the code: https://github.com/MkdirsHQ/mkdirs-template/discussions/50
    let htmlContent = '';
    try {
      htmlContent = (await response.text())
        .replace(/class="[^"]*"/g, '')
        .replace(/<svg[^>]*>.*?<\/svg>/g, '')
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } catch (textError) {
      console.error('fetchWebsiteInfoWithAI, error reading response text:', textError);
      htmlContent = ''; // Continue with empty content
    }

    // Initialize Google GenAI if provider is google
    let googleAI = null;
    if (
      process.env.DEFAULT_AI_PROVIDER === 'google' &&
      process.env.GOOGLE_GENERATIVE_AI_API_KEY !== undefined
    ) {
      googleAI = new GoogleGenerativeAI(
        process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      );
    } else if (
      process.env.DEFAULT_AI_PROVIDER === 'deepseek' &&
      process.env.DEEPSEEK_API_KEY !== undefined
    ) {
      // Keep deepseek using AI SDK for now
      const aiModel = deepseek('deepseek-chat', {
        // structuredOutputs: true,
      });
      // Handle deepseek separately below
    } else if (
      process.env.DEFAULT_AI_PROVIDER === 'openai' &&
      process.env.OPENAI_API_KEY !== undefined
    ) {
      // Keep openai using AI SDK for now
      const aiModel = openai('gpt-4o-mini', {
        structuredOutputs: true,
      });
      // Handle openai separately below
    }

    // If not using Google GenAI, return null (fallback to AI SDK for other providers)
    if (!googleAI && process.env.DEFAULT_AI_PROVIDER === 'google') {
      return null;
    }

    console.log('fetchWebsiteInfoWithAI, using Google GenAI directly');

    // Extract tool name from URL or HTML if possible
    const toolName = urlObj.hostname.replace('www.', '').split('.')[0] || 'Tool';

    // Truncate HTML content to prevent token limit issues
    const maxContentLength = 50000;
    const truncatedContent = htmlContent.length > maxContentLength
      ? htmlContent.substring(0, maxContentLength) + '... (truncated)'
      : htmlContent;

    // Fetch approved alternatives from Sanity (for now, let AI generate them)
    let approvedAlternatives: string[] = [];
    try {
      const tools = await sanityClient.fetch<Array<{ name?: string | null }>>(
        `*[_type == "item" && defined(slug.current) && defined(publishDate) && forceHidden != true][0...20]{ name }`,
      );
      approvedAlternatives = (tools || [])
        .map((tool) => tool.name?.trim())
        .filter((name): name is string => !!name);
    } catch (altError) {
      console.warn('fetchWebsiteInfoWithAI, error fetching approved alternatives:', altError);
    }

    let result;
    try {
      if (googleAI) {
        // Use direct Google GenAI SDK with new mini-review prompt
        const prompt = `You are Newtools.io — a curated tech hub.
Your job is to generate a HIGH-TRUST directory listing that reads like a real human mini review (not generic AI marketing).

IMPORTANT RULES:
- Do NOT invent facts. If something cannot be confirmed from the provided data, write "Not confirmed".
- Do NOT use hype words like "revolutionary", "game-changing", "best ever".
- Write like a practical builder/reviewer: clear, specific, honest.
- Keep sentences short. Avoid fluff.
- Output must be structured and consistent across listings.

CATEGORY RULES:
Choose exactly ONE category from this list:
${availableCategories.length > 0 ? availableCategories.map(cat => `- ${cat}`).join('\n') : '- AI Tools\n- Developer Tools\n- Design Tools\n- Marketing Tools\n- Automation\n- Analytics\n- Hosting & Infra\n- Payments\n- Boilerplates\n- Templates\n- Themes\n- UI Kits\n- Components'}

TAG RULES:
Select 3–6 tags that best match the tool, based on the approved tag list provided by the system.
If no approved tags are provided, generate sensible tags but keep them broad and universal.

PRICING RULES:
Set pricing_model to one of: free, freemium, paid, unknown
Only choose free/freemium/paid if confirmed by the text. Otherwise choose unknown.

ALTERNATIVES RULES (VERY IMPORTANT):
- Alternatives MUST be selected ONLY from the provided list: approved_alternatives
- DO NOT add alternatives from the public web
- Pick exactly 3 relevant alternatives based on the tool type and category
- If the approved_alternatives list is empty or irrelevant, return an empty array []
- Format each as: "Tool Name — 1 short reason"

OUTPUT:
Return ONLY a valid JSON object. No markdown code blocks. No extra text before or after. Start with { and end with }.

CRITICAL: The response must be valid JSON that can be parsed directly with JSON.parse(). Do not wrap in markdown code blocks.

JSON SCHEMA (must match exactly):
{
  "title": "",
  "slug": "",
  "website_url": "",
  "logo_url": null,
  "cover_image_url": null,
  "category": "",
  "tags": [],
  "pricing_model": "",
  "summary": "",
  "quick_take": "",
  "best_for": [],
  "key_features": [],
  "what_its_good_at": [],
  "where_it_breaks": [],
  "real_workflow": [],
  "pros": [],
  "cons": [],
  "alternatives": [],
  "newtools_verdict": "",
  "last_reviewed": ""
}

WRITING GUIDELINES FOR EACH FIELD:
- summary: 140–180 characters, plain English, what it is + who it's for.
- quick_take: 2–4 sentences, honest overview (no hype).
- best_for: exactly 3 bullets.
- key_features: exactly 5 bullets.
- what_its_good_at: 3–5 bullets with specific outcomes.
- where_it_breaks: exactly 2 bullets (honest tradeoffs).
- real_workflow: 4–6 steps (imperative style: "Do X", "Then Y").
- pros: exactly 3 bullets.
- cons: exactly 2 bullets.
- alternatives: exactly 3 items, chosen ONLY from approved_alternatives. Format each as: "Tool Name — 1 short reason"
- newtools_verdict: 2–3 sentences, practical recommendation.
- slug: lowercase, hyphen-separated, based on title.
- last_reviewed: today's date in YYYY-MM-DD format.

Available Tags (select from these, or empty array if none match):
${availableTags.length > 0 ? availableTags.join(', ') : 'None provided'}

Available Core Technologies (select from these, or empty array if none match):
${availableCoreTechnologies.length > 0 ? availableCoreTechnologies.join(', ') : 'None provided'}

Approved Alternatives (choose exactly 3 from this list, or empty array if none match):
${approvedAlternatives.length > 0 ? approvedAlternatives.join(', ') : 'None provided'}

NOW GENERATE THE LISTING FROM THE PROVIDED INPUT DATA.

Tool URL: ${url}
Tool Name: ${toolName}

Content to analyze:
${truncatedContent}`;

        const model = googleAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
        const response = await model.generateContent(prompt);

        // Extract text from response
        const responseText = response.response.text() || '';

        if (!responseText) {
          console.error('fetchWebsiteInfoWithAI, no text in response:', response);
          return null;
        }

        // Parse JSON from response (handle markdown code blocks if present)
        let jsonText = responseText.trim();

        // Remove markdown code blocks if present
        if (jsonText.startsWith('```json')) {
          jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (jsonText.startsWith('```')) {
          jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        // Try to extract JSON if there's extra text
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonText = jsonMatch[0];
        }

        // Parse JSON
        let parsedData;
        try {
          parsedData = JSON.parse(jsonText);
          console.log('fetchWebsiteInfoWithAI, parsed JSON successfully');
          console.log('fetchWebsiteInfoWithAI, parsedData keys:', Object.keys(parsedData));
          console.log('fetchWebsiteInfoWithAI, parsedData sample:', {
            title: parsedData.title,
            summary: parsedData.summary?.substring(0, 50),
            quick_take: parsedData.quick_take?.substring(0, 50),
            tags: parsedData.tags,
            category: parsedData.category,
          });
        } catch (parseError) {
          console.error('fetchWebsiteInfoWithAI, JSON parse error:', parseError);
          console.error('Response text (first 1000 chars):', responseText.substring(0, 1000));
          console.error('Cleaned jsonText (first 500 chars):', jsonText.substring(0, 500));
          return null;
        }

        // Map new mini-review format to existing schema
        // Ensure all arrays are actually arrays and strings are strings
        const mappedData = {
          // Map title to name
          name: String(parsedData.title || parsedData.name || toolName).trim(),

          // Map summary to one_liner and description
          one_liner: String(parsedData.summary || parsedData.one_liner || '').trim(),
          description: String(parsedData.summary || parsedData.description || parsedData.one_liner || '').trim(),

          // Map quick_take to what_it_does
          what_it_does: String(parsedData.quick_take || parsedData.what_it_does || '').trim(),

          // Ensure arrays are arrays and filter out empty values
          best_for: Array.isArray(parsedData.best_for) ? parsedData.best_for.filter((b: any) => b && String(b).trim()) : [],
          key_features: Array.isArray(parsedData.key_features) ? parsedData.key_features.filter((f: any) => f && String(f).trim()) : [],
          pros: Array.isArray(parsedData.pros) ? parsedData.pros.filter((p: any) => p && String(p).trim()) : [],
          cons: Array.isArray(parsedData.cons) ? parsedData.cons.filter((c: any) => c && String(c).trim()) : [],

          // Map pricing_model to pricing_snapshot object
          pricing_snapshot: (() => {
            if (parsedData.pricing_snapshot && typeof parsedData.pricing_snapshot === 'object') {
              return parsedData.pricing_snapshot;
            }
            // Convert pricing_model string to pricing_snapshot object
            const pricingModel = String(parsedData.pricing_model || 'unknown').toLowerCase();
            switch (pricingModel) {
              case 'free':
                return { free_plan: 'yes', trial: 'unknown', paid: 'no', notes: '' };
              case 'freemium':
                return { free_plan: 'yes', trial: 'unknown', paid: 'yes', notes: '' };
              case 'paid':
                return { free_plan: 'no', trial: 'unknown', paid: 'yes', notes: '' };
              case 'unknown':
              default:
                return { free_plan: 'unknown', trial: 'unknown', paid: 'unknown', notes: '' };
            }
          })(),

          setup_time: parsedData.setup_time || 'varies',
          learning_curve: parsedData.learning_curve || 'medium',

          // Map what_its_good_at to use_this_if
          use_this_if: Array.isArray(parsedData.what_its_good_at)
            ? parsedData.what_its_good_at.filter((w: any) => w && String(w).trim())
            : (Array.isArray(parsedData.use_this_if) ? parsedData.use_this_if.filter((u: any) => u && String(u).trim()) : []),

          // Map where_it_breaks to skip_this_if
          skip_this_if: Array.isArray(parsedData.where_it_breaks)
            ? parsedData.where_it_breaks.filter((w: any) => w && String(w).trim())
            : (Array.isArray(parsedData.skip_this_if) ? parsedData.skip_this_if.filter((s: any) => s && String(s).trim()) : []),

          // Map alternatives from string format "Tool Name — reason" to object format
          alternatives: (() => {
            if (!parsedData.alternatives || !Array.isArray(parsedData.alternatives)) {
              return [];
            }
            return parsedData.alternatives
              .filter((alt: any) => alt !== null && alt !== undefined)
              .map((alt: string | { name: string; best_for_reason: string }) => {
                // If already an object, return as is
                if (typeof alt === 'object' && alt !== null && 'name' in alt) {
                  return {
                    name: String(alt.name || '').trim(),
                    best_for_reason: String(alt.best_for_reason || '').trim(),
                  };
                }
                // If string format "Tool Name — reason", parse it
                if (typeof alt === 'string' && alt.trim()) {
                  const [name, ...reasonParts] = alt.split(' — ');
                  return {
                    name: (name || '').trim(),
                    best_for_reason: reasonParts.join(' — ').trim(),
                  };
                }
                return { name: String(alt || '').trim(), best_for_reason: '' };
              })
              .filter((alt: { name: string; best_for_reason: string }) => alt.name.length > 0);
          })(),

          faq: Array.isArray(parsedData.faq) ? parsedData.faq.filter((f: any) => f && typeof f === 'object') : [],
          tags: Array.isArray(parsedData.tags) ? parsedData.tags.filter((t: any) => t && String(t).trim()) : [],
          category: String(parsedData.category || '').trim(),
          categories: Array.isArray(parsedData.categories) ? parsedData.categories.filter((c: any) => c && String(c).trim()) : [],
          coreTechnologies: Array.isArray(parsedData.coreTechnologies) ? parsedData.coreTechnologies.filter((ct: any) => ct && String(ct).trim()) : [],

          // Build introduction from new fields
          introduction: (() => {
            let intro = '';

            if (parsedData.quick_take && String(parsedData.quick_take).trim()) {
              intro += `${String(parsedData.quick_take).trim()}\n\n`;
            }

            if (parsedData.best_for && Array.isArray(parsedData.best_for) && parsedData.best_for.length > 0) {
              const bestForItems = parsedData.best_for.filter((b: any) => b && String(b).trim());
              if (bestForItems.length > 0) {
                intro += `## Best For\n${bestForItems.map((b: string) => `- ${String(b).trim()}`).join('\n')}\n\n`;
              }
            }

            if (parsedData.key_features && Array.isArray(parsedData.key_features) && parsedData.key_features.length > 0) {
              const features = parsedData.key_features.filter((f: any) => f && String(f).trim());
              if (features.length > 0) {
                intro += `## Key Features\n${features.map((f: string) => `- ${String(f).trim()}`).join('\n')}\n\n`;
              }
            }

            if (parsedData.what_its_good_at && Array.isArray(parsedData.what_its_good_at) && parsedData.what_its_good_at.length > 0) {
              const goodAt = parsedData.what_its_good_at.filter((w: any) => w && String(w).trim());
              if (goodAt.length > 0) {
                intro += `## What It's Good At\n${goodAt.map((w: string) => `- ${String(w).trim()}`).join('\n')}\n\n`;
              }
            }

            if (parsedData.where_it_breaks && Array.isArray(parsedData.where_it_breaks) && parsedData.where_it_breaks.length > 0) {
              const breaks = parsedData.where_it_breaks.filter((w: any) => w && String(w).trim());
              if (breaks.length > 0) {
                intro += `## Where It Breaks\n${breaks.map((w: string) => `- ${String(w).trim()}`).join('\n')}\n\n`;
              }
            }

            if (parsedData.real_workflow && Array.isArray(parsedData.real_workflow) && parsedData.real_workflow.length > 0) {
              const workflow = parsedData.real_workflow.filter((step: any) => step && String(step).trim());
              if (workflow.length > 0) {
                intro += `## Real Workflow\n${workflow.map((step: string, idx: number) => `${idx + 1}. ${String(step).trim()}`).join('\n')}\n\n`;
              }
            }

            if (parsedData.pros && Array.isArray(parsedData.pros) && parsedData.pros.length > 0) {
              const pros = parsedData.pros.filter((p: any) => p && String(p).trim());
              if (pros.length > 0) {
                intro += `## Pros\n${pros.map((p: string) => `- ${String(p).trim()}`).join('\n')}\n\n`;
              }
            }

            if (parsedData.cons && Array.isArray(parsedData.cons) && parsedData.cons.length > 0) {
              const cons = parsedData.cons.filter((c: any) => c && String(c).trim());
              if (cons.length > 0) {
                intro += `## Cons\n${cons.map((c: string) => `- ${String(c).trim()}`).join('\n')}\n\n`;
              }
            }

            if (parsedData.newtools_verdict && String(parsedData.newtools_verdict).trim()) {
              intro += `## Newtools Verdict\n${String(parsedData.newtools_verdict).trim()}\n\n`;
            }

            return intro.trim();
          })(),

          image: String(parsedData.cover_image_url || parsedData.image || '').trim(),
          icon: String(parsedData.logo_url || parsedData.icon || '').trim(),
        };

        // Validate against schema - Zod will apply defaults for missing fields
        const validatedData = WebsiteInfoSchema.parse(mappedData);

        // Return in the same format as generateObject for compatibility
        result = {
          object: validatedData,
        };
      } else {
        // Fallback to AI SDK for other providers (deepseek, openai)
        let aiModel = null;
        if (
          process.env.DEFAULT_AI_PROVIDER === 'deepseek' &&
          process.env.DEEPSEEK_API_KEY !== undefined
        ) {
          aiModel = deepseek('deepseek-chat', {});
        } else if (
          process.env.DEFAULT_AI_PROVIDER === 'openai' &&
          process.env.OPENAI_API_KEY !== undefined
        ) {
          aiModel = openai('gpt-4o-mini', {
            structuredOutputs: true,
          });
        }

        if (aiModel === null) {
          return null;
        }

        result = await generateObject({
          model: aiModel,
          schema: WebsiteInfoSchema,
          prompt: `You are writing a mini-review listing for Newtools.io.

Goal:
Create a helpful, non-generic directory entry that looks like a mini review and is SEO-friendly.

Tool URL: ${url}
Tool Name: ${toolName}

Return JSON with the following keys:

- one_liner: outcome-based tagline (max 90 chars)
- what_it_does: 2–3 lines in plain English (no buzzwords)
- best_for: 3 bullets
- key_features: 5 bullets (specific, not generic)
- pros: 3 bullets
- cons: 2 bullets
- pricing_snapshot:
  - free_plan: yes/no/unknown
  - trial: yes/no/unknown
  - paid: yes/no/unknown
  - notes: short and cautious (avoid guessing)
- setup_time: one of [5 min, 30 min, 1–2 hours, varies]
- learning_curve: one of [easy, medium, advanced]
- use_this_if: 2 bullets
- skip_this_if: 2 bullets
- alternatives: 3 items with {name, best_for_reason}
- faq: 3 items with {question, answer}
- tags: 5–8 tags from our tag list
- category: choose ONE from:
  [AI Tools, Developer Tools, Design Tools, Marketing Tools, Automation, Analytics, Hosting & Infra, Payments,
   Boilerplates, Templates, Themes, UI Kits, Components, Icons & Assets]

Rules:
- Do NOT use vague phrases like "best tool for everyone".
- Include at least one real differentiator.
- Prefer factual statements; if unsure, mark as "unknown" or "varies".
- Mention 1–2 realistic use cases.
- Keep it concise and scannable.

Available Categories (choose ONE that best matches, or empty string if none match):
${availableCategories.join(', ')}

Available Tags (select from these, or empty array if none match):
${availableTags.join(', ')}

Available Core Technologies (optional):
${availableCoreTechnologies.join(', ')}

Content to analyze:
${truncatedContent}`,
        });
      }
    } catch (generateError) {
      console.error('fetchWebsiteInfoWithAI, generateContent/generateObject error:', generateError);
      // Return null to trigger fallback in fetchWebsiteInfo
      return null;
    }

    // console.log("fetchWebsiteInfoWithAI, url:", url, "result:", result);

    // Safely filter AI generated data to make sure they are in the available lists
    if (!result || !result.object) {
      console.warn('fetchWebsiteInfoWithAI, result.object is missing');
      return null;
    }

    const obj = result.object;

    // Category: ensure it's in available categories, or use empty string if not
    if (obj.category && !availableCategories.includes(obj.category)) {
      // Try to find a close match
      const categoryMatch = availableCategories.find((cat) =>
        cat.toLowerCase().includes(obj.category.toLowerCase()) ||
        obj.category.toLowerCase().includes(cat.toLowerCase())
      );
      obj.category = categoryMatch || '';
    }

    // Tags: filter to only include available tags, keep all that match
    if (Array.isArray(obj.tags)) {
      obj.tags = obj.tags.filter((tag) =>
        availableTags.includes(tag)
      );
    } else {
      obj.tags = [];
    }

    // Core Technologies: filter to only include available ones
    if (Array.isArray(obj.coreTechnologies)) {
      obj.coreTechnologies = obj.coreTechnologies.filter(
        (technology) => availableCoreTechnologies.includes(technology)
      );
    } else {
      obj.coreTechnologies = [];
    }

    // Categories (legacy): ensure compatibility
    if (Array.isArray(obj.categories)) {
      obj.categories = obj.categories.filter((category) =>
        availableCategories.includes(category)
      );
    } else {
      obj.categories = [];
    }

    // Ensure all array fields are arrays
    obj.best_for = Array.isArray(obj.best_for) ? obj.best_for : [];
    obj.key_features = Array.isArray(obj.key_features) ? obj.key_features : [];
    obj.pros = Array.isArray(obj.pros) ? obj.pros : [];
    obj.cons = Array.isArray(obj.cons) ? obj.cons : [];
    obj.use_this_if = Array.isArray(obj.use_this_if) ? obj.use_this_if : [];
    obj.skip_this_if = Array.isArray(obj.skip_this_if) ? obj.skip_this_if : [];
    obj.alternatives = Array.isArray(obj.alternatives) ? obj.alternatives : [];
    obj.faq = Array.isArray(obj.faq) ? obj.faq : [];

    // Ensure string fields are strings
    obj.name = String(obj.name || 'Tool');
    obj.one_liner = String(obj.one_liner || '');
    obj.what_it_does = String(obj.what_it_does || '');
    obj.category = String(obj.category || '');

    return result;
  } catch (error) {
    console.error(
      `fetchWebsiteInfoWithAI, error processing url for ${url}:`,
      error
    );
    return null;
  }
};
