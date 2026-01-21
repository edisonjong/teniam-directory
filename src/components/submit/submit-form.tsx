"use client";

import { fetchWebsite } from "@/actions/fetch-website";
import { type SubmitFormData, submit } from "@/actions/submit";
import { Icons } from "@/components/icons/icons";
import CustomMde from "@/components/shared/custom-mde";
import ImageUpload from "@/components/shared/image-upload";
import { MultiSelect } from "@/components/shared/multi-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { SUPPORT_AI_SUBMIT, SUPPORT_ITEM_ICON } from "@/lib/constants";
import { SubmitSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import type {
  CategoryListQueryResult,
  CoreTechnologyListQueryResult,
  TagListQueryResult,
} from "@/sanity.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmileIcon, Wand2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SubmitFormProps {
  tagList: TagListQueryResult;
  categoryList: CategoryListQueryResult;
  coreTechnologyList: CoreTechnologyListQueryResult;
}

/**
 * 1. form component form shadcn/ui
 * https://ui.shadcn.com/docs/components/form
 *
 * 2. React Hook Form
 * https://react-hook-form.com/get-started
 */
export function SubmitForm({
  tagList,
  categoryList,
  coreTechnologyList,
}: SubmitFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  // set default values for form fields and validation schema
  const form = useForm<SubmitFormData>({
    resolver: zodResolver(SubmitSchema),
    defaultValues: {
      name: "",
      link: "",
      description: "",
      introduction: "",
      imageId: "",
      tags: [],
      categories: [],
      coreTechnologies: [],
      ...(SUPPORT_ITEM_ICON ? { iconId: "" } : {}),
    },
  });

  // submit form if data is valid
  const onSubmit = form.handleSubmit((data: SubmitFormData) => {
    // console.log('SubmitForm, onSubmit, data:', data);
    startTransition(async () => {
      submit(data)
        .then((data) => {
          if (data.status === "success") {
            console.log("SubmitForm, success:", data.message);
            form.reset();
            router.push(`/payment/${data.id}`);
            toast.success(data.message);
          }
          if (data.status === "error") {
            console.error("SubmitForm, error:", data.message);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error("SubmitForm, error:", error);
          toast.error("Something went wrong");
        });
    });
  });

  // const handleUploadChange = (status: {
  //   isUploading: boolean;
  //   imageId?: string;
  // }) => {
  //   debugger;
  //   setIsUploading(status.isUploading);
  //   if (status.imageId) {
  //     form.setValue("imageId", status.imageId);
  //   }
  // };

  const handleUploadChange = ({
    isUploading,
    imageId,
  }: {
    isUploading: boolean;
    imageId?: string;
  }) => {
    setIsUploading(isUploading);
    if (imageId) {
      form.setValue("imageId", imageId);
    }
  };

  const handleUploadIconChange = (status: {
    isUploading: boolean;
    imageId?: string;
  }) => {
    setIsUploading(status.isUploading);
    if (status.imageId && SUPPORT_ITEM_ICON) {
      form.setValue("iconId" as keyof SubmitFormData, status.imageId);
    }
  };

  const handleAIFetch = async () => {
    const link = form.getValues("link");
    if (!link) {
      toast.error("Please enter a valid website URL first");
      setDialogOpen(false);
      return;
    }

    setIsAIProcessing(true);
    try {
      const response = await fetchWebsite(link);
      console.log("SubmitForm, handleAIFetch, response:", response);
      if (response.status === "error") {
        toast.error(response.message || "Failed to fetch website info");
        setDialogOpen(false);
        return;
      }

      if (!response.data) {
        console.error("SubmitForm, handleAIFetch, no data in response:", response);
        toast.error("No data received from AI. Please try again.");
        setDialogOpen(false);
        return;
      }

      let data = response.data;

      // Debug: Log the full response (always show for debugging)
      console.log("SubmitForm, AI response data (raw):", JSON.stringify(data, null, 2));

      // Clean and normalize data with regex
      const cleanString = (str: any): string => {
        if (!str) return '';
        const cleaned = String(str)
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/\n{3,}/g, '\n\n') // Replace 3+ newlines with 2
          .trim();
        return cleaned;
      };

      const cleanArray = (arr: any): string[] => {
        if (!Array.isArray(arr)) return [];
        return arr
          .map(item => cleanString(item))
          .filter(item => item.length > 0);
      };

      // Clean all string fields (handle both old and new format)
      const dataAny = data as any;
      data = {
        ...data,
        name: cleanString(data?.name || dataAny?.title || ''),
        one_liner: cleanString(data?.one_liner || dataAny?.summary || ''),
        what_it_does: cleanString(data?.what_it_does || dataAny?.quick_take || ''),
        description: cleanString(data?.description || dataAny?.summary || ''),
        introduction: cleanString(data?.introduction || ''),
        category: cleanString(data?.category || ''),
        best_for: cleanArray(data?.best_for),
        key_features: cleanArray(data?.key_features),
        pros: cleanArray(data?.pros),
        cons: cleanArray(data?.cons),
        use_this_if: cleanArray(data?.use_this_if || dataAny?.what_its_good_at),
        skip_this_if: cleanArray(data?.skip_this_if || dataAny?.where_it_breaks),
        tags: cleanArray(data?.tags),
        categories: cleanArray(data?.categories),
        coreTechnologies: cleanArray(data?.coreTechnologies),
        alternatives: data?.alternatives || [],
        pricing_snapshot: data?.pricing_snapshot || {
          free_plan: 'unknown',
          trial: 'unknown',
          paid: 'unknown',
          notes: '',
        },
      };

      console.log("SubmitForm, AI response data (cleaned):", JSON.stringify(data, null, 2));

      // Fill name (required field)
      if (data.name && data.name.trim().length > 0) {
        form.setValue("name", data.name.trim());
        console.log("✓ Filled name:", data.name);
      }

      // Use one_liner as description if available, fallback to description
      const descriptionValue = data.one_liner || data.description || '';
      if (descriptionValue.trim().length > 0) {
        form.setValue("description", descriptionValue.trim());
        console.log("✓ Filled description:", descriptionValue.substring(0, 50) + '...');
      } else {
        console.warn("⚠ No description found in AI response");
      }

      // Use the server-built introduction if available, otherwise build from fields
      if (data.introduction && data.introduction.trim().length > 0) {
        form.setValue("introduction", data.introduction.trim());
        console.log("✓ Filled introduction from server (length:", data.introduction.length, "chars)");
      } else {
        // Build introduction from mini-review fields if available
        let intro = "";

        if (data.what_it_does && data.what_it_does.trim().length > 0) {
          intro += `${data.what_it_does.trim()}\n\n`;
          console.log("✓ Added what_it_does to intro");
        }

        if (data.best_for && Array.isArray(data.best_for) && data.best_for.length > 0) {
          const bestForItems = data.best_for.filter((b: string) => b && b.trim().length > 0);
          if (bestForItems.length > 0) {
            intro += `## Best For\n${bestForItems.map((b: string) => `- ${b.trim()}`).join("\n")}\n\n`;
            console.log("✓ Added best_for to intro:", bestForItems.length, "items");
          }
        }

        if (data.key_features && Array.isArray(data.key_features) && data.key_features.length > 0) {
          const features = data.key_features.filter((f: string) => f && f.trim().length > 0);
          if (features.length > 0) {
            intro += `## Key Features\n${features.map((f: string) => `- ${f.trim()}`).join("\n")}\n\n`;
            console.log("✓ Added key_features to intro:", features.length, "items");
          }
        }

        if (data.use_this_if && Array.isArray(data.use_this_if) && data.use_this_if.length > 0) {
          const useThisIf = data.use_this_if.filter((u: string) => u && u.trim().length > 0);
          if (useThisIf.length > 0) {
            intro += `## What It's Good At\n${useThisIf.map((u: string) => `- ${u.trim()}`).join("\n")}\n\n`;
            console.log("✓ Added use_this_if to intro:", useThisIf.length, "items");
          }
        }

        if (data.skip_this_if && Array.isArray(data.skip_this_if) && data.skip_this_if.length > 0) {
          const skipThisIf = data.skip_this_if.filter((s: string) => s && s.trim().length > 0);
          if (skipThisIf.length > 0) {
            intro += `## Where It Breaks\n${skipThisIf.map((s: string) => `- ${s.trim()}`).join("\n")}\n\n`;
            console.log("✓ Added skip_this_if to intro:", skipThisIf.length, "items");
          }
        }

        if (data.pros && Array.isArray(data.pros) && data.pros.length > 0) {
          const pros = data.pros.filter((p: string) => p && p.trim().length > 0);
          if (pros.length > 0) {
            intro += `## Pros\n${pros.map((p: string) => `- ${p.trim()}`).join("\n")}\n\n`;
            console.log("✓ Added pros to intro:", pros.length, "items");
          }
        }

        if (data.cons && Array.isArray(data.cons) && data.cons.length > 0) {
          const cons = data.cons.filter((c: string) => c && c.trim().length > 0);
          if (cons.length > 0) {
            intro += `## Cons\n${cons.map((c: string) => `- ${c.trim()}`).join("\n")}\n\n`;
            console.log("✓ Added cons to intro:", cons.length, "items");
          }
        }

        const finalIntro = intro.trim();
        if (finalIntro.length > 0) {
          form.setValue("introduction", finalIntro);
          console.log("✓ Filled introduction (length:", finalIntro.length, "chars)");
        } else {
          console.warn("⚠ No introduction content found in AI response");
        }
      }

      // Helper function to find matching ID by name (case-insensitive, trimmed)
      const findIdByName = (
        name: string,
        list: Array<{ _id: string; name?: string | null }>
      ): string | undefined => {
        if (!name) return undefined;
        const normalizedName = name.trim().toLowerCase();

        // First try exact match (case-insensitive)
        let match = list.find((item) => {
          const itemName = item.name?.trim().toLowerCase();
          return itemName === normalizedName;
        });
        if (match) return match._id;

        // Then try partial match (contains)
        match = list.find((item) => {
          const itemName = item.name?.trim().toLowerCase() || '';
          return itemName.includes(normalizedName) || normalizedName.includes(itemName);
        });
        if (match) return match._id;

        return undefined;
      };

      // convert categories and tags to array of ids from categoryList and tagList
      // Handle both new single category and legacy categories array
      const categoriesToUse = (data.category && data.category.trim().length > 0)
        ? [data.category.trim()]
        : (data.categories && data.categories.length > 0 ? data.categories : []);

      console.log("🔍 Looking for categories:", categoriesToUse);
      console.log("📋 Available categories:", categoryList.map(c => c.name).filter(Boolean).slice(0, 10));

      if (categoriesToUse.length > 0) {
        const categoryIds = categoriesToUse
          .map((category: string) => {
            const cleaned = category.trim();
            if (!cleaned) return undefined;
            return findIdByName(cleaned, categoryList);
          })
          .filter((id: string | undefined): id is string => id !== undefined);

        if (categoryIds.length > 0) {
          form.setValue("categories", categoryIds);
          console.log("✓ Filled categories:", categoryIds.length, "items", categoryIds);
        } else {
          console.warn("⚠ No matching categories found for:", categoriesToUse);
          console.warn("Available categories:", categoryList.map(c => c.name).filter(Boolean));
        }
      } else {
        console.warn("⚠ No categories in AI response");
      }

      if (data.tags && Array.isArray(data.tags) && data.tags.length > 0) {
        const cleanedTags = data.tags
          .map((tag: string) => tag?.trim())
          .filter((tag: string) => tag && tag.length > 0);

        console.log("🔍 Looking for tags:", cleanedTags);
        console.log("📋 Available tags (first 20):", tagList.slice(0, 20).map(t => t.name).filter(Boolean));

        const tagIds = cleanedTags
          .map((tag: string) => findIdByName(tag, tagList))
          .filter((id: string | undefined): id is string => id !== undefined);

        if (tagIds.length > 0) {
          form.setValue("tags", tagIds);
          console.log("✓ Filled tags:", tagIds.length, "items", tagIds);
        } else {
          console.warn("⚠ No matching tags found for:", cleanedTags);
          console.warn("Available tags (first 20):", tagList.slice(0, 20).map(t => t.name).filter(Boolean));
        }
      } else {
        console.warn("⚠ No tags in AI response or tags array is empty");
      }

      if (data.coreTechnologies && Array.isArray(data.coreTechnologies) && data.coreTechnologies.length > 0) {
        const cleanedTechs = data.coreTechnologies
          .map((tech: string) => tech?.trim())
          .filter((tech: string) => tech && tech.length > 0);

        console.log("🔍 Looking for core technologies:", cleanedTechs);

        const techIds = cleanedTechs
          .map((technology: string) => findIdByName(technology, coreTechnologyList))
          .filter((id: string | undefined): id is string => id !== undefined);

        if (techIds.length > 0) {
          form.setValue("coreTechnologies", techIds);
          console.log("✓ Filled coreTechnologies:", techIds.length, "items", techIds);
        } else {
          console.warn("⚠ No matching core technologies found for:", cleanedTechs);
        }
      } else {
        console.warn("⚠ No core technologies in AI response");
      }

      // notify ImageUpload component to show the image
      if (data.imageId) {
        form.setValue("imageId", data.imageId);
        setImageUrl(data.image);

        // Check if placeholder was used
        if (data.image?.includes('placeholder') || data.imageId?.includes('placeholder')) {
          console.log("ℹ️ Placeholder image was used - you can upload your own image");
          toast.info("Logo/image couldn't be fetched automatically. Please upload your own image.", {
            duration: 5000,
          });
        }
      } else {
        console.log("ℹ️ No image was fetched - you can upload your own image");
        toast.info("Logo/image couldn't be fetched automatically. Please upload your own image.", {
          duration: 5000,
        });
      }

      // notify ImageUpload component to show the icon
      if (SUPPORT_ITEM_ICON && data.iconId) {
        form.setValue("iconId" as keyof SubmitFormData, data.iconId);
        setIconUrl(data.icon);

        // Check if placeholder was used
        if (data.icon?.includes('placeholder') || data.iconId?.includes('placeholder')) {
          console.log("ℹ️ Placeholder icon was used - you can upload your own icon");
        }
      } else if (SUPPORT_ITEM_ICON) {
        console.log("ℹ️ No icon was fetched - you can upload your own icon");
      }

      // Force form to update and trigger validation
      form.trigger();

      // Small delay to ensure form state updates
      setTimeout(() => {
        form.trigger();
      }, 100);

      // Summary of what was filled
      const filledFields = [];
      if (form.getValues("name")) filledFields.push("name");
      if (form.getValues("description")) filledFields.push("description");
      if (form.getValues("introduction")) filledFields.push("introduction");
      if (form.getValues("categories")?.length > 0) filledFields.push("categories");
      if (form.getValues("tags")?.length > 0) filledFields.push("tags");
      if (form.getValues("coreTechnologies")?.length > 0) filledFields.push("coreTechnologies");
      if (form.getValues("imageId")) filledFields.push("image");
      if (form.getValues("iconId")) filledFields.push("icon");

      console.log("✅ AI autofill completed! Filled fields:", filledFields.join(", "));
      console.log("📊 Form values summary:", {
        name: form.getValues("name")?.substring(0, 30),
        description: form.getValues("description")?.substring(0, 30),
        introductionLength: form.getValues("introduction")?.length || 0,
        categoriesCount: form.getValues("categories")?.length || 0,
        tagsCount: form.getValues("tags")?.length || 0,
        coreTechnologiesCount: form.getValues("coreTechnologies")?.length || 0,
      });

      toast.success(`AI autofill completed! Filled ${filledFields.length} fields.`);
    } catch (error) {
      console.error("SubmitForm, handleAIFetch, error:", error);
      toast.error("Failed to fetch website info");
    } finally {
      setIsAIProcessing(false);
      setDialogOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="overflow-hidden border-border shadow-lg">
          <CardContent className="mt-6 space-y-8">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base font-medium">Link</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Enter the link to your product"
                          className={cn(SUPPORT_AI_SUBMIT && "pr-[100px]")}
                          {...field}
                        />
                      </FormControl>
                      {SUPPORT_AI_SUBMIT && (
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              size="sm"
                              className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-2 h-7 px-2"
                              disabled={isAIProcessing}
                            >
                              {isAIProcessing ? (
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                              ) : (
                                <Wand2Icon className="h-4 w-4" />
                              )}
                              <span className="text-xs">AI Autofill</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>AI Autofill</DialogTitle>
                              <DialogDescription>
                                Would you like AI to automatically fill in the
                                form by the URL? It may take some time, so
                                please wait patiently.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleAIFetch}
                                disabled={isAIProcessing}
                              >
                                {isAIProcessing ? (
                                  <>
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing...
                                  </>
                                ) : (
                                  "Analyze"
                                )}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the name of your product"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <MultiSelect
                        className="shadow-none"
                        options={categoryList.map((category) => ({
                          value: category._id,
                          label: category.name || "",
                        }))}
                        onValueChange={(selected) => field.onChange(selected)}
                        value={field.value}
                        placeholder="Select categories"
                        variant="default"
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiSelect
                        className="shadow-none"
                        options={tagList.map((tag) => ({
                          value: tag._id,
                          label: tag.name || "",
                        }))}
                        onValueChange={(selected) => field.onChange(selected)}
                        value={field.value}
                        placeholder="Select tags"
                        variant="default"
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coreTechnologies"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Core Technologies</FormLabel>
                    <FormControl>
                      <MultiSelect
                        className="shadow-none"
                        options={coreTechnologyList.map((technology) => ({
                          value: technology._id,
                          label: technology.name || "",
                        }))}
                        onValueChange={(selected) => field.onChange(selected)}
                        value={field.value}
                        placeholder="Select core technologies"
                        variant="default"
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief description of your product"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center justify-between gap-4">
                      <span>Introduction</span>
                      <span className="text-xs text-muted-foreground">
                        (Markdown supported)
                      </span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <CustomMde {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              {SUPPORT_ITEM_ICON && (
                <FormField
                  control={form.control}
                  name={"iconId" as keyof SubmitFormData}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        <div className="flex items-center justify-between gap-4">
                          <span>Icon</span>
                          <span className="text-xs text-muted-foreground">
                            (1:1, PNG or JPEG, max 1MB)
                          </span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="mt-4 w-full h-[370px]">
                          <ImageUpload
                            currentImageUrl={iconUrl}
                            onUploadChange={handleUploadIconChange}
                            type="icon"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="imageId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      <div className="flex items-center justify-between gap-4">
                        <span>Image</span>
                        <span className="text-xs text-muted-foreground">
                          (16:9, PNG or JPEG, max 1MB)
                        </span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <div className="mt-4 w-full h-[370px]">
                        <ImageUpload
                          currentImageUrl={imageUrl}
                          onUploadChange={handleUploadChange}
                          type="image"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter
            className={cn(
              "flex flex-col items-stretch space-y-4 border-t bg-accent px-6 py-4",
              "sm:flex-row sm:justify-between sm:space-y-0"
            )}
          >
            <Button
              size="lg"
              type="submit"
              className="w-full sm:w-auto"
              disabled={isPending || isUploading}
            >
              {(isPending || isUploading) && (
                <Icons.spinner className="mr-2 h-6 w-4 animate-spin" />
              )}
              <span>
                {isPending
                  ? "Submitting..."
                  : isUploading
                    ? "Uploading image..."
                    : "Submit"}
              </span>
            </Button>
            <div className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
              <SmileIcon className="h-6 w-4" />
              <span>No worries, you can change these information later.</span>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export function SubmitFormSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="mt-6 space-y-6">
        {/* Link and Name fields */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
          {[...Array(2)].map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="flex-1 space-y-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>

        {/* Categories and Tags fields */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
          {[...Array(2)].map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="flex-1 space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>

        {/* Description field */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-24 w-full" />
        </div>

        {/* Introduction and Image fields */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-40" />
            </div>
            <Skeleton className="h-[370px] w-full" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-[370px] w-full" />
          </div>
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "flex flex-col items-stretch space-y-4 border-t bg-accent px-6 py-4",
          "sm:flex-row sm:justify-between sm:space-y-0"
        )}
      >
        <Skeleton className="h-12 w-full sm:w-32" />
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Skeleton className="h-8 w-4" />
          <Skeleton className="h-8 w-64" />
        </div>
      </CardFooter>
    </Card>
  );
}
