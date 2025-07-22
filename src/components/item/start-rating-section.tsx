"use client";
import { useState, useEffect, useCallback, useTransition } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Users,
  TrendingUp,
  Check,
  MessageSquare,
  ThumbsUp,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { submitRating } from "@/actions/rating";

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
  // ... (keep all your existing initialRatings data)
];

const transformSanityRating = (r: any): Rating => ({
  id: r._id,
  author: {
    name: r.submitter?.name || "Anonymous",
    avatar:
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(r.submitter?.name || "User"),
    username:
      "@" +
      (r.submitter?.name?.toLowerCase().replace(/\s+/g, "") || "anonymous"),
  },
  rating: r.rating,
  title: r.title,
  content: r.content,
  timestamp: new Date(r.createdAt || r._createdAt).toLocaleDateString(), // format as needed
  helpful: r.helpfulCount || 0,
  isHelpful: false,
});

const additionalRatings: Rating[] = [
  // ... (keep all your existing additionalRatings data)
];

export default function StarRatingsSection({ starRatings, itemName, itemId }) {
  const [allRatings, setAllRatings] = useState<Rating[]>([]);
  const [displayedRatings, setDisplayedRatings] = useState<Rating[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const ratingsPerPage = 5;

  // Review form state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHoverRating, setReviewHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (starRatings?.length) {
      const mapped = starRatings.map(transformSanityRating);
      setAllRatings(mapped);
      setDisplayedRatings(mapped.slice(0, ratingsPerPage));
      setHasMore(mapped.length > ratingsPerPage);
    }
  }, [starRatings]);

  // Calculate dynamic statistics based on all ratings
  const totalRatings = allRatings.length;
  const ratingCounts = {
    5: allRatings.filter((r) => r.rating === 5).length,
    4: allRatings.filter((r) => r.rating === 4).length,
    3: allRatings.filter((r) => r.rating === 3).length,
    2: allRatings.filter((r) => r.rating === 2).length,
    1: allRatings.filter((r) => r.rating === 1).length,
  };

  const averageRating =
    allRatings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings ||
    0;

  const loadMoreReviews = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const nextPage = page + 1;
    const nextRatings = allRatings.slice(0, nextPage * ratingsPerPage);

    setDisplayedRatings(nextRatings);
    setPage(nextPage);
    setHasMore(nextRatings.length < allRatings.length);

    setLoading(false);
  }, [loading, hasMore, page, allRatings]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 500) {
        loadMoreReviews();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreReviews]);

  // const handleSubmitReview = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!reviewRating || !reviewTitle.trim() || !reviewContent.trim()) return;

  //   const newReview: Rating = {
  //     id: Date.now().toString() + '_review',
  //     author: {
  //       name: 'You',
  //       avatar:
  //         'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  //       username: '@you',
  //     },
  //     rating: reviewRating,
  //     title: reviewTitle,
  //     content: reviewContent,
  //     timestamp: 'Just now',
  //     helpful: 0,
  //     isHelpful: false,
  //   };

  //   const updatedAllRatings = [newReview, ...allRatings];
  //   setAllRatings(updatedAllRatings);
  //   setDisplayedRatings(updatedAllRatings.slice(0, page * ratingsPerPage));
  //   setSubmittedRating(reviewRating);
  //   setShowThankYou(true);

  //   // Reset form
  //   setReviewRating(0);
  //   setReviewHoverRating(0);
  //   setReviewTitle('');
  //   setReviewContent('');
  // };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewRating || !reviewTitle.trim() || !reviewContent.trim()) return;

    startTransition(async () => {
      const result = await submitRating({
        rating: reviewRating,
        title: reviewTitle,
        content: reviewContent,
        itemId: itemId,
      });

      if (result.status === "success") {
        const newReview: Rating = {
          id: result.id || Date.now().toString() + "_review",
          author: {
            name: "You",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
            username: "@you",
          },
          rating: reviewRating,
          title: reviewTitle,
          content: reviewContent,
          timestamp: "Just now",
          helpful: 0,
          isHelpful: false,
        };

        setAllRatings((prev) => [newReview, ...prev]);
        setDisplayedRatings((prev) => [
          newReview,
          ...prev.slice(0, ratingsPerPage - 1),
        ]);
        setSubmittedRating(reviewRating);
        setShowThankYou(true);

        // Reset form
        setReviewRating(0);
        setReviewHoverRating(0);
        setReviewTitle("");
        setReviewContent("");

        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  const handleHelpful = (ratingId: string) => {
    const updatedRatings = allRatings.map((rating) =>
      rating.id === ratingId
        ? {
            ...rating,
            isHelpful: !rating.isHelpful,
            helpful: rating.isHelpful ? rating.helpful - 1 : rating.helpful + 1,
          }
        : rating
    );

    setAllRatings(updatedRatings);
    setDisplayedRatings(updatedRatings.slice(0, page * ratingsPerPage));
  };

  const handleSubmitAnother = () => {
    setShowThankYou(false);
    setSubmittedRating(0);
  };

  const renderStars = (
    rating: number,
    interactive = false,
    size = "w-4 h-4",
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
                "transition-all duration-200",
                interactive && "cursor-pointer hover:scale-105",
                !interactive && "cursor-default"
              )}
              onClick={interactive && onRate ? () => onRate(star) : undefined}
              onMouseEnter={
                interactive && onHover ? () => onHover(star) : undefined
              }
              onMouseLeave={interactive && onLeave ? onLeave : undefined}
            >
              <Star
                className={cn(
                  "w-full h-full transition-colors stroke-2",
                  isActive
                    ? "fill-yellow-400 text-yellow-400 stroke-yellow-500"
                    : "fill-gray-200 text-gray-200 stroke-gray-300 hover:fill-gray-300 dark:fill-gray-700 dark:text-gray-700 dark:stroke-gray-600 dark:hover:fill-gray-600"
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
          {/* Left Column - Rating Overview & Forms */}
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
                  {renderStars(Math.round(averageRating), false, "w-5 h-5")}
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
            <Card className="p-8 " id="review-form">
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
                          "w-6 h-6",
                          setReviewRating,
                          setReviewHoverRating,
                          () => setReviewHoverRating(0),
                          reviewHoverRating
                        )}
                        {reviewRating > 0 && (
                          <span className="text-sm text-muted-foreground ml-2">
                            {reviewRating} star{reviewRating !== 1 ? "s" : ""}
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
                        !reviewContent.trim() ||
                        isPending
                      }
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Review"
                      )}
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

          {/* Right Column - Reviews List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Recent Reviews</h3>
              <span className="text-sm text-muted-foreground">
                {allRatings.length} total{" "}
                {allRatings.length > 0 &&
                  `(showing ${displayedRatings.length})`}
              </span>
            </div>

            {allRatings.length > 0 ? (
              <div className="space-y-6">
                {displayedRatings.map((rating) => (
                  <Card key={rating.id} className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage
                          src={rating.author.avatar || "/placeholder.svg"}
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
                            {renderStars(rating.rating, false, "w-4 h-4")}
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
                              "gap-2 text-muted-foreground hover:text-foreground",
                              rating.isHelpful &&
                                "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            )}
                          >
                            <ThumbsUp
                              className={cn(
                                "h-4 w-4",
                                rating.isHelpful && "fill-current"
                              )}
                            />
                            Helpful ({rating.helpful})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                {loading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span className="text-muted-foreground">
                      Loading more reviews...
                    </span>
                  </div>
                )}

                {!hasMore && !loading && displayedRatings.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      You've reached the end of all reviews
                    </p>
                  </div>
                )}

                {hasMore && !loading && allRatings.length > ratingsPerPage && (
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
            ) : (
              <Card className="p-8 text-center">
                <div className="mx-auto max-w-md">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                    No reviews yet
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Be the first to share your experience with {itemName}!
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => {
                        const formElement =
                          document.getElementById("review-form");
                        if (formElement) {
                          formElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                          // Focus the first input for better UX
                          const firstInput =
                            formElement.querySelector("input, textarea");
                          if (firstInput) {
                            (firstInput as HTMLElement).focus();
                          }
                        }
                      }}
                      variant="default"
                      className="cursor-pointer"
                    >
                      Write a Review
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
