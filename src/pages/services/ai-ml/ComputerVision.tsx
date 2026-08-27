import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ScanSearch,
} from "lucide-react";
import { useInViewMap } from "@/hooks/useInView";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import ChallengeHub from "@/components/finetuning/ChallengeHub";
import TechEcosystem from "@/components/finetuning/TechEcosystem";
import FineTuningIndustryOrbit from "@/components/ai-ml/FineTuningIndustryOrbit";
import WhyUsBlueprint from "@/components/WhyUsBlueprint";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import ContactUsForm from "@/components/ContactUsForm";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallback";
import { Faqs } from "@/components/Faqs";
import RelatedBlogs from "@/components/RelatedBlogs";

const cardBase =
  "rounded-2xl p-6 transition-all duration-500 hover:border-accent/30 hover:-translate-y-1";
const cardStyle = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(148,163,184,0.12)",
};

const InlineCTA = ({ title, sub, btn, btnUrl }: { title: string; sub: string; btn: string, btnUrl:string }) => (
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
          <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
          <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
        </div>
        <div className="flex-1 relative z-10">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{sub}</p>
        </div>
        <Link to={btnUrl || ""} className="flex-shrink-0 relative z-10">
          <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
            {btn}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const IconCard = ({
  iconName,
  title,
  desc,
  index = 0,
  visible = true,
  compact = false,
}: {
  iconName: string;
  title: string;
  desc: string;
  index?: number;
  visible?: boolean;
  compact?: boolean;
}) => (
  <div
    className={`${cardBase} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    style={{ ...cardStyle, transitionDelay: `${index * 80}ms` }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
      >
        <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
      </div>
      <h3 className={`${compact ? "text-base" : "text-lg"} font-bold text-foreground leading-snug`}>{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

const ComputerVision = () => {
  const { inViewMap, setRef } = useInViewMap({ threshold: 0.12, once: true });

  const { data, isLoading, error } = useQuery({
      queryKey: ["computer-vision"],
      queryFn: api.getComputerEngineers,
    });
  if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorFallback error={error as Error} onRetry={() => window.location.reload()} />;

  const pageData = data?.data;

  // ─── DATA EXTRACTION FROM JSON ────────────────────────────────────────────────
  const heroBanner = pageData?.ai_ml_banner_section || {};
  const cta_section_70 = pageData?.data_engineers_security_brief_cta;
  const cta_section_111 = pageData?.on_demand_cta;
  const cta_section_113 = pageData?.cta_section_104;
  const cta_section_106  = pageData?.cta_section_106;
  const cta_section_322 = pageData?.cta_section_322;
  const cta_section_324 = pageData?.cta_section_324;
  const cta_section_327 = pageData?.cta_section_327;
  const cta_section_320 = pageData?.cta_section_320;
  const whyMattersSection = pageData?.section_below_banner || {};
  const servicesSection = pageData?.our_ai_model_fine_tuning_services || {};
  const benefitsSection = pageData?.ai_cards_section || {};
  const challengesSection = pageData?.ai_challenges_section || {};
  const industriesSection = pageData?.ai_industries_section || {};
  const technologiesSection = pageData?.ai_technologies_section || {};
  const whyChooseSection = pageData?.ai_why_what_code1tech_section || {};
  const contactSection = pageData?.services_get_started_section || {};
  const businessOutcomesSection = pageData?.business_outcomes_you_can_expect_from_industrial_computer_vision_solutions || {};

  const faqs = (pageData?.frequently_asked_question ?? []).map((item: any) => ({
    q: item.post_title ?? "",
    a: item.post_content ?? "",
  }));
  const seoSection = pageData?.seo || {};
  const schemaSection = pageData?.schema || {};

  const blogCategory = pageData?.blog_category;
  const categorySlugs = Array.isArray(blogCategory)
    ? blogCategory.map((category) => category?.slug).filter((slug): slug is string => Boolean(slug))
    : [];
  const { data: relatedPostsData } = useQuery({
    queryKey: ["relatedPosts", categorySlugs],
    queryFn: () => api.getAllPosts(categorySlugs, 10),
    enabled: categorySlugs.length > 0,
  });

  const whyMatters = whyMattersSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
    image: card.image?.url || "",
  })) || [];

  const services = servicesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
    topText: card.top_text || "",
    image: card.image || "",
  })) || [];

  const iconsLine = servicesSection?.icons_line?.map((item: any) => ({
    icon: item.icon,
    label: item.label,
  })) || [];

  const benefits = benefitsSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const challenges = challengesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  const industries = industriesSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    title: tab.title,
    tag: tab.top_label || "",
    image: tab.image?.url || "",
    desc: tab.content,
  })) || [];

  const technologies = technologiesSection?.cards?.map((card: any) => {
    const chips = [
      card.bottom_label_1,
      card.bottom_label_2,
      card.bottom_label_3,
      card.bottom_label_4,
      card.bottom_label_5
    ].filter(Boolean); // Filter out empty strings
    return {
      icon: card.icon,
      title: card.title,
      desc: card.content,
      chips: chips.length > 0 ? chips : undefined,
    };
  }) || [];

  const whyChoose = whyChooseSection?.tabs?.map((tab: any) => ({
    icon: tab.icon,
    title: tab.title,
    desc: tab.content,
    image: tab.image?.url || "",
    bottomText: tab.bottom_text || "",
  })) || [];

  const businessOutcomes = businessOutcomesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

  return (
    <>
      <SeoTags
                    title={seoSection?.title}
                    description={seoSection?.description}
                    ogImage={seoSection?.og_image}
                    schema={schemaSection}
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
            <div className={`relative transition-all duration-700 ease-out ${inViewMap.hero ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={heroBanner.image?.url || ""} alt={heroBanner.image?.alt || ""} className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="eager" width={heroBanner.image?.width || 1280} height={heroBanner.image?.height || 960} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              </div>
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
            </div>

            <div className={`transition-all duration-1000 ease-out delay-150 ${inViewMap.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <Link to={heroBanner.top_link || ""} className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                ← {heroBanner.top_text || ""}
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroBanner.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: heroBanner.paragraph || "" }} />
              {heroBanner.button_consultation_text && (
                <Link to={heroBanner.button_consultation_url || ""}>
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                    {heroBanner.button_consultation_text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======= WHY IT MATTERS ======= */}
      <section
        ref={setRef("why-matters")}
        className="relative py-10 lg:py-14"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyMattersSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
      <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{whyMattersSection?.paragraph}</p>
  </div>
          <div className="relative space-y-5 lg:space-y-16">
            {whyMatters.map((g, i) => {
              const reverse = i % 2 === 1;
              const isVisible = !!inViewMap["why-matters"];
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
                  {/* Image */}
                  <div className={`relative min-h-[240px] lg:min-h-[300px] ${reverse ? "lg:order-2" : ""}`}>
                    <img
                      src={g.image}
                      alt={g.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col justify-center p-6 lg:p-10 ${reverse ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(95,194,227,0.1)", border: "1px solid rgba(95,194,227,0.25)" }}>
                        <DynamicIcon name={g.icon} className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground">{g.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        title={cta_section_70?.heading || ""}
        sub={cta_section_70?.content || ""}
        btn={cta_section_70?.cta_text || ""}
        btnUrl={cta_section_70?.cta_url || ""}
      />

      <section
        ref={setRef("how")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.35) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(benefitsSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{benefitsSection.paragraph || ""}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((step, idx) => (
              <IconCard
                key={idx}
                iconName={step.icon}
                title={step.title}
                desc={step.desc}
                index={idx}
                visible={inViewMap.how}
              />
            ))}
          </div>
        </div>
      </section>

      <InlineCTA
        title={cta_section_111?.heading || ""}
        sub={cta_section_111?.content || ""}
        btn={cta_section_111?.cta_text || ""}
        btnUrl={cta_section_111?.cta_url || ""}
      />

      <section
        ref={setRef("challenges")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(challengesSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{challengesSection.paragraph || ""}</p>
          </div>
          <ChallengeHub
            items={challenges}
            centerIcon={ScanSearch}
            centerLabel={
              <>
                Computer Vision
                <br />
                Solutions
              </>
            }
            centerTagline="Vision Hub"
          />
        </div>
      </section>

      <InlineCTA
        title={cta_section_113?.heading || ""}
        sub={cta_section_113?.paragraph || ""}
        btn={cta_section_113?.button_text || ""}
        btnUrl={cta_section_113?.button_url || ""}
      />

      <section
        ref={setRef("services")}
        className="relative py-14 lg:py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 55%, hsl(222 47% 4%) 100%)" }}
        aria-label="Our Industrial Computer Vision Solutions"
      >
        {/* ambient background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(circle, rgba(0,119,182,0.14) 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-10 right-10 w-[380px] h-[380px] pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(circle, rgba(95,194,227,0.10) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-[1500px]">
          {/* heading */}
          <div
            className={`text-center mb-8 transition-all duration-700 delay-100 ${
              inViewMap.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{__html:addClassToSpan(servicesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mx-auto" style={{ maxWidth: 850 }} dangerouslySetInnerHTML={{__html:servicesSection?.paragraph}} />
          </div>

          {/* PROCESS JOURNEY */}
          <div
            className={`mb-12 lg:mb-14 transition-all duration-700 delay-200 ${
              inViewMap.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="overflow-x-auto scrollbar-none">
              <ol className="flex items-start justify-between gap-2 min-w-[720px] lg:min-w-0 px-2 relative">
                {/* connecting line */}
                <div
                  className="absolute left-6 right-6 top-5 h-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(95,194,227,0.55) 15%, rgba(0,119,182,0.6) 50%, rgba(95,194,227,0.55) 85%, transparent 100%)",
                  }}
                />
                {iconsLine.map((step, i) => (
                  <li key={step.label} className="flex-1 flex flex-col items-center relative">
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700`}
                      style={{
                        background: "rgba(10,15,30,0.9)",
                        border: "1px solid rgba(95,194,227,0.45)",
                        boxShadow: inViewMap.services
                          ? "0 0 18px rgba(95,194,227,0.45), inset 0 0 10px rgba(0,119,182,0.25)"
                          : "0 0 0 rgba(0,0,0,0)",
                        transitionDelay: `${300 + i * 120}ms`,
                      }}
                    >
                      <DynamicIcon name={typeof step.icon === 'string' ? step.icon : ''} className="w-4 h-4 text-accent" />
                    </div>
                    <span className="mt-3 text-[11px] sm:text-xs font-medium text-muted-foreground tracking-wide whitespace-nowrap">
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
            {services.map((s, i) => {
              // desktop spans - adapt based on actual service count
              const spans = services.length === 8 ? [
                "lg:col-span-6",  // 01 (featured)
                "lg:col-span-6",  // 02 (featured)
                "lg:col-span-3",  // 03
                "lg:col-span-3",  // 04
                "lg:col-span-3",  // 05
                "lg:col-span-3",  // 06
                "lg:col-span-8",  // 07 (wide featured)
                "lg:col-span-4",  // 08
              ] : Array(services.length).fill("lg:col-span-3");
              const featured = i === 0 || i === 1 || i === 6;
              const num = String(i + 1).padStart(2, "0");
              const totalServices = services.length;
              const serviceNum = String(i + 1).padStart(2, "0");
              return (
                <article
                  key={i}
                  tabIndex={0}
                  aria-label={s.title}
                  className={`group relative ${spans[i]} rounded-[24px] overflow-hidden outline-none transition-all duration-500 ease-out ${
                    inViewMap.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  } hover:-translate-y-1.5 focus-visible:-translate-y-1.5`}
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(15,23,42,0.85) 0%, rgba(10,15,30,0.9) 100%)",
                    border: "1px solid rgba(95,194,227,0.18)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    transitionDelay: `${i * 70}ms`,
                    backdropFilter: "blur(6px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(95,194,227,0.55)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 18px 45px rgba(0,0,0,0.5), 0 0 32px rgba(95,194,227,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(95,194,227,0.18)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
                  }}
                >
                  {/* background visual */}
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

                  {/* content */}
                  <div className={`relative p-6 lg:p-7 h-full flex ${featured ? "flex-col lg:flex-row lg:items-stretch gap-6" : "flex-col"}`}>
                    {/* main text side */}
                    <div className={`flex-1 flex flex-col ${featured ? "min-w-0" : ""}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="font-mono text-[11px] tracking-[0.2em] text-accent/80"
                          style={{ textShadow: "0 0 12px rgba(95,194,227,0.4)" }}
                        >
                          {serviceNum} / {String(totalServices).padStart(2, "0")}
                        </span>
                        {s.topText && (
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full text-accent"
                            style={{
                              background: "rgba(95,194,227,0.08)",
                              border: "1px solid rgba(95,194,227,0.35)",
                            }}
                          >
                            {s.topText}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "rgba(95,194,227,0.08)",
                            border: "1px solid rgba(95,194,227,0.30)",
                          }}
                        >
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                              background:
                                "radial-gradient(circle, rgba(95,194,227,0.35) 0%, transparent 70%)",
                            }}
                          />
                          <DynamicIcon name={typeof s.icon === 'string' ? s.icon : ''} className="relative w-5 h-5 text-accent" />
                        </div>
                        <h3 className={`${featured ? "text-lg lg:text-xl" : "text-base lg:text-lg"} font-bold text-foreground leading-snug m-0`}>
                          {s.title}
                        </h3>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    {/* featured illustration side */}
                    {featured && s.image && s.image !== "<br>" && (
                      <div className="relative lg:w-[220px] lg:flex-shrink-0 rounded-2xl overflow-hidden order-first lg:order-last min-h-[140px]" style={{ background: "linear-gradient(160deg, rgba(0,119,182,0.15), rgba(95,194,227,0.06))", border: "1px solid rgba(95,194,227,0.18)" }}>
                        <div 
                          className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                          dangerouslySetInnerHTML={{ __html: s.image }}
                        />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        title={cta_section_106?.heading || ""}
        sub={cta_section_106?.paragraph || ""}
        btn={cta_section_106?.button_text || ""}
        btnUrl={cta_section_106?.button_url || ""}
      />

      <section
        ref={setRef("industries")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{industriesSection.paragraph || ""}</p>
          </div>
          <FineTuningIndustryOrbit
            items={industries.map((ind) => ({
              icon: typeof ind.icon === 'string' ? ind.icon : '',
              title: ind.title,
              tag: ind.tag,
              image: ind.image,
              intro: ind.desc,
            }))}
          />
        </div>
      </section>

      <InlineCTA
        title={cta_section_320?.heading || ""}
        sub={cta_section_320?.paragraph || ""}
        btn={cta_section_320?.button_text || ""}
        btnUrl={cta_section_320?.button_url || ""}
      />

      <section
        ref={setRef("why")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyChooseSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{whyChooseSection.paragraph || ""}</p>
          </div>
          <WhyUsBlueprint
            items={whyChoose}
            centerIcon={ScanSearch}
            centerLabel="CODE1 CV"
            centerTagline="Inspection to Insight"
            lifecycleLabel={whyChoose?.[0]?.bottomText || ""}
            ariaLabel="Computer vision capabilities"
          />
        </div>
      </section>

      <InlineCTA
        title={cta_section_322?.heading || ""}
        sub={cta_section_322?.paragraph || ""}
        btn={cta_section_322?.button_text || ""}
        btnUrl={cta_section_322?.button_url || ""}
      />

      <section
        ref={setRef("benefits")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.35) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(businessOutcomesSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{businessOutcomesSection.paragraph || ""}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessOutcomes.map((item, idx) => (
              <IconCard
                key={idx}
                iconName={item.icon}
                title={item.title}
                desc={item.desc}
                index={idx}
                visible={inViewMap.benefits}
              />
            ))}
          </div>
        </div>
      </section>

      <InlineCTA
        title={cta_section_324?.heading || ""}
        sub={cta_section_324?.paragraph || ""}
        btn={cta_section_324?.button_text || ""}
        btnUrl={cta_section_324?.button_url || ""}
      />

      <section
        ref={setRef("tech")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(technologiesSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{technologiesSection.paragraph || ""}</p>
          </div>
          <TechEcosystem items={technologies} />
        </div>
      </section>

      <InlineCTA
        title={cta_section_327?.heading || ""}
        sub={cta_section_327?.paragraph || ""}
        btn={cta_section_327?.button_text || ""}
        btnUrl={cta_section_327?.button_url || ""}
      />

      {/* FAQs */}
      {pageData?.faq_section_heading && faqs.length > 0 && (
        <section ref={setRef("faq")} id="faqs" className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <Faqs heading={pageData?.faq_section_heading} faqs={faqs} />
        </section>
      )}

      <RelatedBlogs dataRelatedBlogs={relatedPostsData?.data || []} />

       <section
        ref={setRef("contact")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div
              className={`transition-all duration-700 ${
                inViewMap.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6" >{contactSection.paragraph || ""}</p>
              <ul className="space-y-3 mb-6">
                  {contactSection.lists?.map((listItem: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                      <DynamicIcon name="lucide-check-circle" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{listItem.list || ""}</span>
                    </li>
                  ))}
              </ul>
              {contactSection.buttons?.[0] && (
                <Link to={contactSection.buttons[0].cta_url || ""}>
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                  >
                    {contactSection.buttons[0].cta_text || ""}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              )}
            </div>
            <div
              className={`transition-all duration-700 delay-150 ${
                inViewMap.contact ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
              }`}
            >
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComputerVision;
