import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { api } from "@/api";
import ContactUsForm, { ContactFormData } from "@/components/ContactUsForm";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import he from "he";

export async function loader() {
  try {
    const data = await api.getAIMLData();
    const contactFormFields = await api.getContactFormFields();
    return { data, contactFormFields };
  } catch (error) {
    console.error("Failed to load AI/ML solutions data", error);
    return {
      data: null,
      contactFormFields: null,
    };
  }
}

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
        nodes.push({ x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 2 + 0.5 });
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      ctx.strokeStyle = "rgba(95, 194, 227, 0.025)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.offsetHeight); ctx.stroke(); }
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.offsetWidth, y); ctx.stroke(); }
      nodes.forEach((node, i) => {
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
        ctx.beginPath(); ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.5)"; ctx.fill();
        ctx.beginPath(); ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.05)"; ctx.fill();
        nodes.slice(i + 1).forEach((node2) => {
          const dx = node.x - node2.x; const dy = node.y - node2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) { ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(node2.x, node2.y); ctx.strokeStyle = `rgba(95, 194, 227, ${0.12 * (1 - dist / 180)})`; ctx.lineWidth = 0.6; ctx.stroke(); }
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

const PulsingGlow = ({ className, color = "rgba(95, 194, 227, 0.08)" }: { className: string; color?: string }) => (
  <div className={`absolute pointer-events-none hidden md:block ${className}`}>
    <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
  </div>
);

// Reusable InlineCTA banner
const InlineCTA = ({ title, subtitle, btnText, btnUrl }: { title: string; subtitle: string; btnText: string; btnUrl: string }) => (
  <div style={{ background: "#070B12" }} className="py-6">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7"
        style={{ background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)", border: "1px solid rgba(148,163,184,0.15)", boxShadow: "0 4px 32px rgba(0,0,0,0.6)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
          <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
          <div className="absolute" style={{ top: "-60%", right: "10%", width: "420px", height: "280px", background: "transparent", border: "1.5px solid rgba(140,80,220,0.25)", borderRadius: "50%", transform: "rotate(-20deg)" }} />
          <div className="absolute" style={{ bottom: "-70%", right: "22%", width: "380px", height: "260px", background: "transparent", border: "1.5px solid rgba(56,189,248,0.15)", borderRadius: "50%", transform: "rotate(15deg)" }} />
        </div>
        <div className="flex-1 relative z-10">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        </div>
        <Link to="/contact" className="flex-shrink-0 relative z-10 w-full sm:w-auto">
          <Button size="lg" className="group font-semibold w-full sm:w-auto px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
            {btnText} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const cardStyle = { background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" };

const TechStackSection = ({ data, sectionTitle }) => {
  const [activeTab, setActiveTab] = useState(0);

  
// ── TECH STACK SECTION DATA ──
const techStackData = data.map((item) => ({
  category: item.post_title,
  icon: item.sdb.ai_stack_post_fields.stack_icon,
  color: "#5FC2E3",
  tools: item.sdb.ai_stack_post_fields.stack_tools.length && item.sdb.ai_stack_post_fields.stack_tools.map((t) => t.tool)
})) || [];

  return (
    <section
      className="relative py-8 lg:py-12 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none hidden md:block"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(95,194,227,0.04) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-0 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(sectionTitle, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
        
        </div>

        {/* Category tab strip */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {techStackData.map((cat, i) => {
            const isActive = activeTab === i;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.12))`
                    : "rgba(255,255,255,0.03)",
                  border: isActive
                    ? `1px solid ${cat.color}55`
                    : "1px solid rgba(255,255,255,0.07)",
                  color: isActive ? cat.color : "rgba(167,176,192,1)",
                  boxShadow: isActive ? `0 0 14px ${cat.color}22` : "none"
                }}
              >
                <DynamicIcon name={cat.icon} className="w-3.5 h-3.5" />
                {cat.category}
              </button>
            );
          })}
        </div>

        {/* Active category panel */}
        <div
          className="relative rounded-3xl overflow-hidden p-8 lg:p-10 transition-all duration-300"
          style={{
            background: "rgba(10,18,35,0.88)",
            border: `1px solid ${techStackData[activeTab].color}22`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.45), 0 0 40px ${techStackData[activeTab].color}0A`
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${techStackData[activeTab].color}, transparent)` }} />

          {/* Category label row */}
          <div className="flex items-center gap-3 mb-8">
            {(() => {
              const ActiveIcon = techStackData[activeTab].icon;
              return (
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${techStackData[activeTab].color}18`, border: `1px solid ${techStackData[activeTab].color}35` }}>
                  <DynamicIcon name={ActiveIcon} className="w-5 h-5" />
                </div>
              );
            })()}
            <div>
              <div className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: techStackData[activeTab].color }}>
                Stack Category
              </div>
              <h3 className="text-lg font-bold text-foreground">{techStackData[activeTab].category}</h3>
            </div>
            {/* Counter badge */}
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: `${techStackData[activeTab].color}10`, border: `1px solid ${techStackData[activeTab].color}25` }}>
              <span className="text-xs font-mono font-bold" style={{ color: techStackData[activeTab].color }}>
                {techStackData[activeTab].tools.length}
              </span>
              <span className="text-[10px] text-muted-foreground">tools</span>
            </div>
          </div>

          {/* Tools grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {techStackData[activeTab].tools.map((tool, j) => (
              <div
                key={j}
                className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-5 text-center transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid rgba(255,255,255,0.07)`,
                }}
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${techStackData[activeTab].color}10 0%, transparent 70%)`, border: `1px solid ${techStackData[activeTab].color}30` }} />
                {/* Tool dot */}
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: techStackData[activeTab].color, boxShadow: `0 0 8px ${techStackData[activeTab].color}80` }} />
                <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-200 leading-snug relative z-10">
                  {tool}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom breadcrumb dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            {techStackData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: activeTab === i ? "20px" : "6px",
                  height: "6px",
                  background: activeTab === i ? techStackData[activeTab].color : "rgba(255,255,255,0.15)"
                }}
              />
            ))}
          </div>
        </div>

        {/* Summary strip — all categories at a glance */}
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
          {techStackData.map((cat, i) => {
            const SumIcon = cat.icon;
            const isActive = activeTab === i;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 transition-all duration-200"
                style={{
                  background: isActive ? `${cat.color}12` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? cat.color + "30" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <DynamicIcon name={SumIcon} className="w-4 h-4" />
                <span className="text-[10px] font-medium leading-tight text-center"
                  style={{ color: isActive ? cat.color : "rgba(167,176,192,0.6)" }}>
                  {cat.category}
                </span>
                <span className="text-[9px] font-mono" style={{ color: "rgba(167,176,192,0.4)" }}>
                  {cat.tools.length} tools
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CoreServicesSection = ({data}) => {
  const coreServices = data?.core_services?.map((service, index) => ({
    icon: service.icon,
    number: `0${index + 1}`,
    title: service.title,
    body: service.description,
    color: "#5FC2E3",
    image: service.image.url,
    cta_text: service.cta_text,
    cta_link: service.cta_url

})) || [];

  const [active, setActive] = useState(0);
  const current = coreServices[active];

  return (
    <section
      className="relative py-8 lg:py-12 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none hidden md:block"
        style={{ background: "radial-gradient(ellipse at center, rgba(95,194,227,0.05) 0%, transparent 65%)" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(data?.section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />  
        </div>

        {/* Preload all service images for instant switching */}
        <div className="hidden">
          {coreServices.map((svc, i) => (
            <img key={i} src={svc.image} alt="" loading="eager" /> 
          ))}
        </div>

        {/* ── DESKTOP: side-by-side ── */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6" style={{ alignItems: "stretch" }}>
          {/* Left nav */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {coreServices.map((svc, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="group relative flex items-center gap-3 text-left rounded-2xl px-4 py-4 transition-all duration-300 w-full flex-1"
                  style={{
                    background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.14), rgba(0,119,182,0.08))" : "rgba(255,255,255,0.02)",
                    border: isActive ? "1px solid rgba(95,194,227,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive ? "0 4px 24px rgba(95,194,227,0.12)" : "none"
                  }}
                >
                  {isActive && <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full" style={{ background: "linear-gradient(180deg, #5FC2E3, #0077B6)" }} />}
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.3), rgba(0,119,182,0.2))" : "rgba(95,194,227,0.08)",
                      border: isActive ? "1px solid rgba(95,194,227,0.4)" : "1px solid rgba(95,194,227,0.12)",
                      boxShadow: isActive ? "0 0 16px rgba(95,194,227,0.3)" : "none"
                    }}>
                    <DynamicIcon name={svc.icon} className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold leading-tight truncate transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} dangerouslySetInnerHTML={{__html: svc.title}}></div>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 ml-auto" />}
                </button>
              );
            })}
          </div>

          {/* Right detail panel */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="rounded-3xl overflow-hidden flex flex-col flex-1"
              style={{ background: "rgba(10,18,35,0.9)", border: "1px solid rgba(95,194,227,0.15)", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
              <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${current.color}, transparent)` }} />
              <div className="relative h-44 overflow-hidden flex-shrink-0">
                <img src={current.image} alt={current.title} loading="eager" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,18,35,0.85) 0%, rgba(10,18,35,0.3) 50%, transparent 100%)" }} />
                <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
                  <div className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.25), rgba(0,119,182,0.15))", border: "1px solid rgba(95,194,227,0.35)", backdropFilter: "blur(12px)" }}>
                    <DynamicIcon name={current.icon} className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug drop-shadow-lg" dangerouslySetInnerHTML={{__html: current.title}}></h3>
                </div>
              </div>
              <div className="p-7 lg:p-8 flex flex-col flex-1 justify-between">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{__html: current.body}}></p>
                <Link to={current.cta_link}>
                  <Button size="sm" className="group font-semibold rounded-xl px-6 transition-all duration-300 hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #0077B6, #005F8E)", color: "#fff", boxShadow: "0 4px 16px rgba(0,119,182,0.35)" }}>
                    {current.cta_text}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE: accordion ── */}
        <div className="lg:hidden flex flex-col gap-3">
          {coreServices.map((svc, i) => {
            const isOpen = active === i;
            return (
              <div key={i} className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{ border: isOpen ? `1px solid rgba(95,194,227,0.3)` : "1px solid rgba(255,255,255,0.06)", background: "rgba(10,18,35,0.85)" }}>
                {/* Accordion header */}
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-3 px-4 py-4"
                >
                  {isOpen && <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full" style={{ background: "linear-gradient(180deg, #5FC2E3, #0077B6)" }} />}
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: isOpen ? "linear-gradient(135deg, rgba(95,194,227,0.3), rgba(0,119,182,0.2))" : "rgba(95,194,227,0.08)", border: isOpen ? "1px solid rgba(95,194,227,0.4)" : "1px solid rgba(95,194,227,0.12)" }}>
                    <DynamicIcon name={svc.icon} className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className={`text-sm font-semibold leading-tight ${isOpen ? "text-foreground" : "text-muted-foreground"}`} dangerouslySetInnerHTML={{__html: svc.title}}></div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-accent flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Accordion body */}
                {isOpen && (
                  <div className="px-4 pb-5">
                    <div className="h-px w-full mb-4" style={{ background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)` }} />
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{__html: svc.body}}></p>
                    <Link to={svc.cta_link}>
                      <Button size="sm" className="group font-semibold rounded-xl px-5 w-full transition-all duration-300"
                        style={{ background: "linear-gradient(135deg, #0077B6, #005F8E)", color: "#fff" }}>
                        {svc.cta_text}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── Scroll Reveal Component ──
const RevealOnScroll = ({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseStyles = "transition-all duration-700 ease-out";
  const transforms: Record<string, string> = {
    up: isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    left: isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
    right: isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
    scale: isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  };

  return (
    <div ref={ref} className={`${baseStyles} ${transforms[direction]} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ── Staggered Grid Items ──
const RevealGrid = ({ children, className = "", staggerMs = 100 }: { children: React.ReactNode; className?: string; staggerMs?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? children.map((child, i) => (
        <div key={i} className={`transition-all duration-600 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: `${i * staggerMs}ms` }}>
          {child}
        </div>
      )) : children}
    </div>
  );
};


const AIMLSolutions = () => {
  const loaderData = useLoaderData() as any;
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const contactFormFields = loaderData?.contactFormFields ?? null;

  const handleFormSubmit = async (data: ContactFormData) => {
          const formData = new FormData();
          formData.append("your-name", data.firstName);
          formData.append("last-name", data.lastName);
          formData.append("email", data.email);
          formData.append("phone", data.phone);
          formData.append("company-name", data.company ?? "");
          formData.append("message", data.message);
          await api.submitContactForm(formData);
        };
  

  useEffect(() => { setIsVisible(true); }, []);

  const AnimatedStat = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => {
    const [displayNum, setDisplayNum] = useState(0);
    const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");
    const hasStarted = useRef(false);
    useEffect(() => {
      if (!isVisible || hasStarted.current) return;
      const timeout = setTimeout(() => {
        hasStarted.current = true;
        const duration = 1600; const steps = 40; let step = 0;
        const interval = setInterval(() => {
          step++;
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayNum(Math.min(Math.round(eased * numericPart), numericPart));
          if (step >= steps) { setDisplayNum(numericPart); clearInterval(interval); }
        }, duration / steps);
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

  const engagementModels = loaderData?.data?.data?.engagement_models_section?.right_side_box?.map((model: any) => ({
    icon: model.icon,
    title: model.title,
    desc: model.description
  })) || [];

  const process = loaderData?.data?.data?.how_our_engineers_work_section?.box_fields?.map((step: any) => ({
    icon: step.icon,
    title: step.title,
    desc: step.description,
    bottomTxt: step.bottom_text
  })) || [];

  const faqs = loaderData?.data?.data?.frequently_asked_question?.map((faq: any) => ({
    q: faq.post_title,
    a: faq.post_content
  })) || [];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative py-8 lg:py-12 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)" }}>
        <NetworkCanvas />
        <PulsingGlow className="top-0 right-0 w-[600px] h-[600px]" />
        <PulsingGlow className="bottom-0 left-0 w-[500px] h-[500px]" color="rgba(0, 78, 158, 0.1)" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-8 lg:pt-12 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left – Image */}
            <div className={`relative transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-12 scale-95"}`}>
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(95,194,227,0.1)" }}>
                <img src={loaderData?.data?.data?.banner_section?.banner_image?.url} alt={loaderData?.data?.data?.banner_section?.banner_image?.alt} className="w-full h-[350px] lg:h-[420px] object-cover transition-transform duration-[2s] hover:scale-105" style={{ filter: "brightness(0.9) contrast(1.05)" }} loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-accent/40 rounded-tl-3xl" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-3xl" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
              <div className={`absolute -right-4 top-1/4 p-4 rounded-xl backdrop-blur-xl hidden sm:block ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 10px 40px rgba(0,0,0,0.4)", animation: "float 6s ease-in-out infinite" }}>
                <div className="text-2xl font-bold text-accent font-mono">{loaderData?.data?.data?.banner_section?.floating_badge_fields && loaderData.data.data.banner_section.floating_badge_fields[1]?.badge_heading}</div>
                <div className="text-xs text-muted-foreground">{loaderData?.data?.data?.banner_section?.floating_badge_fields && loaderData.data.data.banner_section.floating_badge_fields[1]?.badge_text}</div>
              </div>
              <div className={`absolute -left-4 bottom-1/4 p-4 rounded-xl backdrop-blur-xl hidden sm:block ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 10px 40px rgba(0,0,0,0.4)", animation: "float 5s ease-in-out infinite", animationDelay: "2s" }}>
                <div className="text-2xl font-bold text-accent font-mono">{loaderData?.data?.data?.banner_section?.floating_badge_fields && loaderData.data.data.banner_section.floating_badge_fields[0]?.badge_heading}</div>
                <div className="text-xs text-muted-foreground">{loaderData?.data?.data?.banner_section?.floating_badge_fields && loaderData.data.data.banner_section.floating_badge_fields[0]?.badge_text}</div>
              </div>
            </div>

            {/* Right – Content */}
            <div className={`transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-snug mb-5" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.banner_section?.banner_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
               {loaderData?.data?.data?.banner_section?.banner_description}
              </p>
              <p className="text-sm font-semibold text-accent mb-6" style={{ animation: "pulse 3s ease-in-out infinite" }}>
                {loaderData?.data?.data?.banner_section?.highlighted_text}
              </p>
              <Link to={loaderData?.data?.data?.banner_section?.cta_url}>
                <Button size="lg" className="group w-full sm:w-auto bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {loaderData?.data?.data?.banner_section?.cta_text} 
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={`mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl backdrop-blur-2xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(95,194,227,0.04) 50%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(95,194,227,0.15)", boxShadow: "0 10px 40px rgba(0,0,0,0.35)", transitionDelay: "1000ms" }}>
            <AnimatedStat value={loaderData?.data?.data?.stats_section?.stats_fields[0]?.stats_numbers} label={loaderData?.data?.data?.stats_section?.stats_fields[0]?.stats_title} delay={1100} />
            <AnimatedStat value={loaderData?.data?.data?.stats_section?.stats_fields[1]?.stats_numbers} label={loaderData?.data?.data?.stats_section?.stats_fields[1]?.stats_title} delay={1250} />
            <AnimatedStat value={loaderData?.data?.data?.stats_section?.stats_fields[2]?.stats_numbers} label={loaderData?.data?.data?.stats_section?.stats_fields[2]?.stats_title} delay={1400} />
            <AnimatedStat value={loaderData?.data?.data?.stats_section?.stats_fields[3]?.stats_numbers} label={loaderData?.data?.data?.stats_section?.stats_fields[3]?.stats_title} delay={1550} />
          </div>
        </div>

        <style>{`
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        `}</style>
      </section>

      {/* ── ENTERPRISE AI CHALLENGES ── */}
      <section className="relative py-14 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] pointer-events-none hidden md:block" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.06) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.ai_ml_challenges_section?.section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="w-16 h-[2px] mx-auto" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6)" }} />
            </div>
          </RevealOnScroll>

          {/* Bento layout */}
          <RevealOnScroll delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
{loaderData?.data?.data?.ai_ml_challenges_section?.box_fields?.length && (<>
            {/* Card 1 */}
            <div className="lg:col-span-2 group relative rounded-2xl overflow-hidden" style={{ minHeight: "460px" }}>
              <img src={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[0]?.image?.url} alt={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[0]?.image?.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(5,10,25,0.97) 0%, rgba(5,10,25,0.75) 45%, rgba(5,10,25,0.3) 100%)" }} />
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, transparent)" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.25), rgba(0,119,182,0.15))", border: "1px solid rgba(95,194,227,0.35)", backdropFilter: "blur(8px)" }}>
                  <DynamicIcon name={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[0]?.icon}className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[0]?.title }} />
                <p className="text-muted-foreground text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[0]?.description }} />
                <div className="mt-5 w-10 h-[2px] group-hover:w-20 transition-all duration-500" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6)" }} />
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-3 grid grid-rows-2 gap-5">

              {/* Card 2 */}
              <div className="group relative rounded-2xl overflow-hidden" style={{ minHeight: "218px" }}>
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative sm:w-2/5 flex-shrink-0 overflow-hidden h-40 sm:h-auto">
                    <img src={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[1]?.image?.url} alt={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[1]?.image?.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,10,25,0) 60%, rgba(8,14,30,0.95) 100%)" }} />
                    <div className="absolute bottom-0 sm:bottom-auto sm:top-0 left-0 right-0 sm:right-auto sm:top-0 sm:bottom-0 sm:right-0 sm:w-[1px] h-[1px] sm:h-auto" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, transparent)" }} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center p-5 sm:p-6 lg:p-7 relative" style={{ background: "rgba(8,14,30,0.95)", border: "1px solid rgba(95,194,227,0.1)" }}>
                    <div className="absolute inset-0 rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(95,194,227,0.06) 0%, transparent 70%)" }} />
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 flex-shrink-0 relative z-10" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.12))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <DynamicIcon name={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[1]?.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 relative z-10" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[1]?.title }} />
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[1]?.description }} />
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-2xl overflow-hidden" style={{ minHeight: "218px" }}>
                <div className="flex flex-col-reverse sm:flex-row h-full">
                  <div className="flex-1 flex flex-col justify-center p-5 sm:p-6 lg:p-7 relative" style={{ background: "rgba(8,14,30,0.95)", border: "1px solid rgba(95,194,227,0.1)" }}>
                    <div className="absolute inset-0 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(95,194,227,0.06) 0%, transparent 70%)" }} />
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 flex-shrink-0 relative z-10" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.12))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <DynamicIcon name={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[2]?.icon}  className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 relative z-10" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[2]?.title }} />
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[2]?.description }} />
                  </div>
                  <div className="relative sm:w-2/5 flex-shrink-0 overflow-hidden h-40 sm:h-auto">
                    <img src={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[2]?.image?.url} alt={loaderData?.data?.data?.ai_ml_challenges_section?.box_fields[2]?.image?.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,10,25,0) 60%, rgba(8,14,30,0.95) 100%)" }} />
                    <div className="absolute bottom-0 sm:bottom-auto sm:top-0 left-0 right-0 sm:left-0 sm:right-auto sm:w-[1px] h-[1px] sm:h-auto" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, transparent)" }} />
                  </div>
                </div>
              </div>

            </div></>
)}
          </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CORE SERVICES ── */}
      <CoreServicesSection data={loaderData?.data?.data?.core_services_section} />

      {/* ── INLINE CTA 2 ── */}
      <InlineCTA
        title={loaderData?.data?.data?.core_services_section?.cta_bottom_text}
        subtitle={loaderData?.data?.data?.core_services_section?.cta_main_text}
        btnText={loaderData?.data?.data?.core_services_section?.cta_text}
        btnUrl={loaderData?.data?.data?.core_services_section?.cta_url}
      />

      {/* ── ADVANCED CAPABILITIES ── */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={''} alt="Advanced AI Capabilities" className="w-full h-full object-cover" style={{ filter: "brightness(0.25) saturate(0.7)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,14,28,0.95) 0%, rgba(8,14,28,0.80) 50%, rgba(8,14,28,0.95) 100%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.07) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-12">
              
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.advanced_capabilities_section?.section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Card 1 – Real-Time Streaming */}
            {loaderData?.data?.data?.advanced_capabilities_section?.box_fields?.length && loaderData?.data?.data?.advanced_capabilities_section?.box_fields.map((box,i) => (
              <div className="group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 flex flex-col gap-4" style={{ background: "rgba(10,18,35,0.75)", border: "1px solid rgba(95,194,227,0.15)", backdropFilter: "blur(14px)", boxShadow: "0 8px 32px rgba(0,0,0,0.45)" }}>
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-accent/25 rounded-tr-lg" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.1))", border: "1px solid rgba(95,194,227,0.25)" }}>
                  <DynamicIcon name={box.box_icon} className="w-5 h-5 text-accent" />
                </div>
                <span className="text-4xl font-bold font-mono select-none" style={{ WebkitTextStroke: "1px rgba(95,194,227,0.18)", color: "transparent" }}>0{i + 1}</span>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{box.box_title}</h3>
                <div dangerouslySetInnerHTML={{ __html: he.decode(box.box_description) }} />
              </div>
            </div>
            )
            )}
          </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── INLINE CTA ADVANCED ── */}
      <InlineCTA
        title={loaderData?.data?.data?.advanced_capabilities_section?.cta_main_text}
        subtitle={loaderData?.data?.data?.advanced_capabilities_section?.cta_bottom_text}
        btnText={loaderData?.data?.data?.advanced_capabilities_section?.cta_text}
        btnUrl={loaderData?.data?.data?.advanced_capabilities_section?.cta_url}
      />

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="relative py-16 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(95,194,227,0.06) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.industries_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loaderData?.data?.data?.box_data.map((sector, i) => (
              <div key={i} className="group relative rounded-2xl p-5 flex flex-col items-start gap-3 transition-all duration-400 hover:-translate-y-1 hover:border-accent/40" style={{ background: "rgba(10,18,35,0.6)", border: "1px solid rgba(95,194,227,0.12)", backdropFilter: "blur(10px)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.1))", border: "1px solid rgba(95,194,227,0.22)" }}>
                  <DynamicIcon name={sector.acf.ai_icon} className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-300 leading-snug">{sector.post_title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{sector.post_content}</p>
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-accent/20 rounded-tr-lg" />
              </div>
            ))}
          </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ── */}
      <section className="relative py-14 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        {/* Background ambient glow */}
        <div className="absolute inset-0 pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(95,194,227,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(37,99,235,0.05) 0%, transparent 65%)" }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <RevealOnScroll>
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">

            {/* ── LEFT: title + showcase image ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.engagement_models_section?.main_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              </div>

              {/* Showcase image card */}
              <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[220px]"
                style={{ border: "1px solid rgba(95,194,227,0.15)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                <img
                  src={loaderData?.data?.data?.engagement_models_section?.left_side_image?.url}
                  alt={loaderData?.data?.data?.engagement_models_section?.left_side_image?.alt}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.7) saturate(1.1)" }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(10,18,35,0.7) 0%, rgba(10,18,35,0.2) 60%, transparent 100%)" }} />
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, #5FC2E3, #2563EB, transparent)" }} />
                {/* Bottom badge strip */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{ background: "linear-gradient(0deg, rgba(10,18,35,0.95) 0%, transparent 100%)" }}>
                  {/* <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: "#5FC2E3" }}>
                    Advisory · Augmentation · Delivery · Managed
                  </div>
                  <div className="flex gap-2">
                    {["Advisory", "Augmentation", "Delivery", "Managed"].map((tag, i) => (
                      <span key={i} className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(95,194,227,0.1)", border: "1px solid rgba(95,194,227,0.2)", color: "#5FC2E3" }}>
                        {tag}
                      </span>
                    ))}
                  </div> */}
                  <div dangerouslySetInnerHTML={{ __html: he.decode(loaderData?.data?.data?.engagement_models_section?.left_image_data) }} />
                </div>
              </div>
            </div>

            {/* ── RIGHT: 2×2 model cards ── */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engagementModels.map((model, i) => {
                const cardColors = ["#5FC2E3", "#4EAAFF", "#38BDF8", "#0EA5E9"];
                const color = cardColors[i];
                return (
                  <div
                    key={i}
                    className="group relative flex flex-col rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1"
                    style={{
                      background: "rgba(10,18,35,0.85)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                    }}
                  >
                    {/* Top accent bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                    {/* Hover radial glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at top left, ${color}08 0%, transparent 60%)` }} />

                    {/* Icon + title row */}
                    <div className="flex items-start gap-3 mb-4 relative z-10">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${color}18, ${color}08)`,
                          border: `1px solid ${color}30`,
                          boxShadow: `0 0 0 0 ${color}00`
                        }}>
                        <DynamicIcon name={model.icon} className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-mono font-bold uppercase tracking-widest mb-0.5" style={{ color: `${color}99` }}>
                          0{i + 1}
                        </div>
                        <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-white transition-colors duration-300">
                          {model.title}
                        </h3>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full mb-4 relative z-10"
                      style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10 flex-1">
                      {model.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── INLINE CTA 3 ── */}
      <InlineCTA
        title={loaderData?.data?.data?.engagement_models_section?.cta_highlighted_text}
        subtitle={loaderData?.data?.data?.engagement_models_section?.cta_bottom_text}
        btnUrl={loaderData?.data?.data?.engagement_models_section?.cta_url}
        btnText={loaderData?.data?.data?.engagement_models_section?.cta_text}
      />



      {/* ── DEVELOPMENT PROCESS ── */}
      <section className="relative py-14 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(95,194,227,0.04) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.how_our_engineers_work_section?.main_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
          </RevealOnScroll>

          {/* ── DESKTOP: horizontal phase strip ── */}
          <div className="hidden lg:block">
            {/* Phase connector track */}
            <div className="relative flex items-stretch gap-0">
              {(() => {
                const phaseColors = ["#5FC2E3", "#4EAAFF", "#38BDF8", "#2B8FE0", "#0EA5E9"];
                return process.map((step, i) => {
                  const color = phaseColors[i];
                  const isLast = i === process.length - 1;
                  return (
                    <div key={i} className="relative flex-1 flex items-stretch">
                      {/* Card */}
                      <div className="group relative flex flex-col rounded-2xl p-5 w-full transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background: "rgba(10,18,35,0.88)",
                          border: `1px solid rgba(255,255,255,0.07)`,
                          boxShadow: "0 8px 32px rgba(0,0,0,0.35)"
                        }}>
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
                          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                        {/* Icon + Title row */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                            style={{ background: `${color}14`, border: `1px solid ${color}30` }}>
                            <DynamicIcon name={step.icon} className="w-4 h-4" />
                          </div>
                          <h3 className="text-sm font-bold text-foreground group-hover:text-white transition-colors duration-300 leading-snug">
                            {step.title}
                          </h3>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full mb-3" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{step.desc}</p>

                      </div>

                      {/* Connector arrow between cards */}
                      {!isLast && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 flex flex-col items-center gap-0.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(10,18,35,1)", border: "1px solid rgba(95,194,227,0.25)" }}>
                            <ChevronRight className="w-3 h-3 text-accent opacity-60" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            {/* Horizontal progress track underneath */}
            <div className="relative mt-6 h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full"
                style={{ width: "100%", background: "linear-gradient(90deg, #5FC2E3, #4EAAFF, #38BDF8, #2B8FE0, #0EA5E9)" }} />
            </div>
            <div className="flex justify-between mt-2 px-1">
              {process.map((step, i) => (
                <span key={i} className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">{step.title.split(" ")[0]}</span>
              ))}
            </div>
          </div>

          {/* ── MOBILE: vertical card stack ── */}
          <div className="lg:hidden relative">
            {/* Spine */}
            <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(95,194,227,0.3) 10%, rgba(95,194,227,0.3) 90%, transparent)" }} />

            <div className="flex flex-col gap-4 pl-14">
              {process.map((step, i) => {
                const mobColors = ["#5FC2E3", "#4EAAFF", "#38BDF8", "#2B8FE0", "#0EA5E9"];
                const color = mobColors[i];
                return (
                  <div key={i} className="relative">
                    {/* Node on spine */}
                    <div className="absolute -left-9 top-5 w-8 h-8 rounded-full flex items-center justify-center z-10"
                      style={{ background: "rgba(10,18,35,1)", border: `1.5px solid ${color}60`, boxShadow: `0 0 12px ${color}20` }}>
                      <span className="text-[9px] font-bold font-mono" style={{ color }}>0{i + 1}</span>
                    </div>
                    {/* Card */}
                    <div className="rounded-2xl p-5 relative overflow-hidden"
                      style={{ background: "rgba(10,18,35,0.88)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `${color}14`, border: `1px solid ${color}30` }}>
                          <DynamicIcon name={step.icon} className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground mb-1.5">{step.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── TECH STACK ── */}
      <TechStackSection data={loaderData?.data?.data?.stacks_fields} sectionTitle={loaderData?.data?.data?.ai_stack_section_heading} />

      {/* ── WHY CHOOSE US ── */}
      <section className="relative py-14 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}>
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(ellipse 70% 60% at 15% 50%, rgba(95,194,227,0.05) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(ellipse 60% 50% at 85% 50%, rgba(37,99,235,0.05) 0%, transparent 65%)" }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">

          {/* ── Section header ── */}
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.why_choose_ai_ml_section?.main_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
          </RevealOnScroll>

          {/* ── KPI stats strip ── */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            {loaderData?.data?.data?.why_choose_ai_ml_section?.small_box?.length > 0 && loaderData.data.data.why_choose_ai_ml_section.small_box.map((s, i) => (
              <div key={i} className="relative rounded-2xl p-5 text-center overflow-hidden"
                style={{ background: "rgba(10,18,35,0.9)", border: "1px solid rgba(95,194,227,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, transparent)" }} />
                <div className="text-2xl lg:text-3xl font-black font-mono bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent mb-1">{s.numbers}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{s.text}</div>
              </div>
            ))}
          </div>

          {/* ── Benefit cards 2×2 ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {loaderData?.data?.data?.why_choose_ai_ml_section?.big_box?.length > 0 && loaderData.data.data.why_choose_ai_ml_section.big_box.map((item, i) => {
              const cardColors = ["#5FC2E3", "#4EAAFF", "#38BDF8", "#0EA5E9"];
              const color = cardColors[i];
              return (
                <div key={i} className="group relative flex flex-col rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1.5 overflow-hidden"
                  style={{ background: "rgba(10,18,35,0.88)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${color}0A 0%, transparent 65%)` }} />

                  {/* Ghost number */}
                  <div className="absolute top-3 right-4 text-6xl font-black font-mono select-none pointer-events-none leading-none"
                    style={{ WebkitTextStroke: `1px ${color}20`, color: "transparent" }}>0{i + 1}</div>

                  {/* Icon */}
                  <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: `${color}14`, border: `1px solid ${color}30` }}>
                    <DynamicIcon name={item.icon} className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-sm font-bold text-foreground mb-2 group-hover:text-white transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>

                  {/* Divider */}
                  <div className="relative z-10 h-px w-full mb-3" style={{ background: `linear-gradient(90deg, ${color}50, transparent)` }} />

                  {/* Description */}
                  <p className="relative z-10 text-muted-foreground text-sm leading-relaxed flex-1">{item.description}</p>

                  {/* Bottom label */}
                  <div className="relative z-10 mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest" style={{ color: `${color}80` }}>
                        {item.bottom_text}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── INLINE CTA ── */}
      <InlineCTA
        title={loaderData?.data?.data?.why_choose_ai_ml_section?.cta_highlighted_text}
        subtitle={loaderData?.data?.data?.why_choose_ai_ml_section?.cta_bottom_text}
        btnText={loaderData?.data?.data?.why_choose_ai_ml_section?.cta_text}
        btnUrl={loaderData?.data?.data?.why_choose_ai_ml_section?.cta_url}
      />

      {/* ── CASE STUDIES ── */}
      {/* <section className="py-14 lg:py-20" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Case Studies in <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">AI & ML Implementation</span>
              </h2>
              
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                industry: "Banking & Finance",
                title: "AI-Driven Compliance Automation",
                quote: "Automating 65% of compliance checks with zero false positives",
                description: "A leading financial services firm transformed its operations with AI-powered automation that dramatically reduced manual risk reviews and improved regulatory accuracy.",
                results: [{ value: "65%", label: "Efficiency Gain" }, { value: "$2.4M", label: "Annual Savings" }, { value: "3x", label: "Faster Audits" }],
                gradient: "from-blue-500/10 to-cyan-500/5",
              },
              {
                industry: "Healthcare",
                title: "Predictive Diagnostics Platform",
                quote: "Real-time analytics enabling faster and more accurate care delivery",
                description: "Unified data platform with embedded ML models improved diagnostic speed and accuracy across a network of 40+ care facilities.",
                results: [{ value: "45%", label: "Faster Diagnosis" }, { value: "98%", label: "Model Accuracy" }, { value: "40+", label: "Facilities" }],
                gradient: "from-teal-500/10 to-cyan-500/5",
              },
              {
                industry: "Retail & eCommerce",
                title: "Personalized Recommendation Engine",
                quote: "AI-powered personalization recovering lost revenue at scale",
                description: "End-to-end ML recommendation system boosted conversions and recovered abandoned carts through real-time behavioral predictions.",
                results: [{ value: "28%", label: "Revenue Growth" }, { value: "40%", label: "Cart Recovery" }, { value: "2.1x", label: "CTR Uplift" }],
                gradient: "from-indigo-500/10 to-blue-500/5",
              },
              {
                industry: "Manufacturing",
                title: "IoT Predictive Maintenance",
                quote: "Eliminating unplanned downtime with intelligent sensor analytics",
                description: "IoT-integrated ML models predicted equipment failure 72 hours in advance, slashing downtime and unlocking significant operational efficiency.",
                results: [{ value: "50%", label: "Less Downtime" }, { value: "3x", label: "ROI" }, { value: "72h", label: "Advance Warning" }],
                gradient: "from-cyan-500/10 to-sky-500/5",
              },
            ].map((cs, i) => (
              <div key={i} className="group relative p-6 lg:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden" style={{ background: "rgba(8,14,30,0.95)", border: "1px solid rgba(95,194,227,0.12)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(95,194,227,0.08) 0%, transparent 65%)" }} />
                <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(95,194,227,0.35), transparent)" }} />
                <div className="relative z-10">
                  <span className="inline-block text-xs font-semibold text-accent uppercase tracking-wider border border-accent/25 rounded-full px-3 py-0.5 mb-4" style={{ background: "rgba(95,194,227,0.07)" }}>{cs.industry}</span>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{cs.title}</h3>
                  <p className="text-accent/70 text-sm font-medium italic mb-3">"{cs.quote}"</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{cs.description}</p>
                  <div className="flex gap-6 mb-6 pt-4 border-t border-border/20">
                    {cs.results.map((r, j) => (
                      <div key={j} className="flex flex-col">
                        <span className="text-2xl font-bold font-mono bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">{r.value}</span>
                        <span className="text-muted-foreground text-xs mt-0.5">{r.label}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-foreground transition-colors duration-300 group/link">
                    View Full Case Study
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── SECURITY & COMPLIANCE ── */}
      <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.security_and_compliance_section?.section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-6">
            { loaderData?.data?.data?.security_and_compliance_section?.box_fields?.length && loaderData.data.data.security_and_compliance_section.box_fields.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl" style={cardStyle}>
                <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4">
                  <DynamicIcon name={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{item.heading}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.key_benefits_section?.section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          {(() => {
            const benefits = loaderData?.data?.data?.key_benefits_section?.key_box_fields?.map((t: any) => ({
              icon: t.icon,
              title: t.title,
              desc: t.description,
              color: "#5FC2E3"
            })) || [];

            const renderCard = (item: typeof benefits[0], i: number) => {
              return (
                <div key={i} className="group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: "rgba(10,18,35,0.8)",
                    border: "1px solid rgba(95,194,227,0.1)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${item.color}40`;
                    e.currentTarget.style.boxShadow = `0 8px 40px ${item.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(95,194,227,0.1)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                  }}
                >
                  <div className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}>
                    <DynamicIcon name={item.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center bottom, ${item.color}08, transparent 70%)` }} />
                </div>
              );
            };

            return (
              <>
                {/* Top row: 3 cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                  {benefits.slice(0, 3).map((item, i) => renderCard(item, i))}
                </div>
                {/* Bottom row: 2 cards centered */}
                <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                  {benefits.slice(3).map((item, i) => renderCard(item, i + 3))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.testimonial_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-6">
            {loaderData?.data?.data?.testimonials?.length && loaderData.data.data.testimonials.map((t, i) => (
              <div key={i} className="group relative p-7 rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-1 overflow-hidden" style={{ background: "rgba(8,14,30,0.95)", border: "1px solid rgba(95,194,227,0.12)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(95,194,227,0.07) 0%, transparent 65%)" }} />
                <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(95,194,227,0.35), transparent)" }} />
                <div className="relative z-10 flex flex-col h-full">
                  {/* Quote mark */}
                  <div className="text-5xl font-serif leading-none mb-4 bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent select-none">"</div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6" dangerouslySetInnerHTML={{__html: t.post_content}}></p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.25), rgba(0,119,182,0.15))", border: "1px solid rgba(95,194,227,0.3)" }}>
                      {t.post_title.charAt(0)}
                    </div>
                    <div>
                      <div className="text-foreground text-sm font-semibold">{t.post_title}</div>
                      <div className="text-muted-foreground text-xs">{t?.acf?.designation}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{__html: addClassToSpan(loaderData?.data?.data?.faq_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
            </div>
          </RevealOnScroll>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={cardStyle}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-foreground font-medium text-sm sm:text-base">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-accent flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  // <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: faq.a}} />
                  <div dangerouslySetInnerHTML={{__html: faq.a}} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{__html: addClassToSpan(loaderData?.data?.data?.services_get_started_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}} />
              <p className="text-muted-foreground text-lg mb-8">
                {loaderData?.data?.data?.services_get_started_section?.paragraph}
              </p>
              {loaderData?.data?.data?.services_get_started_section?.buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={loaderData.data.data.services_get_started_section.buttons[0]?.cta_url}>
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                    {loaderData.data.data.services_get_started_section.buttons[0]?.cta_text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to={loaderData.data.data.services_get_started_section.buttons[1]?.cta_url}>
                  <Button size="lg" variant="outline" className="group font-medium px-8 py-6 rounded-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                    {loaderData.data.data.services_get_started_section.buttons[1]?.cta_text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
                )}
            </div>
            <ContactUsForm contactFormFields={contactFormFields} onSubmit={handleFormSubmit} />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <InlineCTA
        title={loaderData?.data?.data?.advanced_capabilities_section?.cta_main_text}
        subtitle={loaderData?.data?.data?.advanced_capabilities_section?.cta_bottom_text}
        btnText={loaderData?.data?.data?.advanced_capabilities_section?.cta_text}
        btnUrl={loaderData?.data?.data?.advanced_capabilities_section?.cta_url}
      />
    </>
  );
};

export default AIMLSolutions;
