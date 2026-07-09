import { STEPS } from "@/lib/types";
import AccordionStep from "@/components/AccordionStep";
import ReviewPanel from "@/components/ReviewPanel";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:px-8">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
        <div className="flex flex-col gap-3">
          {STEPS.map((meta) => (
            <AccordionStep key={meta.id} meta={meta} />
          ))}
        </div>

        <div className="xl:sticky xl:top-8">
          <ReviewPanel />
        </div>
      </div>
    </main>
  );
}
