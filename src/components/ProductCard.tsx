"use client";

import Image from "next/image";
import { NormalizedProduct } from "@/lib/normalize";
import { useBundle } from "@/lib/store";
import VariantSelector from "./VariantSelector";
import QuantityStepper from "./QuantityStepper";
import Price from "./Price";

export default function ProductCard({ product }: { product: NormalizedProduct }) {
  const { activeVariantFor, setActiveVariant, setQty } = useBundle();

  const activeVariantId = activeVariantFor(product.id);
  const activeVariant =
    product.variants.find((v) => v.id === activeVariantId) ?? product.variants[0];
  const isSelected = product.variants.some((v) => v.qty > 0);

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border bg-white p-4 transition ${
        isSelected
          ? "border-indigo-400 ring-1 ring-indigo-400"
          : "border-slate-200"
      }`}
    >
      <div className="relative">
        {product.badge && (
          <span className="absolute left-0 top-0 z-10 rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-semibold text-white">
            {product.badge}
          </span>
        )}
        <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
          <Image
            src={product.image}
            alt={product.title}
            width={96}
            height={96}
            className="h-20 w-20 object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-slate-900">{product.title}</h3>
        {product.description && (
          <p className="text-xs leading-snug text-slate-500">{product.description}</p>
        )}
        {product.learnMoreUrl && (
          <a
            href={product.learnMoreUrl}
            className="text-xs font-medium text-[#4e2fd2] hover:underline"
          >
            Learn More
          </a>
        )}
      </div>

      <VariantSelector
        variants={product.variants}
        activeVariantId={activeVariantId}
        onSelect={(variantId) => setActiveVariant(product.id, variantId)}
      />

      <div className="mt-auto flex items-center justify-between pt-1">
        <QuantityStepper
          qty={activeVariant.qty}
          disabled={!product.hasControl}
          onChange={(qty) => setQty(product.id, activeVariant.id, qty)}
        />
        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          suffix={product.priceSuffix}
          freeLabel={product.freeLabel}
        />
      </div>
    </div>
  );
}
