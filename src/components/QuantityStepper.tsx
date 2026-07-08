"use client";

interface Props {
  qty: number;
  onChange: (qty: number) => void;
  disabled?: boolean;
}

export default function QuantityStepper({
  qty,
  onChange,
  disabled = false,
}: Props) {
  return (
    <div
      className={`inline-flex items-center ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || qty <= 0}
        onClick={() => onChange(qty - 1)}
        className={`h-5 w-5 text-base rounded-lg not-disabled:bg-[#E6EBF0] border border-[#F0F4F7] flex items-center justify-center rounded-sm text-[#525963] disabled:cursor-not-allowed disabled:border-[#F0F4F7] disabled:text-[#CED6DE]`}
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
        className={`h-5 w-5 text-base rounded-lg bg-[#E6EBF0] border border-[#F0F4F7] flex items-center justify-center rounded-sm text-[#525963] disabled:cursor-not-allowed disabled:bg-[#F0F4F7] disabled:text-[#CED6DE]`}
      >
        +
      </button>
    </div>
  );
}
