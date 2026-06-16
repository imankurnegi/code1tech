import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, XCircle, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import eaasManagedImg from "@/assets/eaas-managed.jpg";

/* ── Animated network canvas ── */
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
  const match = value.match(/^(\d+)([^\d]*)$/);
  const numericPart = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const isAnimatable = !!match;
  const [displayNum, setDisplayNum] = useState(0);
  const hasStarted = useRef(false);
  useEffect(() => {
    if (!isAnimatable || !isVisible || hasStarted.current) return;
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
  }, [isVisible, delay, numericPart, isAnimatable]);
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">
        {isAnimatable ? <>{displayNum}{suffix}</> : value}
      </div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
};

/* ── Reusable CTA Banner ── */
const CtaBanner = ({ heading, content, ctaText, ctaUrl }: { heading: string; content?: string; ctaText: string; ctaUrl: string }) => (

      <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7" style={{ background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)", border: "1px solid rgba(148,163,184,0.15)", boxShadow: "0 4px 32px rgba(0,0,0,0.6)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", transform: "rotate(-30deg) scale(1.4)", filter: "blur(24px)" }} />
          <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
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
);

/* ══════════════════════════════════════════════════════════════ */

const ManagedServices = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["managed-services"],
    queryFn: async () => await api.getManagedServices(),
  });

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  /* ── Derived data (all null-safe) ── */
  const stats             = pageData?.stats_section?.stats_fields ?? [];
  const banner            = pageData?.banner_section ?? {};
  const introSection      = pageData?.managed_it_services_for_your_business_growth ?? {};
  const introBlocks       = Array.isArray(introSection.right_blocks) ? introSection.right_blocks : [];
  const whyNeedSection    = pageData?.engineer_first_approach_on_demand_engineers ?? {};
  const whyNeedBlocks     = Array.isArray(whyNeedSection.blocks) ? whyNeedSection.blocks : [];
  const compareSection    = pageData?.traditional_it_vs_managed_it ?? {};
  const compareCards      = Array.isArray(compareSection.cards) ? compareSection.cards : [];
  const coreSection       = pageData?.our_core_managed_it_services ?? {};
  const coreCards         = Array.isArray(coreSection.cards) ? coreSection.cards : [];
  const processSection    = pageData?.simple_3_step_process_to_hire_managed_it_services ?? {};
  const processCards      = Array.isArray(processSection.cards) ? processSection.cards : [];
  const whyChooseSection  = pageData?.why_smbs_enterprises_choose_us ?? {};
  const whyChooseCards    = Array.isArray(whyChooseSection.cards) ? whyChooseSection.cards : [];
  const industriesSection = pageData?.industries_we_support ?? {};
  const industryCards     = Array.isArray(industriesSection.cards) ? industriesSection.cards : [];
  const plansSection      = pageData?.choose_a_managed_it_service_plan_that_works_for_you ?? {};
  const planCards         = Array.isArray(plansSection.cards) ? plansSection.cards : [];
  const ctaSection        = pageData?.on_demand_cta ?? {};
  const takeItOff         = pageData?.ready_to_take_it_off_your_plate ?? {};
  const getStarted        = pageData?.get_started_today ?? {};
  const getStartedLists   = Array.isArray(getStarted.lists) ? getStarted.lists : [];
  const growthSection     = pageData?.your_growth_deserves_better_it ?? {};
  const growthCards       = Array.isArray(growthSection.cards) ? growthSection.cards : [];
  const contactSection    = pageData?.services_get_started_section ?? {};
  const contactLists      = Array.isArray(contactSection.lists) ? contactSection.lists : [];

  const faqs = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? item.question ?? item.q ?? "",
        a: item.post_content ?? item.answer ?? item.a ?? "",
      }))
    : [];

  /* ── Split compareCards into traditional (first half) and managed (second half) ── */
  const midPoint         = Math.ceil(compareCards.length / 2);
  //const traditionalCards = compareCards.slice(0, midPoint);
  const managedCards     = compareCards.slice(midPoint);

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
            <div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(95, 194, 227, 0.08)" }}>
                  {banner.banner_image ? (
                    <img
                      src={banner.banner_image?.url ?? banner.banner_image}
                      alt={banner.banner_image?.alt || "Managed IT Services"}
                      className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-[2s] hover:scale-105"
                      style={{ filter: "brightness(0.9) contrast(1.05)" }}
                      loading="eager"
                    />
                  ) : (
                    <img
                      src={eaasManagedImg}
                      alt="Managed IT Services — proactive monitoring and support"
                      className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-[2s] hover:scale-105"
                      style={{ filter: "brightness(0.9) contrast(1.05)" }}
                      loading="eager"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                </div>
                <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />

                {/* Floating badges */}
                {Array.isArray(banner.floating_badge_fields) && banner.floating_badge_fields.length > 0 ? (
                  <>
                    <div className="absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block" style={{ background: "rgba(10, 15, 30, 0.85)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", animation: "float 6s ease-in-out infinite" }}>
                      <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{banner.floating_badge_fields[1]?.badge_heading}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: banner.floating_badge_fields[1]?.badge_text ?? "" }} />
                    </div>
                    <div className="absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block" style={{ background: "rgba(10, 15, 30, 0.85)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", animation: "float 5s ease-in-out infinite" }}>
                      <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{banner.floating_badge_fields[0]?.badge_heading}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: banner.floating_badge_fields[0]?.badge_text ?? "" }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block" style={{ background: "rgba(10, 15, 30, 0.85)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", animation: "float 6s ease-in-out infinite" }}>
                      <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">24/7</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Monitoring</div>
                    </div>
                    <div className="absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block" style={{ background: "rgba(10, 15, 30, 0.85)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", animation: "float 5s ease-in-out infinite" }}>
                      <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">99.9%</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Uptime SLA</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right — Text */}
            <div>
              {banner.back_service_button && (
                <Link to={banner.back_service_button} className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                  ← Engineer as a Service
                </Link>
              )}
              {banner.banner_heading ? (
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(banner.banner_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              ) : (
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left">
                  Managed IT Services to Scale Your Business with{" "}
                  <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Reduced Risks</span>
                </h1>
              )}
              {banner.banner_description ? (
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: banner.banner_description }} />
              ) : (
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left">
                  <p className="text-foreground/90 font-medium">Stop Fighting IT Hiring Struggles. Let's Build a More Resilient, Secure, and Scalable Business.</p>
                  <p>Running a business means relying on technology for everything from operations and communication to customer experience, revenue generation, and security. When your technology fails, growth slows, productivity suffers, and scaling opportunities are lost.</p>
                  <p className="text-foreground/90 font-medium">Code1 Tech Systems can help you deal with all your struggles!</p>
                </div>
              )}
              {banner.highlighted_text && (
                <p className="text-sm font-semibold text-accent mb-6 text-left" style={{ animation: "pulse 3s ease-in-out infinite" }}>{banner.highlighted_text}</p>
              )}
              <Link to={banner.cta_url || "/contact"}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {banner.cta_text || "Get a Free IT Assessment Today"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          {stats.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl backdrop-blur-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(95,194,227,0.04) 50%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(95, 194, 227, 0.15)", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05)" }}>
              {stats.map((s: any, i: number) => (
                <AnimatedStat key={i} value={s.stats_numbers} label={s.stats_title} delay={100 + i * 150} isVisible={true} />
              ))}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl backdrop-blur-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(95,194,227,0.04) 50%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(95, 194, 227, 0.15)", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05)" }}>
              <AnimatedStat value="24/7" label="Proactive Monitoring" delay={100} isVisible={true} />
              <AnimatedStat value="99.9%" label="Uptime SLA" delay={250} isVisible={true} />
              <AnimatedStat value="5+" label="Core Services" delay={400} isVisible={true} />
              <AnimatedStat value="100%" label="Managed Coverage" delay={550} isVisible={true} />
            </div>
          )}
        </div>

        <style>{`
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        `}</style>
      </section>

      {/* ====== INTRO / BUSINESS GROWTH ====== */}
      {(introSection.heading || introSection.left_content || introBlocks.length > 0) && (
        <section id="intro" className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {introSection.heading && (
              <div className="text-center mx-auto mb-10">
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(introSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              </div>
            )}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch max-w-6xl mx-auto">
              {introSection.left_content && (
                <div className="order-1 flex flex-col justify-center">
                  <div className="text-muted-foreground leading-relaxed text-left text-base space-y-4" dangerouslySetInnerHTML={{ __html: introSection.left_content }} />
                </div>
              )}
              {introBlocks.length > 0 && (
                <div className="relative order-2 flex">
                  <div className="relative w-full rounded-2xl p-6 border border-border/40 bg-gradient-to-br from-[#0b1a2e]/80 to-[#0a1422]/80 backdrop-blur-sm flex flex-col" style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 78, 158, 0.1)" }}>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      {introBlocks.map((block: any, i: number) => (
                        <div key={i} className="flex flex-col items-start justify-between gap-3 p-5 rounded-xl border border-border/30 min-h-[120px]" style={{ background: i % 2 === 0 ? "linear-gradient(135deg, rgba(95,194,227,0.12), rgba(95,194,227,0.03))" : "linear-gradient(135deg, rgba(0,119,182,0.12), rgba(0,119,182,0.03))" }}>
                          <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-background/40 border border-accent/20">
                            <DynamicIcon name={block.icon} className="w-5 h-5 text-[#5FC2E3]" />
                          </div>
                          <span className="text-foreground/90 text-sm font-medium leading-tight">{block.text}</span>
                        </div>
                      ))}
                    </div>
                    {(introSection.right_bottom_percentage || introSection.right_bottom_text) && (
                      <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-lg border border-accent/20 bg-background/30">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{introSection.right_bottom_text}</span>
                        <span className="text-base font-mono font-semibold text-[#5FC2E3]">{introSection.right_bottom_percentage}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ====== WHY NEED MANAGED IT ====== */}
      {(whyNeedSection.heading || whyNeedBlocks.length > 0) && (
        <section id="whyneed" className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {whyNeedSection.heading && (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(whyNeedSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {whyNeedSection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">{whyNeedSection.paragraph}</p>
              )}
            </div>
            {whyNeedBlocks.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyNeedBlocks.map((b: any, i: number) => (
                  <Card key={i} className="bg-card/40 border-border/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <DynamicIcon name={b.icon} className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-base font-bold text-foreground leading-tight">{b.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm text-left leading-relaxed">{b.paragraph}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== TRADITIONAL VS MANAGED ====== */}
      {(compareSection.heading || compareCards.length > 0) && (
        <section id="compare" className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {compareSection.heading && (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(compareSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {compareSection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">{compareSection.paragraph}</p>
              )}
            </div>
            <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {compareCards.map((c: any, i: number) => (
                <div className="p-6 rounded-xl border border-destructive/20 bg-destructive/5">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-destructive/15 flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
                  </div>
                  <div className="space-y-4" dangerouslySetInnerHTML={{
    __html: c.content || c.description || "",
  }}>
                  </div>
                </div>
            ))}
            </div>
          </div>
        </section>
      )}

      {/* ====== CORE SERVICES ====== */}
      {(coreSection.heading || coreCards.length > 0) && (
        <section id="core" className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {coreSection.heading && (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(coreSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {coreSection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">{coreSection.paragraph}</p>
              )}
            </div>
            {coreCards.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {coreCards.map((s: any, i: number) => (
                  <Card key={i} className={`bg-card/40 border-border/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 ${i === coreCards.length - 1 && coreCards.length % 2 === 1 ? "lg:col-span-2" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <DynamicIcon name={s.icon} className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground" dangerouslySetInnerHTML={{ __html: s.title ?? s.title ?? "" }}></h3>
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: s.content ?? s.description ?? "" }} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== PROCESS ====== */}
      {(processSection.heading || processCards.length > 0) && (
        <section id="process" className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {processSection.heading && (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(processSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
            </div>
            {processCards.length > 0 && (
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-6xl mx-auto">
                {processCards.map((item: any, i: number) => (
                  <div key={i} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-b from-[#5FC2E3]/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative flex flex-col items-center bg-[hsl(222,47%,7%)] border border-white/10 rounded-2xl p-8 h-full transition-transform duration-300 group-hover:-translate-y-2">
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#5FC2E3]/10 to-[#0077B6]/10 border border-[#5FC2E3]/20 mb-6">
                        <DynamicIcon name={item.icon} className="w-8 h-8 text-[#5FC2E3]" />
                      </div>
                      <div className="font-mono text-[10px] tracking-widest text-[#5FC2E3]/60 uppercase mb-2">{item.label}</div>
                      <h3 className="text-xl font-bold mb-3 text-foreground text-center" dangerouslySetInnerHTML={{ __html: item.title ?? item.title ?? "" }}></h3>
                      <p className="text-muted-foreground text-center text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content ?? item.paragraph ?? "" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== WHY CHOOSE US ====== */}
      {(whyChooseSection.heading || whyChooseCards.length > 0) && (
        <section id="whychoose" className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto mb-10">
              <div className="flex items-end justify-between flex-wrap gap-4 border-b border-border/30 pb-5">
                {whyChooseSection.heading && (
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground"
                    dangerouslySetInnerHTML={{ __html: addClassToSpan(whyChooseSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                  />
                )}
                {whyChooseSection.tag && (
                  <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5FC2E3] animate-pulse" />
                    {whyChooseSection.tag}
                  </div>
                )}
              </div>
            </div>
            {whyChooseCards.length > 0 && (
              <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-4">
                {whyChooseCards.map((b: any, i: number) => {
                  const featured = i === 0;
                  return (
                    <article
                      key={i}
                      className={`group relative overflow-hidden rounded-2xl border border-border/30 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-[#5FC2E3]/50 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-15px_rgba(95,194,227,0.4)] opacity-100 translate-y-0 ${featured ? "lg:col-span-12" : "lg:col-span-6"}`}
                    >
                      <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#5FC2E3]/40" />
                      <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-[#5FC2E3]/40" />
                      <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-[#5FC2E3]/40" />
                      <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-[#5FC2E3]/40" />
                      <div className="relative p-6 sm:p-7 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#5FC2E3]/20 to-[#0077B6]/15 border border-[#5FC2E3]/30 flex-shrink-0">
                            <DynamicIcon name={b.icon} className="w-6 h-6 text-[#5FC2E3]" />
                          </div>
                          <h3 className={`font-bold text-foreground leading-tight ${featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>{b.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm text-left leading-relaxed" dangerouslySetInnerHTML={{ __html: b.content ?? b.paragraph ?? "" }} />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== INDUSTRIES ====== */}
      {(industriesSection.heading || industryCards.length > 0) && (
        <section id="industries" className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {industriesSection.heading && (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
              {industriesSection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground">{industriesSection.paragraph}</p>
              )}
            </div>
            {industryCards.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                {industryCards.map((it: any, i: number) => (
                  <div key={i} className="p-5 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <DynamicIcon name={it.icon} className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1" dangerouslySetInnerHTML={{ __html: it.title }} />
                    <p className="text-muted-foreground text-xs leading-snug">{it.content ?? it.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== PLANS ====== */}
      {(plansSection.heading || planCards.length > 0) && (
        <section id="plans" className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {plansSection.heading && (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(plansSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              )}
            </div>
            {planCards.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {planCards.map((p: any, i: number) => (
                  <Card key={i} className={`bg-card/40 border-border/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 ${i === 1 ? "lg:scale-105 border-accent/40" : ""}`}>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <DynamicIcon name={p.icon} className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{p.title}</h3>
                      {p.tag && <span className="inline-block text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full mb-3">{p.tag}</span>}
                      <p className="text-muted-foreground text-sm text-left leading-relaxed" dangerouslySetInnerHTML={{ __html: p.content ?? p.description ?? "" }} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {ctaSection.heading && (
              <div className="mt-10">
                <CtaBanner
                  heading={ctaSection.heading}
                  content={ctaSection.content}
                  ctaText={ctaSection.cta_text}
                  ctaUrl={ctaSection.cta_url ?? "/contact"}
                />
              </div>
            )}
          </div>
        </section>
      )}

  {/* ====== READY TO TAKE IT OFF YOUR PLATE ====== */}
{(takeItOff.heading || getStarted.heading || growthSection.heading) && (
  <section id="take-it-off" className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.10) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,119,182,0.10) 0%, transparent 70%)", filter: "blur(40px)" }} />
    </div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-0 items-stretch">

          {/* Left — manifesto */}
          <div className="relative rounded-2xl lg:rounded-r-none p-8 sm:p-10 lg:p-12 overflow-hidden flex flex-col justify-between" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.06) 0%, rgba(10,15,30,0.85) 45%, rgba(0,119,182,0.08) 100%)", border: "1px solid rgba(95,194,227,0.18)", borderRight: "1px dashed rgba(95,194,227,0.25)" }}>
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, #5FC2E3 0px, #5FC2E3 1px, transparent 1px, transparent 14px)" }} />
            <div className="relative z-10">
              {takeItOff.heading ? (
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.05] mb-6 text-left"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(takeItOff.heading.replace(/&amp;/g, "&"), "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              ) : (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.05] mb-6 text-left">
                  Ready to Take IT<br /><span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Off Your Plate?</span>
                </h2>
              )}
              {takeItOff.sub_heading && (
                <div className="relative pl-5 mb-5 text-left">
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ background: "linear-gradient(180deg, #5FC2E3, #0077B6)" }} />
                  <p className="text-foreground/95 font-semibold text-base sm:text-lg leading-snug">{takeItOff.sub_heading}</p>
                </div>
              )}
              {takeItOff.content && (
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-left max-w-md">{takeItOff.content}</p>
              )}
            </div>

            {/* FIX: API returns { label: "Free" } not { text: "Free" } */}
            {Array.isArray(takeItOff.bottom_label) && takeItOff.bottom_label.length > 0 && (
              <div className="relative z-10 mt-8 pt-6 flex items-center gap-6 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70" style={{ borderTop: "1px dashed rgba(148,163,184,0.18)" }}>
                {takeItOff.bottom_label.map((item: any, i: number) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {item.label ?? item.text ?? item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right — get started */}
          <div className="relative rounded-2xl lg:rounded-l-none p-8 sm:p-10 lg:p-12 overflow-hidden flex flex-col" style={{ background: "linear-gradient(160deg, #0E1525 0%, #0B1220 55%, #12102A 100%)", border: "1px solid rgba(148,163,184,0.18)" }}>
            <div className="hidden lg:flex absolute -left-2 top-0 bottom-0 flex-col items-center justify-around py-6 pointer-events-none">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="w-3 h-3 rounded-full" style={{ background: "hsl(222 47% 6%)" }} />
              ))}
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between gap-4 mb-7">
                <div className="text-left">
                  {getStarted.top_label && (
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70 mb-2">{getStarted.top_label}</p>
                  )}
                  {getStarted.heading ? (
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-foreground leading-tight"
                      dangerouslySetInnerHTML={{ __html: addClassToSpan(getStarted.heading.replace(/&amp;/g, "&"), "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                    />
                  ) : (
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                      Get Started <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Today</span>
                    </h3>
                  )}
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
              </div>

              {getStartedLists.length > 0 && (
                <ul className="relative space-y-4 mb-8 pl-1">
                  {getStartedLists.map((item: any, idx: number) => (
                    <li key={idx} className="relative flex items-start gap-4 group">
                      {idx < getStartedLists.length - 1 && (
                        <span className="absolute left-[14px] top-8 bottom-[-1rem] w-px" style={{ background: "linear-gradient(180deg, rgba(95,194,227,0.4), rgba(95,194,227,0.05))" }} />
                      )}
                      <div className="relative w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-accent" />
                      </div>
                      {/* FIX: API returns { list: "..." } — already correct, keeping all fallbacks */}
                      <span className="text-foreground/90 text-sm sm:text-base text-left leading-snug pt-1">
                        {item.list ?? item.text ?? item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-6" style={{ borderTop: "1px dashed rgba(148,163,184,0.18)" }}>
                <Link to={getStarted.button_url ?? "/contact"} className="block">
                  <Button variant="hero" size="lg" className="group w-full text-sm sm:text-base">
                    {getStarted.button_text || "Book Your Free Consultation Now"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Growth banner — API returns empty strings/null so this won't render */}
        {(growthSection.heading || growthCards.length > 0) && (
          <div className="mt-8 relative rounded-2xl p-8 sm:p-10 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,119,182,0.10) 0%, rgba(10,15,30,0.85) 50%, rgba(95,194,227,0.08) 100%)", border: "1px solid rgba(95,194,227,0.18)" }}>
            <div className="relative z-10">
              <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
                <div className="text-left">
                  {growthSection.heading && (
                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4"
                      dangerouslySetInnerHTML={{ __html: addClassToSpan(growthSection.heading.replace(/&amp;/g, "&"), "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                    />
                  )}
                  {growthSection.content && (
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: growthSection.content }} />
                  )}
                </div>
                {growthCards.length > 0 && (
                  <div className="grid sm:grid-cols-3 gap-4">
                    {growthCards.map((gc: any, i: number) => (
                      <div key={i} className="relative p-5 rounded-xl text-left group hover:-translate-y-0.5 transition-transform" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.02), rgba(255,255,255,0))", border: "1px solid rgba(95,194,227,0.18)" }}>
                        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center mb-3">
                          <DynamicIcon name={gc.icon} className="w-5 h-5 text-accent" />
                        </div>
                        <p className="text-foreground/90 text-sm font-medium leading-snug">{gc.title ?? gc.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {growthSection.bottom_text && (
                <div className="mt-8 pt-6 flex items-start gap-3" style={{ borderTop: "1px dashed rgba(148,163,184,0.18)" }}>
                  <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #5FC2E3, #0077B6)", boxShadow: "0 0 12px rgba(95,194,227,0.6)" }} />
                  <p className="text-foreground/95 font-semibold text-base sm:text-lg text-left">{growthSection.bottom_text}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
)}

      {/* ====== FAQs ====== */}
      {faqs.length > 0 && (
        <section id="faq" className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.faq_section_heading || "Frequently Asked <span>Questions</span>", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
              />
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-border/30 rounded-lg bg-card/30 backdrop-blur-sm px-4">
                    <AccordionTrigger className="text-left text-foreground font-semibold text-sm sm:text-base hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed text-left">{f.a}</AccordionContent>
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
              {contactSection.heading ? (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 text-left"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              ) : (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 text-left">
                  Modernize and Simplify Your{" "}
                  <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">IT Operations</span>
                </h2>
              )}
              {contactSection.paragraph ? (
                <div className="
                text-muted-foreground mb-6 text-left space-y-4
                [&_ul]:!list-disc
                [&_ul]:!list-outside
                [&_ul]:!pl-5
                [&_ol]:!list-decimal
                [&_ol]:!list-outside
                [&_ol]:!pl-5
                [&_li]:!my-1
                [&_li]:!leading-relaxed
                [&_li::marker]:!text-muted-foreground
              " dangerouslySetInnerHTML={{ __html: contactSection.paragraph }} />
              ) : (
                <p className="text-muted-foreground mb-6 text-left">
                  Our managed IT services allow customers to mitigate operational burden, improve security, and maintain reliable technology functionality throughout their entire environment.
                </p>
              )}
              {contactLists.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {contactLists.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{item.list ?? item.text ?? item}</span>
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

export default ManagedServices;
