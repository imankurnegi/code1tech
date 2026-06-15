import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, ArrowRight } from "lucide-react";
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
          <Button size="lg" className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-xl hover:scale-105 transform h-14 rounded-xl px-10 group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
            <span dangerouslySetInnerHTML={{ __html: ctaText }} />
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */

const TechTeamBuilding = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["tech-team-building"],
    queryFn: async () => await api.getTechTeamEngineers(),
  });

  // No-op ref — sections are always visible via CSS animations
  const setSectionRef = (_id: string) => (_el: HTMLElement | null) => {};

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  /* ── Derived data arrays ── */
  const stats = pageData?.stats_section?.stats_fields ?? [];

  const faqs = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? item.question ?? item.q ?? "",
        a: item.post_content ?? item.answer ?? item.a ?? "",
      }))
    : [];

  const scaleSection = pageData?.scale_your_team_with_the_right_talent ?? {};
  const whySection = pageData?.why_businesses_choose_tech_team_building_services ?? {};
  const cta1 = pageData?.data_engineers_security_brief_cta ?? {};
  const buildSection = pageData?.we_build_teams_around_your_needs ?? {};
  const approachSection = pageData?.engineer_first_approach_on_demand_engineers ?? {};
  const cta2 = pageData?.on_demand_cta ?? {};
  const servicesSection = pageData?.services_included_in_our_tech_team_building_solutions ?? {};
  const industriesSection = pageData?.industries_we_support ?? {};
  const benefitsSection = pageData?.benefits_of_partnering_with_code1_tech ?? {};
  const getStarted = pageData?.services_get_started_section ?? {};

  const buildCards = buildSection.cards ?? [];
  const approachBlocks = approachSection.blocks ?? [];
  const serviceCards = servicesSection.cards ?? [];
  const industryCards = industriesSection.cards ?? [];
  const benefitCards = benefitsSection.cards ?? [];

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

            {/* Left — Image (CSS entrance, not IntersectionObserver) */}
            <div style={{ animation: "heroSlideInLeft 0.6s ease-out both" }}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(95, 194, 227, 0.08)" }}>
                  {/* banner_image is empty string in this API — show placeholder gradient */}
                  {pageData?.banner_section?.banner_image ? (
                    <img
                      src={pageData.banner_section.banner_image?.url ?? pageData.banner_section.banner_image}
                      alt={pageData.banner_section.banner_image?.alt || "Tech team building"}
                      className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-[2s] hover:scale-105"
                      style={{ filter: "brightness(0.9) contrast(1.05)" }}
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px]" style={{ background: "linear-gradient(135deg, hsl(222 47% 10%) 0%, hsl(222 47% 6%) 100%)" }} />
                  )}
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
              {pageData?.banner_section?.banner_description && (
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left">
                  <p>{pageData.banner_section.banner_description}</p>
                </div>
              )}
              {pageData?.banner_section?.highlighted_text && (
                <p className="text-sm font-semibold text-accent mb-6 text-left" style={{ animation: "pulse 3s ease-in-out infinite" }}>
                  {pageData.banner_section.highlighted_text}
                </p>
              )}
              <Link to={pageData?.banner_section?.cta_url ?? "/contact"}>
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
          @keyframes heroSlideInRight { from { opacity: 0; transform: translateX(48px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
          @keyframes statsBarShimmer {
            0%, 100% { box-shadow: 0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05); }
            50% { box-shadow: 0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 50px rgba(95,194,227,0.1); }
          }
          @media (prefers-reduced-motion: reduce) { @keyframes statsBarShimmer {} }
        `}</style>
      </section>

      {/* ====== SCALE YOUR TEAM ====== */}
      {(scaleSection.heading || scaleSection.paragraph) && (
        <section id="scale" ref={setSectionRef("scale")} className="relative py-16 lg:py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 5%) 100%)" }}>
          <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, rgba(92,200,220,0.35), transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,78,158,0.45), transparent 70%)" }} />
          <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 relative z-10">
            <div className={`max-w-7xl mx-auto transition-all duration-700 opacity-100 translate-y-0`}>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight text-left max-w-4xl"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(scaleSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent whitespace-nowrap") }}
              />
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left — narrative + CTA */}
                <div className="lg:col-span-7 flex flex-col">
                  <div
                    className="flex-1 text-sm sm:text-base text-muted-foreground leading-relaxed text-left space-y-4"
                    dangerouslySetInnerHTML={{ __html: scaleSection.paragraph ?? "" }}
                  />
                  {scaleSection.button_text && (
                    <div className="pt-6">
                      <Link to={scaleSection.button_url ?? "/contact"} className="inline-block">
                        <Button variant="hero" size="lg" className="group rounded-xl px-8 py-6 text-base font-semibold">
                          {scaleSection.button_text}
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                {/* Right — challenges card */}
                <div className="lg:col-span-5">
                  <div className="relative h-full rounded-2xl p-6 sm:p-8 backdrop-blur-sm" style={{ background: "linear-gradient(160deg, rgba(0,78,158,0.18) 0%, rgba(15,23,42,0.70) 100%)", border: "1px solid rgba(92,200,220,0.20)" }}>
                    <div aria-hidden className="absolute -top-px -right-px w-24 h-24 rounded-tr-2xl pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(92,200,220,0.25), transparent 70%)" }} />
                    {scaleSection.right_section_heading && (
                      <p className="text-base text-foreground font-medium mb-4 text-left">{scaleSection.right_section_heading}</p>
                    )}
                    {scaleSection.right_section_sub_heading && (
                      <div className="flex items-center gap-2 mb-5">
                        <span className="text-xs font-mono tracking-wider uppercase text-accent">{scaleSection.right_section_sub_heading}</span>
                        <span className="flex-1 h-px bg-gradient-to-r from-accent/40 to-transparent" />
                      </div>
                    )}
                    {scaleSection.right_section_content && (
                      <ul className="space-y-3.5" dangerouslySetInnerHTML={{ __html: scaleSection.right_section_content }} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====== WHY BUSINESSES CHOOSE ====== */}
      {whySection.heading && (
        <section id="challenges" ref={setSectionRef("challenges")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(whySection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
              />
              {whySection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-3">{whySection.paragraph}</p>
              )}
              {whySection.heading_label && (
                <div className="flex items-center justify-center gap-3 max-w-xl mx-auto">
                  <span className="flex-1 h-px bg-gradient-to-r from-transparent to-accent/40" />
                  <span className="text-xs font-mono tracking-wider uppercase text-accent whitespace-nowrap">{whySection.heading_label}</span>
                  <span className="flex-1 h-px bg-gradient-to-l from-transparent to-accent/40" />
                </div>
              )}
            </div>
            {/* cards is null in API — static fallback challenges grid handled below */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whySection?.cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={c.title}
                  className={`group relative transition-all duration-500 hover:-translate-y-1 opacity-100 translate-y-0`}
                  style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="absolute -inset-px rounded-2xl transition-all duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 100%)" }} />
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.22) 0%, transparent 100%)" }} />
                  <div className="relative h-full p-6 rounded-2xl backdrop-blur-sm" style={{ background: "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}>
                      <DynamicIcon name={Icon} className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">{c.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed text-left">{c.content}</p>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </section>
      )}

      {/* CTA 1 */}
      {cta1.heading && (
        <CtaBanner
          heading={cta1.heading}
          content={cta1.content}
          ctaText={cta1.cta_text}
          ctaUrl={cta1.cta_url ?? "/contact"}
        />
      )}

      {/* ====== WE BUILD TEAMS ====== */}
      {(buildSection.heading || buildCards.length > 0) && (
        <section id="models" ref={setSectionRef("models")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              {buildSection.heading && (
                <h2
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(buildSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {buildSection.paragraph && (
                <div
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto"
                  dangerouslySetInnerHTML={{ __html: buildSection.paragraph }}
                />
              )}
            </div>
            {buildCards.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {buildCards.map((card: any, i: number) => (
                  <div
                    key={i}
                    className={`group relative transition-all duration-500 hover:-translate-y-1 opacity-100 translate-y-0`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.22) 0%, transparent 100%)" }} />
                    <div className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm p-6" style={{ background: "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}>
                          <DynamicIcon name={card.icon} className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{card.title}</h3>
                      </div>
                      <div
                        className="text-sm text-muted-foreground leading-relaxed text-left"
                        dangerouslySetInnerHTML={{ __html: card.description ?? "" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== APPROACH ====== */}
      {(approachSection.heading || approachBlocks.length > 0) && (
        <section id="approach" ref={setSectionRef("approach")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              {approachSection.heading && (
                <h2
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(approachSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {approachSection.paragraph && (
                <div
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto"
                  dangerouslySetInnerHTML={{ __html: approachSection.paragraph }}
                />
              )}
            </div>
            {approachBlocks.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {approachBlocks.map((item: any, i: number) => (
                  <div
                    key={i}
                    className={`group relative transition-all duration-500 hover:-translate-y-1 opacity-100 translate-y-0`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="relative h-full p-6 rounded-2xl backdrop-blur-sm" style={{ background: "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
                          <DynamicIcon name={item.icon} className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors pt-2.5">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed text-left">{item.paragraph}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA 2 */}
      {cta2.heading && (
        <CtaBanner
          heading={cta2.heading}
          content={cta2.content}
          ctaText={cta2.cta_text}
          ctaUrl={cta2.cta_url ?? "/contact"}
        />
      )}

      {/* ====== SERVICES INCLUDED ====== */}
      {(servicesSection.heading || serviceCards.length > 0) && (
        <section id="services" ref={setSectionRef("services")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              {servicesSection.heading && (
                <h2
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(servicesSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {servicesSection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto">{servicesSection.paragraph}</p>
              )}
            </div>
            {serviceCards.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {serviceCards.map((card: any, i: number) => (
                  <div
                    key={i}
                    className={`group relative transition-all duration-500 hover:-translate-y-1 opacity-100 translate-y-0`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.22) 0%, transparent 100%)" }} />
                    <div className="relative h-full p-6 rounded-2xl backdrop-blur-sm flex flex-col" style={{ background: "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
                          <DynamicIcon name={card.icon} className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-tight">{card.title}</h3>
                      </div>
                      <div
                        className="text-sm text-muted-foreground leading-relaxed text-left flex-1"
                        dangerouslySetInnerHTML={{ __html: card.content ?? "" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== INDUSTRIES ====== */}
      {(industriesSection.heading || industryCards.length > 0) && (
        <section id="industries" ref={setSectionRef("industries")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              {industriesSection.heading && (
                <h2
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {industriesSection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">{industriesSection.paragraph}</p>
              )}
            </div>
            {industryCards.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {industryCards.map((card: any, i: number) => (
                  <div
                    key={i}
                    className={`group relative transition-all duration-500 hover:-translate-y-1 opacity-100 translate-y-0`}
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div className="relative h-full p-6 rounded-2xl backdrop-blur-sm" style={{ background: "rgba(15,23,42,0.50)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.08)", border: "1px solid rgba(95,194,227,0.20)" }}>
                          <DynamicIcon name={card.icon} className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors" dangerouslySetInnerHTML={{ __html: card.title }} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed text-left">{card.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== BENEFITS ====== */}
      {(benefitsSection.heading || benefitCards.length > 0) && (
        <section id="benefits" ref={setSectionRef("benefits")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-12 transition-all duration-700 opacity-100 translate-y-0`}>
              {benefitsSection.heading && (
                <h2
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(benefitsSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {benefitsSection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">{benefitsSection.paragraph}</p>
              )}
            </div>
            {benefitCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 auto-rows-fr">
                {benefitCards.map((card: any, i: number) => {
                  const span = i < 3 ? "lg:col-span-2" : "lg:col-span-3";
                  return (
                    <div
                      key={i}
                      className={`group relative h-full ${span} transition-all duration-500 hover:-translate-y-1 opacity-100 translate-y-0`}
                      style={{ transitionDelay: `${i * 90}ms` }}
                    >
                      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.35) 0%, rgba(0,119,182,0.20) 50%, transparent 100%)" }} />
                      <div className="relative h-full p-6 lg:p-7 rounded-2xl backdrop-blur-sm flex flex-col overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.45) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.18) 0%, transparent 70%)" }} />
                        <div className="flex items-center gap-3 mb-4 pr-10">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.15) 0%, rgba(0,119,182,0.10) 100%)", border: "1px solid rgba(95,194,227,0.25)" }}>
                            <DynamicIcon name={card.icon} className="w-5 h-5 text-accent" />
                          </div>
                          <h3 className="text-base lg:text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-tight text-left">{card.title}</h3>
                        </div>
                        <div
                          className="flex-1 text-sm text-muted-foreground leading-relaxed text-left"
                          dangerouslySetInnerHTML={{ __html: card.content ?? "" }}
                        />
                        <div className="mt-5 h-px w-full" style={{ background: "linear-gradient(90deg, rgba(95,194,227,0.30) 0%, transparent 100%)" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {benefitsSection.bottom_cta_text && (
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                <Link to={benefitsSection.bottom_cta_url ?? "/contact"}>
                  <Button variant="hero" size="lg">
                    {benefitsSection.bottom_cta_text}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== FAQs ====== */}
      {faqs.length > 0 && (
        <section id="faqs" ref={setSectionRef("faqs")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className={`text-center mb-10 transition-all duration-700 opacity-100 translate-y-0`}>
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.faq_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
              />
            </div>
            <div className={`transition-all duration-700 opacity-100 translate-y-0`} style={{ transitionDelay: "150ms" }}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border rounded-2xl px-5 backdrop-blur-sm" style={{ background: "rgba(15,23,42,0.50)", borderColor: "rgba(255,255,255,0.06)" }}>
                    <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-accent">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed text-left">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* ====== FINAL CTA + CONTACT FORM ====== */}
      <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 text-left"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(getStarted.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
              />
              {getStarted.paragraph && (
                <div
                  className="text-muted-foreground mb-6 text-left space-y-4"
                  dangerouslySetInnerHTML={{ __html: getStarted.paragraph }}
                />
              )}
            </div>
            <ContactUsForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechTeamBuilding;
