import { useState, useEffect, useRef } from "react";
import { Brain, Cloud, BarChart3, Building2, Cog } from "lucide-react";

const technologies = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    tools: ["TensorFlow", "PyTorch", "Azure AI", "AWS SageMaker"]
  },
  {
    icon: Cloud,
    title: "Cloud Platforms",
    tools: ["Microsoft Azure", "AWS", "Google Cloud"]
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    tools: ["Power BI", "Tableau", "Snowflake", "Databricks"]
  },
  {
    icon: Building2,
    title: "Enterprise Systems",
    tools: ["SAP", "Oracle"]
  },
  {
    icon: Cog,
    title: "Automation",
    tools: ["UiPath", "Automation Anywhere", "Custom RPA Solutions"]
  }
];

const TechnologyStackSection = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-0 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(222,47%,6%)] to-[hsl(222,47%,5%)]" />
      
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Technologies B-World Relies On
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            We partner with leading platforms and continuously invest in emerging technology stacks for AI, cloud, data, and enterprise modernization.
          </p>
        </div>

        {/* Technology Cards - Desktop Grid */}
        <div className="hidden md:grid grid-cols-5 gap-4 max-w-7xl mx-auto mb-16">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative rounded-2xl transition-all duration-500 cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${isHovered ? "scale-105 z-10" : "scale-100"}`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                {/* Glass card background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-md border transition-all duration-300 ${
                  isHovered 
                    ? "border-accent/60 shadow-xl shadow-accent/20" 
                    : "border-border/40"
                }`} />
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-accent/10 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`} />

                <div className="relative p-5 flex flex-col items-center text-center min-h-[220px]">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    isHovered ? "bg-accent/20 scale-110" : "bg-muted/60"
                  }`}>
                    <Icon className={`w-7 h-7 transition-colors duration-300 ${
                      isHovered ? "text-accent" : "text-muted-foreground"
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-sm font-semibold mb-4 transition-colors duration-300 ${
                    isHovered ? "text-foreground" : "text-foreground/90"
                  }`}>
                    {tech.title}
                  </h3>

                  {/* Tool chips */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {tech.tools.map((tool, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-full text-center transition-all duration-300 ${
                          isHovered
                            ? "bg-accent/20 text-accent border border-accent/30"
                            : "bg-muted/50 text-muted-foreground border border-border/30"
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Cards - Mobile Horizontal Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide mb-12">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className={`flex-shrink-0 w-[260px] relative rounded-2xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                {/* Glass card background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-md border border-border/40" />

                <div className="relative p-5 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    {tech.title}
                  </h3>

                  {/* Tool chips */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {tech.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-full whitespace-nowrap bg-muted/50 text-muted-foreground border border-border/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <div
          className={`text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto italic">
            "With our technology expertise, we not only help businesses adopt digital tools but also unlock measurable ROI."
          </p>
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
    </section>
  );
};

export default TechnologyStackSection;
