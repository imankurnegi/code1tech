import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cloud,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInViewMap } from "@/hooks/useInView";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import gcpLogo from "@/assets/gcp-logo.png";
// Image URLs will be loaded from JSON data with fallbacks

type ServiceItem = { icon: any; title: string; desc: string; image: string };

const GCPServicesTabs = ({ services }: { services: ServiceItem[] }) => {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const s = services[active];
  const Icon = s.icon;

  const goTo = (i: number) => {
    const next = ((i % services.length) + services.length) % services.length;
    setActive(next);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) goTo(active + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(services.length - 1); }
  };

  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <div>
      <div aria-hidden className="hidden">
        {services.map((item, i) => (
          <img key={i} src={item.image} alt="" loading="eager" decoding="async" width={1} height={1} />
        ))}
      </div>

      <div className="mb-5 lg:mb-7">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="GCP Consulting Services"
          className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 scroll-smooth snap-x"
        >
          {services.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                data-tab={i}
                role="tab"
                id={`gcp-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`gcp-panel-${i}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className="group shrink-0 snap-center inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))"
                    : "rgba(255,255,255,0.025)",
                  border: isActive
                    ? "1px solid rgba(95,194,227,0.45)"
                    : "1px solid rgba(148,163,184,0.14)",
                  boxShadow: isActive ? "0 6px 22px rgba(0,119,182,0.22)" : "none",
                }}
              >
                <DynamicIcon name={typeof item.icon === 'string' ? item.icon : ''} className={`w-4 h-4 transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
                <span className={`text-[13px] font-medium whitespace-nowrap ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={active}
        role="tabpanel"
        id={`gcp-panel-${active}`}
        aria-labelledby={`gcp-tab-${active}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative rounded-3xl overflow-hidden animate-panel-in"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
          border: "1px solid rgba(148,163,184,0.15)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
            <img
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover animate-image-zoom"
              loading="eager"
              decoding="async"
              width={1280}
              height={800}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,18,35,0.15) 0%, rgba(10,18,35,0.55) 100%)" }} />
            <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, transparent 50%, rgba(10,18,35,0.85) 100%)" }} />

            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(10,18,35,0.6)", border: "1px solid rgba(95,194,227,0.35)", backdropFilter: "blur(8px)" }}>
              <span className="text-[11px] font-mono text-accent">{String(active + 1).padStart(2, "0")}</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">GCP Service</span>
            </div>

            <div className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.9), rgba(0,119,182,0.9))", border: "1px solid rgba(95,194,227,0.5)", boxShadow: "0 10px 30px rgba(0,119,182,0.4)" }}>
              <DynamicIcon name={typeof s.icon === 'string' ? s.icon : ''} className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col">
            <h3 className="text-2xl lg:text-[26px] font-bold text-foreground leading-tight mb-4 animate-content-rise" style={{ animationDelay: "80ms" }}>
              {s.title}
            </h3>
            <p className="text-[15px] text-muted-foreground leading-[1.75] animate-content-rise" style={{ animationDelay: "160ms" }}>
              {s.desc}
            </p>

            <div className="mt-auto pt-6 animate-content-rise" style={{ animationDelay: "240ms" }}>
              <div className="flex items-center gap-2 mb-4">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to service ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 32 : 12,
                      background: i === active ? "linear-gradient(90deg, #5FC2E3, #0077B6)" : "rgba(148,163,184,0.22)",
                    }}
                  />
                ))}
                <span className="ml-auto text-xs font-mono text-muted-foreground">
                  {String(active + 1).padStart(2, "0")} <span className="text-muted-foreground/40">/</span> {String(services.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => goTo(active - 1)}
                  aria-label="Previous service"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(148,163,184,0.14)" }}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Prev
                </button>
                <button
                  onClick={() => goTo(active + 1)}
                  aria-label="Next service"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  style={{ background: "linear-gradient(135deg, #5FC2E3, #0077B6)", boxShadow: "0 8px 22px rgba(0,119,182,0.35)" }}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type WhyItem = { icon: any; title: string; desc: string; image: string };
const WhyGcpShowcase = ({ items }: { items: WhyItem[] }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [paused, items.length]);

  const s = items[active];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-0"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
        border: "1px solid rgba(148,163,184,0.15)",
      }}
    >
      {/* Preload all benefit images for instant transitions */}
      <div aria-hidden className="hidden">
        {items.map((it, i) => (
          <img key={i} src={it.image} alt="" loading="eager" decoding="async" width={1} height={1} />
        ))}
      </div>

      {/* LEFT: numbered list */}
      <div className="relative p-4 sm:p-6 lg:p-7 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
        <div className="flex flex-col gap-1.5">
          {items.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group relative text-left rounded-xl px-3 py-2.5 lg:py-3 flex items-center gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                style={{
                  background: isActive
                    ? "linear-gradient(90deg, rgba(95,194,227,0.14), rgba(0,119,182,0.06) 70%, transparent)"
                    : "transparent",
                  border: isActive ? "1px solid rgba(95,194,227,0.35)" : "1px solid transparent",
                }}
              >
                <span
                  className="font-mono text-[11px] w-6 shrink-0 transition-colors"
                  style={{ color: isActive ? "#5FC2E3" : "rgba(148,163,184,0.6)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(95,194,227,0.28), rgba(0,119,182,0.28))"
                      : "rgba(255,255,255,0.03)",
                    border: isActive ? "1px solid rgba(95,194,227,0.45)" : "1px solid rgba(148,163,184,0.15)",
                  }}
                >
                  <DynamicIcon name={typeof it.icon === 'string' ? it.icon : ''} className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
                </span>
                <span
                  className={`text-[13.5px] lg:text-sm font-medium leading-snug flex-1 ${
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {it.title}
                </span>
                {isActive && <ArrowRight className="w-4 h-4 text-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: visual detail panel with image */}
      <div key={active} className="relative min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] animate-panel-in overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover animate-image-zoom"
            loading="eager"
            decoding="async"
            width={1024}
            height={768}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,18,35,0.55) 0%, rgba(10,18,35,0.78) 60%, rgba(10,18,35,0.92) 100%)" }} />
          <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(10,18,35,0.85) 0%, transparent 35%)" }} />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,119,182,0.28) 0%, transparent 65%)", filter: "blur(30px)" }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(95,194,227,0.18) 0%, transparent 65%)", filter: "blur(28px)" }}
        />

        <div className="relative h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(95,194,227,0.9), rgba(0,119,182,0.9))",
                boxShadow: "0 10px 30px rgba(0,119,182,0.4)",
              }}
            >
              <DynamicIcon name={typeof s.icon === 'string' ? s.icon : ''} className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(10,18,35,0.5)", border: "1px solid rgba(95,194,227,0.3)", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Benefit {String(active + 1).padStart(2, "0")}</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-foreground leading-tight mb-4 animate-content-rise" style={{ animationDelay: "80ms" }}>
            {s.title}
          </h3>
          <p className="text-[14.5px] lg:text-[15px] text-foreground/80 leading-[1.75] animate-content-rise" style={{ animationDelay: "160ms" }}>
            {s.desc}
          </p>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-6 animate-content-rise" style={{ animationDelay: "240ms" }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Benefit ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 28 : 10,
                  background: i === active ? "linear-gradient(90deg,#5FC2E3,#0077B6)" : "rgba(148,163,184,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InlineCTA = ({ title, btn, btnUrl }: { title: string; btn: string; btnUrl: string }) => (
  <div className="mt-12 lg:mt-14">
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7"
      style={{
        background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
        border: "1px solid rgba(148,163,184,0.15)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.6)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(0,119,182,0.28) 0%, transparent 70%)", filter: "blur(24px)" }} />
        <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(95,194,227,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
      </div>
      <div className="flex-1 relative z-10 text-left">
        <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug whitespace-pre-wrap">{title}</h3>
      </div>
      <Link to={btnUrl || ""} className="flex-shrink-0 relative z-10">
        <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
          {btn}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Button>
      </Link>
    </div>
  </div>
);


