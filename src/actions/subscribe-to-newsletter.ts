"use server";

import { NewsletterWelcomeEmail } from "@/emails/newsletter-welcome";
import { resend } from "@/lib/mail";
import { type NewsletterFormData, NewsletterFormSchema } from "@/lib/schemas";

export type ServerActionResponse = {
  status: "success" | "error";
  message?: string;
};

export async function subscribeToNewsletter(
  formdata: NewsletterFormData,
): Promise<ServerActionResponse> {
  try {
    const validatedInput = NewsletterFormSchema.safeParse(formdata);
    if (!validatedInput.success) {
      return { status: "error", message: "Invalid input" };
    }

    // Try to create contact in audience (optional - may fail if API key doesn't have permissions)
    let contactCreated = false;
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        const subscribedResult = await resend.contacts.create({
          email: validatedInput.data.email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
        console.log("subscribeToNewsletter, subscribedResult", subscribedResult);

        if (subscribedResult.error) {
          // Check if error is due to API key restrictions
          if (subscribedResult.error.message?.includes("restricted") ||
            subscribedResult.error.message?.includes("permission")) {
            console.warn("subscribeToNewsletter, API key restricted - skipping contact creation");
          } else {
            console.warn("subscribeToNewsletter, error creating contact:", subscribedResult.error);
          }
        } else {
          contactCreated = true;
        }
      } catch (contactError: any) {
        // If contact creation fails due to permissions, continue with email sending
        if (contactError?.message?.includes("restricted") ||
          contactError?.message?.includes("permission")) {
          console.warn("subscribeToNewsletter, API key restricted - skipping contact creation");
        } else {
          console.warn("subscribeToNewsletter, error creating contact:", contactError);
        }
      }
    }

    // Send welcome email (this should work with restricted API keys)
    try {
      const emailSentResult = await resend.emails.send({
        from: process.env.RESEND_EMAIL_FROM || "onboarding@resend.dev",
        to: validatedInput.data.email,
        subject: "Welcome to our newsletter!",
        react: NewsletterWelcomeEmail({ email: validatedInput.data.email }),
      });
      console.log("subscribeToNewsletter, emailSentResult", emailSentResult);

      if (emailSentResult.error) {
        console.error("subscribeToNewsletter, error sending welcome email:", emailSentResult.error);
        return {
          status: "error",
          message: emailSentResult.error.message || "Failed to send welcome email. Please try again.",
        };
      }

      // Return success even if contact creation failed (as long as email was sent)
      return {
        status: "success",
        message: "Subscription sent successfully!"
      };
    } catch (emailError: any) {
      console.error("subscribeToNewsletter, error sending welcome email:", emailError);
      return {
        status: "error",
        message: emailError?.message || "Failed to send welcome email. Please try again.",
      };
    }
  } catch (error) {
    console.error("subscribeToNewsletter, error:", error);
    return {
      status: "error",
      message: "Failed to subscribe to the newsletter",
    };
  }
}
