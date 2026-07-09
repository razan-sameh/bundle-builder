function fmt(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

interface Props {
  price: number;
  compareAtPrice?: number;
  suffix?: string;
  freeLabel?: string;
  isReview?: boolean;
  align?: "left" | "right";
  layout?: "inline" | "stacked";
  isTotal?: boolean;
}

export default function Price({
  price,
  compareAtPrice,
  suffix,
  freeLabel,
  isReview = false,
  layout = "stacked",
  isTotal= false
}: Props) {
  const hasDiscount = (compareAtPrice && compareAtPrice > price) || !!freeLabel;
  return (
    <div
      className={`${layout === "stacked" ? "flex flex-col items-end" : "flex items-baseline gap-1.5 justify-end"}`}
    >
      {hasDiscount && (
        <span
          className={`${isTotal ? "text-lg" : isReview ? "text-sm" : "text-base "} ${isReview ? "text-[#6F7882] " : "text-[#D8392B]  "} line-through`}
        >
          {fmt(compareAtPrice ?? price)}
          {suffix && <span>{suffix}</span>}
        </span>
      )}
      <span
        className={`${isTotal ? "text-2xl" : isReview ? "text-sm" : "text-base "} ${isReview ? "font-semibold text-[#4E2FD2]" : "text-[#575757]"}`}
      >
        {freeLabel ?? fmt(price)}
        {suffix && <span>{suffix}</span>}
      </span>
    </div>
  );
}
