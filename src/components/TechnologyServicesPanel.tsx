import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { ArrowRight } from "lucide-react";

interface IconImage {
  id: number;
  url: string;
  alt: string;
  title: string;
  width: number;
  height: number;
}

interface ServiceCard {
  card_heading: string;
  card_description: string;
  key_text: string;
  key_team_1: string;
  key_item_1_icon: IconImage;
  key_team_2: string;
  key_item_2_icon: IconImage;
  key_team_3: string;
  key_item_3_icon: IconImage;
  card_icon: IconImage;
}

interface SmartTechnologyData {
  smart_tech_section: ServiceCard[];
  cta_text: string;
  cta_url: string;
}

interface TechnologyServicesPanelProps {
  dataSmartTechnology?: SmartTechnologyData;
}

const TechnologyServicesPanel = ({ dataSmartTechnology }: TechnologyServicesPanelProps) => {
  // Transform API data to match component structure
  const services = dataSmartTechnology?.smart_tech_section?.map((card) => ({
    icon: card.card_icon.url,
    title: card.card_heading,
    description: card.card_description,
    keyText: card.key_text,
    outcomes: [
      {
        icon: card.key_item_1_icon.url,
        text: card.key_team_1,
      },
      {
        icon: card.key_item_2_icon.url,
        text: card.key_team_2,
      },
      {
        icon: card.key_item_3_icon.url,
        text: card.key_team_3,
      },
    ],
  })) || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxOffset = useParallax(0.08);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const handleServiceChange = (index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 150);
  };
  const activeService = services[activeIndex];
  return <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center pb-16 md:pb-24 lg:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(222,47%,7%)] to-[hsl(222,47%,5%)]" />
      
      {/* Top fade for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)'
    }} />
      
      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
    }} />
      
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Ambient glow with parallax */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px]" style={{
      transform: `translate(-50%, calc(-50% + ${parallaxOffset * 0.3}px))`
    }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 lg:text-4xl">
            Smart Technology Services Built Around You
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Modular services designed to scale, secure, and accelerate your business.
          </p>
        </div>

        {/* Main Content */}
        <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Left Column - Service Selector */}
          {/* Mobile: Horizontal scroll */}
          <div className="lg:hidden flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {services.map((service, index) => {
            const isActive = index === activeIndex;
            return <button key={index} onClick={() => handleServiceChange(index)} className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 min-w-[100px] ${isActive ? "bg-accent/10 border-accent shadow-lg shadow-accent/20" : "bg-muted/30 border-border/50 hover:border-accent/50 hover:bg-muted/50"}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-accent/20" : "bg-muted"}`}>
                    <img 
                      src={service.icon} 
                      alt={service.title} 
                      className="w-5 h-5"
                      style={{
                        filter: isActive ? 'brightness(0) saturate(100%) invert(71%) sepia(46%) saturate(589%) hue-rotate(144deg) brightness(95%) contrast(92%)' : 'brightness(0) saturate(100%) invert(50%) sepia(8%) saturate(295%) hue-rotate(180deg) brightness(95%) contrast(88%)'
                      }}
                    />
                  </div>
                  <span className={`text-xs font-medium text-center leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {service.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </button>;
          })}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3 lg:w-[340px] flex-shrink-0">
            {services.map((service, index) => {
            const isActive = index === activeIndex;
            return <button key={index} onClick={() => handleServiceChange(index)} className={`group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${isActive ? "bg-accent/10 border-accent shadow-lg shadow-accent/20" : "bg-muted/30 border-border/50 hover:border-accent/50 hover:bg-muted/50"}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-accent/20" : "bg-muted group-hover:bg-accent/10"}`}>
                    <img 
                      src={service.icon} 
                      alt={service.title} 
                      className="w-6 h-6 transition-all duration-300"
                      style={{
                        filter: isActive 
                          ? 'brightness(0) saturate(100%) invert(71%) sepia(46%) saturate(589%) hue-rotate(144deg) brightness(95%) contrast(92%)' 
                          : 'brightness(0) saturate(100%) invert(50%) sepia(8%) saturate(295%) hue-rotate(180deg) brightness(95%) contrast(88%)'
                      }}
                    />
                  </div>
                  <span className={`text-sm font-medium text-center leading-tight transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {service.title}
                  </span>
                </button>;
          })}
          </div>

          {/* Right Column - Content Panel */}
          <div className="flex-1 relative">
            {/* Glass panel background */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl border border-border/50 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-accent/5 rounded-2xl opacity-50" />
            
            {activeService && (
              <div className={`relative p-6 md:p-8 transition-all duration-300 ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
                {/* Service Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                    <img 
                      src={activeService.icon} 
                      alt={activeService.title} 
                      className="w-7 h-7"
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(71%) sepia(46%) saturate(589%) hue-rotate(144deg) brightness(95%) contrast(92%)'
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {activeService.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8 text-justify">
                  {activeService.description}
                </p>

                {/* Outcomes */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-accent uppercase tracking-wider">
                    {activeService.keyText}
                  </h4>
                  <div className="grid gap-3">
                    {activeService.outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <img 
                            src={outcome.icon} 
                            alt={outcome.text} 
                            className="w-4 h-4"
                            style={{
                              filter: 'brightness(0) saturate(100%) invert(71%) sepia(46%) saturate(589%) hue-rotate(144deg) brightness(95%) contrast(92%)'
                            }}
                          />
                        </div>
                        <span className="text-foreground text-sm font-medium">
                          {outcome.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        {dataSmartTechnology?.cta_text && (
          <div className={`text-center px-4 sm:px-0 mt-12 md:mt-16 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Button 
              size="lg" 
              className="group w-full sm:w-auto bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground px-6 sm:px-8 py-6 text-sm sm:text-base font-semibold rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
              onClick={() => {
                if (dataSmartTechnology.cta_url) {
                  window.location.href = dataSmartTechnology.cta_url;
                }
              }}
            >
              {dataSmartTechnology.cta_text}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Button>
          </div>
        )}
      </div>

      {/* Hide scrollbar utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>;
};
export default TechnologyServicesPanel;