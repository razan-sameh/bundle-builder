import { Product, Variant } from "./types";

export const DEFAULT_VARIANT_SUFFIX = "default";

export function defaultVariantId(productId: string) {
  return `${productId}:${DEFAULT_VARIANT_SUFFIX}`;
}

/** A product guaranteed to have a non-empty `variants` array. */
export interface NormalizedProduct extends Product {
  variants: Variant[];
}

export function normalizeProduct(p: Product): NormalizedProduct {
  if (p.variants && p.variants.length > 0) {
    return { ...p, variants: p.variants };
  }
  return {
    ...p,
    variants: [
      {
        id: defaultVariantId(p.id),
        label: "Default",
        image: p.image,
        qty: p.qty ?? 0,
      },
    ],
  };
}

export function normalizeAll(products: Product[]): NormalizedProduct[] {
  return products.map(normalizeProduct);
}
