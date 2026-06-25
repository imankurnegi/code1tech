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
  CheckCircle
} from "lucide-react";
import SeoTags from "@/components/SeoTags";
import ContactUsForm from "@/components/ContactUsForm";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
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
          <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
          <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
          <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
          <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
        </div>
        <div className="flex-1 relative z-10">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug text-center sm:text-left">{title}</h3>
          {sub && <p className="text-muted-foreground text-sm mt-1 text-center sm:text-left">{sub}</p>}
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


const CloudDataMigration = () => {
  const { setRef, inViewMap: visible } = useInViewMap();

  const { data, isLoading, error } = useQuery({
    queryKey: ["cloud-data-migration"],
    queryFn: api.getDataCloudEngineers,
  });

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  const bannerSection = pageData?.banner_section ?? {};
  const accelerateSection = pageData?.accelerate_digital_transformation_with_cloud_migration_and_modernization ?? {};
  const challengesSection = pageData?.cloud_migration_and_modernization_solutions_for_your_business_challenges ?? {};
  const strategySection = pageData?.build_a_successful_cloud_migration_strategy ?? {};
  const migrationSection = pageData?.end_to_end_cloud_migration_services ?? {};
  const modernizationSection = pageData?.cloud_modernization_services ?? {};
  const platformsSection = pageData?.aws_azure_and_google_cloud_migration_services ?? {};
  const multiCloudSection = pageData?.multi_cloud_and_hybrid_cloud_solutions ?? {};
  const securitySection = pageData?.cloud_security_and_governance_services ?? {};
  const costSection = pageData?.cloud_cost_optimization_services ?? {};
  const dataEngineerCta = pageData?.data_engineers_security_brief_cta ?? {};
  const managedOpsSection = pageData?.managed_cloud_operations_services ?? {};
  const industriesSection = pageData?.industries_we_support ?? {};
  const processSection = pageData?.our_cloud_migration_and_modernization_process ?? {};
  const techSection = pageData?.technology_and_platform_expertise ?? {};
  const whySection = pageData?.why_choose_code1tech_as_your_cloud_migration_company ?? {};
  const contactSection = pageData?.services_get_started_section ?? {};

  const heroImage = bannerSection.banner_image?.url;
  const heroHeading = bannerSection.banner_heading ?? "";
  const heroParagraph = bannerSection.banner_description ?? "";
  const heroCtaText = bannerSection.cta_text ?? "";
  const heroCtaLink = bannerSection.cta_url ?? "";
  const heroBackLink = bannerSection.back_service_button ?? "";

  const helpItems = Array.isArray(challengesSection.cards) ? challengesSection.cards.map((c: any) => c.text) : [];
  const challengesBottomText = challengesSection.bottom_text ?? "";

  const strategyCards = Array.isArray(strategySection.cards) ? strategySection.cards : [];
  const strategyImage = strategySection.image?.url ?? "";
  const strategyImageAlt = strategySection.image?.alt ?? "";

  const migrationCards = Array.isArray(migrationSection.cards) ? migrationSection.cards : [];
  const migrationTopTitle = migrationSection.top_title ?? "";
  const migrationHeading = migrationSection.heading ?? "";
  const migrationContent = migrationSection.content ?? "";
  const migrationImage = migrationSection.image?.url ?? "";
  const migrationImageAlt = migrationSection.image?.alt ?? "";

  const modernizationCards = Array.isArray(modernizationSection.cards) ? modernizationSection.cards : [];
  const modernizationTopTitle = modernizationSection.top_title ?? "";
  const modernizationHeading = modernizationSection.heading ?? "";
  const modernizationContent = modernizationSection.content ?? "";
  const modernizationImage = modernizationSection.image?.url ?? "";
  const modernizationImageAlt = modernizationSection.image?.alt ?? "";

  const platformCards = Array.isArray(platformsSection.cards) ? platformsSection.cards : [];
  const platformParagraph = platformsSection.paragraph ?? "";

  const multiCloudItems = Array.isArray(multiCloudSection.cards) ? multiCloudSection.cards.map((c: any) => c.text) : [];
  const multiCloudBottomText = multiCloudSection.bottom_text ?? "";
  const multiCloudParagraph = multiCloudSection.paragraph ?? "";

  const securityCards = Array.isArray(securitySection.cards) ? securitySection.cards : [];
  const securityParagraph = securitySection.paragraph ?? "";
  const securityButtonText = securitySection.button_text ?? "";

  const costCards = Array.isArray(costSection.cards) ? costSection.cards : [];
  const costParagraph = costSection.paragraph ?? "";
  const costBottomText = costSection.bottom_text ?? "";

  const managedOpsCards = Array.isArray(managedOpsSection.cards) ? managedOpsSection.cards.map((c: any) => c.title) : [];
  const managedOpsHeading = managedOpsSection.heading ?? "";
  const managedOpsParagraph = managedOpsSection.paragraph ?? "";
  const managedOpsButtonText = managedOpsSection.button_text ?? "";

  const industriesCards = Array.isArray(industriesSection.cards) ? industriesSection.cards : [];
  const industriesHeading = industriesSection.heading ?? "";
  const industriesParagraph = industriesSection.paragraph ?? "";

  const processCards = Array.isArray(processSection.cards) ? processSection.cards : [];
  const processHeading = processSection.heading ?? "";
  const processParagraph = processSection.paragraph ?? "";

  const techCards = Array.isArray(techSection.cards) ? techSection.cards : [];
  const techHeading = techSection.heading ?? "";
  const techParagraph = techSection.paragraph ?? "";

  const whyCards = Array.isArray(whySection.cards) ? whySection.cards : [];
  const whyHeading = whySection.heading ?? "";

  const contactHeading = contactSection.heading ?? "";
  const contactParagraph = contactSection.paragraph ?? "";
  const contactBullets = Array.isArray(contactSection.lists) ? contactSection.lists.map((item: any) => item.list) : [];
  const contactButton = Array.isArray(contactSection.buttons) ? contactSection.buttons[0] : null;

  const faqHeading = pageData?.faq_section_heading ?? "";
  const faqsData = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? "",
        a: item.post_content ?? "",
      }))
    : [];

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
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
              <div
                className={`absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                style={{
                  background: "rgba(10,15,30,0.85)",
                  border: "1px solid rgba(95,194,227,0.2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">
                  {bannerSection.floating_badge_fields?.[1]?.badge_heading ?? ""}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {bannerSection.floating_badge_fields?.[1]?.badge_text ?? ""}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {bannerSection.floating_badge_fields?.[1]?.badge_subtitle ?? ""}
                </div>
              </div>
              <div
                className={`absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
                  {bannerSection.floating_badge_fields?.[0]?.badge_heading ?? ""}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {bannerSection.floating_badge_fields?.[0]?.badge_text ?? ""}
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 ease-out delay-150 ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <Link
                to={heroBackLink}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
              >
                ← Data Engineering
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {heroParagraph ? (
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: heroParagraph }} />
              ) : null}
              <Button asChild
                size="lg"
                className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
              >
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

      {/* ACCELERATE */}
      <section
        ref={setRef("accelerate")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.accelerate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${visible.accelerate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  accelerateSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
            <div
              className="rounded-2xl overflow-hidden h-full"
              style={{
                background: "linear-gradient(135deg, rgba(95,194,227,0.08) 0%, rgba(0,78,158,0.08) 100%)",
                border: "1px solid rgba(148,163,184,0.12)",
              }}
            >
              <img
                src={accelerateSection.image?.url}
                alt={accelerateSection.image?.alt || ""}
                className="w-full h-full min-h-[260px] object-cover"
                loading="lazy"
                width={1024}
                height={768}
              />
            </div>
            <div className="rounded-2xl p-5 lg:p-6 flex flex-col justify-between" style={cardStyle}>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: accelerateSection.content ?? "" }} />
              <Button asChild
                size="lg"
                className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-7 py-5 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <Link to={accelerateSection.button_url}>
                  {accelerateSection.button_text ?? ""}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WE CAN HELP YOU */}
      <section
        ref={setRef("help")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.help ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.help ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  challengesSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {challengesSection.paragraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: challengesSection.paragraph }} />
            ) : null}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 max-w-6xl mx-auto">
            {helpItems.map((it, i) => (
              <div
                key={i}
                className={`flex items-start gap-2.5 px-4 py-3.5 rounded-xl text-sm text-foreground/90 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/30 ${visible.help ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ ...cardStyle, transitionDelay: `${i * 50}ms` }}
              >
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{it}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-8 text-center">
            {challengesBottomText}
          </p>
        </div>
      </section>

      {/* STRATEGY */}
      <section
        ref={setRef("strategy")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.strategy ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center mb-10">
            <div className="relative">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}
              >
                <img
                  src={strategyImage}
                  alt={strategyImageAlt}
                  className="w-full h-[280px] lg:h-[360px] object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left"
                dangerouslySetInnerHTML={{
                  __html: addClassToSpan(
                    strategySection.heading ?? "",
                    "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                  ),
                }}
              />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 text-left" dangerouslySetInnerHTML={{ __html: strategySection.content ?? "" }} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {strategyCards.map((s: any, i: number) => {
              const iconName = s.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.strategy ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}
                    >
                      <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: s.content ?? "" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* END-TO-END MIGRATION */}
      <section
        ref={setRef("migration")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.migration ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-8 lg:gap-12 items-center mb-10">
            <div>
              <div className="text-xs font-semibold text-accent uppercase tracking-[0.18em] mb-3">{migrationTopTitle}</div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left"
                dangerouslySetInnerHTML={{
                  __html: addClassToSpan(
                    migrationHeading,
                    "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                  ),
                }}
              />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 text-left" dangerouslySetInnerHTML={{ __html: migrationContent }} />
            </div>
            <div className="relative">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}
              >
                <img
                  src={migrationImage}
                  alt={migrationImageAlt}
                  className="w-full h-[260px] lg:h-[320px] object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {migrationCards.map((s: any, i: number) => {
              const iconName = s.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.migration ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}
                    >
                      <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: s.content ?? "" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODERNIZATION */}
      <section
        ref={setRef("modernize")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.modernize ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center mb-10">
            <div className="relative">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}
              >
                <img
                  src={modernizationImage}
                  alt={modernizationImageAlt}
                  className="w-full h-[280px] lg:h-[340px] object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-accent uppercase tracking-[0.18em] mb-3">{modernizationTopTitle}</div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-left"
                dangerouslySetInnerHTML={{
                  __html: addClassToSpan(
                    modernizationHeading,
                    "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                  ),
                }}
              />
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: modernizationContent }} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {modernizationCards.map((s: any, i: number) => {
              const iconName = s.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.modernize ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}
                    >
                      <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: s.content ?? "" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AWS/AZURE/GCP */}
      <section
        ref={setRef("platforms")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.platforms ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.platforms ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  platformsSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {platformParagraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: platformParagraph }} />
            ) : null}
          </div>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {platformCards.map((s: any, i: number) => {
              const iconName = s.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.platforms ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}
                    >
                      <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: s.content ?? "" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MULTI-CLOUD */}
      <section
        ref={setRef("multi")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.multi ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.multi ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  multiCloudSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {multiCloudParagraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: multiCloudParagraph }} />
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4 max-w-5xl mx-auto">
            {multiCloudItems.map((it, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 px-4 py-3.5 rounded-xl text-sm text-foreground/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
                style={cardStyle}
              >
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{it}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-left">
            {multiCloudBottomText}
          </p>
        </div>
      </section>

      {/* SECURITY & GOVERNANCE */}
      <section
        ref={setRef("security")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  securitySection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {securityParagraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: securityParagraph }} />
            ) : null}
          </div>
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {securityCards.map((s: any, i: number) => {
              const iconName = s.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}
                    >
                      <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content ?? "" }} />
                </div>
              );
            })}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-left">
            {securityButtonText}
          </p>
        </div>
      </section>

      {/* COST OPTIMIZATION */}
      <section
        ref={setRef("cost")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.cost ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.cost ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  costSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {costParagraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: costParagraph }} />
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 max-w-5xl mx-auto">
            {costCards.map((c: any, i: number) => {
              const iconName = c.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} flex flex-col items-start ${visible.cost ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground leading-snug">{c.title}</h3>
                </div>
              );
            })}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-left">
            {costBottomText}
          </p>
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

      {/* MANAGED OPS */}
      <section
        ref={setRef("ops")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.ops ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.ops ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  managedOpsHeading,
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {managedOpsParagraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: managedOpsParagraph }} />
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 max-w-6xl mx-auto">
            {managedOpsCards.map((it, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl text-sm text-foreground/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
                style={cardStyle}
              >
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{it}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-6 text-left">
            {managedOpsButtonText}
          </p>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        ref={setRef("industries")}
        className="relative py-12 lg:py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${visible.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  industriesHeading,
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {industriesCards.map((ind: any, i: number) => {
              const iconName = ind.icon ?? "";
              return (
                <div
                  key={i}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(95,194,227,0.12)] hover:border-accent/30 ${
                    i < 3 ? "md:col-span-1 lg:col-span-2" : "md:col-span-1 lg:col-span-3"
                  } ${i === industriesCards.length - 1 ? "md:col-span-2 lg:col-span-3" : ""} ${visible.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 lg:p-8 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}
                      >
                        <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug">{ind.title}</h3>
                    </div>
                    <div className="flex-1 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: ind.content ?? "" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        ref={setRef("process")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  processHeading,
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {processParagraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: processParagraph }} />
            ) : null}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {processCards.map((p: any, i: number) => {
              const iconName = p.icon ?? "";
              return (
                <div
                  key={i}
                  className={`relative p-6 rounded-2xl transition-all duration-500 ${visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug mb-2">{p.title}</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: p.content ?? "" }} />
                  {p.link_text && p.link_url && (
                    <Link to={p.link_url} className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:gap-2 transition-all">
                      {p.link_text} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section
        ref={setRef("tech")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${visible.tech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  techHeading,
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {techParagraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: techParagraph }} />
            ) : null}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {techCards.map((t: any, i: number) => {
              const iconName = t.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.tech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                    >
                      <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{t.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.content ?? "" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section
        ref={setRef("why")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  whyHeading,
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-5 lg:gap-6">
            {whyCards.map((w: any, i: number) => {
              const iconName = w.icon ?? "";
              return (
                <div
                  key={i}
                  className={`w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)] ${cardBase} ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                    >
                      <DynamicIcon name={iconName} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug">{w.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={setRef("faqs")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-3xl">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.faqs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqsData.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl px-5 border" style={cardStyle}>
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

      {/* CONTACT */}
      <section
        ref={setRef("contact")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className={`transition-all duration-700 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight"
                dangerouslySetInnerHTML={{
                  __html: addClassToSpan(
                    contactHeading,
                    "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                  ),
                }}
              />
              {contactParagraph ? (
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: contactParagraph }} />
              ) : null}
              <ul className="space-y-3 mb-6">
                {contactBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {contactButton && (
                <Button asChild
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                >
                  <Link to={contactButton.cta_url}>
                    {contactButton.cta_text ?? ""}
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

export default CloudDataMigration;
