import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { useInViewMap } from "@/hooks/useInView";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";


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
      <Link to={btnUrl || ""} className="flex-shrink-0 relative z-10">
        <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
          {btn}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Button>
      </Link>
    </div>
  </div>
);

const Azure = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const [envSlide, setEnvSlide] = useState(0);
  const [activeService, setActiveService] = useState("");
  const [serviceSlide, setServiceSlide] = useState(0);
  const [activeTech, setActiveTech] = useState(0);
  const envTouchStart = useRef<number>(0);
  const envTouchEnd = useRef<number>(0);
  const serviceTouchStart = useRef<number>(0);
  const serviceTouchEnd = useRef<number>(0);
  const techTouchStart = useRef<number>(0);
  const techTouchEnd = useRef<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["azure-engineers"],
    queryFn: api.getAzureEngineers,
  });

  const pageData = data?.data;

  // ── DATA FROM JSON ────────────────────────────────────────────────────────
  const heroBanner = pageData?.tools_main_banner;
  const heroContent = pageData?.microsoft_azure_expert_consulting_services || {};
  const outcomesSection = pageData?.business_outcomes_that_drive_long_term_growth || {};
  const environmentSection = pageData?.build_a_secure_and_scalable_azure_cloud_environment || {};
  const servicesSection = pageData?.our_microsoft_azure_consulting_services || {};
  const processSection = pageData?.our_azure_consulting_process || {};
  const technologiesSection = pageData?.azure_technologies_we_support || {};
  const industriesSection = pageData?.industries_we_support || {};
  const contactSection = pageData?.services_get_started_section || {};

  const cta_section_70 = pageData?.cta_section_70;
  const cta_section_77 = pageData?.cta_section_77;
  const cta_section_111 = pageData?.cta_section_111;
  const cta_section_113 = pageData?.cta_section_113;
  const cta_section_114 = pageData?.cta_section_114;
  const cta_section_130 = pageData?.cta_section_130;

  const heroBadges = heroBanner?.badges || [];
  const heroStats = heroBanner?.bottom_section || [];
  const heroImageUrl = heroBanner?.image?.url || "";

  const outcomes = outcomesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const environment = environmentSection?.cards?.map((card: any) => ({
    icon: card.icon,
    image: card.image?.url || "",
    title: card.title,
    desc: card.content,
  })) || [];

  const services = servicesSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    title: tab.title,
    desc: tab.content,
  })) || [];

  const process = processSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const technologies = technologiesSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    image: tab.image?.url || "",
    title: tab.title,
    desc: tab.content,
  })) || [];

  const industries = industriesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  // Initialize active states
  useEffect(() => {
    if (services.length > 0 && !activeService) {
      setActiveService(services[0].title);
    }
  }, [services, activeService]);

  // Preload all technology images once so tab switches feel instant
  useEffect(() => {
    technologies.forEach((t) => {
      if (t.image) {
        const img = new Image();
        img.decoding = "async";
        img.src = t.image;
      }
    });
  }, [technologies]);
  const goTechPrev = () => setActiveTech((prev) => (prev - 1 + technologies.length) % technologies.length);
  const goTechNext = () => setActiveTech((prev) => (prev + 1) % technologies.length);
  const handleTechTouchStart = (e: React.TouchEvent) => { techTouchStart.current = e.touches[0].clientX; };
  const handleTechTouchEnd = (e: React.TouchEvent) => {
    techTouchEnd.current = e.changedTouches[0].clientX;
    const diff = techTouchStart.current - techTouchEnd.current;
    if (Math.abs(diff) > 40) diff > 0 ? goTechNext() : goTechPrev();
  };

  const goEnvPrev = () => setEnvSlide((prev) => (prev - 1 + environment.length) % environment.length);
  const goEnvNext = () => setEnvSlide((prev) => (prev + 1) % environment.length);

  const handleEnvTouchStart = (e: React.TouchEvent) => {
    envTouchStart.current = e.touches[0].clientX;
  };
  const handleEnvTouchEnd = (e: React.TouchEvent) => {
    envTouchEnd.current = e.changedTouches[0].clientX;
    const diff = envTouchStart.current - envTouchEnd.current;
    if (Math.abs(diff) > 40) diff > 0 ? goEnvNext() : goEnvPrev();
  };

  const activeServiceIndex = services.findIndex((s) => s.title === activeService);
  const goServicePrev = () => {
    const newIndex = (activeServiceIndex - 1 + services.length) % services.length;
    setServiceSlide(newIndex);
    setActiveService(services[newIndex].title);
  };
  const goServiceNext = () => {
    const newIndex = (activeServiceIndex + 1) % services.length;
    setServiceSlide(newIndex);
    setActiveService(services[newIndex].title);
  };
  const handleServiceTouchStart = (e: React.TouchEvent) => {
    serviceTouchStart.current = e.touches[0].clientX;
  };
  const handleServiceTouchEnd = (e: React.TouchEvent) => {
    serviceTouchEnd.current = e.changedTouches[0].clientX;
    const diff = serviceTouchStart.current - serviceTouchEnd.current;
    if (Math.abs(diff) > 40) diff > 0 ? goServiceNext() : goServicePrev();
  };

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

            {heroBadges[0] && (
            <div className="hidden lg:flex absolute -left-6 top-12 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_6s_ease-in-out_infinite]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[0]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[0]?.label}</span>
            </div>
            )}
            {heroBadges[1] && (
            <div className="hidden lg:flex absolute -right-6 top-24 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_7s_ease-in-out_infinite_reverse]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[1]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[1]?.label}</span>
            </div>
            )}
            {heroBadges[2] && (
            <div className="hidden lg:flex absolute -left-8 bottom-20 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_8s_ease-in-out_infinite]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[2]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[2]?.label}</span>
            </div>
            )}
            {heroBadges[3] && (
            <div className="hidden lg:flex absolute -right-8 bottom-24 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_6.5s_ease-in-out_infinite_reverse]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[3]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[3]?.label}</span>
            </div>
            )}

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
            <Link to={heroContent?.cta_url || ""}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
              >
                {heroContent?.cta_text || ""}
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

      {/* OUTCOMES */}
      <section
        ref={setRef("outcomes")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.outcomes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(outcomesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {outcomesSection?.paragraph || ""}
            </p>
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

          {cta_section_70?.content && (
          <InlineCTA
            title={cta_section_70?.content || ""}
            btn={cta_section_70?.cta_text || ""}
            btnUrl={cta_section_70?.cta_url || ""}
          />
          )}
        </div>
      </section>

      {/* ENVIRONMENT */}
      <section
        ref={setRef("env")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.env ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(environmentSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {environmentSection?.paragraph || ""}
            </p>
          </div>

          {/* Mobile / Tablet: Swipe tabs */}
          <div className="md:hidden max-w-5xl mx-auto" onTouchStart={handleEnvTouchStart} onTouchEnd={handleEnvTouchEnd}>
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${envSlide * 100}%)` }}>
                {environment.map((w, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-1">
                    <div className="group relative rounded-2xl flex flex-col h-full overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                      <div className="relative w-full h-40 overflow-hidden">
                        <img src={w.image} alt={w.title} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.35) 0%, rgba(11,18,32,0.9) 100%)" }} />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.28), rgba(0,119,182,0.28))", border: "1px solid rgba(95,194,227,0.35)", backdropFilter: "blur(6px)" }}>
                            <DynamicIcon name={w.icon} className="w-5 h-5 text-accent" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                        </div>
                      </div>
                      <div className="p-5 lg:p-6">
                        <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 px-1">
              <button onClick={goEnvPrev} className="w-10 h-10 rounded-full border border-border/50 bg-muted/30 flex items-center justify-center text-muted-foreground hover:border-accent/50 hover:text-accent transition-all duration-200" aria-label="Previous">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {environment.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setEnvSlide(i)}
                    className={`rounded-full transition-all duration-300 ${i === envSlide ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
                    aria-label={`Go to tab ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={goEnvNext} className="w-10 h-10 rounded-full border border-border/50 bg-muted/30 flex items-center justify-center text-muted-foreground hover:border-accent/50 hover:text-accent transition-all duration-200" aria-label="Next">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-3">{envSlide + 1} / {environment.length}</p>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr max-w-5xl mx-auto">
            {environment.map((w, i) => (
              <div key={i} className="group relative rounded-2xl flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="relative w-full h-40 overflow-hidden">
                  <img src={w.image} alt={w.title} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.35) 0%, rgba(11,18,32,0.9) 100%)" }} />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.28), rgba(0,119,182,0.28))", border: "1px solid rgba(95,194,227,0.35)", backdropFilter: "blur(6px)" }}>
                      <DynamicIcon name={w.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                  </div>
                </div>
                <div className="p-5 lg:p-6">
                  <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
                </div>
              </div>
            ))}
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

          {/* Mobile: swipeable tabs with dot indicators */}
          <div className="md:hidden max-w-5xl mx-auto" onTouchStart={handleServiceTouchStart} onTouchEnd={handleServiceTouchEnd}>
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${serviceSlide * 100}%)` }}>
                {services.map((w, i) => (
                    <div key={w.title} className="w-full flex-shrink-0 px-1">
                      <div className="relative p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                            <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 px-1">
              <button onClick={goServicePrev} className="w-10 h-10 rounded-full border border-border/50 bg-muted/30 flex items-center justify-center text-muted-foreground hover:border-accent/50 hover:text-accent transition-all duration-200" aria-label="Previous service">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setServiceSlide(i);
                      setActiveService(services[i].title);
                    }}
                    className={`rounded-full transition-all duration-300 ${i === serviceSlide ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
                    aria-label={`Go to service ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={goServiceNext} className="w-10 h-10 rounded-full border border-border/50 bg-muted/30 flex items-center justify-center text-muted-foreground hover:border-accent/50 hover:text-accent transition-all duration-200" aria-label="Next service">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-3">{serviceSlide + 1} / {services.length}</p>
          </div>

          {/* Desktop: tabbed interface */}
          <div className="hidden md:block">
            <Tabs value={activeService} onValueChange={(val) => { setActiveService(val); const idx = services.findIndex((s) => s.title === val); if (idx >= 0) setServiceSlide(idx); }} className="max-w-5xl mx-auto">
              <TabsList className="w-full h-auto flex flex-wrap justify-center gap-2 bg-transparent p-0 mb-8">
                {services.map((w) => {
                  const isActive = activeService === w.title;
                  return (
                    <TabsTrigger
                      key={w.title}
                      value={w.title}
                      className={`relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 data-[state=active]:shadow-none data-[state=active]:bg-transparent ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      style={{
                        background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))" : "rgba(255,255,255,0.025)",
                        border: isActive ? "1px solid rgba(95,194,227,0.45)" : "1px solid rgba(148,163,184,0.12)",
                      }}
                    >
                      <DynamicIcon name={w.icon} className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                      <span className="text-left leading-snug">{w.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {services.map((w) => (
                  <TabsContent key={w.title} value={w.title} className="mt-0">
                    <div className="relative p-6 lg:p-8 rounded-2xl animate-tab-slide" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                      <div className="flex items-start gap-5 mb-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                          <DynamicIcon name={w.icon} className="w-7 h-7 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-semibold text-foreground text-left leading-snug mb-1">{w.title}</h3>
                          <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
            </Tabs>
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

          {cta_section_113?.content && (
          <InlineCTA
            title={cta_section_113?.content || ""}
            btn={cta_section_113?.button_text || ""}
            btnUrl={cta_section_113?.button_url || ""}
          />
          )}
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section
        ref={setRef("tech")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.tech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(technologiesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {technologiesSection?.paragraph || ""}
            </p>
          </div>

          {/* Desktop: tabs with image */}
          <div className="hidden md:grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Tab list */}
            <div className="col-span-5 lg:col-span-4 flex flex-col gap-2">
              {technologies.map((w, i) => {
                const isActive = i === activeTech;
                return (
                  <button
                    key={w.title}
                    onClick={() => setActiveTech(i)}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    style={{
                      background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))" : "rgba(255,255,255,0.025)",
                      border: isActive ? "1px solid rgba(95,194,227,0.45)" : "1px solid rgba(148,163,184,0.12)",
                    }}
                  >
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <DynamicIcon name={w.icon} className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                    </span>
                    <span className="text-sm font-medium leading-snug">{w.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active tab content */}
            <div className="col-span-7 lg:col-span-8">
              <div key={activeTech} className="relative rounded-2xl overflow-hidden h-full animate-tab-slide flex flex-col" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={technologies[activeTech].image}
                    alt={technologies[activeTech].title}
                    loading="eager"
                    decoding="async"
                    width={1024}
                    height={576}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,20,40,0) 40%, rgba(10,20,40,0.85) 100%)" }} />
                </div>
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground text-left leading-snug mb-3">{technologies[activeTech].title}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-[1.7] text-left">{technologies[activeTech].desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: swipeable carousel with dots */}
          <div className="md:hidden">
            <div
              className="relative rounded-2xl overflow-hidden animate-tab-slide"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}
              onTouchStart={handleTechTouchStart}
              onTouchEnd={handleTechTouchEnd}
              key={activeTech}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={technologies[activeTech].image}
                  alt={technologies[activeTech].title}
                  loading="eager"
                  decoding="async"
                  width={1024}
                  height={576}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,20,40,0) 40%, rgba(10,20,40,0.9) 100%)" }} />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground text-left leading-snug mb-2">{technologies[activeTech].title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-[1.65] text-left">{technologies[activeTech].desc}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={goTechPrev}
                aria-label="Previous technology"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(148,163,184,0.2)" }}
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex items-center gap-2">
                {technologies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTech(i)}
                    aria-label={`Go to technology ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeTech ? 24 : 8,
                      height: 8,
                      background: i === activeTech ? "linear-gradient(90deg, #5FC2E3, #0077B6)" : "rgba(148,163,184,0.3)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={goTechNext}
                aria-label="Next technology"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(148,163,184,0.2)" }}
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">{activeTech + 1} / {technologies.length}</p>
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-4" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                  <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-foreground text-left leading-snug mb-2">{w.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
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
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
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

export default Azure;
