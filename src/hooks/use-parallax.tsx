import { useEffect, useState, useRef, RefObject } from "react";

// Simple scroll-based parallax
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return offset * speed;
};

// Advanced element-relative parallax
export const useElementParallax = (
  speed: number = 0.15,
  direction: "vertical" | "horizontal" = "vertical"
) => {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1, opacity: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far through the viewport the element is
        // -1 = above viewport, 0 = center, 1 = below viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const progress = (elementCenter - viewportCenter) / windowHeight;
        
        // Only apply effect when element is in or near viewport
        if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

        if (direction === "vertical") {
          setTransform({
            x: 0,
            y: progress * speed * 100,
            scale: 1,
            opacity: 1
          });
        } else {
          setTransform({
            x: progress * speed * 50,
            y: 0,
            scale: 1,
            opacity: 1
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed, direction]);

  return { ref, transform };
};

// Multi-layer parallax for complex backgrounds
export const useLayeredParallax = (layers: number = 3) => {
  const [offsets, setOffsets] = useState<number[]>(Array(layers).fill(0));
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Skip if not visible
        if (rect.bottom < 0 || rect.top > windowHeight) return;

        // Calculate progress through viewport
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        
        // Different speeds for each layer (back layers move slower)
        const newOffsets = Array(layers).fill(0).map((_, i) => {
          const layerSpeed = 0.05 + (i * 0.03); // 0.05, 0.08, 0.11, etc.
          return (progress - 0.5) * layerSpeed * 200;
        });

        setOffsets(newOffsets);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [layers]);

  return { containerRef, offsets };
};
