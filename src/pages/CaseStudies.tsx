import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SeoTags from "@/components/SeoTags";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallback";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useInView } from "@/hooks/useInView";
import { addClassToSpan } from "@/lib/utils";


const CaseStudies = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref: heroRef, inView: isHeroVisible } = useInView<HTMLDivElement>();
  const { ref: gridRef, inView: isGridVisible } = useInView<HTMLDivElement>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["case-studies"],
    queryFn: api.getCaseStudies,
  });
  const pageData = data?.data;

  // Get case studies list using getCaseStudyBySlug (without slug for listing)
  const { data: caseStudiesData } = useQuery({
    queryKey: ["case-studies-list"],
    queryFn: () => api.getCaseStudyBySlug(""),
  });

  // Map API response to component structure
  const caseStudiesList = (caseStudiesData?.data || []).map((item: any) => ({
    id: item.slug,
    title: item.title,
    slug: item.slug,
    industry: item.categories?.[0] || "",
    quote: item.content?.listing_highlight_text || "",
    description: item.content?.listing_highlight_content || "",
    icon: item.content?.listing_icon || "",
    categoryIcon: item.content?.category_row?.[0]?.icon || "",
    image: item.image || "",
    results: (item.content?.stats || []).map((stat: any) => ({
      value: stat.value,
      label: stat.text
    }))
  }));

  const featured = caseStudiesList[0];
  const rest = caseStudiesList.slice(1);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorFallback error={error as Error} onRetry={() => window.location.reload()} />;
  

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
        className="relative overflow-hidden pt-24 lg:pt-28 pb-10 lg:pb-14"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 50%, hsl(222 47% 5%) 100%)",
        }}
      >
        {/* Dark radial glows */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(circle, rgba(95,194,227,0.08) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(circle, rgba(0,78,158,0.10) 0%, transparent 70%)" }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(95,194,227,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={heroRef}
            className={`grid lg:grid-cols-[6fr_5fr] gap-10 lg:gap-16 items-center transition-all duration-700 ${
              isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* LEFT — content */}
            <div className="text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                <DynamicIcon name={pageData?.case_study_page?.top_label_icon} className="w-3.5 h-3.5" />
                {pageData?.case_study_page?.top_label_text}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] tracking-tight mb-6 text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.page_title || "", "inline-block bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent pb-1") }} />

              <p 
                className="text-sm sm:text-base text-muted-foreground leading-[1.75] mb-8 max-w-3xl text-left"
                dangerouslySetInnerHTML={{ __html: pageData?.page_content || "" }}
              />

              <Link to={pageData?.case_study_page?.button_url || ""}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-[1.03] transition-all duration-300"
                >
                  {pageData?.case_study_page?.button_text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>

              {/* Micro-trust row */}
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {pageData?.case_study_page?.banner_blocks?.map((t: any) => (
                  <div
                    key={t.text}
                    className="flex flex-col items-start gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <DynamicIcon name={t.icon} className="w-5 h-5 text-accent" aria-hidden="true" />
                    <span className="text-xs text-foreground/80 leading-snug">{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — featured case study visual */}
            {featured && (
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2rem] blur-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent"
              />
              <Link
                to={`/case-studies/${featured.slug}`}
                className="group relative block rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 50px rgba(0,78,158,0.08)" }}
              >
                <div className="relative h-56 lg:h-64 overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215_57%_8%)] via-[hsl(215_57%_8%)]/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-accent/20">
                    <DynamicIcon name={featured.categoryIcon} className="w-4 h-4 text-accent" aria-hidden="true" />
                    <span className="text-xs font-medium text-foreground">{featured.industry}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-background/70 backdrop-blur-md border border-accent/30">
                    <DynamicIcon name={featured.icon} className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-accent/80 text-sm font-medium mt-2">"{featured.quote}"</p>
                  <div className="mt-5 grid grid-cols-4 gap-3">
                    {featured.results?.map((r: any) => (
                      <div key={r.label} className="text-left">
                        <span className="block font-mono font-semibold text-foreground text-base">{r.value}</span>
                        <span className="text-[11px] text-muted-foreground leading-snug">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
              <div aria-hidden="true" className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-accent/70 rounded-tl-xl" />
              <div aria-hidden="true" className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-accent/70 rounded-br-xl" />
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CASE STUDIES GRID ================= */}
      {rest.length > 0 && (
      <section
        ref={gridRef}
        className="py-10 lg:py-16 relative"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.case_study_page?.listing_heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rest.map((study: any, index: number) => {
              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={study.slug}
                  to={`/case-studies/${study.slug}`}
                  className={`group block h-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl ${
                    isGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <article
                    className={`relative h-full flex flex-col rounded-2xl overflow-hidden border bg-white/[0.03] backdrop-blur-sm transition-all duration-500 ${
                      isHovered ? "border-accent/50 shadow-xl shadow-accent/10 -translate-y-1.5" : "border-white/10"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isHovered ? "scale-110" : "scale-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-accent/20">
                        <DynamicIcon name={study.categoryIcon} className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                        <span className="text-xs font-medium text-foreground">{study.industry}</span>
                      </div>

                      <div
                        className={`absolute bottom-4 right-4 p-2.5 rounded-lg backdrop-blur-md border transition-all duration-300 ${
                          isHovered
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-background/70 text-accent border-accent/30"
                        }`}
                      >
                        <DynamicIcon name={study.icon} className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {study.title}
                      </h3>

                      <p className="text-accent/80 text-sm font-medium mb-3">"{study.quote}"</p>

                      <p className="text-muted-foreground text-sm leading-[1.75] mb-6 text-left">
                        {study.description}
                      </p>

                      {/* Results */}
                      <div className="mt-auto grid grid-cols-4 gap-3 pt-5 border-t border-white/10">
                        {study.results?.map((result: any, i: number) => (
                          <div key={i} className="text-left">
                            <span className="text-foreground font-mono font-semibold text-base block">{result.value}</span>
                            <span className="text-muted-foreground text-[11px] leading-normal block">{result.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div
                        className={`mt-5 flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                          isHovered ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        View Full Case Study
                        <ArrowRight
                          className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ================= CTA ================= */}
      <section
        className="pb-14 lg:pb-20 relative"
        style={{ background: "hsl(222 47% 5%)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 p-8 lg:p-12"
            style={{
              background:
                "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 7%) 50%, hsl(222 47% 6%) 100%)",
            }}
          >
            {/* Grid texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage: "radial-gradient(ellipse at 30% 20%, black 30%, transparent 75%)",
              }}
            />
            {/* Dot texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(95,194,227,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                maskImage: "radial-gradient(ellipse at 80% 80%, black 25%, transparent 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(95,194,227,0.08) 0%, transparent 70%)" }}
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-[350px] h-[350px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,78,158,0.10) 0%, transparent 70%)" }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.case_study_page?.bottom_banner_heading || "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
                <p className="text-muted-foreground text-sm leading-[1.75] text-left">
                  {pageData?.case_study_page?.bottom_banner_paragraph}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                {pageData?.case_study_page?.bottom_banner_buttons?.map((button: any, index: number) => (
                  <Link key={index} to={button.button_url}>
                    <Button
                      size="lg"
                      className={index === 0 
                        ? "group w-full sm:w-auto bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] transition-all duration-300"
                        : "w-full sm:w-auto py-6"
                      }
                      variant={index === 0 ? "default" : "outline"}
                    >
                      {button.button_text}
                      {index === 0 && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
