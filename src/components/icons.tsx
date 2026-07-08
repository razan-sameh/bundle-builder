import { StepMeta } from "@/lib/types";

export function StepIcon({ icon }: { icon: StepMeta["icon"] }) {
  const common = "h-4 w-4";
  switch (icon) {
    case "camera":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7l1.5-2h5L16 7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "plan":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "sensor":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 12a7 7 0 0114 0M2 12a10 10 0 0120 0" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

export function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 ${className}`}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronUp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 ${className}`}>
      <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
