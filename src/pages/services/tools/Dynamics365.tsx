import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "@/lib/lenis";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { useInViewMap } from "@/hooks/useInView";
import SeoTags from "@/components/SeoTags";
import ContactUsForm from "@/components/ContactUsForm";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";


// Helper function to generate random vibrant colors
const getRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8B500', '#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const InlineCTA = ({ title, btn, btnUrl, className = "mt-12 lg:mt-14" }: { title: string; btn: string; btnUrl: string; className?: string }) => (
  <div className={className}>
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


const Dynamics365 = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const [activeService, setActiveService] = useState(0);
  const techPinRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);

const { data, isLoading, error } = useQuery({
    queryKey: ["d365-engineers"],
    queryFn: api.getD365Engineers,
  });

  // Preload service images for instant tab switching
  // Note: This hook is placed before early returns to maintain hook order consistency
  // It will only execute when services array is populated after data loads
  const pageData = data?.data;
  const servicesSection = pageData?.our_microsoft_dynamics_365_consulting_services || {};
  const services = servicesSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    title: tab.title,
    desc: tab.content,
    image: tab.image?.url || "",
  })) || [];

  useEffect(() => {
    services.forEach((s) => {
      if (s.image) {
        const img = new Image();
        img.src = s.image;
      }
    });
  }, [services]);

  // Horizontal scroll for the Microsoft integrations cards on desktop
  useEffect(() => {
    const section = techPinRef.current;
    const track = cardsTrackRef.current;
    if (!section || !track) return;

    let cleanup: (() => void) | undefined;

    const setup = () => {
      cleanup?.();
      cleanup = undefined;
      if (window.innerWidth < 1024) return;

      const parent = track.parentElement;
      const lastCard = track.lastElementChild as HTMLElement | null;
      if (!parent || !lastCard) return;
      // Align the last card's right edge with the container's right edge (no trailing gap)
      const distance = Math.max(
        0,
        Math.ceil(lastCard.getBoundingClientRect().right - parent.getBoundingClientRect().right)
      );
      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cleanup = () => {
        tween.kill();
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === section)
          .forEach((st) => st.kill());
        gsap.set(track, { clearProps: "transform" });
      };
    };

    // Delay setup to ensure DOM is rendered with data
    const timeoutId = setTimeout(setup, 100);
    window.addEventListener("resize", setup);

    return () => {
      clearTimeout(timeoutId);
      cleanup?.();
      window.removeEventListener("resize", setup);
    };
  }, [pageData]);

   if (isLoading) return null;
  if (error) return null;

  // ── DATA ─────────────────────────────────────────────────────────────────
  const heroBanner = pageData?.tools_main_banner;
  const heroContent = pageData?.advanced_business_operations_with_microsoft_dynamics_365_consulting_services || {};
  const introSection = pageData?.build_a_connected_business_with_microsoft_dynamics_365 || {};
  const whyChooseSection = pageData?.why_choose_microsoft_dynamics_365_for_your_business || {};
  const processSection = pageData?.our_dynamics_365_consulting_process || {};
  const technologiesSection = pageData?.microsoft_technologies_we_integrate_with_new || {};
  const industriesSection = pageData?.industries_we_empower || {};
  const partnerSection = pageData?.why_choose_code1_tech_systems_for_dynamics_365_consulting || {};
  const contactSection = pageData?.services_get_started_section || {};
  // servicesSection and services are already declared above before early returns
  
  const cta_section_70 = pageData?.cta_section_70;
  const cta_section_77 = pageData?.cta_section_77;
  const cta_section_111 = pageData?.cta_section_111;
  const cta_section_113 = pageData?.cta_section_113;
  const cta_section_114 = pageData?.cta_section_114;
  const cta_section_130 = pageData?.cta_section_130;

  const heroBadges = heroBanner?.badges || [];
  const heroStats = heroBanner?.bottom_section || [];
  const heroImageUrl = heroBanner?.image?.url || "";

  const introPillars = introSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
    label: card.label,
  })) || [];

  const whyChoose = whyChooseSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const process = processSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
    image: card.image?.url || "",
  })) || [];

  const technologies = technologiesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    tag: card.tag,
    color: card.color || getRandomColor(),
    desc: card.content,
    image: card.image?.url || "",
  })) || [];

  const industries = industriesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const partner = partnerSection?.cards?.map((card: any) => ({
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
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-[1.75] max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: heroContent?.paragraph || "" }} />
          </div>


          {/* CTA row */}
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
        <div className="absolute inset-0 pointer-events-none opacity-[0.18]" aria-hidden="true">
          <div className="absolute top-[10%] right-[-6%] w-[520px] h-[520px] rounded-full blur-[130px]" style={{ background: "#004E9E" }} />
          <div className="absolute bottom-[-10%] right-[18%] w-[320px] h-[320px] rounded-full blur-[110px]" style={{ background: "#5FC2E3" }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.1] text-center mb-6" dangerouslySetInnerHTML={{ __html: addClassToSpan(introSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-[15px] lg:text-base text-muted-foreground leading-[1.85] text-center max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: introSection?.paragraph || "" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((colIdx) => (
              <div
                key={colIdx}
                className={`flex flex-col gap-6 ${colIdx % 2 === 1 ? "lg:mt-12" : ""}`}
              >
                {introPillars.slice(colIdx * 2, colIdx * 2 + 2).map((w, i) => {
                  const globalIdx = colIdx * 2 + i;
                  const isLast = globalIdx === introPillars.length - 1;
                  const borderColor = globalIdx % 2 === 0 ? "#5FC2E3" : "#0077B6";
                  return (
                    <div
                      key={globalIdx}
                      className="group relative p-7 lg:p-8 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: isLast
                          ? "linear-gradient(135deg, rgba(0,119,182,0.22), rgba(255,255,255,0.02))"
                          : "rgba(255,255,255,0.04)",
                        borderLeft: `2px solid ${borderColor}`,
                        borderTop: isLast ? "1px solid rgba(255,255,255,0.06)" : undefined,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isLast
                          ? "linear-gradient(135deg, rgba(0,119,182,0.32), rgba(255,255,255,0.04))"
                          : "rgba(255,255,255,0.08)";
                        e.currentTarget.style.boxShadow = "0 18px 48px -18px rgba(0,119,182,0.55)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isLast
                          ? "linear-gradient(135deg, rgba(0,119,182,0.22), rgba(255,255,255,0.02))"
                          : "rgba(255,255,255,0.04)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                        <DynamicIcon name={w.icon} className="w-11 h-11" />
                      </div>
                      {w.label && (
                        <div className="text-[#5FC2E3] font-bold text-[10px] tracking-[0.22em] uppercase mb-4 relative z-10">
                          {w.label}
                        </div>
                      )}
                      <h3 className="text-lg lg:text-xl font-semibold text-foreground leading-snug mb-3 text-left relative z-10 pr-10">
                        {w.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-[1.7] text-left relative z-10">
                        {w.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>


          {cta_section_70?.content && (
            <InlineCTA
              title={cta_section_70?.content || ""}
              btn={cta_section_70?.cta_text || ""}
              btnUrl={cta_section_70?.cta_url || ""}
            />
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section
        ref={setRef("services")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(servicesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {servicesSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
            {/* Tab list — desktop vertical, mobile horizontal scroll */}
            <div className="lg:sticky lg:top-24">
              {/* Mobile: horizontal scroll pills */}
              <div className="lg:hidden -mx-4 px-4 overflow-x-auto hide-scrollbar">
                <div className="flex gap-2 pb-3 w-max">
                  {services.map((s, i) => {
                    const isActive = i === activeService;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveService(i)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 border ${isActive ? "text-white" : "text-muted-foreground border-[rgba(148,163,184,0.15)] bg-[rgba(255,255,255,0.025)]"}`}
                        style={isActive ? { background: "linear-gradient(135deg, #5FC2E3, #0077B6)", borderColor: "transparent", boxShadow: "0 8px 24px -10px rgba(0,119,182,0.7)" } : undefined}
                      >
                        <DynamicIcon name={s.icon} className="w-4 h-4" />
                        {s.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop: vertical tab list */}
              <div className="hidden lg:flex flex-col gap-2">
                {services.map((s, i) => {
                  const isActive = i === activeService;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveService(i)}
                      className="group relative flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-300"
                      style={{
                        background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.14), rgba(0,119,182,0.14))" : "rgba(255,255,255,0.025)",
                        border: `1px solid ${isActive ? "rgba(95,194,227,0.5)" : "rgba(148,163,184,0.12)"}`,
                        boxShadow: isActive ? "0 12px 32px -14px rgba(0,119,182,0.55)" : "none",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300"
                        style={{
                          background: isActive ? "linear-gradient(135deg, #5FC2E3, #0077B6)" : "rgba(255,255,255,0.04)",
                          border: isActive ? "none" : "1px solid rgba(148,163,184,0.15)",
                        }}
                      >
                        <DynamicIcon name={s.icon} className={`w-5 h-5 ${isActive ? "text-white" : "text-[#5FC2E3]"}`} />
                      </div>
                      <span className={`text-sm font-semibold leading-snug ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                        {s.title}
                      </span>
                      {isActive && (
                        <span className="absolute right-3 text-[#5FC2E3]">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content panel */}
            <div
              key={activeService}
              className="relative rounded-2xl overflow-hidden animate-panel-in"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.15)" }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {services.map((s, i) => (
                  <img
                    key={i}
                    src={s.image}
                    alt={s.title}
                    width={1024}
                    height={640}
                    loading="eager"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === activeService ? "opacity-100 animate-image-zoom" : "opacity-0"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,5%)] via-[hsl(222,47%,5%)]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #5FC2E3, #0077B6)", boxShadow: "0 8px 24px -10px rgba(0,119,182,0.8)" }}
                  >
                    <DynamicIcon name={services[activeService].icon} className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">
                    {services[activeService].title}
                  </h3>
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-[15px] lg:text-base text-muted-foreground leading-[1.85] text-left animate-content-rise">
                  {services[activeService].desc}
                </p>
              </div>
            </div>
          </div>


          {cta_section_77?.cta_content && (
            <InlineCTA
              title={cta_section_77?.cta_content || ""}
              btn={cta_section_77?.button_text || ""}
              btnUrl={cta_section_77?.button_url || ""}
            />
          )}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section
        ref={setRef("why")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyChooseSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {whyChooseSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
              {whyChoose.map((w, i) => (
                <div key={i} className="group relative p-5 lg:p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                  <div className="flex items-center gap-3 mb-3 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                  </div>
                  <p className="text-[13.5px] text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
                </div>
              ))}
          </div>

          {cta_section_111?.content && (
            <InlineCTA
              title={cta_section_111?.content || ""}
              btn={cta_section_111?.button_text || ""}
              btnUrl={cta_section_111?.button_url || ""}
            />
          )}
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
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {processSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 auto-rows-fr">
            {process.map((w, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.14)", boxShadow: "0 20px 40px -30px rgba(0,119,182,0.4)" }}
              >
                {/* Image */}
                {w.image && (
                  <div className="relative h-44 lg:h-48 overflow-hidden">
                    <img
                      src={w.image}
                      alt={w.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.55) 55%, rgba(10,22,40,0.85) 100%)" }} />


                    {/* Icon ring badge (top-left, contained) */}
                    <div
                      className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: "conic-gradient(from 140deg, #5FC2E3, #0077B6, #5FC2E3)",
                        padding: "2px",
                      }}
                    >
                      <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: "rgba(10,22,40,0.92)" }}>
                        <DynamicIcon name={w.icon} className="w-5 h-5 text-[#5FC2E3]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 lg:p-6 flex flex-col flex-1">
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground text-left leading-snug mb-2 transition-colors duration-300 group-hover:text-[#5FC2E3]">{w.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
                  <div className="mt-4 h-px w-10 group-hover:w-full transition-all duration-500" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6, transparent)" }} />
                </div>

                {/* subtle glow on hover */}
                <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(600px circle at 50% -10%, rgba(95,194,227,0.12), transparent 50%)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section
        ref={(el) => {
          setRef("tech")(el);
        }}
        className={`relative transition-opacity duration-700 ${visible.tech ? "opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div
          ref={techPinRef}
          className="container mx-auto px-4 lg:px-8 relative z-10 py-10 lg:py-12"
        >
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(technologiesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {technologiesSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* HUB visual */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative aspect-square max-w-[260px] sm:max-w-xs md:max-w-full lg:max-w-sm mx-auto rounded-3xl overflow-hidden" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,119,182,0.18), rgba(15,23,42,0) 65%)", border: "1px solid rgba(148,163,184,0.12)" }}>
                {/* Orbit rings */}
                <div className="absolute inset-6 rounded-full border border-dashed" style={{ borderColor: "rgba(95,194,227,0.18)" }} />
                <div className="absolute inset-14 rounded-full border" style={{ borderColor: "rgba(95,194,227,0.12)" }} />
                <div className="absolute inset-24 rounded-full border" style={{ borderColor: "rgba(95,194,227,0.08)" }} />
                {/* Orbiting dots */}
                {technologies.length > 0 && technologies.map((t, i) => {
                  const angle = (i / technologies.length) * Math.PI * 2 - Math.PI / 2;
                  const r = 42; // percent radius
                  const x = 50 + Math.cos(angle) * r;
                  const y = 50 + Math.sin(angle) * r;
                  return (
                    <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-500 hover:scale-125" style={{left: `${x}%`, top: `${y}%`, background: `${t.color}22`, border: `1px solid ${t.color}66`, boxShadow: `0 4px 14px -4px ${t.color}55` }}>
                      <DynamicIcon name={t.icon} className={`w-4 h-4 text-[${t.color}]`} />
                    </div>
                  );
                })}
                {/* Center hub */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-center px-2" style={{ background: "linear-gradient(135deg, #0077B6, #5FC2E3)", boxShadow: "0 20px 50px -12px rgba(0,119,182,0.65)" }}>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">{technologiesSection?.left_top_label}</span>
                  <span className="text-sm font-bold text-white leading-tight mt-0.5">{technologiesSection?.left_title}</span>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-5 max-w-xs mx-auto">{technologiesSection?.left_content}</p>
            </div>

            {/* Integration cards */}
            <div className="md:col-span-7 lg:col-span-8 lg:overflow-hidden">
              <div ref={cardsTrackRef} className="integration-cards-track grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-4 lg:gap-5">
                {technologies.map((w, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden lg:flex-shrink-0 lg:w-[340px]"
                  style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(148,163,184,0.12)" }}
                >
                  {/* Image */}
                  {w.image && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={w.image}
                        alt={w.title}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,22,40,0.25) 0%, rgba(10,22,40,0.55) 60%, rgba(10,22,40,0.92) 100%)` }} />
                      {/* Icon badge */}
                      <div
                        className="absolute top-3 left-3 w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${w.color}22`, border: `1px solid ${w.color}66`, boxShadow: `0 6px 18px -6px ${w.color}80` }}
                      >
                        <DynamicIcon name={w.icon} className={`w-5 h-5 text-[${w.color}]`} />
                      </div>
                      {/* Tag pill */}
                      {w.tag && (
                        <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded backdrop-blur-md" style={{ color: w.color, background: `${w.color}20`, border: `1px solid ${w.color}55` }}>{w.tag}</span>
                      )}
                      {/* left brand rail */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 group-hover:w-1.5" style={{ background: `linear-gradient(180deg, ${w.color}, ${w.color}00)` }} />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col items-center text-center">
                    <h3 className="text-base font-semibold text-foreground leading-snug mb-2 transition-colors duration-300 group-hover:text-[#5FC2E3]">{w.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-[1.6]">{w.desc}</p>
                    <div className="mt-3 h-px w-10 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${w.color}, ${w.color}00)` }} />
                  </div>

                  {/* hover glow */}
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 0% 0%, ${w.color}22, transparent 60%)` }} />
                </div>
              ))}
              </div>
            </div>
          </div>

          {cta_section_113?.content && (
            <InlineCTA
              title={cta_section_113?.content || ""}
              btn={cta_section_113?.button_text || ""}
              btnUrl={cta_section_113?.button_url || ""}
              className="mt-6 lg:mt-8"
            />
          )}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {industriesSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
              {industries.map((w, i) => (
                <div key={i} className="group relative p-5 lg:p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                  <div className="flex items-center gap-3 mb-3 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                  </div>
                  <p className="text-[13.5px] text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
                </div>
              ))}
          </div>

          {cta_section_114?.content && (
            <InlineCTA
              title={cta_section_114?.content || ""}
              btn={cta_section_114?.button_text || ""}
              btnUrl={cta_section_114?.button_url || ""}
            />
          )}
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

          {cta_section_130?.content && (
            <InlineCTA
              title={cta_section_130?.content || ""}
              btn={cta_section_130?.button_text || ""}
              btnUrl={cta_section_130?.button_url || ""}
            />
          )}
        </div>
      </section>

      {/* FINAL CTA + CONTACT */}
      <section
        ref={setRef("contact")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base sm:text-lg leading-[1.75] text-left">
                {contactSection?.paragraph || ""}
              </p>
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

export default Dynamics365;
