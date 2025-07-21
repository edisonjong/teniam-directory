'use client';
import { useState, useEffect, useCallback } from 'react';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Star,
  Users,
  TrendingUp,
  Check,
  MessageSquare,
  ThumbsUp,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/lib/auth';

interface Rating {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  rating: number;
  title: string;
  content: string;
  timestamp: string;
  helpful: number;
  isHelpful: boolean;
}

const initialRatings: Rating[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      username: '@sarahchen',
    },
    rating: 5,
    title: 'Game-changing CSS framework',
    content:
      'Tailwind CSS has revolutionized my development workflow. The utility-first approach eliminates the need to write custom CSS for most use cases. The documentation is excellent and the community support is outstanding.',
    timestamp: '1 week ago',
    helpful: 23,
    isHelpful: true,
  },
  {
    id: '2',
    author: {
      name: 'Alex Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      username: '@alexrod',
    },
    rating: 4,
    title: 'Perfect for rapid prototyping',
    content:
      'The speed at which I can build responsive layouts is incredible. No more context switching between HTML and CSS files. However, the learning curve can be steep for beginners.',
    timestamp: '2 weeks ago',
    helpful: 18,
    isHelpful: false,
  },
  {
    id: '3',
    author: {
      name: 'Maya Patel',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      username: '@mayapatel',
    },
    rating: 3,
    title: 'Good framework with learning curve',
    content:
      "Took some time to get used to the utility classes, but once you do, it's incredibly productive. The file size can get large without proper purging.",
    timestamp: '3 weeks ago',
    helpful: 15,
    isHelpful: true,
  },
  {
    id: '4',
    author: {
      name: 'David Kim',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      username: '@davidkim',
    },
    rating: 5,
    title: "Best CSS framework I've used",
    content:
      'The flexibility and customization options are unmatched. Love how it integrates with modern build tools and the JIT compiler is a game changer.',
    timestamp: '1 month ago',
    helpful: 31,
    isHelpful: false,
  },
  {
    id: '5',
    author: {
      name: 'Emma Wilson',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      username: '@emmawilson',
    },
    rating: 4,
    title: 'Great for component libraries',
    content:
      'Building design systems with Tailwind is fantastic. The consistency it provides across teams is invaluable. Wish there were more built-in components.',
    timestamp: '1 month ago',
    helpful: 27,
    isHelpful: true,
  },
  {
    id: '6',
    author: {
      name: 'James Thompson',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      username: '@jamesthompson',
    },
    rating: 5,
    title: 'Productivity boost is real',
    content:
      'My development speed has increased significantly since adopting Tailwind. The responsive design utilities are particularly well thought out.',
    timestamp: '2 months ago',
    helpful: 19,
    isHelpful: false,
  },
  {
    id: '7',
    author: {
      name: 'Lisa Garcia',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      username: '@lisagarcia',
    },
    rating: 4,
    title: 'Excellent documentation',
    content:
      'The docs are comprehensive and well-organized. Examples are clear and the search functionality is top-notch. Makes learning new utilities easy.',
    timestamp: '2 months ago',
    helpful: 22,
    isHelpful: true,
  },
  {
    id: '8',
    author: {
      name: 'Michael Brown',
      avatar:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      username: '@michaelbrown',
    },
    rating: 3,
    title: 'Good but takes getting used to',
    content:
      "The utility-first approach is different from traditional CSS. Once you adapt, it's quite powerful. The class names can get verbose though.",
    timestamp: '3 months ago',
    helpful: 14,
    isHelpful: false,
  },
];
const transformSanityRating = (r: any): Rating => ({
  id: r._id,
  author: {
    name: r.submitter?.name || 'Anonymous',
    avatar:
      'https://ui-avatars.com/api/?name=' +
      encodeURIComponent(r.submitter?.name || 'User'),
    username:
      '@' +
      (r.submitter?.name?.toLowerCase().replace(/\s+/g, '') || 'anonymous'),
  },
  rating: r.rating,
  title: r.title,
  content: r.content,
  timestamp: new Date(r.createdAt || r._createdAt).toLocaleDateString(), // format as needed
  helpful: r.helpfulCount || 0,
  isHelpful: false,
});

