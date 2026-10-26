"use client";

import { BadgeCheck, MapPin } from "lucide-react";
import type { ReviewItem } from "@/lib/products";
import Stars from "./Stars";

interface ReviewCardProps {
  review: ReviewItem;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-2xl border border-surface-container-high/70 bg-surface-container-lowest p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-primary/30">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {review.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-bold text-on-surface">
              {review.author}
              {review.verified && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <BadgeCheck size={12} className="text-emerald-600" />
                  Verified Buyer
                </span>
              )}
            </p>
            <p className="flex items-center gap-1 text-[11px] text-on-surface-variant">
              <MapPin size={11} className="text-primary/70" />
              {review.location}
            </p>
          </div>
        </div>
        <time
          dateTime={review.date}
          className="shrink-0 text-[11px] text-on-surface-variant font-medium"
        >
          {new Date(review.date).toLocaleDateString("en-KE", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Stars rating={review.rating} size={13} />
        <span className="text-xs font-bold text-on-surface">
          {review.title}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-on-surface-variant">
        {review.body}
      </p>
    </article>
  );
}
