"use client";

import Image from "next/image";
import { useState } from "react";
import { useBundle } from "@/lib/store";
import { Category } from "@/lib/types";
import QuantityStepper from "./QuantityStepper";
import Price from "./Price";
import { FINANCING, SHIPPING } from "@/data/products";

const CATEGORY_ORDER: Category[] = [
  "Cameras",
  "Sensors",
  "Accessories",
  "Plan",
];

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
    <aside className="flex flex-col gap-3 rounded-2xl bg-[#EDF4FF] px-5 pt-3">
      <div className="border-b border-[#CED6DE] pb-2">
        <p className="text-xs font-medium uppercase text-[#484848] tracking-widest pb-3">
          Review
        </p>
        <h2 className="text-lg font-semibold tracking-wider">
          Your security system
        </h2>
        <p className="text-sm font-medium text-[#1F1F1FBF]">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {grouped.map((group) => (
          <div
            key={group.category}
            className="flex flex-col gap-3 border-b border-[#CED6DE] pb-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#A8B2BD]">
              {group.category}
            </p>
            {group.lines.map((line) => (
              <div
                key={line.variantId}
                className="flex flex-col gap-2 rounded-xl bg-white/60 p-3 sm:flex-row sm:items-center sm:gap-3 sm:bg-transparent sm:p-0"
              >
                <div className="flex items-center gap-3 sm:contents">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Image
                      src={line.image}
                      alt={line.title}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {line.title}
                      {line.variantLabel && (
                        <span className="text-slate-400">
                          {" "}
                          — {line.variantLabel}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:contents">
                  <QuantityStepper
                    qty={line.qty}
                    disabled={!line.hasControl}
                    onChange={(qty) =>
                      setQty(line.productId, line.variantId, qty)
                    }
                    isReview={true}
                  />
                  <div className="w-20 text-right sm:w-20">
                    <Price
                      price={line.price}
                      compareAtPrice={line.compareAtPrice}
                      suffix={line.priceSuffix}
                      freeLabel={line.freeLabel}
                      isReview={true}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/shipping.svg" // update to your icon
            alt="Shipping"
            width={22}
            height={22}
            className="h-10 w-10"
          />

          <span className="text-sm font-medium text-[#0B0D10]">
            {SHIPPING.label}
          </span>
        </div>

        <Price
          price={SHIPPING.price}
          compareAtPrice={SHIPPING.compareAtPrice}
          freeLabel={SHIPPING.freeLabel}
          isReview={true}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/totals.png" // update to your icon
            alt="Shipping"
            width={78}
            height={78}
            className="h-20 w-20"
          />
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex w-fit items-center  justify-center bg-[#4E2FD2] rounded-sm px-2 mb-2 text-sm text-white tracking-tighter">
            <p>{FINANCING.label}</p>
          </div>
          <Price
            price={totals.total}
            compareAtPrice={totals.compareSubtotal}
            isReview={true}
            layout="inline"
            isTotal={true}
          />
        </div>
      </div>

      <div className="pt-2">
        {totals.savings > 0 && (
          <p className="text-center text-xs font-medium text-[#0AA288] tracking-tighter">
            Congrats! You&apos;re saving {fmt(totals.savings)} on your security
            bundle!
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setCheckedOut(true)}
        className="rounded-sm bg-[#4e2fd2] py-2 text-md font-bold text-white "
      >
        Checkout
      </button>
      {checkedOut && (
        <p className="text-center text-xs font-medium text-[#0AA288]">
          This is a prototype — there&apos;s nowhere for checkout to go yet!
        </p>
      )}

      <button
        type="button"
        onClick={saveForLater}
        className="text-center text-sm italic font-base text-[#484848] underline"
      >
        {justSaved ? "Saved ✓" : "Save my system for later"}
      </button>
    </aside>
  );
}
