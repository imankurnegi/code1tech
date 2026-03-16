import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Quote,
  Star,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { api } from "@/api";
import ContactUsForm, { type ContactFormData } from "@/components/ContactUsForm";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import he from "he";
import SeoTags from "@/components/SeoTags";

export async function loader() {
  try {
    const data = await api.getDataScience();
    const contactFormFields = await api.getContactFormFields();
    return { data, contactFormFields };
  } catch (error) {
    console.error("Failed to load data science data", error);
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
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.5)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.05)";
        ctx.fill();
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

// Banner-style CTA component
const InlineCTA = ({ text, buttonText, link = "/contact" }: { text: string; buttonText: string; link?: string; image?: string }) => (
  <div className="py-6" style={{ background: "#070B12" }}>
    <div className="container mx-auto px-4 lg:px-8">
      <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7"
        style={{
          background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
          border: "1px solid rgba(148,163,184,0.15)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.6)"
        }}>
        {/* Decorative swoosh / glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{
            top: "-30%", right: "18%", width: "340px", height: "340px",
            background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)",
            transform: "rotate(-30deg) scale(1.4)",
            filter: "blur(24px)"
          }} />
          <div className="absolute" style={{
            bottom: "-20%", right: "30%", width: "200px", height: "200px",
            background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)",
            filter: "blur(20px)"
          }} />
          <div className="absolute" style={{
            top: "-60%", right: "10%", width: "420px", height: "280px",
            background: "transparent",
            border: "1.5px solid rgba(140,80,220,0.25)",
            borderRadius: "50%",
            transform: "rotate(-20deg)"
          }} />
          <div className="absolute" style={{
            bottom: "-70%", right: "22%", width: "380px", height: "260px",
            background: "transparent",
            border: "1.5px solid rgba(56,189,248,0.15)",
            borderRadius: "50%",
            transform: "rotate(15deg)"
          }} />
        </div>
        {/* Text */}
        <div className="flex-1 relative z-10">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{text}</h3>
        </div>
        {/* Button */}
        <Link to={link} className="flex-shrink-0 relative z-10">
          <Button size="lg" className="group font-semibold px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
            {buttonText} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

// ===== ANALYTICS SOLUTIONS STACKED SCROLL SECTION =====
interface AnalyticsSolution {
  icon: string;
  title: string;
  image: string;
  description: string;
  topDescription?: string;
  bottomHtml?: string;
}

const CARD_COUNT = 4;
const CARD_HEIGHT = 580; // px, each card height
const SCROLL_PER_CARD = 600; // px of scroll to advance one card

const AnalyticsSolutionsSection = ({
  analyticsSolutions,
  isVisible,
  sectionHeading,
  sectionTopDescription,
}: {
  analyticsSolutions: AnalyticsSolution[];
  isVisible: boolean;
  sectionHeading?: string;
  sectionTopDescription?: string;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsMobile(mq.matches);
    setPrefersReducedMotion(rm.matches);
    const onMQ = () => setIsMobile(mq.matches);
    const onRM = () => setPrefersReducedMotion(rm.matches);
    mq.addEventListener("change", onMQ);
    rm.addEventListener("change", onRM);
    return () => { mq.removeEventListener("change", onMQ); rm.removeEventListener("change", onRM); };
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrolledIntoSection = -rect.top; // positive when scrolled past top
      if (scrolledIntoSection < 0) { setActiveIndex(0); return; }
      const newIndex = Math.min(
        CARD_COUNT - 1,
        Math.floor(scrolledIntoSection / SCROLL_PER_CARD)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, prefersReducedMotion]);

  // Total scroll area = viewport height + (CARD_COUNT - 1) * SCROLL_PER_CARD
  const totalScrollHeight = `calc(100vh + ${(CARD_COUNT - 1) * SCROLL_PER_CARD}px)`;

  // Mobile: simple stacked layout with fade-up
  if (isMobile || prefersReducedMotion) {
    return (
      <section className="py-12 relative overflow-hidden" style={{ background: "hsl(222 47% 5%)" }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  sectionHeading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            <p className="text-muted-foreground text-base max-w-3xl mx-auto">
              {sectionTopDescription}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {analyticsSolutions.map((solution, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  minHeight: "360px",
                  animation: `slide-up 0.6s ease-out ${index * 0.15}s both`,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div className="absolute inset-0">
                  <img src={solution.image} alt={solution.title} className="w-full h-full object-cover" style={{ filter: "brightness(0.4) contrast(1.1)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,10,18,0.97)] via-[rgba(5,10,18,0.6)] to-[rgba(5,10,18,0.2)]" />
                </div>
                <div className="relative z-10 p-6 flex flex-col justify-end" style={{ minHeight: "360px" }}>
                  <span className="text-5xl font-black mb-2" style={{ color: "rgba(255,255,255,0.12)", fontVariantNumeric: "tabular-nums" }}>#{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-bold text-foreground mb-2">{solution.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4">{solution.description}</p>
                  {solution?.bottomHtml && (
                    <div
                      className="mt-2 text-sm text-foreground/80 space-y-2"
                      dangerouslySetInnerHTML={{ __html: he.decode(solution?.bottomHtml) }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{ height: totalScrollHeight, position: "relative" }}
    >
      {/* Sticky pinned container */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "hsl(222 47% 5%)",
        }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(95,194,227,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(95,194,227,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

        {/* Header */}
        <div
          className={`text-center pt-16 pb-6 px-4 relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3"
            dangerouslySetInnerHTML={{
              __html: addClassToSpan(
                sectionHeading ?? "",
                "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
              ),
            }}
          />
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            {sectionTopDescription}
          </p>
        </div>

        {/* Progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {analyticsSolutions.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeIndex ? "10px" : "6px",
                height: i === activeIndex ? "10px" : "6px",
                borderRadius: "50%",
                background: i === activeIndex ? "hsl(var(--accent))" : "rgba(255,255,255,0.25)",
                transition: "all 0.4s ease",
                boxShadow: i === activeIndex ? "0 0 10px hsl(var(--accent)/0.6)" : "none",
              }}
            />
          ))}
        </div>

        {/* Card stack area */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center px-4 lg:px-12"
          style={{ top: "160px", bottom: "20px" }}
        >
          <div className="relative w-full max-w-5xl mx-auto" style={{ height: `${CARD_HEIGHT}px` }}>
            {analyticsSolutions.map((solution, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              const isFuture = index > activeIndex;

              // Cards below active: translated up into place (stacked behind)
              // Active card: fully visible on top
              // Future cards: waiting below (translated down and hidden)
              const translateY = isPast
                ? `${(index - activeIndex) * 12}px`     // peek above, slightly offset
                : isFuture
                  ? "100%"                                  // hidden below
                  : "0%";                                   // active = normal position

              const scale = isPast ? 0.96 - (activeIndex - index - 1) * 0.02 : 1;
              const opacity = isPast ? Math.max(0, 0.7 - (activeIndex - index - 1) * 0.25) : 1;
              const brightness = isPast ? Math.max(0.4, 0.75 - (activeIndex - index - 1) * 0.15) : 1;

              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "16px",
                    overflow: "hidden",
                    zIndex: isPast ? index + 1 : isFuture ? 0 : CARD_COUNT + 1,
                    transform: `translateY(${translateY}) scale(${scale})`,
                    opacity,
                    filter: `brightness(${brightness})`,
                    transition: "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.75s ease, filter 0.75s ease",
                    boxShadow: isActive
                      ? "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(95,194,227,0.12)"
                      : "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(148,163,184,0.06)",
                    background: "hsl(215 57% 10%)",
                    display: "flex",
                  }}
                >
                  {/* ── LEFT: Text panel ── */}
                  <div
                    className="flex flex-col justify-between z-10 flex-shrink-0"
                    style={{
                      width: "45%",
                      padding: "40px 44px",
                      background: "hsl(215 57% 10%)",
                    }}
                  >
                    {/* Counter row: "02 / 04 ────" */}
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold tracking-[0.18em] font-mono"
                        style={{ color: "hsl(var(--accent))" }}
                      >
                        {String(index + 1).padStart(2, "0")} / {String(CARD_COUNT).padStart(2, "0")}
                      </span>
                      <div className="flex-1 h-px" style={{ background: "rgba(95,194,227,0.25)" }} />
                    </div>

                    {/* Title + Description */}
                    <div className="flex-1 flex flex-col justify-center py-8">
                      <h3
                        className="font-bold text-foreground leading-tight mb-5"
                        style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
                       dangerouslySetInnerHTML={{ __html: solution.title}}>
                      </h3>
                      <p
                        className="text-muted-foreground text-sm lg:text-base leading-relaxed text-left"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
                        }}
                        dangerouslySetInnerHTML={{ __html: solution.description }}
                      />
                    </div>

                    {/* Checklist / details from API HTML */}
                    {solution?.bottomHtml && (
                      <div
                        className="flex flex-col gap-3 text-foreground/75 text-sm leading-snug"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(10px)",
                          transition: "opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s",
                        }}
                        dangerouslySetInnerHTML={{ __html: he.decode(solution?.bottomHtml) }}
                      />
                    )}

                    {/* Bottom separator line */}
                    <div className="mt-8 h-px" style={{ background: "rgba(95,194,227,0.15)" }} />
                  </div>

                  {/* ── RIGHT: Image panel ── */}
                  <div className="relative flex-1 overflow-hidden" style={{ background: "hsl(215 57% 8%)" }}>
                    {/* Left fade blend */}
                    <div
                      className="absolute inset-y-0 left-0 w-12 z-10 pointer-events-none"
                      style={{ background: "linear-gradient(to right, hsl(215 57% 10%), transparent)" }}
                    />
                    <img
                      src={solution.image}
                      alt={`${solution.title} illustration`}
                      className="w-full h-full object-cover"
                      style={{
                        transform: isActive ? "scale(1.04)" : "scale(1)",
                        transition: "transform 1.2s ease",
                        filter: "brightness(0.75) contrast(1.1) saturate(0.85)",
                        opacity: isActive ? 1 : 0.85,
                      }}
                    />
                    {/* Vignette */}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(4,8,16,0.45) 100%)" }} />

                    {/* Corner brackets */}
                    <div className="absolute top-5 left-5 z-20 pointer-events-none">
                      <div className="w-6 h-6 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: "rgba(95,194,227,0.5)" }} />
                    </div>
                    <div className="absolute top-5 right-5 z-20 pointer-events-none">
                      <div className="w-6 h-6 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: "rgba(95,194,227,0.5)" }} />
                    </div>
                    <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
                      <div className="w-6 h-6 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: "rgba(95,194,227,0.5)" }} />
                    </div>
                    <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
                      <div className="w-6 h-6 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: "rgba(95,194,227,0.5)" }} />
                    </div>

                    {/* Icon badge top-right */}
                    <div
                      className="absolute top-5 right-14 z-20"
                      style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.4s ease 0.3s" }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(95,194,227,0.15)", border: "1px solid rgba(95,194,227,0.35)", backdropFilter: "blur(8px)" }}
                      >
                        <DynamicIcon name={solution.icon} className="w-4 h-4 text-accent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll hint (only on first card) */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
          style={{
            opacity: activeIndex === 0 ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div
            className="w-5 h-8 rounded-full border border-foreground/20 flex items-start justify-center pt-1.5"
          >
            <div
              className="w-1 h-2 rounded-full bg-accent/60"
              style={{ animation: "float 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DataScience = () => {
  const loaderData = useLoaderData() as any;
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const contactFormFields = loaderData?.contactFormFields ?? null;

  const pageData = loaderData?.data?.data ?? null;
  const banner = pageData?.banner_section;
  const statsFields = pageData?.stats_section?.stats_fields ?? [];
  const industriesApi = pageData?.box_data ?? [];
  const servicesGetStarted = pageData?.services_get_started_section;
  const businessChallengesSection = pageData?.business_challenges_section_section;
  const advanceDataHeading = pageData?.advanced_data_heading;
  const advanceDataDescription = pageData?.advanced_data_description;
  const industriesSectionHeading = pageData?.industries_section_heading;
  const dsIndustriesBgImg = pageData?.data_science_background_image;
  const industriesSectionDescription = pageData?.industries_section_description;
  const techStackToolSection = pageData?.tech_stack_tools_section;
  const securityComplianceSection = pageData?.security_and_compliance_section;
  const caseStudiesApi = pageData?.case_studies ?? [];
  const caseStudiesSectionHeading = pageData?.case_study_section_heading;
  const testimonialsApi = pageData?.testimonials ?? [];
  const testimonialsSectionHeading = pageData?.testimonial_section_heading;
  const faqSectionHeading = pageData?.faq_section_heading;
  const faqsApi = pageData?.frequently_asked_question ?? [];


  useEffect(() => {
    setIsVisible(true);
  }, []);

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
  // --- DATA MAPPED FROM API ---

  const analyticsSolutions: AnalyticsSolution[] =
    businessChallengesSection?.business_challenges_fields?.map((item: any) => ({
      icon: item.slide_icon,
      title: item.slide_heading,
      image: item.slide_image?.url || "",
      description: item.slide_description,
      topDescription: item.slide_top_description,
      bottomHtml: item.slide_bottom_data,
    })) || [];

  const analyticsSectionHeading = businessChallengesSection?.section_heading;
  const analyticsTopDescription =
    businessChallengesSection?.business_challenges_fields?.[0]?.slide_top_description;

  const dataScienceServicesSection = pageData?.data_science_services_we_offer_section;

  const servicesSectionHeading = dataScienceServicesSection?.heading;
  const servicesSectionParagraph = dataScienceServicesSection?.paragraph;

  const serviceOfferings =
    dataScienceServicesSection?.blocks?.map((block: any) => ({
      icon: BarChart3,
      title: block.title,
      description: block.paragraph,
      image: block.image?.url || "",
    })) || [];

  const advancedServices =
    pageData?.ds_blocks?.map((block: any) => ({
      icon: block.sdb?.data_science_services_for_your_business?.icon as string,
      title: block.post_title,
      description: block.post_content,
      subsections:
        block.sdb?.data_science_services_for_your_business?.cards?.map((card: any) => ({
          title: card.heading,
          html: card.lists,
        })) || [],
      cta: block.sdb?.data_science_services_for_your_business?.bottom_link_text || null,
      ctaUrl: block.sdb?.data_science_services_for_your_business?.bottom_link_url || "contact",
    })) || [];



  const ourProcessSection = pageData?.our_process_section
  const ourProcessSectionHeading = ourProcessSection?.section_heading;
  const ourProcessSectionDescription = ourProcessSection?.short_description;

  const processSteps = ourProcessSection.box_fields.map((item) => ({
    icon: item.box_icon,
    title: item.box_title,
    description: item.box_description,
  }));

  const howWeWorkSection = pageData?.how_we_work_section;
  const howWeWorkSectionHeading = howWeWorkSection?.section_heading;
  const howWeWorkSectionDescription = howWeWorkSection?.section_description;

  const engagementModels =
    howWeWorkSection?.right_side_fields?.map((item: any) => ({
      icon: item.box_icon,
      title: item.box_heading,
      description: item.box_description,
    })) || [];

  const whyChooseSection = pageData?.why_choose_section;
  const whyChooseSectionHeading = whyChooseSection?.section_heading;
  const whyChooseSectionDescription = whyChooseSection?.section_description;
  const whyChoose =
    whyChooseSection?.right_box_data?.map((item: any) => ({
      icon: item.box_icon as string,
      title: item.box_title,
      description: item.box_description,
    })) || [];

  const industries =
    industriesApi.map((item: any, index: number) => ({
      icon: item?.sdb?.data_science_industries_we_serve?.icon,
      title: item.post_title,
      items:
        item.sdb?.data_science_industries_we_serve?.lists?.map((l: any) => l.list) ||
        [],
    })) || [];

  const techStack =
    techStackToolSection?.box_fields?.map((box: any) => ({
      label: box.heading,
      value: box.text,
    })) || [];

  const securityItems =
    securityComplianceSection?.box_fields.map((box: any, index: number) => ({
      icon: box.icon,
      title: box.heading,
      description: box.description,
    })) || [];

  const stripTags = (html: string) =>
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const caseStudies =
    caseStudiesApi.map((cs: any, index: number) => ({
      title: cs.post_title,
      industry: ["Finance & Banking", "Healthcare", "Retail & eCommerce"][index] || "",
      result: stripTags(cs.post_content || ""),
      icon: cs?.acf?.hover_icon,
    })) || [];

  const testimonials =
    testimonialsApi.map((t: any) => ({
      quote: stripTags(t.post_content || ""),
      author: t.acf?.designation || t.post_title,
      company: t.acf?.company || "",
    })) || [];

  const faqs =
    faqsApi.map((f: any) => ({
      question: f.post_title,
      answer: stripTags(f.post_content || ""),
    })) || [];

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)"
  };

  const sectionBg1 = { background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 8%) 50%, hsl(222 47% 5%) 100%)" };
  const sectionBg2 = { background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" };
  const sectionBg3 = { background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" };

  // Animated stat counter
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
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * numericPart);
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
                    title={loaderData?.data?.data?.seo?.title}
                    description={loaderData?.data?.data?.seo?.description}
                    ogImage={loaderData?.data?.data?.seo?.og_image}
                  />
      {/* ===== 1. HERO / BANNER ===== */}
      <section
        className="relative py-8 lg:py-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)",
        }}
      >
        <NetworkCanvas />
        <PulsingGlow className="top-0 right-0 w-[600px] h-[600px]" />
        <PulsingGlow className="bottom-0 left-0 w-[500px] h-[500px]" color="rgba(0, 78, 158, 0.1)" />
        <FloatingParticles count={12} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-8 lg:pt-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Image */}
            <div
              className={`relative transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-12 scale-95"
                }`}
            >
              <div className="relative">
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(95, 194, 227, 0.1)",
                  }}
                >
                  <img
                    src={banner?.banner_image?.url}
                    alt={banner?.banner_image?.alt}
                    className="w-full h-[350px] lg:h-[420px] object-cover transition-transform duration-[2s] hover:scale-105"
                    style={{ filter: "brightness(0.9) contrast(1.05)" }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                </div>

                <div
                  className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-accent/40 rounded-tl-3xl"
                  style={{ animation: "pulse 3s ease-in-out infinite" }}
                />
                <div
                  className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-3xl"
                  style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }}
                />

                {/* Floating stats from API */}
                <div
                  className={`absolute -right-4 top-1/4 p-4 rounded-xl backdrop-blur-xl transition-all duration-1000 hidden sm:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(95, 194, 227, 0.2)",
                    boxShadow:
                      "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(95, 194, 227, 0.1)",
                    transitionDelay: "600ms",
                    animation: "float 6s ease-in-out infinite",
                  }}
                >
                  <div className="text-2xl font-bold text-accent font-mono">
                    {banner?.floating_badge_fields?.[1]?.badge_heading}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {banner?.floating_badge_fields?.[1]?.badge_text}
                  </div>
                </div>

                <div
                  className={`absolute -left-4 bottom-1/4 p-4 rounded-xl backdrop-blur-xl transition-all duration-1000 hidden sm:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(95, 194, 227, 0.2)",
                    boxShadow:
                      "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(95, 194, 227, 0.1)",
                    transitionDelay: "800ms",
                    animation: "float 5s ease-in-out infinite",
                    animationDelay: "2s",
                  }}
                >
                  <div className="text-2xl font-bold text-accent font-mono">
                    {banner?.floating_badge_fields?.[0]?.badge_heading}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {banner?.floating_badge_fields?.[0]?.badge_text}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div
              className={`transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                }`}
            >
              <h1
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-snug mb-5"
                dangerouslySetInnerHTML={{
                  __html: addClassToSpan(
                    banner?.banner_heading ?? "",
                    "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                  ),
                }}
              />
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                {banner?.banner_description}
              </p>
              <p className="text-sm font-semibold text-accent mb-6" style={{ animation: "pulse 3s ease-in-out infinite" }}>
                {banner?.highlighted_text}
              </p>
              <Link to={banner?.cta_url || "#"}>
                <Button
                  size="lg"
                  className="group w-full sm:w-auto bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                >
                  {banner?.cta_text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={`mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl backdrop-blur-2xl transition-all duration-1000 hover:scale-[1.01] hover:border-accent/25 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(95,194,227,0.04) 50%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(95, 194, 227, 0.15)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(95,194,227,0.05)",
              transitionDelay: "1000ms",
              animation: isVisible ? "statsBarShimmer 6s ease-in-out infinite" : "none"
            }}
          >
            {(statsFields ).map((stat: { stats_numbers?: string; stats_title?: string }, index: number) => (
              <AnimatedStat
                key={index}
                value={stat.stats_numbers ?? ""}
                label={stat.stats_title ?? ""}
                delay={1100 + index * 150}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes scan {
            0%, 100% { transform: translateY(0); opacity: 0; }
            50% { transform: translateY(160px); opacity: 1; }
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

      {/* ===== 2. DATA ANALYTICS SOLUTIONS ===== */}
      <AnalyticsSolutionsSection
        analyticsSolutions={analyticsSolutions}
        isVisible={isVisible}
        sectionHeading={analyticsSectionHeading}
        sectionTopDescription={analyticsTopDescription}
      />

      {/* ===== 3. DATA SCIENCE SERVICES WE OFFER ===== */}
      <section className="py-8 lg:py-12" style={sectionBg3}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  servicesSectionHeading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                ),
              }}
            />
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {servicesSectionParagraph}
            </p>
          </div>

          {/* Accordion Panel Layout */}
          <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(148, 163, 184, 0.12)", minHeight: "480px" }}>
            {serviceOfferings.map((offering, index) => {
              const isActive = activeService === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`relative cursor-pointer transition-all duration-700 ease-in-out overflow-hidden ${isActive
                    ? "lg:flex-[3] flex-auto"
                    : "lg:flex-[0.6] flex-none"
                    } ${isVisible ? "opacity-100" : "opacity-0"}`}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(11,18,32,0.95) 0%, rgba(7,11,18,0.98) 100%)"
                      : "linear-gradient(180deg, rgba(15,25,40,0.8) 0%, rgba(10,18,30,0.9) 100%)",
                    borderRight: index < serviceOfferings.length - 1 ? "1px solid rgba(148, 163, 184, 0.10)" : "none",
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Active State: Full content */}
                  <div className={`transition-all duration-500 ${isActive ? "opacity-100 p-6 lg:p-8" : "opacity-0 absolute inset-0 pointer-events-none p-6"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground">{offering.title}</h3>
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-5 h-5 text-accent -rotate-45" />
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md" dangerouslySetInnerHTML={{__html: offering.description}}></p>
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] max-w-md" style={{
                      border: "1px solid rgba(148, 163, 184, 0.15)",
                    }}>
                      <img
                        src={offering.image}
                        alt={offering.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Collapsed State: Vertical text */}
                  <div className={`transition-all duration-500 flex flex-col items-center justify-between h-full py-8 ${isActive ? "opacity-0 hidden lg:hidden" : "opacity-100"}`}>
                    {/* Mobile collapsed: horizontal */}
                    <div className="lg:hidden px-6 py-4 flex items-center justify-between w-full">
                      <h3 className="text-base font-semibold text-foreground/80">{offering.title}</h3>
                      <ArrowRight className="w-4 h-4 text-accent/60 -rotate-45" />
                    </div>
                    {/* Desktop collapsed: vertical text */}
                    <div className="hidden lg:flex flex-col items-center justify-between h-full w-full py-6">
                      <div className="flex-1 flex items-center justify-center">
                        <h3
                          className="text-lg font-semibold text-foreground/70 whitespace-nowrap"
                          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                        >
                          {offering.title}
                        </h3>
                      </div>
                      <div className="mt-4">
                        <ArrowRight className="w-5 h-5 text-accent/50 -rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inline CTA 1 */}
      <InlineCTA text={pageData?.cta_section_heading} buttonText={pageData?.cta_text} />

      {/* ===== 4. ADVANCED DATA SCIENCE SERVICES ===== */}
      <section className="py-8 lg:py-12" style={sectionBg2}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  advanceDataHeading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                )
              }}
            />

            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {advanceDataDescription}
            </p>
          </div>

          <div className="space-y-8">
            {advancedServices.map((service, index) => (
              <div
                key={index}
                className={`group rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:border-accent/20 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(148, 163, 184, 0.12)",
                  transitionDelay: `${300 + index * 100}ms`
                }}
              >
                {/* Header: Icon + Title + Description */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    <DynamicIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-[15px]">{service.description}</p>
                  </div>
                </div>

                {/* 3-column sub-cards grid */}
                {service.subsections.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {service.subsections.map((sub, si) => (
                      <div
                        key={si}
                        className="rounded-xl p-5 transition-all duration-300 hover:border-accent/25"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(148, 163, 184, 0.10)",
                        }}
                      >
                        <h4 className="text-sm font-semibold text-accent mb-3" dangerouslySetInnerHTML={{ __html: he.decode(sub.title) }} />
                        <div
                          className="space-y-2 text-sm text-foreground/75"
                          dangerouslySetInnerHTML={{ __html: he.decode(sub.html) }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA link */}
                {service.cta && (
                  <div>
                    <Link to={service.ctaUrl || "#"} className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all duration-300">
                      {service.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. OUR PROCESS ===== */}
      <section className="py-8 lg:py-12" style={sectionBg3}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(ourProcessSectionHeading ?? "", "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />

            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {ourProcessSectionDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl text-center transition-all duration-500 hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ ...cardStyle, transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="mb-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mx-auto group-hover:bg-accent/20 transition-colors">
                    <DynamicIcon name={step.icon} className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2" dangerouslySetInnerHTML={{ __html: step.title }} />
                <p className="text-muted-foreground text-sm text-left" dangerouslySetInnerHTML={{ __html: step.description }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. ENGAGEMENT MODELS ===== */}
      <section className="py-14 lg:py-20 overflow-hidden" style={sectionBg2}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left – text + image */}
            <div>
              <span className="inline-block text-xs text-accent uppercase tracking-widest font-semibold border border-accent/30 rounded-full px-4 py-1 mb-5" style={{ background: "rgba(95,194,227,0.07)" }}>{howWeWorkSection?.tag_line}</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                dangerouslySetInnerHTML={{
                  __html: addClassToSpan(
                    howWeWorkSectionHeading ?? "",
                    "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")
                }}
              />

              <p className="text-muted-foreground text-base mb-8 leading-relaxed">{howWeWorkSectionDescription}</p>
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                <img src={howWeWorkSection?.section_image?.url} alt="Data Science Engagement Models" className="w-full h-[260px] object-cover" style={{ filter: "brightness(0.8) saturate(1.1)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, transparent)" }} />
                <div className="absolute bottom-4 left-4">
                  <div className="text-xs text-accent font-semibold uppercase tracking-widest">{howWeWorkSection?.image_highlighted_text}</div>
                  <div className="text-sm text-foreground font-medium">{howWeWorkSection?.image_simple_text}</div>
                </div>
              </div>
            </div>
            {/* Right – model cards */}
            <div className="flex flex-col gap-5">
              {engagementModels.map((model, index) => (
                <div key={index} className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-accent/40" style={{ background: "rgba(8,14,30,0.95)", border: "1px solid rgba(95,194,227,0.12)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(95,194,227,0.06) 0%, transparent 70%)" }} />
                  <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(95,194,227,0.3), transparent)" }} />
                  <div className="relative z-10 flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.12))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      {/* <model.icon className="w-5 h-5 text-accent" strokeWidth={1.5} /> */}
                      <DynamicIcon name={model.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">{model.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{model.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inline CTA 2 */}
      <InlineCTA text={howWeWorkSection?.cta_section_text} buttonText={howWeWorkSection?.cta_text} link={howWeWorkSection?.cta_url} />

      {/* ===== 7. WHY CHOOSE US ===== */}
      <section className="py-14 lg:py-20 overflow-hidden" style={sectionBg3}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* Left – image panel with heading + stats */}
            <div className="relative rounded-3xl overflow-hidden group" style={{ minHeight: "480px", boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(95,194,227,0.08)" }}>
              <img src={whyChooseSection?.section_image?.url} alt="Why Choose Code1 for Data Science" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ filter: "brightness(0.8) saturate(1.1)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,10,25,0.6) 0%, rgba(5,10,25,0.2) 50%, rgba(5,10,25,0.7) 100%)" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_5%)] via-transparent to-transparent opacity-80" />
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, #0077B6, transparent)" }} />
              <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-accent/50 rounded-tl-lg" />
              <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-accent/50 rounded-tr-lg" />
              <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-accent/50 rounded-bl-lg" />
              <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-accent/50 rounded-br-lg" />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div>
                  <span className="inline-block text-xs text-accent uppercase tracking-widest font-semibold border border-accent/30 rounded-full px-4 py-1 mb-5" style={{ background: "rgba(95,194,227,0.07)" }}>{whyChooseSection?.left_top_tagline}</span>
                  <h2
                    className="text-3xl lg:text-4xl font-bold text-foreground leading-tight"
                    dangerouslySetInnerHTML={{
                      __html: addClassToSpan(
                        whyChooseSectionHeading ?? "",
                        "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                      )
                    }}
                  />

                  <p className="text-muted-foreground text-sm mt-3 max-w-sm leading-relaxed">{whyChooseSectionDescription}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {whyChooseSection?.image_data?.map((item, i) => (
                    <div key={i} className="rounded-xl p-3 text-center" style={{ background: "rgba(10,18,35,0.75)", border: "1px solid rgba(95,194,227,0.18)", backdropFilter: "blur(12px)" }}>
                      <div className="text-xl font-bold font-mono bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">{item?.numbers}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{item?.data}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right – 3 benefit cards stacked */}
            <div className="flex flex-col gap-5 justify-center">
              {whyChoose.map((item, index) => (
                <div key={index} className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1" style={{ background: "rgba(8,14,30,0.95)", border: "1px solid rgba(95,194,227,0.12)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(95,194,227,0.07) 0%, transparent 70%)" }} />
                  <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(95,194,227,0.35), transparent)" }} />
                  <div className="relative z-10 flex gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.12))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      {/* <item.icon className="w-5 h-5 text-accent" strokeWidth={1.5} /> */}
                      <DynamicIcon name={item.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300" dangerouslySetInnerHTML={{ __html: item.title}}></h3>
                      <p className="text-muted-foreground text-sm leading-relaxed text-left">{item.description}</p>
                      <div className="mt-3 w-8 h-px group-hover:w-16 transition-all duration-500" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6)" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. INDUSTRIES WE SERVE ===== */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={dsIndustriesBgImg} alt="Industries we serve" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.2) saturate(0.7)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, rgba(8,14,28,0.6) 40%, rgba(8,14,28,0.6) 60%, hsl(222 47% 5%) 100%)" }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block text-xs text-accent uppercase tracking-widest font-semibold border border-accent/30 rounded-full px-4 py-1 mb-4" style={{ background: "rgba(95,194,227,0.07)" }}>{pageData?.section_tagline}</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(industriesSectionHeading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                )
              }}
            />

            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{industriesSectionDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {industries.map((industry, index) => (
              <div key={index} className="group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1" style={{ background: "rgba(10,18,35,0.75)", border: "1px solid rgba(95,194,227,0.12)", backdropFilter: "blur(12px)" }}>
                <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(95,194,227,0.4), transparent)" }} />
                <div className="p-2 rounded-lg w-fit mb-3 transition-colors" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.12))", border: "1px solid rgba(95,194,227,0.25)" }}>
                  <DynamicIcon name={industry.icon} className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{industry.title}</h3>
                <ul className="space-y-1.5">
                  {industry.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-sm text-foreground/70">
                      <CheckCircle className="w-3.5 h-3.5 text-accent/60 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. TECHNOLOGY STACK ===== */}
      <section className="py-8 lg:py-12" style={sectionBg3}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2
              className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  techStackToolSection?.section_heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")
              }}
            />

            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {techStackToolSection?.section_description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <div key={index} className="p-4 rounded-xl text-center" style={cardStyle}>
                <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">{tech.label}</h4>
                <p className="text-sm text-foreground/80">{tech.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. SECURITY & COMPLIANCE ===== */}
      <section className="py-8 lg:py-12" style={sectionBg2}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  securityComplianceSection?.section_heading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")
              }} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {securityItems.map((item, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ ...cardStyle, transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4 group-hover:bg-accent/20 transition-colors">
                  <DynamicIcon name={item.icon} className="w-6 h-6" />
                </div>
                <h3
                  className="text-lg font-semibold text-foreground mb-3"
                  dangerouslySetInnerHTML={{
                    __html: addClassToSpan(
                      item.title,
                      "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")
                  }} />
                <p className="text-muted-foreground text-sm text-left" dangerouslySetInnerHTML={{__html:item.description}}></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. CASE STUDIES ===== */}
      {/* <section className="py-8 lg:py-12" style={sectionBg3}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  caseStudiesSectionHeading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")
              }}
            />

          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ ...cardStyle, transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4 group-hover:bg-accent/20 transition-colors">
                  <DynamicIcon name={study.icon} className="w-6 h-6" />
                </div>
                <span className="text-xs text-accent uppercase tracking-wider font-medium">{study.industry}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-3">{study.title}</h3>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{study.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== 12. TESTIMONIALS ===== */}
      <section className="py-8 lg:py-12" style={sectionBg2}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  testimonialsSectionHeading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                )
              }}
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ ...cardStyle, transitionDelay: `${300 + index * 100}ms` }}
              >
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                <p className="text-foreground/90 text-sm leading-relaxed mb-4 italic text-left">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                  </div>
                </div>
                <p className="text-accent text-sm font-medium mt-2">{t.author}</p>
                <p className="text-muted-foreground text-xs">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. FAQs ===== */}
      <section className="py-8 lg:py-12" style={sectionBg3}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{
                __html: addClassToSpan(
                  faqSectionHeading ?? "",
                  "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                )
              }}
            />

          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="rounded-xl px-6 border-none"
                  style={cardStyle}
                >
                  <AccordionTrigger className="text-foreground hover:no-underline text-left text-base font-medium py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm text-left pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ===== 14. FINAL CTA: Get Started ===== */}
      <section className="py-8 lg:py-12" style={sectionBg2}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {servicesGetStarted?.small_heading && (
                <span className="inline-block text-xs font-semibold tracking-[0.25em] text-accent/70 mb-3 uppercase">
                  {servicesGetStarted.small_heading}
                </span>
              )}
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-6"
                dangerouslySetInnerHTML={{
                  __html: addClassToSpan(
                    servicesGetStarted?.heading,
                    "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                  )
                }}
              />
              <p className="text-muted-foreground text-lg mb-6 text-left">
                {servicesGetStarted?.paragraph}
              </p>
              <div className="space-y-4 mb-8">
                {(servicesGetStarted?.lists).map((item: { list: string }, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-foreground/80">{item.list}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to={servicesGetStarted?.buttons[0]?.cta_url || "#"}>
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
                  >
                    {servicesGetStarted?.buttons[0]?.cta_text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link to={servicesGetStarted?.buttons[1]?.cta_url || "#" }>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-accent/30 hover:border-accent/60 px-8 py-6 rounded-lg hover:scale-105 transition-all duration-300"
                  >
                    {servicesGetStarted?.buttons[1]?.cta_text}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className={`relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <ContactUsForm contactFormFields={contactFormFields} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataScience;
