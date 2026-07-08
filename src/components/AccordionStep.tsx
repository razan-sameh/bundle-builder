"use client";

import { StepMeta, STEPS } from "@/lib/types";
import { useBundle } from "@/lib/store";
import ProductCard from "./ProductCard";
import { StepIcon, ChevronDown, ChevronUp } from "./icons";

export default function AccordionStep({ meta }: { meta: StepMeta }) {
  const { products, openStep, setOpenStep, selectedCount } = useBundle();

  const isOpen = openStep === meta.id;
  const count = selectedCount(meta.id);
  const stepProducts = products.filter((p) => p.step === meta.id);
  const nextStep = STEPS.find((s) => s.index === meta.index + 1);

  return (
    <section
      className={`rounded-2xl border ${
        isOpen ? "border-indigo-200 bg-indigo-50/40" : "border-slate-200 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpenStep(meta.id)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-500">
            Step {meta.index} of 4
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span className="text-slate-400">
              <StepIcon icon={meta.icon} />
            </span>
            {meta.title}
          </span>
        </div>

        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          {isOpen ? (
            <>
              <span className="text-indigo-600">{count} selected</span>
              <ChevronUp className="text-indigo-600" />
            </>
          ) : (
            <ChevronDown />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stepProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {nextStep && (
            <button
              type="button"
              onClick={() => setOpenStep(nextStep.id)}
              className="self-start rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Next: {nextStep.title}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
