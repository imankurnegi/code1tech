import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SeoTags from "@/components/SeoTags";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ContactUsForm from "@/components/ContactUsForm";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";


const BankingSoftware = () => {
  const { data, isLoading, error } = useQuery({
      queryKey: ["banking-engineers"],
      queryFn: api.getBankingEngineers,
    });

    if (isLoading) return null;
    if (error) return null;

  const pageData = data?.data;

// ─── DATA MAPPING ────────────────────────────────────────────────────────────────
const heroBanner = pageData?.industries_banner;
const modernBankingSection = pageData?.modern_banking_demands_smarter_digital_experiences;
const solutionsSection = pageData?.banking_solutions_we_deliver;
const technologiesSection = pageData?.which_cutting_edge_technologies_power_today_s_modern_banking;
const outcomesSection = pageData?.business_outcomes_that_strengthen_banking_performance;
const whyChooseInfographicImage = pageData?.why_choose_code1_tech_systems_for_industry_solutions?.image;
const contactSection = pageData?.services_get_started_section;

const cta_section_70 = pageData?.cta_section_70;
const cta_section_77 = pageData?.cta_section_77;
const cta_section_111 = pageData?.cta_section_111;
const cta_section_113 = pageData?.cta_section_113;

const solutions = solutionsSection?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  desc: card.content,
})) || [];

const outcomes = outcomesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  image: card.image?.url || "",
  title: card.title,
  desc: card.content,
})) || [];

const techStack = technologiesSection?.cards?.map((card: any) => ({
  icon: card.icon,
  label: card.title,
})) || [];

const heroBlocks = heroBanner?.blocks?.map((block: any) => ({
  icon: block.icon,
  label: block.title,
})) || [];

