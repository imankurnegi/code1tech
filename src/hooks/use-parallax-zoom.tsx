import { useEffect, useRef, RefObject } from "react";

/**
 * Subtle parallax zoom hook — scales and translates an image based on
 * the scroll progress of its nearest section. Uses direct DOM transforms
 * via rAF, never triggering React re-renders.
 *
 * @param maxScale Maximum scale value (default 1.18)
 * @param maxTranslate Maximum vertical translate in px (default 30)
 */
export const useParallaxZoom = <T extends HTMLElement = HTMLImageElement>(
  maxScale: number = 1.18,
  maxTranslate: number = 30
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;

      // Skip when fully out of view
      if (rect.bottom < -100 || rect.top > wh + 100) return;

      // Progress: 0 when element bottom is at viewport top, 1 when element top is at viewport bottom.
      const total = wh + rect.height;
      const progress = Math.min(1, Math.max(0, (wh - rect.top) / total));

      const scale = 1 + (maxScale - 1) * progress;
      const translateY = (progress - 0.5) * -2 * maxTranslate;

      el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };

    el.style.willChange = "transform";
    el.style.transformOrigin = "center center";
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
      if (el) el.style.willChange = "";
    };
  }, [maxScale, maxTranslate]);

  return ref;
};
