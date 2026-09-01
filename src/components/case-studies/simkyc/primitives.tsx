import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/* Connected Journey design tokens (case-study scoped) */
export const CJ = {
  ink: "#07111F",
  surface: "#102236",
  cyan: "#69D6FF",
  mint: "#A9E7C2",
  head: "#F7FAFC",
  body: "#A8B8C7",
};

export const cjContainer = "mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-10";
export const cjSection = "py-14 md:py-16 lg:py-20";
export const cjCard =
  "rounded-[24px] border border-white/[0.07] bg-[#102236]/70 backdrop-blur-sm";
export const cjFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69D6FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111F]";

export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
};

/** Small uppercase chapter/metadata pill */
export const MetaPill = ({
  children,
  tone = "cyan",
  className,
}: {
  children: React.ReactNode;
  tone?: "cyan" | "mint";
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]",
      tone === "cyan"
        ? "border-[#69D6FF]/25 bg-[#69D6FF]/10 text-[#69D6FF]"
        : "border-[#A9E7C2]/25 bg-[#A9E7C2]/10 text-[#A9E7C2]",
      className
    )}
  >
    {children}
  </span>
);

export const ChapterLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-5 flex items-center gap-4">
    <span aria-hidden="true" className="h-px w-10 bg-[#69D6FF]/50" />
    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#69D6FF]">
      {children}
    </span>
  </div>
);

export const SectionTitle = ({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) => (
  <Tag
    className={cn(
      "text-[1.75rem] sm:text-[2rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-tight text-left text-gradient-brand",
      className
    )}
  >
    {children}
  </Tag>
);

export const Body = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={cn(
      "text-[15px] sm:text-[16.5px] leading-[1.75] text-[#A8B8C7] text-left max-w-[680px]",
      className
    )}
  >
    {children}
  </p>
);

export const Counter = ({ value }: { value: string }) => {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const [display, setDisplay] = useState(value);
  const numeric = parseFloat(value.replace(/[^\d.]/g, ""));
  const hasNumber = !Number.isNaN(numeric);
  const prefix = hasNumber
    ? value.slice(0, value.indexOf(value.replace(/[^\d.]/g, "")[0]))
    : "";
  const suffix = hasNumber ? value.slice(prefix.length + String(numeric).length) : "";
  const raf = useRef<number>();

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!hasNumber || reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      setDisplay(`${prefix}0${suffix}`);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${prefix}${Math.round(numeric * eased)}${suffix}`);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [inView, hasNumber, numeric, prefix, suffix, value]);

  return (
    <span ref={ref} className="font-numbers">
      {display}
    </span>
  );
};

/* ---------- Shared case-study card tokens ----------
   Keep every card section visually uniform: same padding, icon tile,
   title/body type ramp and minimum heights so rows align at any width. */
export const cjCardPad = "p-6 lg:p-7";
export const cjIconTile =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#69D6FF]/25 bg-[#07111F]/70 text-[#69D6FF] backdrop-blur-md transition-all duration-500 group-hover:border-[#69D6FF]/50";
export const cjIconGlyph = "h-5 w-5";
export const cjIconRow = "mb-5 flex items-center gap-3 sm:gap-4";
export const cjCardTitle =
  "min-w-0 flex-1 text-left text-[1.05rem] lg:text-[1.15rem] font-bold leading-snug tracking-tight text-[#F7FAFC]";
export const cjCardBody =
  "text-left text-[15px] leading-[1.7] text-[#A8B8C7]";
export const cjCardMinH = "min-h-[248px]";
