import { useCallback, useLayoutEffect, useRef, useState } from "react";

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

/* -----------------------------
   HELPER
------------------------------*/
const isVisible = (el: Element) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

/* -----------------------------
   useInView (FIXED)
------------------------------*/
export const useInView = <T extends Element = HTMLElement>({
  rootMargin = "0px 0px -15% 0px",
  threshold = 0.05,
  once = false,
}: UseInViewOptions = {}) => {
  const ref = useRef<T | null>(null);

  // 🔥 FIX: start TRUE to avoid first paint flicker
  const [inView, setInView] = useState(true);

  const triggered = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    //FIX 1: immediate sync check (first visit bug fix)
    const visibleNow = isVisible(el);

    if (visibleNow) {
      setInView(true);
      triggered.current = true;
      if (once) return;
    } else {
      setInView(false);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting || entry.intersectionRatio > 0;

        if (visible) {
          setInView(true);
          triggered.current = true;

          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
};

/* -----------------------------
   useInViewMap (FIXED SAFE)
------------------------------*/
export const useInViewMap = <T extends Element = HTMLElement>({
  rootMargin = "0px 0px -15% 0px",
  threshold = 0.05,
  once = true,
}: UseInViewOptions = {}) => {
  const elementsRef = useRef<Map<string, T>>(new Map());
  const idMap = useRef<WeakMap<Element, string>>(new WeakMap());

  const [inViewMap, setInViewMap] = useState<Record<string, boolean>>({});

  const setRef = useCallback(
    (id: string) => (node: T | null) => {
      if (node) {
        elementsRef.current.set(id, node);
        idMap.current.set(node, id);
      } else {
        const prev = elementsRef.current.get(id);
        if (prev) idMap.current.delete(prev);
        elementsRef.current.delete(id);
      }
    },
    []
  );

  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (elementsRef.current.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const updates: Record<string, boolean> = {};

        entries.forEach((entry) => {
          const id = idMap.current.get(entry.target);
          if (!id) return;

          const visible =
            entry.isIntersecting || entry.intersectionRatio > 0;

          if (visible) {
            updates[id] = true;

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            updates[id] = false;
          }
        });

        if (Object.keys(updates).length) {
          setInViewMap((prev) => ({
            ...prev,
            ...updates,
          }));
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    //FIX: observe immediately after layout paint
    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { setRef, inViewMap };
};