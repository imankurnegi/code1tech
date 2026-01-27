import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";

interface TestimonialItem {
  ID: number;
  post_title: string;
  post_content: string;
  acf: {
    designation: string;
    company: string;
  };
}

interface TestimonialsData {
  testimonial_heading: string;
  testimonials: TestimonialItem[];
}

interface TestimonialsSectionProps {
  dataTestimonials: TestimonialsData;
}

const stripHtml = (html: string): string => {
  if (!html) return "";

  const cleanText = html.replace(/<[^>]*>?/gm, '');

  if (typeof document !== 'undefined') {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = cleanText;
    return tmp.textContent || tmp.innerText || "";
  }

  return cleanText;
};

const TestimonialsSection = ({ dataTestimonials }: TestimonialsSectionProps) => {
  const testimonials = dataTestimonials?.testimonials?.map(item => ({
    quote: stripHtml(item.post_content),
    name: item.post_title,
    role: item.acf?.designation,
    company: item.acf?.company
  })) || [];
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll effect
  useEffect(() => {
    if (!scrollRef.current || isPaused) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when reaching halfway (for seamless loop)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  if (!dataTestimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,5%)] via-[hsl(222,45%,6%)] to-[hsl(222,47%,5%)]" />
      
      {/* Top/Bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{ background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{ background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(222,45%,6%)] to-background" />
      
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.008)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 md:mb-16 px-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 [&>span]:bg-gradient-to-r [&>span]:from-[#5FC2E3] [&>span]:to-[#0077B6] [&>span]:bg-clip-text [&>span]:text-transparent"
            dangerouslySetInnerHTML={{ __html: dataTestimonials?.testimonial_heading}}
          />
          
          {/* Glowing divider */}
          <div className="relative w-24 h-px mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
          </div>
        </div>

        {/* Testimonials Carousel - Desktop */}
        <div 
          className={`hidden md:block transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-6 overflow-x-hidden px-8 cursor-grab active:cursor-grabbing"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[420px]"
              >
                {/* Glassmorphism card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/15 backdrop-blur-md border border-border/20 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/10" />
                
                <div className="relative p-7">
                  {/* Quote icon */}
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-5">
                    <Quote className="w-5 h-5 text-accent" />
                  </div>

                  {/* Quote text */}
                  <p className="text-foreground/90 text-base leading-relaxed mb-6 min-h-[100px]">
                    {testimonial.quote}
                  </p>

                  {/* Client info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center">
                      <span className="text-foreground font-semibold text-sm">
                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-foreground font-semibold text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        {testimonial.role}
                      </p>
                      <p className="text-accent/80 text-xs">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials - Mobile Swipeable */}
        <div 
          className={`md:hidden transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[320px] snap-center"
              >
                {/* Glassmorphism card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/15 backdrop-blur-md border border-border/20" />
                
                <div className="relative p-6">
                  {/* Quote icon */}
                  <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center mb-4">
                    <Quote className="w-4 h-4 text-accent" />
                  </div>

                  {/* Quote text */}
                  <p className="text-foreground/90 text-sm leading-relaxed mb-5">
                    {testimonial.quote}
                  </p>

                  {/* Client info */}
                  <div className="flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center">
                      <span className="text-foreground font-semibold text-xs">
                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-foreground font-semibold text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"
              />
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
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

export default TestimonialsSection;
