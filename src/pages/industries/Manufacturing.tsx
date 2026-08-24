import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import ContactUsForm from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallback";
import { Faqs } from "@/components/Faqs";

const CTABanner = ({ text, buttonText, linkUrl }: { text: string; buttonText: string; linkUrl?: string }) => (
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
      <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{text}</h3>
    </div>
    <Link to={linkUrl || ""} className="flex-shrink-0 relative z-10">
      <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
        {buttonText}
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
  </div>
);

type CardItem = { icon: string; title: string; desc: string; image?: any };

const GlassCard = ({ item }: { item: CardItem }) => (
  <div className="group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/20">
    <div className="absolute inset-0 bg-gradient-to-br from-accent via-transparent to-primary opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative h-full bg-background/80 backdrop-blur-2xl rounded-2xl p-6 flex flex-col gap-4 border border-foreground/5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-accent/30 group-hover:border-accent transition-colors duration-500 flex-shrink-0">
          <DynamicIcon name={item.icon} className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-base font-semibold text-foreground leading-tight text-left">{item.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed text-left">{item.desc}</p>
    </div>
  </div>
);

const ServiceCard = ({ item }: { item: CardItem }) => (
  <div className="group relative h-full overflow-hidden rounded-xl border border-foreground/10 bg-background/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-primary opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="flex h-full items-start gap-4 p-5 pl-6 sm:gap-5 sm:p-6 sm:pl-7">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/15">
        <DynamicIcon name={item.icon} className="h-6 w-6 text-accent" />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <h3 className="mb-2 text-base font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent sm:text-lg">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
      </div>
    </div>
  </div>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <section
    className="py-8 lg:py-12 relative overflow-hidden"
    style={{
      background:
        "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)",
    }}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div>
  </section>
);

const SectionHeader = ({ title, desc }: { title: string; desc: string }) => (
  <div className="max-w-5xl mb-10 mx-auto text-center">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-center mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(title, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
    <p className="text-base text-muted-foreground leading-[1.75] text-center">{desc}</p>
  </div>
);

const Manufacturing = () => {
  const { data, isLoading, error } = useQuery({
        queryKey: ["manufacturing-engineers"],
        queryFn: api.getManufacturingEngineers,
      });

      if (isLoading) return <LoadingSkeleton type="hero" />;
        if (error) return <ErrorFallback error={error as Error} onRetry={() => window.location.reload()} />

    const pageData = data?.data;

// ─── DATA MAPPING ────────────────────────────────────────────────────────────────
const heroBanner = pageData?.industries_banner;
const businessOutcomesSection = pageData?.business_outcomes_that_drive_real_estate_growth;
const ourServicesSection = pageData?.our_services_industries;
const aiSolutionsSection = pageData?.build_secure_scalable_saas_solutions;
const manufacturingSolutionsSection = pageData?.manufacturing_solutions_we_build;
const businessChallengesSection = pageData?.business_challenges_industries;
const industriesSection = pageData?.industries_we_serve_within_real_estate;
const techStackSection = pageData?.industry_technology_cards;
const whyChooseSection = pageData?.why_choose_code1_tech_systems_manufacturing;
const transformationSection = pageData?.build_smarter_manufacturing_operations_with_code1_tech_systems;
const contactSection = pageData?.services_get_started_section;

const cta_section_70 = pageData?.cta_section_70;
const cta_section_77 = pageData?.cta_section_77;
const cta_section_111 = pageData?.cta_section_111;
const cta_section_113 = pageData?.cta_section_113;
const cta_section_114 = pageData?.cta_section_114;
const cta_section_130 = pageData?.cta_section_130;
const cta_section_131 = pageData?.cta_section_131;
const cta_section_133 = pageData?.cta_section_133;

const whyItems = businessOutcomesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
  image: card.image,
})) || [];

const services = ourServicesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

const aiSolutions = aiSolutionsSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

const solutionsWeBuild = manufacturingSolutionsSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

const challenges = businessChallengesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

const industries = industriesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

const techStack = techStackSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

const whyChoose = whyChooseSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

const faqs = (Array.isArray(pageData?.frequently_asked_question) ? pageData.frequently_asked_question : []).map((item: any) => ({
  q: item.question ?? item.post_title ?? "",
  a: item.answer ?? item.post_content ?? "",
}));

