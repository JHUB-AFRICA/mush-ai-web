"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ShopHeader from "@/components/shop/navigation/ShopHeader";
import ProductCatalog from "@/components/shop/product/ProductCatalog";

function ShopContent() {
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(qParam);

  useEffect(() => {
    if (qParam) {
      setQuery(qParam);
    }
  }, [qParam]);

  return (
    <>
      <ShopHeader query={query} setQuery={setQuery} />
      <ProductCatalog query={query} setQuery={setQuery} />
    </>
  );
}

export default function ShopView() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}


