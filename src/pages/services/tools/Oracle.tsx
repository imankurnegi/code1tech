import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";
import { useInViewMap } from "@/hooks/useInView";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";

const InlineCTA = ({ title, btn, btnUrl }: { title: string; btn: string; btnUrl?: string }) => (
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

// Shared fade + slide transition for all Oracle tab / carousel changes
const TAB_TRANSITION = "animate-tab-slide motion-reduce:animate-none";

const Oracle = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const { data, isLoading, error } = useQuery({
      queryKey: ["oracle-engineers"],
      queryFn: api.getOracleEngineers,
    });

  const pageData = data?.data;

  const ORACLE_TAB_KEY = "oracle:activeSvc";
  const [activeSvc, setActiveSvc] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    try {
      const stored = window.sessionStorage.getItem(ORACLE_TAB_KEY);
      if (stored === null) return 0;
      const n = parseInt(stored, 10);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    } catch {
      return 0;
    }
  });
  useEffect(() => {
    try {
      window.sessionStorage.setItem(ORACLE_TAB_KEY, String(activeSvc));
    } catch {
      /* ignore */
    }
  }, [activeSvc]);

  const [svcDrag, setSvcDrag] = useState(0);
  const svcTouchStart = useRef<number>(0);
  const svcTouchStartY = useRef<number>(0);
  const svcDragging = useRef<boolean>(false);
  const goSvcPrev = () => setActiveSvc((p) => (p - 1 + services.length) % services.length);
  const goSvcNext = () => setActiveSvc((p) => (p + 1) % services.length);
  const handleSvcTouchStart = (e: React.TouchEvent) => {
    svcTouchStart.current = e.touches[0].clientX;
    svcTouchStartY.current = e.touches[0].clientY;
    svcDragging.current = true;
    setSvcDrag(0);
  };
  const handleSvcTouchMove = (e: React.TouchEvent) => {
    if (!svcDragging.current) return;
    const dx = e.touches[0].clientX - svcTouchStart.current;
    const dy = e.touches[0].clientY - svcTouchStartY.current;
    // Only track horizontal drag; ignore if user is scrolling vertically
    if (Math.abs(dy) > Math.abs(dx)) return;
    setSvcDrag(Math.max(-140, Math.min(140, dx)));
  };
  const handleSvcTouchEnd = () => {
    svcDragging.current = false;
    const dx = svcDrag;
    setSvcDrag(0);
    if (Math.abs(dx) > 50) {
      dx < 0 ? goSvcNext() : goSvcPrev();
    }
  };

