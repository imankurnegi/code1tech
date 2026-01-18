import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { Rocket, Cloud, Brain, BarChart3, Database, ShieldCheck, ArrowRight, TrendingUp, Zap, Lock } from "lucide-react";
const services = [{
  icon: Rocket,
  title: "Accelerator Development",
  description: "We develop custom, industry-specific accelerators that allow for streamlined workflows for reporting and invoicing, reduced repetitive activities, and lower project timelines by as much as 40%, providing expedited ROI and visible efficiency improvements.",
  outcomes: [{
    icon: Zap,
    text: "60% faster time-to-market"
  }, {
    icon: TrendingUp,
    text: "Reduced development costs"
  }, {
    icon: Lock,
    text: "Enterprise-grade security built-in"
  }]
}, {
  icon: Cloud,
  title: "Cloud Migration & Modernization",
  description: "Confidently move your business to the cloud. We help migrate everything securely and totally ensure that your information is fully secure, cost-effective, and scalable for continued benefits, including customized dashboards, reports, and analytics tools.",
  outcomes: [{
    icon: Zap,
    text: "Zero-downtime migration"
  }, {
    icon: TrendingUp,
    text: "40% infrastructure cost reduction"
  }, {
    icon: Lock,
    text: "Enhanced security posture"
  }]
}, {
  icon: Brain,
  title: "ML Pipelines & MLOps",
  description: "Get your AI lifecycle to maximum productivity with MLOps. Our engineers build production-ready ML pipelines and automate both training and ongoing monitoring and deployment, creating machine learning solutions that are faster, smarter, and reliably scalable.",
  outcomes: [{
    icon: Zap,
    text: "Automated model deployment"
  }, {
    icon: TrendingUp,
    text: "10x faster experimentation cycles"
  }, {
    icon: Lock,
    text: "Full model governance & compliance"
  }]
}, {
  icon: BarChart3,
  title: "Business Intelligence",
  description: "Our Business Intelligence solutions simplify complexity with interactive dashboards and near-real-time analytics. From performance tracking to predictive trends, our BI solutions help you see what matters, act fast, and grow smarter.",
  outcomes: [{
    icon: Zap,
    text: "Real-time decision making"
  }, {
    icon: TrendingUp,
    text: "Unified data visibility"
  }, {
    icon: Lock,
    text: "Role-based access control"
  }]
}, {
  icon: Database,
  title: "Data Warehouse & Lakehouse",
  description: "Bring all of your data into one scalable, modern architecture. Regardless of data being structured or unstructured, we build warehousing and lakehouse solutions to allow any team immediate access to data and insights for reporting and analysis.",
  outcomes: [{
    icon: Zap,
    text: "Unified data architecture"
  }, {
    icon: TrendingUp,
    text: "Petabyte-scale analytics"
  }, {
    icon: Lock,
    text: "ACID-compliant transactions"
  }]
}, {
  icon: ShieldCheck,
  title: "Data Quality & Governance",
  description: "You can only make confident decisions when you truly understand your data. We build robust governance frameworks that ensure accuracy, security, and compliance.",
  outcomes: [{
    icon: Zap,
    text: "Automated data validation"
  }, {
    icon: TrendingUp,
    text: "Complete data lineage"
  }, {
    icon: Lock,
    text: "Regulatory compliance ready"
  }]
}];
const TechnologyServicesPanel = () => {
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
            const Icon = service.icon;
            const isActive = index === activeIndex;
            return <button key={index} onClick={() => handleServiceChange(index)} className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 min-w-[100px] ${isActive ? "bg-accent/10 border-accent shadow-lg shadow-accent/20" : "bg-muted/30 border-border/50 hover:border-accent/50 hover:bg-muted/50"}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-accent/20" : "bg-muted"}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
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
            const Icon = service.icon;
            const isActive = index === activeIndex;
            return <button key={index} onClick={() => handleServiceChange(index)} className={`group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${isActive ? "bg-accent/10 border-accent shadow-lg shadow-accent/20" : "bg-muted/30 border-border/50 hover:border-accent/50 hover:bg-muted/50"}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-accent/20" : "bg-muted group-hover:bg-accent/10"}`}>
                    <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
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
            
            <div className={`relative p-6 md:p-8 transition-all duration-300 ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
              {/* Service Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                  <activeService.icon className="w-7 h-7 text-accent" />
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
                  Key Outcomes
                </h4>
                <div className="grid gap-3">
                  {activeService.outcomes.map((outcome, index) => {
                  const OutcomeIcon = outcome.icon;
                  return <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <OutcomeIcon className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground text-sm font-medium">
                          {outcome.text}
                        </span>
                      </div>;
                })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center px-4 sm:px-0 mt-12 md:mt-16 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Button size="lg" className="group w-full sm:w-auto bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground px-6 sm:px-8 py-6 text-sm sm:text-base font-semibold rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
            Unlock Your Competitive Edge
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </div>
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