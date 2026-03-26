import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "./DynamicIcon";
import { Link } from "react-router-dom";

interface IndustryCard {
  ID: number;
  post_title: string;
  post_excerpt: string;
  acf: {
    card_icon: string;
  };
}

interface IndustriesData {
  section_main_heading: string;
  section_description: string;
  industries_cards: IndustryCard[];
  help_cta_text: string;
  help_cta_url: string;
}

interface IndustriesWeServeProps {
  dataIndustries?: IndustriesData;
}

const IndustriesWeServe = ({ dataIndustries }: IndustriesWeServeProps) => {
  // Transform API data to match component structure
  const industries = dataIndustries?.industries_cards?.map((card) => ({
    icon: card.acf.card_icon,
    title: card.post_title,
    description: card.post_excerpt,
  })) || [];
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-16 md:pt-24 pb-16 md:pb-24 lg:pb-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(220,40%,6%)] to-[hsl(222,47%,5%)]" />
      
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
      
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.012)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/5 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/3 right-1/5 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        {dataIndustries && (
          <div
            className={`text-center mb-14 md:mb-20 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 [&>span]:bg-gradient-to-r [&>span]:from-[#5FC2E3] [&>span]:to-[#0077B6] [&>span]:bg-clip-text [&>span]:text-transparent"
              dangerouslySetInnerHTML={{ __html: addClassToSpan(dataIndustries.section_main_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
            />
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              {dataIndustries.section_description}
            </p>
          </div>
        )}

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto mb-14 md:mb-16">
          {industries.map((industry, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative rounded-2xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${isHovered ? "-translate-y-2" : ""}`}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                {/* Glass card background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/15 backdrop-blur-sm border transition-all duration-300 ${
                  isHovered 
                    ? "border-accent/50 shadow-lg shadow-accent/15" 
                    : "border-border/30"
                }`} />
                
                {/* Subtle glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-accent/5 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`} />

                <div className="relative p-6">
                  <div className="flex items-center gap-4 mb-3">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    isHovered ? "bg-accent/20" : "bg-muted/50"
                  }`}>
                    <DynamicIcon name={industry.icon} className={`w-6 h-6 transition-colors duration-300 ${
                      isHovered ? "text-accent" : "text-muted-foreground"
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                    isHovered ? "text-foreground" : "text-foreground/90"
                  }`}>
                    {industry.title}
                  </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {dataIndustries?.help_cta_text && (
          <div
            className={`text-center transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link to={dataIndustries.help_cta_url}>
            <Button
              variant="ghost"
              className="group text-accent hover:text-foreground hover:bg-accent/10 text-base font-medium px-6 py-3 h-auto"
            >
              <span className="relative">
                {dataIndustries.help_cta_text}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndustriesWeServe;
