import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { DynamicIcon } from "./DynamicIcon";

export type WhyUsBlueprintItem = {
  icon: LucideIcon;
  image: string;
  title: string;
  desc: string;
};

interface Props {
  items: WhyUsBlueprintItem[];
  active?: boolean;
  centerIcon?: LucideIcon;
  centerImage?: string;
  centerLabel?: string;
  centerTagline?: string;
  lifecycleLabel?: string;
  ariaLabel?: string;
}

const WhyUsBlueprint: React.FC<Props> = ({
  items,
  centerIcon: CenterIcon,
  centerImage,
  centerLabel = "CODE1",
  centerTagline = "Strategy to Continuous Value",
  lifecycleLabel = "DELIVERY LIFECYCLE",
  ariaLabel = "Capabilities",
}) => {
  const [selected, setSelected] = useState(0);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[selected];
  const total = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  const anglesByCount: Record<number, number[]> = {
    5: [-140, -70, 0, 70, 140],
    6: [-140, -90, -40, 40, 90, 140],
    7: [-150, -100, -50, 0, 50, 100, 150],
  };
  const angles = anglesByCount[total] ?? anglesByCount[6];
  const RADIUS_PCT = 40;

  const nodePositions = angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const x = 50 + RADIUS_PCT * Math.sin(rad);
    const y = 50 - RADIUS_PCT * 0.78 * Math.cos(rad);
    return { x, y };
  });

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (selected + 1) % total;
      setSelected(next);
      nodeRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (selected - 1 + total) % total;
      setSelected(next);
      nodeRefs.current[next]?.focus();
    }
  };

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 -m-4 lg:-m-8 opacity-[0.05] pointer-events-none rounded-3xl"
        style={{
          backgroundImage:
            "linear-gradient(rgba(95,194,227,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch relative">
        <div
          ref={containerRef}
          role="tablist"
          aria-label={ariaLabel}
          onKeyDown={handleKey}
          className="lg:col-span-7 relative rounded-3xl overflow-hidden hidden md:block"
          style={{
            minHeight: 560,
            background:
              "radial-gradient(ellipse at center, rgba(15,28,50,0.6) 0%, rgba(10,20,38,0.4) 60%, transparent 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(95,194,227,0.28) 0%, rgba(0,119,182,0.12) 45%, transparent 75%)",
              filter: "blur(50px)",
            }}
          />

          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wubLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5FC2E3" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0077B6" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="wubLineActive" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5FC2E3" stopOpacity="1" />
                <stop offset="100%" stopColor="#5FC2E3" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            <ellipse
              cx="50"
              cy="50"
              rx={RADIUS_PCT}
              ry={RADIUS_PCT * 0.78}
              fill="none"
              stroke="rgba(95,194,227,0.18)"
              strokeWidth="0.15"
              strokeDasharray="0.6 0.8"
            />

            {nodePositions.map((p, i) => {
              const isActive = i === selected;
              const cx = (50 + p.x) / 2;
              const cy = (50 + p.y) / 2;
              return (
                <path
                  key={i}
                  d={`M 50 50 Q ${cx} ${cy} ${p.x} ${p.y}`}
                  fill="none"
                  stroke={isActive ? "url(#wubLineActive)" : "url(#wubLine)"}
                  strokeWidth={isActive ? 0.35 : 0.18}
                  strokeDasharray={isActive && !reduced ? "1.2 0.8" : undefined}
                  opacity={isActive ? 1 : 0.55}
                  style={
                    isActive && !reduced
                      ? { animation: "wubDash 2.4s linear infinite" }
                      : undefined
                  }
                />
              );
            })}
          </svg>

          <style>{`
            @keyframes wubDash { to { stroke-dashoffset: -20; } }
            @keyframes wubRingSpin { to { transform: translate(-50%, -50%) rotate(360deg); } }
            @keyframes wubPulse { 0%,100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.06); opacity: 1; } }
          `}</style>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] lg:w-[230px] lg:h-[230px]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 w-full h-full rounded-full"
              style={{
                border: "1px dashed rgba(95,194,227,0.35)",
                transform: "translate(-50%, -50%)",
                animation: reduced ? undefined : "wubRingSpin 24s linear infinite",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "128%",
                height: "128%",
                border: "1px solid rgba(95,194,227,0.18)",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(95,194,227,0.28) 0%, rgba(0,119,182,0.22) 40%, rgba(15,28,50,0.95) 80%)",
                border: "1px solid rgba(95,194,227,0.55)",
                boxShadow:
                  "0 0 60px rgba(95,194,227,0.35), inset 0 0 40px rgba(95,194,227,0.15)",
              }}
            >
              {centerImage ? (
                <img
                  src={centerImage}
                  alt=""
                  aria-hidden="true"
                  className="w-14 h-14 object-contain relative z-10"
                  style={{ animation: reduced ? undefined : "wubPulse 3.2s ease-in-out infinite" }}
                />
              ) : CenterIcon ? (
                <CenterIcon
                  className="w-14 h-14 text-[#5FC2E3] relative z-10"
                  style={{ animation: reduced ? undefined : "wubPulse 3.2s ease-in-out infinite" }}
                />
              ) : null}
            </div>
          </div>

          {items.map((w, i) => {
            const p = nodePositions[i];
            const isActive = i === selected;
            const num = String(i + 1).padStart(2, "0");
            return (
              <button
                key={i}
                ref={(el) => (nodeRefs.current[i] = el)}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${num}. ${w.title}`}
                tabIndex={isActive ? 0 : -1}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onClick={() => setSelected(i)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group outline-none"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  opacity: isActive ? 1 : 0.75,
                  transition: "opacity 0.35s ease",
                }}
              >
                <span
                  className="flex items-center justify-center rounded-2xl backdrop-blur-sm transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#5FC2E3]/70"
                  style={{
                    width: isActive ? 78 : 62,
                    height: isActive ? 78 : 62,
                    background: isActive
                      ? "linear-gradient(135deg, rgba(95,194,227,0.28) 0%, rgba(0,119,182,0.22) 100%)"
                      : "linear-gradient(135deg, rgba(15,28,50,0.85) 0%, rgba(10,20,38,0.75) 100%)",
                    border: `1px solid ${isActive ? "rgba(95,194,227,0.85)" : "rgba(148,163,184,0.22)"}`,
                    boxShadow: isActive
                      ? "0 0 32px rgba(95,194,227,0.55), 0 12px 30px -10px rgba(0,0,0,0.6)"
                      : "0 8px 22px -10px rgba(0,0,0,0.5)",
                  }}
                >
                  <DynamicIcon name={typeof w.icon === 'string' ? w.icon : ""}
                    className={`transition-all duration-300 ${isActive ? "w-[30px] h-[30px] text-white" : "w-6 h-6 text-[#5FC2E3]"}`}
                  />
                </span>
                <span
                  className="absolute -top-1 -right-1 rounded-full px-1.5 py-[1px] text-[9px] font-semibold"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: isActive ? "#5FC2E3" : "rgba(15,28,50,0.9)",
                    color: isActive ? "#0a1226" : "#5FC2E3",
                    border: "1px solid rgba(95,194,227,0.6)",
                  }}
                >
                  {num}
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-5">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full rounded-3xl overflow-hidden p-7 lg:p-9 flex flex-col"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,28,50,0.92) 0%, rgba(10,20,38,0.88) 60%, rgba(18,16,42,0.92) 100%)",
              border: "1px solid rgba(95,194,227,0.28)",
              boxShadow:
                "0 24px 60px -20px rgba(0,0,0,0.6), inset 0 0 80px rgba(95,194,227,0.06)",
              minHeight: 560,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,119,182,0.28) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative z-10 mb-6 rounded-2xl overflow-hidden aspect-[16/7] border border-[#5FC2E3]/20">
              {items.map((it, i) => (
                <img
                  key={i}
                  src={it.image}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  decoding="async"
                  width={1280}
                  height={560}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === selected ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,18,38,0.15) 0%, rgba(10,18,38,0.55) 60%, rgba(10,18,38,0.9) 100%)",
                }}
              />
            </div>

            <div className="relative z-10 flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(95,194,227,0.20) 0%, rgba(0,119,182,0.20) 100%)",
                  border: "1px solid rgba(95,194,227,0.5)",
                  boxShadow: "0 0 32px rgba(95,194,227,0.28)",
                  animation: reduced ? undefined : "wubPulse 3.2s ease-in-out infinite",
                }}
              >
                <DynamicIcon name={typeof current.icon === 'string' ? current.icon : ""} className="w-7 h-7 lg:w-8 lg:h-8 text-[#5FC2E3]" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white leading-[1.2] text-left">
                {current.title}
              </h3>
            </div>

            <p className="relative z-10 text-[15px] lg:text-base text-[#a8b3c7] leading-[1.75] text-left">
              {current.desc}
            </p>

            <div className="relative z-10 mt-auto pt-8">
              <div
                className="text-[10px] tracking-[0.22em] mb-3"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "rgba(148,163,184,0.6)",
                }}
              >
                {lifecycleLabel}
              </div>
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const prev = (selected - 1 + total) % total;
                    setSelected(prev);
                    nodeRefs.current[prev]?.focus();
                  }}
                  aria-label="Previous"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]/60"
                  style={{
                    background: "rgba(15,28,50,0.85)",
                    border: "1px solid rgba(95,194,227,0.35)",
                  }}
                >
                  <ChevronLeft className="w-5 h-5 text-[#5FC2E3]" />
                </button>

                <div className="flex items-center gap-2 flex-1 justify-center">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-label={`Show ${i + 1}`}
                      className="h-1.5 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]/60"
                      style={{
                        width: i === selected ? 32 : 10,
                        background:
                          i === selected
                            ? "linear-gradient(90deg, #5FC2E3 0%, #0077B6 100%)"
                            : "rgba(148,163,184,0.25)",
                      }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const next = (selected + 1) % total;
                    setSelected(next);
                    nodeRefs.current[next]?.focus();
                  }}
                  aria-label="Next"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]/60"
                  style={{
                    background: "rgba(15,28,50,0.85)",
                    border: "1px solid rgba(95,194,227,0.35)",
                  }}
                >
                  <ChevronRight className="w-5 h-5 text-[#5FC2E3]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MOBILE fallback */}
        <div className="md:hidden -mt-4">
          <div className="relative flex items-center justify-center py-6">
            <div
              aria-hidden="true"
              className="absolute w-[240px] h-[240px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(95,194,227,0.25) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="relative w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center text-center px-3"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(95,194,227,0.28) 0%, rgba(0,119,182,0.22) 40%, rgba(15,28,50,0.95) 80%)",
                border: "1px solid rgba(95,194,227,0.5)",
                boxShadow: "0 0 40px rgba(95,194,227,0.3)",
              }}
            >
              {CenterIcon && <CenterIcon className="w-7 h-7 text-[#5FC2E3] mb-1" />}
              <div
                className="text-[8px] tracking-[0.2em] text-[#5FC2E3]/80"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {centerLabel}
              </div>
              <div className="text-[10px] font-semibold text-white leading-tight mt-1">
                {centerTagline}
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory">
            {items.map((w, i) => {
              const isActive = i === selected;
              const num = String(i + 1).padStart(2, "0");
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  className="snap-start shrink-0 rounded-xl px-3 py-2 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]/60"
                  aria-pressed={isActive}
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, rgba(95,194,227,0.18) 0%, rgba(0,119,182,0.10) 100%)"
                      : "rgba(15,28,50,0.7)",
                    border: `1px solid ${isActive ? "rgba(95,194,227,0.6)" : "rgba(148,163,184,0.18)"}`,
                  }}
                >
                  <DynamicIcon name={typeof w.icon === 'string' ? w.icon : ""} className={`w-4 h-4 ${isActive ? "text-[#5FC2E3]" : "text-[rgba(148,163,184,0.7)]"}`} />
                  <span
                    className="text-[10px] tracking-[0.18em]"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isActive ? "#5FC2E3" : "rgba(148,163,184,0.6)",
                    }}
                  >
                    {num}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUsBlueprint;
