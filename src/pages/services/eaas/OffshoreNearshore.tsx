import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Building2, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";

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
        nodes.push({ x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, size: Math.random() * 2 + 0.5 });
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      ctx.strokeStyle = "rgba(95, 194, 227, 0.025)"; ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.offsetHeight); ctx.stroke(); }
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.offsetWidth, y); ctx.stroke(); }
      nodes.forEach((node) => {
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
        ctx.beginPath(); ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.3)"; ctx.fill();
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 150) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(95, 194, 227, ${0.08 * (1 - dist / 150)})`; ctx.stroke(); }
        });
      });
      animationId = requestAnimationFrame(animate);
    };
    resize(); initNodes(); animate();
    const handleResize = () => { resize(); initNodes(); };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", handleResize); };
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
      const steps = 40; let step = 0;
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
      <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{displayNum}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
};

/* ── Step Carousel ── */
const StepCarousel = ({ steps, isVisible }: { steps: Array<{ icon: string; title: string; description: string; image: string }>; isVisible: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const len = steps.length;
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + len) % len), [len]);
  useEffect(() => {
    if (isHovered || !isVisible) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isHovered, isVisible, next]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);
  return (
    <div className={`flex flex-col items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="hidden" aria-hidden="true">{steps.map((s, i) => (<img key={i} src={s.image} alt="" loading="eager" decoding="async" />))}</div>
      <div className="relative w-full max-w-[900px] rounded-2xl overflow-hidden" style={{ background: "hsl(222 47% 7%)", border: "1px solid rgba(148,163,184,0.12)", boxShadow: "0 12px 48px rgba(0,0,0,0.5), 0 0 24px rgba(95,194,227,0.04)" }}>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={activeIndex} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.12)", border: "1px solid rgba(95,194,227,0.2)" }}>
                    <DynamicIcon name={steps[activeIndex].icon} className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs font-mono text-accent/70 uppercase tracking-widest">Step {activeIndex + 1}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug" dangerouslySetInnerHTML={{ __html: steps[activeIndex].title }} />
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: steps[activeIndex].description }} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative w-full md:w-[45%] min-h-[200px] md:min-h-[280px]">
            {steps.map((s, i) => (<img key={i} src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" style={{ opacity: i === activeIndex ? 1 : 0 }} loading="eager" decoding="async" width={420} height={320} />))}
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222_47%_7%)] via-[hsl(222_47%_7%/0.5)] to-transparent md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222_47%_7%)] via-transparent to-[hsl(222_47%_7%/0.6)] md:hidden" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <button onClick={prev} aria-label="Previous step" className="w-10 h-10 rounded-xl grid place-items-center transition-all duration-200 hover:scale-110" style={{ background: "rgba(148,163,184,0.1)", border: "1px solid rgba(148,163,184,0.15)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div className="flex gap-2">{steps.map((_, i) => (<button key={i} onClick={() => setActiveIndex(i)} aria-label={`Go to step ${i + 1}`} className="w-2.5 h-2.5 rounded-full transition-all duration-300" style={{ background: i === activeIndex ? "hsl(var(--accent))" : "rgba(148,163,184,0.25)", transform: i === activeIndex ? "scale(1.3)" : "scale(1)" }} />))}</div>
        <button onClick={next} aria-label="Next step" className="w-10 h-10 rounded-xl grid place-items-center transition-all duration-200 hover:scale-110" style={{ background: "rgba(148,163,184,0.1)", border: "1px solid rgba(148,163,184,0.15)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
        </button>
      </div>
    </div>
  );
};

