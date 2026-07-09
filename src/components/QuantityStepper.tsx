"use client";

interface Props {
  qty: number;
  onChange: (qty: number) => void;
  disabled?: boolean;
  isReview?: boolean;
}

export default function QuantityStepper({
  qty,
  onChange,
  disabled = false,
  isReview = false,
}: Props) {
  return (
    <div className={`inline-flex items-center ${disabled ? "opacity-50" : ""}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || qty <= 0}
        onClick={() => onChange(qty - 1)}
        className={`h-5 w-5 text-base rounded-lg ${isReview ? "not-disabled:bg-white" : "not-disabled:bg-[#E6EBF0]"}  flex items-center justify-center rounded-sm text-[#525963] disabled:cursor-not-allowed  ${isReview ? "disabled:border disabled:border-[#CED6DE] disabled:text-[#575757] bg-[#F1F1F2]" : "disabled:border disabled:border-[#F0F4F7] disabled:text-[#CED6DE]"}`}
      >
        <p>-</p>
      </button>
      <span className="min-w-[1.5rem] text-center text-sm font-medium text-slate-800">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled}
        onClick={() => onChange(qty + 1)}
        className={`h-5 w-5 text-base rounded-lg ${isReview ? "not-disabled:bg-white" : "not-disabled:bg-[#E6EBF0]"}  flex items-center justify-center rounded-sm text-[#525963] disabled:cursor-not-allowed  ${isReview ? "disabled:border disabled:border-[#CED6DE] disabled:text-[#575757] bg-[#F1F1F2]" : "disabled:border disabled:border-[#F0F4F7] disabled:text-[#CED6DE]"}`}
      >
        <p>+</p>
      </button>
    </div>
  );
}
