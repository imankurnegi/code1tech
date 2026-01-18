import { useState, useEffect, useRef } from "react";
import { ArrowRight, TrendingUp, Clock, Users, Zap } from "lucide-react";

const caseStudies = [
  {
    industry: "Banking & Finance",
    title: "AI-Driven Automation",
    quote: "Automating 65% of compliance checks",
    description: "A leading financial services firm transformed operations with AI-powered automation that reduced risk.",
    results: [
      { value: "65%", label: "Efficiency" },
      { value: "$2.4M", label: "Savings" },
    ],
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop"
  },
  {
    industry: "Healthcare",
    title: "Intelligent Dashboards",
    quote: "Real-time analytics for faster care",
    description: "Unified platform with predictive analytics improved care quality across all facilities.",
    results: [
      { value: "45%", label: "Faster Dx" },
      { value: "98%", label: "Accuracy" },
    ],
    icon: Clock,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
  },
  {
    industry: "Retail & eCommerce",
    title: "Personalized Experiences",
    quote: "AI recommendations boost conversions",
    description: "AI-powered personalization transformed customer engagement and recovered abandoned carts.",
    results: [
      { value: "28%", label: "Revenue ↑" },
      { value: "40%", label: "Recovery" },
    ],
    icon: Users,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
  },
  {
    industry: "Manufacturing",
    title: "Smart Operations",
    quote: "Predictive maintenance revolution",
    description: "IoT-enabled predictive maintenance reduced downtime and optimized production efficiency.",
    results: [
      { value: "50%", label: "Less Downtime" },
      { value: "3x", label: "Efficiency" },
    ],
    icon: Zap,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
  }
];

const CaseStudiesSection = () => {
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Case <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Studies</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            Real-world problems. Measurable outcomes. Scalable growth.
          </p>
        </div>

        {/* Full-width Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {caseStudies.map((study, index) => {
            const IconComponent = study.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className="group relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden transition-all duration-500 hover:border-accent/40 hover:bg-card/50"
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image Section */}
                <div className="relative h-40 lg:h-44 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Industry badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-accent/90 backdrop-blur-sm rounded-full">
                    <span className="text-accent-foreground text-xs font-medium">{study.industry}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`absolute bottom-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-lg transition-all duration-300 ${
                    isHovered ? "bg-accent text-accent-foreground" : "text-accent"
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 lg:p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {study.title}
                  </h3>
                  
                  {/* Quote */}
                  <p className="text-accent/80 text-sm font-medium mb-2">
                    "{study.quote}"
                  </p>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {study.description}
                  </p>
                  
                  {/* Results */}
                  <div className="flex gap-4 mb-4">
                    {study.results.map((result, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-foreground font-bold text-lg">{result.value}</span>
                        <span className="text-muted-foreground text-xs">{result.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <button className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    isHovered ? "text-accent" : "text-muted-foreground"
                  }`}>
                    View Case Study
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`} />
                  </button>
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
