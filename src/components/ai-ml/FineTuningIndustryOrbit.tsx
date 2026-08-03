import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, type LucideIcon } from "lucide-react";
import { DynamicIcon } from "../DynamicIcon";

export type OrbitIndustry = {
  icon: LucideIcon;
  title: string;
  tag?: string;
  image?: string;
  intro: string;
  listLabel?: string;
  bullets?: string[];
};

const HUB = { x: 50, y: 50 };
const RADIUS_X = 42;
const RADIUS_Y = 40;

const buildOrbitPositions = (n: number) =>
  Array.from({ length: n }).map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return {
      x: HUB.x + RADIUS_X * Math.cos(angle),
      y: HUB.y + RADIUS_Y * Math.sin(angle),
      angle,
    };
  });

const FineTuningIndustryOrbit = ({ items }: { items: OrbitIndustry[] }) => {
  const [active, setActive] = useState<number>(0);
  const chipRailRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldFocusChip = useRef<boolean>(false);
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);
  const swipeLocked = useRef<"h" | "v" | null>(null);
  const tablistId = "ft-industries";
  const orbitPositions = buildOrbitPositions(items.length);

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
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { shouldFocusChip.current = true; goNext(); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { shouldFocusChip.current = true; goPrev(); }
    else if (e.key === "Home") { shouldFocusChip.current = true; setActive(0); }
    else if (e.key === "End") { shouldFocusChip.current = true; setActive(total - 1); }
    else handled = false;
    if (handled) e.preventDefault();
  };

  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
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
    if (swipeLocked.current === "h" && Math.abs(dx) > 50) { dx < 0 ? goNext() : goPrev(); }
    swipeStartX.current = null;
    swipeStartY.current = null;
    swipeLocked.current = null;
  };

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
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { shouldFocusOrbit.current = true; goNext(); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { shouldFocusOrbit.current = true; goPrev(); }
    else if (e.key === "Home") { shouldFocusOrbit.current = true; setActive(0); }
    else if (e.key === "End") { shouldFocusOrbit.current = true; setActive(total - 1); }
    else handled = false;
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
  const hasImages = items.some((i) => !!i.image);

  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 40%, rgba(0,119,182,0.22) 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(95,194,227,0.10) 0%, transparent 55%), linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))",
        border: "1px solid rgba(148,163,184,0.14)",
      }}
    >
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

      {/* DESKTOP */}
      <div className="relative hidden lg:grid grid-cols-12 gap-6 xl:gap-8 px-6 xl:px-8 py-6 xl:py-8">
        <div className="col-span-7 relative">
          <div
            className="relative w-full mx-auto cursor-grab active:cursor-grabbing touch-pan-y select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-2xl h-[480px] lg:h-[580px] xl:h-[600px]"
            role="tablist"
            aria-label="Industries constellation"
            aria-orientation="horizontal"
            onKeyDown={onOrbitKeyDown}
            onPointerDown={onOrbitPointerDown}
            onPointerMove={onOrbitPointerMove}
            onPointerUp={onOrbitPointerUp}
            onPointerCancel={onOrbitPointerUp}
            onWheel={onOrbitWheel}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="orbit-line-ft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(95,194,227,0.85)" />
                  <stop offset="100%" stopColor="rgba(0,119,182,0.2)" />
                </linearGradient>
                <radialGradient id="particle-glow-ft">
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
                      stroke={isActive ? "rgba(95,194,227,0.95)" : "url(#orbit-line-ft)"}
                      strokeWidth={isActive ? 1.6 : 0.9}
                      strokeDasharray={isActive ? "0" : "4 5"}
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle r={isActive ? 1.4 : 0.9} fill="url(#particle-glow-ft)">
                      <animateMotion dur={`${3 + (i % 3) * 0.6}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                );
              })}
            </svg>

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
                  <Sparkles className="w-9 h-9 xl:w-10 xl:h-10 text-white drop-shadow-lg" strokeWidth={1.4} />
                  <p className="mt-1 text-[9px] font-mono uppercase tracking-[0.18em] text-white/90">
                    AI Core
                  </p>
                </div>
              </div>
            </div>

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
                  id={`ft-orbit-tab-${i}`}
                  aria-label={item.title}
                  aria-selected={isActive}
                  aria-controls="ft-orbit-panel"
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
                      <DynamicIcon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-accent"}`} name={typeof item.icon === 'string' ? item.icon : ""} />
                    </div>
                    <span
                      className={`text-[11px] font-semibold whitespace-nowrap pr-1 ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} · {item.title.split(" and ")[0].split(" & ")[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-5 relative">
          <div
            key={active}
            role="tabpanel"
            id="ft-orbit-panel"
            aria-labelledby={`ft-orbit-tab-${active}`}
            aria-live="polite"
            aria-atomic="true"
            tabIndex={0}
            onKeyDown={onPanelKeyDown}
            className="relative h-[480px] lg:h-[580px] xl:h-[600px] rounded-2xl p-5 xl:p-6 flex flex-col animate-fade-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{
              background: "linear-gradient(160deg, rgba(19,42,74,0.85), rgba(19,42,74,0.55))",
              border: "1px solid rgba(95,194,227,0.28)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-bl-full pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, rgba(95,194,227,0.18), transparent 70%)" }}
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
                <DynamicIcon name={typeof activeItem.icon === 'string' ? activeItem.icon : ""} className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-accent">
                    {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  {activeItem.tag && (
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-accent/30 text-accent/90">
                      {activeItem.tag}
                    </span>
                  )}
                </div>
                <h4 className="text-lg xl:text-xl font-semibold text-foreground leading-tight">
                  {activeItem.title}
                </h4>
              </div>
            </div>

            {hasImages && (
              <div className="hidden lg:block relative mb-3 rounded-xl overflow-hidden border border-accent/20 h-40 xl:h-48 shrink-0">
                {items.map((item, i) => (
                  item.image ? (
                    <img
                      key={item.image + i}
                      src={item.image}
                      alt={item.title}
                      loading="eager"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        i === active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : null
                ))}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, rgba(19,42,74,0.15) 0%, rgba(19,42,74,0.85) 100%)" }}
                />
              </div>
            )}

            <div className="flex-1 flex flex-col justify-end overflow-hidden">
              <p className="text-[13px] xl:text-sm text-muted-foreground leading-relaxed mb-3">
                {activeItem.intro}
              </p>
              {activeItem.listLabel && activeItem.bullets && (
                <>
                  <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
                    {activeItem.listLabel}
                  </p>
                  <ul className="space-y-1.5">
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
                </>
              )}
            </div>

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

      {/* MOBILE / TABLET */}
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
            <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-0.5">
              AI Ecosystem
            </p>
            <p className="text-xs text-muted-foreground">{total} industries · tap to expand</p>
          </div>
        </div>

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
                  {String(i + 1).padStart(2, "0")} · {item.title.split(" and ")[0].split(" & ")[0]}
                </span>
              </button>
            );
          })}
        </div>

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
                <DynamicIcon name={typeof activeItem.icon === 'string' ? activeItem.icon : ""} className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-accent">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  {activeItem.tag ? ` · ${activeItem.tag}` : ""}
                </span>
                <h4 className="text-base font-semibold text-foreground leading-tight">
                  {activeItem.title}
                </h4>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
              {activeItem.intro}
            </p>
            {activeItem.listLabel && activeItem.bullets && (
              <>
                <p className="text-[11px] font-mono uppercase tracking-widest text-accent mb-2">
                  {activeItem.listLabel}
                </p>
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
              </>
            )}
          </div>

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

export default FineTuningIndustryOrbit;
