"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { PRODUCTS } from "@/data/products";
import { NormalizedProduct, normalizeAll } from "./normalize";
import { StepId, Category } from "./types";
import { loadBundle, saveBundle } from "./persistence";

// ---------- state ----------

interface State {
  products: NormalizedProduct[];
  activeVariant: Record<string, string>; // productId -> variantId
  openStep: StepId;
  hydrated: boolean;
}

type Action =
  | { type: "SET_QTY"; productId: string; variantId: string; qty: number }
  | { type: "SET_ACTIVE_VARIANT"; productId: string; variantId: string }
  | { type: "SET_OPEN_STEP"; step: StepId }
  | {
      type: "HYDRATE";
      quantities: Record<string, number>;
      activeVariant: Record<string, string>;
    };

function initialState(): State {
  const products = normalizeAll(PRODUCTS);
  const activeVariant: Record<string, string> = {};
  for (const p of products) activeVariant[p.id] = p.variants[0].id;
  return { products, activeVariant, openStep: "cameras", hydrated: false };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_QTY": {
      const products = state.products.map((p) => {
        if (p.id !== action.productId) return p;
        return {
          ...p,
          variants: p.variants.map((v) =>
            v.id === action.variantId
              ? { ...v, qty: Math.max(0, action.qty) }
              : v
          ),
        };
      });
      return { ...state, products };
    }
    case "SET_ACTIVE_VARIANT":
      return {
        ...state,
        activeVariant: {
          ...state.activeVariant,
          [action.productId]: action.variantId,
        },
      };
    case "SET_OPEN_STEP":
      return { ...state, openStep: action.step };
    case "HYDRATE": {
      const products = state.products.map((p) => ({
        ...p,
        variants: p.variants.map((v) => ({
          ...v,
          qty: action.quantities[v.id] ?? v.qty,
        })),
      }));
      const activeVariant = { ...state.activeVariant, ...action.activeVariant };
      return { ...state, products, activeVariant, hydrated: true };
    }
    default:
      return state;
  }
}

// ---------- derived helpers ----------

export interface ReviewLine {
  productId: string;
  variantId: string;
  title: string;
  variantLabel?: string;
  image: string;
  qty: number;
  price: number;
  compareAtPrice?: number;
  priceSuffix?: string;
  freeLabel?: string;
  category: Category;
  hasControl: boolean;
}

function buildReviewLines(products: NormalizedProduct[]): ReviewLine[] {
  const lines: ReviewLine[] = [];
  for (const p of products) {
    for (const v of p.variants) {
      if (v.qty <= 0) continue;
      lines.push({
        productId: p.id,
        variantId: v.id,
        title: p.title,
        variantLabel: p.variants.length > 1 ? v.label : undefined,
        image: v.image ?? p.image,
        qty: v.qty,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        priceSuffix: p.priceSuffix,
        freeLabel: p.freeLabel,
        category: p.category,
        hasControl: p.hasControl,
      });
    }
  }
  return lines;
}

function selectedCountForStep(products: NormalizedProduct[], step: StepId) {
  return products.filter(
    (p) => p.step === step && p.variants.some((v) => v.qty > 0)
  ).length;
}

// ---------- context ----------

interface BundleContextValue {
  products: NormalizedProduct[];
  activeVariant: Record<string, string>;
  openStep: StepId;
  setOpenStep: (step: StepId) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  activeVariantFor: (productId: string) => string;
  selectedCount: (step: StepId) => number;
  reviewLines: ReviewLine[];
  totals: {
    subtotal: number;
    compareSubtotal: number;
    savings: number;
    shipping: number;
    total: number;
  };
  saveForLater: () => void;
  justSaved: boolean;
}

const BundleContext = createContext<BundleContextValue | null>(null);

const SHIPPING_COST = 0; // "FREE" in this bundle

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const justSavedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [justSaved, setJustSaved] = useReducer(
    (_: boolean, v: boolean) => v,
    false
  );

  // Hydrate from localStorage once, on mount.
  useEffect(() => {
    const persisted = loadBundle();
    if (persisted) {
      dispatch({
        type: "HYDRATE",
        quantities: persisted.quantities,
        activeVariant: persisted.activeVariant,
      });
    }
  }, []);

  const setQty = (productId: string, variantId: string, qty: number) =>
    dispatch({ type: "SET_QTY", productId, variantId, qty });

  const setActiveVariant = (productId: string, variantId: string) =>
    dispatch({ type: "SET_ACTIVE_VARIANT", productId, variantId });

  const setOpenStep = (step: StepId) =>
    dispatch({ type: "SET_OPEN_STEP", step });

  const activeVariantFor = (productId: string) =>
    state.activeVariant[productId] ?? state.products.find((p) => p.id === productId)!.variants[0].id;

  const selectedCount = (step: StepId) => selectedCountForStep(state.products, step);

  const reviewLines = useMemo(() => buildReviewLines(state.products), [state.products]);

  const totals = useMemo(() => {
    let subtotal = 0;
    let compareSubtotal = 0;
    for (const line of reviewLines) {
      // Skip recurring plan cost from the one-time bundle subtotal math but
      // still show it as its own line; only physical goods count toward
      // the struck-through "compare" total in this design.
      const isRecurring = !!line.priceSuffix;
      subtotal += line.price * line.qty;
      compareSubtotal += (line.compareAtPrice ?? line.price) * line.qty;
      void isRecurring;
    }
    const shipping = SHIPPING_COST;
    const total = subtotal + shipping;
    const savings = Math.max(0, compareSubtotal - subtotal);
    return { subtotal, compareSubtotal, savings, shipping, total };
  }, [reviewLines]);

  const saveForLater = () => {
    const quantities: Record<string, number> = {};
    for (const p of state.products) for (const v of p.variants) quantities[v.id] = v.qty;
    saveBundle({
      quantities,
      activeVariant: state.activeVariant,
      savedAt: new Date().toISOString(),
    });
    setJustSaved(true);
    if (justSavedTimeout.current) clearTimeout(justSavedTimeout.current);
    justSavedTimeout.current = setTimeout(() => setJustSaved(false), 2000);
  };

  const value: BundleContextValue = {
    products: state.products,
    activeVariant: state.activeVariant,
    openStep: state.openStep,
    setOpenStep,
    setQty,
    setActiveVariant,
    activeVariantFor,
    selectedCount,
    reviewLines,
    totals,
    saveForLater,
    justSaved,
  };

  return (
    <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
  );
}

export function useBundle() {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error("useBundle must be used inside <BundleProvider>");
  return ctx;
}
