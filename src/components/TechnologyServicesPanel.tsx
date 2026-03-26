import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { ArrowRight } from "lucide-react";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "./DynamicIcon";
import { Link } from "react-router-dom";

interface Outcome {
  icon: string;
  text: string;
}

interface ServiceCard {
  post_title: string;
  post_content: string;
  sdb: {
    smart_technology_services_built_homepage: {
      icon: string;
      key_lists: Outcome[];
      key_text: string;
    };
  };
}

interface SmartTechnologyData {
  smart_technology_cards: ServiceCard[];
  smart_technology_cta_text: string;
  smart_technology_cta_url: string;
  heading: string;
  sub_heading: string;
}

interface TechnologyServicesPanelProps {
  dataSmartTechnology?: SmartTechnologyData;
}

const TechnologyServicesPanel = ({ dataSmartTechnology }: TechnologyServicesPanelProps) => {
  // Transform API data to match component structure
  const services = dataSmartTechnology?.smart_technology_cards?.map((card) => ({
    icon: card.sdb?.smart_technology_services_built_homepage?.icon || "",
    title: card.post_title || "",
    description: card.post_content || "",
    keyText: card.sdb?.smart_technology_services_built_homepage?.key_text || "",
    outcomes: card.sdb?.smart_technology_services_built_homepage?.key_lists || []
  })) || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxOffset = useParallax(0.08);
  useEffect(() => {
  if (typeof window === 'undefined') return;

  const el = sectionRef.current
  if (!el) return

  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight) {
    setIsVisible(true)
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(el)
      }
    },
    { threshold: 0.2 }
  )

  observer.observe(el)

  return () => observer.disconnect()
}, [])
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 lg:text-4xl" dangerouslySetInnerHTML={{ __html: addClassToSpan(dataSmartTechnology?.heading, "bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent")}} />
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            {dataSmartTechnology?.sub_heading}
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
                    <DynamicIcon name={service.icon} className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
                  </div>
                  <span 
                    className={`text-xs font-medium text-center leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                    dangerouslySetInnerHTML={{ __html: service.title}}
                  />
                </button>;
          })}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3 lg:w-[340px] flex-shrink-0">
            {services.map((service, index) => {
            const isActive = index === activeIndex;
            return <button key={index} onClick={() => handleServiceChange(index)} className={`group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${isActive ? "bg-accent/10 border-accent shadow-lg shadow-accent/20" : "bg-muted/30 border-border/50 hover:border-accent/50 hover:bg-muted/50"}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-accent/20" : "bg-muted group-hover:bg-accent/10"}`}>
                     <DynamicIcon name={service.icon} className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
                  </div>
                  <span 
                    className={`text-sm font-medium text-center leading-tight transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                    dangerouslySetInnerHTML={{ __html: service.title }}
                  />
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
                    <DynamicIcon name={activeService.icon} className="w-7 h-7 text-accent" />
                  </div>
                  <h3 
                    className="text-2xl font-bold text-foreground"
                    dangerouslySetInnerHTML={{ __html: activeService.title }}
                  />
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8 text-left">
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
                          <DynamicIcon name={outcome.icon} className="w-4 h-4 text-accent" />
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
        {dataSmartTechnology?.smart_technology_cta_url && (
          <div className={`text-center px-4 sm:px-0 mt-12 md:mt-16 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Link to={dataSmartTechnology.smart_technology_cta_url}>
            <Button 
              size="lg" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-12 group w-full sm:w-auto bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground px-6 sm:px-8 py-6 text-sm sm:text-base font-semibold rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
            >
              {dataSmartTechnology.smart_technology_cta_text}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Button>
            </Link>
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