// ─── DATA TYPES ────────────────────────────────────────────────────────────────

type TechGroup = { icon: any; title: string; desc: string; techs: string[]; image: string };

const GCPTechShowcase = ({ groups }: { groups: TechGroup[] }) => {
  const [active, setActive] = useState(0);
  const g = groups[active];
  return (
    <div>
      {/* Hidden preloader */}
      <div aria-hidden className="hidden">
        {groups.map((it, i) => (
          <img key={i} src={it.image} alt="" loading="eager" decoding="async" width={1} height={1} />
        ))}
      </div>

      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
          border: "1px solid rgba(148,163,184,0.15)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
          {/* Vertical tabs */}
          <div
            role="tablist"
            aria-label="GCP Technologies"
            className="flex lg:flex-col gap-2 p-3 lg:p-4 overflow-x-auto lg:overflow-visible hide-scrollbar"
            style={{ background: "rgba(10,18,35,0.5)", borderRight: "1px solid rgba(148,163,184,0.1)" }}
          >
            {groups.map((it, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="group relative shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))"
                      : "rgba(255,255,255,0.02)",
                    border: isActive ? "1px solid rgba(95,194,227,0.45)" : "1px solid rgba(148,163,184,0.1)",
                    boxShadow: isActive ? "0 6px 22px rgba(0,119,182,0.22)" : "none",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(95,194,227,0.9), rgba(0,119,182,0.9))"
                        : "rgba(95,194,227,0.08)",
                      border: isActive ? "1px solid rgba(95,194,227,0.5)" : "1px solid rgba(95,194,227,0.2)",
                    }}
                  >
                    <DynamicIcon name={typeof it.icon === 'string' ? it.icon : ''} className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-accent"}`} />
                  </div>
                  <span
                    className={`text-[13px] font-medium leading-snug whitespace-nowrap lg:whitespace-normal ${
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {it.title}
                  </span>
                  {isActive && (
                    <span className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div key={active} className="relative animate-panel-in grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[220px] md:min-h-[380px] overflow-hidden">
              <img
                src={g.image}
                alt={g.title}
                className="absolute inset-0 w-full h-full object-cover animate-image-zoom"
                loading="eager"
                decoding="async"
                width={1024}
                height={768}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(10,18,35,0.15) 0%, rgba(10,18,35,0.55) 100%)" }}
              />
              <div
                className="absolute inset-0 hidden md:block"
                style={{ background: "linear-gradient(90deg, transparent 55%, rgba(10,18,35,0.9) 100%)" }}
              />
              <div
                className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(10,18,35,0.6)", border: "1px solid rgba(95,194,227,0.35)", backdropFilter: "blur(8px)" }}
              >
                <span className="text-[11px] font-mono text-accent">{String(active + 1).padStart(2, "0")}</span>
                <span className="w-px h-3 bg-white/20" />
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">GCP Stack</span>
              </div>
              <div
                className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(95,194,227,0.9), rgba(0,119,182,0.9))",
                  border: "1px solid rgba(95,194,227,0.5)",
                  boxShadow: "0 10px 30px rgba(0,119,182,0.4)",
                }}
              >
                <DynamicIcon name={typeof g.icon === 'string' ? g.icon : ''} className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="relative p-6 lg:p-8 flex flex-col">
              <h3
                className="text-xl lg:text-2xl font-bold text-foreground leading-tight mb-3 animate-content-rise"
                style={{ animationDelay: "80ms" }}
              >
                {g.title}
              </h3>
              <p
                className="text-[14px] text-muted-foreground leading-[1.7] mb-5 animate-content-rise"
                style={{ animationDelay: "140ms" }}
              >
                {g.desc}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 animate-content-rise" style={{ animationDelay: "200ms" }}>
                {g.techs.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-accent"
                    style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.22)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Radial positions around a central hub (percent). 8 nodes evenly around ~340px radius.
const HUB = { x: 50, y: 50 };
const RADIUS_X = 42; // percent
const RADIUS_Y = 40; // percent
const orbitPositions = Array.from({ length: 8 }).map((_, i) => {
  const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / 8; // start at top, clockwise
  return {
    x: HUB.x + RADIUS_X * Math.cos(angle),
    y: HUB.y + RADIUS_Y * Math.sin(angle),
    angle,
  };
});

const GCPIndustryOrbit = ({ items, logo, logoAlt }: { items: any[]; logo: string; logoAlt: string }) => {
  const [active, setActive] = useState<number>(0);
  const chipRailRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldFocusChip = useRef<boolean>(false);
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);
  const swipeLocked = useRef<"h" | "v" | null>(null);
  const tablistId = "gcp-industries";

  // Keep the active chip visible in the rail (and move focus if requested via keyboard)
  useEffect(() => {
    const rail = chipRailRef.current;
    if (!rail) return;
    const el = rail.querySelector<HTMLElement>(`[data-chip-index="${active}"]`);
    if (el) {
      const railRect = rail.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = elRect.left - railRect.left - (railRect.width - elRect.width) / 2;
      rail.scrollBy({ left: offset, behavior: "smooth" });
    }
    if (shouldFocusChip.current) {
      chipRefs.current[active]?.focus();
      shouldFocusChip.current = false;
    }
  }, [active]);

  const total = items.length;
  const goPrev = () => setActive((a) => (a - 1 + total) % total);
  const goNext = () => setActive((a) => (a + 1) % total);

  const onRailKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let handled = true;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      shouldFocusChip.current = true;
      goNext();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      shouldFocusChip.current = true;
      goPrev();
    } else if (e.key === "Home") {
      shouldFocusChip.current = true;
      setActive(0);
    } else if (e.key === "End") {
      shouldFocusChip.current = true;
      setActive(total - 1);
    } else {
      handled = false;
    }
    if (handled) e.preventDefault();
  };

  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX;
    swipeStartY.current = e.touches[0].clientY;
    swipeLocked.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (swipeStartX.current === null || swipeStartY.current === null) return;
    const dx = e.touches[0].clientX - swipeStartX.current;
    const dy = e.touches[0].clientY - swipeStartY.current;
    if (swipeLocked.current === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      swipeLocked.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeStartX.current;
    if (swipeLocked.current === "h" && Math.abs(dx) > 50) {
      dx < 0 ? goNext() : goPrev();
    }
    swipeStartX.current = null;
    swipeStartY.current = null;
    swipeLocked.current = null;
  };

  // ===== Desktop: keyboard + mouse drag/wheel on the constellation =====
  const orbitRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldFocusOrbit = useRef<boolean>(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const dragMoved = useRef<boolean>(false);
  const wheelLock = useRef<number>(0);

  useEffect(() => {
    if (shouldFocusOrbit.current) {
      orbitRefs.current[active]?.focus();
      shouldFocusOrbit.current = false;
    }
  }, [active]);

  const onOrbitKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let handled = true;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      shouldFocusOrbit.current = true;
      goNext();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      shouldFocusOrbit.current = true;
      goPrev();
    } else if (e.key === "Home") {
      shouldFocusOrbit.current = true;
      setActive(0);
    } else if (e.key === "End") {
      shouldFocusOrbit.current = true;
      setActive(total - 1);
    } else {
      handled = false;
    }
    if (handled) e.preventDefault();
  };

  const onOrbitPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragMoved.current = false;
  };
  const onOrbitPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null || dragStartY.current === null) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - dragStartY.current;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) dragMoved.current = true;
  };
  const onOrbitPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - (dragStartY.current ?? 0);
    if (dragMoved.current && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? goNext() : goPrev();
    }
    dragStartX.current = null;
    dragStartY.current = null;
  };
  const onOrbitWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 8) return;
    const now = Date.now();
    if (now - wheelLock.current < 320) return;
    wheelLock.current = now;
    delta > 0 ? goNext() : goPrev();
  };

  const activeItem = items[active];



  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 40%, rgba(0,119,182,0.22) 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(95,194,227,0.10) 0%, transparent 55%), linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))",
        border: "1px solid rgba(148,163,184,0.14)",
      }}
    >
      {/* Faint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(95,194,227,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
        }}
      />

      {/* ============ DESKTOP ============ */}
      <div className="relative hidden lg:grid grid-cols-12 gap-6 xl:gap-8 px-6 xl:px-8 py-6 xl:py-8">
        {/* LEFT: Constellation ~57% */}
        <div className="col-span-7 relative">
          <div
            className="relative w-full mx-auto cursor-grab active:cursor-grabbing touch-pan-y select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-2xl h-[480px] lg:h-[580px] xl:h-[600px]"
            role="tablist"
            aria-label="GCP industries constellation"
            aria-orientation="horizontal"
            onKeyDown={onOrbitKeyDown}
            onPointerDown={onOrbitPointerDown}
            onPointerMove={onOrbitPointerMove}
            onPointerUp={onOrbitPointerUp}
            onPointerCancel={onOrbitPointerUp}
            onWheel={onOrbitWheel}
          >
            {/* SVG lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="orbit-line-gcp" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(95,194,227,0.85)" />
                  <stop offset="100%" stopColor="rgba(0,119,182,0.2)" />
                </linearGradient>
                <radialGradient id="particle-glow-gcp">
                  <stop offset="0%" stopColor="rgba(95,194,227,1)" />
                  <stop offset="100%" stopColor="rgba(95,194,227,0)" />
                </radialGradient>
              </defs>
              {orbitPositions.map((p, i) => {
                const isActive = active === i;
                const cx = (HUB.x + p.x) / 2 + Math.cos(p.angle + Math.PI / 2) * 5;
                const cy = (HUB.y + p.y) / 2 + Math.sin(p.angle + Math.PI / 2) * 5;
                const d = `M ${HUB.x} ${HUB.y} Q ${cx} ${cy} ${p.x} ${p.y}`;
                return (
                  <g key={`line-${i}`} style={{ transition: "opacity 300ms" }} opacity={isActive ? 1 : 0.55}>
                    <path
                      d={d}
                      stroke={isActive ? "rgba(95,194,227,0.95)" : "url(#orbit-line-gcp)"}
                      strokeWidth={isActive ? 1.6 : 0.9}
                      strokeDasharray={isActive ? "0" : "4 5"}
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle r={isActive ? 1.4 : 0.9} fill="url(#particle-glow-gcp)">
                      <animateMotion dur={`${3 + (i % 3) * 0.6}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Central Hub */}
            <div
              className="absolute z-10"
              style={{ left: `${HUB.x}%`, top: `${HUB.y}%`, transform: "translate(-50%,-50%)" }}
            >
              <div className="relative w-40 h-40 xl:w-44 xl:h-44 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full animate-pulse-slow"
                  style={{
                    background: "radial-gradient(circle, rgba(95,194,227,0.28) 0%, transparent 70%)",
                    filter: "blur(10px)",
                  }}
                />
                <div
                  className="absolute inset-2 rounded-full"
                  style={{ border: "1px solid rgba(95,194,227,0.25)", animation: "spin 40s linear infinite" }}
                />
                <div
                  className="absolute inset-6 rounded-full"
                  style={{ border: "1px dashed rgba(95,194,227,0.35)", animation: "spin 24s linear infinite reverse" }}
                />
                <div
                  className="relative w-24 h-24 xl:w-28 xl:h-28 rounded-full flex flex-col items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(95,194,227,0.35), rgba(0,119,182,0.45))",
                    border: "1px solid rgba(95,194,227,0.6)",
                    boxShadow: "0 0 60px rgba(0,119,182,0.6), inset 0 0 30px rgba(95,194,227,0.28)",
                  }}
                >
                  <img src={gcpLogo} alt="Google Cloud" className="w-9 h-9 xl:w-10 xl:h-10 object-contain drop-shadow-lg" loading="eager" decoding="async" />
                  <p className="mt-1 text-[9px] font-mono uppercase tracking-[0.18em] text-white/90">
                    GCP Core
                  </p>
                </div>
              </div>
            </div>

            {/* Orbital nodes (icon-only, compact) */}
            {items.map((item, i) => {
              const p = orbitPositions[i];
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  ref={(el) => { orbitRefs.current[i] = el; }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => { if (dragMoved.current) return; setActive(i); }}
                  role="tab"
                  id={`gcp-orbit-tab-${i}`}
                  aria-label={item.title}
                  aria-selected={isActive}
                  aria-controls="gcp-orbit-panel"
                  tabIndex={isActive ? 0 : -1}
                  className="absolute z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full group"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: "translate(-50%,-50%)",
                    opacity: active !== i && active !== null ? 0.75 : 1,
                    transition: "opacity 300ms, transform 300ms",
                  }}
                >
                  <div
                    className={`relative flex items-center gap-2 pr-3 rounded-full transition-all duration-300 ${
                      isActive ? "scale-105" : "group-hover:scale-105"
                    }`}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(95,194,227,0.20), rgba(0,119,182,0.14))"
                        : "rgba(19,42,74,0.7)",
                      border: isActive
                        ? "1px solid rgba(95,194,227,0.65)"
                        : "1px solid rgba(148,163,184,0.18)",
                      backdropFilter: "blur(8px)",
                      boxShadow: isActive
                        ? "0 14px 40px rgba(0,119,182,0.35), 0 0 0 4px rgba(95,194,227,0.10)"
                        : "0 6px 18px rgba(0,0,0,0.28)",
                      padding: "6px",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(95,194,227,0.55), rgba(0,119,182,0.55))"
                          : "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))",
                        border: "1px solid rgba(95,194,227,0.4)",
                        boxShadow: isActive ? "0 0 22px rgba(95,194,227,0.6)" : "none",
                      }}
                    >
                      <DynamicIcon name={typeof item.icon === 'string' ? item.icon : ''} className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-accent"}`} />
                    </div>
                    <span
                      className={`text-[11px] font-semibold whitespace-nowrap pr-1 ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} · {item.title.split(" & ")[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Detail panel */}
        <div className="col-span-5 relative">
          <div
            key={active}
            role="tabpanel"
            id="gcp-orbit-panel"
            aria-labelledby={`gcp-orbit-tab-${active}`}
            aria-live="polite"
            aria-atomic="true"
            tabIndex={0}
            onKeyDown={onPanelKeyDown}
            className="relative h-[480px] lg:h-[580px] xl:h-[600px] rounded-2xl p-5 xl:p-6 flex flex-col animate-fade-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{
              background:
                "linear-gradient(160deg, rgba(19,42,74,0.85), rgba(19,42,74,0.55))",
              border: "1px solid rgba(95,194,227,0.28)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-bl-full pointer-events-none"
              style={{
                background: "radial-gradient(circle at top right, rgba(95,194,227,0.18), transparent 70%)",
              }}
            />
            <div className="relative flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(95,194,227,0.4), rgba(0,119,182,0.4))",
                  border: "1px solid rgba(95,194,227,0.5)",
                  boxShadow: "0 0 24px rgba(95,194,227,0.35)",
                }}
              >
                <DynamicIcon name={typeof activeItem.icon === 'string' ? activeItem.icon : ''} className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-accent">
                    {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-accent/30 text-accent/90">
                    {activeItem.tag}
                  </span>
                </div>
                <h4 className="text-lg xl:text-xl font-semibold text-foreground leading-tight">
                  {activeItem.title}
                </h4>
              </div>
            </div>

            {/* Desktop-only industry image stack — pre-load all images so tab switches feel instant */}
            <div className="hidden lg:block relative mb-3 rounded-xl overflow-hidden border border-accent/20 h-40 xl:h-48 shrink-0">
              {items.map((item, i) => (
                <img
                  key={item.image}
                  src={item.image}
                  alt={item.title}
                  loading="eager"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(19,42,74,0.15) 0%, rgba(19,42,74,0.85) 100%)",
                }}
              />
            </div>

            <div className="flex-1 flex flex-col justify-end">
              <div dangerouslySetInnerHTML={{__html: activeItem.intro}} />

              <ul className="space-y-1.5">
                {activeItem.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2.5 text-[13px] text-foreground/90">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: "rgba(95,194,227,1)",
                        boxShadow: "0 0 8px rgba(95,194,227,0.8)",
                      }}
                    />
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer indicator dots + prev/next controls */}
            <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous industry"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-border/40 bg-muted/30 text-muted-foreground hover:text-accent hover:border-accent/50 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${items[i].title}`}
                    className={`rounded-full transition-all ${
                      i === active ? "w-5 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next industry"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-border/40 bg-muted/30 text-muted-foreground hover:text-accent hover:border-accent/50 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MOBILE / TABLET ============ */}
      <div className="lg:hidden relative p-5 sm:p-8">
        <div className="flex items-center gap-4 mb-5">
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(95,194,227,0.3), rgba(0,119,182,0.35))",
              border: "1px solid rgba(95,194,227,0.5)",
              boxShadow: "0 0 26px rgba(0,119,182,0.4)",
            }}
          >
            <Cloud className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-0.5">
              GCP Ecosystem
            </p>
            <p className="text-xs text-muted-foreground">{items.length} industries · tap to expand</p>
          </div>
        </div>

        {/* Chip rail selector */}
        <div
          ref={chipRailRef}
          role="tablist"
          aria-label="Industries"
          onKeyDown={onRailKeyDown}
          className="flex gap-2 overflow-x-auto hide-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 pb-3 scroll-smooth"
        >
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <button
                key={i}
                type="button"
                data-chip-index={i}
                ref={(el) => { chipRefs.current[i] = el; }}
                role="tab"
                id={`${tablistId}-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`${tablistId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-[11px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(95,194,227,0.22), rgba(0,119,182,0.18))"
                    : "rgba(19,42,74,0.6)",
                  border: isActive
                    ? "1px solid rgba(95,194,227,0.55)"
                    : "1px solid rgba(148,163,184,0.18)",
                }}
              >
                <DynamicIcon name={typeof item.icon === 'string' ? item.icon : ''} className={`w-3.5 h-3.5 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                <span className="whitespace-nowrap">
                  {String(i + 1).padStart(2, "0")} · {item.title.split(" & ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Swipeable detail card — content transitions inside a stable container */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onKeyDown={onPanelKeyDown}
          role="tabpanel"
          id={`${tablistId}-panel`}
          aria-labelledby={`${tablistId}-tab-${active}`}
          aria-live="polite"
          aria-atomic="true"
          tabIndex={0}
          className="rounded-2xl p-5 relative select-none touch-pan-y focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          style={{
            background: "linear-gradient(160deg, rgba(19,42,74,0.85), rgba(19,42,74,0.55))",
            border: "1px solid rgba(95,194,227,0.28)",
          }}
        >
          <div key={`m-${active}`} className="animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(95,194,227,0.4), rgba(0,119,182,0.4))",
                  border: "1px solid rgba(95,194,227,0.5)",
                }}
              >
                <DynamicIcon name={typeof activeItem.icon === 'string' ? activeItem.icon : ''} className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-accent">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {activeItem.tag}
                </span>
                <h4 className="text-base font-semibold text-foreground leading-tight">
                  {activeItem.title}
                </h4>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: activeItem.intro}} />
            <ul className="space-y-2">
              {activeItem.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2.5 text-[13px] text-foreground/90">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "rgba(95,194,227,1)", boxShadow: "0 0 8px rgba(95,194,227,0.8)" }}
                  />
                  <span className="leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav controls */}
          <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous industry"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border/40 bg-muted/30 text-muted-foreground hover:text-accent hover:border-accent/50 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${items[i].title}`}
                  className={`rounded-full transition-all ${
                    i === active ? "w-5 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next industry"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border/40 bg-muted/30 text-muted-foreground hover:text-accent hover:border-accent/50 active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-center text-[10px] text-muted-foreground/60 mt-2">
            Swipe to explore · {active + 1} / {total}
          </p>
        </div>
      </div>

    </div>
  );
};

// Why section images will be loaded from JSON data with fallbacks
import SeoTags from "@/components/SeoTags";
import ContactUsForm from "@/components/ContactUsForm";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallback";
import { Faqs } from "@/components/Faqs";
import RelatedBlogs from "@/components/RelatedBlogs";

type WhyChooseItem = { icon: string | LucideIcon; image: string; title: string; desc: string };

const WhyUsShowcase: React.FC<{ items: WhyChooseItem[]; active: boolean; logo: string }> = ({ items, active, logo }) => {
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

  // Radial positions for 6 nodes around the core (degrees from top, clockwise)
  // Order matches the flow: Experience → Goals → E2E → Security → Communication → Optimization → back
  const angles = [-140, -90, -40, 40, 90, 140]; // left-top, top, right-top, right-bot, bot, left-bot
  const RADIUS_PCT = 40; // % of half container width for x, height for y

  const nodePositions = angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    // deg 0 = up; convert to cartesian where 0deg=up
    const x = 50 + RADIUS_PCT * Math.sin(rad);
    const y = 50 - RADIUS_PCT * 0.78 * Math.cos(rad); // squash vertically to fit
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
      {/* Blueprint grid backdrop */}
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
        {/* LEFT: Blueprint orbit */}
        <div
          ref={containerRef}
          role="tablist"
          aria-label="Cloud consulting capabilities"
          onKeyDown={handleKey}
          className="lg:col-span-7 relative rounded-3xl overflow-hidden hidden md:block"
          style={{
            minHeight: 560,
            background:
              "radial-gradient(ellipse at center, rgba(15,28,50,0.6) 0%, rgba(10,20,38,0.4) 60%, transparent 100%)",
          }}
        >
          {/* Ambient glow behind core */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(95,194,227,0.28) 0%, rgba(0,119,182,0.12) 45%, transparent 75%)",
              filter: "blur(50px)",
            }}
          />

          {/* Connection lines (SVG) */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="whyLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5FC2E3" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0077B6" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="whyLineActive" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5FC2E3" stopOpacity="1" />
                <stop offset="100%" stopColor="#5FC2E3" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Outer orbit ring */}
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
              // curved control point offset toward center
              const cx = (50 + p.x) / 2;
              const cy = (50 + p.y) / 2;
              return (
                <path
                  key={i}
                  d={`M 50 50 Q ${cx} ${cy} ${p.x} ${p.y}`}
                  fill="none"
                  stroke={isActive ? "url(#whyLineActive)" : "url(#whyLine)"}
                  strokeWidth={isActive ? 0.35 : 0.18}
                  strokeDasharray={isActive && !reduced ? "1.2 0.8" : undefined}
                  opacity={isActive ? 1 : 0.55}
                  style={
                    isActive && !reduced
                      ? { animation: "whyDash 2.4s linear infinite" }
                      : undefined
                  }
                />
              );
            })}
          </svg>

          <style>{`
            @keyframes whyDash { to { stroke-dashoffset: -20; } }
            @keyframes whyRingSpin { to { transform: translate(-50%, -50%) rotate(360deg); } }
            @keyframes whyPulse { 0%,100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.06); opacity: 1; } }
          `}</style>

          {/* CENTRAL CORE */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] lg:w-[230px] lg:h-[230px]">
            {/* Rotating data ring */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 w-full h-full rounded-full"
              style={{
                border: "1px dashed rgba(95,194,227,0.35)",
                transform: "translate(-50%, -50%)",
                animation: reduced ? undefined : "whyRingSpin 24s linear infinite",
              }}
            />
            {/* Security ring (outer, subtle) - reinforces capability 04 metaphor */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "128%",
                height: "128%",
                border: `1px solid ${selected === 3 ? "rgba(95,194,227,0.55)" : "rgba(95,194,227,0.18)"}`,
                transform: "translate(-50%, -50%)",
                boxShadow: selected === 3 ? "0 0 40px rgba(95,194,227,0.35)" : "none",
                transition: "all 0.5s ease",
              }}
            />
            {/* Core body */}
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
              {/* Centered GCP logo */}
              <img
                src={gcpLogo}
                alt="Google Cloud"
                className="w-14 h-14 object-contain relative z-10"
                style={{ animation: reduced ? undefined : "whyPulse 3.2s ease-in-out infinite" }}
              />
            </div>
          </div>

          {/* Nodes */}
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
                  <DynamicIcon name={typeof w.icon === 'string' ? w.icon : ''}
                    className={`transition-all duration-300 ${isActive ? 'w-7 h-7' : 'w-6 h-6'} ${isActive ? 'text-white' : 'text-[#5FC2E3]'}`}
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

        {/* RIGHT: Shared detail panel */}
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

            {/* Contextual capability image banner */}
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
                  animation: reduced ? undefined : "whyPulse 3.2s ease-in-out infinite",
                }}
              >
                <DynamicIcon name={typeof current.icon === 'string' ? current.icon : ''} className="w-7 h-7 lg:w-8 lg:h-8 text-[#5FC2E3]" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white leading-[1.2] text-left">
                {current.title}
              </h3>
            </div>

            <p className="relative z-10 text-[15px] lg:text-base text-[#a8b3c7] leading-[1.75] text-left">
              {current.desc}
            </p>

            {/* Lifecycle indicator */}
            <div className="relative z-10 mt-auto pt-8">
              <div
                className="text-[10px] tracking-[0.22em] mb-3"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "rgba(148,163,184,0.6)",
                }}
              >
                CONSULTING LIFECYCLE
              </div>
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const prev = (selected - 1 + total) % total;
                    setSelected(prev);
                    nodeRefs.current[prev]?.focus();
                  }}
                  aria-label="Previous capability"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]/60"
                  style={{
                    background: "rgba(15,28,50,0.85)",
                    border: "1px solid rgba(95,194,227,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(95,194,227,0.15)";
                    e.currentTarget.style.borderColor = "rgba(95,194,227,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(15,28,50,0.85)";
                    e.currentTarget.style.borderColor = "rgba(95,194,227,0.35)";
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
                      aria-label={`Show capability ${i + 1}`}
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
                  aria-label="Next capability"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]/60"
                  style={{
                    background: "rgba(15,28,50,0.85)",
                    border: "1px solid rgba(95,194,227,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(95,194,227,0.15)";
                    e.currentTarget.style.borderColor = "rgba(95,194,227,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(15,28,50,0.85)";
                    e.currentTarget.style.borderColor = "rgba(95,194,227,0.35)";
                  }}
                >
                  <ChevronRight className="w-5 h-5 text-[#5FC2E3]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MOBILE: Compact core + horizontal selector (shown when blueprint is hidden) */}
        <div className="md:hidden -mt-4">
          <div className="relative flex items-center justify-center py-6">
            <div
              aria-hidden="true"
              className="absolute w-[240px] h-[240px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(95,194,227,0.25) 0%, transparent 70%)",
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
              <Cloud className="w-7 h-7 text-[#5FC2E3] mb-1" />
              <div
                className="text-[8px] tracking-[0.2em] text-[#5FC2E3]/80"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                CODE1 CLOUD
              </div>
              <div className="text-[10px] font-semibold text-white leading-tight mt-1">
                Strategy to Continuous Optimization
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
                  <DynamicIcon name={typeof w.icon === 'string' ? w.icon : ''} className={`w-4 h-4 ${isActive ? 'text-[#5FC2E3]' : 'text-[rgba(148,163,184,0.7)]'}`} />
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


type OutcomeItem = { icon: string | LucideIcon; title: string; desc: string };

const OutcomesImpactMap: React.FC<{ items: OutcomeItem[]; logo: string }> = ({ items, logo }) => {
  const [active, setActive] = useState<number | null>(null);
  const left = items.slice(0, 3);
  const right = items.slice(3, 6);

  const Panel: React.FC<{ item: OutcomeItem; index: number; side: "left" | "right" }> = ({ item, index, side }) => {
    const isActive = active === index;
    const num = String(index + 1).padStart(2, "0");
    return (
      <motion.div
        role="group"
        tabIndex={0}
        onFocus={() => setActive(index)}
        onBlur={() => setActive((a) => (a === index ? null : a))}
        onMouseEnter={() => setActive(index)}
        onMouseLeave={() => setActive((a) => (a === index ? null : a))}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative rounded-2xl p-5 lg:p-6 outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]/60 ${side === "right" ? "lg:pl-7" : "lg:pr-7"}`}
        style={{
          background: "linear-gradient(135deg, rgba(15,28,50,0.85) 0%, rgba(10,20,38,0.75) 100%)",
          border: "1px solid rgba(95,194,227,0.18)",
          boxShadow: isActive
            ? "0 0 0 1px rgba(95,194,227,0.45), 0 12px 40px -12px rgba(95,194,227,0.35), inset 0 0 40px rgba(95,194,227,0.06)"
            : "0 6px 20px -10px rgba(0,0,0,0.6)",
          transition: "box-shadow 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* subtle data grid backdrop */}
        <div
          className="absolute inset-0 rounded-2xl opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />
        <div className={`relative flex items-start gap-4 ${side === "right" ? "flex-row" : "flex-row"}`}>
          <div
            className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))",
              border: "1px solid rgba(95,194,227,0.35)",
              boxShadow: isActive ? "0 0 24px rgba(95,194,227,0.35)" : "0 0 12px rgba(95,194,227,0.12)",
            }}
          >
            <DynamicIcon name={typeof item.icon === 'string' ? item.icon : ''} className="w-6 h-6 lg:w-7 lg:h-7 text-[#5FC2E3]" />
            {isActive && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.35 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                style={{ border: "1px solid rgba(95,194,227,0.5)" }}
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <h3 className="text-base lg:text-[17px] font-semibold text-white text-left leading-snug">{item.title}</h3>
              <span className="font-mono text-[11px] tracking-widest text-[#5FC2E3]/70 shrink-0">{num}</span>
            </div>
            <p className="text-[13.5px] lg:text-sm text-[#94a3b8] leading-[1.65] text-left">{item.desc}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(95,194,227,0.22) 0%, transparent 70%)", filter: "blur(70px)" }}
        />
      </div>

      {/* Desktop impact-map */}
      <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-8 xl:gap-10 items-center relative">
        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lineL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5FC2E3" stopOpacity="0" />
              <stop offset="100%" stopColor="#5FC2E3" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="lineR" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#5FC2E3" stopOpacity="0" />
              <stop offset="100%" stopColor="#5FC2E3" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          {[
            { d: "M 42 18 Q 48 50 50 50", side: "L", idx: 0 },
            { d: "M 42 50 Q 46 50 50 50", side: "L", idx: 1 },
            { d: "M 42 82 Q 48 50 50 50", side: "L", idx: 2 },
            { d: "M 58 18 Q 52 50 50 50", side: "R", idx: 3 },
            { d: "M 58 50 Q 54 50 50 50", side: "R", idx: 4 },
            { d: "M 58 82 Q 52 50 50 50", side: "R", idx: 5 },
          ].map((p) => (
            <path
              key={p.idx}
              d={p.d}
              fill="none"
              stroke={p.side === "L" ? "url(#lineL)" : "url(#lineR)"}
              strokeWidth={active === p.idx ? 0.5 : 0.25}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke-width 0.35s ease, opacity 0.35s ease", opacity: active === null || active === p.idx ? 1 : 0.35 }}
            />
          ))}
        </svg>

        {/* Left column */}
        <div className="relative z-10 flex flex-col gap-5 xl:gap-6">
          {left.map((it, i) => (
            <Panel key={i} item={it} index={i} side="left" />
          ))}
        </div>

        {/* Center visual */}
        <div className="relative z-10 flex items-center justify-center px-2 xl:px-4">
          <div className="relative w-[180px] h-[180px] xl:w-[220px] xl:h-[220px] flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(95,194,227,0.35) 0%, rgba(0,119,182,0.15) 45%, transparent 70%)", filter: "blur(20px)" }}
              aria-hidden="true"
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(95,194,227,0.35)" }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.3, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-4 rounded-full"
              style={{ border: "1px dashed rgba(95,194,227,0.28)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="relative w-24 h-24 xl:w-28 xl:h-28 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(15,28,50,0.95), rgba(10,20,38,0.9))",
                border: "1px solid rgba(95,194,227,0.5)",
                boxShadow: "0 0 40px rgba(95,194,227,0.35), inset 0 0 24px rgba(95,194,227,0.15)",
              }}
            >
              <img src={gcpLogo} alt="Google Cloud" className="w-14 h-14 xl:w-16 xl:h-16 object-contain drop-shadow-lg" loading="eager" decoding="async" />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="relative z-10 flex flex-col gap-5 xl:gap-6">
          {right.map((it, i) => (
            <Panel key={i + 3} item={it} index={i + 3} side="right" />
          ))}
        </div>
      </div>

      {/* Tablet/Mobile grid */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {items.map((it, i) => (
          <Panel key={i} item={it} index={i} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </div>
  );
};

const GCP = () => {

  const { setRef, inViewMap: visible } = useInViewMap();

  const { data, isLoading, error } = useQuery({
      queryKey: ["gcp-engineers"],
      queryFn: api.getGCPEngineers,
    });
  if (isLoading) return <LoadingSkeleton type="hero" />;
    if (error) return <ErrorFallback error={error as Error} onRetry={() => window.location.reload()} />;

  const pageData = data?.data;

  // ─── DATA EXTRACTION FROM JSON ────────────────────────────────────────────────
  const heroBanner = pageData?.tools_main_banner;
  const heroContent = pageData?.google_cloud_consulting_services_for_profitable_cloud_investment || {};
  const cta_section_70 = pageData?.cta_section_70;
  const cta_section_77 = pageData?.cta_section_77;
  const cta_section_111 = pageData?.cta_section_111;
  const cta_section_113 = pageData?.cta_section_113;
  const whyChooseSection = pageData?.why_choose_google_cloud_platform_for_your_business || {};
  const servicesSection = pageData?.our_google_cloud_consulting_services || {};
  const technologiesSection = pageData?.google_cloud_technologies_we_work_with || {};
  const industriesSection = pageData?.industries_we_serve_gcp || {};
  const partnerSection = pageData?.why_choose_code1_tech_systems_for_google_cloud_consulting || {};
  const outcomesSection = pageData?.business_outcomes_you_can_expect || {};
  const contactSection = pageData?.services_get_started_section || {};

  const faqs = (pageData?.frequently_asked_question ?? []).map((item: any) => ({
    q: item.post_title ?? "",
    a: item.post_content ?? "",
  }));

  const blogCategory = pageData?.blog_category;
        const categorySlugs = Array.isArray(blogCategory)
          ? blogCategory.map((category) => category?.slug).filter((slug): slug is string => Boolean(slug))
          : [];
        const { data: relatedPostsData } = useQuery({
          queryKey: ["relatedPosts", categorySlugs],
          queryFn: () => api.getAllPosts(categorySlugs, 10),
          enabled: categorySlugs.length > 0,
        });

  const heroBadges = heroBanner?.badges || [];
  const heroStats = heroBanner?.bottom_section || [];
  const heroImageUrl = heroBanner?.image?.url || "";

  const whyGcpTabs = whyChooseSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    title: tab.title,
    desc: tab.content,
    image: tab.image?.url || "",
  })) || [];

  const consultingServicesTabs = servicesSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    title: tab.title,
    desc: tab.content,
    image: tab.image?.url || "",
  })) || [];

  const techGroupsTabs = technologiesSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    title: tab.title,
    desc: tab.content,
    techs: [tab.block_1, tab.block_2, tab.block_3, tab.block_4, tab.block_5].filter(Boolean),
    image: tab.image?.url || "",
  })) || [];

  const industriesTabs = industriesSection?.tabs?.map((tab: any) => {
    // Parse HTML content to extract intro and bullets if possible
    const content = tab.content || "";
    let intro = content;
    let listLabel = "";
    let bullets: string[] = [];
    
    // Try to extract list items from HTML content
    const ulMatch = content.match(/<ul>([\s\S]*?)<\/ul>/i);
    if (ulMatch) {
      const ulContent = ulMatch[1];
      const liMatches = ulContent.match(/<li>([\s\S]*?)<\/li>/gi);
      if (liMatches) {
        bullets = liMatches.map(li => li.replace(/<li>([\s\S]*?)<\/li>/i, "$1").trim());
        intro = content.replace(/<ul>[\s\S]*?<\/ul>/i, "").trim();
      }
    }
    
    // Extract list label from content if present
    const labelMatch = content.match(/<p class="text-xs font-mono uppercase tracking-widest text-accent mb-2">([^<]+)<\/p>/i);
    if (labelMatch) {
      listLabel = labelMatch[1];
    }
    
    return {
      icon: tab.icon,
      title: tab.title,
      tag: tab.tag || "",
      image: tab.image?.url || "",
      intro,
      listLabel: listLabel || "",
      bullets
    };
  }) || [];

  const partnerTabs = partnerSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    title: tab.title,
    desc: tab.content,
    image: tab.image?.url
  })) || [];

  const outcomesCards = outcomesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  return (
    <>
      <SeoTags
              title={pageData?.seo?.title}
              description={pageData?.seo?.description}
              ogImage={pageData?.seo?.og_image}
              schema={pageData?.schema}
            />
      <section
              ref={setRef("hero")}
              className="relative overflow-hidden pt-24 pb-10 lg:pt-28 lg:pb-16"
              style={{
                background:
                  "radial-gradient(1200px 600px at 50% 0%, rgba(0,119,182,0.18) 0%, transparent 60%), linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 60%, hsl(222 47% 4%) 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                  maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
                }}
              />
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none rounded-full"
                style={{ background: "radial-gradient(circle, rgba(95,194,227,0.18) 0%, transparent 65%)" }} />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,90,40,0.10) 0%, transparent 65%)" }} />
      
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`text-center mb-5 lg:mb-6 transition-all duration-700 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {heroBanner?.top_label || ""}
                  </span>
                </div>
      
                <div className={`relative max-w-5xl mx-auto mb-8 lg:mb-10 transition-all duration-1000 delay-150 ${visible.hero ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}>
                  <div className="absolute -inset-6 sm:-inset-10 rounded-[2rem] blur-3xl opacity-70 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, rgba(95,194,227,0.35) 0%, rgba(0,119,182,0.20) 40%, transparent 75%)" }} />
      
                  <div className="hidden lg:flex absolute -left-6 top-12 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_6s_ease-in-out_infinite]"
                    style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
                    <DynamicIcon name={typeof heroBadges[0]?.icon === 'string' ? heroBadges[0]?.icon : ''} className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">{heroBadges[0]?.label}</span>
                  </div>
                  <div className="hidden lg:flex absolute -right-6 top-24 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_7s_ease-in-out_infinite_reverse]"
                    style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
                    <DynamicIcon name={typeof heroBadges[1]?.icon === 'string' ? heroBadges[1]?.icon : ''} className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">{heroBadges[1]?.label}</span>
                  </div>
                  <div className="hidden lg:flex absolute -left-8 bottom-20 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_8s_ease-in-out_infinite]"
                    style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
                    <DynamicIcon name={typeof heroBadges[2]?.icon === 'string' ? heroBadges[2]?.icon : ''} className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">{heroBadges[2]?.label}</span>
                  </div>
                  <div className="hidden lg:flex absolute -right-8 bottom-24 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_6.5s_ease-in-out_infinite_reverse]"
                    style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
                    <DynamicIcon name={typeof heroBadges[3]?.icon === 'string' ? heroBadges[3]?.icon : ''} className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">{heroBadges[3]?.label}</span>
                  </div>
      
                  <div className="relative rounded-2xl overflow-hidden"
                    style={{
                      aspectRatio: "835 / 445",
                      border: "1px solid rgba(95,194,227,0.25)",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 80px rgba(95,194,227,0.10)",
                    }}>
                    <img
                      src={heroImageUrl}
                      alt={heroBanner?.image?.alt || ""}
                      className="w-full h-full object-cover"
                      loading="eager"
                      width={835}
                      height={445}
                    />
                    <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                      <div className="absolute top-4 left-4 w-8 h-[2px] bg-gradient-to-r from-accent to-transparent" />
                      <div className="absolute top-4 left-4 w-[2px] h-8 bg-gradient-to-b from-accent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                      <div className="absolute bottom-4 right-4 w-8 h-[2px] bg-gradient-to-l from-accent to-transparent" />
                      <div className="absolute bottom-4 right-4 w-[2px] h-8 bg-gradient-to-t from-accent to-transparent" />
                    </div>
                  </div>
      
                  <div className="relative z-10 mx-2 sm:mx-6 -mt-8 sm:-mt-10 rounded-xl backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden"
                    style={{ background: "rgba(10,16,30,0.85)", border: "1px solid rgba(95,194,227,0.25)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                    {(heroStats || []).map((m: any, i: number) => (
                      <div key={i} className="px-4 py-4 sm:py-5 text-center" style={{ background: "rgba(10,16,30,0.6)" }}>
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">{m.label}</div>
                        <div className="text-sm sm:text-base font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">{m.heading}</div>
                      </div>
                    ))}
                  </div>
                </div>
      
                <div className={`max-w-[95%] xl:max-w-6xl mx-auto text-center transition-all duration-700 delay-300 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                  <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-foreground leading-[1.1] mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-[1.75] max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: heroContent?.paragraph || "" }} />
                </div>
      
                <div className={`mt-7 lg:mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                  <p className="text-sm sm:text-base text-foreground/85 font-medium text-center sm:text-left">
              {cta_section_70?.content || ""}
            </p>
                  <Link to={cta_section_70?.cta_url || ""}>
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                    >
                      {cta_section_70?.cta_text || ""}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
      
              <style>{`
                @keyframes floatY {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                }
              `}</style>
            </section>

      {/* BENEFITS */}
      <section
        ref={setRef("benefits")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.benefits ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyChooseSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: whyChooseSection?.paragraph || "" }} />
          </div>

          <WhyGcpShowcase items={whyGcpTabs} />

          {cta_section_77?.cta_content && (
            <InlineCTA title={cta_section_77?.cta_content || ""} btn={cta_section_77?.button_text || ""} btnUrl={cta_section_77?.button_url || ""} />
          )}
        </div>
      </section>

      {/* CONSULTING SERVICES — TABS */}
      <section
        ref={setRef("services")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-6 lg:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(servicesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: servicesSection?.paragraph || "" }} />
          </div>

          <GCPServicesTabs services={consultingServicesTabs} />

          {cta_section_111?.content && (
            <InlineCTA title={cta_section_111?.content || ""} btn={cta_section_111?.button_text || ""} btnUrl={cta_section_111?.button_url || ""} />
          )}
        </div>
      </section>

      {/* GCP TECHNOLOGIES */}
      <section
        ref={setRef("tech")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.tech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(technologiesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: technologiesSection?.paragraph || "" }} />
          </div>

          <GCPTechShowcase groups={techGroupsTabs} />

          {cta_section_113?.content && (
            <InlineCTA title={cta_section_113?.content || ""} btn={cta_section_113?.button_text || ""} btnUrl={cta_section_113?.button_url || ""} />
          )}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        ref={setRef("industries")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: industriesSection?.paragraph || "" }} />
          </div>

          <GCPIndustryOrbit items={industriesTabs} logo={heroBanner?.image?.url || ""} logoAlt={heroBanner?.image?.alt || "Google Cloud"} />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        ref={setRef("whyus")}
        className={`relative py-12 lg:py-20 overflow-hidden transition-all duration-700 ${visible.whyus ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 5%) 100%)" }}
      >
        {/* Ambient background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.18) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(0,119,182,0.2) 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(partnerSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: partnerSection?.paragraph || "" }} />
          </div>

          <WhyUsShowcase items={partnerTabs} active={visible.whyus} logo={heroBanner?.image?.url || ""} />

        </div>
      </section>

      {/* BUSINESS OUTCOMES */}
      <section
        ref={setRef("outcomes")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.outcomes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(outcomesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: outcomesSection?.paragraph || "" }} />
          </div>

          <OutcomesImpactMap items={outcomesCards} logo={heroBanner?.image?.url || ""} />

          <InlineCTA title={outcomesSection?.cta_content || ""} btn={outcomesSection?.button_text || ""} btnUrl={outcomesSection?.button_url || ""} />
        </div>
      </section>

      {/* FAQs */}
      {pageData?.faq_section_heading && faqs.length > 0 && (
        <section ref={setRef("faq")} id="faqs" className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <Faqs heading={pageData?.faq_section_heading} faqs={faqs} />
        </section>
      )}

      <RelatedBlogs dataRelatedBlogs={relatedPostsData?.data || []} />

      {/* FINAL CONTACT */}
      <section
        ref={setRef("contact")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-muted-foreground text-base sm:text-lg leading-[1.65] mb-4 text-left" dangerouslySetInnerHTML={{ __html: contactSection?.paragraph || "" }} />
            </div>
            <div>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GCP;
