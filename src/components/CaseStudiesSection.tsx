import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { addClassToSpan } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { DynamicIcon } from "@/components/DynamicIcon";

interface Stat {
  value?: string;
  text?: string;
}

interface CaseStudyPost {
  id?: number;
  title?: string;
  slug?: string;
  image?: string | false;
  categories?: string[];
  content?: {
    listing_icon?: string;
    listing_highlight_text?: string;
    listing_highlight_content?: string;
    stats?: Stat[];
  } | string;
}

interface Props {
  dataCaseStudies?: CaseStudyPost[];
  heading?: string;
  subHeading?: string;
  basePath?: string;
}

const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "").trim();

const CaseStudiesSection = ({
  dataCaseStudies = [],
  heading = "Related <span>Case Studies</span>",
  subHeading = "",
  basePath = "/case-studies",
}: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref: sectionRef, inView: isVisible } = useInView<HTMLElement>();

  if (!dataCaseStudies.length) return null;

  const studies = dataCaseStudies.slice(0, 3).map((p, i) => {
    const c = typeof p.content === "object" && p.content ? p.content : {};
    return {
      key: p.id ?? i,
      title: p.title || "",
      slug: p.slug || "",
      image: p.image || "",
      category: p.categories?.[0] || "",
      icon: c.listing_icon || "",
      highlight: stripHtml(c.listing_highlight_text || "").replace(/^"|"$/g, ""),
      summary: stripHtml(c.listing_highlight_content || ""),
      stats: (c.stats || []).filter((s) => s?.value).slice(0, 2),
    };
  });

  return (
    <section ref={sectionRef} className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(220,42%,6%)] to-[hsl(222,47%,5%)]" />
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{ background: "linear-gradient(to bottom, hsl(222 47% 5%), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{ background: "linear-gradient(to top, hsl(222 47% 5%), transparent)" }} />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            dangerouslySetInnerHTML={{ __html: addClassToSpan(heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
          />
          {subHeading && (
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">{subHeading}</p>
          )}
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ transitionDelay: "200ms" }}
        >
          {studies.map((study, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <Link
                key={study.key}
                to={`${basePath}/${study.slug}`}
                className="group relative flex flex-col bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden transition-all duration-500 hover:border-accent/40 hover:bg-card/50"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div className="relative h-40 lg:h-44 overflow-hidden bg-muted/30">
                  {study.image && (
                    <img
                      src={study.image}
                      alt={study.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

                  {study.icon && (
                    <div className={`absolute bottom-3 right-3 p-2 backdrop-blur-sm rounded-lg transition-all duration-300 ${isHovered ? "bg-accent/20" : "bg-background/80"}`}>
                      <DynamicIcon
                        name={study.icon}
                        className={`w-6 h-6 transition-colors duration-300 ${isHovered ? "text-accent" : "text-muted-foreground"}`}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4 lg:p-5">
                  {study.category && (
                    <span className="self-start mb-3 px-2.5 py-1 rounded-full text-[11px] font-medium text-accent bg-accent/10 border border-accent/20 line-clamp-1">
                      {study.category}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors duration-300">
                    {study.title}
                  </h3>

                  {study.highlight && (
                    <p className="text-sm italic text-foreground/80 mb-2 line-clamp-2">“{study.highlight}”</p>
                  )}

                  {study.summary && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{study.summary}</p>
                  )}

                  {study.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-border/20">
                      {study.stats.map((s, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-foreground font-bold text-base leading-tight">{s.value}</span>
                          <span className="text-muted-foreground text-xs mt-0.5">{s.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className={`mt-auto flex items-center gap-2 text-sm font-medium transition-all duration-300 ${isHovered ? "text-accent" : "text-muted-foreground"}`}>
                    View Case Study
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
                  </span>
                </div>

                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;