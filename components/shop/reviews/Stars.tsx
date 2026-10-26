"use client";

import { Star } from "lucide-react";

interface StarsProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}

export default function Stars({
  rating,
  size = 14,
  interactive = false,
  onRate,
}: StarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(n)}
          className={
            interactive
              ? "cursor-pointer p-0.5 transition-transform hover:scale-125 focus:outline-none"
              : "cursor-default"
          }
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            size={size}
            className={
              n <= rating
                ? "fill-amber-400 text-amber-500"
                : "fill-surface-container text-surface-container-high"
            }
          />
        </button>
      ))}
    </div>
  );
}
