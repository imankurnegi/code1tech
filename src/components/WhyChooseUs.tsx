import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardIcon {
  id: number;
  url: string;
  alt: string;
  title: string;
  width: number;
  height: number;
}

interface BusinessCard {
  card_icon: CardIcon;
  card_heading: string;
  card_description: string;
}

interface WhyBusinessesData {
  section_heading: string;
  "business-card": BusinessCard[];
  section_cta_text: string;
  section_cta_url: string;
}

interface WhyChooseUsProps {
  dataWhyBusinesses?: WhyBusinessesData;
}

const WhyChooseUs = ({ dataWhyBusinesses }: WhyChooseUsProps) => {
  // Transform API data to match component structure
  const pillars = dataWhyBusinesses?.["business-card"]?.map((card) => ({
    icon: card.card_icon.url,
    title: card.card_heading,
    description: card.card_description,
  })) || [];
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const leftPillars = pillars.slice(0, 3);
  const rightPillars = pillars.slice(3, 5);
  const renderPillar = (pillar: typeof pillars[0], index: number, globalIndex: number) => {
    const isHovered = hoveredIndex === globalIndex;
    return <div key={globalIndex} onMouseEnter={() => setHoveredIndex(globalIndex)} onMouseLeave={() => setHoveredIndex(null)} className={`group relative transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${isHovered ? "-translate-y-1" : ""}`} style={{
      transitionDelay: `${200 + globalIndex * 80}ms`
    }}>
        {/* Glassmorphism panel */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-md transition-all duration-300 ${isHovered ? "shadow-xl shadow-accent/15" : ""}`} />
        
        {/* Subtle glow on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-accent/5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
        
        {/* Border glow */}
        <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${isHovered ? "border-accent/40" : "border-border/20"}`} />

        <div className="relative p-6 md:p-7">
          {/* Icon */}
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${isHovered ? "bg-accent/20" : "bg-muted/40"}`}>
            <img 
              src={pillar.icon}
              alt={pillar.title}
              className="w-5 h-5 transition-all duration-300"
              style={{
                filter: isHovered 
                  ? 'brightness(0) saturate(100%) invert(71%) sepia(46%) saturate(589%) hue-rotate(144deg) brightness(95%) contrast(92%)' 
                  : 'brightness(0) saturate(100%) invert(50%) sepia(8%) saturate(295%) hue-rotate(180deg) brightness(95%) contrast(88%)'
              }}
            />
          </div>

          {/* Title */}
          <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${isHovered ? "text-foreground" : "text-foreground/90"}`}>
            {pillar.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {pillar.description}
          </p>
        </div>
      </div>;
  };
  return <section ref={sectionRef} className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(225,50%,5%)] to-[hsl(222,47%,5%)]" />
      
      {/* Top/Bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)'
    }} />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
    }} />
      
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.008)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-accent/10 rounded-full" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `pulse ${4 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 4}s`
      }} />)}
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        {dataWhyBusinesses && (
          <div className={`text-center mb-10 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4 px-2 lg:text-4xl [&>span]:bg-gradient-to-r [&>span]:from-[#5FC2E3] [&>span]:to-[#0077B6] [&>span]:bg-clip-text [&>span]:text-transparent"
              dangerouslySetInnerHTML={{ __html: dataWhyBusinesses.section_heading }}
            />
            
            {/* Glowing divider */}
            <div className="relative w-24 sm:w-32 h-px mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
            </div>
          </div>
        )}

        {/* Desktop: Asymmetric Value Grid */}
        <div className="hidden lg:grid grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {/* Left Column - 3 pillars */}
          <div className="space-y-6">
            {leftPillars.map((pillar, index) => renderPillar(pillar, index, index))}
          </div>
          
          {/* Right Column - 2 pillars centered vertically */}
          <div className="flex flex-col justify-center space-y-6 pt-12">
            {rightPillars.map((pillar, index) => renderPillar(pillar, index, index + 3))}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Stack with Numbers */}
        <div className="lg:hidden space-y-4 max-w-2xl mx-auto mb-10">
          {pillars.map((pillar, index) => {
          return <div key={index} className={`group relative transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{
            transitionDelay: `${200 + index * 80}ms`
          }}>
                {/* Glassmorphism panel */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-md border border-border/20" />

                <div className="relative p-4 sm:p-6 flex gap-4 sm:gap-5">
                  {/* Number badge */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                      <span className="text-accent text-sm font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-muted/40 flex items-center justify-center">
                        <img 
                          src={pillar.icon}
                          alt={pillar.title}
                          className="w-4 h-4"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(71%) sepia(46%) saturate(589%) hue-rotate(144deg) brightness(95%) contrast(92%)'
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>;
        })}
        </div>

        {/* CTA Button */}
        {dataWhyBusinesses?.section_cta_text && (
          <div className={`text-center px-4 sm:px-0 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Button 
              size="lg" 
              className="group w-full sm:w-auto bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground px-6 sm:px-8 py-6 text-sm sm:text-base font-semibold rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
              onClick={() => {
                if (dataWhyBusinesses.section_cta_url) {
                  window.location.href = dataWhyBusinesses.section_cta_url;
                }
              }}
            >
              {dataWhyBusinesses.section_cta_text}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Button>
          </div>
        )}
      </div>
    </section>;
};
export default WhyChooseUs;