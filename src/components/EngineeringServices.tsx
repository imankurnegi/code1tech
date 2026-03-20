import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCategory {
  name: string;
  description: string;
  acf: {
    card_image: string;
    card_learn_more: string;
  };
}

interface EngineeringData {
  section_heading: string;
  section_sub_heading: string;
  service_categories: ServiceCategory[];
}

interface EngineeringServicesProps {
  dataEngineering?: EngineeringData;
}

// Animated network background hook
const useNetworkAnimation = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    const initNodes = () => {
      nodes.length = 0;
      const count = window.innerWidth < 768 ? 25 : 50;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw grid
      ctx.strokeStyle = "rgba(95, 194, 227, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.offsetHeight);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.offsetWidth, y);
        ctx.stroke();
      }
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.4)";
        ctx.fill();

        // Draw connections
        nodes.slice(i + 1).forEach((node2) => {
          const dx = node.x - node2.x;
          const dy = node.y - node2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = `rgba(95, 194, 227, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(animate);
    };
    resize();
    initNodes();
    animate();
    const handleResize = () => {
      resize();
      initNodes();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);
};

const EngineeringServices = ({ dataEngineering }: EngineeringServicesProps) => {
  // Transform API data to match component structure
  const services = dataEngineering?.service_categories?.map((category, index) => ({
    tag: category.name.split(' ')[0].toUpperCase(),
    title: category.name,
    description: category.description,
    image: category.acf.card_image,
    ctaLink: category.acf.card_learn_more,
  })) || [];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNetworkAnimation(canvasRef);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      },
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
      id="services"
      style={{
        background:
          "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 5%) 100%)",
      }}
    >
      {/* Animated Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: 0.5,
        }}
      />

      {/* Top fade gradient for seamless connection from GrowthStrategies */}
      <div
        className="absolute top-0 left-0 right-0 h-48 md:h-64 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, hsl(222 47% 5%) 0%, hsl(222 47% 5%) 40%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(95, 194, 227, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            <span className="text-foreground text-4xl">
              {dataEngineering?.section_heading}
            </span>
          </h2> */}

          <h3 
            className="text-3xl sm:text-4xl lg:text-4xl font-bold text-foreground leading-tight"
            dangerouslySetInnerHTML={{ __html: dataEngineering?.section_heading ?? "" }}
          />

          <p className="text-muted-foreground text-base lg:text-lg mt-4 max-w-xl mx-auto">
            {dataEngineering?.section_sub_heading}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                transitionDelay: `${200 + index * 150}ms`,
              }}
            >
              {/* Card */}
              <div
                className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(95, 194, 227, 0.25) 0%, rgba(95, 194, 227, 0.08) 100%)",
                    filter: "blur(24px)",
                  }}
                />

                {/* Border glow on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    border: "1px solid rgba(95, 194, 227, 0.3)",
                  }}
                />

                {/* Image Container - Top Half */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle bottom gradient for text readability */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Content - Bottom Half */}
                <div className="relative p-6 md:p-8">
                  {/* Service Tag */}
                  <span className="inline-block text-[10px] font-semibold tracking-[0.25em] text-accent/60 mb-3 uppercase">
                    {service.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight text-primary-foreground" dangerouslySetInnerHTML={{ __html: service.title }} />

                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-xs text-left">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <Link to={service.ctaLink}>
                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto text-foreground/70 hover:text-accent hover:bg-transparent"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  </Link>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade for seamless transition to AIAcceleratorsSection */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to top, hsl(222 47% 5%) 0%, hsl(222 47% 5%) 40%, transparent 100%)",
        }}
      />
    </section>
  );
};
export default EngineeringServices;
