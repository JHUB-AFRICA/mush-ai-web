"use client";

import { useState } from "react";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductCatalog from "@/components/shop/ProductCatalog";

export default function ShopView() {
  const [query, setQuery] = useState("");

  return (
    <>
      <ShopHeader query={query} setQuery={setQuery} />
      <ProductCatalog query={query} setQuery={setQuery} />
    </>
  );
}

