import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, GitBranch } from "lucide-react";
import WhyUsBlueprint from "@/components/WhyUsBlueprint";
import { PremiumBenefitsShowcase } from "@/components/ai-ml/PremiumBenefitsShowcase";
import MLOpsServicesEcosystem from "@/components/ai-ml/MLOpsServicesEcosystem";
import SeoTags from "@/components/SeoTags";
import { useInViewMap } from "@/hooks/useInView";
import { addClassToSpan } from "@/lib/utils";
import { api } from "@/api";
import { DynamicIcon } from "@/components/DynamicIcon";
import ContactUsForm from "@/components/ContactUsForm";
import { useQuery } from "@tanstack/react-query";
import ChallengeHub from "@/components/finetuning/ChallengeHub";
import FineTuningIndustryOrbit from "@/components/ai-ml/FineTuningIndustryOrbit";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallback";
import { Faqs } from "@/components/Faqs";
import RelatedBlogs from "@/components/RelatedBlogs";


const InlineCTA = ({ title, sub, btn, btnUrl }: { title: string; sub: string; btn: string, btnUrl?:string }) => (
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

const MLOps = () => {
  const { inViewMap, setRef } = useInViewMap({ threshold: 0.12, once: true });

  const { data, isLoading, error } = useQuery({
      queryKey: ["mlops-engineers"],
      queryFn: api.getMLOpsEngineers,
    });


  const pageData = data?.data;
  const blogCategory = pageData?.blog_category;
  const categorySlugs = Array.isArray(blogCategory)
  ? blogCategory.map((category) => category?.slug).filter((slug): slug is string => Boolean(slug))
  : [];
  const { data: relatedPostsData } = useQuery({
  queryKey: ["relatedPosts", categorySlugs],
  queryFn: () => api.getAllPosts(categorySlugs, 10),
  enabled: categorySlugs.length > 0,
  });

  if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorFallback error={error as Error} onRetry={() => window.location.reload()} />;

  

  // ─── DATA EXTRACTION FROM JSON ────────────────────────────────────────────────
  const heroBanner = pageData?.ai_ml_banner_section || {};
  const cta_section_70 = pageData?.data_engineers_security_brief_cta;
  const cta_section_111 = pageData?.on_demand_cta;
  const cta_section_113 = pageData?.cta_section_104;
  const cta_section_106 = pageData?.cta_section_106;
  const cta_section_322 = pageData?.cta_section_322;
  const cta_section_320 = pageData?.cta_section_320;
  const whyMattersSection = pageData?.section_below_banner || {};
  const servicesSection = pageData?.our_ai_model_fine_tuning_services || {};
  const challengesSection = pageData?.ai_challenges_section || {};
  const whyChooseSection = pageData?.ai_why_what_code1tech_section || {};
  const contactSection = pageData?.services_get_started_section || {};
  const businessOutcomesSection = pageData?.business_outcomes_you_can_expect_from_industrial_computer_vision_solutions || {};

  const faqs = (pageData?.frequently_asked_question ?? []).map((item: any) => ({
    q: item.post_title ?? "",
    a: item.post_content ?? "",
  }));
  const industriesSection = pageData?.ai_industries_section || {};
  const seoSection = pageData?.seo || {};
  const schemaSection = pageData?.schema || {};

  

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

  const serviceStages = servicesSection?.cards?.map((card: any) => card.top_text || "") || [];
  const agentLifecycle = servicesSection?.icons_line?.map((item: any) => item.label || "") || [];

  const challenges = challengesSection?.cards?.map((card: any) => ({
    icon: card.icon,
    title: card.title,
    desc: card.content,
  })) || [];

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
    bottomIcon: card.bottom_icon || "",
  })) || [];

  const industries = industriesSection?.tabs?.map((tab: any) => ({
    icon: tab.icon || "",
    title: tab.title || "",
    tag: tab.top_label || "",
    image: tab.image?.url || "",
    intro: tab.content || "",
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
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left">
                <p>{heroBanner.paragraph || ""}</p>
              </div>
              <Link to={heroBanner.button_consultation_url || ""}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {heroBanner.button_consultation_text || ""}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyMattersSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{whyMattersSection.paragraph || ""}</p>
          </div>
          <div className="relative space-y-6 lg:space-y-8">
            {whyMatters.map((g, i) => {
              const reverse = i % 2 === 1;
              const isVisible = !!inViewMap["why-matters"];
              const top = 6 + i * 0.75;
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
        ref={setRef("services")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(servicesSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{servicesSection.paragraph || ""}</p>
          </div>
          <MLOpsServicesEcosystem
            services={services}
            visible={inViewMap.services}
            lifecycle={agentLifecycle}
            stages={serviceStages}
            ariaLabel="MLOps services lifecycle stages"
          />
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
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(challengesSection.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{challengesSection.paragraph || ""}</p>
          </div>
          <ChallengeHub
            items={challenges}
            centerIcon={GitBranch}
            centerLabel={
              <>
                MLOps
                <br />
                Solutions
              </>
            }
            centerTagline="Operations Hub"
          />
        </div>
      </section>

      <InlineCTA
        title={cta_section_113?.heading || ""}
        sub={cta_section_113?.paragraph || ""}
        btn={cta_section_113?.button_text || ""}
        btnUrl={cta_section_113?.button_url || ""}
      />

      {industriesSection && industries.length > 0 && (
        <section
          ref={setRef("industries")}
          className="relative py-10 lg:py-14 overflow-hidden"
          style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
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
                intro: ind.intro,
              }))}
            />
          </div>
        </section>
      )}

      {cta_section_106 && (
        <InlineCTA
          title={cta_section_106?.heading || ""}
          sub={cta_section_106?.paragraph || ""}
          btn={cta_section_106?.button_text || ""}
          btnUrl={cta_section_106?.button_url || ""}
        />
      )}

      <PremiumBenefitsShowcase
        sectionId="benefits"
        pre={businessOutcomesSection.heading || ""}
        hi={businessOutcomesSection.heading || ""}
        sub={businessOutcomesSection.paragraph || ""}
        items={businessOutcomes}
        visible={inViewMap}
        setRef={setRef}
        wideVisual="collaboration"
      />

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
            centerIcon={GitBranch}
            centerLabel="CODE1 MLOPS"
            centerTagline="Pipelines to Production"
            lifecycleLabel={whyChoose[0]?.bottomText}
            ariaLabel="ML pipeline engineering and MLOps capabilities"
          />
        </div>
      </section>

      <InlineCTA
        title={cta_section_322?.heading || ""}
        sub={cta_section_322?.paragraph || ""}
        btn={cta_section_322?.button_text || ""}
        btnUrl={cta_section_322?.button_url || ""}
      />

      {/* FAQs */}
      {pageData?.faq_section_heading && faqs.length > 0 && (
        <section ref={setRef("faq")} id="faqs" className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <Faqs heading={pageData?.faq_section_heading} faqs={faqs} />
        </section>
      )}

      <RelatedBlogs dataRelatedBlogs={relatedPostsData?.data || []} />

      {/* ======= CLOSING CTA + CONTACT ======= */}
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection?.heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                {contactSection?.paragraph || ""}
              </p>
              <ul className="space-y-3 mb-6">
                {contactSection.lists?.map((list: any, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/85">
                    <DynamicIcon name="lucide-check-circle" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{list.list || ""}</span>
                  </li>
                ))}
              </ul>
              <Link to={contactSection.buttons?.[0]?.cta_url || ""}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                >
                  {contactSection.buttons?.[0]?.cta_text || ""}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
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

export default MLOps;