const additionalRatings: Rating[] = [
  {
    id: '9',
    author: {
      name: 'Sophie Anderson',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      username: '@sophieanderson',
    },
    rating: 5,
    title: 'Perfect for modern web development',
    content:
      'Tailwind fits perfectly into modern development workflows. The integration with React, Vue, and other frameworks is seamless. Highly recommended!',
    timestamp: '3 months ago',
    helpful: 28,
    isHelpful: false,
  },
  {
    id: '10',
    author: {
      name: 'Ryan Martinez',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      username: '@ryanmartinez',
    },
    rating: 4,
    title: 'Great for team consistency',
    content:
      "Having a shared design language through utility classes has improved our team's consistency. Code reviews are easier when everyone uses the same system.",
    timestamp: '4 months ago',
    helpful: 16,
    isHelpful: true,
  },
  {
    id: '11',
    author: {
      name: 'Jennifer Lee',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      username: '@jenniferlee',
    },
    rating: 5,
    title: 'Mobile-first approach is excellent',
    content:
      'The responsive design utilities make mobile-first development intuitive. Breakpoint management is so much cleaner than traditional media queries.',
    timestamp: '4 months ago',
    helpful: 33,
    isHelpful: true,
  },
  {
    id: '12',
    author: {
      name: 'Chris Johnson',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      username: '@chrisjohnson',
    },
    rating: 4,
    title: 'Customization options are powerful',
    content:
      'The configuration system allows for extensive customization while maintaining the utility-first philosophy. Plugin ecosystem is growing nicely.',
    timestamp: '5 months ago',
    helpful: 21,
    isHelpful: false,
  },
];

