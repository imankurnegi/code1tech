import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

import { api } from "@/api";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import ContactUsForm, { type ContactFormData } from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";
import { useQuery } from "@tanstack/react-query";

// Animated network canvas background
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initNodes = () => {
      nodes.length = 0;
      const count = window.innerWidth < 768 ? 20 : 45;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw grid
      ctx.strokeStyle = "rgba(95, 194, 227, 0.025)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.offsetHeight); ctx.stroke();
      }
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.offsetWidth, y); ctx.stroke();
      }

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        // Glow node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.5)";
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.05)";
        ctx.fill();

        // Connections
        nodes.slice(i + 1).forEach((node2) => {
          const dx = node.x - node2.x;
          const dy = node.y - node2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = `rgba(95, 194, 227, ${0.12 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(animate);
    };

    resize();
    initNodes();
    animate();
    const handleResize = () => { resize(); initNodes(); };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// Floating particles component
const FloatingParticles = ({ count = 15 }: { count?: number }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <div
        key={`fp-${i}`}
        className="absolute rounded-full bg-accent/20 hidden md:block"
        style={{
          width: `${2 + Math.random() * 3}px`,
          height: `${2 + Math.random() * 3}px`,
          left: `${5 + Math.random() * 90}%`,
          top: `${5 + Math.random() * 90}%`,
          animation: `float ${5 + Math.random() * 6}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 4}s`,
          boxShadow: "0 0 6px rgba(95, 194, 227, 0.4)",
        }}
      />
    ))}
  </>
);

// Pulsing glow orb
const PulsingGlow = ({ className, color = "rgba(95, 194, 227, 0.08)" }: { className: string; color?: string }) => (
  <div className={`absolute pointer-events-none hidden md:block ${className}`}>
    <div
      className="w-full h-full rounded-full"
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
  </div>
);

const EngineerAsAService = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [activePricing, setActivePricing] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["engineerServicePage"],
    queryFn: async () => {
      const [serviceData, contactFormFields] = await Promise.all([
        api.getEngineerAsAService(),
        api.getContactFormFields(),
      ]);

      return {
        serviceData,
        contactFormFields,
      };
    },
  });

  const handleFormSubmit = async (data: ContactFormData) => {
      const formData = new FormData();
      formData.append("your-name", data.firstName);
      formData.append("last-name", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("subject", data.subject ?? "");
      formData.append("message", data.message);
      await api.submitContactForm(formData);
    };

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  if (isLoading) return null;
  if (error) return null;

  const serviceData = data?.serviceData?.data;
  const contactFormFields = data?.contactFormFields ?? null;
  
  const pillars = serviceData?.engineer_as_a_service_page_section?.box_fields?.map((item) => {
    return {
      icon: item.box_icon,
      title: item.box_heading,
      image: item.box_image?.url || "",
      stat: item.badge_heading,
      statLabel: item.badge_text,
      description: item.box_description
    }
  }) || [];

  const eaasServices = serviceData?.eng_services_data?.map((service) => {
    return {
      icon: service.sdb.engineer_service_post_fields.service_box_icon,
      title: service.post_title,
      description: service.sdb.engineer_service_post_fields.service_box_description,
      benefits: service.sdb.engineer_service_post_fields.box_tags_fields,
      image: service.sdb.engineer_service_post_fields.service_box_image.url,
      link: service.post_name
    }
  }) || [];

  const processSteps = serviceData?.engineer_as_a_service_page_section?.how_we_work_box?.map((item, index) => {
    return {
      icon: item.box_icon, 
      title: item.box_heading, 
      description: item.box_description
    }
  }) || [];

  const advantages = serviceData?.engineer_as_a_service_page_section?.advanced_solutions_box?.map((item) => {
    return {
      icon: item.box_icon,
      title: item.box_heading,
      description: item.box_description
    }
  }) || [];

  const pricingModels = serviceData?.engineer_as_a_service_page_section?.pricing_engagement_section?.map((item) => {
    return {
      icon: item.icon,
      title: item.heading,
      description: item.description
    }
  }) || [];

  const securityItems = serviceData?.engineer_as_a_service_page_section?.security_section_box?.map((item) => {
    return {
      icon: item.box_icon,
      title: item.box_title,
      description: item.box_description
    }
  }) || [];

  // Animated stat counter with number count-up
  const AnimatedStat = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => {
    const [displayNum, setDisplayNum] = useState(0);
    const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");
    const hasStarted = useRef(false);

    useEffect(() => {
      if (!isVisible || hasStarted.current) return;
      const timeout = setTimeout(() => {
        hasStarted.current = true;
        const duration = 1600;
        const steps = 40;
        const increment = numericPart / steps;
        let current = 0;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          // Ease-out deceleration
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(eased * numericPart);
          setDisplayNum(Math.min(current, numericPart));
          if (step >= steps) {
            setDisplayNum(numericPart);
            clearInterval(interval);
          }
        }, duration / steps);
      }, delay);
      return () => clearTimeout(timeout);
    }, [isVisible, delay, numericPart]);

    return (
      <div
        className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">
          {displayNum}{suffix}
        </div>
        <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
      </div>
    );
  };
  return (
    <>
    <SeoTags
        title={serviceData?.seo?.title}
        description={serviceData?.seo?.description}
        ogImage={serviceData?.seo?.og_image}
      />
      {/* ====== HERO SECTION ====== */}
      <section className="relative py-8 lg:py-12 overflow-hidden" style={{
        background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)"
      }}>
        {/* Animated Network Background */}
        <NetworkCanvas />

        {/* Pulsing ambient glows */}
        <PulsingGlow className="top-0 right-0 w-[600px] h-[600px]" />
        <PulsingGlow className="bottom-0 left-0 w-[500px] h-[500px]" color="rgba(0, 78, 158, 0.1)" />

        {/* Floating particles */}
        <FloatingParticles count={12} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-8 lg:pt-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Image */}
            <div className={`relative transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-12 scale-95"}`}>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden" style={{
                  boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(95, 194, 227, 0.1)"
                }}>
                  <img 
                    src={serviceData?.banner_section?.banner_image?.url} 
                    alt={serviceData?.banner_section?.banner_image?.alt} 
                    className="w-full h-[350px] lg:h-[420px] object-cover transition-transform duration-[2s] hover:scale-105"
                    style={{ filter: "brightness(0.9) contrast(1.05)" }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                </div>

                {/* Animated corner accents */}
                <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-accent/40 rounded-tl-3xl transition-all duration-500 group-hover:w-24 group-hover:h-24" style={{ animation: "pulse 3s ease-in-out infinite" }} />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-3xl" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />

                {/* Floating stat cards with entrance animation */}
                <div className={`absolute -right-4 top-1/4 p-4 rounded-xl backdrop-blur-xl transition-all duration-1000 hidden sm:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(95, 194, 227, 0.2)",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(95, 194, 227, 0.1)",
                  transitionDelay: "600ms",
                  animation: "float 6s ease-in-out infinite"
                }}>
                  <div className="text-2xl font-bold text-accent font-mono">{serviceData?.banner_section?.floating_badge_fields[1]?.badge_heading}</div>
                  <div className="text-xs text-muted-foreground">{serviceData?.banner_section?.floating_badge_fields[1]?.badge_text}</div>
                </div>

                <div className={`absolute -left-4 bottom-1/4 p-4 rounded-xl backdrop-blur-xl transition-all duration-1000 hidden sm:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(95, 194, 227, 0.2)",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(95, 194, 227, 0.1)",
                  transitionDelay: "800ms",
                  animation: "float 5s ease-in-out infinite",
                  animationDelay: "2s"
                }}>
                  <div className="text-2xl font-bold text-accent font-mono">{serviceData?.banner_section?.floating_badge_fields[0]?.badge_heading}</div>
                  <div className="text-xs text-muted-foreground">{serviceData?.banner_section?.floating_badge_fields[0]?.badge_text}</div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(serviceData?.banner_section?.banner_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-lg text-left">
                {serviceData?.banner_section?.banner_description}
              </p>
              <p className="text-base font-semibold text-accent mb-6" style={{ animation: "pulse 3s ease-in-out infinite" }}>
                {serviceData?.banner_section?.highlighted_text}
              </p>
              
              <Link to={serviceData?.banner_section?.cta_url}>
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
              >
                  {serviceData?.banner_section?.cta_text}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
             </Link>
               </div>
          </div>

          {/* Animated Stats Bar */}
          <div className={`mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl backdrop-blur-2xl transition-all duration-1000 hover:scale-[1.01] hover:border-accent/25 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(95,194,227,0.04) 50%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(95, 194, 227, 0.15)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05)",
              transitionDelay: "1000ms",
              animation: isVisible ? "statsBarShimmer 6s ease-in-out infinite" : "none"
            }}
          >
            <AnimatedStat value={serviceData?.stats_section?.stats_fields[0]?.stats_numbers} label={serviceData?.stats_section?.stats_fields[0]?.stats_title} delay={1100} />
            <AnimatedStat value={serviceData?.stats_section?.stats_fields[1]?.stats_numbers} label={serviceData?.stats_section?.stats_fields[1]?.stats_title} delay={1250} />
            <AnimatedStat value={serviceData?.stats_section?.stats_fields[2]?.stats_numbers} label={serviceData?.stats_section?.stats_fields[2]?.stats_title} delay={1400} />
            <AnimatedStat value={serviceData?.stats_section?.stats_fields[3]?.stats_numbers} label={serviceData?.stats_section?.stats_fields[3]?.stats_title} delay={1550} />
          </div>
        </div>

        {/* CSS Keyframes */}
        <style>{`
          @keyframes flowDown {
            0% { top: -10px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes borderGlow {
            0%, 100% { border-color: rgba(95, 194, 227, 0.1); }
            50% { border-color: rgba(95, 194, 227, 0.3); }
          }
          @keyframes statsBarShimmer {
            0%, 100% { box-shadow: 0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05); }
            50% { box-shadow: 0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 50px rgba(95,194,227,0.1); }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes statsBarShimmer { 0%, 100% {} }
          }
        `}</style>
      </section>

      {/* ====== PILLARS SECTION ====== */}
      <section 
        id="pillars"
        ref={setSectionRef("pillars")}
        className="relative py-8 lg:py-12 overflow-hidden" 
        style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 100%)" }}
      >
        <FloatingParticles count={10} />
        <PulsingGlow className="top-1/4 left-0 w-[500px] h-[400px]" />
        <PulsingGlow className="bottom-1/4 right-0 w-[400px] h-[300px]" color="rgba(0, 78, 158, 0.06)" />

        {/* Animated circuit lines background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="pillarCircuit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(95,194,227,1)" />
                <stop offset="100%" stopColor="rgba(0,119,182,0.3)" />
              </linearGradient>
            </defs>
            <line x1="10%" y1="20%" x2="40%" y2="20%" stroke="url(#pillarCircuit)" strokeWidth="1">
              <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="60%" y1="80%" x2="90%" y2="80%" stroke="url(#pillarCircuit)" strokeWidth="1">
              <animate attributeName="opacity" values="0;1;0" dur="5s" begin="1s" repeatCount="indefinite" />
            </line>
            <line x1="50%" y1="10%" x2="50%" y2="40%" stroke="url(#pillarCircuit)" strokeWidth="1">
              <animate attributeName="opacity" values="0;1;0" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
            </line>
            <circle cx="40%" cy="20%" r="3" fill="rgba(95,194,227,0.8)">
              <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="60%" cy="80%" r="3" fill="rgba(95,194,227,0.8)">
              <animate attributeName="opacity" values="0;1;0" dur="5s" begin="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${visibleSections.pillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(serviceData?.engineer_as_a_service_page_section?.perfect_match_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <div className="w-16 h-[2px] mx-auto mb-5" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6)" }} />
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              {serviceData?.engineer_as_a_service_page_section?.perfect_match_description}
            </p>
          </div>

          {/* Pillar Cards - Creative Layout */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {pillars.map((pillar, index) => (
              <div 
                key={index}
                className={`group relative flex transition-all duration-700 ${visibleSections.pillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
                style={{ transitionDelay: `${index * 250}ms` }}
              >
                {/* Outer glow container */}
                <div className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" style={{
                  background: "linear-gradient(135deg, rgba(95, 194, 227, 0.4), rgba(0, 119, 182, 0.2), rgba(95, 194, 227, 0.1))",
                  filter: "blur(12px)",
                  zIndex: -1,
                }} />

                {/* Card */}
                <div className="relative h-full rounded-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-3" style={{
                  background: "hsl(222 47% 5%)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(95, 194, 227, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
                  isolation: "isolate",
                }}>
                  {/* Animated border trace */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" style={{
                      background: "linear-gradient(90deg, rgba(95, 194, 227, 0.6), rgba(0, 119, 182, 0.3), transparent)"
                    }} />
                    <div className="absolute top-0 right-0 w-[1px] h-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-200" style={{
                      background: "linear-gradient(180deg, rgba(95, 194, 227, 0.6), rgba(0, 119, 182, 0.3), transparent)"
                    }} />
                    <div className="absolute bottom-0 right-0 w-full h-[1px] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-[400ms]" style={{
                      background: "linear-gradient(270deg, rgba(95, 194, 227, 0.6), rgba(0, 119, 182, 0.3), transparent)"
                    }} />
                    <div className="absolute bottom-0 left-0 w-[1px] h-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-[600ms]" style={{
                      background: "linear-gradient(0deg, rgba(95, 194, 227, 0.6), rgba(0, 119, 182, 0.3), transparent)"
                    }} />
                  </div>

                  {/* Image Section with parallax-like zoom */}
                  <div className="relative h-48 sm:h-52 md:h-48 lg:h-56 overflow-hidden">
                    <img 
                      src={pillar.image} 
                      alt={`${pillar.title} concept visualization`} 
                      className="w-full h-full object-cover transition-all duration-[1.2s] group-hover:scale-[1.15] group-hover:brightness-75"
                      style={{ filter: "brightness(0.65) contrast(1.1) saturate(1.1)" }}
                    />
                    {/* Multi-layer overlay */}
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(to top, hsl(222 47% 5%) 5%, rgba(15,23,42,0.5) 40%, rgba(15,23,42,0.2) 70%, transparent 100%)"
                    }} />
                    {/* Color tint on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                      background: "linear-gradient(135deg, rgba(95, 194, 227, 0.1), transparent 60%)"
                    }} />
                    
                    {/* Floating stat badge - always visible with animation */}
                    <div className="absolute top-4 right-4 px-3 py-2 rounded-xl backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105" style={{
                      background: "rgba(95, 194, 227, 0.12)",
                      border: "1px solid rgba(95, 194, 227, 0.25)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(95, 194, 227, 0.1)"
                    }}>
                      <div className="text-xl font-bold text-accent font-mono leading-none" style={{ textShadow: "0 0 20px rgba(95, 194, 227, 0.5)" }}>{pillar.stat}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{pillar.statLabel}</div>
                    </div>

                    {/* Animated scan line */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute left-0 right-0 h-[2px]" style={{
                        background: "linear-gradient(90deg, transparent 10%, rgba(95, 194, 227, 0.5) 50%, transparent 90%)",
                        boxShadow: "0 0 15px rgba(95, 194, 227, 0.3)",
                        animation: "pillarScan 3s ease-in-out infinite"
                      }} />
                    </div>



                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 lg:p-7">
                    <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-accent/90 transition-colors duration-500 flex items-center gap-2">
                      <DynamicIcon name={pillar.icon} className="w-5 h-5 text-accent shrink-0" />
                      {pillar.title}
                    </h3>
                    
                    {/* Animated divider */}
                    <div className="relative h-[1px] mb-4 overflow-hidden">
                      <div className="absolute inset-0 opacity-40" style={{ background: "linear-gradient(90deg, #5FC2E3, transparent)" }} />
                      <div className="absolute inset-0 w-0 group-hover:w-full transition-all duration-700" style={{
                        background: "linear-gradient(90deg, #5FC2E3, #0077B6, transparent)"
                      }} />
                    </div>

                    <p className="text-muted-foreground text-sm leading-[1.75] text-left">{pillar.description}</p>

                    {/* Bottom metric bar */}
                    <div className="mt-5 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(95, 194, 227, 0.1)" }}>
                        <div className="h-full rounded-full w-0 group-hover:w-full transition-all duration-[1.5s] ease-out" style={{
                          background: "linear-gradient(90deg, #5FC2E3, #0077B6)",
                          boxShadow: "0 0 8px rgba(95, 194, 227, 0.4)"
                        }} />
                      </div>
                      <span className="text-[10px] font-mono text-accent/70 uppercase tracking-wider whitespace-nowrap">{pillar.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Keyframes */}
          <style>{`
            @keyframes pillarScan {
              0% { top: -5%; }
              100% { top: 105%; }
            }
            @keyframes dataStream {
              0%, 100% { transform: translateX(-100%); opacity: 0; }
              30%, 70% { opacity: 1; }
              50% { transform: translateX(100%); }
            }
            @keyframes iconPulse {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(1.15); opacity: 0.6; }
            }
          `}</style>
        </div>
      </section>

      {/* ====== SERVICES SECTION — Enterprise Bento 2×2 ====== */}
      <section 
        id="services"
        ref={setSectionRef("services")}
        className="relative py-9 sm:py-11 lg:py-14 overflow-hidden" 
        style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 4.5%) 50%, hsl(222 47% 5%) 100%)" }}
      >
        {/* Blueprint grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 max-w-[1200px]">
          {/* Section Header */}
          <div className={`text-center mb-7 lg:mb-9 transition-all duration-700 ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-foreground mb-3 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(serviceData?.service_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <div className="w-16 h-[2px] mx-auto" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6)" }} />
          </div>

          {/* 2×2 Bento Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-5 lg:gap-6 transition-all duration-700 ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            {eaasServices.map((service, index) => {
              return (
                <article
                  key={index}
                  className={`group relative rounded-xl overflow-hidden transition-all duration-200 ease-out hover:-translate-y-[2px] focus-within:ring-[3px] focus-within:ring-[#38BDF8] focus-within:ring-offset-2 focus-within:ring-offset-[#070B12] motion-reduce:transform-none motion-reduce:transition-none ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                  style={{
                    transitionDelay: `${150 + index * 100}ms`,
                    background: "hsl(222 47% 5.5%)",
                    border: "1px solid rgba(148,163,184,0.12)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(95,194,227,0.25)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(95,194,227,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(148,163,184,0.12)";
                    e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.3)";
                  }}
                  tabIndex={0}
                >
                  {/* Internal layout: text + image side-by-side on sm+, stacked on mobile */}
                  <div className="flex flex-col sm:flex-row">
                    {/* Text region */}
                    <div className="flex-1 p-5 lg:p-6 flex flex-col justify-center min-w-0">
                      {/* Icon + module tag row */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(95,194,227,0.1)", border: "1px solid rgba(95,194,227,0.15)" }}
                        >
                          <DynamicIcon name={service.icon} className="w-4 h-4 text-accent" />
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg lg:text-[18px] font-bold text-foreground mb-2.5 leading-snug group-hover:text-accent transition-colors duration-200 motion-reduce:transition-none">
                        {service.title}
                      </h3>

                      <p className="text-muted-foreground text-[13px] sm:text-[13px] lg:text-[15px] leading-[1.7] lg:leading-[1.75] text-left">
                        {service.description}
                      </p>

                      {/* Benefit tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {service.benefits.map((b, i) => (
                          <span key={i} className="text-[10px] font-medium text-accent/60 px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(95,194,227,0.06)", border: "1px solid rgba(95,194,227,0.1)" }}
                          >
                            {b.tag}
                          </span>
                        ))}
                      </div>

                      <Link to={service.link} className="inline-flex items-center mt-3 text-accent hover:text-accent/80 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Image region — visible on all breakpoints */}
                    <div className="relative w-full h-[100px] sm:w-[120px] sm:h-auto lg:w-[140px] flex-shrink-0 overflow-hidden order-first sm:order-last">
                      <img
                        src={service.image}
                        alt={`${service.title} illustration`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transform-none"
                        style={{ filter: "brightness(0.45) saturate(1.2)" }}
                      />
                      {/* Fade into tile background */}
                      <div className="absolute inset-0 hidden sm:block" style={{
                        background: "linear-gradient(to right, hsl(222 47% 5.5%) 0%, transparent 40%)"
                      }} />
                      <div className="absolute inset-0 sm:hidden" style={{
                        background: "linear-gradient(to bottom, transparent 30%, hsl(222 47% 5.5%) 100%)"
                      }} />
                      {/* Accent tint on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none"
                        style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.12) 0%, transparent 60%)" }}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA Banner */}
          <div className={`mt-8 transition-all duration-700 ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "600ms" }}>
            <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-8 py-6 sm:py-7 text-center sm:text-left"
              style={{
                background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
                border: "1px solid rgba(148,163,184,0.15)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.6)"
              }}
            >
              {/* Decorative swoosh glows */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
                <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
                <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
                <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-snug">{serviceData?.engineer_service_bottom_highlighted_text}</h3>
                <p className="text-muted-foreground text-sm mt-1">{serviceData?.engineer_service_bottom_text}</p>
              </div>
              <Link to={serviceData?.engineer_service_cta_url} className="flex-shrink-0 relative z-10 w-full sm:w-auto">
                <Button size="lg" className="group font-semibold w-full sm:w-auto px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
                  {serviceData?.engineer_service_cta_text} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROCESS SECTION ====== */}
      <section 
        id="process"
        ref={setSectionRef("process")}
        className="relative py-8 lg:py-12 overflow-hidden" 
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}
      >
        <FloatingParticles count={10} />
        <PulsingGlow className="bottom-0 right-0 w-[500px] h-[400px]" />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
          backgroundSize: "50px 50px"
        }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${visibleSections.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(serviceData?.engineer_as_a_service_page_section?.how_we_work_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className={`group relative rounded-xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-full p-5 lg:p-6 rounded-xl overflow-hidden" style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(95, 194, 227, 0.1)",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.25)",
                }}>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: "linear-gradient(180deg, rgba(95, 194, 227, 0.06) 0%, transparent 60%)",
                  }} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 transition-transform duration-500 group-hover:scale-110" style={{
                        background: "linear-gradient(135deg, rgba(95, 194, 227, 0.15), rgba(0, 119, 182, 0.1))",
                        border: "1px solid rgba(95, 194, 227, 0.15)",
                      }}>
                        <DynamicIcon name={step.icon} className="w-4 h-4 text-accent" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-2 tracking-tight" dangerouslySetInnerHTML={{ __html: step.title }} />
                    <div className="w-8 h-[1px] mb-2 opacity-40" style={{ background: "linear-gradient(90deg, #5FC2E3, transparent)" }} />
                    <p className="text-muted-foreground text-sm leading-[1.7] text-left flex-grow">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-6 transition-all duration-700 delay-500 ${visibleSections.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-8 py-6 sm:py-7 text-center sm:text-left"
              style={{
                background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
                border: "1px solid rgba(148,163,184,0.15)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.6)"
              }}
            >
              {/* Decorative swoosh glows */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
                <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
                <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
                <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-snug">{serviceData?.engineer_as_a_service_page_section?.how_we_bottom_highlighted_text}</h3>
                <p className="text-muted-foreground text-sm mt-1">{serviceData?.engineer_as_a_service_page_section?.how_we_bottom_text}</p>
              </div>
              <Link to={serviceData?.engineer_as_a_service_page_section?.how_we_cta_url} className="flex-shrink-0 relative z-10 w-full sm:w-auto">
                <Button size="lg" className="group font-semibold w-full sm:w-auto px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
                  {serviceData?.engineer_as_a_service_page_section?.how_we_cta_text} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ADVANTAGES SECTION ====== */}
      <section 
        id="advantages"
        ref={setSectionRef("advantages")}
        className="relative py-8 lg:py-12 overflow-hidden" 
        style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <PulsingGlow className="top-20 right-0 w-[400px] h-[400px]" />
        <FloatingParticles count={8} />

        {/* Circuit board pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px),
            linear-gradient(180deg, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }} />

        {/* Animated scan line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 right-0 h-[1px] opacity-10" style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)",
            animation: "scanLine 6s ease-in-out infinite"
          }} />
        </div>

        <style>{`
          @keyframes scanLine {
            0%, 100% { top: 0%; opacity: 0; }
            10% { opacity: 0.15; }
            50% { top: 100%; opacity: 0.1; }
            90% { opacity: 0; }
          }
          @keyframes traceRight {
            0% { width: 0; opacity: 0; }
            10% { opacity: 1; }
            100% { width: 100%; opacity: 0; }
          }
          @keyframes traceDown {
            0% { height: 0; opacity: 0; }
            10% { opacity: 1; }
            100% { height: 100%; opacity: 0; }
          }
          @keyframes nodeGlow {
            0%, 100% { box-shadow: 0 0 4px rgba(95, 194, 227, 0.3); }
            50% { box-shadow: 0 0 12px rgba(95, 194, 227, 0.6); }
          }
          @keyframes iconFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
        `}</style>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${visibleSections.advantages ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(serviceData?.engineer_as_a_service_page_section?.advanced_solutions_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className={`group relative transition-all duration-600 hover:-translate-y-2 ${visibleSections.advantages ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Card container */}
                <div className="relative h-full p-6 rounded-xl overflow-hidden" style={{
                  background: "linear-gradient(145deg, rgba(19, 42, 74, 0.6) 0%, rgba(19, 42, 74, 0.3) 100%)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(95, 194, 227, 0.08)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}>

                  {/* Animated border traces on hover */}
                  <div className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100" style={{
                    animation: "traceRight 2s ease-out infinite",
                    animationPlayState: "paused"
                  }} />
                  <div className="absolute top-0 right-0 w-[1px] bg-gradient-to-b from-accent to-transparent opacity-0 group-hover:opacity-100" style={{
                    animation: "traceDown 2s ease-out infinite",
                    animationDelay: "0.5s",
                    animationPlayState: "paused"
                  }} />

                  {/* Top-left corner accent */}
                  <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/40 to-transparent transition-all duration-500 group-hover:from-accent/80" />
                    <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-accent/40 to-transparent transition-all duration-500 group-hover:from-accent/80" />
                  </div>

                  {/* Bottom-right corner accent */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/20 to-transparent transition-all duration-500 group-hover:from-accent/50" />
                    <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent/20 to-transparent transition-all duration-500 group-hover:from-accent/50" />
                  </div>

                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 30% 20%, rgba(95, 194, 227, 0.08) 0%, transparent 70%)"
                  }} />

                  {/* Connection node dot */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent/30 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                    animation: "nodeGlow 2s ease-in-out infinite"
                  }} />

                  <div className="relative z-10">
                    {/* Icon with floating animation on hover */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center text-accent transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(95,194,227,0.25)]" style={{
                          background: "linear-gradient(135deg, rgba(95, 194, 227, 0.12), rgba(0, 119, 182, 0.08))",
                          border: "1px solid rgba(95, 194, 227, 0.15)",
                          animation: "iconFloat 4s ease-in-out infinite",
                          animationDelay: `${index * 0.5}s`
                        }}>
                          <DynamicIcon name={advantage.icon} className="w-5 h-5" />
                        </div>
                        {/* Ping ring on hover */}
                        <div className="absolute inset-0 rounded-lg border border-accent/20 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground tracking-tight group-hover:text-accent/90 transition-colors duration-400">{advantage.title}</h3>
                      </div>
                    </div>

                    {/* Animated divider */}
                    <div className="relative h-[1px] mb-4 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-accent/10 to-transparent" />
                      <div className="absolute inset-0 w-12 bg-gradient-to-r from-transparent via-accent/60 to-transparent transition-all duration-700 group-hover:translate-x-full" style={{ 
                        transition: "transform 1.5s ease-in-out"
                      }} />
                    </div>

                    <p className="text-muted-foreground text-sm leading-[1.75] text-left">{advantage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRICING SECTION ====== */}
      <section 
        id="pricing"
        ref={setSectionRef("pricing")}
        className="relative py-8 lg:py-12 overflow-hidden" 
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}
      >
        {/* Animated vertical accent lines */}
        <div className="absolute right-8 lg:right-20 top-0 bottom-0 w-[1px] opacity-15" style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(var(--accent)) 30%, hsl(var(--accent)) 70%, transparent 100%)"
        }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-accent hidden md:block" style={{
              left: "-2.5px",
              animation: `flowDown ${5 + i}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              boxShadow: "0 0 8px hsl(var(--accent))"
            }} />
          ))}
        </div>

        <FloatingParticles count={6} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${visibleSections.pricing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(serviceData?.engineer_as_a_service_page_section?.pricing_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              {serviceData?.engineer_as_a_service_page_section?.pricing_section_description}
            </p>
          </div>

          {/* Studio Showcase Layout */}
          <div className={`flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden transition-all duration-700 ${visibleSections.pricing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              border: "1px solid rgba(95, 194, 227, 0.08)",
              background: "rgba(255,255,255,0.01)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(95,194,227,0.05)"
            }}
          >
            {/* LEFT: Vertical interactive list with step numbers */}
            <div className="lg:w-[38%] flex flex-col relative" style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.1) 100%)"
            }}>
              {/* Animated vertical progress line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] hidden lg:block" style={{
                background: "linear-gradient(180deg, transparent, rgba(95,194,227,0.1), transparent)"
              }}>
                <div 
                  className="absolute left-0 w-[2px] bg-accent transition-all duration-500 ease-out rounded-full"
                  style={{
                    top: `${(activePricing / pricingModels.length) * 100}%`,
                    height: `${100 / pricingModels.length}%`,
                    boxShadow: "0 0 12px hsl(var(--accent)), 0 0 4px hsl(var(--accent))"
                  }}
                />
              </div>

              {pricingModels.map((model, index) => (
                <button
                  key={index}
                  onClick={() => setActivePricing(index)}
                  onMouseEnter={() => setActivePricing(index)}
                  className={`group w-full text-left px-5 lg:px-6 py-4 lg:py-5 transition-all duration-400 flex items-center gap-4 relative ${
                    activePricing === index
                      ? "bg-accent/[0.07]"
                      : "hover:bg-accent/[0.03]"
                  } ${index < pricingModels.length - 1 ? "border-b border-border/20" : ""}`}
                >
                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                    activePricing === index 
                      ? "bg-accent/20 text-accent shadow-[0_0_12px_rgba(95,194,227,0.2)]" 
                      : "bg-muted/30 text-muted-foreground/50"
                  }`}>
                    <DynamicIcon name={model.icon} className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className={`text-sm transition-all duration-300 truncate ${
                      activePricing === index ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground/80"
                    }`}>{model.title}</span>
                  </div>

                  <ArrowRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-300 ${
                    activePricing === index ? "opacity-100 text-accent translate-x-0" : "opacity-0 -translate-x-2"
                  }`} />
                </button>
              ))}
            </div>

            {/* RIGHT: Preview panel */}
            <div className="lg:w-[62%] relative lg:min-h-[340px]" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(95,194,227,0.03) 50%, rgba(0,78,158,0.04) 100%)",
              borderLeft: "1px solid rgba(95,194,227,0.08)"
            }}>
              {/* Decorative elements (desktop only) */}
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full opacity-[0.03] pointer-events-none hidden lg:block" style={{
                background: "radial-gradient(circle, hsl(var(--accent)), transparent 70%)"
              }} />
              <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full opacity-[0.02] pointer-events-none hidden lg:block" style={{
                background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)"
              }} />
              {/* Corner accent lines */}
              <div className="absolute top-0 right-0 w-20 h-[1px] opacity-20" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent)))" }} />
              <div className="absolute top-0 right-0 w-[1px] h-20 opacity-20" style={{ background: "linear-gradient(180deg, hsl(var(--accent)), transparent)" }} />

              {pricingModels.map((model, index) => (
                <div
                  key={index}
                  className={`
                    lg:absolute lg:inset-0 p-6 lg:p-10 flex flex-col justify-center transition-all duration-500
                    ${activePricing === index
                      ? "block opacity-100 lg:translate-x-0"
                      : "hidden lg:flex lg:opacity-0 lg:translate-x-6 lg:pointer-events-none"
                    }
                  `}
                >
                  {/* Model number badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium font-mono">
                      {String(index + 1).padStart(2, '0')} / {String(pricingModels.length).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-accent/20 to-transparent" />
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-xl text-accent relative" style={{
                      background: "linear-gradient(135deg, rgba(95,194,227,0.15), rgba(0,78,158,0.1))",
                      boxShadow: "0 0 20px rgba(95,194,227,0.12), inset 0 0 20px rgba(95,194,227,0.05)"
                    }}>
                      <DynamicIcon name={model.icon} className="w-5 h-5 relative z-10" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{model.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-[1.8] text-left">{model.description}</p>
                  {/* {model.subtext && (
                    <p className="text-muted-foreground text-sm leading-[1.8] mt-3 text-justify">{model.subtext}</p>
                  )} */}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className={`relative mt-10 rounded-2xl overflow-hidden transition-all duration-700 delay-500 ${visibleSections.pricing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "linear-gradient(135deg, #0E1525 0%, #111827 50%, #12102A 100%)" }}>
            {/* Border */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            {/* Decorative swoosh glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
              <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
              <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
              <div className="absolute" style={{ top: "-20%", right: "5%", width: "300px", height: "200px", background: "transparent", border: "1px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(-10deg)" }} />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7">
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-bold text-foreground mb-1">{serviceData?.engineer_as_a_service_page_section?.pricing_high_text}</p>
                <p className="text-sm text-muted-foreground">{serviceData?.engineer_as_a_service_page_section?.pricing_bottom_text}</p>
              </div>
              <Link to={serviceData?.engineer_as_a_service_page_section?.pricing_cta_url} className="flex-shrink-0">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto font-semibold px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                  style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}
                >
                  {serviceData?.engineer_as_a_service_page_section?.pricing_cta_text}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECURITY SECTION ====== */}
      <section 
        id="security"
        ref={setSectionRef("security")}
        className="relative py-8 lg:py-12 overflow-hidden" 
        style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <FloatingParticles count={8} />
        <PulsingGlow className="top-1/3 left-1/4 w-[400px] h-[300px]" />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
          backgroundSize: "60px 60px"
        }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${visibleSections.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(serviceData?.engineer_as_a_service_page_section?.security_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              {serviceData?.engineer_as_a_service_page_section?.security_section_description}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {securityItems.map((item, index) => (
              <div 
                key={index}
                className={`group relative p-5 rounded-xl transition-all duration-500 hover:-translate-y-1 ${visibleSections.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  transitionDelay: `${index * 150}ms`,
                  animation: visibleSections.security ? `borderGlow 4s ease-in-out infinite ${index * 0.3}s` : "none"
                }}
              >
                <div className="relative z-10">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 text-accent w-fit mb-3 group-hover:scale-110 transition-all duration-500" style={{
                    boxShadow: "0 0 15px rgba(95, 194, 227, 0.1)"
                  }}>
                    <DynamicIcon name={item.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm lg:text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs lg:text-sm leading-[1.7] text-left">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-6 p-6 rounded-xl text-center transition-all duration-700 delay-300 ${visibleSections.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              background: "rgba(95, 194, 227, 0.03)",
              border: "1px solid rgba(95, 194, 227, 0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            <p className="text-foreground leading-relaxed max-w-4xl mx-auto text-sm lg:text-base">
              {serviceData?.engineer_as_a_service_page_section?.security_bottom_info}
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRE-CONTACT CTA BANNER ====== */}
      <section className="relative py-6 overflow-hidden" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-8 py-6 sm:py-7 text-center sm:text-left"
            style={{
              background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
              border: "1px solid rgba(148,163,184,0.15)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.6)"
            }}
          >
            {/* Decorative swoosh glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
              <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
              <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
              <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
            </div>
            <div className="flex-1 relative z-10">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-snug">{serviceData?.engineer_as_a_service_page_section?.security_highlighted_text}</h3>
              <p className="text-muted-foreground text-sm mt-1">{serviceData?.engineer_as_a_service_page_section?.security_cta_bottom_text}</p>
            </div>
            <Link to={serviceData?.engineer_as_a_service_page_section?.security_cta_url} className="flex-shrink-0 relative z-10 w-full sm:w-auto">
              <Button size="lg" className="group font-semibold w-full sm:w-auto px-6 sm:px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
                {serviceData?.engineer_as_a_service_page_section?.security_cta_text} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== CONTACT SECTION ====== */}
      <section 
        id="contact"
        ref={setSectionRef("contact")}
        className="relative py-8 lg:py-12 overflow-hidden" 
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}
      >
        <PulsingGlow className="top-0 left-0 w-[500px] h-[500px]" />
        <FloatingParticles count={6} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-700 ${visibleSections.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="inline-block text-xs font-semibold tracking-[0.25em] text-accent/70 mb-3 uppercase">
                {serviceData?.services_get_started_section?.small_heading}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(serviceData?.services_get_started_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base mb-4 text-left">
                {serviceData?.services_get_started_section?.paragraph}
              </p>
              <div className="space-y-2">
                {serviceData?.services_get_started_section?.lists?.map((item: any, index: number) => (
                  <div key={index} className={`flex items-center gap-3 transition-all duration-500 ${visibleSections.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground/80">{item.list}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${visibleSections.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="p-6 lg:p-8 rounded-2xl" style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(95, 194, 227, 0.05)",
                animation: visibleSections.contact ? "borderGlow 4s ease-in-out infinite" : "none"
              }}>
                <ContactUsForm contactFormFields={contactFormFields} onSubmit={handleFormSubmit} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EngineerAsAService;