const modernBankingCards = modernBankingSection?.cards?.map((card: any, index: number) => ({
  num: `${index + 1}.`,
  icon: card.icon,
  title: card.title,
  desc: card.content,
  image: card.image?.url || "",
})) || [];

  return (
    <>
     <SeoTags
        title={pageData?.seo?.title}
        description={pageData?.seo?.description}
        ogImage={pageData?.seo?.og_image}
        schema={pageData?.schema}
      />
      {/* ================= HERO ================= */}
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
                {heroBanner?.top_label || ""}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight mb-6 text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroBanner?.heading, "inline-block bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent pb-1") }} />

              <p className="text-sm sm:text-base text-muted-foreground leading-[1.75] mb-8 max-w-3xl">
                {heroBanner?.paragraph || ""}
              </p>

              <Link to={heroBanner?.button_url || ""}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-[1.03] transition-all duration-300"
                >
                  {heroBanner?.button_text || ""}
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
                  src={heroBanner?.image?.url || ""}
                  alt={heroBanner?.image?.alt || ""}
                  className="w-full h-auto object-cover"
                  width={heroBanner?.image?.width || 1280}
                  height={heroBanner?.image?.height || 960}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-3 px-3 py-2 rounded-lg bg-background/70 backdrop-blur-md border border-accent/20">
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

      {/* ================= INFOGRAPHIC: MODERN BANKING ================= */}
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(0,119,182,0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(95,194,227,0.12), transparent 55%), hsl(222 47% 6%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mb-10 mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-center mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(modernBankingSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-base text-muted-foreground leading-[1.75] text-center">
              {modernBankingSection?.paragraph || ""}
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col gap-5 lg:gap-6">
            {modernBankingCards.map((item, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <div
                  key={item.title}
                  className="group relative rounded-2xl bg-gradient-to-br from-accent/40 via-white/5 to-primary/30 p-[1px] hover:from-accent hover:to-primary transition-all duration-500"
                >
                  <div
                    className={`relative rounded-2xl bg-background/80 backdrop-blur-xl overflow-hidden flex flex-col ${
                      reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                    } items-stretch gap-0`}
                  >
                    {/* Image */}
                    <div className="relative lg:w-[42%] flex-shrink-0 overflow-hidden">
                      <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[220px]">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="eager" decoding="async"
                          width={800}
                          height={600}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient overlay blending into card */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: reverse
                              ? "linear-gradient(270deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0.9) 100%)"
                              : "linear-gradient(90deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0.9) 100%)",
                          }}
                          aria-hidden="true"
                        />
                        {/* Icon badge floating on image */}
                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-background/70 backdrop-blur-md border border-accent/40 flex items-center justify-center shadow-lg shadow-accent/20">
                            <DynamicIcon name={item.icon} className="w-6 h-6 lg:w-7 lg:h-7 text-accent" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 md:p-7 lg:p-9 flex flex-col justify-center text-left min-w-0">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-3">
                        <span className="text-accent mr-2 font-mono">{item.num}</span>
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          <div className="mt-12 lg:mt-14">
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
                <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">
                  {cta_section_70?.content || ""}
                </h3>
              </div>
              <Link to={cta_section_70?.cta_url || ""} className="flex-shrink-0 relative z-10">
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
                  {cta_section_70?.cta_text || ""}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLUTIONS WE DELIVER ================= */}
      <section className="py-8 lg:py-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 h-24 lg:h-32 pointer-events-none z-[1]"
          style={{ background: "linear-gradient(to bottom, hsl(222 47% 6%), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 lg:h-32 pointer-events-none z-[1]"
          style={{ background: "linear-gradient(to top, hsl(222 47% 5%), transparent)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mb-10 mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-center mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(solutionsSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-base text-muted-foreground leading-[1.75] text-center">
              {solutionsSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/20"
              >
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

          <div className="mt-12 lg:mt-14">
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
                <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">
                  {cta_section_77?.cta_content || ""}
                </h3>
              </div>
              <Link to={cta_section_77?.button_url || ""} className="flex-shrink-0 relative z-10">
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
                  {cta_section_77?.button_text || ""}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGIES ================= */}
      <section
        className="py-8 lg:py-12 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mb-10 mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(technologiesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-base text-muted-foreground leading-[1.75] text-center">
              {technologiesSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent/40 hover:bg-white/[0.06] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                  <DynamicIcon name={t.icon} className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{t.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 lg:mt-14">
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
                <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">
                  {cta_section_111?.content || ""}
                </h3>
              </div>
              <Link to={cta_section_111?.button_url || ""} className="flex-shrink-0 relative z-10">
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
                  {cta_section_111?.button_text || ""}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUSINESS OUTCOMES ================= */}
      <section
        className="py-8 lg:py-12 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mb-8 mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-center" dangerouslySetInnerHTML={{ __html: addClassToSpan(outcomesSection?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-base text-muted-foreground leading-[1.75] text-center">
              {outcomesSection?.paragraph || ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {outcomes.map((o) => (
              <div
                key={o.title}
                className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={o.image}
                    alt={o.title}
                    width={1024}
                    height={640}
                    loading="eager" decoding="async"
                    className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-background/60 backdrop-blur-md border border-accent/30 flex items-center justify-center">
                    <DynamicIcon name={o.icon} className="w-4 h-4 text-accent" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors min-h-[3rem] flex items-center">
                    {o.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 lg:mt-14">
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
                <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">
                  {cta_section_113?.content || ""}
                </h3>
              </div>
              <Link to={cta_section_113?.button_url || ""} className="flex-shrink-0 relative z-10">
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
                  {cta_section_113?.button_text || ""}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section
        className="py-8 lg:py-12 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 6%) 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,119,182,0.18), transparent 60%)" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-2xl overflow-hidden border border-accent/15 shadow-[0_8px_40px_rgba(0,119,182,0.2)]">
            <img
              src={whyChooseInfographicImage?.url || ""}
              alt={whyChooseInfographicImage?.alt || ""}
              className="w-full h-auto object-cover"
              width={whyChooseInfographicImage?.width || 1280}
              height={whyChooseInfographicImage?.height || 960}
              loading="eager" decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,6%)]/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>
      {/* ================= CONTACT ================= */}
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

export default BankingSoftware;
