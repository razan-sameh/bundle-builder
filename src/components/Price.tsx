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
  align?: "left" | "right";
  layout?: "inline" | "stacked";
}

export default function Price({
  price,
  compareAtPrice,
  suffix,
  freeLabel,
  align = "left",
  layout = "inline",
}: Props) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  if (layout === "stacked") {
    return (
      <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
        {hasDiscount && (
          <span className="text-xs text-red-500 line-through">{fmt(compareAtPrice)}</span>
        )}
        <span className="text-base font-semibold text-slate-900">
          {freeLabel ?? fmt(price)}
          {suffix && <span className="font-normal text-slate-500">{suffix}</span>}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-baseline gap-1.5 ${
        align === "right" ? "justify-end" : ""
      }`}
    >
      {hasDiscount && (
        <span className="text-xs text-slate-400 line-through">{fmt(compareAtPrice)}</span>
      )}
      <span className="text-sm font-semibold text-slate-900">
        {freeLabel ?? fmt(price)}
        {suffix && <span className="font-normal text-slate-500">{suffix}</span>}
      </span>
    </div>
  );
}
