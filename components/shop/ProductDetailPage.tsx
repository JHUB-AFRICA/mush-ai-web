"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Calendar,
  Minus,
  Plus,
  ShoppingCart,
  Snowflake,
  Star,
  Sparkles,
  Shield,
  MapPin,
  BadgeCheck,
  MessageSquarePlus,
  Send,
  X,
} from "lucide-react";
import { formatKsh } from "@/lib/format";
import type { Product, ReviewItem } from "@/lib/products";
import { useCart } from "./CartProvider";
import Icon from "@/components/ui/Icon";

/* ── Star Rating Component ── */
function Stars({
  rating,
  size = 14,
  interactive = false,
  onRate,
}: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(n)}
          className={interactive ? "cursor-pointer p-0.5 transition-transform hover:scale-125 focus:outline-none" : "cursor-default"}
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

/* ── Review Card ── */
function ReviewCard({ review }: { review: ReviewItem }) {
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
        <span className="text-xs font-bold text-on-surface">{review.title}</span>
      </div>
      <p className="text-xs leading-relaxed text-on-surface-variant">
        {review.body}
      </p>
    </article>
  );
}

/* ── Suggestion Card ── */
function SuggestionCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs backdrop-blur-sm ${
              product.badgeTone === "ember"
                ? "bg-secondary-container"
                : "bg-primary/90"
            }`}
          >
            <Sparkles size={11} className="text-secondary-fixed" />
            {product.badge}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-on-surface shadow-xs backdrop-blur-sm">
            <Star size={11} className="fill-amber-400 text-amber-500" />
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          {product.category}
        </span>
        <h3 className="mt-1 text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-on-surface-variant line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto flex items-baseline justify-between pt-3 border-t border-surface-container-high/60 mt-3">
          <div>
            <span className="text-base font-extrabold text-on-surface">
              {formatKsh(product.price)}
            </span>
            <span className="text-[10px] text-on-surface-variant ml-1">
              / {product.unit}
            </span>
          </div>
          <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform flex items-center">
            View <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Main Product Detail Page Component ── */
interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  reviews: ReviewItem[];
}

export default function ProductDetailPage({
  product,
  relatedProducts,
  reviews: initialReviews,
}: ProductDetailPageProps) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [allReviews, setAllReviews] = useState<ReviewItem[]>(initialReviews);

  // Review submission form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isTraining = product.category === "Training";

  function handleAdd() {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newAuthor.trim() || !newTitle.trim() || !newBody.trim()) return;

    const newRev: ReviewItem = {
      id: `review-${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || "Nairobi, Kenya",
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      title: newTitle.trim(),
      body: newBody.trim(),
      verified: true,
    };

    setAllReviews([newRev, ...allReviews]);
    setNewAuthor("");
    setNewLocation("");
    setNewRating(5);
    setNewTitle("");
    setNewBody("");
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowReviewForm(false);
    }, 2000);
  }

  // Calculate dynamic rating breakdown
  const avgRating =
    allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : product.rating;

  const ratingCounts = [5, 4, 3, 2, 1].map((n) => ({
    stars: n,
    count: allReviews.filter((r) => r.rating === n).length,
  }));

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("customer-reviews")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Breadcrumbs ── */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6 lg:px-12"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-on-surface-variant">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-primary font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-on-surface-variant/50" />
          </li>
          <li>
            <Link
              href="/shop"
              className="transition-colors hover:text-primary font-medium"
            >
              Shop &amp; Services
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-on-surface-variant/50" />
          </li>
          <li>
            <Link
              href="/shop"
              className="transition-colors hover:text-primary font-medium"
            >
              {product.category}
            </Link>
          </li>
          <li>
            <ChevronRight size={12} className="text-on-surface-variant/50" />
          </li>
          <li
            aria-current="page"
            className="font-bold text-on-surface truncate max-w-[200px] sm:max-w-none"
          >
            {product.name}
          </li>
        </ol>
      </nav>

      {/* ── Product Hero Section ── */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Column */}
          <div className="relative overflow-hidden rounded-3xl border border-surface-container-high/60 bg-surface-container shadow-lg">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Badges overlay */}
            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm ${
                  product.badgeTone === "ember"
                    ? "bg-secondary-container"
                    : "bg-primary/90"
                }`}
              >
                <Sparkles size={13} className="text-secondary-fixed" />
                {product.badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-md backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                In Stock &bull; Ready for Pickup
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-on-surface shadow-md backdrop-blur-sm">
                <Star
                  size={12}
                  className="fill-amber-400 text-amber-500"
                  aria-hidden="true"
                />
                {avgRating.toFixed(1)}
                <span className="font-normal text-on-surface-variant">
                  ({allReviews.length})
                </span>
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col">
            {/* Category & tag pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {product.category}
              </span>
              <span className="rounded-full bg-secondary-container/15 px-3 py-1 text-secondary-container">
                {product.tag}
              </span>
              <span className="rounded-full bg-surface-container px-3 py-1 text-on-surface-variant">
                {product.meta}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* Rating row with direct anchor link to reviews */}
            <a
              href="#customer-reviews"
              onClick={scrollToReviews}
              className="mt-3 inline-flex items-center gap-2 w-fit group cursor-pointer"
            >
              <Stars rating={Math.round(avgRating)} />
              <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-xs text-primary underline underline-offset-2 font-medium">
                ({allReviews.length} verified {allReviews.length === 1 ? "review" : "reviews"})
              </span>
            </a>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-black text-on-surface">
                {formatKsh(product.price)}
              </span>
              <span className="text-sm text-on-surface-variant font-medium">
                / {product.unit}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
              {product.longDescription || product.description}
            </p>

            {/* Feature highlights */}
            <div className="my-5 space-y-2 rounded-2xl border border-surface-container-high/60 bg-surface-container-low/60 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                <Snowflake size={14} className="text-primary" />
                <span>Key Features &amp; Highlights</span>
              </div>
              <ul className="space-y-1.5 pl-1 text-xs text-on-surface-variant">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check
                      size={13}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-auto border-t border-surface-container-high/80 pt-5">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center rounded-xl border border-surface-container-high bg-surface-container-lowest"
                  role="group"
                  aria-label="Quantity"
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-surface-container transition-colors rounded-l-xl"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-on-surface">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(24, q + 1))}
                    className="p-3 hover:bg-surface-container transition-colors rounded-r-xl"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-all active:scale-95 ${
                    added
                      ? "bg-primary"
                      : "bg-secondary-container hover:bg-secondary text-on-secondary"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={18} strokeWidth={3} />
                      Added to Pickup Cart!
                    </>
                  ) : isTraining ? (
                    <>
                      <Calendar size={16} />
                      Book {qty} {qty === 1 ? "Seat" : "Seats"}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Add {qty} to Pickup Cart
                    </>
                  )}
                </button>
              </div>

              {added && (
                <p className="mt-2 text-center text-xs font-semibold text-primary">
                  Items reserved in your pickup cart. Pick up at Juja Hub.
                </p>
              )}

              {/* Trust signals */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-on-surface-variant">
                <span className="inline-flex items-center gap-1">
                  <Shield size={12} className="text-primary" />
                  Quality Guaranteed
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon
                    name="local_shipping"
                    className="text-[14px] text-primary"
                  />
                  Juja &amp; Westlands Pickup
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon
                    name="verified"
                    className="text-[14px] text-primary"
                  />
                  JKUAT Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Details & Specifications Section ── */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
        <div className="rounded-3xl border border-surface-container-high/60 bg-surface-container-lowest p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                <Icon name="description" className="text-[16px]" />
                <span>Product Deep Dive</span>
              </div>
              <h2 className="text-xl font-extrabold text-on-surface sm:text-2xl mb-4">
                About This Product
              </h2>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-6">
                {product.longDescription || product.description}
              </p>
              <h3 className="text-sm font-bold text-on-surface mb-3">
                What&apos;s Included in Your Order:
              </h3>
              <ul className="space-y-2.5">
                {product.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 text-sm text-on-surface-variant"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-container mb-2">
                <Icon name="tune" className="text-[16px]" />
                <span>Technical Specifications</span>
              </div>
              <h2 className="text-xl font-extrabold text-on-surface sm:text-2xl mb-4">
                Specifications
              </h2>
              {product.specs && product.specs.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-surface-container-high/70 shadow-xs">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr
                          key={spec.label}
                          className={
                            i % 2 === 0
                              ? "bg-surface-container-low/40"
                              : "bg-surface-container-lowest"
                          }
                        >
                          <td className="px-4 py-3 font-semibold text-on-surface w-2/5 border-b border-surface-container-high/40">
                            {spec.label}
                          </td>
                          <td className="px-4 py-3 text-on-surface-variant border-b border-surface-container-high/40">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-2xl border border-surface-container-high/60 bg-surface-container-low/40 p-6 text-sm text-on-surface-variant">
                  Certified agricultural specifications guaranteed directly by SmartMushroom Juja Lab.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Customer Reviews Section (In-Product) ── */}
      <section
        id="customer-reviews"
        className="scroll-mt-20 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12"
      >
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
                      <label className="block text-xs font-bold text-on-surface mb-1">
                        Your Name *
                      </label>
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
                      <label className="block text-xs font-bold text-on-surface mb-1">
                        Location
                      </label>
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
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Your Rating *
                    </label>
                    <Stars
                      rating={newRating}
                      size={20}
                      interactive={true}
                      onRate={(r) => setNewRating(r)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Review Headline *
                    </label>
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
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Review Details *
                    </label>
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
              <p className="text-5xl font-black text-on-surface">
                {avgRating.toFixed(1)}
              </p>
              <div className="flex justify-center mt-2">
                <Stars rating={Math.round(avgRating)} size={18} />
              </div>
              <p className="mt-2 text-xs text-on-surface-variant font-medium">
                Based on {allReviews.length}{" "}
                {allReviews.length === 1 ? "verified review" : "verified reviews"}
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
                        width:
                          allReviews.length > 0
                            ? `${(rc.count / allReviews.length) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                  <span className="w-8 text-right font-medium text-on-surface-variant">
                    {rc.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Cards Grid */}
          {allReviews.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {allReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-surface-container-low/60 p-8 text-center">
              <Icon
                name="rate_review"
                className="mx-auto text-[40px] text-on-surface-variant/50 mb-3"
              />
              <h4 className="text-sm font-bold text-on-surface">
                No reviews yet
              </h4>
              <p className="mt-1 text-xs text-on-surface-variant">
                Be the first to share your experience with this product.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Suggested Products ("You Might Also Like") ── */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles size={14} />
                <span>Curated Suggestions</span>
              </div>
              <h2 className="text-xl font-extrabold text-on-surface sm:text-2xl mt-1">
                You Might Also Like
              </h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Complementary mushroom strains, equipment, and resources for your farm
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              View All
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <SuggestionCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
