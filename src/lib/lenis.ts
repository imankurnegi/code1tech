import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
  });

  // Sync Lenis scroll position with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Drive Lenis via GSAP ticker for perfect frame sync
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  // Disable GSAP's default lag smoothing to prevent conflicts
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}

export { gsap, ScrollTrigger };