// ─── DATA MAPPING ────────────────────────────────────────────────────────────────
const {
  heroBanner,
  heroContent,
  introSection,
  whyOracleSection,
  servicesSection,
  processSection,
  outcomesSection,
  technologiesSection,
  partnerSection,
  contactSection,
  cta_section_70,
  cta_section_77,
  cta_section_111,
  cta_section_113,
  cta_section_114,
  heroBadges,
  heroStats,
  heroImageUrl,
  whyOracle,
  services,
  process,
  outcomes,
  technologies,
  partner,
} = useMemo(() => {
  const heroBanner = pageData?.tools_main_banner;
  const heroContent = pageData?.modernize_your_enterprise_with_expert_oracle_consulting_services || {};
  const introSection = pageData?.build_a_smarter_more_connected_oracle_environment || {};
  const whyOracleSection = pageData?.why_choose_oracle_for_enterprise_business_solutions || {};
  const servicesSection = pageData?.oracle_consulting_services_designed_around_your_business || {};
  const processSection = pageData?.follow_a_proven_oracle_consulting_process || {};
  const outcomesSection = pageData?.achieve_measurable_business_outcomes_with_oracle || {};
  const technologiesSection = pageData?.oracle_technologies_we_support || {};
  const partnerSection = pageData?.choose_an_oracle_consulting_partner_focused_on_your_success || {};
  const contactSection = pageData?.services_get_started_section || {};

  const cta_section_70 = pageData?.cta_section_70;
  const cta_section_77 = pageData?.cta_section_77;
  const cta_section_111 = pageData?.cta_section_111;
  const cta_section_113 = pageData?.cta_section_113;
  const cta_section_114 = pageData?.cta_section_114;

  const heroBadges = heroBanner?.badges || [];
  const heroStats = heroBanner?.bottom_section || [];
  const heroImageUrl = heroBanner?.image?.url || "";

  const whyOracle = whyOracleSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const services = servicesSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    image: tab.image?.url || "",
    title: tab.title,
    desc: tab.content,
  })) || [];

  const process = processSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const outcomes = outcomesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const technologies = technologiesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const partner = partnerSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  return {
    heroBanner,
    heroContent,
    introSection,
    whyOracleSection,
    servicesSection,
    processSection,
    outcomesSection,
    technologiesSection,
    partnerSection,
    contactSection,
    cta_section_70,
    cta_section_77,
    cta_section_111,
    cta_section_113,
    cta_section_114,
    heroBadges,
    heroStats,
    heroImageUrl,
    whyOracle,
    services,
    process,
    outcomes,
    technologies,
    partner,
  };
}, [pageData]);

  // Preload all service images so tab switches are instant from cache
  useEffect(() => {
    const preloaded: HTMLImageElement[] = [];
    services.forEach((svc) => {
      const img = new Image();
      img.decoding = "async";
      img.src = svc.image;
      preloaded.push(img);
    });
    return () => {
      preloaded.forEach((img) => {
        img.src = "";
      });
    };
  }, [services]);

  if (isLoading) return null;
  if (error) return null;

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
            <Link to={heroContent?.button_url || ""}>
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

      {/* INTRO */}
      <section
        ref={setRef("intro")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.intro ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-8 lg:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(introSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-4xl mx-auto lg:mx-0 space-y-5 text-center lg:text-left" dangerouslySetInnerHTML={{ __html: introSection?.paragraph || "" }} />

            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
              <img
                src={introSection?.image?.url || ""}
                alt={introSection?.image?.alt || "Oracle enterprise cloud infrastructure"}
                className="w-full h-full object-cover"
                loading="lazy"
                width={1280}
                height={720}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#132A4A]/85 via-[#004E9E]/25 to-transparent" />
            </div>
          </div>

          <InlineCTA
            title={cta_section_70?.content || ""}
            btn={cta_section_70?.cta_text || ""}
            btnUrl={cta_section_70?.cta_url || ""}
          />
        </div>
      </section>

      {/* WHY CHOOSE ORACLE */}
      <section
        ref={setRef("why")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyOracleSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: whyOracleSection?.paragraph || "" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {whyOracle.map((w, i) => (
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

          <InlineCTA
            title={cta_section_77?.cta_content || ""}
            btn={cta_section_77?.button_text || ""}
            btnUrl={cta_section_77?.button_url || ""}
          />
        </div>
      </section>

      {/* SERVICES */}
      <section
        ref={setRef("services")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(servicesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {servicesSection?.paragraph || ""}
            </p>
          </div>

          {/* Desktop: vertical tabs + image content */}
          <div className="hidden md:grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Oracle consulting services"
              className="col-span-5 lg:col-span-4 flex flex-col gap-2 max-h-[560px] overflow-y-auto pr-1"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  const next = (activeSvc + 1) % services.length;
                  setActiveSvc(next);
                  document.getElementById(`oracle-svc-tab-${next}`)?.focus();
                } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const prev = (activeSvc - 1 + services.length) % services.length;
                  setActiveSvc(prev);
                  document.getElementById(`oracle-svc-tab-${prev}`)?.focus();
                } else if (e.key === "Home") {
                  e.preventDefault();
                  setActiveSvc(0);
                  document.getElementById(`oracle-svc-tab-0`)?.focus();
                } else if (e.key === "End") {
                  e.preventDefault();
                  const last = services.length - 1;
                  setActiveSvc(last);
                  document.getElementById(`oracle-svc-tab-${last}`)?.focus();
                }
              }}
            >
              {services.map((w, i) => {
                const isActive = i === activeSvc;
                return (
                  <button
                    key={w.title}
                    id={`oracle-svc-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`oracle-svc-panel-${i}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveSvc(i)}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(222_47%_5%)] ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    style={{
                      background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))" : "rgba(255,255,255,0.025)",
                      border: isActive ? "1px solid rgba(95,194,227,0.45)" : "1px solid rgba(148,163,184,0.12)",
                    }}
                  >
                    <span aria-hidden="true" className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <DynamicIcon name={w.icon} className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                    </span>
                    <span className="text-sm font-medium leading-snug">{w.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="col-span-7 lg:col-span-8">
              <div
                key={activeSvc}
                id={`oracle-svc-panel-${activeSvc}`}
                role="tabpanel"
                aria-labelledby={`oracle-svc-tab-${activeSvc}`}
                tabIndex={0}
                className={`relative rounded-2xl overflow-hidden h-full ${TAB_TRANSITION} flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]`}
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={services[activeSvc].image}
                    alt={services[activeSvc].title}
                    loading="eager"
                    decoding="async"
                    width={1024}
                    height={576}
                    className="w-full h-full object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,20,40,0) 40%, rgba(10,20,40,0.85) 100%)" }} />
                </div>
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground text-left leading-snug mb-3">{services[activeSvc].title}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-[1.7] text-left">{services[activeSvc].desc}</p>
                </div>
              </div>
            </div>
          </div>


          {/* Mobile: swipeable carousel with dots */}
          <div className="md:hidden" aria-roledescription="carousel" aria-label="Oracle consulting services">
            <div
              className="relative rounded-2xl overflow-hidden select-none touch-pan-y"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(148,163,184,0.12)",
                transform: `translate3d(${svcDrag}px, 0, 0)`,
                transition: svcDragging.current ? "none" : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform",
              }}
              onTouchStart={handleSvcTouchStart}
              onTouchMove={handleSvcTouchMove}
              onTouchEnd={handleSvcTouchEnd}
              onTouchCancel={handleSvcTouchEnd}
              role="group"
              aria-roledescription="slide"
              aria-label={`${activeSvc + 1} of ${services.length}: ${services[activeSvc].title}`}
            >
              <div key={activeSvc} className={TAB_TRANSITION}>
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={services[activeSvc].image}
                    alt={services[activeSvc].title}
                    loading="eager"
                    decoding="async"
                    width={1024}
                    height={576}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,20,40,0) 40%, rgba(10,20,40,0.9) 100%)" }} />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug mb-2">{services[activeSvc].title}</h3>
                  <p className="text-[13.5px] text-muted-foreground leading-[1.65] text-left">{services[activeSvc].desc}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 gap-3">
              <button
                type="button"
                onClick={goSvcPrev}
                aria-label="Previous service"
                className="flex items-center gap-1.5 min-h-11 px-3 rounded-full text-sm font-medium text-foreground transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(148,163,184,0.22)" }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Select service">
                {services.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveSvc(i)}
                    role="tab"
                    aria-selected={i === activeSvc}
                    aria-label={`Go to slide ${i + 1}: ${s.title}`}
                    className="relative inline-flex items-center justify-center min-h-11 min-w-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3] rounded-full"
                  >
                    <span
                      aria-hidden="true"
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeSvc ? 24 : 8,
                        height: 8,
                        background: i === activeSvc ? "linear-gradient(90deg, #5FC2E3, #0077B6)" : "rgba(148,163,184,0.35)",
                      }}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goSvcNext}
                aria-label="Next service"
                className="flex items-center gap-1.5 min-h-11 px-3 rounded-full text-sm font-medium text-foreground transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(148,163,184,0.22)" }}
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3" aria-live="polite">
              {activeSvc + 1} / {services.length}
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        ref={setRef("process")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(processSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: processSection?.paragraph || "" }} />
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
        </div>
      </section>

      {/* OUTCOMES */}
      <section
        ref={setRef("outcomes")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.outcomes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(outcomesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: outcomesSection?.paragraph || "" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {outcomes.map((w, i) => (
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

          <InlineCTA
            title={cta_section_111?.content || ""}
            btn={cta_section_111?.button_text || ""}
            btnUrl={cta_section_111?.button_url || ""}
          />
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section
        ref={setRef("tech")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.tech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(technologiesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: technologiesSection?.paragraph || "" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
            {technologies.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-4" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                  <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-foreground text-left leading-snug mb-2">{w.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>

          <InlineCTA
            title={cta_section_113?.content || ""}
            btn={cta_section_113?.button_text || ""}
            btnUrl={cta_section_113?.button_url || ""}
          />
        </div>
      </section>

      {/* PARTNER */}
      <section
        ref={setRef("partner")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.partner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(partnerSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: partnerSection?.paragraph || "" }} />
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

          <InlineCTA
            title={cta_section_114?.content || ""}
            btn={cta_section_114?.button_text || ""}
            btnUrl={cta_section_114?.button_url || ""}
          />
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-muted-foreground text-base sm:text-lg leading-[1.75] mb-4 text-left" dangerouslySetInnerHTML={{ __html: contactSection?.paragraph || "" }} />
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

export default Oracle;
