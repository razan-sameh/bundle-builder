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
    <section className={`${isOpen && "bg-[#EDF4FF] rounded-2xl"}`}>
      <button
        type="button"
        onClick={() => setOpenStep(meta.id)}
        aria-expanded={isOpen}
        className=" w-full py-2 text-left"
      >
        <div className="border-b border-[#48484885] text-left">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#484848] px-4">
            Step {meta.index} of 4
          </span>
        </div>
        <div
          className={`flex w-full items-center justify-between gap-3 pt-2 text-left px-4 ${!isOpen && "border-b pb-2 border-[#48484885]"}`}
        >
          <span className="flex items-center gap-2 text-md font-semibold text-slate-900">
            <span className="text-slate-400">
              <StepIcon icon={meta.icon} />
            </span>
            {meta.title}
          </span>

          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            {isOpen ? (
              <>
                <span className="text-[#4E2FD2]">{count} selected</span>
                <ChevronUp />
              </>
            ) : (
              <ChevronDown />
            )}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-2">
            {stepProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {nextStep && (
            <button
              type="button"
              onClick={() => setOpenStep(nextStep.id)}
              className="self-center rounded-md border border-[#4e2fd2] px-5 py-1.5 text-sm font-semibold text-[#4e2fd2]"
            >
              Next: {nextStep.title}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
