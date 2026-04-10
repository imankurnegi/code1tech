import { useState, useRef } from "react";
import { ArrowRight, Clock } from "lucide-react";
import blogAi from "@/assets/blog-ai.jpg";
import { useInView } from "@/hooks/useInView";
import blogData from "@/assets/blog-data.jpg";
import blogCloud from "@/assets/blog-cloud.jpg";
import { addClassToSpan } from "@/lib/utils";

interface RelatedBlogsData {
  heading?: string;
  sub_heading?: string;
  section_cta_text?: string;
  section_cta_url?: string;
}

const blogs = [
  {
    category: "AI",
    title: "How AI Agents Are Reshaping Enterprise Operations in 2024",
    preview: "Discover why forward-thinking companies are deploying autonomous AI agents to handle complex workflows.",
    readingTime: "6 min read",
    image: blogAi
  },
  {
    category: "Data",
    title: "The Modern Data Stack: From Chaos to Clarity",
    preview: "Building a unified data architecture that scales with your business growth and analytical ambitions.",
    readingTime: "8 min read",
    image: blogData
  },
  {
    category: "Cloud",
    title: "Cloud Migration Done Right: Lessons from Fortune 500 Transformations",
    preview: "Key strategies that separate successful cloud migrations from costly failures.",
    readingTime: "5 min read",
    image: blogCloud
  }
];

const categoryColors: Record<string, string> = {
  AI: "bg-accent/15 text-accent border-accent/30",
  Data: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Cloud: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
};

const RelatedBlogs = ({ dataRelatedBlogs }: { dataRelatedBlogs?: RelatedBlogsData }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref: sectionRef, inView: isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(222,45%,6%)] to-[hsl(222,47%,5%)]" />
      
      {/* Top/Bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{ background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{ background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)' }} />
      
      {/* Subtle animated dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-accent/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {dataRelatedBlogs?.heading &&(
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{ __html: addClassToSpan(dataRelatedBlogs?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
            />
          )}
          
          {dataRelatedBlogs?.sub_heading && (
            <p
              className="text-muted-foreground text-base sm:text-lg lg:text-xl"
              dangerouslySetInnerHTML={{ __html: dataRelatedBlogs?.sub_heading ?? "" }}
            />
          )}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12">
          {blogs.map((blog, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <article
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${isHovered ? "-translate-y-2" : ""}`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                {/* Card container */}
                <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border transition-all duration-300 ${
                  isHovered 
                    ? "border-accent/40 shadow-xl shadow-accent/10" 
                    : "border-border/30"
                }`}>
                  
                  {/* Image container */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHovered ? "scale-105" : "scale-100"
                      }`}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative p-5 md:p-6">
                    {/* Category tag */}
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border mb-4 ${
                      categoryColors[blog.category] || "bg-muted text-muted-foreground border-border"
                    }`}>
                      {blog.category}
                    </span>

                    {/* Title */}
                    <h3 className={`text-lg md:text-xl font-bold mb-3 leading-tight transition-colors duration-300 ${
                      isHovered ? "text-accent" : "text-foreground"
                    }`}>
                      {blog.title}
                    </h3>

                    {/* Preview */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 text-justify">
                      {blog.preview}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                      {/* Reading time */}
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readingTime}</span>
                      </div>

                      {/* Read more CTA */}
                      <div className={`flex items-center gap-1 text-accent text-sm font-medium transition-all duration-300 ${
                        isHovered ? "opacity-100" : "opacity-70"
                      }`}>
                        <span>Read</span>
                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                          isHovered ? "translate-x-1" : ""
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-accent/5 pointer-events-none transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`} />
              </article>
            );
          })}
        </div>

        {/* CTA */}
        {(dataRelatedBlogs?.section_cta_text || dataRelatedBlogs?.section_cta_url) && (
          <div
            className={`text-center transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button
              type="button"
              className="group inline-flex items-center text-accent text-base font-medium hover:text-foreground transition-colors"
              onClick={() => {
                if (dataRelatedBlogs?.section_cta_url) {
                  window.location.href = dataRelatedBlogs.section_cta_url;
                }
              }}
            >
              <span className="relative">
                {dataRelatedBlogs?.section_cta_text}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedBlogs;
