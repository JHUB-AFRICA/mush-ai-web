"use client";

import Icon from "@/components/ui/Icon";
import type { Product } from "@/lib/products";

interface ProductSpecsProps {
  product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
      <div className="rounded-3xl border border-surface-container-high/60 bg-surface-container-lowest p-6 sm:p-10 shadow-xs space-y-8">
        {/* About This Product */}
        <div>
          <h2 className="text-xl font-extrabold text-on-surface sm:text-2xl mb-3">
            About This Product
          </h2>
          <p className="text-sm leading-relaxed text-on-surface-variant max-w-4xl">
            {product.longDescription || product.description}
          </p>
        </div>

        {/* Technical Specifications */}
        {product.specs && product.specs.length > 0 ? (
          <div className="border-t border-surface-container-high/60 pt-6 sm:pt-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-container mb-2">
              <Icon name="tune" className="text-[16px]" />
              <span>Technical Specifications</span>
            </div>
            <h3 className="text-xl font-extrabold text-on-surface sm:text-2xl mb-4">
              Specifications
            </h3>
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
                      <td className="px-5 py-3.5 font-semibold text-on-surface w-2/5 sm:w-1/4 border-b border-surface-container-high/40">
                        {spec.label}
                      </td>
                      <td className="px-5 py-3.5 text-on-surface-variant border-b border-surface-container-high/40">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="border-t border-surface-container-high/60 pt-6 sm:pt-8">
            <div className="rounded-2xl border border-surface-container-high/60 bg-surface-container-low/40 p-6 text-sm text-on-surface-variant">
              Certified agricultural specifications guaranteed directly by
              SmartMushroom Juja Lab.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
