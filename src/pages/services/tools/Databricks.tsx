import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  Brain,
  Bot,
  BarChart3,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { useInViewMap } from "@/hooks/useInView";

type ServiceItem = { icon?: string; title: string; desc: string; image: string, image_label: string };

const DatabricksServicesTabs = ({ services }: { services: ServiceItem[] }) => {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const s = services[active];

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
    const container = tabsRef.current;
    const el = container?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!container || !el) return;
    // Only horizontally scroll the tablist itself (don't move the page)
    if (container.scrollWidth > container.clientWidth) {
      const target = el.offsetLeft - (container.clientWidth - el.offsetWidth) / 2;
      const max = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: "smooth" });
    }
  }, [active]);

  return (
    <div>
      {/* Preload */}
      <div aria-hidden className="hidden">
        {services.map((item, i) => (
          <img key={i} src={item.image} alt="" loading="eager" decoding="async" width={1} height={1} />
        ))}
      </div>

      {/* PILL TABS */}
      <div className="relative mb-5 lg:mb-7">
        {/* Soft container glow (desktop only) */}
        <div
          aria-hidden
          className="hidden lg:block absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(95,194,227,0.04), rgba(0,119,182,0.04))",
            border: "1px solid rgba(148,163,184,0.10)",
          }}
        />
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Databricks Consulting Services"
          className="relative flex gap-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-px-4 lg:snap-none lg:overflow-visible lg:flex-wrap lg:justify-center pb-2 lg:p-3"
          style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
        >
          {services.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                data-tab={i}
                role="tab"
                id={`db-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`db-panel-${i}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`group relative shrink-0 snap-center lg:snap-align-none inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${isActive ? "scale-[1.02]" : "hover:-translate-y-0.5"}`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(95,194,227,0.22), rgba(0,119,182,0.22))"
                    : "rgba(255,255,255,0.03)",
                  border: isActive
                    ? "1px solid rgba(95,194,227,0.55)"
                    : "1px solid rgba(148,163,184,0.14)",
                  boxShadow: isActive
                    ? "0 10px 28px -8px rgba(0,119,182,0.55), inset 0 1px 0 rgba(255,255,255,0.06)"
                    : "none",
                }}
              >
                <span
                  className="w-6 h-6 rounded-md inline-flex items-center justify-center transition-all"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(95,194,227,0.45), rgba(0,119,182,0.45))"
                      : "rgba(148,163,184,0.08)",
                    border: isActive
                      ? "1px solid rgba(95,194,227,0.55)"
                      : "1px solid rgba(148,163,184,0.12)",
                  }}
                >
                  <DynamicIcon name={item.icon} className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-white" : "text-muted-foreground group-hover:text-accent"}`} />
                </span>
                <span className={`text-[13px] font-medium whitespace-nowrap ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {item.title}
                </span>
                {isActive && (
                  <span
                    className="ml-1 w-1.5 h-1.5 rounded-full"
                    style={{ background: "#5FC2E3", boxShadow: "0 0 8px rgba(95,194,227,0.9)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>


      {/* PANEL */}
      <div
        key={active}
        role="tabpanel"
        id={`db-panel-${active}`}
        aria-labelledby={`db-tab-${active}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative rounded-3xl overflow-hidden animate-panel-in"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
          border: "1px solid rgba(148,163,184,0.15)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
          {/* IMAGE SIDE */}
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
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.image_label}</span>
            </div>

            <div className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.9), rgba(0,119,182,0.9))", border: "1px solid rgba(95,194,227,0.5)", boxShadow: "0 10px 30px rgba(0,119,182,0.4)" }}>
              <DynamicIcon name={s.icon} className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* CONTENT SIDE */}
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
        <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
      </div>
      <Link to={btnUrl} className="flex-shrink-0 relative z-10">
        <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
          {btn}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Button>
      </Link>
    </div>
  </div>
);

const decodeHTMLEntities = (value?: string) => {
  if (!value) return "";
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
};

