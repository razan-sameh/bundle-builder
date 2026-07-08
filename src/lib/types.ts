export type StepId = "cameras" | "plan" | "sensors" | "protection";

export type Category = "Cameras" | "Sensors" | "Accessories" | "Plan";

export interface Variant {
  id: string; // unique across the whole catalog, e.g. "wyze-cam-v4:white"
  label: string; // "White"
  swatch: string; // hex color or small thumbnail url
  qty: number; // seed quantity
}

export interface Product {
  id: string; // unique product id, e.g. "wyze-cam-v4"
  step: StepId;
  category: Category;
  title: string;
  description?: string;
  image: string; // path under /public
  learnMoreUrl?: string;
  badge?: string; // "Save 22%"
  compareAtPrice?: number; // struck-through price
  price: number; // active price
  priceSuffix?: string; // e.g. "/mo" for plan items
  variants?: Variant[]; // omit for single-variant products
  qty?: number; // seed quantity when there are no variants
  hasControl: boolean; // false => pre-populated in review with no +/- in this step's card view
  freeLabel?: string; // e.g. show "FREE" instead of a price (Sync Hub)
}

export interface StepMeta {
  id: StepId;
  index: number; // 1-based
  title: string;
  icon: "camera" | "plan" | "sensor" | "shield";
}

export const STEPS: StepMeta[] = [
  { id: "cameras", index: 1, title: "Choose your cameras", icon: "camera" },
  { id: "plan", index: 2, title: "Choose your plan", icon: "plan" },
  { id: "sensors", index: 3, title: "Choose your sensors", icon: "sensor" },
  { id: "protection", index: 4, title: "Add extra protection", icon: "shield" },
];