const heroBlocks = heroBanner?.blocks?.map((block: any) => ({
  icon: block.icon,
  label: block.title,
})) || [];

  return (
    <>
      <SeoTags
                  title={pageData?.seo?.title}
                  description={pageData?.seo?.description}
                  ogImage={pageData?.seo?.og_image}
                  schema={pageData?.schema}
                />
      {/* ================= CREATIVE HERO ================= */}
      <section
        className="relative overflow-hidden pt-24 lg:pt-28 pb-8 lg:pb-12"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(0,119,182,0.25), transparent 60%), radial-gradient(ellipse at bottom left, rgba(95,194,227,0.18), transparent 55%), hsl(215 57% 8%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 lg:h-32 pointer-events-none z-[1]"
          style={{ background: "linear-gradient(to top, hsl(222 47% 6%), transparent)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-10 lg:gap-16 items-center">
            <div className="text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                <DynamicIcon name={heroBanner?.top_icon} className="w-3.5 h-3.5" />
                {heroBanner?.top_label}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight mb-6 text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroBanner?.heading, "inline-block bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent pb-1") }} />

              <p className="text-lg sm:text-xl text-foreground/85 font-medium mb-5">
                {heroBanner?.sub_heading}
              </p>

              <p className="text-sm sm:text-base text-muted-foreground leading-[1.75] mb-8 max-w-3xl">
                {heroBanner?.paragraph}
              </p>

              <Link to={heroBanner?.button_url}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-[1.03] transition-all duration-300"
                >
                  {heroBanner?.button_text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {heroBlocks.map((t, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <DynamicIcon name={t.icon} className="w-5 h-5 text-accent" />
                    <span className="text-xs text-foreground/80 leading-snug">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] blur-3xl bg-gradient-to-br from-accent/30 via-primary/20 to-transparent" />
              <div
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
                style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(95,194,227,0.15)" }}
              >
                <img
                  src={heroBanner?.image?.url}
                  alt={heroBanner?.image?.alt}
                  className="w-full h-auto object-cover"
                  width={heroBanner?.image?.width}
                  height={heroBanner?.image?.height}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-3 px-3 py-2 rounded-lg bg-background/70 backdrop-blur-md border border-accent/20">
                  <DynamicIcon name={heroBanner?.badge_icon} className="w-5 h-5 text-accent" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{heroBanner?.badge_text}</div>
                    <div className="text-sm font-mono font-semibold text-foreground">{heroBanner?.badge_number}</div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-primary/90 backdrop-blur border border-accent/30">
                  <DynamicIcon name={heroBanner?.badge_bottom_icon} className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-primary-foreground">{heroBanner?.badge_bottom_text}</span>
                </div>
              </div>
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-accent/70 rounded-tl-xl" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-accent/70 rounded-br-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY MANUFACTURING MATTERS ================= */}
      <Section>
        <SectionHeader
          title={businessOutcomesSection?.heading}
          desc={businessOutcomesSection?.paragraph}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={item.image?.url}
                  alt={item.title}
                  width={item.image?.width}
                  height={item.image?.height}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-background/60 backdrop-blur-md border border-accent/30 flex items-center justify-center">
                  <DynamicIcon name={item.icon} className="w-4 h-4 text-accent" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors min-h-[3rem] flex items-center">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 lg:mt-14">
          <CTABanner text={cta_section_70?.content} buttonText={cta_section_70?.cta_text} linkUrl={cta_section_70?.cta_url} />
        </div>
      </Section>

      {/* ================= OUR SERVICES ================= */}
      <Section>
        <SectionHeader
          title={ourServicesSection?.heading}
          desc={ourServicesSection?.paragraph}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <GlassCard key={s.title} item={s} />
          ))}
        </div>

        <div className="mt-12 lg:mt-14">
          <CTABanner text={cta_section_77?.cta_content} buttonText={cta_section_77?.button_text} linkUrl={cta_section_77?.button_url} />
        </div>
      </Section>

      {/* ================= AI-POWERED SOLUTIONS ================= */}
      <Section>
        <SectionHeader
          title={aiSolutionsSection?.heading}
          desc={aiSolutionsSection?.paragraph}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aiSolutions.map((s) => (
            <GlassCard key={s.title} item={s} />
          ))}
        </div>

        <div className="mt-12 lg:mt-14">
          <CTABanner text={cta_section_111?.content} buttonText={cta_section_111?.button_text} linkUrl={cta_section_111?.button_url} />
        </div>
      </Section>

      {/* ================= MANUFACTURING SOLUTIONS WE BUILD ================= */}
      <Section>
        <SectionHeader
          title={manufacturingSolutionsSection?.heading}
          desc={manufacturingSolutionsSection?.paragraph}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutionsWeBuild.map((s) => (
            <GlassCard key={s.title} item={s} />
          ))}
        </div>

        <div className="mt-12 lg:mt-14">
          <CTABanner text={cta_section_113?.content} buttonText={cta_section_113?.button_text} linkUrl={cta_section_113?.button_url} />
        </div>
      </Section>

      {/* ================= BUSINESS CHALLENGES ================= */}
      <Section>
        <SectionHeader
          title={businessChallengesSection?.heading}
          desc={businessChallengesSection?.paragraph}
        />

        <div className="flex flex-wrap justify-center gap-5">
          {challenges.map((c) => (
            <div key={c.title} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.25rem)]">
              <GlassCard item={c} />
            </div>
          ))}
        </div>

        <div className="mt-12 lg:mt-14">
          <CTABanner text={cta_section_114?.content} buttonText={cta_section_114?.button_text} linkUrl={cta_section_114?.button_url} />
        </div>
      </Section>

      {/* ================= INDUSTRIES WE SERVE ================= */}
      <Section>
        <SectionHeader
          title={industriesSection?.heading}
          desc={industriesSection?.paragraph}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((i) => (
            <GlassCard key={i.title} item={i} />
          ))}
        </div>

        <div className="mt-12 lg:mt-14">
          <CTABanner text={cta_section_130?.content} buttonText={cta_section_130?.button_text} linkUrl={cta_section_130?.button_url} />
        </div>
      </Section>

      {/* ================= TOOLS & TECHNOLOGIES ================= */}
      <Section>
        <SectionHeader
          title={techStackSection?.heading}
          desc={techStackSection?.paragraph}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techStack.map((t) => (
            <GlassCard key={t.title} item={t} />
          ))}
        </div>

        <div className="mt-12 lg:mt-14">
          <CTABanner text={cta_section_131?.content} buttonText={cta_section_131?.button_text} linkUrl={cta_section_131?.button_url} />
        </div>
      </Section>

      {/* ================= WHY CHOOSE US ================= */}
      <Section>
        <SectionHeader
          title={whyChooseSection?.heading}
          desc={whyChooseSection?.paragraph}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChoose.map((w) => (
            <GlassCard key={w.title} item={w} />
          ))}
        </div>

        <div className="mt-12 lg:mt-14">
          <CTABanner text={cta_section_133?.content} buttonText={cta_section_133?.button_text} linkUrl={cta_section_133?.button_url} />
        </div>
      </Section>

      {/* ================= TRANSFORMATION ================= */}
      <section
        className="py-8 lg:py-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,119,182,0.18), transparent 60%)" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(transformationSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-base sm:text-lg text-muted-foreground leading-[1.8] mb-8 text-left">
                {transformationSection?.paragraph}
              </p>
              <Link to={transformationSection?.button_url}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-[1.03] transition-all"
                >
                  {transformationSection?.button_text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-accent/15 shadow-[0_8px_40px_rgba(0,119,182,0.2)]">
                <img
                  src={transformationSection?.image?.url}
                  alt={transformationSection?.image?.alt}
                  className="w-full h-auto object-cover"
                  width={transformationSection?.image?.width}
                  height={transformationSection?.image?.height}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,6%)]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
            {pageData?.faq_section_heading && faqs.length > 0 && (
              <section id="faqs" className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
                <Faqs heading={pageData?.faq_section_heading} faqs={faqs} />
              </section>
            )}

      {/* ================= CONTACT ================= */}
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,119,182,0.18), transparent 60%)" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-left">
                {contactSection?.paragraph}
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

export default Manufacturing;