export default function StarRatingsSection({ starRatings, itemName }) {
  console.log('starRatings', starRatings[0].submitter);
  // const [ratings, setRatings] = useState(initialRatings);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Review form state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHoverRating, setReviewHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');

  useEffect(() => {
    if (starRatings?.length) {
      const mapped = starRatings.map(transformSanityRating);
      setRatings(mapped);
    }
  }, [starRatings]);
  // Calculate dynamic statistics
  const totalRatings = ratings.length;
  const ratingCounts = {
    5: ratings.filter((r) => r.rating === 5).length,
    4: ratings.filter((r) => r.rating === 4).length,
    3: ratings.filter((r) => r.rating === 3).length,
    2: ratings.filter((r) => r.rating === 2).length,
    1: ratings.filter((r) => r.rating === 1).length,
  };

  const averageRating =
    ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings;

  // Simulate loading more reviews
  const loadMoreReviews = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Reduced API delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    const newReviews = additionalRatings.slice(startIndex, endIndex);

    if (newReviews.length > 0) {
      setRatings((prev) => [...prev, ...newReviews]);
      setPage((prev) => prev + 1);
    }

    if (endIndex >= additionalRatings.length) {
      setHasMore(false);
    }

    setLoading(false);
  }, [loading, hasMore, page]);

  // Infinite scroll handler with improved trigger distance
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Trigger when user is 500px from bottom instead of 1000px
      if (scrollTop + clientHeight >= scrollHeight - 500) {
        loadMoreReviews();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreReviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewRating || !reviewTitle.trim() || !reviewContent.trim()) return;

    const newReview: Rating = {
      id: Date.now().toString() + '_review',
      author: {
        name: 'You',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        username: '@you',
      },
      rating: reviewRating,
      title: reviewTitle,
      content: reviewContent,
      timestamp: 'Just now',
      helpful: 0,
      isHelpful: false,
    };

    setRatings([newReview, ...ratings]);
    setSubmittedRating(reviewRating);
    setShowThankYou(true);

    // Reset form
    setReviewRating(0);
    setReviewHoverRating(0);
    setReviewTitle('');
    setReviewContent('');
  };

  const handleHelpful = (ratingId: string) => {
    setRatings(
      ratings.map((rating) =>
        rating.id === ratingId
          ? {
              ...rating,
              isHelpful: !rating.isHelpful,
              helpful: rating.isHelpful
                ? rating.helpful - 1
                : rating.helpful + 1,
            }
          : rating
      )
    );
  };

  const handleSubmitAnother = () => {
    setShowThankYou(false);
    setSubmittedRating(0);
  };

  const renderStars = (
    rating: number,
    interactive = false,
    size = 'w-4 h-4',
    onRate?: (rating: number) => void,
    onHover?: (rating: number) => void,
    onLeave?: () => void,
    hoverState?: number
  ) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive =
            star <= (interactive ? hoverState || rating : rating);
          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              className={cn(
                size,
                'transition-all duration-200',
                interactive && 'cursor-pointer hover:scale-105',
                !interactive && 'cursor-default'
              )}
              onClick={interactive && onRate ? () => onRate(star) : undefined}
              onMouseEnter={
                interactive && onHover ? () => onHover(star) : undefined
              }
              onMouseLeave={interactive && onLeave ? onLeave : undefined}
            >
              <Star
                className={cn(
                  'w-full h-full transition-colors stroke-2',
                  isActive
                    ? 'fill-yellow-400 text-yellow-400 stroke-yellow-500'
                    : 'fill-gray-200 text-gray-200 stroke-gray-300 hover:fill-gray-300 dark:fill-gray-700 dark:text-gray-700 dark:stroke-gray-600 dark:hover:fill-gray-600'
                )}
              />
            </button>
          );
        })}
      </div>
    );
  };

  const getRatingPercentage = (count: number) => {
    return totalRatings > 0 ? (count / totalRatings) * 100 : 0;
  };

  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Submit a Review</h1>
          <p className="text-muted-foreground text-lg">
            Let others know about your experience with {itemName}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Rating Overview & Forms (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            {/* Rating Overview */}
            <Card className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Reviews</span>
                <span className="text-muted-foreground">| {itemName}</span>
              </div>

              <div className="flex items-end gap-4 mb-6">
                <div className="text-6xl font-bold">
                  {averageRating.toFixed(1)}
                </div>
                <div className="pb-2">
                  {renderStars(Math.round(averageRating), false, 'w-5 h-5')}
                  <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{totalRatings} reviews</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-sm">{stars}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 stroke-yellow-500 stroke-2" />
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${getRatingPercentage(
                            ratingCounts[stars as keyof typeof ratingCounts]
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">
                      {ratingCounts[stars as keyof typeof ratingCounts]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Detailed Review Form */}
            <Card className="p-8">
              {!showThankYou ? (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-semibold">
                      Write a detailed review for "{itemName}"
                    </span>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {renderStars(
                          reviewRating,
                          true,
                          'w-6 h-6',
                          setReviewRating,
                          setReviewHoverRating,
                          () => setReviewHoverRating(0),
                          reviewHoverRating
                        )}
                        {reviewRating > 0 && (
                          <span className="text-sm text-muted-foreground ml-2">
                            {reviewRating} star{reviewRating !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Review Title
                      </label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="Summarize your experience"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Your Review
                      </label>
                      <textarea
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        placeholder="Share your detailed experience..."
                        className="w-full min-h-[100px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
                      disabled={
                        !reviewRating ||
                        !reviewTitle.trim() ||
                        !reviewContent.trim()
                      }
                    >
                      Submit Review
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    Thank you for your feedback
                  </h3>

                  <p className="text-muted-foreground mb-8">
                    Your {submittedRating}-star rating for "{itemName}" has been
                    submitted
                  </p>

                  <Button
                    onClick={handleSubmitAnother}
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                  >
                    Submit another rating
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Reviews List (Scrollable) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Recent Reviews</h3>
              <span className="text-sm text-muted-foreground">
                {ratings.length} total
              </span>
            </div>

            <div className="space-y-6">
              {ratings.map((rating) => (
                <Card key={rating.id} className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage
                        src={rating.author.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback>
                        {rating.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium truncate">
                            {rating.author.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {rating.timestamp}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {renderStars(rating.rating, false, 'w-4 h-4')}
                          <div className="text-xs text-muted-foreground mt-1">
                            {rating.rating}/5 stars
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-1">{rating.title}</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {rating.content}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleHelpful(rating.id)}
                          className={cn(
                            'gap-2 text-muted-foreground hover:text-foreground',
                            rating.isHelpful &&
                              'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                          )}
                        >
                          <ThumbsUp
                            className={cn(
                              'h-4 w-4',
                              rating.isHelpful && 'fill-current'
                            )}
                          />
                          Helpful ({rating.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span className="text-muted-foreground">
                    Loading more reviews...
                  </span>
                </div>
              )}

              {/* End of reviews message */}
              {!hasMore && !loading && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    You've reached the end of all reviews
                  </p>
                </div>
              )}

              {/* Manual Load More Button - fallback for infinite scroll */}
              {hasMore && !loading && (
                <div className="text-center py-6">
                  <Button
                    onClick={loadMoreReviews}
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                  >
                    Load More Reviews
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
