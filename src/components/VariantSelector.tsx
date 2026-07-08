"use client";

import { Variant } from "@/lib/types";

interface Props {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export default function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
}: Props) {
  if (variants.length <= 1) return null;

  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Color">
      {variants.map((v) => {
        const active = v.id === activeVariantId;
        return (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={v.label}
            onClick={() => onSelect(v.id)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 py-1 pl-1 pr-2 text-xs text-slate-600"
            // Styling for the active/selected chip is intentionally left minimal —
            // spec calls out that chip highlighting isn't the focus of this task.
          >
            <span
              className="h-4 w-4 rounded-full border border-slate-300"
              style={{ backgroundColor: v.swatch }}
            />
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
