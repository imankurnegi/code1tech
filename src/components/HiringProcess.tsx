import { useState, useEffect, useRef } from "react";
import { ClipboardList, UserCheck, Rocket, Shield, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Requirement Mapping",
    description: "We start by carefully evaluating your specific needs, like technical skill, cultural fit, and role expectations. We then determine the scope of work and responsibilities, ensuring total clarity before we begin matching the best talent to your organisation."
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Talent Match",
    description: "We present only a shortlist of pre-screened professionals who meet your skill needs and cultural fit. This saves you time and effort, knowing that every candidate you engage has been vetted to uphold your vision."
  },
  {
    number: "03",
    icon: Rocket,
    title: "Onboarding Support",
    description: "After you make a hiring decision, we manage the entire onboarding process virtually. We introduce the candidate into your systems, align workflows and tools, and ensure your new remote worker's productivity from day one."
  },
  {
    number: "04",
    icon: Shield,
    title: "Ongoing Support",
    description: "Our job isn't finished once a hire is made; we track performance and compliance and efficiently scale the team as your business grows, providing stability, efficiency, and long-term value throughout the engagement."
  }
];

const HiringProcess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showCTA, setShowCTA] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [ctaPulse, setCtaPulse] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for initial visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShowCTA(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Looping animation - cycles through steps every 11 seconds (2.75s per step)
  useEffect(() => {
    if (!isVisible || isPaused) return;

    const stepDuration = 2750; // Time each step stays active
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const nextStep = (prev + 1) % steps.length;
        // Trigger CTA pulse when cycle completes (going back to step 0)
        if (nextStep === 0) {
          setCtaPulse(true);
          setTimeout(() => setCtaPulse(false), 1500);
        }
        return nextStep;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, isPaused]);

  // Pause animation on hover
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsPaused(true);
    setActiveStep(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsPaused(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(222,45%,6%)] to-[hsl(222,47%,5%)]" />
      
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Floating particles - very subtle */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Ambient glows - subtle */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/2 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Transparent</span> Hiring
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            We keep hiring simple, transparent, and efficient.
          </p>
        </div>

        {/* Desktop: Horizontal Animated Timeline */}
        <div className="hidden lg:block max-w-6xl mx-auto mb-16">
          <div className="relative">
            {/* Timeline Line Container - BEHIND everything with z-0 */}
            <div className="absolute top-[60px] left-[12%] right-[12%] h-[2px] z-0">
              {/* Base line - very subtle */}
              <div 
                className={`h-full bg-border/10 transition-all duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* Animated gradient line - slow 14s loop */}
              <div 
                className="absolute inset-0 h-full overflow-hidden"
                style={{
                  opacity: isVisible ? 0.4 : 0
                }}
              >
                <div 
                  className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                  style={{
                    animation: isVisible ? 'line-flow 14s linear infinite' : 'none'
                  }}
                />
              </div>
            </div>

            {/* Steps - z-10 to be above the line */}
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCurrent = activeStep === index;
                const isHovered = hoveredIndex === index;
                const isHighlighted = isCurrent || isHovered;
                
                return (
                  <div
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={`group relative transition-all duration-1000 ease-out ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                      transform: isHighlighted ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    {/* Icon Container */}
                    <div className="flex justify-center mb-8">
                      <div className={`relative w-[120px] h-[120px] rounded-full flex items-center justify-center transition-all duration-1000 bg-[hsl(222,47%,5%)] ${
                        isHighlighted ? "transform -translate-y-1" : ""
                      }`}>
                        {/* Background circle to cover the line */}
                        <div className="absolute inset-0 rounded-full bg-[hsl(222,47%,5%)]" />
                        
                        {/* Animated glowing ring - pulses when active */}
                        <div 
                          className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                            isHighlighted 
                              ? "border-accent/50 scale-105" 
                              : "border-border/10 scale-100"
                          }`}
                          style={{
                            animation: isHighlighted ? 'glow-ring 3s ease-in-out infinite' : 'none',
                            boxShadow: isHighlighted 
                              ? '0 0 30px 8px hsl(var(--accent) / 0.2), inset 0 0 20px 5px hsl(var(--accent) / 0.05)' 
                              : 'none'
                          }}
                        />
                        
                        {/* Subtle inner glow */}
                        <div className={`absolute inset-4 rounded-full transition-all duration-1000 ${
                          isHighlighted
                            ? "bg-accent/10"
                            : "bg-muted/5"
                        }`} />
                        
                        {/* Inner circle with icon */}
                        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 ${
                          isHighlighted ? "bg-accent/20" : "bg-muted/15"
                        }`}>
                          <Icon 
                            className={`w-7 h-7 transition-all duration-700 ${
                              isHighlighted ? "text-accent" : "text-muted-foreground/40"
                            }`} 
                          />
                        </div>
                        
                        {/* Step number badge */}
                        <div className={`absolute -top-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-700 ${
                          isHighlighted 
                            ? "bg-accent text-primary-foreground scale-110" 
                            : "bg-muted/30 text-muted-foreground/40 border border-border/10"
                        }`}>
                          {step.number}
                        </div>
                      </div>
                    </div>

                    {/* Content - Perfectly centered with equal widths */}
                    <div className="text-center flex flex-col items-center">
                      <h3 className={`text-lg font-semibold mb-4 transition-all duration-700 ${
                        isHighlighted ? "text-foreground" : "text-foreground/50"
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-all duration-700 min-h-[120px] max-w-[300px] mx-auto cursor-default text-justify ${
                        isHighlighted ? "text-muted-foreground opacity-100" : "text-muted-foreground/50 opacity-70"
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Animated Timeline */}
        <div className="lg:hidden max-w-2xl mx-auto mb-12">
          <div className="relative">
            {/* Vertical connector line - z-0 behind everything */}
            <div className="absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-[1px] z-0">
              {/* Base line */}
              <div className="h-full bg-border/10" />
              {/* Animated gradient */}
              <div 
                className="absolute inset-0 w-full overflow-hidden"
                style={{
                  opacity: isVisible ? 0.4 : 0
                }}
              >
                <div 
                  className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-accent/50 to-transparent"
                  style={{
                    animation: isVisible ? 'line-flow-vertical 14s linear infinite' : 'none'
                  }}
                />
              </div>
            </div>

            {/* Steps - z-10 above the line */}
            <div className="space-y-10 sm:space-y-12 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCurrent = activeStep === index;
                const isHighlighted = isCurrent;
                
                return (
                  <div
                    key={index}
                    onClick={() => { setActiveStep(index); setIsPaused(true); }}
                    className={`relative flex gap-5 sm:gap-6 transition-all duration-700 ease-out cursor-pointer ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div 
                        className={`w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center transition-all duration-700 bg-[hsl(222,47%,5%)] ${
                          isHighlighted 
                            ? "border-2 border-accent/50" 
                            : "border border-border/20"
                        }`}
                        style={{
                          boxShadow: isHighlighted 
                            ? '0 0 25px 6px hsl(var(--accent) / 0.15)' 
                            : 'none',
                          transform: isHighlighted ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        {/* Background to cover line */}
                        <div className="absolute inset-0 rounded-full bg-[hsl(222,47%,5%)]" />
                        
                        <Icon 
                          className={`relative z-10 w-6 sm:w-7 h-6 sm:h-7 transition-colors duration-700 ${
                            isHighlighted ? "text-accent" : "text-muted-foreground/40"
                          }`}
                        />
                      </div>
                      {/* Step number */}
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-700 ${
                        isHighlighted 
                          ? "bg-accent text-primary-foreground scale-110" 
                          : "bg-muted/30 text-muted-foreground/40"
                      }`}>
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className={`text-base sm:text-lg font-semibold mb-3 transition-all duration-700 ${
                        isHighlighted ? "text-foreground" : "text-foreground/50"
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-all duration-700 ${
                        isHighlighted ? "text-muted-foreground opacity-100" : "text-muted-foreground/50 opacity-70"
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div 
          className={`flex justify-center items-center gap-3 mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => { setActiveStep(index); setIsPaused(true); }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="group relative p-1"
              aria-label={`Go to step ${index + 1}`}
            >
              {/* Outer glow ring for active */}
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-700 ${
                  activeStep === index 
                    ? "bg-accent/20 scale-150" 
                    : "bg-transparent scale-100"
                }`}
              />
              {/* Dot */}
              <div 
                className={`relative w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  activeStep === index 
                    ? "bg-accent scale-125" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
              {/* Connecting line (except last) */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-1/2 left-full w-3 h-[2px] -translate-y-1/2 transition-all duration-700 ${
                    activeStep > index ? "bg-accent/40" : "bg-border/20"
                  }`}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA - Animates in after steps complete */}
        <div
          className={`text-center transition-all duration-1000 ${
            showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button 
            className={`group inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/15 border border-accent/30 hover:border-accent/40 text-accent px-6 py-3 rounded-full text-base font-medium transition-all duration-500 hover:shadow-[0_0_30px_8px_hsl(var(--accent)/0.1)] ${
              ctaPulse ? 'animate-cta-pulse' : ''
            }`}
          >
            <span>Start Hiring with Confidence</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Custom animations - slow, premium */}
      <style>{`
        @keyframes line-flow {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        @keyframes line-flow-vertical {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        
        @keyframes glow-ring {
          0%, 100% { 
            box-shadow: 0 0 25px 6px hsl(var(--accent) / 0.15), inset 0 0 15px 3px hsl(var(--accent) / 0.03);
            transform: scale(1.05);
          }
          50% { 
            box-shadow: 0 0 40px 12px hsl(var(--accent) / 0.25), inset 0 0 25px 6px hsl(var(--accent) / 0.08);
            transform: scale(1.08);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
          50% { transform: translateY(-15px) translateX(8px); opacity: 0.3; }
        }
        
        @keyframes cta-pulse {
          0% { 
            box-shadow: 0 0 0 0 hsl(var(--accent) / 0.4);
            transform: scale(1);
          }
          30% { 
            box-shadow: 0 0 25px 10px hsl(var(--accent) / 0.2);
            transform: scale(1.03);
          }
          100% { 
            box-shadow: 0 0 0 0 hsl(var(--accent) / 0);
            transform: scale(1);
          }
        }
        
        .animate-cta-pulse {
          animation: cta-pulse 1.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HiringProcess;
