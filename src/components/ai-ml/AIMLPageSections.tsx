import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceContactForm from "@/components/ServiceContactForm";

export const useReveal = () => {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (key: string) => (el: HTMLElement | null) => {
    refs.current[key] = el;
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset.section;
            if (key) setVisible((v) => ({ ...v, [key]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    Object.entries(refs.current).forEach(([key, el]) => {
      if (el) {
        el.dataset.section = key;
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);
  return { visible, setRef };
};

export const SectionTitle = ({
  pre,
  hi,
  post,
  sub,
}: {
  pre?: string;
  hi: string;
  post?: string;
  sub?: string;
}) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
      {pre && <span className="text-foreground">{pre} </span>}
      <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">{hi}</span>
      {post && <span className="text-foreground"> {post}</span>}
    </h2>
    {sub && (
      <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
        {sub}
      </p>
    )}
  </div>
);

export const InlineCTA = ({ title, sub, btn }: { title: string; sub: string; btn: string }) => (
  <div style={{ background: "#070B12" }} className="py-6">
    <div className="container mx-auto px-4 lg:px-8">
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7"
        style={{
          background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
          border: "1px solid rgba(148,163,184,0.15)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.6)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
          <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
        </div>
        <div className="flex-1 relative z-10">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{sub}</p>
        </div>
        <Link to="/contactus" className="flex-shrink-0 relative z-10">
          <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
            {btn}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export type WhyMatterItem = { icon: LucideIcon; title: string; desc: string; image: string };

export const WhyMattersSticky = ({
  sectionId,
  pre,
  hi,
  post,
  sub,
  items,
  visible,
  setRef,
}: {
  sectionId: string;
  pre?: string;
  hi: string;
  post?: string;
  sub?: string;
  items: WhyMatterItem[];
  visible: Record<string, boolean>;
  setRef: (key: string) => (el: HTMLElement | null) => void;
}) => (
  <section
    ref={setRef(sectionId)}
    className="relative py-10 lg:py-14"
    style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)" }}
  >
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <SectionTitle pre={pre} hi={hi} post={post} sub={sub} />
      <div className="relative space-y-5 lg:space-y-16">
        {items.map((g, i) => {
          const Icon = g.icon;
          const reverse = i % 2 === 1;
          const isVisible = !!visible[sectionId];
          const top = 6 + i * 1.25;
          return (
            <div
              key={i}
              className={`relative lg:sticky grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                background: "hsl(222 47% 6%)",
                boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
                border: "1px solid rgba(148,163,184,0.14)",
                transitionDelay: `${i * 90}ms`,
                top: `${top}rem`,
              }}
            >
              <div className={`relative min-h-[240px] lg:min-h-[300px] ${reverse ? "lg:order-2" : ""}`}>
                <img src={g.image} alt={g.title} loading="eager" width={1024} height={1024} className="absolute inset-0 w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: reverse
                      ? "linear-gradient(270deg, rgba(10,15,30,0.85) 0%, rgba(10,15,30,0.15) 100%)"
                      : "linear-gradient(90deg, rgba(10,15,30,0.15) 0%, rgba(10,15,30,0.85) 100%)",
                  }}
                />
              </div>
              <div className={`relative p-6 sm:p-8 lg:p-10 flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(56,189,248,0.10)", border: "1px solid rgba(56,189,248,0.35)" }}
                  >
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-snug">{g.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{g.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export type BentoItem = { icon: LucideIcon; title: string; desc: string };

export const ServicesBento = ({
  sectionId,
  pre,
  hi,
  post,
  sub,
  items,
  journey,
  visible,
  setRef,
  featuredLabels = ["Featured", "Featured", "Featured"],
  badges,
}: {
  sectionId: string;
  pre?: string;
  hi: string;
  post?: string;
  sub?: string;
  items: BentoItem[];
  journey?: { label: string; Icon: LucideIcon }[];
  visible: Record<string, boolean>;
  setRef: (key: string) => (el: HTMLElement | null) => void;
  featuredLabels?: [string, string, string];
  badges?: (string | null)[];
}) => {
  const eight = items.slice(0, 8);
  const total = String(eight.length).padStart(2, "0");
  const spans = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-8", "lg:col-span-4"];
  const defaultBadges = ["Featured", "Featured", null, null, null, null, "Featured", null];
  const badgeArr = badges ?? defaultBadges;

  return (
    <section
      ref={setRef(sectionId)}
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 55%, hsl(222 47% 4%) 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-[1500px]">
        <div className={`text-center mb-8 transition-all duration-700 ${visible[sectionId] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {pre && <span className="text-foreground">{pre} </span>}
            <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">{hi}</span>
            {post && <span className="text-foreground"> {post}</span>}
          </h2>
          {sub && (
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mx-auto" style={{ maxWidth: 850 }}>
              {sub}
            </p>
          )}
        </div>

        {journey && journey.length > 0 && (
          <div className={`mb-12 lg:mb-14 transition-all duration-700 delay-200 ${visible[sectionId] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="overflow-x-auto scrollbar-none">
              <ol className="flex items-start justify-between gap-2 min-w-[720px] lg:min-w-0 px-2 relative">
                <div
                  className="absolute left-6 right-6 top-5 h-px pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent 0%, rgba(95,194,227,0.55) 15%, rgba(0,119,182,0.6) 50%, rgba(95,194,227,0.55) 85%, transparent 100%)" }}
                />
                {journey.map((step, i) => (
                  <li key={step.label} className="flex-1 flex flex-col items-center relative">
                    <div
                      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700"
                      style={{
                        background: "rgba(10,15,30,0.9)",
                        border: "1px solid rgba(95,194,227,0.45)",
                        boxShadow: visible[sectionId] ? "0 0 18px rgba(95,194,227,0.45), inset 0 0 10px rgba(0,119,182,0.25)" : "0 0 0 rgba(0,0,0,0)",
                        transitionDelay: `${300 + i * 120}ms`,
                      }}
                    >
                      <step.Icon className="w-4 h-4 text-accent" strokeWidth={1.75} />
                    </div>
                    <span className="mt-3 text-[11px] sm:text-xs font-medium text-muted-foreground tracking-wide whitespace-nowrap">{step.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          {eight.map((s, i) => {
            const featured = i === 0 || i === 1 || i === 6;
            const Icon = s.icon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <article
                key={i}
                tabIndex={0}
                aria-label={s.title}
                className={`group relative ${spans[i]} rounded-[24px] overflow-hidden outline-none transition-all duration-500 ease-out ${
                  visible[sectionId] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } hover:-translate-y-1.5`}
                style={{
                  background: "linear-gradient(160deg, rgba(15,23,42,0.85) 0%, rgba(10,15,30,0.9) 100%)",
                  border: "1px solid rgba(95,194,227,0.18)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                  transitionDelay: `${i * 70}ms`,
                  backdropFilter: "blur(6px)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity"
                    style={{
                      backgroundImage: `linear-gradient(rgba(95,194,227,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.6) 1px, transparent 1px)`,
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div
                    className="absolute -top-24 -right-24 w-72 h-72 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background: featured
                        ? "radial-gradient(circle, rgba(0,119,182,0.35) 0%, transparent 65%)"
                        : "radial-gradient(circle, rgba(95,194,227,0.22) 0%, transparent 65%)",
                    }}
                  />
                </div>

                <div className={`relative p-6 lg:p-7 h-full flex ${featured ? "flex-col lg:flex-row lg:items-stretch gap-6" : "flex-col"}`}>
                  <div className={`flex-1 flex flex-col ${featured ? "min-w-0" : ""}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-accent/80" style={{ textShadow: "0 0 12px rgba(95,194,227,0.4)" }}>
                        {num} / {total}
                      </span>
                      {badgeArr[i] && (
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full text-accent"
                          style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.35)" }}
                        >
                          {badgeArr[i]}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.30)" }}>
                        <Icon className="relative w-5 h-5 text-accent" strokeWidth={1.6} />
                      </div>
                      <h3 className={`${featured ? "text-lg lg:text-xl" : "text-base lg:text-lg"} font-bold text-foreground leading-snug m-0`}>{s.title}</h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>

                  {featured && (
                    <div
                      className="relative lg:w-[220px] lg:flex-shrink-0 rounded-2xl overflow-hidden order-first lg:order-last min-h-[140px]"
                      style={{
                        background: "linear-gradient(160deg, rgba(0,119,182,0.15), rgba(95,194,227,0.06))",
                        border: "1px solid rgba(95,194,227,0.18)",
                      }}
                    >
                      <svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
                        <defs>
                          <radialGradient id={`gr-${sectionId}-${i}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(95,194,227,0.45)" />
                            <stop offset="100%" stopColor="rgba(0,119,182,0)" />
                          </radialGradient>
                          <linearGradient id={`ln-${sectionId}-${i}`} x1="0" x2="1">
                            <stop offset="0%" stopColor="rgba(95,194,227,0.75)" />
                            <stop offset="100%" stopColor="rgba(0,119,182,0.25)" />
                          </linearGradient>
                        </defs>
                        <circle cx="110" cy="110" r="90" fill={`url(#gr-${sectionId}-${i})`} />
                        {i === 0 && (
                          /* Neural layers — Build / Customize / Develop */
                          <g>
                            {[40, 110, 180].map((cx, ci) => {
                              const ys = ci === 1 ? [50, 90, 130, 170] : [70, 110, 150];
                              return ys.map((cy, ni) => (
                                <g key={`${ci}-${ni}`}>
                                  {ci < 2 && (ci === 0 ? [70, 110, 150] : [50, 90, 130, 170]).map((ny, nj) => (
                                    <line
                                      key={nj}
                                      x1={cx}
                                      y1={cy}
                                      x2={ci === 0 ? 110 : 180}
                                      y2={ny}
                                      stroke={`url(#ln-${sectionId}-${i})`}
                                      strokeWidth="0.8"
                                      opacity="0.55"
                                    />
                                  ))}
                                  <circle
                                    cx={cx}
                                    cy={cy}
                                    r={ci === 1 ? 5 : 4}
                                    fill={ci === 1 ? "rgba(95,194,227,0.95)" : "rgba(10,15,30,1)"}
                                    stroke="rgba(95,194,227,0.9)"
                                    strokeWidth="1.2"
                                  />
                                </g>
                              ));
                            })}
                          </g>
                        )}
                        {i === 1 && (
                          /* Data pipeline — Process / Automate / Analyze */
                          <g>
                            <line x1="20" y1="110" x2="200" y2="110" stroke={`url(#ln-${sectionId}-${i})`} strokeWidth="1.2" strokeDasharray="4 5" />
                            {[45, 110, 175].map((cx, ci) => (
                              <g key={ci}>
                                <rect
                                  x={cx - 22}
                                  y={88}
                                  width="44"
                                  height="44"
                                  rx="8"
                                  fill="rgba(10,15,30,0.95)"
                                  stroke="rgba(95,194,227,0.7)"
                                  strokeWidth="1.2"
                                />
                                {[0, 1, 2].map((r) => (
                                  <line
                                    key={r}
                                    x1={cx - 12}
                                    y1={100 + r * 8}
                                    x2={cx + 12}
                                    y2={100 + r * 8}
                                    stroke="rgba(95,194,227,0.6)"
                                    strokeWidth="0.9"
                                  />
                                ))}
                                {ci < 2 && (
                                  <polygon
                                    points={`${cx + 26},110 ${cx + 34},106 ${cx + 34},114`}
                                    fill="rgba(95,194,227,0.9)"
                                  />
                                )}
                              </g>
                            ))}
                            <circle cx="45" cy="60" r="3" fill="rgba(95,194,227,0.85)" />
                            <circle cx="110" cy="45" r="3" fill="rgba(95,194,227,0.85)" />
                            <circle cx="175" cy="60" r="3" fill="rgba(95,194,227,0.85)" />
                            <line x1="45" y1="60" x2="45" y2="86" stroke="rgba(95,194,227,0.45)" strokeWidth="0.8" strokeDasharray="2 3" />
                            <line x1="110" y1="45" x2="110" y2="86" stroke="rgba(95,194,227,0.45)" strokeWidth="0.8" strokeDasharray="2 3" />
                            <line x1="175" y1="60" x2="175" y2="86" stroke="rgba(95,194,227,0.45)" strokeWidth="0.8" strokeDasharray="2 3" />
                          </g>
                        )}
                        {i === 6 && (
                          /* Growth radar — Scale / Insight / Impact */
                          <g>
                            {[30, 55, 80].map((r, ri) => (
                              <circle
                                key={ri}
                                cx="110"
                                cy="130"
                                r={r}
                                fill="none"
                                stroke="rgba(95,194,227,0.28)"
                                strokeDasharray={ri === 1 ? "3 4" : "1 5"}
                              />
                            ))}
                            <path
                              d="M 30 160 L 65 140 L 100 118 L 135 95 L 170 70 L 195 55"
                              fill="none"
                              stroke={`url(#ln-${sectionId}-${i})`}
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 30 160 L 65 140 L 100 118 L 135 95 L 170 70 L 195 55 L 195 185 L 30 185 Z"
                              fill="rgba(95,194,227,0.10)"
                            />
                            {[[65, 140], [100, 118], [135, 95], [170, 70]].map(([x, y], k) => (
                              <circle key={k} cx={x} cy={y} r="3.2" fill="rgba(10,15,30,1)" stroke="rgba(95,194,227,0.95)" strokeWidth="1.3" />
                            ))}
                            <polygon points="195,55 185,60 190,50" fill="rgba(95,194,227,0.95)" />
                          </g>
                        )}
                      </svg>
                      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(95,194,227,0.9)]" />
                        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {i === 0 ? featuredLabels[0] : i === 1 ? featuredLabels[1] : featuredLabels[2]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export type BenefitItem = { icon: LucideIcon; title: string; desc: string };

export const BenefitsGrid = ({
  sectionId,
  pre,
  hi,
  post,
  sub,
  items,
  visible,
  setRef,
}: {
  sectionId: string;
  pre?: string;
  hi: string;
  post?: string;
  sub?: string;
  items: BenefitItem[];
  visible: Record<string, boolean>;
  setRef: (key: string) => (el: HTMLElement | null) => void;
}) => (
  <section
    ref={setRef(sectionId)}
    className="relative py-10 lg:py-14 overflow-hidden"
    style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
  >
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <SectionTitle pre={pre} hi={hi} post={post} sub={sub} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr">
        {items.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className={`group relative rounded-2xl p-6 flex flex-col overflow-hidden transition-all duration-500 ${
                visible[sectionId] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                background: "linear-gradient(160deg, rgba(15,23,42,0.85) 0%, rgba(11,17,32,0.9) 100%)",
                border: "1px solid rgba(148,163,184,0.14)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(90deg, transparent 0%, #5FC2E3 30%, #0077B6 70%, transparent 100%)" }}
              />
              <div className="relative z-10 flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(95,194,227,0.18) 0%, rgba(0,119,182,0.12) 100%)",
                    border: "1px solid rgba(95,194,227,0.28)",
                  }}
                >
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-foreground leading-snug">{b.title}</h3>
              </div>
              <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export const ClosingContact = ({
  sectionId,
  heading,
  hi,
  tail,
  para,
  bullets,
  serviceName,
  btn,
  visible,
  setRef,
}: {
  sectionId: string;
  heading: string;
  hi: string;
  tail: string;
  para: string;
  bullets: string[];
  serviceName: string;
  btn: string;
  visible: Record<string, boolean>;
  setRef: (key: string) => (el: HTMLElement | null) => void;
}) => (
  <section
    ref={setRef(sectionId)}
    className="relative py-10 lg:py-14 overflow-hidden"
    style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}
  >
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className={`transition-all duration-700 ${visible[sectionId] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            {heading}{" "}
            <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">{hi}</span>{" "}
            {tail}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">{para}</p>
          <ul className="space-y-3 mb-6">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Link to="/contactus">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
            >
              {btn}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className={`transition-all duration-700 delay-150 ${visible[sectionId] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
          <ServiceContactForm serviceName={serviceName} />
        </div>
      </div>
    </div>
  </section>
);
