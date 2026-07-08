"use client";

interface Props {
  qty: number;
  onChange: (qty: number) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

export default function QuantityStepper({
  qty,
  onChange,
  disabled = false,
  size = "md",
}: Props) {
  const dims = size === "sm" ? "h-7 w-7 text-sm" : "h-8 w-8 text-base";

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || qty <= 0}
        onClick={() => onChange(qty - 1)}
        className={`${dims} flex items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
      >
        −
      </button>
      <span className="min-w-[1.5rem] text-center text-sm font-medium text-slate-800">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled}
        onClick={() => onChange(qty + 1)}
        className={`${dims} flex items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed`}
      >
        +
      </button>
    </div>
  );
}
