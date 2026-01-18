import { useState, useEffect, useRef } from "react";
import { Target, Users, MessageSquare, Shuffle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const models = [{
  icon: Target,
  title: "Project-Based",
  description: "Ideal for one-off projects with a defined scope. We manage the entire delivery process, ensuring quality, predictable timelines, and costs, making it suitable for businesses testing new concepts or addressing specific issues quickly."
}, {
  icon: Users,
  title: "Dedicated Teams",
  description: "We mobilize qualified experts to work solely for you, functioning much like an in-house team. Maintaining the same team throughout the project drive ensures continuity, cultural fit, and scalability for long-term engagements."
}, {
  icon: MessageSquare,
  title: "Consulting & Advisory",
  description: "Our specialists provide hands-on support for outsourcing and digital transformation. From strategy and vendor selection to implementation, we help organizations make better decisions, reduce risk, and create sustainable opportunities for growth."
}, {
  icon: Shuffle,
  title: "Hybrid Models",
  description: "A flexible mix of outsourcing and in-sourcing. Organizations maintain control over their core functions and are comfortable outsourcing repetitive or specialized tasks, thereby reducing time-to-delivery and increasing operational flexibility."
}];
const WorkWithUs = () => {
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
  return <section ref={sectionRef} className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(222,45%,6%)] to-[hsl(222,47%,5%)]" />
      
      {/* Top fade for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)'
    }} />
      
      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
    }} />
      
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.012)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-accent/15 rounded-full animate-pulse" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${3 + Math.random() * 3}s`
      }} />)}
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-14 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Work With Us, <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Your Way</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            We understand every business runs differently, so we offer flexible engagement:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 max-w-6xl mx-auto mb-10 md:mb-16">
          {models.map((model, index) => {
          const Icon = model.icon;
          const isHovered = hoveredIndex === index;
          return <div key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`group relative rounded-2xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${isHovered ? "-translate-y-2" : ""}`} style={{
            transitionDelay: `${100 + index * 75}ms`
          }}>
                {/* Glass card background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-md border transition-all duration-300 ${isHovered ? "border-accent/50 shadow-xl shadow-accent/15" : "border-border/30"}`} />
                
                {/* Subtle glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-accent/5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />

                <div className="relative p-4 sm:p-6 md:p-7 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-5 transition-all duration-300 ${isHovered ? "bg-accent/20 scale-105" : "bg-muted/50"}`}>
                    <Icon className={`w-5 sm:w-6 h-5 sm:h-6 transition-colors duration-300 ${isHovered ? "text-accent" : "text-muted-foreground"}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-sm sm:text-lg font-bold mb-2 sm:mb-3 transition-colors duration-300 ${isHovered ? "text-foreground" : "text-foreground/90"}`}>
                    {model.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-grow text-justify">
                    {model.description}
                  </p>
                </div>
              </div>;
        })}
        </div>

        {/* CTA */}
        <div className={`text-center px-4 sm:px-0 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Button size="lg" className="group w-full sm:w-auto bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground px-6 sm:px-8 py-6 text-sm sm:text-base font-semibold rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
            Schedule a Strategy Call
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </div>
      </div>
    </section>;
};
export default WorkWithUs;