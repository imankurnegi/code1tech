import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { useInViewMap } from "@/hooks/useInView";


const cardStyle = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(148,163,184,0.12)",
};

// ─── DATA ────────────────────────────────────────────────────────────────

const InlineCTA = ({ title, sub, btn, btnUrl }: { title: string; sub: string; btn: string; btnUrl: string }) => (
  <div style={{ background: "#070B12" }} className="py-4">
    <div className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-5 px-4 sm:px-7 py-6" style={{ background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)", border: "1px solid rgba(148,163,184,0.15)", boxShadow: "0 4px 32px rgba(0,0,0,0.6)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", filter: "blur(24px)" }} />
          <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
        </div>
        <div className="flex-1 relative z-10 text-left">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{sub}</p>
        </div>
        <Link to={btnUrl} className="flex-shrink-0 relative z-10">
          <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
            {btn}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

function decodeHTMLEntities(str: string) {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

const ChallengeTabs = ({ tabs }: { tabs: any[] }) => {
  const [active, setActive] = useState(0);
  const m = tabs[active];
  
  if (!m) return null;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 lg:gap-6 items-start">
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar p-2 rounded-2xl self-start h-fit"
        style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.55), rgba(11,18,32,0.35))", border: "1px solid rgba(148,163,184,0.12)" }}>
        {tabs.map((t, i) => {
          const isActive = i === active;
          return (
            <button key={i} type="button" onClick={() => setActive(i)}
              className={`group relative flex items-center gap-3 text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex-shrink-0 lg:flex-shrink ${isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"}`}
              style={isActive ? { border: "1px solid rgba(95,194,227,0.32)", boxShadow: "0 0 24px rgba(95,194,227,0.10) inset" } : { border: "1px solid rgba(148,163,184,0.08)" }}>
              {isActive && <span className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-[#5FC2E3] to-[#0077B6]" />}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isActive ? "scale-105" : ""}`}
                style={{ background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.20), rgba(0,119,182,0.14))" : "rgba(95,194,227,0.08)", border: isActive ? "1px solid rgba(95,194,227,0.35)" : "1px solid rgba(95,194,227,0.18)" }}>
                <DynamicIcon name={t.icon} className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-sm font-semibold leading-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>{t.title}</div>
              </div>
            </button>
          );
        })}
      </div>
      <div key={active} className="relative rounded-2xl overflow-hidden animate-fade-in self-start h-fit"
        style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.7), rgba(11,18,32,0.5))", border: "1px solid rgba(148,163,184,0.12)", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
        <div className="p-5 lg:p-7 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.10))", border: "1px solid rgba(95,194,227,0.28)" }}>
              <DynamicIcon name={m.icon} className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-snug text-left">{m.title}</h3>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">{m.content}</p>
          <div className="mt-5 h-px w-12 bg-accent/40" />
        </div>
      </div>
    </div>
  );
};

