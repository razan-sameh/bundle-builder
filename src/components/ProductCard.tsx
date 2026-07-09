"use client";

import Image from "next/image";
import { NormalizedProduct } from "@/lib/normalize";
import { useBundle } from "@/lib/store";
import VariantSelector from "./VariantSelector";
import QuantityStepper from "./QuantityStepper";
import Price from "./Price";

export default function ProductCard({
  product,
}: {
  product: NormalizedProduct;
}) {
  const { activeVariantFor, setActiveVariant, setQty } = useBundle();

  const activeVariantId = activeVariantFor(product.id);
  const activeVariant =
    product.variants.find((v) => v.id === activeVariantId) ??
    product.variants[0];
  const isSelected = product.variants.some((v) => v.qty > 0);

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border bg-white p-3 shadow-sm transition
      xl:flex-row xl:gap-4 xl:p-4
      ${isSelected ? "border-[#4e2fd2] ring-1 ring-[#4e2fd2]" : "border-slate-200"}`}
    >
      <div className="relative flex w-full justify-center xl:w-auto xl:justify-start">
        {" "}
        {product.badge && (
          <span className="absolute left-0 top-0 z-10 rounded-full bg-[#4e2fd2] px-2 py-0.5 text-[10px] font-semibold text-white sm:-left-1 sm:-top-1 sm:text-[11px]">
            {product.badge}
          </span>
        )}
        <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-xl xl:h-28 xl:w-24">
          {" "}
          <Image
            src={product.image}
            alt={product.title}
            width={96}
            height={96}
            className="h-20 w-20 object-contain sm:h-20 sm:w-20"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold text-slate-900">
            {product.title}
          </h3>
          {(product.description || product.learnMoreUrl) && (
            <p className="text-xs leading-snug text-[#1F1F1FBF]">
              {product.description}{" "}
              {product.learnMoreUrl && (
                <a
                  href={product.learnMoreUrl}
                  className="font-medium text-[#0000EE] underline"
                >
                  Learn More
                </a>
              )}
            </p>
          )}
        </div>

        <VariantSelector
          variants={product.variants}
          activeVariantId={activeVariantId}
          fallbackImage={product.image}
          onSelect={(variantId) => setActiveVariant(product.id, variantId)}
        />

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
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
            isReview={false}
          />
        </div>
      </div>
    </div>
  );
}
