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

const ConceptCard = ({
  image,
  title,
  desc,
  descHtml,
  benefits,
  useCases,
  benefitsLabel,
  useCasesLabel,
}: {
  image: string;
  title: string;
  desc: string;
  descHtml?: string;
  benefits: string[];
  useCases: string[];
  benefitsLabel: string;
  useCasesLabel: string;
}) => (
  <div
    className="group relative overflow-hidden rounded-2xl transition-all duration-700 hover:-translate-y-1 hover:border-accent/40"
    style={{
      background: "linear-gradient(180deg, rgba(11,18,32,0.85) 0%, rgba(7,11,18,0.92) 100%)",
      border: "1px solid rgba(95,194,227,0.14)",
      boxShadow: "0 10px 40px -20px rgba(0,0,0,0.6)",
    }}
  >
    <div className="relative h-44 sm:h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        loading="lazy"
        width={1024}
        height={768}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,11,18,0.15) 0%, rgba(7,11,18,0.55) 60%, rgba(7,11,18,0.95) 100%)",
        }}
      />
    </div>
    <div className="relative p-6 lg:p-7">
      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 leading-snug">{title}</h3>
      <div className="mb-5">
        {descHtml ? (
          <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: descHtml }} />
        ) : (
          desc.split('\n').filter(Boolean).map((paragraph, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">
              {paragraph}
            </p>
          ))
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {benefits.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
              {benefitsLabel}
            </div>
            <ul className="space-y-1.5">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {useCases.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
              {useCasesLabel}
            </div>
            <ul className="space-y-1.5">
              {useCases.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 flex-shrink-0" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </div>
);

const DataWarehousing = () => {
  const { setRef, inViewMap: visible } = useInViewMap();

  const { data, isLoading, error } = useQuery({
    queryKey: ["data-warehousing"],
    queryFn: api.getDataWarehousing,
  });

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  const bannerSection = pageData?.banner_section ?? {};
  const foundationSection = pageData?.build_a_trusted_foundation_for_analytics_reporting_ai ?? {};
  const comparisonSection = pageData?.data_warehouse_vs_data_lakehouse ?? {};
  const warehousingSection = pageData?.our_data_warehousing_services ?? {};
  const lakehouseSection = pageData?.our_data_lakehouse_services ?? {};
  const decisionSection = pageData?.data_warehouse_vs_data_lakehouse_which_is_right_for_your_business ?? {};
  const platformSection = pageData?.cloud_data_platforms_we_support ?? {};
  const migrationSection = pageData?.data_warehouse_lakehouse_migration_services ?? {};
  const securitySection = pageData?.security_governance_compliance ?? {};
  const whySection = pageData?.why_choose_code1tech_for_warehousing_lakehouse ?? {};
  const contactSection = pageData?.services_get_started_section ?? {};
  const dataEngineerCta = pageData?.data_engineers_security_brief_cta ?? {};
  const cta70Section = pageData?.cta_section_70 ?? {};
  const onDemandCta = pageData?.on_demand_cta ?? {};
  const cta104Section = pageData?.cta_section_104 ?? {};
  const cta77Section = pageData?.cta_section_77 ?? {};
  const cta111Section = pageData?.cta_section_111 ?? {};
  const cta113Section = pageData?.cta_section_113 ?? {};
  const cta114Section = pageData?.cta_section_114 ?? {};

  const heroImage = bannerSection.banner_image?.url;
  const heroHeading = bannerSection.banner_heading ?? "";
  const heroParagraph = bannerSection.banner_description ?? "";
  const heroCtaText = bannerSection.cta_text ?? "";
  const heroCtaLink = bannerSection.cta_url ?? "";
  const heroBackLink = bannerSection.back_service_button ?? "";

  const foundationCards = Array.isArray(foundationSection.cards) ? foundationSection.cards : [];
  const foundationChallengeCard = foundationCards[0] ?? {};
  const foundationBenefitCard = foundationCards[1] ?? {};
  const foundationParagraph = foundationSection.bottom_paragraph ?? "";

  const warehouseCard = Array.isArray(comparisonSection.cards) ? comparisonSection.cards[0] ?? {} : {};
  const lakehouseCard = Array.isArray(comparisonSection.cards) ? comparisonSection.cards[1] ?? {} : {};

  const warehousingServiceCards = Array.isArray(warehousingSection.cards) ? warehousingSection.cards : [];
  const lakehouseServiceCards = Array.isArray(lakehouseSection.cards) ? lakehouseSection.cards : [];
  const platformCards = Array.isArray(platformSection.cards) ? platformSection.cards : [];
  const migrationCards = Array.isArray(migrationSection.cards) ? migrationSection.cards : [];
  const migrationBottomText = migrationSection.bottom_text ?? "";
  const securityCards = Array.isArray(securitySection.cards) ? securitySection.cards : [];
  const whyChooseCards = Array.isArray(whySection.cards) ? whySection.cards : [];
  const decisionCards = Array.isArray(decisionSection.cards) ? decisionSection.cards : [];
  const contactBullets = Array.isArray(contactSection.lists) ? contactSection.lists.map((item: any) => item.list) : [];
  const contactButton = Array.isArray(contactSection.buttons) ? contactSection.buttons[0] : null;
  const faqHeading = pageData?.faq_section_heading ?? "";
  const faqsData = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? "",
        a: item.post_content ?? "",
      }))
    : [];

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
              className={`relative transition-all duration-700 ease-out ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}
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
              <div
                className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block"
                style={{ animation: "pulse 3s ease-in-out infinite" }}
              />
              <div
                className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block"
                style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }}
              />
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

            <div
              className={`transition-all duration-1000 ease-out delay-150 ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
            >
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

        <style>{`
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        `}</style>
      </section>

      {/* ======= TRUSTED FOUNDATION ======= */}
      <section
        ref={setRef("foundation")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Title & Intro */}
          <div
            className={`text-center mb-8 transition-all duration-700 ${visible.foundation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  foundationSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {foundationSection.paragraph ? (
              <p
                className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: foundationSection.paragraph }}
              />
            ) : null}
          </div>

          {/* Two-column Cards — distinct visual personalities */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-10 items-stretch">
            {/* Challenges Card — recessed / muted */}
            <div
              className={`relative rounded-2xl p-6 lg:p-7 transition-all duration-700 ${visible.foundation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(148,163,184,0.14)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 40px rgba(0,0,0,0.25)",
                transitionDelay: "100ms",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.18)" }}
                >
                  <DynamicIcon name={foundationChallengeCard.icon} className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-500" dangerouslySetInnerHTML={{ __html: foundationChallengeCard.label ?? "" }} />
                  <h3 className="text-lg lg:text-xl font-bold text-slate-200 leading-snug" dangerouslySetInnerHTML={{ __html: foundationChallengeCard.title ?? "" }} />
                </div>
              </div>
              <div className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: foundationChallengeCard.content ?? "" }} />
            </div>

            {/* Benefits Card — vibrant / elevated */}
            <div
              className={`relative transition-all duration-700 ${visible.foundation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              {/* Outer ambient glow */}
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-30 blur-md pointer-events-none"
                style={{ background: "linear-gradient(135deg, #004E9E, #5CC8DC)" }}
                aria-hidden
              />
              <div
                className="relative rounded-2xl p-6 lg:p-7 overflow-hidden h-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,78,158,0.10) 0%, rgba(19,42,74,0.55) 100%)",
                  border: "1px solid rgba(92,200,220,0.30)",
                  boxShadow: "0 10px 40px -10px rgba(0,78,158,0.4)",
                }}
              >
                {/* Accent top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #5CC8DC, transparent)" }}
                  aria-hidden
                />
                {/* Background glow blob */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #5CC8DC 0%, transparent 70%)" }}
                  aria-hidden
                />

                <div className="relative flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #004E9E, #5CC8DC)",
                      boxShadow: "0 6px 20px -6px rgba(92,200,220,0.6)",
                    }}
                  >
                    <DynamicIcon name={foundationBenefitCard.icon} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[#5CC8DC]" dangerouslySetInnerHTML={{ __html: foundationBenefitCard.label ?? "" }} />
                    <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: foundationBenefitCard.title ?? "" }} />
                  </div>
                </div>

                <div className="text-sm text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: foundationBenefitCard.content ?? "" }} />
              </div>
            </div>
          </div>

          {/* Connecting Paragraph */}
          <div
            className={`max-w-5xl mx-auto text-center transition-all duration-700 ${visible.foundation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {foundationParagraph}
            </p>
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

      {/* ======= WHAT IS DW vs LAKEHOUSE ======= */}
      <section
        ref={setRef("concepts")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${visible.concepts ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  comparisonSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {comparisonSection.paragraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: comparisonSection.paragraph }} />
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ConceptCard
              image={warehouseCard.image?.url}
              title={warehouseCard.title ?? ""}
              desc=""
              descHtml={warehouseCard.content ?? ""}
              benefits={[]}
              useCases={[]}
              benefitsLabel=""
              useCasesLabel=""
            />
            <ConceptCard
              image={lakehouseCard.image?.url}
              title={lakehouseCard.title ?? ""}
              desc=""
              descHtml={lakehouseCard.content ?? ""}
              benefits={[]}
              useCases={[]}
              benefitsLabel=""
              useCasesLabel=""
            />
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

      {/* ======= WAREHOUSING SERVICES ======= */}
      <section
        ref={setRef("warehousing")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${visible.warehousing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  warehousingSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {warehousingSection.paragraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: warehousingSection.paragraph }} />
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {warehousingServiceCards.map((s: any, i: number) => {
              const iconName = s.i ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.warehousing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
                    <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content ?? "" }} />
                </div>
              );
            })}
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

      {/* ======= LAKEHOUSE SERVICES ======= */}
      <section
        ref={setRef("lakehouse")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-12 transition-all duration-700 ${visible.lakehouse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  lakehouseSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {lakehouseSection.paragraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: lakehouseSection.paragraph }} />
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {lakehouseServiceCards.map((s: any, i: number) => {
              const iconName = s.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.lakehouse ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
                    <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content ?? "" }} />
                </div>
              );
            })}
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

      {/* ======= WHICH IS RIGHT ======= */}
      <section
        ref={setRef("decision")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.decision ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  decisionSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {decisionSection.paragraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: decisionSection.paragraph }} />
            ) : null}
          </div>

          <div
            className={`transition-all duration-700 ${visible.decision ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: "150ms" }}
          >
            {decisionSection.paragraph_second ? (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-5xl mx-auto" dangerouslySetInnerHTML={{ __html: decisionSection.paragraph_second }} />
            ) : null}
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
              {decisionCards.map((item: any, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed p-3 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(148,163,184,0.14)",
                  }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-sm bg-accent/60 flex-shrink-0 rotate-45" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {cta77Section.cta_content ? (
        <InlineCTA
          title={cta77Section.cta_content}
          sub=""
          btn={cta77Section.button_text ?? ""}
          btnUrl={cta77Section.button_url ?? ""}
        />
      ) : null}

      {/* ======= CLOUD PLATFORMS ======= */}
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
            className={`text-center mb-12 transition-all duration-700 ${visible.platforms ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  platformSection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {platformSection.paragraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: platformSection.paragraph }} />
            ) : null}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformCards.map((p: any, i: number) => {
              const iconName = p.icon ?? "";
              return (
                <div
                  key={i}
                  className={`${cardBase} ${visible.platforms ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
                    <h3 className="text-sm font-bold text-foreground leading-snug">{p.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5" dangerouslySetInnerHTML={{ __html: p.tags ?? "" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======= MIGRATION ======= */}
      <section
        ref={setRef("migration")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.migration ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(migrationSection.heading ?? "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            {migrationSection.paragraph ? (
              <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: migrationSection.paragraph }} />
            ) : null}
          </div>

          <div
            className={`mb-8 transition-all duration-700 ${visible.migration ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: "150ms" }}
          >
            {migrationSection.cards_heading ? (
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">{migrationSection.cards_heading}</h3>
            ) : null}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {migrationCards.map((m: any, i: number) => {
                const iconName = m.icon ?? "";
                return (
                  <div
                    key={i}
                    className={`relative p-5 rounded-2xl transition-all duration-500 ${visible.migration ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    style={{ ...cardStyle, transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}
                      >
                        <DynamicIcon name={iconName} className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground leading-snug mb-1">{m.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: m.content ?? "" }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${visible.migration ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: migrationBottomText || "" }} />
          </div>
        </div>
      </section>

      {cta111Section.content ? (
        <InlineCTA
          title={cta111Section.content}
          sub={""}
          btn={cta111Section.button_text ?? ""}
          btnUrl={cta111Section.button_url ?? ""}
        />
      ) : null}

      {/* ======= SECURITY & GOVERNANCE ======= */}
      <section
        ref={setRef("security")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center mb-10 transition-all duration-700 ${visible.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  securitySection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {securitySection.paragraph ? (
              <p
                className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: securitySection.paragraph }}
              />
            ) : null}
          </div>

          <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 mb-4">
            {securityCards.length > 0 &&
              securityCards.map((card: any, i: number) => (
                <div
                  key={i}
                  className={`p-6 lg:p-7 rounded-2xl transition-all duration-700 ${visible.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{ ...cardStyle, transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: card.title ?? "" }} />
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: card.content ?? "" }} />
                </div>
              ))}
          </div>

        </div>
      </section>

      {cta113Section.content ? (
        <InlineCTA
          title={cta113Section.content}
          sub={""}
          btn={cta113Section.button_text ?? ""}
          btnUrl={cta113Section.button_url ?? ""}
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
            className={`text-center mb-12 transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  whySection.heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            {whySection.paragraph ? (
              <p
                className="text-muted-foreground text-sm sm:text-base max-w-5xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: whySection.paragraph }}
              />
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-flow-dense gap-3 auto-rows-[minmax(180px,auto)]">
            {whyChooseCards.map((card: any, i: number) => {
              const iconName = card.icon;
              const spanClass = i === 4 ? "md:col-span-2" : i === 5 ? "md:col-span-3" : "";

              return (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-3xl p-5 transition-all duration-500 hover:border-[#5FC8DC]/40 ${spanClass} ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(148,163,184,0.12)",
                    transitionDelay: `${(i + 1) * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5FC8DC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.25)" }}
                        aria-hidden="true"
                      >
                        <DynamicIcon name={iconName} className="w-5 h-5 text-[#5FC8DC]" />
                      </div>
                      <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: card.title ?? "" }} />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: card.content ?? "" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {cta114Section.content ? (
        <InlineCTA
          title={cta114Section.content}
          sub={""}
          btn={cta114Section.button_text ?? ""}
          btnUrl={cta114Section.button_url ?? ""}
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
            className={`text-center mb-10 transition-all duration-700 ${visible.faqs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(faqHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"),
              }}
            />
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqsData.map((f, i) => (
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
              className={`transition-all duration-700 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection.heading ?? "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {contactSection.paragraph ? (
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: contactSection.paragraph }} />
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
              className={`transition-all duration-700 delay-150 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
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

export default DataWarehousing;
