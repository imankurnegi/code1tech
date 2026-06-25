import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ContactUsForm from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan } from "@/lib/utils";
import { useInViewMap } from "@/hooks/useInView";


const cardBase =
  "rounded-2xl p-6 transition-all duration-500 hover:border-accent/30 hover:-translate-y-1";
const cardStyle = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(148,163,184,0.12)",
};

const InlineCTA = ({ title, sub, btn, btnUrl }: { title: string; sub: string; btn: string; btnUrl: string }) => (
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
          <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", filter: "blur(24px)" }} />
          <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
        </div>
        <div className="flex-1 relative z-10 text-left">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{sub}</p>
        </div>
        <Button asChild variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
          <Link to={btnUrl ?? "#"}>
            {btn}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Link>
        </Button>
      </div>
    </div>
  </div>
);

const ServiceCard = ({ iconName, title, desc }: { iconName: string; title: string; desc: string }) => (
  <div className={cardBase} style={cardStyle}>
    <div className="flex items-center gap-3 mb-3">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
        <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
      </div>
      <h3 className="text-lg font-bold text-foreground leading-snug">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

const DataOpsPipelineAutomation = () => {
  const { setRef, inViewMap: visible } = useInViewMap();

  const { data, isLoading, error } = useQuery({
      queryKey: ["data-ops-engineers"],
      queryFn: api.getDataOpsEngineers,
    });
  
    if (isLoading) return null;
    if (error) return null;
  
    const pageData = data?.data;

  // Extract JSON data sections
  const bannerSection = pageData?.banner_section ?? {};
  const trustedSection = pageData?.build_trusted_data_pipelines_with_modern_dataops_practices ?? {};
  const automationSection = pageData?.simplify_data_operations_through_automation ?? {};
  const dataEngineerCta = pageData?.data_engineers_security_brief_cta ?? {};
  const strategySection = pageData?.build_a_dataops_strategy_that_supports_business_growth ?? {};
  const reliabilitySection = pageData?.improve_data_reliability_and_operational_visibility ?? {};
  const qualitySection = pageData?.strengthen_data_quality_throughout_your_data_lifecycle ?? {};
  const orchestrationSection = pageData?.orchestrate_and_manage_complex_data_pipelines_with_confidence ?? {};
  const onDemandCta = pageData?.on_demand_cta ?? {};
  const analyticsSection = pageData?.support_analytics_reporting_and_ai_initiatives ?? {};
  const governanceSection = pageData?.integrate_governance_into_everyday_data_operations ?? {};
  const managedSection = pageData?.managed_dataops_services_for_continuous_improvement ?? {};
  const whySection = pageData?.why_choose_code1tech_for_dataops_services ?? {};
  const contactSection = pageData?.services_get_started_section ?? {};
  const faqHeading = pageData?.faq_section_heading ?? "";
  const faqsData = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? "",
        a: item.post_content ?? "",
      }))
    : [];

  // Extract card arrays
  const automationCards = Array.isArray(automationSection.cards) ? automationSection.cards : [];
  const strategyCards = Array.isArray(strategySection.cards) ? strategySection.cards : [];
  const reliabilityCards = Array.isArray(reliabilitySection.cards) ? reliabilitySection.cards : [];
  const qualityCards = Array.isArray(qualitySection.cards) ? qualitySection.cards : [];
  const orchestrationCards = Array.isArray(orchestrationSection.cards) ? orchestrationSection.cards : [];
  const analyticsCards = Array.isArray(analyticsSection.cards) ? analyticsSection.cards : [];
  const governanceCards = Array.isArray(governanceSection.cards) ? governanceSection.cards : [];
  const managedCards = Array.isArray(managedSection.cards) ? managedSection.cards : [];
  const whyCards = Array.isArray(whySection.cards) ? whySection.cards : [];
  const contactBullets = Array.isArray(contactSection.lists) ? contactSection.lists.map((item: any) => item.list) : [];
  const contactButton = Array.isArray(contactSection.buttons) ? contactSection.buttons[0] : null;

  // Extract hero data
  const heroImage = bannerSection.banner_image?.url;
  const heroHeading = bannerSection.banner_heading ?? "";
  const heroParagraph = bannerSection.banner_description ?? "";
  const heroCtaText = bannerSection.cta_text ?? "";
  const heroCtaLink = bannerSection.cta_url ?? "";
  const heroBackLink = bannerSection.back_service_button ?? "";
  const floatingBadges = Array.isArray(bannerSection.floating_badge_fields) ? bannerSection.floating_badge_fields : [];

  // Extract section data
  const trustedImage = trustedSection.image?.url;
  const trustedImageAlt = trustedSection.image?.alt ?? "";
  const trustedContent = trustedSection.content ?? "";
  const trustedButtonText = trustedSection.button_text ?? "";
  const trustedButtonUrl = trustedSection.button_url ?? "";

  const automationHeading = automationSection.heading ?? "";
  const automationContent = automationSection.content ?? "";
  const automationImage = automationSection.image?.url;
  const automationImageAlt = automationSection.image?.alt ?? "";

  const strategyHeading = strategySection.heading ?? "";
  const strategyContent = strategySection.content ?? "";
  const strategyImage = strategySection.image?.url;
  const strategyImageAlt = strategySection.image?.alt ?? "";
  const strategyBottomText = strategySection.bottom_text ?? "";

  const reliabilityHeading = reliabilitySection.heading ?? "";
  const reliabilityContent = reliabilitySection.content ?? "";
  const reliabilityImage = reliabilitySection.image?.url;
  const reliabilityImageAlt = reliabilitySection.image?.alt ?? "";
  const reliabilityBottomText = reliabilitySection.bottom_text ?? "";

  const qualityHeading = qualitySection.heading ?? "";
  const qualityContent = qualitySection.content ?? "";
  const qualityImage = qualitySection.image?.url;
  const qualityImageAlt = qualitySection.image?.alt ?? "";
  const qualityBottomText = qualitySection.bottom_text ?? "";

  const orchestrationHeading = orchestrationSection.heading ?? "";
  const orchestrationContent = orchestrationSection.content ?? "";
  const orchestrationImage = orchestrationSection.image?.url;
  const orchestrationImageAlt = orchestrationSection.image?.alt ?? "";
  const orchestrationBottomText = orchestrationSection.bottom_text ?? "";

  const analyticsHeading = analyticsSection.heading ?? "";
  const analyticsContent = analyticsSection.content ?? "";
  const analyticsImage = analyticsSection.image?.url;
  const analyticsImageAlt = analyticsSection.image?.alt ?? "";

  const governanceHeading = governanceSection.heading ?? "";
  const governanceContent = governanceSection.content ?? "";
  const governanceImage = governanceSection.image?.url;
  const governanceImageAlt = governanceSection.image?.alt ?? "";
  const governanceBottomText = governanceSection.bottom_text ?? "";

  const managedHeading = managedSection.heading ?? "";
  const managedParagraph = managedSection.paragraph ?? "";
  const managedBottomText = managedSection.bottom_text ?? "";

  const whyHeading = whySection.heading ?? "";

  const contactHeading = contactSection.heading ?? "";
  const contactParagraph = contactSection.paragraph ?? "";

  const RenderIcon = ({ icon, className }: any) => {
    if (!icon) return null;
    if (typeof icon === "string") return <DynamicIcon name={icon} className={className} />;
    const IconComp = icon as any;
    return <IconComp className={className} />;
  };

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
        style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)" }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none hidden md:block" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.10) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none hidden md:block" style={{ background: "radial-gradient(circle, rgba(0,78,158,0.12) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 lg:pt-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center">
            <div className={`relative transition-all duration-700 ease-out ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={heroImage} alt={bannerSection.banner_image?.alt || ""} className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="eager" fetchPriority="high" width={1280} height={896} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              </div>
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
              {floatingBadges[1] && (
                <div className={`absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ background: "rgba(10,15,30,0.85)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "float 6s ease-in-out infinite" }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{floatingBadges[1]?.badge_heading ?? ""}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{floatingBadges[1]?.badge_text ?? ""}</div>
                </div>
              )}
              {floatingBadges[0] && (
                <div className={`absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ background: "rgba(10,15,30,0.85)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "float 5s ease-in-out infinite", animationDelay: "2s" }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{floatingBadges[0]?.badge_heading ?? ""}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{floatingBadges[0]?.badge_text ?? ""}</div>
                </div>
              )}
            </div>

            <div className={`transition-all duration-1000 ease-out delay-150 ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <Link to={heroBackLink} className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                ← Data Engineering
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {heroParagraph && (
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: heroParagraph }} />
              )}
              <Button asChild size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                <Link to={heroCtaLink}>
                  {heroCtaText}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
      </section>

      {/* TRUSTED PIPELINES */}
      <section
        ref={setRef("trusted")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.trusted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-8 transition-all duration-700 ${visible.trusted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(trustedSection.heading ?? "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
            <div className="rounded-2xl overflow-hidden h-full" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.08) 0%, rgba(0,78,158,0.08) 100%)", border: "1px solid rgba(148,163,184,0.12)" }}>
              <img src={trustedImage} alt={trustedImageAlt} className="w-full h-full min-h-[260px] object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl p-5 lg:p-6 flex flex-col justify-between" style={cardStyle}>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: trustedContent }} />
              <Button asChild size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-7 py-5 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                <Link to={trustedButtonUrl}>
                  {trustedButtonText}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOMATION */}
      <section
        ref={setRef("automation")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.automation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-8 lg:gap-12 items-center mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(automationHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: automationContent }} />
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={automationImage} alt={automationImageAlt} className="w-full h-[280px] lg:h-[360px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
            {automationCards.map((s: any, i: number) => (
              <ServiceCard key={i} iconName={s.icon} title={s.title} desc={s.content} />
            ))}
          </div>
        </div>
      </section>

      {dataEngineerCta.heading ? (
        <InlineCTA
          title={dataEngineerCta.heading}
          sub={dataEngineerCta.content ?? ""}
          btn={dataEngineerCta.cta_text ?? ""}
          btnUrl={dataEngineerCta.cta_url ?? ""}
        />
      ) : null}

      {/* STRATEGY */}
      <section
        ref={setRef("strategy")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.strategy ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center mb-10">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={strategyImage} alt={strategyImageAlt} className="w-full h-[280px] lg:h-[360px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(strategyHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: strategyContent }} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {strategyCards.map((s: any, i: number) => (
              <ServiceCard key={i} iconName={s.icon} title={s.title} desc={s.content} />
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-center">
            {strategyBottomText}
          </p>
        </div>
      </section>

      {/* RELIABILITY */}
      <section
        ref={setRef("reliability")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.reliability ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-8 lg:gap-12 items-center mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(reliabilityHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: reliabilityContent }} />
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={reliabilityImage} alt={reliabilityImageAlt} className="w-full h-[260px] lg:h-[320px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6">
            {reliabilityCards.slice(0, 3).map((s: any, i: number) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl border border-slate-800/60 p-6 lg:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_-10px_rgba(95,194,227,0.2)] lg:col-span-2 ${visible.reliability ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 blur-3xl" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
                  <DynamicIcon name={s.icon} className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            ))}
            {reliabilityCards.slice(3, 5).map((s: any, i: number) => (
              <div
                key={i + 3}
                className={`group relative overflow-hidden rounded-3xl border border-slate-800/60 p-6 lg:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_-10px_rgba(95,194,227,0.2)] lg:col-span-3 ${visible.reliability ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)", transitionDelay: `${(i + 3) * 100}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 blur-3xl" />
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
                    <DynamicIcon name={s.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-center">
            {reliabilityBottomText}
          </p>
        </div>
      </section>

      {/* DATA QUALITY */}
      <section
        ref={setRef("quality")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.quality ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-8 lg:gap-12 items-center mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(qualityHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: qualityContent }} />
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={qualityImage} alt={qualityImageAlt} className="w-full h-[280px] lg:h-[360px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6">
            {qualityCards.slice(0, 3).map((s: any, i: number) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl border border-slate-800/60 p-6 lg:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_-10px_rgba(95,194,227,0.2)] lg:col-span-2 ${visible.quality ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 blur-3xl" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
                  <DynamicIcon name={s.icon} className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            ))}
            {qualityCards.slice(3, 5).map((s: any, i: number) => (
              <div
                key={i + 3}
                className={`group relative overflow-hidden rounded-3xl border border-slate-800/60 p-6 lg:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_-10px_rgba(95,194,227,0.2)] lg:col-span-3 ${visible.quality ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)", transitionDelay: `${(i + 3) * 100}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 blur-3xl" />
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
                    <DynamicIcon name={s.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-center">
            {qualityBottomText}
          </p>
        </div>
      </section>

      {/* ORCHESTRATION */}
      <section
        ref={setRef("orchestration")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.orchestration ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-8 lg:gap-12 items-center mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(orchestrationHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: orchestrationContent }} />
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={orchestrationImage} alt={orchestrationImageAlt} className="w-full h-[280px] lg:h-[360px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
            {orchestrationCards.map((s: any, i: number) => (
              <ServiceCard key={i} iconName={s.icon} title={s.title} desc={s.content} />
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-center">
            {orchestrationBottomText}
          </p>
        </div>
      </section>

      {onDemandCta.heading ? (
        <InlineCTA
          title={onDemandCta.heading}
          sub={onDemandCta.content ?? ""}
          btn={onDemandCta.cta_text ?? ""}
          btnUrl={onDemandCta.cta_url ?? ""}
        />
      ) : null}

      {/* ANALYTICS / AI */}
      <section
        ref={setRef("analytics")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.analytics ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center mb-10">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={analyticsImage} alt={analyticsImageAlt} className="w-full h-[280px] lg:h-[360px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(analyticsHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: analyticsContent }} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
            {analyticsCards.map((s: any, i: number) => (
              <ServiceCard key={i} iconName={s.icon} title={s.title} desc={s.content} />
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section
        ref={setRef("governance")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.governance ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-8 lg:gap-12 items-center mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(governanceHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: governanceContent }} />
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={governanceImage} alt={governanceImageAlt} className="w-full h-[280px] lg:h-[360px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
            {governanceCards.map((s: any, i: number) => (
              <ServiceCard key={i} iconName={s.icon} title={s.title} desc={s.content} />
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-center">
            {governanceBottomText}
          </p>
        </div>
      </section>

      {/* MANAGED */}
      <section
        ref={setRef("managed")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.managed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.04) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center max-w-5xl mx-auto mb-10 transition-all duration-700 ${visible.managed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 leading-tight lg:whitespace-nowrap" dangerouslySetInnerHTML={{ __html: addClassToSpan(managedHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {managedParagraph}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto">
            {managedCards.map((m: any, i: number) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl border border-slate-800/60 p-6 lg:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_-10px_rgba(95,194,227,0.2)] flex flex-col items-start ${visible.managed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 blur-3xl" />
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
                    <DynamicIcon name={m.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-snug relative z-10">{m.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                  {m.content}
                </p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-center">
            {managedBottomText}
          </p>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section
        ref={setRef("why")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>
          <div className="flex flex-wrap justify-center gap-5 lg:gap-6">
            {whyCards.map((w: any, i: number) => (
              <div
                key={i}
                className={`w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)] ${cardBase} ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ ...cardStyle, transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}>
                    <DynamicIcon name={w.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={setRef("faq")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className={`text-center mb-8 transition-all duration-700 ${visible.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(faqHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqsData.map((f: any, i: number) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border rounded-2xl px-5 backdrop-blur-sm"
                style={{ background: "rgba(15,23,42,0.50)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-accent py-4">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed text-left">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACT */}
      <section
        ref={setRef("contact")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className={`transition-all duration-700 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: contactParagraph }} />
              <ul className="space-y-3 mb-6">
                {contactBullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {contactButton && (
                <Button asChild size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  <Link to={contactButton.cta_url ?? "#"}>
                    {contactButton.cta_text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              )}
            </div>
            <div className={`transition-all duration-700 delay-150 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataOpsPipelineAutomation;
