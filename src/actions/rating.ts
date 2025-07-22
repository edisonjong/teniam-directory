"use server";

import { currentUser } from "@/lib/auth";
import { sanityClient } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

export type RatingFormData = {
  rating: number;
  title: string;
  content: string;
  itemId: string; // Reference to the item being rated
};

export type RatingActionResponse = {
  status: "success" | "error";
  message?: string;
  id?: string;
};

export async function submitRating(
  formData: RatingFormData
): Promise<RatingActionResponse> {
  try {
    const user = await currentUser();
    console.log("user", user);
    if (!user) {
      return { status: "error", message: "Unauthorized" };
    }

    const { rating, title, content, itemId } = formData;

    const data = {
      _type: "rating",
      rating: Number(rating),
      title,
      content,
      item: {
        _type: "reference",
        _ref: itemId,
      },
      submitter: {
        _type: "reference",
        _ref: user.id,
      },
      helpfulCount: 0,
    };

    const res = await sanityClient.create(data);
    if (!res) {
      return { status: "error", message: "Failed to submit rating" };
    }

    // Revalidate the page to show the new rating
    // revalidatePath(`/items/${itemId}`);

    return {
      status: "success",
      message: "Rating submitted successfully",
      id: res._id,
    };
  } catch (error) {
    console.error("Error submitting rating:", error);
    return { status: "error", message: "Failed to submit rating" };
  }
}
