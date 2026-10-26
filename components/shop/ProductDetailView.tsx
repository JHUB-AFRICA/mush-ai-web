"use client";

import { useState } from "react";
import type { Product, ReviewItem } from "@/lib/products";
import { useCart } from "./CartProvider";
import ProductBreadcrumbs from "./ProductBreadcrumbs";
import ProductHero from "./ProductHero";
import ProductSpecs from "./ProductSpecs";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  reviews: ReviewItem[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
  reviews: initialReviews,
}: ProductDetailViewProps) {
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

  const categorySectionHref =
    product.category === "Grow Kits & Structures"
      ? "/shop#services-we-offer"
      : "/shop#mushroom-sales";

  return (
    <div className="min-h-screen bg-surface">
      <ProductBreadcrumbs
        product={product}
        categorySectionHref={categorySectionHref}
      />

      <ProductHero
        product={product}
        qty={qty}
        setQty={setQty}
        added={added}
        handleAdd={handleAdd}
        avgRating={avgRating}
        allReviews={allReviews}
        scrollToReviews={scrollToReviews}
        categorySectionHref={categorySectionHref}
      />

      <ProductSpecs product={product} />

      <ProductReviews
        product={product}
        reviews={allReviews}
        showReviewForm={showReviewForm}
        setShowReviewForm={setShowReviewForm}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        newLocation={newLocation}
        setNewLocation={setNewLocation}
        newRating={newRating}
        setNewRating={setNewRating}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newBody={newBody}
        setNewBody={setNewBody}
        formSubmitted={formSubmitted}
        setFormSubmitted={setFormSubmitted}
        handleReviewSubmit={handleReviewSubmit}
        avgRating={avgRating}
        ratingCounts={ratingCounts}
        allReviews={allReviews}
      />

      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
}
