'use server';

import { sanityClient } from '@/sanity/lib/client';
import { RatingActionResponse } from './rating';

export async function updateHelpfulCount(
  ratingId: string,
  userId: any
): Promise<RatingActionResponse> {
  try {
    // First get the current rating document
    const rating = await sanityClient.getDocument(ratingId);
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
      // User already liked - remove their like
      updatedHelpfulCount--;
      updatedHelpfulUsers = updatedHelpfulUsers.filter(
        (userRef: any) => userRef._ref !== userId
      );
    } else {
      // User hasn't liked yet - add their like
      updatedHelpfulCount++;
      updatedHelpfulUsers.push({
        _type: 'reference',
        _ref: userId,
        _key: `user-${userId}`,
      });
    }

    // Update the document
    const res = await sanityClient
      .patch(ratingId)
      .set({
        helpfulCount: updatedHelpfulCount,
        helpfulUsers: updatedHelpfulUsers,
      })
      .commit();

    if (!res) {
      return { status: 'error', message: 'Failed to update helpful count' };
    }

    return {
      status: 'success',
      message: 'Helpful count updated successfully',
      isHelpful: !alreadyHelpful, // Return the new state
    };
  } catch (error) {
    console.error('Error updating helpful count:', error);
    return { status: 'error', message: 'Failed to update helpful count' };
  }
}
