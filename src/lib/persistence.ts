const STORAGE_KEY = "bundle-builder:v1";

export interface PersistedState {
  // productId:variantId -> qty
  quantities: Record<string, number>;
  // productId -> active variantId
  activeVariant: Record<string, string>;
  savedAt: string;
}

export function saveBundle(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage can throw in private-browsing / quota-exceeded situations.
    // Saving is best-effort; silently ignore.
  }
}

export function loadBundle(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export function clearBundle() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
