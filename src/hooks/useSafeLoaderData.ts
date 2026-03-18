import { useLoaderData } from "react-router-dom";

/**
 * Safe hook for accessing loader data with null/undefined protection
 * Prevents hydration errors by providing default empty object
 */
export function useSafeLoaderData<T = any>(): T {
  const loaderData = useLoaderData() as T || {} as T;
  return loaderData;
}

/**
 * Helper to safely access nested properties with fallback
 */
export function safeGet<T>(obj: any, path: string, fallback: T): T {
  try {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result == null || result === undefined) {
        return fallback;
      }
      result = result[key];
    }
    return result !== undefined && result !== null ? result : fallback;
  } catch {
    return fallback;
  }
}
