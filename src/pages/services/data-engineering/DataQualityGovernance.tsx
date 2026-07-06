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
import ContactUsForm from "@/components/ContactUsForm";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useInViewMap } from "@/hooks/useInView";
import { Sparkles } from "lucide-react";

/* Static content replaced by JSON-driven bindings inside the component. */

const cardBase =
  "rounded-2xl p-6 transition-all duration-500 hover:border-accent/30 hover:-translate-y-1";
const cardStyle = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(148,163,184,0.12)",
};

const InlineCTA = ({ title, sub, btn, btnUrl }: { title: string; sub: string; btn: string; btnUrl?: string }) => (
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
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug text-center sm:text-left">{title}</h3>
          {sub && <p className="text-muted-foreground text-sm mt-1 text-center sm:text-left">{sub}</p>}
        </div>
        <Link to={btnUrl ?? ""} className="flex-shrink-0 relative z-10">
          <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
            {btn}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const DataQualityGovernance = () => {
  const { inViewMap: visible, setRef } = useInViewMap();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dataQualityEngineers"],
    queryFn: api.getDataQualityEngineers,
  });

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  const RenderIcon = ({ icon, className }: { icon: any; className?: string }) => {
    if (!icon) return null;
    if (typeof icon === "string") return <DynamicIcon name={icon} className={className} />;
    const IconComp = icon as any;
    return <IconComp className={className} />;
  };

  // Data extraction with defensive null checks
  const bannerSection = pageData?.banner_section ?? {};
  const heroImage = bannerSection.banner_image?.url;
  const heroImageAlt = bannerSection.banner_image?.alt;
  const heroParagraph = bannerSection.banner_description ?? "";
  const heroBackLink = bannerSection.back_link_url ?? "";
  const heroCtaLink = bannerSection.cta_link ?? "";
  const heroCtaText = bannerSection.cta_text ?? "";
  const heroBadge1 = bannerSection.floating_badge_fields?.[0]?.badge_heading ?? "";
  const heroBadge1Text = bannerSection.floating_badge_fields?.[0]?.badge_text ?? "";
  const heroBadge2 = bannerSection.floating_badge_fields?.[1]?.badge_heading ?? "";
  const heroBadge2Text = bannerSection.floating_badge_fields?.[1]?.badge_text ?? "";

  const foundationSection = pageData?.build_trust_in_your_data_with_governance_and_quality ?? {};
  const foundationHeading = foundationSection.heading ?? "";
  const foundationImage = foundationSection.image?.url;
  const foundationImageAlt = foundationSection.image?.alt;
  const foundationContent = foundationSection.right_content ?? "";
  const foundationImageIcon = foundationSection.image_icon ?? "";
  const foundationImageLabel = foundationSection.image_label ?? "";
  const foundationImageText = foundationSection.image_text ?? "";

  const solutionsSection = pageData?.data_governance_data_quality_solutions_for_your_business_challenges ?? {};
  const solutionsHeading = solutionsSection.heading ?? "";
  const solutionsPara = solutionsSection.paragraph ?? "";
  const solutions = (solutionsSection.cards ?? []).map((s: any) => ({
    icon: s.icon,
    title: s.title ?? "",
    content: s.content ?? "",
    items: (s.service_list ?? []).map((i: any) => i.text ?? ""),
  }));

  const governanceSection = pageData?.data_governance_services_we_offer ?? {};
  const governanceHeading = governanceSection.heading ?? "";
  const governancePara = governanceSection.paragraph ?? "";
  const governanceServices = (governanceSection.cards ?? []).map((s: any) => ({
    icon: s.icon,
    title: s.title ?? "",
    content: s.content ?? "",
    itemsLabel: s.items_label ?? "",
    items: (s.service_list ?? []).map((i: any) => i.text ?? ""),
    closing: s.closing_text ?? "",
  }));

  const qualitySection = pageData?.data_quality_services_we_offer ?? {};
  const qualityHeading = qualitySection.heading ?? "";
  const qualityPara = qualitySection.paragraph ?? "";
  const qualityServices = (qualitySection.cards ?? []).map((s: any) => ({
    icon: s.icon,
    title: s.title ?? "",
    content: s.content ?? "",
    itemsLabel: s.items_label ?? "",
    items: (s.service_list ?? []).map((i: any) => i.text ?? ""),
    closing: s.closing_text ?? "",
  }));

  const processSection = pageData?.our_process_from_data_challenges_to_trusted_data ?? {};
  const processHeading = processSection.heading ?? "";
  const processDescription = processSection.paragraph ?? "";
  const processSteps = (processSection.cards ?? []).map((s: any) => ({
    icon: s.icon,
    title: s.title ?? "",
    content: s.content ?? "",
  }));

  const engagementSection = pageData?.our_engagement_models ?? {};
  const engagementHeading = engagementSection.heading ?? "";
  const engagementPara = engagementSection.paragraph ?? "";
  const engagementModels = (engagementSection.cards ?? []).map((m: any) => ({
    icon: m.icon,
    title: m.title ?? "",
    content: m.content ?? "",
  }));

  const whySection = pageData?.why_choose_code1tech_as_your_data_governance_company ?? {};
  const whyHeading = whySection.heading ?? "";
  const whyChoose = (whySection.cards ?? []).map((w: any) => ({
    icon: w.icon,
    title: w.title ?? "",
    content: w.content ?? "",
  }));
  const whyBottomButtonUrl = whySection.bottom_button_url ?? "";
  const whyBottomButtonText = whySection.bottom_button_text ?? "";

  const industriesSection = pageData?.industries_we_support ?? {};
  const industriesHeading = industriesSection.heading ?? "";
  const industriesPara = industriesSection.paragraph ?? "";
  const industries = (industriesSection.cards ?? []).map((i: any) => ({
    icon: i.icon,
    title: i.title ?? "",
    content: i.content ?? "",
  }));

  const platformsSection = pageData?.technology_platform_expertise ?? {};
  const platformsHeading = platformsSection.heading ?? "";
  const platformsDescription = platformsSection.paragraph ?? "";
  const platforms = (platformsSection.cards ?? []).map((p: any) => ({
    icon: p.icon,
    title: p.title ?? "",
    content: p.content ?? "",
  }));

  const faqHeading = pageData.faq_section_heading ?? "";
  const faqs = (pageData?.frequently_asked_question ?? []).map((f: any) => ({
    q: f.post_title ?? "",
    a: f.post_content ?? "",
  }));

  const contactSection = pageData?.services_get_started_section ?? {};
  const contactHeading = contactSection.heading ?? "";
  const contactParagraph = contactSection.paragraph ?? "";
  const contactBullets = (contactSection.bullet_points ?? []).map((b: any) => b.text ?? "");
  const contactButton = contactSection.cta_button ?? {};

  const cta_section_70 = pageData?.cta_section_70 ?? {};
  const cta_section_77 = pageData?.cta_section_77 ?? {};
  const cta_section_111 = pageData?.cta_section_111 ?? {};
  const cta_section_113 = pageData?.cta_section_113 ?? {};
  const cta_section_114 = pageData?.cta_section_114 ?? {};
  const cta_section_130 = pageData?.cta_section_130 ?? {};
  const cta_section_131 = pageData?.cta_section_131 ?? {};
  const cta_section_133 = pageData?.cta_section_133 ?? {};
  const cta_section_135 = pageData?.cta_section_135 ?? {};

  return (
    <>
      <SeoTags
        title={pageData?.seo?.title}
        description={pageData?.seo?.description}
        ogImage={pageData?.seo?.og_image}
        schema={pageData?.schema}
      />
      {/* ======= HERO ======= */}
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
          style={{ background: "radial-gradient(circle, rgba(95,194,227,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(circle, rgba(0,78,158,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 lg:pt-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center">
            <div
              className={`relative transition-all duration-700 ease-out ${
                visible.hero ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}
              >
                <img
                  src={heroImage}
                  alt={heroImageAlt || "Data quality and data governance services visualization"}
                  className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover"
                  loading="eager"
                  width={1280}
                  height={896}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              </div>
              <div
                className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block"
                style={{ animation: "pulse 3s ease-in-out infinite" }}
              />
              <div
                className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block"
                style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }}
              />
              <div
                className={`absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${
                  visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  background: "rgba(10,15,30,0.85)",
                  border: "1px solid rgba(95,194,227,0.2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">
                  {heroBadge1}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {heroBadge1Text}
                </div>
              </div>
              <div
                className={`absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${
                  visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  background: "rgba(10,15,30,0.85)",
                  border: "1px solid rgba(95,194,227,0.2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  animation: "float 5s ease-in-out infinite",
                  animationDelay: "2s",
                }}
              >
                <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">
                  {heroBadge2}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {heroBadge2Text}
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ease-out delay-150 ${
                visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <Link
                to={heroBackLink}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
              >
                ← Data Engineering
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(bannerSection.banner_heading ?? "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: heroParagraph }} />
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

        <style>{`
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        `}</style>
      </section>

      {/* ======= TRUSTED FOUNDATION ======= */}
      <section
        ref={setRef("foundation")}
        className="relative py-12 lg:py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Heading */}
          <div
            className={`max-w-5xl mx-auto text-center mb-10 lg:mb-14 transition-all duration-700 ${
              visible.foundation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(foundationHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          {/* Two-column: image + paragraphs */}
          <div className="grid lg:grid-cols-[5fr_7fr] gap-8 lg:gap-12 items-start">
            {/* Image */}
            <div
              className={`lg:sticky lg:top-24 transition-all duration-1000 ${
                visible.foundation ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div
                className="relative rounded-2xl overflow-hidden border border-white/5"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)",
                }}
              >
                <img
                  src={foundationImage}
                  alt={foundationImageAlt || "Data governance and quality visualization"}
                  className="w-full h-[320px] lg:h-[460px] object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/85 via-[#0a1628]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <RenderIcon icon={foundationImageIcon} className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {foundationImageLabel}
                    </span>
                  </div>
                  <p className="text-base lg:text-lg font-semibold text-foreground leading-snug">
                    {foundationImageText}
                  </p>
                </div>
              </div>
            </div>

            {/* Paragraphs */}
            <div
              className={`relative transition-all duration-1000 ${
                visible.foundation ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div
                className="absolute left-0 top-2 bottom-2 w-px hidden lg:block"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(95,194,227,0.35) 20%, rgba(95,194,227,0.15) 80%, transparent 100%)",
                }}
              />
              <div className="lg:pl-8 space-y-5 text-left" dangerouslySetInnerHTML={{ __html: foundationContent }} />
            </div>
          </div>
        </div>
      </section>
      
      {cta_section_70.content ? (
        <InlineCTA
          title={cta_section_70.content}
          sub={""}
          btn={cta_section_70.cta_text ?? ""}
          btnUrl={cta_section_70.cta_url ?? ""}
        />
      ) : null}

      {/* ======= SOLUTIONS ======= */}
      <section
        ref={setRef("solutions")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(95,194,227,0.08) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(0,119,182,0.08) 0%, transparent 35%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`max-w-5xl mx-auto mb-10 lg:mb-12 text-center transition-all duration-700 ${
              visible.solutions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(solutionsHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
             
            {solutionsPara ? (
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {solutionsPara}
                  </p>
                ) : null}
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {solutions.map((s, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
                  visible.solutions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(148,163,184,0.10)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/80 via-primary/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(95,194,227,0.08) 0%, transparent 60%)",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(95,194,227,0.08)",
                        border: "1px solid rgba(95,194,227,0.22)",
                      }}
                    >
                      <RenderIcon icon={s.icon} className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug pt-1">
                      {s.title}
                    </h3>
                  </div>

                  <div className="mb-5 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content }} />


                  <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                    {s.items.map((it, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <CheckCircle className="w-4 h-4 text-accent/70 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{it}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{cta_section_77.cta_content ? (
        <InlineCTA
          title={cta_section_77.cta_content}
          sub={""}
          btn={cta_section_77.button_text ?? ""}
          btnUrl={cta_section_77.button_url ?? ""}
        />
      ) : null}

      {/* ======= GOVERNANCE SERVICES ======= */}
      <section
        ref={setRef("governance")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.governance ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(governanceHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            {governancePara ? (
              <div dangerouslySetInnerHTML={{ __html: governancePara }} />
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {governanceServices.map((s, i) => (
              <div
                key={i}
                className={`${cardBase} ${
                  visible.governance ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={s.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                </div>
                <div className="mb-4 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content }} />
                {s.itemsLabel && (
                  <div className="mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent/80">
                      {s.itemsLabel}
                    </span>
                  </div>
                )}
                <ul className="space-y-1.5">
                  {s.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {s.closing && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                    {s.closing}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

{cta_section_111.content ? (
        <InlineCTA
          title={cta_section_111.content}
          sub={""}
          btn={cta_section_111.button_text ?? ""}
          btnUrl={cta_section_111.button_url ?? ""}
        />
      ) : null}

      {/* ======= QUALITY SERVICES ======= */}
      <section
        ref={setRef("quality")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.quality ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(qualityHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            {qualityPara ? (
              <div dangerouslySetInnerHTML={{ __html: qualityPara }} />
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {qualityServices.map((s, i) => (
              <div
                key={i}
                className={`${cardBase} ${
                  visible.quality ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={s.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                </div>
                <div className="mb-4 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content }} />
                {s.itemsLabel && (
                  <div className="mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent/80">
                      {s.itemsLabel}
                    </span>
                  </div>
                )}
                <ul className="space-y-1.5">
                  {s.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {s.closing && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                    {s.closing}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

{cta_section_113.content ? (
        <InlineCTA
          title={cta_section_113.content}
          sub={""}
          btn={cta_section_113.button_text ?? ""}
          btnUrl={cta_section_113.button_url ?? ""}
        />
      ) : null}

      {/* ======= PROCESS ======= */}
      <section
        ref={setRef("process")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(processHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed">
              {processDescription}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 lg:gap-6">
            {processSteps.map((s, i) => (
              <div
                key={i}
                className={`relative p-5 rounded-2xl transition-all duration-500 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)] ${
                  visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={s.icon} className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground leading-snug mb-1">{s.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {cta_section_114.content ? (
        <InlineCTA
          title={cta_section_114.content}
          sub={""}
          btn={cta_section_114.button_text ?? ""}
          btnUrl={cta_section_114.button_url ?? ""}
        />
      ) : null}

      {/* ======= ENGAGEMENT MODELS ======= */}
      <section
        ref={setRef("engagement")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.engagement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(engagementHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            {engagementPara ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed">
                {engagementPara}
              </p>
            ) : null}
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {engagementModels.map((s, i) => (
              <div
                key={i}
                className={`${cardBase} ${
                  visible.engagement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={s.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content }} />
              </div>
            ))}
          </div>
        </div>
      </section>

 {cta_section_130.content ? (
        <InlineCTA
          title={cta_section_130.content}
          sub={""}
          btn={cta_section_130.button_text ?? ""}
          btnUrl={cta_section_130.button_url ?? ""}
        />
      ) : null}

      {/* ======= INDUSTRIES ======= */}
      <section
        ref={setRef("industries")}
        className="relative py-12 lg:py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
              visible.industries
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {industries.map((ind, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(95,194,227,0.12)] hover:border-accent/30 ${
                  i < 3
                    ? "md:col-span-1 lg:col-span-2"
                    : "md:col-span-1 lg:col-span-3"
                } ${
                  i === industries.length - 1
                    ? "md:col-span-2 lg:col-span-3"
                    : ""
                } ${
                  visible.industries
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 lg:p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(95,194,227,0.08)",
                        border: "1px solid rgba(95,194,227,0.20)",
                      }}
                    >
                      <RenderIcon icon={ind.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug">
                      {ind.title}
                    </h3>
                  </div>
                  <div className="flex-1 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: ind.content }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

{cta_section_131.content ? (
        <InlineCTA
          title={cta_section_131.content}
          sub={""}
          btn={cta_section_131.button_text ?? ""}
          btnUrl={cta_section_131.button_url ?? ""}
        />
      ) : null}

      {/* ======= TECHNOLOGY PLATFORMS ======= */}
      <section
        ref={setRef("platforms")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.platforms ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(platformsHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed">
              {platformsDescription}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((p, i) => (
              <div
                key={i}
                className={`${cardBase} ${
                  visible.platforms ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={p.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{p.title}</h3>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: p.content }} />
              </div>
            ))}
          </div>
        </div>
      </section>


 {cta_section_133.content ? (
        <InlineCTA
          title={cta_section_133.content}
          sub={""}
          btn={cta_section_133.button_text ?? ""}
          btnUrl={cta_section_133.button_url ?? ""}
        />
      ) : null}

      {/* ======= WHY CHOOSE ======= */}
      <section
        ref={setRef("why")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-flow-dense gap-3 auto-rows-[minmax(180px,auto)]">
            {whyChoose.map((w, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl p-5 transition-all duration-500 hover:border-[#5FC8DC]/40 ${
                  i === whyChoose.length - 1 ? "md:col-span-2" : ""
                } ${
                  visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(148,163,184,0.12)",
                  transitionDelay: `${(i + 1) * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5FC8DC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
                      i === whyChoose.length - 1 ? "md:w-12 md:h-12 md:rounded-xl" : ""
                    }`}
                    style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.25)" }}
                  >
                    <RenderIcon icon={w.icon} className={`w-5 h-5 md:w-6 md:h-6 text-[#5FC8DC] ${i === whyChoose.length - 1 ? "md:w-6 md:h-6" : ""}`} />
                  </div>
                  <div className={i === whyChoose.length - 1 ? "flex-1" : ""}>
                    <h3 className={`text-base md:text-lg lg:text-xl font-bold text-foreground ${
                      i === whyChoose.length - 1 ? "mb-1 md:mb-2" : "mb-2"
                    } leading-snug`}>
                      {w.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {w.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{cta_section_135.content ? (
        <InlineCTA
          title={cta_section_135.content}
          sub={""}
          btn={cta_section_135.button_text ?? ""}
          btnUrl={cta_section_135.button_url ?? ""}
        />
      ) : null}

      {/* ======= FAQ ======= */}
      <section
        ref={setRef("faqs")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-3xl">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              visible.faqs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(faqHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl px-5 border"
                style={cardStyle}
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline text-sm sm:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ======= CONTACT ======= */}
      <section
        ref={setRef("contact")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div
              className={`transition-all duration-700 ${
                visible.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                {contactParagraph}
              </p>
              <ul className="space-y-2 mb-6">
                {contactBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link to={contactButton?.cta_url ?? ""}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                >
                  {contactButton?.cta_text ?? ""}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
            <div
              className={`transition-all duration-700 delay-150 ${
                visible.contact ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
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

export default DataQualityGovernance;
