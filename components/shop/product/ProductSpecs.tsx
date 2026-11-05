"use client";

import Icon from "@/components/ui/Icon";
import { Check } from "lucide-react";
import type { Product } from "@/lib/products";

interface ProductSpecsProps {
  product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12">
      <div className="rounded-3xl border border-surface-container-high/60 bg-surface-container-lowest p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* About This Product */}
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
          </div>

          {/* Technical Specifications */}
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
                Certified agricultural specifications guaranteed directly by
                SmartMushroom Juja Lab.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
