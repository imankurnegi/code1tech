import { Button } from "@/components/ui/button";
import { Calendar, Zap, Bot, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AIOrbitVisual from "./AIOrbitVisual";
import { addClassToSpan } from "@/lib/utils";
import { Link } from "react-router-dom";

interface TagImage {
  ID?: number;
  url?: string;
  alt?: string;
}

interface SectionTag {
  text_label: string;
  tag_image: number | TagImage;
}

interface SectionTags {
  tag_one: SectionTag;
  tag_two: SectionTag;
  tag_three: SectionTag;
}

interface AIAgentData {
  section_heading: string;
  section_sub_heading: string;
  section_description: string;
  section_tags: SectionTags;
  section_cta_text: string;
  section_cta_url: string;
}

interface AIAcceleratorsSectionProps {
  dataAiAgent?: AIAgentData;
}

const AIAcceleratorsSection = ({ dataAiAgent }: AIAcceleratorsSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
  if (typeof window === 'undefined') return;

  const el = sectionRef.current;
  if (!el) return;

  if (el.getBoundingClientRect().top < window.innerHeight) {
    setIsVisible(true);
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(el);

  return () => observer.disconnect();
}, []);

  // Map API tags to value points with default icons
  const valuePoints = dataAiAgent?.section_tags ? [
    { icon: Zap, label: dataAiAgent.section_tags.tag_one.text_label },
    { icon: Bot, label: dataAiAgent.section_tags.tag_two.text_label },
    { icon: TrendingUp, label: dataAiAgent.section_tags.tag_three.text_label },
  ] : [];

  return (
    <section
      ref={sectionRef}
      className="pb-16 md:pb-4 lg:pb-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(213 50% 7%) 50%, hsl(222 47% 5%) 100%)"
      }}
    >
      {/* Top fade for seamless transition from EngineeringServices */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 md:h-64 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, hsl(222 47% 5%) 0%, hsl(222 47% 5%) 50%, transparent 100%)'
        }}
      />
      
      {/* Bottom fade for seamless transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
        }}
      />

      {/* Subtle Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="w-full lg:max-w-xl">
            {/* Heading */}
            {dataAiAgent?.section_heading && (
               <h2 
                className="text-4xl font-bold text-foreground mb-4 leading-tight transition-all duration-1000"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(dataAiAgent?.section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
             />
            )}

            {/* Subheading */}
            {dataAiAgent?.section_sub_heading && (
                // <p 
                //   className={`text-muted-foreground text-base sm:text-lg lg:text-xl mb-6 font-light transition-all duration-1000 delay-100 ${
                //     isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                //   }`}
                // >
                //   {dataAiAgent.section_sub_heading.split(' ').map((word, index) => {
                //     if (word.includes('ROI')) {
                //       return (
                //         <span key={index} className="text-accent font-semibold">
                //           {word}{' '}
                //         </span>
                //       );
                //     }
                //     return word + ' ';
                //   })}
                // </p>

              <p 
                className="text-muted-foreground text-base sm:text-lg lg:text-xl mb-6 font-light transition-all duration-1000 delay-100"
                dangerouslySetInnerHTML={{ __html: dataAiAgent?.section_sub_heading ?? "" }}
             />
            )}

            {/* Description Content */}
            {dataAiAgent?.section_description && (
              <div 
                className={`text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 text-left transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                dangerouslySetInnerHTML={{ __html: dataAiAgent.section_description }}
              />
            )}

            {/* Value Points */}
            <div 
              className={`flex flex-wrap gap-4 mb-8 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {valuePoints.map((point, index) => (
                <div 
                  key={point.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-background/5 backdrop-blur-sm"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <point.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground/80">{point.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {dataAiAgent?.section_cta_text && (
              <div 
                className={`transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <Link to={dataAiAgent.section_cta_url}>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group w-full sm:w-auto text-sm sm:text-base"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  {dataAiAgent.section_cta_text}
                </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Right Column - Visual */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Radial glow behind visual */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.08) 0%, transparent 60%)',
                filter: 'blur(60px)'
              }}
            />
            <AIOrbitVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAcceleratorsSection;
