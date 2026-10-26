"use client";

import { useState } from "react";
import { MessageSquarePlus, Send, Star, X } from "lucide-react";
import Icon from "@/components/ui/Icon";
import type { Product, ReviewItem } from "@/lib/products";
import Stars from "./Stars";
import ReviewCard from "./ReviewCard";

interface ProductReviewsProps {
  product: Product;
  reviews: ReviewItem[];
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
  newAuthor: string;
  setNewAuthor: (v: string) => void;
  newLocation: string;
  setNewLocation: (v: string) => void;
  newRating: number;
  setNewRating: (v: number) => void;
  newTitle: string;
  setNewTitle: (v: string) => void;
  newBody: string;
  setNewBody: (v: string) => void;
  formSubmitted: boolean;
  setFormSubmitted: (v: boolean) => void;
  handleReviewSubmit: (e: React.FormEvent) => void;
  avgRating: number;
  ratingCounts: Array<{ stars: number; count: number }>;
  allReviews: ReviewItem[];
}

export default function ProductReviews({
  product,
  reviews: initialReviews,
  showReviewForm,
  setShowReviewForm,
  newAuthor,
  setNewAuthor,
  newLocation,
  setNewLocation,
  newRating,
  setNewRating,
  newTitle,
  setNewTitle,
  newBody,
  setNewBody,
  formSubmitted,
  setFormSubmitted,
  handleReviewSubmit,
  avgRating,
  ratingCounts,
  allReviews,
}: ProductReviewsProps) {
  // Local copy of reviews state so the parent doesn't need to re-render on every keystroke
  const [reviewList, setReviewList] = useState<ReviewItem[]>(initialReviews);

  return (
    <section id="customer-reviews" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
      <div className="rounded-3xl border border-surface-container-high/60 bg-surface-container-lowest p-6 sm:p-10 shadow-xs">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-high/80 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Icon name="rate_review" className="text-[16px]" />
              <span>Verified Grower &amp; Buyer Feedback</span>
            </div>
            <h2 className="text-2xl font-extrabold text-on-surface sm:text-3xl mt-1">
              Customer Reviews
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-on-surface-variant">
              Real feedback from mushroom outgrowers, restaurants, and homesteaders across Kenya.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="inline-flex items-center gap-2 self-start rounded-full bg-primary text-on-primary px-4 py-2.5 text-xs font-bold shadow-xs hover:bg-primary-dim transition-colors sm:self-auto"
          >
            <MessageSquarePlus size={15} />
            <span>{showReviewForm ? "Cancel Review" : "Write a Review"}</span>
          </button>
        </div>

        {/* Interactive Review Form */}
        {showReviewForm && (
          <div className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-on-surface">
                Share Your Experience with {product.name}
              </h3>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="rounded-full p-1 text-on-surface-variant hover:bg-surface-container"
              >
                <X size={16} />
              </button>
            </div>

            {formSubmitted ? (
              <div className="rounded-xl bg-emerald-100 p-4 text-center text-sm font-bold text-emerald-800">
                Thank you! Your verified review has been published.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Samuel K."
                      className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3.5 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">Location</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Kiambu County"
                      className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3.5 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Your Rating *</label>
                  <Stars rating={newRating} size={20} interactive={true} onRate={(r) => setNewRating(r)} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Review Headline *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Exceptional yield and fast colonization"
                    className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3.5 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Review Details *</label>
                  <textarea
                    required
                    rows={3}
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    placeholder="Write your honest feedback regarding quality, pickup, or yield..."
                    className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary text-on-primary px-5 py-2.5 text-xs font-bold shadow-xs hover:bg-primary-dim transition-colors"
                >
                  <Send size={13} />
                  <span>Post Review</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Rating Summary Breakdown */}
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:items-center bg-surface-container-low/50 p-6 rounded-2xl border border-surface-container-high/50">
          <div className="text-center sm:border-r sm:border-surface-container-high/80 sm:pr-6">
            <p className="text-5xl font-black text-on-surface">{avgRating.toFixed(1)}</p>
            <div className="flex justify-center mt-2">
              <Stars rating={Math.round(avgRating)} size={18} />
            </div>
            <p className="mt-2 text-xs text-on-surface-variant font-medium">
              Based on {allReviews.length} {allReviews.length === 1 ? "verified review" : "verified reviews"}
            </p>
          </div>

          <div className="sm:col-span-2 space-y-2">
            {ratingCounts.map((rc) => (
              <div key={rc.stars} className="flex items-center gap-2.5 text-xs">
                <span className="w-9 font-bold text-on-surface flex items-center gap-0.5">
                  {rc.stars} <Star size={10} className="fill-amber-400 text-amber-500" />
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{
                      width: allReviews.length > 0 ? `${(rc.count / allReviews.length) * 100}%` : "0%",
                    }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-on-surface-variant">{rc.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards Grid */}
        {reviewList.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {reviewList.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-surface-container-low/60 p-8 text-center">
            <Icon name="rate_review" className="mx-auto text-[40px] text-on-surface-variant/50 mb-3" />
            <h4 className="text-sm font-bold text-on-surface">No reviews yet</h4>
            <p className="mt-1 text-xs text-on-surface-variant">Be the first to share your experience with this product.</p>
          </div>
        )}
      </div>
    </section>
  );
}