/* ── Card Deck Spread ── */
const CardDeckSpread = ({ cards, isVisible }: { cards: Array<{ icon: string; title: string; description: string; image: string }>; isVisible: boolean }) => {
  const [entered, setEntered] = useState(false);
  useEffect(() => { cards.forEach((card) => { const img = new Image(); img.src = card.image; }); }, [cards]);
  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, [isVisible]);
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {cards.map((card, i) => (
        <div key={card.title} className="group relative rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]" style={{ opacity: entered ? 1 : 0, transform: entered ? "translateY(0) scale(1)" : `translateY(${40 + i * 8}px) scale(0.92)`, transitionDelay: `${i * 100}ms`, minHeight: 320 }}>
          <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" decoding="async" width={512} height={768} />
          <div className="absolute inset-0 transition-opacity duration-500" style={{ background: "linear-gradient(180deg, rgba(10,15,30,0.7) 0%, rgba(10,15,30,0.85) 50%, rgba(10,15,30,0.95) 100%)" }} />
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ border: "1px solid rgba(95,194,227,0.35)" }} />
          <div className="relative h-full flex flex-col justify-end p-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-accent/20" style={{ background: "rgba(95,194,227,0.1)", border: "1px solid rgba(95,194,227,0.2)" }}>
              <DynamicIcon name={card.icon} className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-left">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Reusable CTA Banner ── */
const CtaBanner = ({ heading, content, ctaText, ctaUrl }: { heading: string; content?: string; ctaText: string; ctaUrl: string }) => (
  <div style={{ background: "#070B12" }} className="py-6">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7" style={{ background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)", border: "1px solid rgba(148,163,184,0.15)", boxShadow: "0 4px 32px rgba(0,0,0,0.6)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
          <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
          <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
          <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
        </div>
        <div className="flex-1 relative z-10">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: heading }} />
          {content && <p className="text-muted-foreground text-sm mt-1" dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
        <Link to={ctaUrl} className="flex-shrink-0 relative z-10">
          <Button size="lg" className="group font-semibold px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110" style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
            <span dangerouslySetInnerHTML={{ __html: ctaText }} />
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */

const OffshoreNearshore = () => {
  // No-op ref — sections always visible via CSS animations
  const setSectionRef = (_id: string) => (_el: HTMLElement | null) => {};
  const [activeServiceTab, setActiveServiceTab] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["offshore-nearshore"],
    queryFn: async () => await api.getOffshoreEngineers(),
  });

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  /* ── Derived data arrays ── */
  const stats = pageData?.stats_section?.stats_fields ?? [];

  const advantages = (pageData?.data_engineers_data_challenges?.blocks ?? []).map((item: any) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.description ?? "",
    image: item.image?.url ?? "",
  }));

  const keyQuestions = (pageData?.key_questions_for_gcc?.cards ?? []).map((item: any) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.content ?? "",
  }));

  const whenCards = (pageData?.when_should_you_consider_offshore?.cards ?? []).map((item: any) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.content ?? "",
  }));

  const gccCards = (pageData?.global_capability_centre?.cards ?? []).map((item: any) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.content ?? "",
  }));

  const coeCards = (pageData?.what_is_a_center_of_excellence?.benefit_cards ?? []).map((item: any) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.content ?? "",
  }));

  const serviceTabs = (pageData?.our_offshore_and_nearshore_setup_services?.service_tabs ?? []).map((item: any) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.content ?? "",
    image: item.image?.large ?? item.image?.url ?? "",
  }));

  const processSteps = (pageData?.our_gcc_coe_setup_process?.slider_section ?? []).map((item: any) => ({
    icon: item.icon,
    title: item.title ?? "",
    description: item.content ?? "",
    image: item.image?.large ?? item.image?.url ?? "",
  }));

  const offVsNearRightCards = pageData?.offshore_vs_nearshore_setup?.right_cards ?? [];

  const faqs = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? item.question ?? item.q ?? "",
        a: item.post_content ?? item.answer ?? item.a ?? "",
      }))
    : [];

  return (
    <div>
      <SeoTags
        title={pageData?.seo?.title}
        description={pageData?.seo?.description}
        ogImage={pageData?.seo?.og_image}
        schema={pageData?.schema}
      />

      {/* ====== HERO ====== */}
      <section
        id="hero"
        ref={setSectionRef("hero")}
        className="relative py-8 lg:py-12 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)" }}
      >
        <NetworkCanvas />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none hidden md:block">
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(95, 194, 227, 0.08) 0%, transparent 70%)", animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none hidden md:block">
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(0, 78, 158, 0.1) 0%, transparent 70%)", animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          {[...Array(12)].map((_, i) => (
            <div key={`fp-${i}`} className="absolute rounded-full bg-accent/20" style={{ width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`, left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%`, animation: `float ${5 + Math.random() * 6}s ease-in-out infinite`, animationDelay: `${Math.random() * 4}s`, boxShadow: "0 0 6px rgba(95, 194, 227, 0.4)" }} />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 lg:pt-12">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center">

            {/* Left — Image */}
            <div className="relative" style={{ animation: "heroSlideInLeft 0.6s ease-out both" }}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(95, 194, 227, 0.08)" }}>
                  <img
                    src={pageData?.banner_section?.banner_image?.url}
                    alt={pageData?.banner_section?.banner_image?.alt || "Global offshore and nearshore engineering centers"}
                    className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-[2s] hover:scale-105"
                    style={{ filter: "brightness(0.9) contrast(1.05)" }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                </div>
                <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
                {/* Badge 1 — right */}
                <div className="absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block" style={{ background: "rgba(10, 15, 30, 0.85)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", animation: "heroFadeUp 0.8s ease-out 0.6s both, float 6s ease-in-out 1.4s infinite" }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{pageData?.banner_section?.floating_badge_fields?.[1]?.badge_heading}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: pageData?.banner_section?.floating_badge_fields?.[1]?.badge_text ?? "" }} />
                </div>
                {/* Badge 2 — left */}
                <div className="absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block" style={{ background: "rgba(10, 15, 30, 0.85)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", animation: "heroFadeUp 0.8s ease-out 0.8s both, float 5s ease-in-out 1.6s infinite" }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{pageData?.banner_section?.floating_badge_fields?.[0]?.badge_heading}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: pageData?.banner_section?.floating_badge_fields?.[0]?.badge_text ?? "" }} />
                </div>
              </div>
            </div>

            {/* Right — Text */}
            <div style={{ animation: "heroSlideInRight 0.8s ease-out 0.2s both" }}>
              <Link to={pageData?.banner_section?.back_service_button ?? "/services/engineer-as-a-service"} className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                ← Engineer as a Service
              </Link>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.banner_section?.banner_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
              />
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: pageData?.banner_section?.banner_description ?? "" }} />
              {pageData?.banner_section?.highlighted_text && (
                <p className="text-sm font-semibold text-accent mb-6 text-left" style={{ animation: "pulse 3s ease-in-out infinite" }}>
                  {pageData.banner_section.highlighted_text}
                </p>
              )}
              <Link to={pageData?.banner_section?.cta_url ?? ""}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {pageData?.banner_section?.cta_text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          {stats.length > 0 && (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl backdrop-blur-2xl hover:scale-[1.01] hover:border-accent/25" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(95,194,227,0.04) 50%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(95, 194, 227, 0.15)", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05)", animation: "heroFadeUp 0.8s ease-out 1s both, statsBarShimmer 6s ease-in-out 1.8s infinite" }}>
              <AnimatedStat value={stats[0]?.stats_numbers} label={stats[0]?.stats_title} delay={100} isVisible={true} />
              <AnimatedStat value={stats[1]?.stats_numbers} label={stats[1]?.stats_title} delay={250} isVisible={true} />
              <AnimatedStat value={stats[2]?.stats_numbers} label={stats[2]?.stats_title} delay={400} isVisible={true} />
              <AnimatedStat value={stats[3]?.stats_numbers} label={stats[3]?.stats_title} delay={550} isVisible={true} />
            </div>
          )}
        </div>

        <style>{`
          @keyframes heroSlideInLeft { from { opacity: 0; transform: translateX(-48px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
          @keyframes statsBarShimmer {
            0%, 100% { box-shadow: 0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05); }
            50% { box-shadow: 0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 50px rgba(95,194,227,0.1); }
          }
          @media (prefers-reduced-motion: reduce) { @keyframes statsBarShimmer {} }
        `}</style>
      </section>

      {/* ====== WHAT IS OFFSHORE / NEARSHORE ====== */}
      <section id="what-is" ref={setSectionRef("what-is")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
            <div className="relative order-2 lg:order-1" style={{ opacity: 1, transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)", transition: "opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1), transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), filter 900ms cubic-bezier(0.22, 1, 0.36, 1)", transitionDelay: "80ms", willChange: "opacity, transform, filter" }}>
              <div className="relative rounded-2xl overflow-hidden aspect-[5/4]" style={{ border: "1px solid rgba(95,194,227,0.15)", boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)" }}>
                <img
                  src={pageData?.what_is_offshore_and_nearshore_setup_section?.left_image?.large ?? pageData?.what_is_offshore_and_nearshore_setup_section?.left_image?.url}
                  alt={pageData?.what_is_offshore_and_nearshore_setup_section?.left_image?.alt || "Global offshore and nearshore GCC network"}
                  loading="lazy" width={1024} height={1024} className="w-full h-full object-cover"
                  style={{ transform: "scale(1)", transition: "transform 1600ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent 0%, transparent 40%, hsl(222 47% 5% / 0.6) 75%, hsl(222 47% 5%) 100%)" }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 60%, hsl(222 47% 5% / 0.8) 100%)" }} />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight text-left"
                style={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.what_is_offshore_and_nearshore_setup_section?.right_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
              />
              <div
                className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left space-y-4"
                style={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                dangerouslySetInnerHTML={{ __html: pageData?.what_is_offshore_and_nearshore_setup_section?.right_section_content ?? "" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA 1 */}
      {pageData?.data_engineers_security_brief_cta?.heading && (
        <CtaBanner
          heading={pageData.data_engineers_security_brief_cta.heading}
          content={pageData.data_engineers_security_brief_cta.content}
          ctaText={pageData.data_engineers_security_brief_cta.cta_text}
          ctaUrl={pageData.data_engineers_security_brief_cta.cta_url ?? ""}
        />
      )}

      {/* ====== WHY COMPANIES CHOOSE ====== */}
      {advantages.length > 0 && (
        <section id="advantages" ref={setSectionRef("advantages")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.data_engineers_data_challenges?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {pageData?.data_engineers_data_challenges?.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">{pageData.data_engineers_data_challenges.paragraph}</p>
              )}
            </div>
            <CardDeckSpread cards={advantages} isVisible={true} />
          </div>
        </section>
      )}

      {/* CTA 2 */}
      {pageData?.on_demand_cta?.heading && (
        <CtaBanner
          heading={pageData.on_demand_cta.heading}
          content={pageData.on_demand_cta.content}
          ctaText={pageData.on_demand_cta.cta_text}
          ctaUrl={pageData.on_demand_cta.cta_url ?? ""}
        />
      )}

      {/* ====== KEY QUESTIONS ====== */}
      {keyQuestions.length > 0 && (
        <section id="key-questions" ref={setSectionRef("key-questions")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.key_questions_for_gcc?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {pageData?.key_questions_for_gcc?.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">{pageData.key_questions_for_gcc.paragraph}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
              {keyQuestions.map((item, i) => {
                const isFeatured = i === 0;
                return (
                  <div key={i} className={`group relative transition-all duration-500 hover:-translate-y-1 ${isFeatured ? "lg:col-span-2" : ""} opacity-100 translate-y-0`} style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.35) 0%, rgba(0,119,182,0.15) 50%, transparent 100%)" }} />
                    <div className="relative h-full p-6 lg:p-7 rounded-2xl backdrop-blur-sm overflow-hidden flex flex-col" style={{ background: isFeatured ? "linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(11,18,32,0.65) 100%)" : "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      {isFeatured && <div className="absolute pointer-events-none" style={{ top: "-40%", right: "-10%", width: "320px", height: "320px", background: "radial-gradient(ellipse at center, rgba(95,194,227,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />}
                      <div className="relative flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.12) 0%, rgba(0,119,182,0.06) 100%)", border: "1px solid rgba(95,194,227,0.25)" }}>
                          <DynamicIcon name={item.icon} className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-base lg:text-[17px] font-bold text-foreground group-hover:text-accent transition-colors leading-snug pt-1.5 pr-6" dangerouslySetInnerHTML={{ __html: item.title }} />
                      </div>
                      <div className="relative h-px w-10 mb-4 transition-all duration-500 group-hover:w-20" style={{ background: "linear-gradient(90deg, #5FC2E3 0%, transparent 100%)" }} />
                      <p className="relative text-sm text-muted-foreground leading-relaxed text-left flex-1" dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                  </div>
                );
              })}
            </div>
            {pageData?.key_questions_for_gcc?.bottom_paragraph && (
              <p className="max-w-3xl mx-auto text-center text-sm text-muted-foreground mt-8 leading-relaxed">{pageData.key_questions_for_gcc.bottom_paragraph}</p>
            )}
          </div>
        </section>
      )}

      {/* CTA 3 */}
      {pageData?.cta_section_70?.content && (
        <CtaBanner
          heading={pageData.cta_section_70.content}
          ctaText={pageData.cta_section_70.cta_text}
          ctaUrl={pageData.cta_section_70.cta_url ?? ""}
        />
      )}

      {/* ====== OFFSHORE VS NEARSHORE ====== */}
      <section id="compare" ref={setSectionRef("compare")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-6xl mx-auto mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.offshore_vs_nearshore_setup?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              <div className="lg:col-span-7 relative rounded-2xl p-6 lg:p-8 backdrop-blur-sm overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.30) 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="absolute top-0 left-0 h-full w-1" style={{ background: "linear-gradient(180deg, #5FC2E3 0%, #0077B6 100%)" }} />
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: pageData?.offshore_vs_nearshore_setup?.left_content ?? "" }} />
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                {offVsNearRightCards.map((card: any, i: number) => {
                  const isNearshore = i === 0;
                  return (
                    <div key={i} className="relative rounded-2xl p-5 backdrop-blur-sm overflow-hidden group hover:-translate-y-0.5 transition-transform" style={{ background: isNearshore ? "linear-gradient(135deg, rgba(0,119,182,0.10) 0%, rgba(15,23,42,0.55) 100%)" : "linear-gradient(135deg, rgba(95,194,227,0.08) 0%, rgba(15,23,42,0.55) 100%)", border: `1px solid ${isNearshore ? "rgba(0,119,182,0.30)" : "rgba(95,194,227,0.28)"}` }}>
                      <div className="relative flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: isNearshore ? "rgba(0,119,182,0.15)" : "rgba(95,194,227,0.12)", border: `1px solid ${isNearshore ? "rgba(0,119,182,0.35)" : "rgba(95,194,227,0.32)"}` }}>
                          <DynamicIcon name={card.icon} className={`w-5 h-5 ${isNearshore ? "text-primary" : "text-accent"}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground mb-1">{card.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: card.content ?? "" }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {pageData?.offshore_vs_nearshore_setup?.bottom_paragraph && (
            <div className="max-w-4xl mx-auto mb-10 rounded-2xl p-5 sm:p-6 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left" style={{ background: "linear-gradient(120deg, rgba(95,194,227,0.08) 0%, rgba(15,23,42,0.55) 50%, rgba(0,119,182,0.10) 100%)", border: "1px solid rgba(95,194,227,0.22)" }}>
              <p className="text-base sm:text-lg font-semibold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData.offshore_vs_nearshore_setup.bottom_paragraph, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <Link to={pageData.offshore_vs_nearshore_setup.bottom_button_url ?? ""} className="flex-shrink-0 w-full sm:w-auto">
                <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                  {pageData.offshore_vs_nearshore_setup.bottom_button_text}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}

          {pageData?.offshore_vs_nearshore?.heading && (
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData.offshore_vs_nearshore.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
          )}

          {/* VS Cards — static fallback since API cards is null */}
          <div className="relative grid md:grid-cols-2 gap-6 lg:gap-10 mb-8">
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full items-center justify-center font-mono text-sm font-bold text-foreground" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.25), rgba(0,119,182,0.25))", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 32px -8px rgba(95,194,227,0.4)" }}>VS</div>
            <div className="relative rounded-2xl p-6 lg:p-8 backdrop-blur-sm overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(95,194,227,0.06) 0%, rgba(15,23,42,0.55) 60%)", border: "1px solid rgba(95,194,227,0.22)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.10)", border: "1px solid rgba(95,194,227,0.30)" }}><Globe className="w-5 h-5 text-accent" /></div>
                <h3 className="text-xl font-bold text-foreground leading-tight">Offshore Setup</h3>
              </div>
              <div className="h-px w-full my-4" style={{ background: "linear-gradient(90deg, rgba(95,194,227,0.30), transparent)" }} />
              <ul className="space-y-3.5">
                {["Ideal for substantial development and extended delivery", "Available at a very low cost with a very large talent pool", "Most appropriate for functions required by triangular development and support (e.g., back-end engineers, Quality Assurance (QA), and support)"].map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-left"><CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" /><p className="text-sm text-muted-foreground leading-relaxed">{t}</p></li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl p-6 lg:p-8 backdrop-blur-sm overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(0,119,182,0.08) 0%, rgba(15,23,42,0.55) 60%)", border: "1px solid rgba(0,119,182,0.28)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,119,182,0.12)", border: "1px solid rgba(0,119,182,0.35)" }}><Building2 className="w-5 h-5 text-primary" /></div>
                <h3 className="text-xl font-bold text-foreground leading-tight">Nearshore Setup</h3>
              </div>
              <div className="h-px w-full my-4" style={{ background: "linear-gradient(90deg, rgba(0,119,182,0.30), transparent)" }} />
              <ul className="space-y-3.5">
                {["Strong time-zone correlation to headquarters", "Instantaneous collaboration in real-time", "Tremendous advantage to client-facing teams or agile delivery teams"].map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-left"><CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" /><p className="text-sm text-muted-foreground leading-relaxed">{t}</p></li>
                ))}
              </ul>
            </div>
          </div>

          {pageData?.offshore_vs_nearshore?.bottom_blocks_title && (
            <div className="relative rounded-2xl p-6 lg:p-8 backdrop-blur-sm overflow-hidden" style={{ background: "linear-gradient(120deg, rgba(95,194,227,0.06) 0%, rgba(15,23,42,0.50) 50%, rgba(0,119,182,0.08) 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.15), rgba(0,119,182,0.15))", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <DynamicIcon name={pageData.offshore_vs_nearshore.bottom_blocks_icon ?? "lucide-scale"} className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-accent/80 font-mono mb-0.5">{pageData.offshore_vs_nearshore.bottom_blocks_label}</p>
                    <h4 className="text-lg lg:text-xl font-bold text-foreground leading-tight">{pageData.offshore_vs_nearshore.bottom_blocks_title}</h4>
                  </div>
                </div>
                <div className="hidden lg:block w-px h-16 self-center" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1 text-left" dangerouslySetInnerHTML={{ __html: pageData.offshore_vs_nearshore.bottom_blocks_content ?? "" }} />
                <Link to={pageData.offshore_vs_nearshore.bottom_blocks_button_url ?? ""} className="flex-shrink-0 w-full lg:w-auto">
                  <Button variant="outline" size="lg" className="w-full lg:w-auto group">
                    {pageData.offshore_vs_nearshore.bottom_blocks_button_text ?? "Help Me Decide"}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ====== WHEN TO CONSIDER ====== */}
      {whenCards.length > 0 && (
        <section id="when" ref={setSectionRef("when")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none opacity-40" style={{ background: "radial-gradient(ellipse at center, rgba(0,119,182,0.18), transparent 70%)" }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.when_should_you_consider_offshore?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-4">
              {whenCards.map((item, i) => {
                const isFeatured = i === 0;
                return (
                  <div key={i} className={`group relative transition-all duration-500 ${isFeatured ? "lg:col-span-6" : "lg:col-span-3"} opacity-100 translate-y-0`} style={{ transitionDelay: `${i * 90}ms` }}>
                    <div className="relative h-full rounded-2xl p-6 sm:p-7 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:-translate-y-1" style={{ background: isFeatured ? "linear-gradient(120deg, rgba(0,119,182,0.12) 0%, rgba(15,23,42,0.65) 45%, rgba(95,194,227,0.08) 100%)" : "linear-gradient(135deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.40) 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(95,194,227,0.35)" }} />
                      <div className="relative flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`${isFeatured ? "w-14 h-14" : "w-11 h-11"} rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`} style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.30)" }}>
                            <DynamicIcon name={item.icon} className={`${isFeatured ? "w-6 h-6" : "w-5 h-5"} text-accent`} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <h3 className={`${isFeatured ? "text-lg sm:text-xl" : "text-base sm:text-lg"} font-bold text-foreground group-hover:text-accent transition-colors leading-snug mb-2`}>{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {pageData?.when_should_you_consider_offshore?.cta_content && (
              <div className={`max-w-6xl mx-auto mt-8 transition-all duration-700 opacity-100 translate-y-0`} style={{ transitionDelay: "500ms" }}>
                <div className="relative rounded-2xl p-5 sm:p-6 backdrop-blur-sm overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6" style={{ background: "linear-gradient(120deg, rgba(0,119,182,0.14) 0%, rgba(15,23,42,0.55) 50%, rgba(95,194,227,0.10) 100%)", border: "1px solid rgba(95,194,227,0.20)" }}>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.14)", border: "1px solid rgba(95,194,227,0.28)" }}>
                      <DynamicIcon name={pageData.when_should_you_consider_offshore.cta_icon ?? "lucide-lightbulb"} className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-sm sm:text-base text-foreground font-semibold">{pageData.when_should_you_consider_offshore.cta_content}</p>
                  </div>
                  <Link to={pageData.when_should_you_consider_offshore.button_url ?? ""} className="w-full sm:w-auto flex-shrink-0">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                      {pageData.when_should_you_consider_offshore.button_text}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== GCC OVERVIEW ====== */}
      {(pageData?.global_capability_centre?.heading || pageData?.global_capability_centre?.paragraph) && (
        <section id="gcc-overview" ref={setSectionRef("gcc-overview")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-5xl mx-auto text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              {pageData.global_capability_centre.heading && <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData.global_capability_centre.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />}
              {pageData.global_capability_centre.sub_heading && <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">{pageData.global_capability_centre.sub_heading}</p>}
              {pageData.global_capability_centre.paragraph && <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: pageData.global_capability_centre.paragraph }} />}
            </div>
            {gccCards.length > 0 && (
              <>
                {pageData.global_capability_centre.key_advantages_heading && <h3 className="text-xl font-bold text-foreground text-center mb-6">{pageData.global_capability_centre.key_advantages_heading}</h3>}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  {gccCards.map((item, i) => (
                    <div key={i} className="rounded-2xl p-5 backdrop-blur-sm" style={{ background: "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}><DynamicIcon name={item.icon} className="w-5 h-5 text-accent" /></div>
                        <h4 className="text-base font-bold text-foreground leading-snug">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                  ))}
                </div>
              </>
            )}
            {pageData.global_capability_centre.cta_content && (
              <CtaBanner heading={pageData.global_capability_centre.cta_content} ctaText={pageData.global_capability_centre.button_text ?? "Discuss Your Capability Center!"} ctaUrl={pageData.global_capability_centre.button_url ?? ""} />
            )}
          </div>
        </section>
      )}

      {/* ====== COE OVERVIEW ====== */}
      {pageData?.what_is_a_center_of_excellence?.heading && (
        <section id="coe-overview" ref={setSectionRef("coe-overview")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-5xl mx-auto text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData.what_is_a_center_of_excellence.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {pageData.what_is_a_center_of_excellence.sub_heading && <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">{pageData.what_is_a_center_of_excellence.sub_heading}</p>}
              {pageData.what_is_a_center_of_excellence.content && <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: pageData.what_is_a_center_of_excellence.content }} />}
            </div>
            {coeCards.length > 0 && (
              <>
                {pageData.what_is_a_center_of_excellence["benefit-heading"] && <h3 className="text-xl font-bold text-foreground text-center mb-6">{pageData.what_is_a_center_of_excellence["benefit-heading"]}</h3>}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  {coeCards.map((item, i) => (
                    <div key={i} className="rounded-2xl p-5 backdrop-blur-sm" style={{ background: "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}><DynamicIcon name={item.icon} className="w-5 h-5 text-accent" /></div>
                        <h4 className="text-base font-bold text-foreground leading-snug">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                  ))}
                </div>
              </>
            )}
            {pageData.what_is_a_center_of_excellence.button_text && (
              <div className="text-center">
                <Link to={pageData.what_is_a_center_of_excellence.button_url ?? ""}>
                  <Button variant="hero" size="lg" className="group">
                    {pageData.what_is_a_center_of_excellence.button_text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== OUR SERVICES ====== */}
      {serviceTabs.length > 0 && (
        <section id="services" ref={setSectionRef("services")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-4xl mx-auto text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.our_offshore_and_nearshore_setup_services?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {pageData?.our_offshore_and_nearshore_setup_services?.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{pageData.our_offshore_and_nearshore_setup_services.paragraph}</p>
              )}
            </div>
            <div className={`grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-6 lg:gap-8 items-stretch transition-all duration-700 opacity-100 translate-y-0`}>
              {/* Tab list */}
              <div className="relative rounded-2xl p-2 backdrop-blur-sm flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible" style={{ background: "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {serviceTabs.map((item, i) => {
                  const isActive = activeServiceTab === i;
                  return (
                    <button key={i} type="button" onClick={() => setActiveServiceTab(i)} className={`group relative flex items-center gap-3 text-left rounded-xl px-4 py-3 transition-all duration-300 flex-shrink-0 lg:w-full ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`} style={{ background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.14) 0%, rgba(0,119,182,0.10) 100%)" : "transparent", border: isActive ? "1px solid rgba(95,194,227,0.35)" : "1px solid transparent", boxShadow: isActive ? "0 6px 20px -10px rgba(95,194,227,0.45)" : "none" }}>
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors" style={{ background: isActive ? "rgba(95,194,227,0.18)" : "rgba(95,194,227,0.05)", border: `1px solid ${isActive ? "rgba(95,194,227,0.45)" : "rgba(95,194,227,0.18)"}` }}>
                        <DynamicIcon name={item.icon} className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
                      </span>
                      <span className="text-sm font-semibold leading-snug whitespace-nowrap lg:whitespace-normal">{item.title}</span>
                      {isActive && <span className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#5FC2E3", boxShadow: "0 0 10px rgba(95,194,227,0.8)" }} />}
                    </button>
                  );
                })}
              </div>
              {/* Tab panel */}
              <div key={activeServiceTab} className="relative rounded-2xl backdrop-blur-sm overflow-hidden flex flex-col h-full" style={{ background: "rgba(15,23,42,0.55)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="relative w-full overflow-hidden aspect-[16/5] flex-shrink-0">
                  <img src={serviceTabs[activeServiceTab].image} alt={serviceTabs[activeServiceTab].title} className="absolute inset-0 w-full h-full object-cover object-center" style={{ filter: "brightness(0.85) contrast(1.05)" }} loading="lazy" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.10) 40%, rgba(15,23,42,0.85) 100%)" }} />
                </div>
                <div className="relative flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18) 0%, rgba(0,119,182,0.12) 100%)", border: "1px solid rgba(95,194,227,0.35)" }}>
                      <DynamicIcon name={serviceTabs[activeServiceTab].icon} className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight">{serviceTabs[activeServiceTab].title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: serviceTabs[activeServiceTab].description }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA 4 */}
      {pageData?.cta_section_77?.cta_content && (
        <CtaBanner
          heading={pageData.cta_section_77.cta_content}
          ctaText={pageData.cta_section_77.button_text}
          ctaUrl={pageData.cta_section_77.button_url ?? ""}
        />
      )}

      {/* ====== PROCESS ====== */}
      {processSteps.length > 0 && (
        <section id="process" ref={setSectionRef("process")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className={`lg:w-[38%] flex-shrink-0 transition-all duration-700 opacity-100 translate-y-0`}>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.our_gcc_coe_setup_process?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
                {pageData?.our_gcc_coe_setup_process?.content && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">{pageData.our_gcc_coe_setup_process.content}</p>
                )}
              </div>
              <div className="lg:w-[62%] w-full">
                <StepCarousel steps={processSteps} isVisible={true} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====== FAQs ====== */}
      {faqs.length > 0 && (
        <section id="faqs" ref={setSectionRef("faqs")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.faq_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
            <div className={`max-w-3xl mx-auto transition-all duration-700 opacity-100 translate-y-0`} style={{ transitionDelay: "150ms" }}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm px-5 overflow-hidden">
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:text-accent transition-colors py-4 text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* ====== FINAL CTA + CONTACT FORM ====== */}
      <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-6"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.services_get_started_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
              />
              {pageData?.services_get_started_section?.paragraph && (
                <p className="text-muted-foreground mb-6 text-left">{pageData.services_get_started_section.paragraph}</p>
              )}
              {pageData?.services_get_started_section?.lists?.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {pageData.services_get_started_section.lists.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{item.list}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ContactUsForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffshoreNearshore;
