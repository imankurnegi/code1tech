import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import ContactUsForm from "@/components/ContactUsForm";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useInViewMap } from "@/hooks/useInView";

type ServiceItem = { icon: any; title: string; desc: string; image: string };

const TableauServicesTabs = ({ services }: { services: ServiceItem[] }) => {
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
    if (container.scrollWidth > container.clientWidth) {
      const target = el.offsetLeft - (container.clientWidth - el.offsetWidth) / 2;
      const max = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: "smooth" });
    }
  }, [active]);

  if (!services.length) return null;

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
          aria-label="Tableau Development Services"
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
                id={`tab-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`tab-panel-${i}`}
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
        id={`tab-panel-${active}`}
        aria-labelledby={`tab-tab-${active}`}
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
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Tableau Service</span>
            </div>

            <div className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.9), rgba(0,119,182,0.9))", border: "1px solid rgba(95,194,227,0.5)", boxShadow: "0 10px 30px rgba(0,119,182,0.4)" }}>
              <DynamicIcon name={s.icon} className="w-7 h-7 text-white" />
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

const InlineCTA = ({ title, btn, btnUrl }: { title: string; btn: string, btnUrl:string }) => (
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
      <Link to={btnUrl || ""} className="flex-shrink-0 relative z-10">
        <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
          {btn}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Button>
      </Link>
    </div>
  </div>
);

const Tableau = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const { data } = useQuery({
      queryKey: ["tableau-engineers"],
      queryFn: api.getTableauEngineers,
    });

  const pageData = data?.data;

  const heroBanner = pageData?.tools_main_banner;
  const heroContent = pageData?.transform_business_data_into_confident_decisions_with_tableau || {};

  const serviceSection = pageData?.tableau_development_services_designed_around_your_business || {};
  const whychooseSection = pageData?.why_choose_tableau_for_business_intelligence || {};
  const trustExpertSection = pageData?.why_businesses_trust_our_tableau_experts || {};
  const partnerSection = pageData?.partner_with_tableau_experts_who_understand_your_business || {};
  const popularIntegrationsSection = pageData?.popular_tableau_integrations || {};
  const processSection = pageData?.our_tableau_development_process || {};
  const industrySection = pageData?.tableau_solutions_for_every_industry || {};
  const contactSection  = pageData?.services_get_started_section || {}
  const actionableBusinessIntelligenceSection = pageData?.turn_complex_data_into_actionable_business_intelligence || {}
  const cta_section_70 = pageData?.cta_section_70;
  const cta_section_77 = pageData?.cta_section_77;
  const cta_section_111 = pageData?.cta_section_111;
  const cta_section_113 = pageData?.cta_section_113;
  const cta_section_114 = pageData?.cta_section_114;
  const cta_section_130 = pageData?.cta_section_130;

  // ─── DATA ────────────────────────────────────────────────────────────────

const services: ServiceItem[] = serviceSection?.tabs?.map((tab: any) => ({
  icon: tab.icon,
  title: tab.title,
  desc: tab.content,
  image: tab.image.url,
  })) || [];

const whyTableau = whychooseSection?.cards?.map((item: any) => ({
  icon: item.icon,
  title: item.title,
  desc: item.content,
})) || [];

const whyTrust = trustExpertSection?.cards?.map((item: any) => ({
  icon: item.icon,
  title: item.title,
  desc: item.content,
})) || [];

const partner = partnerSection?.cards?.map((item: any) => ({
  icon: item.icon,
  title: item.title,
  desc: item.content,
})) || [];

const integrations = popularIntegrationsSection?.cards?.map((item: any) => ({
  icon: item.icon,
  title: item.title,
  desc: item.content,
})) || [];

const process = processSection?.cards?.map((item: any) => ({
  icon: item.icon,
  title: item.title,
  desc: item.content,
})) || [];

const industries = industrySection?.cards?.map((item: any) => ({
  icon: item.icon,
  label: item.title
})) || [];

const heroBadges = heroBanner?.badges || [];
const heroStats = heroBanner?.bottom_section || [];
const heroImageUrl = heroBanner?.image?.url || "";
  

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
              {heroContent?.white_text || ""}
            </p>
            <Link to={heroContent?.button_url || "/contact"}>
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

      {/* INTRO — Turn Complex Data */}
      <section
        ref={setRef("intro")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.intro ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-8 lg:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html:addClassToSpan(actionableBusinessIntelligenceSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {actionableBusinessIntelligenceSection?.blocks?.map((block: any, index: number) => (
              <div key={index} className="rounded-2xl p-6 lg:p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
              <p className="text-[15px] text-muted-foreground leading-[1.75] text-left">
                {block?.content || ""}
              </p>
            </div>
            ))}
          </div>

          {cta_section_70?.content && (
            <InlineCTA
            title={cta_section_70?.content || ""}
            btn={cta_section_70?.cta_text || ""}
            btnUrl={cta_section_70?.cta_url || ""}
          />)
          }
        </div>
      </section>

      {/* WHY CHOOSE TABLEAU */}
      <section
        ref={setRef("why")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html:addClassToSpan(whychooseSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
             {whychooseSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {whyTableau.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>
        {cta_section_77?.cta_content && (<InlineCTA
            title={cta_section_77?.cta_content || ""}
            btn={cta_section_77?.button_text || ""}
            btnUrl={cta_section_77?.button_url || ""}
          />)}
        </div>
      </section>

      {/* WHY TRUST OUR EXPERTS */}
      <section
        ref={setRef("trust")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.trust ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(trustExpertSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {trustExpertSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
            {whyTrust.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-4" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                  <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-foreground text-left leading-snug mb-2">{w.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES TABS */}
      <section
        ref={setRef("services")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-6 lg:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html:addClassToSpan(serviceSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {serviceSection?.paragraph || ""}
            </p>
          </div>

          <TableauServicesTabs services={services} />

          {cta_section_111?.content && (<InlineCTA
            title={cta_section_111?.content || ""}
            btn={cta_section_111?.button_text || ""}
            btnUrl={cta_section_111?.button_url || ""}
          />)}
        </div>
      </section>

      {/* PARTNER WITH EXPERTS */}
      <section
        ref={setRef("partner")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.partner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(partnerSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {partnerSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {partner.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>

          {cta_section_113?.content && (<InlineCTA
            title={cta_section_113?.content || ""}
            btn={cta_section_113?.button_text || ""}
            btnUrl={cta_section_113?.button_url || ""}
          />)}
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section
        ref={setRef("integrations")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.integrations ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(popularIntegrationsSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {popularIntegrationsSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {integrations.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        ref={setRef("process")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(processSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {processSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {process.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>
          {cta_section_114?.content && (<InlineCTA
            title={cta_section_114?.content || ""}
            btn={cta_section_114?.button_text || ""}
            btnUrl={cta_section_114?.button_url || ""}
          />)}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        ref={setRef("industries")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(industrySection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {industrySection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {industries.map((it, i) => (
              <div key={i} className="group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                  <DynamicIcon name={it.icon} className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground text-left leading-snug">{it.label}</span>
              </div>
            ))}
          </div>
          {cta_section_130?.content && (<InlineCTA
            title={cta_section_130?.content || ""}
            btn={cta_section_130?.button_text || ""}
            btnUrl={cta_section_130?.button_url || ""}
          />)}
        </div>
      </section>

      {/* FINAL CTA + CONTACT */}
      <section
        ref={setRef("contact")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{__html: addClassToSpan(contactSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
              <div dangerouslySetInnerHTML={{__html: contactSection?.paragraph || ""}} />
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

export default Tableau;
