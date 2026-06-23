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


const cardBase =
  "rounded-2xl p-6 transition-all duration-500 hover:border-accent/30 hover:-translate-y-1";
const cardStyle = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(148,163,184,0.12)",
};

/* Static content replaced by JSON-driven bindings inside the component. */

const ImageFeature = ({
  image,
  imageAlt,
  eyebrow,
  title,
  intro,
  body,
  items,
  itemsLabel,
  reverse,
  
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro: string;
  body?: string;
  items: string[];
  itemsLabel?: string;
  reverse?: boolean;
  
}) => (
  <div
    className={`grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center ${
      reverse ? "lg:[&>*:first-child]:order-2" : ""
    }`}
  >
    <div className="relative">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}
      >
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-[280px] lg:h-[360px] object-cover"
          loading="lazy"
          width={1024}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>
    </div>
    <div>
      {eyebrow && (
        <div className="text-xs font-semibold text-accent uppercase tracking-[0.18em] mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">{intro}</p>
      {body && (
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">{body}</p>
      )}
      {itemsLabel && (
        <div className="text-xs font-semibold text-accent uppercase tracking-[0.18em] mb-3">
          {itemsLabel}
        </div>
      )}
      <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2 mb-5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

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

const DataModelling = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const { data, isLoading, error } = useQuery({
    queryKey: ["data-advanced-engineers"],
    queryFn: api.getDataAdvancedEngineers,
  });

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  const bannerSection = pageData?.banner_section ?? {};
  const platformSection = pageData?.modern_data_platform_design ?? {};
  const vaultSection = pageData?.data_vault_modeling ?? {};
  const meshSection = pageData?.data_mesh_data_fabric_strategy ?? {};
  const cloudSection = pageData?.cloud_data_architecture_services ?? {};
  const processSection = pageData?.our_process_from_data_complexity_to_business_clarity ?? {};
  const engagementSection = pageData?.our_data_architecture_engagement_models ?? {};
  const whySection = pageData?.why_choose_code1tech_for_data_modeling_architecture_services ?? {};
  const industriesSection = pageData?.industries_we_support ?? {};
  const techSection = pageData?.technology_stack_platforms ?? {};
  const securitySection = pageData?.security_compliance ?? {};
  const contactSection = pageData?.services_get_started_section ?? {};
  const dataEngineerCta = pageData?.data_engineers_security_brief_cta ?? {};
  const onDemandCta = pageData?.on_demand_cta ?? {};
  const cta70Section = pageData?.cta_section_70 ?? {};
  const cta104Section = pageData?.cta_section_104 ?? {};
  const cta106Section = pageData?.cta_section_106 ?? {};
  const faqHeading = pageData?.faq_section_heading ?? "";
  const faqsData = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? "",
        a: item.post_content ?? "",
      }))
    : [];

  const platformServices = Array.isArray(platformSection.service_list)
    ? platformSection.service_list.map((item: any) => item.text)
    : [];

  const meshServices = Array.isArray(meshSection.service_list)
    ? meshSection.service_list.map((item: any) => item.text)
    : [];

  const cloudServices = Array.isArray(cloudSection.cards) ? cloudSection.cards : [];

  const processSteps = Array.isArray(processSection.cards) ? processSection.cards : [];

  const engagementModels = Array.isArray(engagementSection.cards) ? engagementSection.cards : [];

  const whyChoose = Array.isArray(whySection.cards) ? whySection.cards : [];

  const industries = Array.isArray(industriesSection.cards) ? industriesSection.cards : [];

  const techStack = Array.isArray(techSection.cards) ? techSection.cards : [];

  const securityItems = Array.isArray(securitySection.cards) ? securitySection.cards : [];

  const contactBullets = Array.isArray(contactSection.lists) ? contactSection.lists.map((item: any) => item.list) : [];
  const contactButton = Array.isArray(contactSection.buttons) ? contactSection.buttons[0] : null;

  const faqs = faqsData;

  const heroImage = bannerSection.banner_image?.url;
  const heroImageAlt = bannerSection.banner_image?.alt;
  const heroCtaText = bannerSection.cta_text ?? "";
  const heroCtaLink = bannerSection.cta_url ?? "";
  const heroBackLink = bannerSection.back_service_button ?? "";
  const heroParagraph = bannerSection.banner_description ?? "";

  const platformHeading = platformSection.heading ?? "";
  const platformDescription = platformSection.paragraph ?? "";
  const platformItemsLabel = platformSection.service_heading ?? "";
  const platformImage = platformSection.image?.url || "";
  const platformImageAlt = platformSection.image?.alt || "";
  const platformBottomParagraph = platformSection.bottom_paragraph ?? "";

  const vaultHeading = vaultSection.heading ?? "";
  const vaultContent = vaultSection.content ?? "";
  const vaultImage = vaultSection.image?.url || "";
  const vaultImageAlt = vaultSection.image?.alt || "";
  const vaultFooter = vaultSection.bottom_paragraph ?? "";

  const meshHeading = meshSection.heading ?? "";
  const meshDescription = meshSection.paragraph ?? "";
  const meshImage = meshSection.image?.url || "";
  const meshImageAlt = meshSection.image?.alt || "";
  const meshServiceHeading = meshSection.service_heading ?? "";
  const meshBottomParagraph = meshSection.bottom_paragraph ?? "";

  const cloudHeading = cloudSection.heading ?? "";
  const cloudDescription = cloudSection.paragraph ?? "";
  const cloudImage = cloudSection.image?.url || "";
  const cloudImageAlt = cloudSection.image?.alt || "";
  const cloudFooter = cloudSection.bottom_paragraph ?? "";

  const processHeading = processSection.heading ?? "";
  const processDescription = processSection.paragraph ?? "";

  const engagementHeading = engagementSection.heading ?? "";
  const engagementDescription = engagementSection.paragraph ?? "";

  const whyHeading = whySection.heading ?? "";
  const whyDescription = whySection.paragraph ?? "";
  const whyBottomButtonText = whySection.bottom_button_text ?? "";
  const whyBottomButtonUrl = whySection.bottom_button_url ?? "";

  const industriesHeading = industriesSection.heading ?? "";
  const industriesDescription = industriesSection.paragraph ?? "";

  const techHeading = techSection.heading ?? "";
  const techDescription = techSection.paragraph ?? "";

  const securityHeading = securitySection.heading ?? "";
  const securityDescription = securitySection.paragraph ?? "";

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
                  alt={heroImageAlt || ""}
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
                  {bannerSection.floating_badge_fields?.[1]?.badge_heading ?? ""}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {bannerSection.floating_badge_fields?.[1]?.badge_text ?? ""}
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
                  {bannerSection.floating_badge_fields?.[0]?.badge_heading ?? ""}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {bannerSection.floating_badge_fields?.[0]?.badge_text ?? ""}
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
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left">
                {heroParagraph ? (
                  <div dangerouslySetInnerHTML={{ __html: heroParagraph }} />
                ) : null}
              </div>
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

        <style>{`
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        `}</style>
      </section>

      {/* ======= MODERN DATA PLATFORM DESIGN ======= */}
      <section
        ref={setRef("platform")}
        data-section="platform"
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${
          visible.platform ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="mb-8 lg:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(platformHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
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
                src={platformImage}
                alt={platformImageAlt}
                className="w-full h-full min-h-[240px] object-cover"
                loading="lazy"
                width={1024}
                height={768}
              />
            </div>

            <div className="rounded-2xl p-8 h-full" style={cardStyle}>
              <div className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: platformDescription }} />
              <div className="text-xs font-semibold text-accent uppercase tracking-[0.18em] mb-3">
                {platformItemsLabel}
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5 mb-5">
                {platformServices.map((it, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-foreground/90"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(148,163,184,0.08)",
                    }}
                  >
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {platformBottomParagraph}
            </p>
          </div>
        </div>
      </section>

      {/* ======= DATA VAULT ======= */}
      <section
        ref={setRef("vault")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${
          visible.vault ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}
              >
                <img
                  src={vaultImage}
                  alt={vaultImageAlt}
                  className="w-full h-[280px] lg:h-[360px] object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(vaultHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: vaultContent }} />
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">{vaultFooter}</p>
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

      {/* ======= MESH & FABRIC ======= */}
      <section
        ref={setRef("mesh")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${
          visible.mesh ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
                  src={meshImage}
                  alt={meshImageAlt}
                  className="w-full h-[280px] lg:h-[360px] object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(meshHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                {meshDescription}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-8">
            {meshSection.cards?.map((card: any, i: number) => (
              <div key={i} className={cardBase} style={cardStyle}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={card.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug">{card.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.content}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 lg:p-8" style={cardStyle}>
            <div className="text-xs font-semibold text-accent uppercase tracking-[0.18em] mb-4">
              {meshServiceHeading}
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2">
              {meshServices.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">{meshBottomParagraph}</p>
          </div>
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

      {/* ======= CLOUD ARCHITECTURE ======= */}
      <section
        ref={setRef("cloud")}
        className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${
          visible.cloud ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-8 lg:gap-12 items-center mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(cloudHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                {cloudDescription}
              </p>
            </div>
            <div className="relative">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}
              >
                <img
                  src={cloudImage}
                  alt={cloudImageAlt}
                  className="w-full h-[280px] lg:h-[360px] object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {cloudServices.map((c, i) => (
              <div key={i} className={cardBase} style={cardStyle}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={c.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-snug">{c.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">{cloudFooter}</p>
          </div>
        </div>
      </section>

      {cta70Section.content ? (
        <InlineCTA
          title={cta70Section.content}
          sub=""
          btn={cta70Section.cta_text ?? ""}
          btnUrl={cta70Section.cta_url ?? ""}
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
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              {processDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {processSteps.map((p, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-2xl transition-all duration-500 ${
                  visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={p.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug">{p.title}</h3>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: p.content ?? "" }} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {cta104Section.heading ? (
        <InlineCTA
          title={cta104Section.heading}
          sub={cta104Section.paragraph ?? ""}
          btn={cta104Section.button_text ?? ""}
          btnUrl={cta104Section.button_url ?? ""}
        />
      ) : null}

      {/* ======= ENGAGEMENT MODELS ======= */}
      <section
        ref={setRef("engagement")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.engagement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(engagementHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              {engagementDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-10">
            {engagementModels.map((m, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 hover:-translate-y-2 ${
                  visible.engagement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,18,32,0.6) 0%, rgba(7,11,18,0.95) 100%)",
                  border: "1px solid rgba(95,194,227,0.15)",
                  transitionDelay: `${i * 120}ms`,
                  boxShadow: "0 14px 50px -24px rgba(0,0,0,0.7)",
                }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={m.image.url}
                    alt={m.image.alt || m.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7,11,18,0.25) 0%, rgba(7,11,18,0.65) 65%, rgba(7,11,18,1) 100%)",
                    }}
                  />
                  <span
                    className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md"
                    style={{
                      background: "rgba(95,194,227,0.12)",
                      border: "1px solid rgba(95,194,227,0.35)",
                      color: "#5FC2E3",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {m.label}
                  </span>
                </div>

                <div className="relative px-6 pb-7 -mt-5">
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(95,194,227,0.05)",
                        border: "1px solid rgba(95,194,227,0.20)",
                        boxShadow: "0 0 0 6px rgba(7,11,18,0.95)",
                      }}
                    >
                      <RenderIcon icon={m.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.content}</p>
                  <div
                    className="mt-5 h-px w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(95,194,227,0.45), transparent)",
                    }}
                  />
                  <Link
                    to={m.link_url || "#"}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-2 transition-all"
                  >
                    {m.link_text} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {cta106Section.heading ? (
        <InlineCTA
          title={cta106Section.heading}
          sub={cta106Section.paragraph ?? ""}
          btn={cta106Section.button_text ?? ""}
          btnUrl={cta106Section.button_url ?? ""}
        />
      ) : null}

      {/* ======= WHY CHOOSE ======= */}
      <section
        ref={setRef("why")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              {whyDescription}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 lg:gap-6">
            {whyChoose.map((w, i) => (
              <div
                key={i}
                className={`w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)] ${cardBase} ${
                  visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={w.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.content}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to={whyBottomButtonUrl}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
              >
                {whyBottomButtonText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
                  <div className="flex-1" dangerouslySetInnerHTML={{ __html: ind.content ?? "" }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ======= TECH STACK ======= */}
      <section
        ref={setRef("tech")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.tech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(techHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              {techDescription}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {techStack.map((t, i) => (
              <div
                key={i}
                className={`${cardBase} ${
                  visible.tech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                  >
                    <RenderIcon icon={t.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{t.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5" dangerouslySetInnerHTML={{ __html: t.content ?? "" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= SECURITY ======= */}
      <section
        ref={setRef("security")}
        className="relative py-12 lg:py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
              visible.security
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(securityHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              {securityDescription}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 lg:gap-6 max-w-6xl mx-auto">
            {securityItems.map((s, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(95,194,227,0.12)] hover:border-accent/30 w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)] ${
                  visible.security
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ ...cardStyle, transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(95,194,227,0.08)",
                        border: "1px solid rgba(95,194,227,0.20)",
                      }}
                    >
                      <RenderIcon icon={s.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {s.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ======= FAQ ======= */}
      <section
        ref={setRef("faqs")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
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
              <Button asChild
                size="lg"
                className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
              >
                <Link to={contactButton?.cta_url ?? ""}>
                  {contactButton?.cta_text ?? ""}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
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

export default DataModelling;
