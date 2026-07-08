"use client";

import Image from "next/image";
import { useState } from "react";
import { useBundle } from "@/lib/store";
import { Category } from "@/lib/types";
import QuantityStepper from "./QuantityStepper";
import Price from "./Price";
import { GUARANTEE, FINANCING, SHIPPING } from "@/data/products";

const CATEGORY_ORDER: Category[] = ["Cameras", "Sensors", "Accessories", "Plan"];

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function ReviewPanel() {
  const { reviewLines, totals, setQty, saveForLater, justSaved } = useBundle();
  const [checkedOut, setCheckedOut] = useState(false);

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    lines: reviewLines.filter((l) => l.category === cat),
  })).filter((g) => g.lines.length > 0);

  return (
    <aside className="flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-500">
          Review
        </p>
        <h2 className="text-lg font-bold text-slate-900">Your security system</h2>
        <p className="mt-1 text-xs text-slate-500">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {grouped.map((group) => (
          <div key={group.category} className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {group.category}
            </p>
            {group.lines.map((line) => (
              <div key={line.variantId} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Image src={line.image} alt={line.title} width={32} height={32} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {line.title}
                    {line.variantLabel && (
                      <span className="text-slate-400"> — {line.variantLabel}</span>
                    )}
                  </p>
                </div>
                <QuantityStepper
                  size="sm"
                  qty={line.qty}
                  disabled={!line.hasControl}
                  onChange={(qty) => setQty(line.productId, line.variantId, qty)}
                />
                <div className="w-20 text-right">
                  <Price
                    align="right"
                    price={line.price}
                    compareAtPrice={line.compareAtPrice}
                    suffix={line.priceSuffix}
                    freeLabel={line.freeLabel}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-indigo-100 pt-3 text-sm">
        <span className="text-slate-600">{SHIPPING.label}</span>
        <span className="font-semibold text-emerald-600">{SHIPPING.freeLabel}</span>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-white p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          ✓
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">{GUARANTEE.title}</p>
          <p className="text-[11px] text-slate-500">{GUARANTEE.description}</p>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {FINANCING.label} <span className="font-semibold text-slate-700">{FINANCING.provider}</span>
      </p>

      <div className="border-t border-indigo-100 pt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-slate-700">Total</span>
          <div className="flex items-baseline gap-2">
            {totals.savings > 0 && (
              <span className="text-xs text-slate-400 line-through">
                {fmt(totals.compareSubtotal)}
              </span>
            )}
            <span className="text-xl font-bold text-slate-900">{fmt(totals.total)}</span>
          </div>
        </div>
        {totals.savings > 0 && (
          <p className="mt-1 text-right text-xs font-medium text-emerald-600">
            Congrats! You&apos;re saving {fmt(totals.savings)} on your security bundle
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setCheckedOut(true)}
        className="rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Checkout
      </button>
      {checkedOut && (
        <p className="text-center text-xs font-medium text-emerald-600">
          This is a prototype — there&apos;s nowhere for checkout to go yet!
        </p>
      )}

      <button
        type="button"
        onClick={saveForLater}
        className="text-center text-xs font-medium text-indigo-600 hover:underline"
      >
        {justSaved ? "Saved ✓" : "Save my system for later"}
      </button>
    </aside>
  );
}
