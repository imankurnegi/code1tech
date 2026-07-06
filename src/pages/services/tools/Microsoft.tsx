import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useInViewMap } from "@/hooks/useInView";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ContactUsForm from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";
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


const Microsoft = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const [activeCat, setActiveCat] = useState<string>("");

  const { data, isLoading, error } = useQuery({
      queryKey: ["microsoft-engineers"],
      queryFn: api.getMicrosoftEngineers,
    });

  const pageData = data?.data;

  
// ── DATA ─────────────────────────────────────────────────────────────────

const heroBanner = pageData?.tools_main_banner;
const heroContent = pageData?.transform_your_business_with_expert_microsoft_consulting_services || {};
const consultingSection = pageData?.microsoft_consulting_services_tailored_to_your_business || {};
const whyMicrosoftSection = pageData?.why_choose_microsoft_for_enterprise_technology || {};
const processSection = pageData?.our_microsoft_consulting_process || {};
const outcomesSection = pageData?.drive_measurable_business_outcomes_with_microsoft_solutions || {};
const technologiesSection = pageData?.microsoft_technologies_we_support || {};
const industriesSection = pageData?.industries_we_serve || {};
const partnerSection = pageData?.why_choose_code1_tech_systems_for_microsoft_consulting || {};
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


const serviceCategories: { id: string; label: string; sub: string; icon: string }[] = consultingSection?.tabs?.map((tab: any) => ({
  id: tab.tab_title.toLowerCase().replace(/\s+/g, "-") as string,
  label: tab.tab_title,
  sub: tab.tab_sub_text,
  icon: tab.icon,
})) || [];


useEffect(() => {
  if (serviceCategories.length && !activeCat) {
    setActiveCat(serviceCategories[0].id);
  }
}, [serviceCategories]);

const services = consultingSection?.tabs?.map((tab: any) => ({
  category: tab.tab_title.toLowerCase().replace(/\s+/g, "-"),
  content: tab.content || "",
})) || [];


const whyMicrosoft = whyMicrosoftSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
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

const industries = industriesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  label: card.title,
})) || [];

 const filteredServices = services.find((s) => s.category === activeCat);

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
        {/* Ambient glow accents */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.18]" aria-hidden="true">
          <div className="absolute top-[10%] right-[-6%] w-[520px] h-[520px] rounded-full blur-[130px]" style={{ background: "#004E9E" }} />
          <div className="absolute bottom-[-10%] right-[18%] w-[320px] h-[320px] rounded-full blur-[110px]" style={{ background: "#5FC2E3" }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-20 items-start">
            {/* Left 60% — headline + intro */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#5FC2E3]" />
                <span className="text-[#5FC2E3] font-medium tracking-[0.22em] uppercase text-[11px]">
                  {consultingSection?.top_label || ""}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.1] text-left" dangerouslySetInnerHTML={{__html: addClassToSpan(consultingSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />

              <p className="max-w-2xl text-[15px] lg:text-base text-muted-foreground leading-[1.85] text-left">
                {consultingSection?.paragraph || ""}
              </p>
            </div>

            {/* Right 40% — glass quote + strategy watermark */}
            <div className="lg:col-span-4 lg:mt-16 relative">
              <div
                className="relative p-7 lg:p-8 rounded-tr-3xl shadow-2xl backdrop-blur-xl"
                style={{
                  background: "rgba(19,42,74,0.45)",
                  borderTop: "1px solid rgba(95,194,227,0.22)",
                  borderLeft: "1px solid rgba(95,194,227,0.22)",
                }}
              >
                <div
                  className="absolute -top-6 -left-6 w-12 h-12 flex items-center justify-center rounded-sm shadow-lg"
                  style={{ background: "#004E9E" }}
                  aria-hidden="true"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <p className="text-[#5FC2E3] italic text-[15px] lg:text-base leading-[1.75] text-left">
                  {consultingSection?.box_content || ""}
                </p>

                <div className="flex items-center gap-4 mt-7">
                  <div className="h-px flex-grow" style={{ background: "rgba(95,194,227,0.25)" }} />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{consultingSection?.box_bottom_text || ""}</span>
                </div>
              </div>

              {/* Editorial watermark */}
              <div className="mt-10 select-none pointer-events-none" aria-hidden="true">
                <div className="text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: "rgba(19,42,74,0.9)" }}>STRATEGY</div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight ml-8" style={{ color: "rgba(19,42,74,0.9)" }}>EXECUTION</div>
              </div>
            </div>
          </div>
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
          {/* Category tabs */}
          <div
            role="tablist"
            aria-label="Microsoft service categories"
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 lg:mb-10"
          >
            {serviceCategories.map((cat) => {
              const isActive = cat.id === activeCat;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCat(cat.id)}
                  className="group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(0,119,182,0.28), rgba(95,194,227,0.15))"
                      : "rgba(255,255,255,0.025)",
                    border: isActive
                      ? "1px solid rgba(95,194,227,0.55)"
                      : "1px solid rgba(148,163,184,0.15)",
                    boxShadow: isActive ? "0 8px 32px -12px rgba(95,194,227,0.45)" : "none",
                  }}
                >
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #5FC2E3, #0077B6)"
                        : "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))",
                      border: "1px solid rgba(95,194,227,0.25)",
                    }}
                  >
                    <DynamicIcon name={cat.icon} className={`w-5 h-5 ${isActive ? "text-white" : "text-accent"}`} />
                  </span>
                  <span className="flex flex-col">
                    <span className={`text-sm font-semibold leading-tight ${isActive ? "text-foreground" : "text-foreground/85"}`}>
                      {cat.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                      {cat.sub}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filtered cards */}
          <div
            key={activeCat}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr animate-tab-slide motion-reduce:animate-none"
          dangerouslySetInnerHTML={{__html: filteredServices?.content || ""}}>
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

      {/* WHY CHOOSE MICROSOFT */}
      <section
        ref={setRef("why")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(whyMicrosoftSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{__html: whyMicrosoftSection?.paragraph}} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {whyMicrosoft.map((w, i) => (
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

          {cta_section_77?.cta_content && (
            <InlineCTA
              title={cta_section_77?.cta_content || ""}
              btn={cta_section_77?.button_text || ""}
              btnUrl={cta_section_77?.button_url || ""}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(outcomesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
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

          {cta_section_111?.content && (
            <InlineCTA
              title={cta_section_111?.content || ""}
              btn={cta_section_111?.button_text || ""}
              btnUrl={cta_section_111?.button_url || ""}
            />
          )}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(technologiesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {technologiesSection?.paragraph || ""}
            </p>
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

          {cta_section_113?.content && (
            <InlineCTA
              title={cta_section_113?.content || ""}
              btn={cta_section_113?.button_text || ""}
              btnUrl={cta_section_113?.button_url || ""}
            />
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
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{__html: addClassToSpan(industriesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              {industriesSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {industries.map((industry, i) => (
              <div key={i} className="p-5 rounded-xl text-center transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <span className="text-base font-semibold text-foreground">{industry.label}</span>
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
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{__html: addClassToSpan(contactSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
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

export default Microsoft;
