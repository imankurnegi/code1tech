import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SeoTags from "@/components/SeoTags";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";

/* ── Animated network canvas (same as ManagedServices) ── */
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

/* ── Animated Stat Counter (same as ManagedServices) ── */
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

/* ── Reusable CTA Banner (same as ManagedServices) ── */
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

/* ── Shared card styles ── */
const cardBase = "rounded-2xl p-6 hover:border-accent/30 hover:-translate-y-1 transition-transform duration-300";
const cardStyle = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(148,163,184,0.12)",
};

/* ══════════════════════════════════════════════════════════════ */

const DataIngestion = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["data-ingestion"],
    queryFn: async () => await api.getDataIngestion(),
  });

  if (isLoading) return null;
  if (error) return null;

  const pageData = data?.data;

  /* ── Derived data (all null-safe) ── */
  const stats             = pageData?.stats_section?.stats_fields ?? [];
  const banner            = pageData?.banner_section ?? {};
  const solutionsSection  = pageData?.data_integration_solutions_for_your_business_challenges ?? {};
  const solutionCards     = Array.isArray(solutionsSection.cards) ? solutionsSection.cards : [];
  const servicesSection   = pageData?.data_ingestion_data_integration_services_we_offer ?? {};
  const serviceCards      = Array.isArray(servicesSection.cards) ? servicesSection.cards : [];
  const briefCta          = pageData?.data_engineers_security_brief_cta ?? {};
  const capSection        = pageData?.advanced_data_integration_capabilities_for_modern_enterprises ?? {};
  const capCards          = Array.isArray(capSection.cards) ? capSection.cards : [];
  const processSection    = pageData?.from_disconnected_data_to_business_value ?? {};
  const processCards      = Array.isArray(processSection.cards) ? processSection.cards : [];
  const engageSection     = pageData?.our_data_integration_engagement_models ?? {};
  const engageCards       = Array.isArray(engageSection.cards) ? engageSection.cards : [];
  const whySection        = pageData?.why_choose_code1tech_for_data_ingestion_integration ?? {};
  const whyCards          = Array.isArray(whySection.cards) ? whySection.cards : [];
  const industriesSection = pageData?.industries_we_support ?? {};
  const industryCards     = Array.isArray(industriesSection.cards) ? industriesSection.cards : [];
  const techSection       = pageData?.tech_stack_tools ?? {};
  const techCards         = Array.isArray(techSection.cards) ? techSection.cards : [];
  const securityCards     = Array.isArray(techSection.security_cards) ? techSection.security_cards : [];
  const contactSection    = pageData?.services_get_started_section ?? {};
  const contactLists      = Array.isArray(contactSection.lists) ? contactSection.lists : [];
  const contactButton     = Array.isArray(contactSection.buttons) ? contactSection.buttons[0] : null;

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

      {/* ======= HERO ======= */}
      <section
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
                  <img
                    src={banner.banner_image?.url ?? banner.banner_image}
                    alt={banner.banner_image?.alt || "Data ingestion and integration visualization"}
                    className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-[2s] hover:scale-105"
                    style={{ filter: "brightness(0.9) contrast(1.05)" }}
                    loading="eager"
                  />
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
                      <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">500+</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Pipelines Built</div>
                    </div>
                    <div className="absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block" style={{ background: "rgba(10, 15, 30, 0.85)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)", animation: "float 5s ease-in-out infinite" }}>
                      <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">99.9%</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Pipeline Uptime</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right — Text */}
            <div>
              {banner.back_service_button && (
                <Link to={banner.back_service_button} className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                  ← Data Engineering
                </Link>
              )}
              {banner.banner_heading ? (
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(banner.banner_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              ) : (
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left">
                  Data Ingestion & Data Integration Services for{" "}
                  <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Connected Business Intelligence</span>
                </h1>
              )}
              {banner.banner_description ? (
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: banner.banner_description }} />
              ) : null}
              {banner.highlighted_text && (
                <p className="text-sm font-semibold text-accent mb-6 text-left" style={{ animation: "pulse 3s ease-in-out infinite" }}>{banner.highlighted_text}</p>
              )}
              <Link to={banner.cta_url || ""}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {banner.cta_text || "Talk to a Data Integration Expert"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

        <style>{`
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        `}</style>
      </section>

      {/* ======= SOLUTIONS ======= */}
      {(solutionsSection.heading || solutionCards.length > 0) && (
        <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 50%, hsl(222 47% 5%) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              {solutionsSection.heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(solutionsSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              )}
              {solutionsSection.paragraph && (
                <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{solutionsSection.paragraph}</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {solutionCards.map((s: any, i: number) => (
                <div key={i} className={cardBase} style={cardStyle}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}>
                      <DynamicIcon name={s.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: s.title ?? "" }} />
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content ?? "" }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======= SERVICES OFFERED ======= */}
      {(servicesSection.heading || serviceCards.length > 0) && (
        <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              {servicesSection.heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(servicesSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              )}
              {servicesSection.paragraph && (
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">{servicesSection.paragraph}</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {serviceCards.map((s: any, i: number) => {
                const imgSrc = s.image?.url ?? s.image;
                const reverse = i % 2 === 1;
                return (
                  <div key={i} className="group relative overflow-hidden rounded-2xl transition-all duration-700 hover:-translate-y-1 hover:border-accent/40 opacity-100 translate-y-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.85) 0%, rgba(7,11,18,0.92) 100%)", border: "1px solid rgba(95,194,227,0.14)", boxShadow: "0 10px 40px -20px rgba(0,0,0,0.6)" }}>
                    {imgSrc && (
                      <div className="relative h-44 sm:h-48 overflow-hidden">
                        <img src={imgSrc} alt={s.image?.alt || s.title} loading="lazy" width={768} height={512} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                        <div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(rgba(7, 11, 18, 0.15) 0%, rgba(7, 11, 18, 0.55) 60%, rgba(7, 11, 18, 0.95) 100%)",
  }}
></div>

<div
  className="absolute inset-0 opacity-60 mix-blend-overlay"
  style={{
    background:
      "linear-gradient(250deg, transparent 40%, rgba(95, 194, 227, 0.3) 100%)",
  }}
></div>

<div
  className="absolute bottom-0 left-0 right-0 h-16"
  style={{
    background:
      "linear-gradient(transparent 0%, rgba(7, 11, 18, 0.85) 100%)",
  }}
></div>

                      </div>
                    )}
                    <div className="relative p-6 lg:p-7">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}>
                          <DynamicIcon name={s.icon} className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug" dangerouslySetInnerHTML={{ __html: s.title ?? "" }} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.content}</p>
                      <div className="h-px w-full mb-4" style={{ background: "linear-gradient(90deg, transparent, rgba(95,194,227,0.35), transparent)" }} />
                      <ul className="grid grid-cols-1 gap-2" dangerouslySetInnerHTML={{ __html: s.lists ?? "" }} />
                    </div>
                    <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.25) 0%, transparent 60%)", mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", maskComposite: "exclude" as unknown as string, WebkitMaskComposite: "xor", padding: "1px" }} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ======= INLINE CTA ======= */}
      {briefCta.heading && (
        <section className="py-6" style={{ background: "#070B12" }}>
          <div className="container mx-auto px-4 lg:px-8">
            <CtaBanner
              heading={briefCta.heading}
              content={briefCta.content}
              ctaText={briefCta.cta_text || ""}
              ctaUrl={briefCta.cta_url || ""}
            />
          </div>
        </section>
      )}

      {/* ======= ADVANCED CAPABILITIES ======= */}
      {(capSection.heading || capCards.length > 0) && (
        <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              {capSection.heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(capSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              )}
              {capSection.paragraph && (
                <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">{capSection.paragraph}</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {capCards.map((c: any, i: number) => (
                <div key={i} className={cardBase} style={cardStyle}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}>
                      <DynamicIcon name={c.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: c.title ?? "" }} />
                  </div>
                  <div className="text-sm" dangerouslySetInnerHTML={{ __html: c.content ?? "" }} />
                  {(c.link_text || c.link_url) && (
                    <Link to={c.link_url || ""} className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-accent hover:gap-2 transition-all">
                      <span dangerouslySetInnerHTML={{ __html: c.link_text ?? "Learn more" }} />
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======= PROCESS ======= */}
      {(processSection.heading || processCards.length > 0) && (
        <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              {processSection.heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(processSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              )}
              {processSection.paragraph && (
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">{processSection.paragraph}</p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {processCards.map((p: any, i: number) => (
                <div key={i} className="relative p-6 rounded-2xl transition-all duration-500 opacity-100 translate-y-0" style={{
                  background: "rgba(255, 255, 255, 0.024)",
                  border: "1px solid rgba(148, 163, 184, 0.12)",
                  transitionDelay: "0ms",
                }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: " rgba(95, 194, 227, 0.05)", border: "1px solid rgba(95, 194, 227, 0.2)"}}>
                      <DynamicIcon name={p.icon} className="lucide lucide-search w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: p.title ?? "" }} />
                  </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.content}</p>
                    </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======= ENGAGEMENT MODELS ======= */}
      {(engageSection.heading || engageCards.length > 0) && (
        <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              {engageSection.heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(engageSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              )}
              {engageSection.paragraph && (
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">{engageSection.paragraph}</p>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-10">
              {engageCards.map((m: any, i: number) => {
                const imgSrc = m.image?.url ?? m.image;
                const isIconLabel = m.label?.startsWith("lucide-");
                return (
                  <div key={i} className="group relative overflow-hidden rounded-2xl hover:-translate-y-2 transition-transform duration-300" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.6) 0%, rgba(7,11,18,0.95) 100%)", border: "1px solid rgba(95,194,227,0.15)", boxShadow: "0 14px 50px -24px rgba(0,0,0,0.7)" }}>
                    {imgSrc && (
                      <div className="relative h-52 overflow-hidden">
                        <img src={imgSrc} alt={m.image?.alt || m.title} loading="lazy" width={768} height={512} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                        <div className="absolute inset-0" style={{background: "linear-gradient(rgba(7, 11, 18, 0.25) 0%, rgba(7, 11, 18, 0.65) 65%, rgb(7, 11, 18) 100%)"}}></div>
                        {!isIconLabel && m.label && (
                          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md" style={{ background: "rgba(95,194,227,0.12)", border: "1px solid rgba(95,194,227,0.35)", color: "#5FC2E3" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {m.label}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="relative px-6 pb-7 -mt-5">
                      <div className="flex items-center gap-3 mb-3 relative z-10">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)", boxShadow: "0 0 0 6px rgba(7,11,18,0.95)" }}>
                          <DynamicIcon name={m.icon} className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold text-foreground leading-snug">{m.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.content}</p>
                      <div className="mt-5 h-px w-full" style={{ background: "linear-gradient(90deg, rgba(95,194,227,0.45), transparent)" }} />
                      <Link to={m.link_url || ""} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-2 transition-all">
                        {m.link_label || "Discuss this model"} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, #0077B6, transparent)" }} />
                  </div>
                );
              })}
            </div>
            {(engageSection.button_text || engageSection.button_url) && (
              <div className="text-center">
                <Link to={engageSection.button_url || ""}>
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                    {engageSection.button_text || "Hire Data Integration Experts"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ======= WHY CHOOSE ======= */}
      {(whySection.heading || whyCards.length > 0) && (
        <section className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(rgb(9, 15, 27) 0%, rgb(7, 10, 19) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center mb-12 transition-all duration-700 opacity-100 translate-y-0">
                {whySection.heading && (
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(whySection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
                )}
            </div>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              {whyCards.map((w: any, i: number) => {
                const featured = i === 0;
                return (
                    <div className="rounded-2xl p-6 transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 opacity-100 translate-y-0" style={{ background: "rgba(255, 255, 255, 0.024)", border: "1px solid rgba(148, 163, 184, 0.12)"}}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#5FC2E3]/20 to-[#0077B6]/15 border border-[#5FC2E3]/30 flex-shrink-0">
                          <DynamicIcon name={w.icon} className="w-6 h-6 text-[#5FC2E3]" />
                        </div>
                        <h3 className={`font-bold text-foreground leading-tight ${featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`} dangerouslySetInnerHTML={{ __html: w.title ?? "" }} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{w.content}</p>
                    </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ======= INDUSTRIES ======= */}
      {(industriesSection.heading || industryCards.length > 0) && (
        <section className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "background: linear-gradient(rgb(7, 10, 19) 0%, rgb(9, 15, 27) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-12 transition-all duration-700 opacity-100 translate-y-0">
              {industriesSection.heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              )}
              {industriesSection.paragraph && (
                <p className="text-sm sm:text-base text-muted-foreground">{industriesSection.paragraph}</p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {industryCards.map((ind: any, i: number) => (
                <div key={i} className="rounded-2xl p-6 transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 opacity-100 translate-y-0" style={{background: "rgba(255, 255, 255, 0.024)", border: "1px solid rgba(148, 163, 184, 0.12)"}}>
                  <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: "rgba(95, 194, 227, 0.05)", border: "1px solid rgba(95, 194, 227, 0.2)"}}>
                    <DynamicIcon name={ind.icon} className="lucide lucide-building2 w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: ind.title ?? "" }} />
                  </div>
                  <ul className="space-y-1.5" dangerouslySetInnerHTML={{ __html: ind.content ?? "" }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======= TECH STACK ======= */}
      {(techSection.heading || techCards.length > 0) && (
        <section className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(rgb(9, 15, 27) 0%, rgb(7, 10, 19) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-12 transition-all duration-700 opacity-100 translate-y-0">
              {techSection.heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(techSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {techCards.map((t: any, i: number) => (
                <div key={i} className="rounded-2xl p-6 transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 opacity-100 translate-y-0" style={{background: "rgba(255, 255, 255, 0.024)", border: "1px solid rgba(148, 163, 184, 0.12)"}}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}>
                      <DynamicIcon name={t.icon} className="lucide lucide-layers w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: t.title ?? "" }} />
                  </div>
                  <div className="flex flex-wrap gap-1.5" dangerouslySetInnerHTML={{ __html: t.content ?? "" }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======= SECURITY & COMPLIANCE ======= */}
      {(techSection.security_heading || securityCards.length > 0) && (
        <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              {techSection.security_heading && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(techSection.security_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {securityCards.map((s: any, i: number) => (
                <div key={i} className={cardBase} style={cardStyle}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.20)" }}>
                      <DynamicIcon name={s.security_icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: s.security_title ?? "" }} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.security_content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======= FAQ ======= */}
      {faqs.length > 0 && (
        <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
                dangerouslySetInnerHTML={{ __html: addClassToSpan(pageData?.faq_section_heading || "Frequently Asked <span>Questions</span>", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
              />
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f: any, i: number) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-border/30 rounded-lg bg-card/30 backdrop-blur-sm px-4">
                    <AccordionTrigger className="text-left text-foreground font-semibold text-sm sm:text-base hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground text-sm leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: f.a }} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* ======= FINAL CTA + CONTACT FORM ======= */}
      <section className="py-12 lg:py-16" style={{ background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 6%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {contactSection.heading ? (
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 text-left"
                  dangerouslySetInnerHTML={{ __html: addClassToSpan(contactSection.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}
                />
              ) : (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 text-left">
                  Get a Custom{" "}
                  <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Data Integration Roadmap</span>
                </h2>
              )}
              {contactSection.paragraph ? (
                <div className="text-muted-foreground mb-6 text-left space-y-4 [&_ul]:!list-disc [&_ul]:!list-outside [&_ul]:!pl-5 [&_ol]:!list-decimal [&_ol]:!list-outside [&_ol]:!pl-5 [&_li]:!my-1 [&_li]:!leading-relaxed [&_li::marker]:!text-muted-foreground" dangerouslySetInnerHTML={{ __html: contactSection.paragraph }} />
              ) : (
                <p className="text-muted-foreground mb-6 text-left">
                  Disconnected systems and fragmented data can hinder your growth and limit visibility. Code1Tech unifies your data into a streamlined foundation for analytics, automation, and AI.
                </p>
              )}
              {contactLists.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {contactLists.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="lucide lucide-circle-check-big w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{item.list ?? item.text ?? item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {contactButton && (
                <Link to={contactButton.cta_url || ""}>
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                    <span dangerouslySetInnerHTML={{ __html: contactButton.cta_text ?? "Schedule a Data Integration Consultation" }} />
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
              )}
            </div>
            <ContactUsForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataIngestion;
