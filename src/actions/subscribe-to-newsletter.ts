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

    // Check if Resend is configured
    if (!process.env.RESEND_AUDIENCE_ID) {
      console.error("subscribeToNewsletter, RESEND_AUDIENCE_ID is not configured");
      return {
        status: "error",
        message: "Newsletter service is not configured. Please contact support.",
      };
    }

    const subscribedResult = await resend.contacts.create({
      email: validatedInput.data.email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    console.log("subscribeToNewsletter, subscribedResult", subscribedResult);

    if (subscribedResult.error) {
      console.error("subscribeToNewsletter, error creating contact:", subscribedResult.error);
      return {
        status: "error",
        message: subscribedResult.error.message || "Failed to subscribe. Please try again.",
      };
    }

    // Try to send welcome email (non-blocking)
    try {
      const emailSentResult = await resend.emails.send({
        from: process.env.RESEND_EMAIL_FROM || "onboarding@resend.dev",
        to: validatedInput.data.email,
        subject: "Welcome to our newsletter!",
        react: NewsletterWelcomeEmail({ email: validatedInput.data.email }),
      });
      console.log("subscribeToNewsletter, emailSentResult", emailSentResult);

      if (emailSentResult.error) {
        console.warn("subscribeToNewsletter, error sending welcome email:", emailSentResult.error);
        // Still return success since contact was created
      }
    } catch (emailError) {
      console.warn("subscribeToNewsletter, error sending welcome email:", emailError);
      // Still return success since contact was created
    }

    return { status: "success", message: "Successfully subscribed to the newsletter!" };
  } catch (error) {
    console.error("subscribeToNewsletter, error:", error);
    return {
      status: "error",
      message: "Failed to subscribe to the newsletter",
    };
  }
}
