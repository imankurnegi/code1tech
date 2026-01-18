import { Button } from "@/components/ui/button";
import { Calendar, Zap, Bot, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AIOrbitVisual from "./AIOrbitVisual";

const AIAcceleratorsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const valuePoints = [
    { icon: Zap, label: "Faster Automation" },
    { icon: Bot, label: "Scalable AI Agents" },
    { icon: TrendingUp, label: "Measurable ROI" },
  ];

  return (
    <section
      ref={sectionRef}
      className="pb-16 md:pb-24 lg:pb-28 relative overflow-hidden"
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
          <div className="max-w-xl">
            {/* Heading */}
            <h2 
              className={`text-4xl font-bold text-foreground mb-4 leading-tight transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">AI Agents</span> and{" "}
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Accelerators</span> to Business Operations While You Focus on Expansion!
            </h2>

            {/* Subheading */}
            <p 
              className={`text-muted-foreground text-base sm:text-lg lg:text-xl mb-6 font-light transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Accelerators That Simplify. AI That Scales. Amplify{" "}
              <span className="text-accent font-semibold">ROI</span>.
            </p>

            {/* Body Content */}
            <p 
              className={`text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 text-justify transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Reduce intricacy and enhance speed with tailored accelerators, capped ETL/ELT stacks, and automated systems built to modernize your data infrastructure and increase efficiencies. Our experts develop AI-powered agents, including virtual assistants, chatbots, and workflows, that improve operations, enhance customer engagement, and enable faster, smarter decision-making.
            </p>

            {/* Additional Text */}
            <p 
              className={`text-foreground/80 text-sm sm:text-base leading-relaxed mb-8 font-medium text-justify transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Don't let your growth potential sit idle. Let's build solutions specific to your original needs and operational goals.
            </p>

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
            <div 
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Button variant="hero" size="lg" className="group w-full sm:w-auto text-sm sm:text-base">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                Schedule Your Free Strategy Call
              </Button>
            </div>
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
