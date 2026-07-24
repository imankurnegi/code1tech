import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import ContactUsForm from "@/components/ContactUsForm";


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


const EduChallengesPinned = ({ challengeItems, challengesSection, cta_section_70 }: { challengeItems: any[]; challengesSection: any; cta_section_70: any }) => {
  const [active, setActive] = useState(0);
  const current = challengeItems[active];

  return (
    <section
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[15%] -left-[10%] w-[45%] h-[45%] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, rgba(0,119,182,0.22), transparent 70%)" }} />
        <div className="absolute -bottom-[15%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[160px]" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.14), transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(challengesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-6xl mx-auto">
            {challengesSection?.paragraph || ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="relative lg:col-span-6 min-h-[260px] lg:min-h-[520px] rounded-2xl overflow-hidden border border-white/10">
            {challengeItems.map((it, i) => (
              <img
                key={it.title}
                src={it.image?.url || ""}
                alt={it.title}
                loading="eager" decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-out ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute top-6 left-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white font-mono">Focus {current.num}</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-6 z-10 pointer-events-none select-none">
              <span className="font-mono font-black text-[6rem] lg:text-[8rem] leading-none bg-gradient-to-b from-white/25 to-white/0 bg-clip-text text-transparent">
                {current.num}
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-6 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <div key={active} className="animate-fade-in">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-accent/20">
                  <DynamicIcon name={current.icon} className="w-5 h-5 text-white" />
                </div>
                <span className="text-accent font-bold text-[10px] uppercase tracking-[0.2em] font-mono">{current.iconText || ""}</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-foreground leading-tight mb-5">{current.title}</h3>
              <div className="h-px w-16 bg-gradient-to-r from-accent to-transparent mb-5" />
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{current.desc}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-8 relative rounded-2xl border border-white/10 bg-white/[0.03] grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 overflow-hidden">
          {challengeItems.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={it.title}
                type="button"
                onClick={() => setActive(i)}
                className={`group/tab relative text-left p-5 lg:p-6 transition-all duration-300 ${isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}`}
              >
                <span
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] transition-all duration-500 ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
                  style={{ transformOrigin: "left" }}
                  aria-hidden="true"
                />
                <div className="flex items-start gap-3">
                  <span className={`font-mono text-sm font-bold shrink-0 transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover/tab:text-foreground/70"}`}>{it.num}</span>
                  <span className={`text-sm md:text-[0.95rem] font-semibold leading-snug transition-colors ${isActive ? "text-foreground" : "text-muted-foreground group-hover/tab:text-foreground/80"}`}>{it.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <CTABanner
            text={cta_section_70?.content || ""}
            buttonText={cta_section_70?.cta_text || ""}
            linkUrl={cta_section_70?.cta_url || ""}
          />
        </div>
      </div>
    </section>
  );
};

const EduTechShowcase = ({ techStack, technologiesSection, cta_section_111 }: { techStack: any[]; technologiesSection: any; cta_section_111: any }) => {
  const [active, setActive] = useState(0);
  const current = techStack[active];

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 5%) 100%)" }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl bg-accent/10" />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-3xl bg-primary/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mb-14 mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(technologiesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-6xl mx-auto">
            {technologiesSection?.paragraph || ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10">
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {techStack.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`group relative text-left p-4 rounded-xl border transition-all duration-500 overflow-hidden ${isActive ? "border-accent/60 bg-gradient-to-br from-accent/[0.12] to-primary/[0.08] shadow-[0_0_30px_-8px_hsl(194_68%_63%/0.5)]" : "border-white/10 bg-white/[0.02] hover:border-accent/30 hover:bg-white/[0.04]"}`}
                >
                  <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500 ${isActive ? "bg-accent/40 opacity-100" : "bg-accent/20 opacity-0 group-hover:opacity-60"}`} />
                  <div className="relative flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors duration-500 ${isActive ? "border-accent/60 bg-accent/15" : "border-white/10 bg-white/[0.04] group-hover:border-accent/40"}`}>
                      <DynamicIcon name={t.icon} className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-foreground/70 group-hover:text-accent"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono tracking-widest text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                      <div className={`text-sm font-semibold leading-tight ${isActive ? "text-foreground" : "text-foreground/85"}`}>{t.title}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-2 rounded-[1.75rem] blur-2xl bg-gradient-to-br from-accent/25 via-primary/15 to-transparent opacity-70" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl" style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.55)" }}>
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-accent/60 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-accent/60 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-accent/60 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-accent/60 rounded-br-lg" />

              <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(hsl(194 68% 80%) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

              <div key={active} className="relative p-8 lg:p-12 animate-fade-in min-h-[420px] flex flex-col">
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-accent/30 blur-2xl" />
                    <div className="relative w-20 h-20 rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                      <DynamicIcon name={current.icon} className="w-10 h-10 text-accent" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-1">LAYER</div>
                    <div className="font-mono text-5xl font-bold bg-gradient-to-b from-foreground to-foreground/30 bg-clip-text text-transparent leading-none">
                      {String(active + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">Active</span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 text-left">{current.title}</h3>
                <p className="text-base text-muted-foreground leading-[1.8] text-left mb-8">{current.content}</p>

                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2"><DynamicIcon name={current.bottom_icon_1} className="w-4 h-4 text-accent" /><span className="text-xs text-foreground/70">{current.bottom_icon_text_1 || ""}</span></div>
                  <div className="flex items-center gap-2"><DynamicIcon name={current.bottom_icon_2} className="w-4 h-4 text-accent" /><span className="text-xs text-foreground/70">{current.bottom_icon_text_2 || ""}</span></div>
                  <div className="flex items-center gap-2"><DynamicIcon name={current.bottom_icon_3} className="w-4 h-4 text-accent" /><span className="text-xs text-foreground/70">{current.bottom_icon_text_3 || ""}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CTABanner
          text={cta_section_111?.content || ""}
          buttonText={cta_section_111?.button_text || ""}
          linkUrl={cta_section_111?.button_url || ""}
        />
      </div>
    </section>
  );
};

const EducationEdTech = () => {
  const { data, isLoading, error } = useQuery({
      queryKey: ["education-engineers"],
      queryFn: api.getEducationEngineers,
    });

    if (isLoading) return null;
    if (error) return null;

  const pageData = data?.data;

// ─── DATA MAPPING ────────────────────────────────────────────────────────────────
const heroBanner = pageData?.industries_banner;
const challengesSection = pageData?.why_education_technology_continues_to_transform_learning;
const solutionsSection = pageData?.our_education_edtech_software_services;
const technologiesSection = pageData?.technologies_that_power_modern_real_estate;
const outcomesSection = pageData?.business_outcomes_that_drive_real_estate_growth;
const industriesSection = pageData?.industries_we_support;
const whyChooseSection = pageData?.why_choose_code1_tech_systems_for_industry_solutions;
const buildFutureSection = pageData?.build_future_ready_education_software_with_code1_tech;
const contactSection = pageData?.services_get_started_section;

const cta_section_70 = pageData?.cta_section_70;
const cta_section_77 = pageData?.cta_section_77;
const cta_section_111 = pageData?.cta_section_111;
const cta_section_113 = pageData?.cta_section_113;
const cta_section_114 = pageData?.cta_section_114;

const challengeItems = challengesSection?.tabs?.map((tab: any, index: number) => ({
  num: String(index + 1).padStart(2, "0"),
  icon: tab.icon,
  title: tab.title,
  desc: tab.content,
  image: tab.image,
  iconText: tab.icon_text,
})) || [];

const solutions = solutionsSection?.cards?.map((card: any) => ({
  icon: card.icon,
  iconText: card.icon_text,
  title: card.title,
  desc: card.content,
})) || [];

const techStack = technologiesSection?.tabs?.map((tab: any) => ({
  icon: tab.icon,
  title: tab.title,
  content: tab.content,
  bottom_icon_1: tab.bottom_icon_1,
  bottom_icon_text_1: tab.bottom_icon_text_1,
  bottom_icon_2: tab.bottom_icon_2,
  bottom_icon_text_2: tab.bottom_icon_text_2,
  bottom_icon_3: tab.bottom_icon_3,
  bottom_icon_text_3: tab.bottom_icon_text_3,
})) || [];

const outcomes = outcomesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  image: card.image,
  title: card.title,
  desc: card.content,
})) || [];

const industryTypes = industriesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

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
      {/* HERO */}
      <section
        className="relative overflow-hidden pt-24 lg:pt-28 pb-8 lg:pb-12"
        style={{ background: "radial-gradient(ellipse at top right, rgba(0,119,182,0.25), transparent 60%), radial-gradient(ellipse at bottom left, rgba(95,194,227,0.18), transparent 55%), hsl(215 57% 8%)" }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-24 lg:h-32 pointer-events-none z-[1]" style={{ background: "linear-gradient(to top, hsl(222 47% 6%), transparent)" }} aria-hidden="true" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-10 lg:gap-16 items-center">
            <div className="text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                <DynamicIcon name={heroBanner?.top_icon} className="w-3.5 h-3.5" />
                {heroBanner?.top_label || ""}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight mb-6 text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroBanner?.heading, "inline-block bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent pb-1") }} />

              <p className="text-sm sm:text-base text-muted-foreground leading-[1.75] mb-8 max-w-3xl">
                {heroBanner?.sub_heading || ""}
              </p>

              <p className="text-sm sm:text-base text-muted-foreground leading-[1.75] mb-8 max-w-3xl">
                {heroBanner?.paragraph || ""}
              </p>

              <Link to={heroBanner?.button_url || ""}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-[1.03] transition-all duration-300">
                  {heroBanner?.button_text || ""}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {heroBlocks.map((t, i) => (
                  <div key={i} className="flex flex-col items-start gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <DynamicIcon name={t.icon} className="w-5 h-5 text-accent" />
                    <span className="text-xs text-foreground/80 leading-snug">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] blur-3xl bg-gradient-to-br from-accent/30 via-primary/20 to-transparent" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01]" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(95,194,227,0.15)" }}>
                <img
                  src={heroBanner?.image?.url || ""}
                  alt={heroBanner?.image?.alt || ""}
                  className="w-full h-auto object-cover"
                  width={heroBanner?.image?.width || 1280}
                  height={heroBanner?.image?.height || 960}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-3 px-3 py-2 rounded-lg bg-background/70 backdrop-blur-md border border-accent/20 animate-fade-in">
                  <DynamicIcon name={heroBanner?.badge_icon} className="w-5 h-5 text-accent" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{heroBanner?.badge_text || ""}</div>
                    <div className="text-sm font-mono font-semibold text-foreground">{heroBanner?.badge_number || ""}</div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-primary/90 backdrop-blur border border-accent/30">
                  <DynamicIcon name={heroBanner?.badge_bottom_icon} className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-primary-foreground">{heroBanner?.badge_bottom_text || ""}</span>
                </div>
              </div>
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-accent/70 rounded-tl-xl" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-accent/70 rounded-br-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* KEY FOCUS AREAS */}
      <EduChallengesPinned challengeItems={challengeItems} challengesSection={challengesSection} cta_section_70={cta_section_70} />

      {/* SOLUTIONS */}
      <section className="py-8 lg:py-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }} aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mb-10 mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-center mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(solutionsSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-6xl mx-auto">
              {solutionsSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mb-12 auto-rows-fr">
            {solutions.map((s, idx) => {
              const isFeatured = idx === 0;
              return (
                <div
                  key={s.title}
                  className={`group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 ${isFeatured ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-2"}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-primary/20 to-accent/40 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`relative h-full bg-[hsl(222_47%_7%)]/90 backdrop-blur-2xl rounded-2xl border border-foreground/5 overflow-hidden ${isFeatured ? "p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10" : "p-6 flex flex-col gap-4"}`}>
                    <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {isFeatured ? (
                      <>
                        <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-4 lg:min-w-[220px]">
                          <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-accent/40 group-hover:border-accent transition-colors duration-500 shrink-0">
                            <DynamicIcon name={s.icon} className="w-8 h-8 lg:w-10 lg:h-10 text-accent" />
                          </div>
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{s.iconText || ""}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-tight text-left mb-3">{s.title}</h3>
                          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed text-left max-w-3xl">{s.desc}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-accent/30 group-hover:border-accent transition-colors duration-500 shrink-0">
                            <DynamicIcon name={s.icon} className="w-6 h-6 text-accent" />
                          </div>
                          <h3 className="text-base font-semibold text-foreground leading-tight text-left">{s.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed text-left">{s.desc}</p>
                        <div className="mt-auto pt-2"><div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" /></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <CTABanner
            text={cta_section_77?.cta_content || ""}
            buttonText={cta_section_77?.button_text || ""}
            linkUrl={cta_section_77?.button_url || ""}
          />
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <EduTechShowcase techStack={techStack} technologiesSection={technologiesSection} cta_section_111={cta_section_111} />

      {/* OUTCOMES */}
      <section className="py-8 lg:py-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mb-8 mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-center mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(outcomesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-6xl mx-auto">
              {outcomesSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-12">
            {outcomes.map((o) => (
              <div key={o.title} className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img src={o.image?.url || ""} alt={o.title} width={o.image?.width || 1024} height={o.image?.height || 640} loading="eager" decoding="async" className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-background/60 backdrop-blur-md border border-accent/30 flex items-center justify-center">
                    <DynamicIcon name={o.icon} className="w-4 h-4 text-accent" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors min-h-[3rem] flex items-center">{o.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <CTABanner
            text={cta_section_113?.content || ""}
            buttonText={cta_section_113?.button_text || ""}
            linkUrl={cta_section_113?.button_url || ""}
          />
        </div>
      </section>

      {/* EDUCATION SECTORS */}
      <section className="py-8 lg:py-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }} aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mb-10 mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-center mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-6xl mx-auto">
              {industriesSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {industryTypes.map((s) => (
              <div key={s.title} className="group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/20">
                <div className="absolute inset-0 bg-gradient-to-br from-accent via-transparent to-primary opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-background/80 backdrop-blur-2xl rounded-2xl p-6 flex flex-col gap-4 border border-foreground/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-accent/30 group-hover:border-accent transition-colors duration-500">
                      <DynamicIcon name={s.icon} className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground leading-tight text-left">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-left">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE — INFOGRAPHIC */}
      <section className="py-8 lg:py-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mb-10 mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-center mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyChooseSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-6xl mx-auto">
              {whyChooseSection?.paragraph || ""}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.55)] mb-10">
            <img
              src={whyChooseSection?.image?.url || ""}
              alt={whyChooseSection?.image?.alt || ""}
              className="w-full h-auto object-cover"
              width={whyChooseSection?.image?.width || 1920}
              height={whyChooseSection?.image?.height || 1080}
              loading="eager"
              decoding="async"
            />
          </div>
          <CTABanner
            text={cta_section_114?.content || ""}
            buttonText={cta_section_114?.button_text || ""}
            linkUrl={cta_section_114?.button_url || ""}
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-8 lg:py-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,119,182,0.18), transparent 60%)" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(buildFutureSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-base sm:text-lg text-muted-foreground leading-[1.8] mb-8 text-left">
                {buildFutureSection?.paragraph || ""}
              </p>
              <Link to={buildFutureSection?.button_url || ""}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-[1.03] transition-all">
                  {buildFutureSection?.button_text || ""}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-accent/15 shadow-[0_8px_40px_rgba(0,119,182,0.2)]">
                <img
                  src={buildFutureSection?.image?.url || ""}
                  alt={buildFutureSection?.image?.alt || ""}
                  className="w-full h-auto object-cover"
                  width={buildFutureSection?.image?.width || 1280}
                  height={buildFutureSection?.image?.height || 960}
                  loading="eager" decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,6%)]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,119,182,0.18), transparent 60%)" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-left">
                {contactSection?.paragraph || ""}
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

export default EducationEdTech;
