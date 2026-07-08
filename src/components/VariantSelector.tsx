"use client";

import Image from "next/image";
import { Variant } from "@/lib/types";

interface Props {
  variants: Variant[];
  activeVariantId: string;
  fallbackImage?: string;
  onSelect: (variantId: string) => void;
}

function isImageUrl(value?: string) {
  return Boolean(value?.startsWith("/") || value?.startsWith("http"));
}

export default function VariantSelector({
  variants,
  activeVariantId,
  fallbackImage,
  onSelect,
}: Props) {
  if (variants.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5" role="radiogroup" aria-label="Color">
      {variants.map((v) => {
        const active = v.id === activeVariantId;
        const thumbnail = v.image ?? fallbackImage;

        return (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={v.label}
            onClick={() => onSelect(v.id)}
            className={`flex items-center gap-1 rounded-sm border py-0.5 pl-0.5 pr-2 text-xs transition ${
              active ? "border-[#0AA288] bg-[#1DF0BB0A]" : "border-slate-200"
            }`}
          >
            {isImageUrl(thumbnail) ? (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-slate-50">
                <Image
                  src={thumbnail!}
                  alt={v.label}
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </span>
            ) : (
              <span
                className="h-5 w-5 shrink-0 rounded-sm border border-slate-200"
                style={{ backgroundColor: v.swatch ?? "#e2e8f0" }}
              />
            )}
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
