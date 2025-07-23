'use server';

import { sanityClient } from '@/sanity/lib/client';
import { RatingActionResponse } from './rating';
import { revalidatePath } from 'next/cache';

export async function updateHelpfulCount(
  ratingId: string,
  userId: string,
  itemId: string
): Promise<RatingActionResponse> {
  try {
    // Step 1: Fetch the existing rating document
    const rating = await sanityClient.getDocument(ratingId);
    console.log('Fetched rating:', rating);

    if (!rating) {
      return { status: 'error', message: 'Rating not found' };
    }

    const helpfulUsers = rating.helpfulUsers || [];
    const alreadyHelpful = helpfulUsers.some(
      (userRef: any) => userRef._ref === userId
    );

    let updatedHelpfulCount = rating.helpfulCount || 0;
    let updatedHelpfulUsers = [...helpfulUsers];

    if (alreadyHelpful) {
      updatedHelpfulCount = Math.max(0, updatedHelpfulCount - 1);
      updatedHelpfulUsers = updatedHelpfulUsers.filter(
        (userRef: any) => userRef._ref !== userId
      );
    } else {
      updatedHelpfulCount++;
      updatedHelpfulUsers.push({
        _type: 'reference',
        _ref: userId,
        _key: `user-${userId}`,
      });
    }

    // Step 2: Patch using transaction for atomicity
    const res = await sanityClient
      .transaction()
      .patch(ratingId, (patch) =>
        patch.setIfMissing({ helpfulUsers: [] }).set({
          helpfulCount: updatedHelpfulCount,
          helpfulUsers: updatedHelpfulUsers,
        })
      )
      .commit();

    if (!res) {
      return { status: 'error', message: 'Failed to update helpful count' };
    }
    // Revalidate the page to show the new rating
    const item = await sanityClient.getDocument(itemId);

    if (item?.slug?.current) {
      revalidatePath(`/item/${item.slug.current}`);
    } else {
      console.warn('Slug not found for item, skipping revalidation.');
    }
    return {
      status: 'success',
      message: 'Helpful count updated successfully',
      isHelpful: !alreadyHelpful,
    };
  } catch (error: any) {
    console.error('Error updating helpful count:', error.message, error.stack);
    return {
      status: 'error',
      message: error.message || 'Failed to update helpful count',
    };
  }
}
