import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SeoTags from "@/components/SeoTags";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ContactUsForm from "@/components/ContactUsForm";
import { useInViewMap } from "@/hooks/useInView";

const InlineCTA = ({ title, sub, btn, btnUrl }: { title: string; sub?: string; btn: string; btnUrl?: string }) => (
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
        <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", filter: "blur(24px)" }} />
        <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
      </div>
      <div className="flex-1 relative z-10 text-left">
        <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
        {sub && <p className="text-muted-foreground text-sm mt-1">{sub}</p>}
      </div>
      <Link to={btnUrl || "#"} className="flex-shrink-0 relative z-10">
        <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
          {btn}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Button>
      </Link>
    </div>
  </div>
);


// ─── DATA ────────────────────────────────────────────────────────────────

function decodeHTMLEntities(str: string) {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// ─── PAGE ────────────────────────────────────────────────────────────────

const PredictiveAdvancedAnalytics = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const { data, isLoading, error } = useQuery({
      queryKey: ["predictive-engineers"],
      queryFn: api.getPredictiveEngineers,
    });
  
    if (isLoading) return null;
    if (error) return null;
  
    const pageData = data?.data;

  // Extract data from JSON with defensive fallbacks
  const bannerSection = pageData?.banner_section ?? {};
  const whyInvestSection = pageData?.why_organizations_invest_in_predictive_advanced_analytics ?? {};
  const cta70Section = pageData?.cta_section_70 ?? {};
  const ourServicesSection = pageData?.our_predictive_advanced_analytics_services ?? {};
  const aiPoweredSection = pageData?.ai_powered_predictive_analytics_solutions ?? {};
  const cta77Section = pageData?.cta_section_77 ?? {};
  const howExpertsSection = pageData?.how_our_predictive_analytics_experts_help_you ?? {};
  const cta111Section = pageData?.cta_section_111 ?? {};
  const useCasesSection = pageData?.predictive_analytics_use_cases_across_industries ?? {};
  const cta113Section = pageData?.cta_section_113 ?? {};
  const whyChooseSection = pageData?.why_choose_code1_tech_systems_for_predictive_advanced_analytics_services ?? {};
  const cta114Section = pageData?.cta_section_114 ?? {};
  const contactSection = pageData?.services_get_started_section ?? {};
  const faqHeading = pageData?.faq_section_heading ?? "";
  const faqsData = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? "",
        a: item.post_content ?? "",
      }))
    : [];

  // Extract specific data with fallbacks
  const heroImage = bannerSection.banner_image?.url;
  const heroHeading = bannerSection.banner_heading ?? "";
  const heroParagraph = bannerSection.banner_description ?? "";
  const heroCtaText = bannerSection.cta_text ?? "";
  const heroCtaLink = bannerSection.cta_url ?? "";
  const heroBackLink = bannerSection.back_service_button ?? "";
  const heroHighlightedText = bannerSection.highlighted_text ?? "";
  const floatingBadges = Array.isArray(bannerSection.floating_badge_fields) ? bannerSection.floating_badge_fields : [];

  const whyInvestHeading = whyInvestSection.heading ?? "";
  const whyInvestParagraph = whyInvestSection.paragraph ?? "";
  const whyInvestCards = Array.isArray(whyInvestSection.cards) ? whyInvestSection.cards : [];

  const ourServicesHeading = ourServicesSection.heading ?? "";
  const ourServicesParagraph = ourServicesSection.paragraph ?? "";
  const ourServicesCards = Array.isArray(ourServicesSection.cards) ? ourServicesSection.cards : [];

  const aiPoweredHeading = aiPoweredSection.heading ?? "";
  const aiPoweredParagraph = aiPoweredSection.paragraph ?? "";
  const aiPoweredCards = Array.isArray(aiPoweredSection.cards) ? aiPoweredSection.cards : [];

  const howExpertsHeading = howExpertsSection.heading ?? "";
  const howExpertsParagraph = howExpertsSection.paragraph ?? "";
  const howExpertsCards = Array.isArray(howExpertsSection.cards) ? howExpertsSection.cards : [];

  const useCasesHeading = useCasesSection.heading ?? "";
  const useCasesParagraph = useCasesSection.paragraph ?? "";
  const useCasesCards = Array.isArray(useCasesSection.cards) ? useCasesSection.cards : [];

  const whyChooseHeading = whyChooseSection.heading ?? "";
  const whyChooseParagraph = whyChooseSection.paragraph ?? "";
  const whyChooseCards = Array.isArray(whyChooseSection.cards) ? whyChooseSection.cards : [];

  const contactHeading = contactSection.heading ?? "";
  const contactParagraph = contactSection.paragraph ?? "";
  return (
    <>
      <SeoTags
        title={pageData?.seo?.title}
        description={pageData?.seo?.description}
        ogImage={pageData?.seo?.og_image}
        schema={pageData?.schema}
      />
      {/* HERO */}
      <section
        ref={setRef("hero")}
        className="relative py-10 lg:py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none hidden md:block"
          style={{
            background:
              "radial-gradient(circle, rgba(95,194,227,0.10) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none hidden md:block"
          style={{
            background:
              "radial-gradient(circle, rgba(0,78,158,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 lg:pt-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-5 lg:gap-12 items-center">
            <div
              className={`relative transition-all duration-700 ease-out ${
                visible.hero ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)",
                }}
              >
                <img
                  src={heroImage}
                  alt={bannerSection.banner_image?.alt || ""}
                  className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover"
                  loading="eager"
                  width={1280}
                  height={896}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              </div>
              {floatingBadges[1] && (
                <div
                  className={`absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${
                    visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    background: "rgba(10,15,30,0.85)",
                    border: "1px solid rgba(95,194,227,0.2)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    animation: "floatPaa 6s ease-in-out infinite",
                  }}
                >
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">
                    {floatingBadges[1].badge_heading ?? ""}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {floatingBadges[1].badge_text ?? ""}
                  </div>
                </div>
              )}
              {floatingBadges[0] && (
                <div
                  className={`absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${
                    visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    background: "rgba(10,15,30,0.85)",
                    border: "1px solid rgba(95,194,227,0.2)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    animation: "floatPaa 5s ease-in-out infinite",
                    animationDelay: "2s",
                  }}
                >
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">
                    {floatingBadges[0].badge_heading ?? ""}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {floatingBadges[0].badge_text ?? ""}
                  </div>
                </div>
              )}
            </div>

            <div
              className={`transition-all duration-1000 ease-out delay-150 ${
                visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              {heroBackLink ? (
                <Link
                  to={heroBackLink}
                  className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
                >
                  ← Data Science
                </Link>
              ) : null}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {heroParagraph ? (
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: heroParagraph }} />
              ) : null}
              {heroHighlightedText && (
                <p className="text-sm sm:text-base text-foreground/85 font-medium mb-4 text-left">{heroHighlightedText}</p>
              )}
              <Link to={heroCtaLink}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                >
                  {heroCtaText}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <style>{`@keyframes floatPaa { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
      </section>

      {/* WHY ORGANIZATIONS INVEST */}
      <section
        ref={setRef("why-invest")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible["why-invest"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 mb-10 lg:mb-14 items-end">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyInvestHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] lg:pb-2 text-left" dangerouslySetInnerHTML={{ __html: whyInvestParagraph }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyInvestCards.map((w: any, i: number) => (
              <div
                key={i}
                className="group relative p-5 lg:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(148,163,184,0.12)",
                }}
              >
                <div className="flex items-start gap-5 mb-3">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))",
                      border: "1px solid rgba(95,194,227,0.25)",
                    }}
                  >
                    <DynamicIcon name={w.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground text-left leading-snug pt-2">
                    {w.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-[1.65] text-left">
                  {w.content}
                </p>
              </div>
            ))}
          </div>

          <InlineCTA 
            title={cta70Section.content ?? ""} 
            sub="" 
            btn={cta70Section.cta_text ?? ""} 
            btnUrl={cta70Section.cta_url ?? ""} 
          />
        </div>
      </section>

      {/* OUR SERVICES */}
      <section
        ref={setRef("our-services")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible["our-services"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold leading-[1.1] mb-5 text-center whitespace-nowrap" dangerouslySetInnerHTML={{ __html: addClassToSpan(ourServicesHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: ourServicesParagraph }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 auto-rows-fr">
            {ourServicesCards.map((s: any, i: number) => (
              <div
                key={i}
                className="group relative p-5 lg:p-8 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(148,163,184,0.12)",
                }}
              >
                <div className="flex items-center gap-5 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))",
                      border: "1px solid rgba(95,194,227,0.25)",
                    }}
                  >
                    <DynamicIcon name={s.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground text-left">
                    {s.title}
                  </h3>
                </div>
                <div className="text-sm sm:text-base text-muted-foreground leading-[1.65] mb-5 text-left" dangerouslySetInnerHTML={{ __html: s.content }} />
                <div className="mt-auto pt-2">
                  <Link to={s.link_url || ""}>
                    <Button
                      variant="outline"
                      className="border-accent/30 text-foreground hover:bg-accent/10 hover:border-accent"
                    >
                      {s.link_text}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI POWERED PREDICTIVE ANALYTICS */}
      <section
        ref={setRef("ai-powered")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible["ai-powered"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold leading-[1.1] mb-5 text-center whitespace-nowrap" dangerouslySetInnerHTML={{ __html: addClassToSpan(aiPoweredHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: aiPoweredParagraph }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiPoweredCards.map((a: any, i: number) => (
              <div
                key={i}
                className="group relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(148,163,184,0.12)",
                }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))",
                      border: "1px solid rgba(95,194,227,0.25)",
                    }}
                  >
                    <DynamicIcon name={a.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">
                    {a.title}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground leading-[1.65] text-left">
                  {a.content}
                </p>
              </div>
            ))}
          </div>

          <InlineCTA 
            title={cta77Section.cta_content ?? ""} 
            sub="" 
            btn={cta77Section.button_text ?? ""} 
            btnUrl={cta77Section.button_url ?? ""} 
          />
        </div>
      </section>

      {/* HOW OUR EXPERTS HELP */}
      <section
        ref={setRef("how-help")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible["how-help"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold leading-[1.1] mb-5 text-center whitespace-nowrap" dangerouslySetInnerHTML={{ __html: addClassToSpan(howExpertsHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <div className="text-muted-foreground text-base sm:text-lg leading-[1.65] mb-3 text-center" dangerouslySetInnerHTML={{ __html: howExpertsParagraph }} />
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {howExpertsCards.map((p: any, i: number) => (
                <div
                  key={i}
                  className="relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(148,163,184,0.12)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto relative z-10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(95,194,227,0.25), rgba(0,119,182,0.25))",
                      border: "1px solid rgba(95,194,227,0.35)",
                      boxShadow: "0 0 24px rgba(95,194,227,0.15)",
                    }}
                  >
                    <DynamicIcon name={p.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 text-left leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-[1.65] text-left">
                    {p.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <InlineCTA 
            title={cta111Section.content ?? ""} 
            sub="" 
            btn={cta111Section.button_text ?? ""} 
            btnUrl={cta111Section.button_url ?? ""} 
          />
        </div>
      </section>

      {/* USE CASES */}
      <section
        ref={setRef("use-cases")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible["use-cases"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold leading-[1.1] mb-5 text-center whitespace-nowrap" dangerouslySetInnerHTML={{ __html: addClassToSpan(useCasesHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: useCasesParagraph }} />
          </div>

          <div className="flex flex-wrap justify-center items-stretch gap-5">
            {useCasesCards.map((u: any, i: number) => (
              <article
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                style={{ border: "1px solid rgba(148,163,184,0.12)", background: "rgba(255,255,255,0.025)" }}

              >
                <div className="relative h-44 flex-shrink-0 overflow-hidden">
                  <img
                    src={u.image?.url}
                    alt={u.image?.alt || u.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.2) 0%, rgba(11,18,32,0.95) 100%)" }} />
                  <div
                    className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md"
                    style={{ background: "rgba(11,18,32,0.7)", border: "1px solid rgba(95,194,227,0.30)" }}
                  >
                    <DynamicIcon name={u.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent mb-1.5 leading-none">{u.label}</div>
                    <h3 className="text-lg font-bold text-foreground leading-tight">{u.title}</h3>
                  </div>
                </div>
                <div className="px-5 py-5 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground leading-[1.65] text-left">{u.content}</p>
                </div>
              </article>
            ))}
          </div>


          <InlineCTA 
            title={cta113Section.content ?? ""} 
            sub="" 
            btn={cta113Section.button_text ?? ""} 
            btnUrl={cta113Section.button_url ?? ""} 
          />
        </div>
      </section>

      {/* WHY CHOOSE CODE1 TECH */}
      <section
        ref={setRef("why-choose")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible["why-choose"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(220 50% 5%) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyChooseHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center" dangerouslySetInnerHTML={{ __html: whyChooseParagraph }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChooseCards.map((w: any, i: number) => (
              <div
                key={i}
                className="group relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(148,163,184,0.12)",
                }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))",
                      border: "1px solid rgba(95,194,227,0.25)",
                    }}
                  >
                    <DynamicIcon name={w.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">
                    {w.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">
                  {w.content}
                </p>
              </div>
            ))}
          </div>

          <InlineCTA 
            title={cta114Section.content ?? ""} 
            sub="" 
            btn={cta114Section.button_text ?? ""} 
            btnUrl={cta114Section.button_url ?? ""} 
          />
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={setRef("faq")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible["faq"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(222 47% 6%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1]" dangerouslySetInnerHTML={{ __html: addClassToSpan(faqHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <div className="max-w-5xl mx-auto">

            <Accordion type="single" collapsible className="space-y-3">
              {faqsData.map((f: any, i: number) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border-0 px-5"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(148,163,184,0.12)",
                  }}
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-[1.65] text-left pb-5">
                    <div dangerouslySetInnerHTML={{ __html: f.a }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* READY CTA + CONTACT */}
      <section
        ref={setRef("contact")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible["contact"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 5%) 0%, hsl(222 47% 4%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-10 lg:gap-14 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-muted-foreground text-base sm:text-lg leading-[1.65] mb-4 text-left" dangerouslySetInnerHTML={{ __html: contactParagraph }} />
            </div>
            <div
              className="p-5 lg:p-7 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(95,194,227,0.18)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
              }}
            >
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default PredictiveAdvancedAnalytics;