const Databricks = () => {
  const { setRef, inViewMap: visible } = useInViewMap();

  const { data } = useQuery({
    queryKey: ["databricks-engineers"],
    queryFn: api.getDatabricksEngineers,
  });

  const pageData = data?.data;
  const heroBanner = pageData?.tools_main_banner;
  const heroContent = pageData?.modernize_your_data_analytics_and_ai_with_databricks_consulting_services;
  const whyContent = pageData?.why_choose_the_databricks_platform;
  const servicesContent = pageData?.our_databricks_consulting_services;
  const cta70 = pageData?.cta_section_70;
  const cta77 = pageData?.cta_section_77;
  const migrationContent = pageData?.ensuring_seamless_migration_to_databricks;
  const consultantsContent = pageData?.how_our_databricks_consultants_help_you;
  const cta111 = pageData?.cta_section_111;
  const solutionsContent = pageData?.databricks_solutions_for_modern_data_ai;
  const cta113 = pageData?.cta_section_113;
  const whyUsContent = pageData?.why_choose_code1_tech_systems_for_databricks_consulting;
  const cta114 = pageData?.cta_section_114;
  const finalSectionContent = pageData?.services_get_started_section;
  const heroImageUrl = heroBanner?.image?.url || "";
  const heroBadges = heroBanner?.badges || [];
  const heroStats = heroBanner?.bottom_section || [];
  const serviceTabs = (servicesContent?.tabs || []).map((tab: any) => ({
    icon: tab?.icon,
    title: tab?.title || "",
    desc: tab?.content || "",
    image: tab?.images?.url || "",
    image_label: tab?.image_label || "",
  }));
  const migrationCards = migrationContent?.cards || [];
  const consultantCards = consultantsContent?.cards || [];
  const solutionCards = solutionsContent?.cards || [];
  const whyUsCards = whyUsContent?.cards || [];

  return (
    <>
      <SeoTags
              title={pageData?.seo?.title}
              description={pageData?.seo?.description}
              ogImage={pageData?.seo?.og_image}
              schema={pageData?.schema}
            />
      {/* HERO — Centerpiece showcase */}
      <section
        ref={setRef("hero")}
        className="relative overflow-hidden pt-24 pb-10 lg:pt-28 lg:pb-16"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(0,119,182,0.18) 0%, transparent 60%), linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 60%, hsl(222 47% 4%) 100%)",
        }}
      >
        {/* Grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
          }}
        />
        {/* Ambient glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(95,194,227,0.18) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,90,40,0.10) 0%, transparent 65%)" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Eyebrow / breadcrumb — placed above the showcase image */}
          <div className={`text-center mb-5 lg:mb-6 transition-all duration-700 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {heroBanner?.top_label || ""}
            </span>
          </div>

          {/* Showcase image stage */}
          <div className={`relative max-w-5xl mx-auto mb-8 lg:mb-10 transition-all duration-1000 delay-150 ${visible.hero ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}>
            {/* Halo glow */}
            <div className="absolute -inset-6 sm:-inset-10 rounded-[2rem] blur-3xl opacity-70 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(95,194,227,0.35) 0%, rgba(0,119,182,0.20) 40%, transparent 75%)" }} />

            {/* Floating capability chips — desktop only */}
            <div className="hidden lg:flex absolute -left-6 top-12 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_6s_ease-in-out_infinite]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[0]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[0]?.label}</span>
            </div>
            <div className="hidden lg:flex absolute -right-6 top-24 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_7s_ease-in-out_infinite_reverse]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[1]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[1]?.label}</span>
            </div>
            <div className="hidden lg:flex absolute -left-8 bottom-20 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_8s_ease-in-out_infinite]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[2]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[2]?.label}</span>
            </div>
            <div className="hidden lg:flex absolute -right-8 bottom-24 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_6.5s_ease-in-out_infinite_reverse]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[3]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[3]?.label}</span>
            </div>

            {/* Image frame */}
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "835 / 445",
                border: "1px solid rgba(95,194,227,0.25)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 80px rgba(95,194,227,0.10)",
              }}>
              <img
                src={heroImageUrl}
                alt={heroBanner?.image?.url || ""}
                className="w-full h-full object-cover"
                loading="eager"
                width={835}
                height={445}
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-[2px] bg-gradient-to-r from-accent to-transparent" />
                <div className="absolute top-4 left-4 w-[2px] h-8 bg-gradient-to-b from-accent to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                <div className="absolute bottom-4 right-4 w-8 h-[2px] bg-gradient-to-l from-accent to-transparent" />
                <div className="absolute bottom-4 right-4 w-[2px] h-8 bg-gradient-to-t from-accent to-transparent" />
              </div>
            </div>

            {/* Metric strip — overlapping bottom */}
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

          {/* Headline block — below the image */}
          <div className={`max-w-[95%] xl:max-w-6xl mx-auto text-center transition-all duration-700 delay-300 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-foreground leading-[1.1] mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-[1.75] max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(heroContent?.paragraph || "") }} />
          </div>


          {/* CTA row */}
          <div className={`mt-7 lg:mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-sm sm:text-base text-foreground/85 font-medium text-center sm:text-left">
              {heroContent?.white_text || ""}
            </p>
            <Link to={heroContent?.button_url}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
              >
                {heroContent?.button_text || ""}
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


      {/* WHY CHOOSE DATABRICKS */}
      <section
        ref={setRef("why")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {whyContent?.paragraph}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(whyContent?.cards || []).map((w: any, i: number) => (
              <div key={i} className="group relative p-5 lg:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-start gap-5 mb-3">
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground text-left leading-snug pt-2">{w.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-[1.65] text-left">{w.content}</p>
              </div>
            ))}
          </div>

          <InlineCTA title={cta70?.content || ""} btn={cta70?.cta_text || ""} btnUrl={cta70?.cta_url} />
        </div>
      </section>

      {/* OUR DATABRICKS CONSULTING SERVICES */}
      <section
        ref={setRef("services")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-6 lg:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(servicesContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {servicesContent?.paragraph}
            </p>
          </div>

          <DatabricksServicesTabs services={serviceTabs} />


          <InlineCTA title={cta77?.cta_content} btn={cta77?.button_text} btnUrl={cta77?.button_url} />
        </div>
      </section>

      {/* SEAMLESS MIGRATION */}
      <section
        ref={setRef("migration")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.migration ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(migrationContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {(migrationCards || []).map((m: any, i: number) => (
              <div key={i} className="relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r" style={{ background: "linear-gradient(180deg, #5FC2E3, #0077B6)" }} />
                <div className="flex items-center gap-4 mb-3 pl-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={m.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground text-left leading-snug">{m.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left pl-2">{m.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW OUR CONSULTANTS HELP */}
      <section
        ref={setRef("consultants")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.consultants ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(consultantsContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {consultantsContent?.paragraph}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {(consultantCards || []).map((c: any, i: number) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={c.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{c.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{c.content}</p>
              </div>
            ))}
          </div>

          <InlineCTA title={cta111?.content || ""} btn={cta111?.button_text || ""} btnUrl={cta111?.button_url} />
        </div>
      </section>

      {/* SOLUTIONS */}
      <section
        ref={setRef("solutions")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.solutions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(solutionsContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {solutionsContent?.paragraph}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {(solutionCards || []).map((s: any, i: number) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={s.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{s.content}</p>
              </div>
            ))}
          </div>

          <InlineCTA title={cta113?.content || ""} btn={cta113?.button_text || ""} btnUrl={cta113?.button_url} />
        </div>
      </section>

      {/* WHY CHOOSE CODE1 */}
      <section
        ref={setRef("whyus")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.whyus ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyUsContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {whyUsContent?.paragraph}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">
            {(whyUsCards || []).map((w: any, i: number) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-[1.65] text-left">{w.content}</p>
              </div>
            ))}
          </div>

          <InlineCTA title={cta114?.content || ""} btn={cta114?.button_text || ""} btnUrl={cta114?.button_url} />
        </div>
      </section>

      {/* FINAL CONTACT */}
      <section
        ref={setRef("contact")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(finalSectionContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-muted-foreground text-base sm:text-lg leading-[1.65] mb-4 text-left" dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(finalSectionContent?.paragraph || "") }} />
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

export default Databricks;
