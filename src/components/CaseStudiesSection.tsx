import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { addClassToSpan } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/useInView";

interface CaseStudy {
  ID: number;
  post_title: string;
  post_content: string;
  post_name: string;
  acf: {
    card_image: string;
    hover_icon: string;
    value_1: string;
    value_1_text: string;
    value_2: string;
    value_2_text: string;
  };
}

interface CaseStudiesData {
  status: boolean;
  section_heading: string;
  section_sub_heading: string;
  case_studies: CaseStudy[];
}

const CaseStudiesSection = ({ dataCaseStudies }: { dataCaseStudies?: CaseStudiesData }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref: sectionRef, inView: isVisible } = useInView<HTMLElement>();

  if (!dataCaseStudies || !dataCaseStudies.case_studies || dataCaseStudies.case_studies.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(220,42%,6%)] to-[hsl(222,47%,5%)]" />
      
      {/* Top fade for seamless transition */}
      <div 
        className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)'
        }}
      />
      
      {/* Bottom fade for seamless transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-10 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
      
       <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            dangerouslySetInnerHTML={{ __html: addClassToSpan(dataCaseStudies?.section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
          />
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            {dataCaseStudies?.section_sub_heading}
          </p>
        </div>

        {/* Full-width Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {dataCaseStudies?.case_studies?.map((study, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={study.ID}
                className="group relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden transition-all duration-500 hover:border-accent/40 hover:bg-card/50"
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image Section */}
                <div className="relative h-40 lg:h-44 overflow-hidden">
                  <img
                    src={study.acf.card_image}
                    alt={study.post_title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Hover Icon */}
                  {study.acf.hover_icon && (
                    <div className={`absolute bottom-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-lg transition-all duration-300 ${
                      isHovered ? "bg-accent/20" : ""
                    }`}>
                      <img 
                        src={study.acf.hover_icon} 
                        alt={study.post_title}
                        className="w-6 h-6 object-contain transition-all duration-300"
                        style={isHovered ? {
                          filter: 'brightness(0) saturate(100%) invert(70%) sepia(100%) saturate(1500%) hue-rotate(175deg)',
                        } : {}}
                      />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 lg:p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {study.post_title}
                  </h3>
                  
                  {study.post_content && (
                    <div 
                      dangerouslySetInnerHTML={{ __html: study.post_content }}
                    />
                  )}
                  
                  {/* Results */}
                  <div className="flex gap-4 mb-4">
                    {study.acf.value_1 && (
                      <div className="flex flex-col">
                        <span className="text-foreground font-bold text-lg">{study.acf.value_1}</span>
                        <span className="text-muted-foreground text-xs">{study.acf.value_1_text}</span>
                      </div>
                    )}
                    {study.acf.value_2 && (
                      <div className="flex flex-col">
                        <span className="text-foreground font-bold text-lg">{study.acf.value_2}</span>
                        <span className="text-muted-foreground text-xs">{study.acf.value_2_text}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* CTA */}
                  <Link 
                    to={study.post_name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      isHovered ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    View Case Study
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`} />
                  </Link>
                </div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