const BigDataSolutions = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const [activeSol, setActiveSol] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeWhy, setActiveWhy] = useState(0);

  const { data, isLoading, error } = useQuery({
      queryKey: ["big-data-engineers"],
      queryFn: api.getBigDataEngineers,
    });
  
    if (isLoading) return null;
    if (error) return null;
  
    const pageData = data?.data;

  // Extract data from JSON with defensive fallbacks
  const bannerSection = pageData?.banner_section ?? {};
  const whyInvestSection = pageData?.why_organizations_invest_in_big_data_services ?? {};
  const dataEngineerCta = pageData?.data_engineers_security_brief_cta ?? {};
  const ourBigDataServices = pageData?.our_big_data_services ?? {};
  const consultingServices = pageData?.big_data_consulting_services ?? {};
  const dataLakeWarehouse = pageData?.data_lake_data_warehouse_solutions ?? {};
  const engineeringServices = pageData?.big_data_engineering_services ?? {};
  const solutionsSection = pageData?.big_data_solutions_for_analytics_ai_and_innovation ?? {};
  const onDemandCta = pageData?.on_demand_cta ?? {};
  const processSection = pageData?.how_our_big_data_experts_help_you ?? {};
  const industriesSection = pageData?.big_data_use_cases_across_industries ?? {};
  const cta106Section = pageData?.cta_section_106 ?? {};
  const cta104Section = pageData?.cta_section_104 ?? {};
  const whyChooseSection = pageData?.why_choose_code1_tech_systems_for_big_data_services ?? {};
  const ctaTestimonials = pageData?.cta_testimonials_button ?? {};
  const contactSection = pageData?.services_get_started_section ?? {};
  const bigDataArchitecturePlatformDevelopmentSection = pageData?.big_data_architecture_platform_development ?? {};

  // Extract specific data with fallbacks
  const heroImage = bannerSection.banner_image?.url;
  const heroHeading = bannerSection.banner_heading ?? "";
  const heroParagraph = bannerSection.banner_description ?? "";
  const heroCtaText = bannerSection.cta_text ?? "";
  const heroCtaLink = bannerSection.cta_url ?? "/contactus";
  const heroBackLink = bannerSection.back_service_button ?? "";
  const floatingBadges = Array.isArray(bannerSection.floating_badge_fields) ? bannerSection.floating_badge_fields : [];

  const whyInvestHeading = whyInvestSection.heading ?? "";
  const whyInvestParagraph = whyInvestSection.paragraph ?? "";
  const whyInvestTabs = Array.isArray(whyInvestSection.tabs) ? whyInvestSection.tabs : [];

  const ourServicesHeading = ourBigDataServices.heading ?? "";
  const ourServicesContent = ourBigDataServices.content ?? "";
  const ourServicesCtaText = ourBigDataServices.cta_text ?? "";
  const ourServicesCtaUrl = ourBigDataServices.cta_url ?? "/contactus";
  const ourServicesImage = ourBigDataServices.image?.url;

  const consultingHeading = consultingServices.heading ?? "";
  const consultingParagraph = consultingServices.paragraph ?? "";
  const consultingButtonText = consultingServices.button_text ?? "";
  const consultingButtonUrl = consultingServices.button_url ?? "/contactus";
  const consultingCards = Array.isArray(consultingServices.cards) ? consultingServices.cards : [];

  const dataLakeHeading = dataLakeWarehouse.heading ?? "";
  const dataLakeParagraph = dataLakeWarehouse.paragraph ?? "";
  const dataLakeServiceText = dataLakeWarehouse.service_text ?? "";
  const dataLakeBlocks = Array.isArray(dataLakeWarehouse.blocks) ? dataLakeWarehouse.blocks : [];
  const dataLakeBottomText = dataLakeWarehouse.bottom_text ?? "";
  const dataLakeButtonText = dataLakeWarehouse.button_text ?? "";
  const dataLakeButtonUrl = dataLakeWarehouse.button_url ?? "/contactus";

  const engineeringHeading = engineeringServices.heading ?? "";
  const engineeringParagraph = engineeringServices.paragraph ?? "";
  const engineeringListHeading = engineeringServices.list_heading ?? "";
  const engineeringLists = Array.isArray(engineeringServices.lists) ? engineeringServices.lists : [];
  const engineeringBottomText = engineeringServices.bottom_text ?? "";
  const engineeringButtonText = engineeringServices.bottom_button_text ?? "";
  const engineeringButtonUrl = engineeringServices.bottom_button_url ?? "/contactus";

  const solutionsHeading = solutionsSection.heading ?? "";
  const solutionsParagraph = solutionsSection.paragraph ?? "";
  const solutionsTabs = Array.isArray(solutionsSection.tabs) ? solutionsSection.tabs : [];

  const processHeading = processSection.heading ?? "";
  const processParagraph = processSection.paragraph ?? "";
  const processTabs = Array.isArray(processSection.tabs) ? processSection.tabs : [];

  const industriesHeading = industriesSection.heading ?? "";
  const industriesParagraph = industriesSection.paragraph ?? "";
  const industryCards = Array.isArray(industriesSection.cards) ? industriesSection.cards : [];

  const whyChooseHeading = whyChooseSection.heading ?? "";
  const whyChooseParagraph = whyChooseSection.paragraph ?? "";
  const whyChooseCards = Array.isArray(whyChooseSection.cards) ? whyChooseSection.cards : [];

  const contactHeading = contactSection.heading ?? "";
  const contactParagraph = contactSection.paragraph ?? "";
  const contactButtons = Array.isArray(contactSection.buttons) ? contactSection.buttons : [];
  const contactButton = contactButtons[0] ?? null;

  const architectureImage = bigDataArchitecturePlatformDevelopmentSection.left_image?.url ?? "";
  const architectureImageAlt = bigDataArchitecturePlatformDevelopmentSection.left_image?.alt ?? "";
  const architectureImageCaptionTop = bigDataArchitecturePlatformDevelopmentSection.top_left_text ?? "";
  const architectureImageCaptionBottom = bigDataArchitecturePlatformDevelopmentSection.bottom_left_text ?? "";
  const architectureHeading = bigDataArchitecturePlatformDevelopmentSection.heading ?? "";
  const architectureParagraph = bigDataArchitecturePlatformDevelopmentSection.paragraph ?? "";
  const architectureBlocks = Array.isArray(bigDataArchitecturePlatformDevelopmentSection.blocks) ? bigDataArchitecturePlatformDevelopmentSection.blocks : [];
  const architectureChecklistBottomParagraph = bigDataArchitecturePlatformDevelopmentSection.bottom_text ?? "";
  const architectureChecklistButtonText = bigDataArchitecturePlatformDevelopmentSection.button_text ?? "";
  const architectureChecklistButtonUrl = bigDataArchitecturePlatformDevelopmentSection.button_url ?? "/contactus";

  return (
    <>
      <SeoTags
              title={pageData?.seo?.title}
              description={pageData?.seo?.description}
              ogImage={pageData?.seo?.og_image}
              schema={pageData?.schema}
            />
      {/* HERO */}
      <section ref={setRef("hero")} className="relative py-10 lg:py-16 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)" }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none hidden md:block" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.10) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none hidden md:block" style={{ background: "radial-gradient(circle, rgba(0,78,158,0.12) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 lg:pt-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center">
            <div className={`relative transition-all duration-700 ease-out ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={heroImage} alt={bannerSection.banner_image?.alt || ""} className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="eager" width={1280} height={896} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              </div>
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
              {floatingBadges[1] && (
                <div className={`absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ background: "rgba(10,15,30,0.85)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "float 6s ease-in-out infinite" }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{floatingBadges[1].badge_heading ?? ""}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{floatingBadges[1].badge_text ?? ""}</div>
                </div>
              )}
              {floatingBadges[0] && (
                <div className={`absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ background: "rgba(10,15,30,0.85)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "float 5s ease-in-out infinite", animationDelay: "2s" }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{floatingBadges[0].badge_heading ?? ""}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{floatingBadges[0].badge_text ?? ""}</div>
                </div>
              )}
            </div>
            <div className={`transition-all duration-1000 ease-out delay-150 ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              {heroBackLink ? (
                <Link to={heroBackLink} className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                  ← Data Science
                </Link>
              ) : null}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {heroParagraph ? (
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: heroParagraph }} />
              ) : null}
              {bannerSection.highlighted_text && (
                <p className="text-sm sm:text-base text-foreground/85 font-medium mb-4 text-left">{bannerSection.highlighted_text}</p>
              )}
              <Link to={heroCtaLink}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {heroCtaText}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
      </section>

      {/* WHY INVEST — TABS */}
      <section ref={setRef("why-invest")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible["why-invest"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-8 lg:gap-10 mb-7 lg:mb-9 items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyInvestHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed lg:pb-2" dangerouslySetInnerHTML={{ __html: whyInvestParagraph }} />
          </div>
          <ChallengeTabs tabs={whyInvestTabs} />
        </div>
      </section>

      {dataEngineerCta.heading ? (
        <InlineCTA
          title={dataEngineerCta.heading}
          sub={dataEngineerCta.content ?? ""}
          btn={dataEngineerCta.cta_text ?? ""}
          btnUrl={dataEngineerCta.cta_url ?? "/contactus"}
        />
      ) : null}

      {/* COMPREHENSIVE BANNER */}
      <section ref={setRef("comprehensive")}
        className={`relative py-8 lg:py-10 overflow-hidden transition-all duration-700 ${visible.comprehensive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "#070B12" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="relative rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(148,163,184,0.15)" }}>
            {ourServicesImage && (
              <img src={ourServicesImage} alt={ourBigDataServices.image?.alt || ""} className="absolute inset-0 w-full h-full object-cover opacity-55" loading="lazy" width={1920} height={1080} />
            )}
            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(7,11,18,0.95) 0%, rgba(11,18,32,0.85) 45%, rgba(11,18,32,0.35) 100%)" }} />
            <div className="relative z-10 grid lg:grid-cols-[7fr_5fr] gap-8 p-7 sm:p-10 lg:p-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(ourServicesHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
                {ourServicesContent && (
                  <div className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl space-y-3" dangerouslySetInnerHTML={{ __html: ourServicesContent }} />
                )}
              </div>
              <div className="flex lg:justify-end">
                <Link to={ourServicesCtaUrl} className="w-full sm:w-auto">
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(0,194,255,0.35)] hover:shadow-[0_0_50px_rgba(0,194,255,0.55)] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                    {ourServicesCtaText}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIG DATA CONSULTING — STICKY + CHECKLIST */}
      <section ref={setRef("bd-consulting")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible["bd-consulting"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-[1.08] text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(consultingHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: consultingParagraph }} />
              {consultingServices.highlighted_text && (
                <p className="text-foreground/85 text-sm font-medium mb-6">{consultingServices.highlighted_text}</p>
              )}
              <Link to={consultingButtonUrl}>
                <Button variant="outline" className="group border-accent/40 hover:bg-accent/10">
                  {consultingButtonText}
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {consultingCards.map((card, i) => (
                <div key={i} className="group relative rounded-2xl p-5 lg:p-6 transition-all duration-500 hover:-translate-y-1 overflow-hidden" style={cardStyle}>
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(420px circle at 0% 0%, rgba(95,194,227,0.10), transparent 60%)" }} />
                  <div className="absolute left-0 top-5 bottom-5 w-[2px] bg-gradient-to-b from-[#5FC2E3]/60 to-[#0077B6]/0 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-105" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.12), rgba(0,119,182,0.08))", border: "1px solid rgba(95,194,227,0.22)" }}>
                      <DynamicIcon name={card.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] lg:text-[16px] font-semibold text-foreground leading-snug">{card.label}</h3>
                      <div className="mt-3 h-px w-8 bg-accent/30 group-hover:w-20 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* ARCHITECTURE — IMAGE COLLAGE + RIGHT CHECKLIST */}
      <section ref={setRef("architecture")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.architecture ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 rounded-[2rem] opacity-[0.08] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
              <div className="relative rounded-3xl overflow-hidden group" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(95,194,227,0.12)", border: "1px solid rgba(95,194,227,0.18)" }}>
                <img src={architectureImage} alt={architectureImageAlt} className="w-full h-[420px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" width={1024} height={1024} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0077B6]/10 via-transparent to-[#5FC2E3]/10 mix-blend-overlay" />
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md" style={{ background: "rgba(10,15,30,0.72)", border: "1px solid rgba(95,194,227,0.3)" }}>
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/90 font-mono">{architectureImageCaptionTop}</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-8 p-5 rounded-2xl backdrop-blur-xl max-w-[260px] hidden sm:block" style={{ background: "rgba(10,15,30,0.94)", border: "1px solid rgba(95,194,227,0.3)", boxShadow: "0 16px 50px rgba(0,0,0,0.55)" }}>
                <div className="text-sm font-semibold text-foreground leading-snug">{architectureImageCaptionBottom}</div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.08] text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(architectureHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base leading-relaxed mb-7">
                {architectureParagraph}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-7">
                {architectureBlocks?.length > 0 && architectureBlocks.map((t, i) => {
                  return (
                    <div key={i} className="group relative flex items-start gap-3 p-3.5 rounded-xl transition-all duration-400 hover:-translate-y-0.5 overflow-hidden"
                      style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.55), rgba(11,18,32,0.35))", border: "1px solid rgba(148,163,184,0.12)" }}>
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(280px circle at 0% 0%, rgba(95,194,227,0.10), transparent 60%)" }} />
                      <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#5FC2E3]/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.14), rgba(0,119,182,0.08))", border: "1px solid rgba(95,194,227,0.22)" }}>
                        <DynamicIcon name={t.icon} className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm text-foreground/90 leading-snug pt-1.5 relative">{t.label}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-foreground/85 text-sm font-medium mb-5">{architectureChecklistBottomParagraph}</p>
              <Link to={architectureChecklistButtonUrl}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-7 py-5 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {architectureChecklistButtonText}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DATA LAKE & WAREHOUSE + BIG DATA ENGINEERING — TWO COMPACT CARDS */}
      <section ref={setRef("lake-engineering")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible["lake-engineering"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Data Lake & Warehouse */}
          <div className="rounded-2xl p-6 lg:p-8" style={cardStyle}>
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 leading-snug text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(dataLakeHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: dataLakeParagraph }} />
            {dataLakeServiceText && (
              <p className="text-foreground/85 text-sm font-medium mb-4">{dataLakeServiceText}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
              {dataLakeBlocks.map((block, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.15)" }}>
                  <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.12)", border: "1px solid rgba(95,194,227,0.22)" }}>
                    <DynamicIcon name={block.icon} className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-[13px] text-foreground/90 leading-snug">{block.label}</span>
                </div>
              ))}
            </div>
            {dataLakeBottomText && (
              <p className="text-foreground/85 text-sm font-medium mb-4">{dataLakeBottomText}</p>
            )}
            <Link to={dataLakeButtonUrl}>
              <Button variant="outline" className="group border-accent/40 hover:bg-accent/10">
                {dataLakeButtonText}
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Big Data Engineering */}
          <div className="rounded-2xl p-6 lg:p-8" style={cardStyle}>
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 leading-snug text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(engineeringHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: engineeringParagraph }} />
            {engineeringListHeading && (
              <p className="text-foreground/85 text-sm font-medium mb-4">{engineeringListHeading}</p>
            )}
            <ul className="space-y-2.5 mb-6">
              {engineeringLists.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 leading-snug">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            {engineeringBottomText && (
              <p className="text-foreground/85 text-sm font-medium mb-4">{engineeringBottomText}</p>
            )}
            <Link to={engineeringButtonUrl}>
              <Button variant="outline" className="group border-accent/40 hover:bg-accent/10">
                {engineeringButtonText}
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SOLUTIONS — BENTO TABS */}
      <section ref={setRef("solutions")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.solutions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto mb-7 lg:mb-9 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(solutionsHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.75] max-w-5xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: solutionsParagraph }} />
          </div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-4 lg:gap-6 items-start">
            <div className="rounded-2xl p-3 lg:p-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar self-start h-fit" style={cardStyle}>
              {solutionsTabs.map((s, i) => {
                const active = activeSol === i;
                return (
                  <button key={i} onClick={() => setActiveSol(i)}
                    className="group relative flex items-center gap-3 rounded-xl px-3 py-3 lg:py-3.5 text-left transition-all duration-300 flex-shrink-0 lg:flex-shrink"
                    style={{
                      background: active ? "linear-gradient(135deg, rgba(0,78,158,0.35) 0%, rgba(95,194,227,0.12) 100%)" : "transparent",
                      border: active ? "1px solid rgba(95,194,227,0.40)" : "1px solid rgba(95,194,227,0.08)",
                      boxShadow: active ? "0 0 24px rgba(95,194,227,0.18) inset" : "none",
                    }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: active ? "rgba(95,194,227,0.20)" : "rgba(95,194,227,0.06)", border: "1px solid rgba(95,194,227,0.20)" }}>
                      <DynamicIcon name={s.icon} className="w-4 h-4 text-accent" />
                    </div>
                    <span className={`text-sm font-semibold leading-tight whitespace-nowrap lg:whitespace-normal ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{s.title}</span>
                    {active && <span className="hidden lg:block absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-[#5FC2E3] to-[#0077B6]" />}
                  </button>
                );
              })}
            </div>

            <div className="relative rounded-2xl overflow-hidden self-start h-fit" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.85) 0%, rgba(8,13,24,0.95) 100%)", border: "1px solid rgba(95,194,227,0.22)", boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 40px rgba(95,194,227,0.06)" }}>
              <div dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(solutionsTabs[activeSol].content) }} />
            </div>
          </div>
        </div>
      </section>

      {onDemandCta.heading ? (
        <InlineCTA
          title={onDemandCta.heading}
          sub={onDemandCta.content ?? ""}
          btn={onDemandCta.cta_text ?? ""}
          btnUrl={onDemandCta.cta_url ?? "/contactus"}
        />
      ) : null}

      {/* PROCESS — STEPPER */}
      <section ref={setRef("process")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(95,194,227,0.10) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto mb-6 lg:mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(processHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base leading-[1.75] max-w-4xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: processParagraph }} />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative mb-6 lg:mb-8">
              <div className="absolute top-7 left-0 right-0 h-px hidden md:block" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(95,194,227,0.25) 8%, rgba(95,194,227,0.25) 92%, transparent 100%)" }} />
              <div className="absolute top-7 left-0 h-px hidden md:block transition-all duration-500" style={{ width: `${(activeStep / (processTabs.length - 1)) * 100}%`, background: "linear-gradient(90deg, #5FC2E3 0%, #0077B6 100%)", boxShadow: "0 0 12px rgba(95,194,227,0.6)" }} />
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 relative">
                {processTabs.map((p, i) => {
                  const isActive = activeStep === i;
                  const isPast = i < activeStep;
                  return (
                    <button key={i} onClick={() => setActiveStep(i)} className="group flex flex-col items-center text-center gap-2 outline-none">
                      <div className="relative">
                        {isActive && <div className="absolute inset-0 rounded-full blur-md" style={{ background: "rgba(95,194,227,0.7)" }} />}
                        <div className="relative w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all duration-300"
                          style={isActive || isPast
                            ? { background: "linear-gradient(135deg, #5FC2E3 0%, #0077B6 100%)", border: "2px solid rgba(11,18,32,1)", boxShadow: isActive ? "0 0 0 5px rgba(95,194,227,0.18)" : "none", color: "#fff" }
                            : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(148,163,184,0.20)", color: "rgba(148,163,184,0.85)" }}>
                          <DynamicIcon name={p.icon} className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className={`text-[11px] leading-tight mt-0.5 font-medium transition-colors line-clamp-2 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} dangerouslySetInnerHTML={{ __html: p.title }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div key={activeStep} className="relative rounded-2xl p-6 lg:p-8 animate-fade-in overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(14,21,37,0.95) 0%, rgba(11,18,32,0.98) 100%)", border: "1px solid rgba(95,194,227,0.18)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.12) 0%, transparent 70%)" }} />
              <div className="relative grid md:grid-cols-[auto_1fr] gap-5 lg:gap-7 items-start">
                <div className="flex md:flex-col items-center md:items-start gap-3">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18) 0%, rgba(0,119,182,0.18) 100%)", border: "1px solid rgba(95,194,227,0.35)" }}>
                    <DynamicIcon name={processTabs[activeStep]?.icon} className="w-8 h-8 lg:w-10 lg:h-10 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug mb-3" dangerouslySetInnerHTML={{ __html: processTabs[activeStep]?.title }} />
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: processTabs[activeStep]?.content }} />
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border/40">
                    <button onClick={() => setActiveStep((s) => Math.max(0, s - 1))} disabled={activeStep === 0}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all">
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Prev
                    </button>
                    <button onClick={() => setActiveStep((s) => Math.min(processTabs.length - 1, s + 1))} disabled={activeStep === processTabs.length - 1}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all">
                      Next <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cta104Section.heading ? (
        <InlineCTA
          title={cta104Section.heading}
          sub={cta104Section.paragraph ?? ""}
          btn={cta104Section.button_text ?? ""}
          btnUrl={cta104Section.button_url ?? "/contactus"}
        />
      ) : null}

      {/* INDUSTRIES */}
      <section ref={setRef("industries")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mb-7 lg:mb-9">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.08] mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base leading-[1.75] max-w-4xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: industriesParagraph }} />
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-stretch gap-5">
            {industryCards.map((ind, i) => (
              <article key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                style={{ border: "1px solid rgba(148,163,184,0.12)", background: "rgba(255,255,255,0.025)" }}>
                <div className="relative h-44 flex-shrink-0 overflow-hidden">
                  <img src={ind.image?.url} alt={ind.image?.alt || ""} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.2) 0%, rgba(11,18,32,0.95) 100%)" }} />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md" style={{ background: "rgba(11,18,32,0.7)", border: "1px solid rgba(95,194,227,0.30)" }}>
                    <DynamicIcon name={ind.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent mb-1.5 leading-none" dangerouslySetInnerHTML={{ __html: ind.label }} />
                    <h3 className="text-lg font-bold text-foreground leading-tight" dangerouslySetInnerHTML={{ __html: ind.title }} />
                  </div>
                </div>
                <div className="px-5 py-5 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground leading-[1.65] text-left">{ind.content}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {cta106Section.heading ? (
        <InlineCTA
          title={cta106Section.heading}
          sub={cta106Section.paragraph ?? ""}
          btn={cta106Section.button_text ?? ""}
          btnUrl={cta106Section.button_url ?? "/contactus"}
        />
      ) : null}

      {/* WHY CHOOSE */}
      <section ref={setRef("why")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(95,194,227,0.10) 0%, transparent 70%)", filter: "blur(50px)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(0,119,182,0.10) 0%, transparent 70%)", filter: "blur(50px)" }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto mb-6 lg:mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyChooseHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base leading-[1.75] max-w-4xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: whyChooseParagraph }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-fr mb-6 lg:mb-8">
            {whyChooseCards.map((w, i) => (
              <article key={i}
                className="group relative rounded-2xl p-5 lg:p-6 flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: "linear-gradient(135deg, rgba(14,21,37,0.95) 0%, rgba(11,18,32,0.98) 100%)", border: "1px solid rgba(95,194,227,0.18)" }}>
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(95,194,227,0.16) 0%, transparent 70%)" }} />
                <div className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"
                  style={{ background: "linear-gradient(180deg, #5FC2E3 0%, #0077B6 100%)" }} />
                <div className="relative flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18) 0%, rgba(0,119,182,0.18) 100%)", border: "1px solid rgba(95,194,227,0.30)" }}>
                    <DynamicIcon name={w.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base lg:text-[17px] font-bold text-foreground leading-snug">{w.title}</h3>
                </div>
                <p className="relative text-sm text-muted-foreground leading-[1.65] text-left">{w.content}</p>
              </article>
            ))}
          </div>


          <div className="relative rounded-2xl px-5 py-5 lg:px-8 lg:py-6 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6" style={{ background: "linear-gradient(110deg, rgba(0,78,158,0.18) 0%, rgba(95,194,227,0.06) 100%)", border: "1px solid rgba(95,194,227,0.22)" }}>
            <DynamicIcon name={ctaTestimonials.icon} className="w-8 h-8 text-accent/50 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">{ctaTestimonials.top_text ?? ""}</div>
              <p className="text-base lg:text-lg font-bold text-foreground leading-snug">
                {ctaTestimonials.content ?? ""}
              </p>
            </div>
            <Link to={ctaTestimonials.button_url ?? "/contactus"} className="flex-shrink-0">
              <Button variant="hero" size="lg" className="group">
                {ctaTestimonials.button_text ?? ""}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={setRef("contact")} className="relative py-8 lg:py-12 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className={`transition-all duration-700 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.08]" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="space-y-3 text-muted-foreground text-sm sm:text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: contactParagraph }} />
              {contactButton && (
                <Link to={contactButton.cta_url ?? "/contactus"}>
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                    {contactButton.cta_text ?? ""}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              )}
            </div>
            <div className={`transition-all duration-700 delay-150 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
      <section style={{ display: "none" }} className="lg:grid-cols-[1.1fr_1fr]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60 bg-[rgba(95,194,227,0.06)] border border-[rgba(95,194,227,0.15)]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60 bg-[rgba(95,194,227,0.08)] border border-[rgba(95,194,227,0.2)]"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60"></span>
      </section>
    </>
  );
};

export default BigDataSolutions;
