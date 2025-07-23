'use server';

import { currentUser } from '@/lib/auth';
import { RatingActionResponse } from './rating';
import { sanityClient } from '@/sanity/lib/client';

export async function updateHelpfulCount(
  ratingId: string,
  increment: boolean
): Promise<RatingActionResponse> {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 'error', message: 'Unauthorized' };
    }

    // Update the helpful count in Sanity
    const patch = sanityClient
      .patch(ratingId)
      .setIfMissing({ helpfulCount: 0 });

    const updatedPatch = increment
      ? patch.inc({ helpfulCount: 1 })
      : patch.dec({ helpfulCount: 1 });

    const res = await updatedPatch.commit();

    if (!res) {
      return { status: 'error', message: 'Failed to update helpful count' };
    }

    return {
      status: 'success',
      message: 'Helpful count updated successfully',
    };
  } catch (error) {
    console.error('Error updating helpful count:', error);
    return { status: 'error', message: 'Failed to update helpful count' };
  }
}
