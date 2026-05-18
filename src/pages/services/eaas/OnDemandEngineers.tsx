import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import he from "he";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  Code,
  Database,
  Brain,
  Cloud,
  CheckCircle,
  ArrowRight,
  Monitor,
  Server,
  TestTube,
  Container
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useInView, useInViewMap } from "@/hooks/useInView";

/* ── Animated network canvas background ── */
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
      const count = window.innerWidth < 768 ? 18 : 40;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2 + 0.5,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      ctx.strokeStyle = "rgba(95, 194, 227, 0.025)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.offsetHeight); ctx.stroke();
      }
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.offsetWidth, y); ctx.stroke();
      }
      nodes.forEach((node) => {
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.3)";
        ctx.fill();
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(95, 194, 227, ${0.08 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(animate);
    };

    resize(); initNodes(); animate();
    
    const handleResize = () => {
      resize();
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />;
};



/* ── Animated Stat Counter ── */
const AnimatedStat = ({ value, label, delay = 0, isVisible }: { value: string; label: string; delay?: number; isVisible: boolean }) => {
  const [displayNum, setDisplayNum] = useState(0);
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isVisible || hasStarted.current) return;
    const timeout = setTimeout(() => {
      hasStarted.current = true;
      const steps = 40;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const eased = 1 - Math.pow(1 - step / steps, 3);
        setDisplayNum(Math.min(Math.round(eased * numericPart), numericPart));
        if (step >= steps) { setDisplayNum(numericPart); clearInterval(interval); }
      }, 1600 / steps);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isVisible, delay, numericPart]);

  return (
    <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">
        {displayNum}{suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
};

/* ── Step Carousel (split layout card) ── */
const StepCarousel = ({ steps, isVisible }: { steps: Array<{ icon: any; step: string; title: string; description: string; image: string }>; isVisible: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const len = steps.length;

  const next = useCallback(() => setActiveIndex(i => (i + 1) % len), [len]);
  const prev = useCallback(() => setActiveIndex(i => (i - 1 + len) % len), [len]);

  useEffect(() => {
    if (isHovered || !isVisible) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isHovered, isVisible, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div
      className={`flex flex-col items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden preload track — eager load all images */}
      <div className="hidden" aria-hidden="true">
        {steps.map((s, i) => (
          <img key={i} src={s.image} alt="" loading="eager" decoding="async" />
        ))}
      </div>

      {/* Main card */}
      <div
        className="relative w-full max-w-[900px] rounded-2xl overflow-hidden"
        style={{
          background: "hsl(222 47% 7%)",
          border: "1px solid rgba(148,163,184,0.12)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.5), 0 0 24px rgba(95,194,227,0.04)",
        }}
      >
        {/* All images rendered, only active visible — prevents loading flash */}
        <div className="flex flex-col md:flex-row">
          {/* Left — Text content */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(95,194,227,0.12)", border: "1px solid rgba(95,194,227,0.2)" }}
                  >
                    {(() => { const Icon = steps[activeIndex].icon; return <DynamicIcon name={Icon} className="w-5 h-5 text-accent" />; })()}
                  </div>
                  <span className="text-xs font-mono text-accent/70 uppercase tracking-widest">
                    Step {activeIndex + 1}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug">
                  {steps[activeIndex].title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">
                  {steps[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — All images stacked, crossfade via opacity */}
          <div className="relative w-full md:w-[45%] min-h-[200px] md:min-h-[280px]">
            {steps.map((s, i) => (
              <img
                key={i}
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
                loading="eager"
                decoding="async"
                width={420}
                height={320}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222_47%_7%)] via-[hsl(222_47%_7%/0.5)] to-transparent md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222_47%_7%)] via-transparent to-[hsl(222_47%_7%/0.6)] md:hidden" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={prev}
          aria-label="Previous step"
          className="w-10 h-10 rounded-xl grid place-items-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(148,163,184,0.1)", border: "1px solid rgba(148,163,184,0.15)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to step ${i + 1}`}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: i === activeIndex ? "hsl(var(--accent))" : "rgba(148,163,184,0.25)",
                transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next step"
          className="w-10 h-10 rounded-xl grid place-items-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(148,163,184,0.1)", border: "1px solid rgba(148,163,184,0.15)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ── Card Deck Spread (horizontal fanned cards) ── */
const CardDeckSpread = ({ cards, isVisible }: { cards: Array<{ icon: any; title: string; description: string; image: string }>; isVisible: boolean }) => {
  const [entered, setEntered] = useState(false);

  // Preload all advantage images as soon as the component mounts so they are
  // already in the browser cache by the time the section scrolls into view.
  useEffect(() => {
    cards.forEach((card) => {
      const img = new Image();
      img.src = card.image;
    });
  }, [cards]);

  useEffect(() => {
    if (!isVisible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setEntered(true), 120));
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, i) => {
        return (
          <div
            key={card.title}
            className="group relative rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0) scale(1)" : `translateY(${40 + i * 8}px) scale(0.92)`,
              transitionDelay: `${i * 100}ms`,
              minHeight: 320,
            }}
          >
            {/* Background image — eager + high priority so it appears with the content */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="eager"
              decoding="async"
              width={512}
              height={768}
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: "linear-gradient(180deg, rgba(10,15,30,0.7) 0%, rgba(10,15,30,0.85) 50%, rgba(10,15,30,0.95) 100%)",
              }}
            />
            {/* Hover glow border */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ border: "1px solid rgba(95,194,227,0.35)" }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-accent/20" style={{ background: "rgba(95,194,227,0.1)", border: "1px solid rgba(95,194,227,0.2)" }}>
                <DynamicIcon name={card.icon} className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-left">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════ */

const OnDemandEngineers = () => {
  const { ref: pageRef } = useInView<HTMLDivElement>();
  const { setRef: setSectionRef, inViewMap: visibleSections } = useInViewMap();

  const { data, isLoading, error } = useQuery({
    queryKey: ["on-demand-engineers"],
    queryFn: async () => await api.getOnDemandEngineers()
  });

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  /* ── Data Arrays ── */

  const pillars = (pageData.on_demand_engineers_boost_results_section?.blocks ?? []).map((item) => ({
    icon: item.icon,
    title: item.heading ?? "",
    stat: item.numbers ?? "",
    statLabel: item.numbers_text ?? "",
    description: item.paragraph ?? "",
    timeline: [],
    closingNote: "",
  }));

  const services = (pageData.on_demand_engineers_services_section?.block_date ?? []).map((item) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.paragraph ?? "",
    roles: item.lists ? item.lists : [],
    ideal: item.bottom_text ?? "",
    link: item.learn_more_url || "#",
    linkLabel: item.learn_more_text || "Learn More",
  }));

  const processSteps = (pageData.how_our_staff_on_demand_engineers?.steps ?? []).map((item) => ({
    icon: item.icon,
    step: item.step ?? "",
    title: item.title ?? "",
    description: item.paragraph ?? "",
    image: item.image?.url,
  }));

  const advantages = (pageData.data_engineers_data_challenges?.blocks ?? []).map((item) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.description ?? "",
    image: item.image?.url,
  }));

  const engineeringAlignment = (pageData.engineer_first_approach_on_demand_engineers?.blocks ?? []).map((item) => ({
    title: item.title ?? "",
    description: item.paragraph ?? "",
    icon: item.icon,
  }));

  const techRoles = [
    { icon: Code, title: "Full-Stack Engineers", techs: ["React", "Node.js", "Python", "Java", "TypeScript"] },
    { icon: Database, title: "Data Engineers", techs: ["Spark", "Snowflake", "Airflow", "dbt", "Kafka"] },
    { icon: Brain, title: "AI/ML Engineers", techs: ["TensorFlow", "PyTorch", "LLMs", "MLOps", "NLP"] },
    { icon: Cloud, title: "Cloud & DevOps", techs: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"] },
    { icon: TestTube, title: "QA & Automation", techs: ["Selenium", "Cypress", "Jest", "Playwright", "K6"] },
    { icon: Monitor, title: "Frontend Engineers", techs: ["React", "Next.js", "Vue", "Angular", "Tailwind"] },
    { icon: Server, title: "Backend Engineers", techs: ["Node.js", "Go", "Rust", "Java", ".NET"] },
    { icon: Container, title: "Platform / SRE", techs: ["Docker", "Helm", "ArgoCD", "Prometheus", "Grafana"] },
  ];

  const pricingModels = (pageData.pricing_and_engagement_on_demand_engineers?.blocks ?? []).map((item) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.paragraph ?? "",
    bottomLabel: item.bottom_label ?? "",
  }));

  const securityItems = (pageData.security_compliance_on_demand_engineers?.right_blocks ?? []).map((item) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.paragraph ?? "",
  }));

  const faqs = (pageData.frequently_asked_question ?? []).map((item) => ({
    q: item.post_title ?? "",
    a: item.post_content ?? "",
  }));

  return (
    <div ref={pageRef}>
      <SeoTags
        title={pageData?.seo?.title}
        description={pageData?.seo?.description}
        ogImage={pageData?.seo?.og_image}
        schema={pageData?.schema}
      />
      {/* ====== HERO SECTION (EaaS-style two-column) ====== */}
      <section id="hero" ref={setSectionRef("hero")} className="relative py-8 lg:py-12 overflow-hidden" style={{
        background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)"
      }}>
        {/* Animated Network Background */}
        <NetworkCanvas />

        {/* Pulsing ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none hidden md:block">
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(95, 194, 227, 0.08) 0%, transparent 70%)", animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none hidden md:block">
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(0, 78, 158, 0.1) 0%, transparent 70%)", animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          {[...Array(12)].map((_, i) => (
            <div key={`fp-${i}`} className="absolute rounded-full bg-accent/20" style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animation: `float ${5 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              boxShadow: "0 0 6px rgba(95, 194, 227, 0.4)",
            }} />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 lg:pt-12">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <div className={`relative transition-all duration-500 ease-out ${visibleSections.hero ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-12 scale-95"}`}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden" style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(95, 194, 227, 0.08)"
                }}>
                  <img
                    src={pageData.banner_section?.banner_image?.url}
                    alt={pageData.banner_section?.banner_image?.alt}
                    className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-[2s] hover:scale-105"
                    style={{ filter: "brightness(0.9) contrast(1.05)" }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                </div>

                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />

                {/* Floating stat cards */}
                <div className={`absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl transition-all duration-1000 hidden sm:block ${visibleSections.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
                  background: "rgba(10, 15, 30, 0.85)",
                  border: "1px solid rgba(95, 194, 227, 0.2)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                  transitionDelay: "600ms",
                  animation: "float 6s ease-in-out infinite"
                }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{pageData?.banner_section?.floating_badge_fields && pageData.banner_section.floating_badge_fields[1]?.badge_heading}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{pageData?.banner_section?.floating_badge_fields && pageData.banner_section.floating_badge_fields[1]?.badge_text}</div>
                </div>

                <div className={`absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl transition-all duration-1000 hidden sm:block ${visibleSections.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
                  background: "rgba(10, 15, 30, 0.85)",
                  border: "1px solid rgba(95, 194, 227, 0.2)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                  transitionDelay: "800ms",
                  animation: "float 5s ease-in-out infinite",
                  animationDelay: "2s"
                }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{pageData?.banner_section?.floating_badge_fields && pageData.banner_section.floating_badge_fields[0]?.badge_heading}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{pageData?.banner_section?.floating_badge_fields && pageData.banner_section.floating_badge_fields[0]?.badge_text}</div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`transition-all duration-1000 ease-out delay-200 ${visibleSections.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <Link to="/services/engineer-as-a-service" className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                ← Engineer as a Service
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.banner_section?.banner_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: pageData?.banner_section?.banner_description }} />
              <p className="text-sm font-semibold text-accent mb-6 text-left" style={{ animation: "pulse 3s ease-in-out infinite" }}>
                {pageData?.banner_section?.highlighted_text}
              </p>

              <Link to={pageData?.banner_section?.cta_url}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                >
                  {pageData?.banner_section?.cta_text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Animated Stats Bar */}
          <div className={`mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl backdrop-blur-2xl transition-all duration-1000 hover:scale-[1.01] hover:border-accent/25 ${visibleSections.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(95,194,227,0.04) 50%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(95, 194, 227, 0.15)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05)",
              transitionDelay: "1000ms",
              animation: visibleSections.hero ? "statsBarShimmer 6s ease-in-out infinite" : "none"
            }}
          >
            <AnimatedStat value={pageData?.stats_section?.stats_fields[0]?.stats_numbers} label={pageData?.stats_section?.stats_fields[0]?.stats_title} delay={1100} isVisible={!!visibleSections.hero} />
            <AnimatedStat value={pageData?.stats_section?.stats_fields[1]?.stats_numbers} label={pageData?.stats_section?.stats_fields[1]?.stats_title} delay={1250} isVisible={!!visibleSections.hero} />
            <AnimatedStat value={pageData?.stats_section?.stats_fields[2]?.stats_numbers} label={pageData?.stats_section?.stats_fields[2]?.stats_title} delay={1400} isVisible={!!visibleSections.hero} />
            <AnimatedStat value={pageData?.stats_section?.stats_fields[3]?.stats_numbers} label={pageData?.stats_section?.stats_fields[3]?.stats_title} delay={1550} isVisible={!!visibleSections.hero} />
          </div>
        </div>

        {/* CSS Keyframes */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
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

      {/* ====== BOOST RESULTS / THREE PILLARS ====== */}
      <section id="pillars" ref={setSectionRef("pillars")} className="relative py-14 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)" }}>
        {/* Ambient decorations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.04) 0%, transparent 60%)" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.pillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.on_demand_engineers_boost_results_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-5xl mx-auto">
              {pageData?.on_demand_engineers_boost_results_section?.paragraph}
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => {
              return (
                <div
                  key={index}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(95,194,227,0.12)] ${visibleSections.pillars ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                    background: "linear-gradient(160deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)",
                    border: "1px solid rgba(95, 194, 227, 0.12)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  {/* Top accent line */}
                  <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, rgba(95,194,227,${0.3 + index * 0.15}), transparent)` }} />

                  <div className="p-6 lg:p-8">
                    {/* Stat header with icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 0 20px rgba(95,194,227,0.05)" }}>
                        <DynamicIcon className="w-6 h-6 text-accent" name={pillar.icon} />
                      </div>
                      <div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono leading-tight">{pillar.stat}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-[0.15em]">{pillar.statLabel}</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full mb-5" style={{ background: "linear-gradient(90deg, rgba(95,194,227,0.2), transparent)" }} />

                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{pillar.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">{pillar.description}</p>
                  </div>

                  {/* Corner glow on hover */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.08) 0%, transparent 70%)" }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ====== SERVICES SECTION ====== */}
      <section id="services" ref={setSectionRef("services")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.on_demand_engineers_services_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-5xl mx-auto">
              {pageData?.on_demand_engineers_services_section?.paragraph}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => {
              return (
                <div
                  key={index}
                  className={`group relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                    background: "hsl(222 47% 5.5%)",
                    border: "1px solid rgba(148,163,184,0.12)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(95,194,227,0.1)", border: "1px solid rgba(95,194,227,0.15)" }}>
                        <DynamicIcon className="w-5 h-5 text-accent" name={service.icon} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{service.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 text-left">{service.description}</p>
                    {/* <ul className="space-y-1 mb-3">
                      {service.roles.map((role, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-accent/60 flex-shrink-0" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul> */}
                    <div dangerouslySetInnerHTML={{ __html: he.decode(service.roles) }} />
                    <p className="text-xs text-accent/70 italic mb-3">{service.ideal}</p>
                    <Link to={service.link} className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors">
                      {service.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== CTA 1 ====== */}
      <div style={{ background: "#070B12" }} className="py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7"
            style={{
              background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
              border: "1px solid rgba(148,163,184,0.15)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.6)"
            }}>
            {/* Decorative swoosh / glow blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
              <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
              <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
              <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
            </div>
            {/* Text */}
            <div className="flex-1 relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{pageData.data_engineers_security_brief_cta_section?.heading}</h3>
              <p className="text-muted-foreground text-sm mt-1">{pageData.data_engineers_security_brief_cta_section?.content}</p>
            </div>
            {/* Button */}
            <Link to={pageData.data_engineers_security_brief_cta_section?.cta_url} className="flex-shrink-0 relative z-10">
              <Button size="lg" className="group font-semibold px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
                {pageData.data_engineers_security_brief_cta_section?.cta_text || "Book a Free Consultation"} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ====== PROCESS SECTION ====== */}
      <section id="process" ref={setSectionRef("process")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left — Heading & subtext (fixed position, no animation on step change) */}
            <div className={`lg:w-[38%] flex-shrink-0 transition-all duration-700 ${visibleSections.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.how_our_staff_on_demand_engineers?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">
                {pageData?.how_our_staff_on_demand_engineers?.paragraph}
              </p>
              <p className="text-sm text-muted-foreground mt-6 italic text-left">
                {pageData?.how_our_staff_on_demand_engineers?.bottom_text}
              </p>
            </div>

            {/* Right — Step Carousel */}
            <div className="lg:w-[62%] w-full">
              <StepCarousel steps={processSteps} isVisible={visibleSections.process} />
            </div>
          </div>
        </div>
      </section>

      {/* ====== ENGINEERING ALIGNMENT ====== */}
      <section id="alignment" ref={setSectionRef("alignment")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.alignment ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.engineer_first_approach_on_demand_engineers?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-5xl mx-auto">
              {pageData?.engineer_first_approach_on_demand_engineers?.paragraph}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {engineeringAlignment.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`p-6 rounded-xl transition-all duration-500 ${visibleSections.alignment ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    transitionDelay: `${i * 150}ms`,
                    background: "hsl(222 47% 5.5%)",
                    border: "1px solid rgba(95, 194, 227, 0.1)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                      <DynamicIcon className="w-5 h-5 text-accent" name={item.icon} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== ADVANTAGES / WHY CHOOSE US ====== */}
      <section id="advantages" ref={setSectionRef("advantages")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.advantages ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.data_engineers_data_challenges?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {pageData?.data_engineers_data_challenges?.paragraph}
            </p>
          </div>

          {/* Card Deck Spread */}
          <CardDeckSpread cards={advantages} isVisible={!!visibleSections.advantages} />
        </div>
      </section>
      <section id="pricing" ref={setSectionRef("pricing")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.pricing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.pricing_and_engagement_on_demand_engineers?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {pageData?.pricing_and_engagement_on_demand_engineers?.paragraph}
            </p>
          </div>
          {/* Top row: 3 cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {pricingModels.slice(0, 3).map((model, i) => {
              return (
                <div
                  key={model.title}
                  className={`group relative p-6 rounded-xl transition-all duration-500 hover:-translate-y-1 flex flex-col ${visibleSections.pricing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    background: "linear-gradient(160deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)",
                    border: "1px solid rgba(95, 194, 227, 0.1)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-colors">
                      <DynamicIcon className="w-5 h-5 text-accent" name={model.icon} />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{model.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-left flex-1">{model.description}</p>
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <span className="text-xs text-accent/70 font-medium uppercase tracking-wider">
                      {model.bottomLabel || ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Bottom row: 2 cards centered */}
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {pricingModels.slice(3).map((model, i) => {
              return (
                <div
                  key={model.title}
                  className={`group relative p-6 rounded-xl transition-all duration-500 hover:-translate-y-1 flex flex-col ${visibleSections.pricing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    transitionDelay: `${(i + 3) * 80}ms`,
                    background: "linear-gradient(160deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)",
                    border: "1px solid rgba(95, 194, 227, 0.1)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-colors">
                      <DynamicIcon className="w-5 h-5 text-accent" name={model.icon} />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{model.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-left flex-1">{model.description}</p>
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <span className="text-xs text-accent/70 font-medium uppercase tracking-wider">
                      {model.bottomLabel || ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== SECURITY & COMPLIANCE ====== */}
      <section id="security" ref={setSectionRef("security")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)" }}>
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.15) 50%, transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.1) 50%, transparent 100%)" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`flex flex-col lg:flex-row lg:items-start lg:gap-16 transition-all duration-700 ${visibleSections.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Left column: heading + shield visual */}
            <div className="lg:w-[380px] flex-shrink-0 mb-8 lg:mb-0 lg:sticky lg:top-24">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.security_compliance_on_demand_engineers?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                {pageData?.security_compliance_on_demand_engineers?.paragraph}
              </p>
              {/* Shield visual */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-40 h-44">
                  <div className="absolute inset-0 rounded-[40%_40%_50%_50%] border-2 border-accent/20" style={{ background: "linear-gradient(180deg, rgba(56,189,248,0.08) 0%, rgba(37,99,235,0.04) 100%)" }} />
                  <div className="absolute inset-3 rounded-[38%_38%_48%_48%] border border-accent/10" style={{ background: "linear-gradient(180deg, rgba(56,189,248,0.05) 0%, transparent 100%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-14 h-14 text-accent/50" />
                  </div>
                  {/* Glow */}
                  <div className="absolute -inset-8 rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)" }} />
                </div>
              </div>
            </div>

            {/* Right column: stacked cards */}
            <div className="flex-1 space-y-4">
              {securityItems.map((item, i) => {
                return (
                  <div
                    key={item.title}
                    className={`group relative flex items-start gap-5 p-5 rounded-xl transition-all duration-500 hover:scale-[1.01] ${visibleSections.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{
                      transitionDelay: `${i * 120}ms`,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                      border: "1px solid rgba(148,163,184,0.1)",
                    }}
                  >
                    {/* Numbered index */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-accent/60 border border-accent/15 bg-accent/5 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <DynamicIcon className="w-4 h-4 text-accent/70" name={item.icon} />
                        <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    {/* Hover accent */}
                    <div className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-gradient-to-b from-[#38BDF8] to-[#2563EB] opacity-0 group-hover:opacity-80 transition-opacity" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA 2 ====== */}
      <div style={{ background: "#070B12" }} className="py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7"
            style={{
              background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
              border: "1px solid rgba(148,163,184,0.15)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.6)"
            }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
              <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
              <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
              <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
            </div>
            <div className="flex-1 relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{pageData?.on_demand_cta?.heading}</h3>
              <p className="text-muted-foreground text-sm mt-1">{pageData?.on_demand_cta?.content}</p>
            </div>
            <Link to={pageData?.on_demand_cta?.cta_url} className="flex-shrink-0 relative z-10">
              <Button size="lg" className="group font-semibold px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
                {pageData?.on_demand_cta?.cta_text} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ====== FAQs ====== */}
      <section id="faqs" ref={setSectionRef("faqs")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.faqs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.faq_section_heading?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>
          <div className={`max-w-3xl mx-auto transition-all duration-700 ${visibleSections.faqs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "150ms" }}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm px-5 overflow-hidden">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:text-accent transition-colors py-4 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ====== FINAL CTA + CONTACT FORM ====== */}
      <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.services_get_started_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground mb-6 text-left">
                {pageData?.services_get_started_section?.paragraph}
              </p>
              <ul className="space-y-3 mb-8">
                {pageData?.services_get_started_section?.lists?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{item.list}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={pageData?.services_get_started_section?.buttons[0]?.cta_url} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">{pageData?.services_get_started_section?.buttons[0]?.cta_text}</Button>
                </Link>
                <Link to={pageData?.services_get_started_section?.buttons[1]?.cta_url} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">{pageData?.services_get_started_section?.buttons[1]?.cta_text}</Button>
                </Link>
              </div>
            </div>
            <ContactUsForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnDemandEngineers;
