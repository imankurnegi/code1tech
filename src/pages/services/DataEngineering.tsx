import CertificationsSection from "@/components/CertificationsSection";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";
import {
  ArrowRight,
  Shield,
  CheckCircle,
  Quote
} from
"lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSafeLoaderData } from "@/hooks/useSafeLoaderData";
import SeoTags from "@/components/SeoTags";
import ContactUsForm, { ContactFormData } from "@/components/ContactUsForm";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import he from "he";
import { api } from "@/api";

export async function loader() {
  try {
    const data = await api.getDataEngineering();
    const contactFormFields = await api.getContactFormFields();
    return { data, contactFormFields };
  } catch (error) {
    console.error("Failed to load data engineering data", error);
    return {
      data: null,
      contactFormFields: null,
    };
  }
}

// ── Animated Network Canvas ──
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const nodes: Array<{x: number;y: number;vx: number;vy: number;size: number;}> = [];
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
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {ctx.beginPath();ctx.moveTo(x, 0);ctx.lineTo(x, canvas.offsetHeight);ctx.stroke();}
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {ctx.beginPath();ctx.moveTo(0, y);ctx.lineTo(canvas.offsetWidth, y);ctx.stroke();}
      nodes.forEach((node, i) => {
        node.x += node.vx;node.y += node.vy;
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
        ctx.beginPath();ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.5)";ctx.fill();
        ctx.beginPath();ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 194, 227, 0.05)";ctx.fill();
        nodes.slice(i + 1).forEach((node2) => {
          const dx = node.x - node2.x;const dy = node.y - node2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {ctx.beginPath();ctx.moveTo(node.x, node.y);ctx.lineTo(node2.x, node2.y);ctx.strokeStyle = `rgba(95, 194, 227, ${0.12 * (1 - dist / 180)})`;ctx.lineWidth = 0.6;ctx.stroke();}
        });
      });
      animationId = requestAnimationFrame(animate);
    };
    resize();initNodes();animate();
    const handleResize = () => {resize();initNodes();};
    window.addEventListener("resize", handleResize);
    return () => {cancelAnimationFrame(animationId);window.removeEventListener("resize", handleResize);};
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />;
};

const FloatingParticles = ({ count = 15 }: {count?: number;}) =>
<>
    {[...Array(count)].map((_, i) =>
  <div key={`fp-${i}`} className="absolute rounded-full bg-accent/20 hidden md:block" style={{
    width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`,
    left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%`,
    animation: `float ${5 + Math.random() * 6}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 4}s`, boxShadow: "0 0 6px rgba(95, 194, 227, 0.4)"
  }} />
  )}
  </>;


const PulsingGlow = ({ className, color = "rgba(95, 194, 227, 0.08)" }: {className: string;color?: string;}) =>
<div className={`absolute pointer-events-none hidden md:block ${className}`}>
    <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
  </div>;


const AnimatedStat = ({ value, label, delay = 0, isVisible }: {value: string;label: string;delay?: number;isVisible: boolean;}) => {
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
        if (step >= steps) {setDisplayNum(numericPart);clearInterval(interval);}
      }, 1600 / steps);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isVisible, delay, numericPart]);
  return (
    <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{displayNum}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
    </div>);

};

// ── Inline CTA Banner ──
const InlineCTA = ({ title, subtitle, cta, ctaLink }: {title: string;subtitle: string;cta: string;ctaLink: string;image?: string;}) =>
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
          {/* Large violet ellipse */}
          <div className="absolute" style={{
            top: "-30%", right: "18%", width: "340px", height: "340px",
            background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)",
            transform: "rotate(-30deg) scale(1.4)",
            filter: "blur(24px)"
          }} />
          {/* Cyan accent glow */}
          <div className="absolute" style={{
            bottom: "-20%", right: "30%", width: "200px", height: "200px",
            background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)",
            filter: "blur(20px)"
          }} />
          {/* Swoosh arc top */}
          <div className="absolute" style={{
            top: "-60%", right: "10%", width: "420px", height: "280px",
            background: "transparent",
            border: "1.5px solid rgba(140,80,220,0.25)",
            borderRadius: "50%",
            transform: "rotate(-20deg)"
          }} />
          {/* Swoosh arc bottom */}
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
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
          {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
        </div>

        {/* Button */}
            <a href={`${import.meta.env.BASE_URL}${ctaLink?.replace(/^\/+/, "")}`} className="flex-shrink-0 relative z-10">
          <Button size="lg" className="group font-semibold px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
            {cta} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </a>
      </div>
    </div>
  </div>;


// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════

const ServicesShowcase = ({ data, isVisible }: { data:any, isVisible: boolean }) => {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const servicesOffered = data?.map((block: any) => ({
  icon: block.icon,
  title: block.title,
  description: block.description
})) || [];

// ── Services Showcase images ──
const serviceImages = data?.map((b: any) => b.image?.url) || [];

  const switchTab = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 220);
  };

  return (
    <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* ── Preload all images eagerly so tab switches are instant ── */}
      <div className="hidden" aria-hidden="true">
        {serviceImages.map((src, i) => (
          <img key={i} src={src} alt="" loading="eager" />
        ))}
      </div>

      {/* ── Vertical tab nav row ── */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        {servicesOffered.map((s, i) => (
          <button
            key={i}
            onClick={() => switchTab(i)}
            className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left ${active === i ? "text-accent" : "text-muted-foreground hover:text-foreground/80"}`}
            style={active === i ? {
              background: "linear-gradient(135deg, rgba(95,194,227,0.12), rgba(0,119,182,0.08))",
              border: "1px solid rgba(95,194,227,0.35)",
              boxShadow: "0 0 18px rgba(95,194,227,0.1)"
            } : {
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(148,163,184,0.1)"
            }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
              background: active === i ? "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.14))" : "rgba(255,255,255,0.04)",
              border: active === i ? "1px solid rgba(95,194,227,0.3)" : "1px solid rgba(148,163,184,0.1)"
            }}>
              <DynamicIcon name={s.icon} className="w-4 h-4" />
            </div>
            <span className="leading-tight hidden sm:block line-clamp-1" dangerouslySetInnerHTML={{ __html: s.title}}></span>
            <span className="leading-tight sm:hidden">{s.title.split(" ").slice(0, 3).join(" ")}…</span>
          </button>
        ))}
      </div>

      {/* ── Content panel ── */}
      <div
        className="grid lg:grid-cols-5 rounded-2xl overflow-hidden"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 220ms ease, transform 220ms ease",
          border: "1px solid rgba(95,194,227,0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          background: "rgba(8,14,30,0.95)"
        }}
      >
        {/* Left: all images stacked, only active one visible (no re-fetch on switch) */}
        <div className="lg:col-span-2 relative overflow-hidden" style={{ minHeight: "320px" }}>
          {serviceImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={servicesOffered[i].title}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? (fading ? "scale(1.04)" : "scale(1)") : "scale(1.02)",
                pointerEvents: "none"
              }}
            />
          ))}
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,14,30,0) 40%, rgba(8,14,30,0.92) 100%), linear-gradient(0deg, rgba(8,14,30,0.7) 0%, transparent 60%)" }} />
          {/* Cyan top bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6, transparent)" }} />
          {/* Icon badge */}
          <div className="absolute top-5 left-5 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(8,14,30,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(95,194,227,0.35)" }}>
            {(() => { const Icon = servicesOffered[active].icon; return <DynamicIcon name={Icon} className="w-6 h-6 text-accent" />; })()}
          </div>
          {/* Index number watermark */}
          <div className="absolute bottom-5 left-5 text-6xl font-black text-accent/10 leading-none select-none">
            0{active + 1}
          </div>
        </div>

        {/* Right: content (3/5) */}
        <div className="lg:col-span-3 p-7 lg:p-10 flex flex-col justify-center">
          <div className="w-8 h-[2px] mb-5" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6)" }} />
          <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">{servicesOffered[active].title}</h3>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed text-left mb-7" dangerouslySetInnerHTML={{ __html: he.decode(servicesOffered[active].description) }} />

          {/* Highlights grid */}

          {/* <div className="grid grid-cols-2 gap-2">
            {serviceHighlights[active].map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #5FC2E3, #0077B6)" }} />
                {h}
              </div>
            ))}
          </div> */}

          {/* Pagination dots */}
          <div className="flex gap-2 mt-8">
            {servicesOffered.map((_, i) => (
              <button
                key={i}
                onClick={() => switchTab(i)}
                className="transition-all duration-300"
                style={{
                  width: active === i ? "24px" : "8px",
                  height: "4px",
                  borderRadius: "2px",
                  background: active === i ? "linear-gradient(90deg, #5FC2E3, #0077B6)" : "rgba(148,163,184,0.25)"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const caseStudies = [
{ title: "Real-Time Analytics Pipeline for Healthcare", description: "Built a streaming data pipeline processing 10M+ events/day, reducing reporting latency from hours to seconds for a leading healthcare provider.", impact: "10x faster insights" },
{ title: "Cloud Migration for Fortune 500 Retailer", description: "Migrated 50TB+ legacy data warehouse to Snowflake with zero downtime, achieving 40% cost reduction and significant performance improvements.", impact: "40% cost savings" },
{ title: "Data Governance Framework for Fintech", description: "Implemented enterprise-wide data quality & governance framework ensuring regulatory compliance across 15+ data sources.", impact: "99.9% data accuracy" }];


// ══════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════

const DataEngineering = () => {
  const loaderData = useSafeLoaderData();
  const [activeCapTab, setActiveCapTab] = useState(0);
  const [capTabFading, setCapTabFading] = useState(false);
  const [indTab, setIndTab] = useState(0);
  const [indFading, setIndFading] = useState(false);
  const contactFormFields = loaderData?.contactFormFields ?? null;
  
  const handleIndTabChange = (i: number) => {
    if (i === indTab) return;
    setIndFading(true);
    setIndTab(i); // update immediately so image starts loading
    setTimeout(() => {setIndFading(false);}, 220);
  };
  const handleCapTabChange = (i: number) => {
    if (i === activeCapTab) return;
    setCapTabFading(true);
    setTimeout(() => {setActiveCapTab(i);setCapTabFading(false);}, 220);
  };
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const certRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
        });
      },
      { threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach((ref) => {if (ref) observer.observe(ref);});
    if (certRef.current) observer.observe(certRef.current);
    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {sectionRefs.current[id] = el;};

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

      
const engagementModels = loaderData?.data?.data?.data_engineers_engagement_models_section?.cards?.map((item) => {
  return {
    icon: item.icon,
    title: item.title,
    description: item.paragraph,
    image: item.image?.url || '',
    accentColor: item.accent_color || "#38BDF8",
    badge: item.tag,
    bullets: item.lists || []
  }
}) || [];

const advancedCapabilities = loaderData?.data?.data?.industries?.map((industry: any) => ({
  icon: industry.sdb.data_engineers_capabilities.icon,
  title: industry.post_title,
  contentTitle: industry.sdb.data_engineers_capabilities.content_heading,
  subtitle: industry.sdb.data_engineers_capabilities.content,
  liveText: industry.sdb.data_engineers_capabilities.live_text,
  items: industry.sdb.data_engineers_capabilities.right_blocks.map((block: any) => ({ label: block.heading, details: block.content }))
})) || [];

const industriesData = loaderData?.data?.data.industries_industries?.map((industry: any) => ({
  icon: industry.sdb.data_engineers_industries.icon,
  title: industry.post_title,
  image: industry.sdb.data_engineers_industries.image?.url || '',
  bullets: industry.sdb.data_engineers_industries.lists.map((block: any) => ({ label: block.list })),
  subHeading: industry.sdb.data_engineers_industries.sub_heading,
  activeText: industry.sdb.data_engineers_industries.active_text
})) || [];

const engineeringProcess = loaderData?.data?.data?.our_engineering_process_section?.cards?.map((card: any) => ({
  step: card.step,
  icon: card.icon,
  title: card.title,
  description: card.content,
  tag: card.tag
})) || [];

const techStack = loaderData?.data?.data?.data_engineering_technology_stack_section?.stack_lists?.map((list: any) => ({
  category: list.title,
  items: list.content
})) || [
// { category: "Cloud Platforms", items: ["AWS (S3, Glue, Redshift, EMR)", "Google Cloud (BigQuery, Dataflow)", "Azure (ADF, Synapse, ADLS)"] },
];

const whyChooseItems = loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.cards?.map((card: any) => ({
  icon: card.icon,
  title: card.title,
  description: card.content,
  tag: card.tag
})) || [];


const securityItems = loaderData?.data?.data?.digital_security_compliance_section?.content_blocks?.map((item) =>{
  return { 
    icon: item.icon, 
    title: item.title, 
    description: item.content,
  label: item.label
}
}) || [];

const testimonials = loaderData?.data?.data?.voices_testimonials?.map((item: any) => ({
  quote: item.post_content,
  name: item.post_title,
  role: item.acf.designation,
  company: item.acf.company
})) || [];


const faqs = loaderData?.data?.data?.frequently_asked_question?.map((item) => {
  return {
    q: item.post_title,
    a: item.post_content
  }
}) || [];

  return (
    <>
    <SeoTags
            title={loaderData?.data?.data?.seo?.title}
            description={loaderData?.data?.data?.seo?.description}
            ogImage={loaderData?.data?.data?.seo?.og_image}
          />
      {/* ====== HERO ====== */}
      <section className="relative py-8 lg:py-12 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)" }}>
        <NetworkCanvas />
        <PulsingGlow className="top-0 right-0 w-[600px] h-[600px]" />
        <PulsingGlow className="bottom-0 left-0 w-[500px] h-[500px]" color="rgba(0, 78, 158, 0.1)" />
        <FloatingParticles count={12} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-8 lg:pt-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left – Image */}
            <div className={`relative transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-12 scale-95"}`}>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(95, 194, 227, 0.1)" }}>
                  <img src={loaderData?.data?.data?.banner_section?.banner_image?.url} 
                    alt={loaderData?.data?.data?.banner_section?.banner_image?.alt}  className="w-full h-[350px] lg:h-[420px] object-cover transition-transform duration-[2s] hover:scale-105" style={{ filter: "brightness(0.9) contrast(1.05)" }} loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-accent/40 rounded-tl-3xl" style={{ animation: "pulse 3s ease-in-out infinite" }} />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-accent/40 rounded-br-3xl" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
                <div className={`absolute -right-4 top-1/4 p-4 rounded-xl backdrop-blur-xl transition-all duration-1000 hidden sm:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)", transitionDelay: "600ms", animation: "float 6s ease-in-out infinite" }}>
                  <div className="text-2xl font-bold text-accent font-mono">{loaderData?.data?.data?.banner_section?.floating_badge_fields && loaderData.data.data.banner_section.floating_badge_fields[1]?.badge_heading}</div>
                  <div className="text-xs text-muted-foreground">{loaderData?.data?.data?.banner_section?.floating_badge_fields && loaderData.data.data.banner_section.floating_badge_fields[1]?.badge_text}</div>
                </div>
                <div className={`absolute -left-4 bottom-1/4 p-4 rounded-xl backdrop-blur-xl transition-all duration-1000 hidden sm:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(95, 194, 227, 0.2)", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)", transitionDelay: "800ms", animation: "float 5s ease-in-out infinite", animationDelay: "2s" }}>
                  <div className="text-2xl font-bold text-accent font-mono">{loaderData?.data?.data?.banner_section?.floating_badge_fields && loaderData.data.data.banner_section.floating_badge_fields[0]?.badge_heading}</div>
                  <div className="text-xs text-muted-foreground">{loaderData?.data?.data?.banner_section?.floating_badge_fields && loaderData.data.data.banner_section.floating_badge_fields[0]?.badge_text}</div>
                </div>
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
              <a href={`${import.meta.env.BASE_URL}${loaderData?.data?.data?.banner_section?.cta_url?.replace(/^\/+/, "")}`}>
                <Button size="lg" className="group w-full sm:w-auto bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {loaderData?.data?.data?.banner_section?.cta_text} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={`mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl backdrop-blur-2xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(95,194,227,0.04) 50%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(95, 194, 227, 0.15)", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35)", transitionDelay: "1000ms" }}>
            <AnimatedStat value={loaderData?.data?.data?.stats_section?.stats_fields[0]?.stats_numbers} label={loaderData?.data?.data?.stats_section?.stats_fields[0]?.stats_title} delay={1100} isVisible={isVisible} />
            <AnimatedStat value={loaderData?.data?.data?.stats_section?.stats_fields[1]?.stats_numbers} label={loaderData?.data?.data?.stats_section?.stats_fields[1]?.stats_title} delay={1250} isVisible={isVisible} />
            <AnimatedStat value={loaderData?.data?.data?.stats_section?.stats_fields[2]?.stats_numbers} label={loaderData?.data?.data?.stats_section?.stats_fields[2]?.stats_title} delay={1400} isVisible={isVisible} />
            <AnimatedStat value={loaderData?.data?.data?.stats_section?.stats_fields[3]?.stats_numbers} label={loaderData?.data?.data?.stats_section?.stats_fields[3]?.stats_title} delay={1550} isVisible={isVisible} />
          </div>
        </div>
        <style>{`
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        `}</style>
      </section>

      {/* ====== ENTERPRISE CHALLENGES ====== */}
      <section id="challenges" ref={setSectionRef("challenges")} className="relative py-14 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 100%)" }}>
        <FloatingParticles count={8} />
        <PulsingGlow className="top-1/4 right-0 w-[500px] h-[400px]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-14 transition-all duration-700 ${visibleSections.challenges ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.data_engineers_data_challenges_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <div className="w-16 h-[2px] mx-auto" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6)" }} />
          </div>

          {/* Unique bento-style layout: large left card + stacked right cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
{loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks?.length && (<>
            {/* ── Card 1 – Large feature card (2/5 width) ── */}
            <div className={`lg:col-span-2 group relative rounded-2xl overflow-hidden transition-all duration-700 ${visibleSections.challenges ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ minHeight: "460px", transitionDelay: "0ms" }}>
              {/* Background image */}
              <img src={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[0]?.image?.url} alt={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[0]?.image?.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(5,10,25,0.97) 0%, rgba(5,10,25,0.75) 45%, rgba(5,10,25,0.3) 100%)" }} />
              {/* Cyan accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, transparent)" }} />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.25), rgba(0,119,182,0.15))", border: "1px solid rgba(95,194,227,0.35)", backdropFilter: "blur(8px)" }}>
                  <DynamicIcon name={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[0]?.icon} className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">{loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[0]?.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[0]?.description }} />
                {/* Bottom accent */}
                <div className="mt-5 w-10 h-[2px] group-hover:w-20 transition-all duration-500" style={{ background: "linear-gradient(90deg, #5FC2E3, #0077B6)" }} />
              </div>
            </div>

            {/* ── Right column: 2 stacked cards (3/5 width) ── */}
            <div className="lg:col-span-3 grid grid-rows-2 gap-5">

              {/* ── Card 2 – Horizontal split: image left + text right ── */}
              <div className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${visibleSections.challenges ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: "150ms" }}>
                <div className="flex flex-col sm:flex-row h-full" style={{ minHeight: "218px" }}>
                  {/* Image panel */}
                  <div className="relative sm:w-2/5 flex-shrink-0 overflow-hidden h-40 sm:h-auto">
                    <img src={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[1]?.image?.url} alt={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[1]?.image?.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,10,25,0) 60%, rgba(8,14,30,0.95) 100%)" }} />
                    {/* Accent line – bottom on mobile, right on desktop */}
                    <div className="absolute bottom-0 sm:bottom-auto sm:top-0 sm:bottom-0 sm:right-0 sm:w-[1px] h-[1px] sm:h-auto left-0 right-0" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, transparent)" }} />
                  </div>
                  {/* Text panel */}
                  <div className="flex-1 flex flex-col justify-center p-5 sm:p-6 lg:p-7 relative" style={{ background: "rgba(8,14,30,0.95)", border: "1px solid rgba(95,194,227,0.1)" }}>
                    <div className="absolute inset-0 rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(95,194,227,0.06) 0%, transparent 70%)" }} />
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 flex-shrink-0 relative z-10" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.12))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <DynamicIcon name={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[1]?.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 relative z-10" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[1]?.title }}></h3>
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[1]?.description }} />
                  </div>
                </div>
              </div>

              {/* ── Card 3 – Horizontal split: text left + image right ── */}
              <div className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${visibleSections.challenges ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: "300ms" }}>
                <div className="flex flex-col-reverse sm:flex-row h-full" style={{ minHeight: "218px" }}>
                  {/* Text panel */}
                  <div className="flex-1 flex flex-col justify-center p-5 sm:p-6 lg:p-7 relative" style={{ background: "rgba(8,14,30,0.95)", border: "1px solid rgba(95,194,227,0.1)" }}>
                    <div className="absolute inset-0 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(95,194,227,0.06) 0%, transparent 70%)" }} />
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 flex-shrink-0 relative z-10" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.12))", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <DynamicIcon name={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[2]?.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 relative z-10" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[2]?.title }}></h3>
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[2]?.description }} />
                  </div>
                  {/* Image panel */}
                  <div className="relative sm:w-2/5 flex-shrink-0 overflow-hidden h-40 sm:h-auto">
                    <img src={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[2]?.image?.url} alt={loaderData?.data?.data?.data_engineers_data_challenges_section?.blocks[2]?.image?.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,10,25,0) 60%, rgba(8,14,30,0.95) 100%)" }} />
                    {/* Accent line – bottom on mobile, left on desktop */}
                    <div className="absolute bottom-0 sm:bottom-auto sm:top-0 sm:bottom-0 sm:left-0 sm:w-[1px] h-[1px] sm:h-auto left-0 right-0" style={{ background: "linear-gradient(90deg, transparent, #5FC2E3, transparent)" }} />
                  </div>
                </div>
              </div>
            </div>
            </>
              )}
          </div>
        </div>
      </section>

      {/* ====== CTA 1 ====== */}
      <InlineCTA
        title={loaderData?.data?.data?.data_engineers_consultation_section?.heading}
        subtitle={loaderData?.data?.data?.data_engineers_consultation_section?.content}
        cta={loaderData?.data?.data?.data_engineers_consultation_section?.cta_text}
        ctaLink={loaderData?.data?.data?.data_engineers_consultation_section?.cta_url} />
      

      {/* ====== SERVICES OFFERED ====== */}
      <section id="services" ref={setSectionRef("services")} className="relative py-14 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 4.5%) 100%)" }}>
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.data_engineers_service_we_offer_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              {loaderData?.data?.data?.data_engineers_service_we_offer_section?.paragraph}
            </p>
          </div>

          {/* ── Interactive showcase: vertical tabs left + content right ── */}
          <ServicesShowcase data={loaderData?.data?.data?.data_engineers_service_we_offer_section?.blocks} isVisible={visibleSections.services} />
        </div>
      </section>

      {/* ====== ADVANCED CAPABILITIES ====== */}
      <section id="advanced" ref={setSectionRef("advanced")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 4.5%) 0%, hsl(220 50% 6%) 100%)" }}>
        <FloatingParticles count={8} />
        <PulsingGlow className="bottom-0 right-0 w-[500px] h-[400px]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.advanced ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              {loaderData?.data?.data?.paragraph}
            </p>
          </div>

          {/* ── Tab-panel layout ── */}
          <div className={`transition-all duration-700 ${visibleSections.advanced ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Top tab bar */}
            <div className="flex flex-wrap gap-2 mb-5 p-1 rounded-xl" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(95,194,227,0.1)" }}>
              {advancedCapabilities.map((c, i) =>
              <button
                key={i}
                onClick={() => handleCapTabChange(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex-1 min-w-fit justify-center ${activeCapTab === i ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
                style={activeCapTab === i ? {
                  background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.12))",
                  border: "1px solid rgba(95,194,227,0.35)",
                  boxShadow: "0 0 16px rgba(95,194,227,0.12)"
                } : { border: "1px solid transparent" }}>
                  <DynamicIcon name={c.icon} className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">{c.title.split("&")[0].trim()}</span>
                </button>
              )}
            </div>

            {/* Content panel */}
            <div
              className="transition-all duration-220"
              style={{ opacity: capTabFading ? 0 : 1, transform: capTabFading ? "translateY(6px)" : "translateY(0)", transition: "opacity 220ms ease, transform 220ms ease" }}>
              
            <div className="relative rounded-xl overflow-hidden" style={{
                background: "linear-gradient(135deg, hsl(222 47% 6.5%), hsl(210 60% 8%))",
                border: "1px solid rgba(95,194,227,0.2)",
                boxShadow: "0 8px 40px rgba(95,194,227,0.07), 0 4px 24px rgba(0,0,0,0.4)"
              }}>
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent/30" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/30" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-accent/30" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-accent/30" />
              <div className="flex flex-col lg:flex-row">
                {/* Left: header panel */}
                <div className="lg:w-64 flex-shrink-0 p-6 lg:p-7 flex flex-col justify-between"
                  style={{ borderRight: "1px solid rgba(95,194,227,0.1)", background: "linear-gradient(180deg, rgba(95,194,227,0.06) 0%, transparent 100%)" }}>
                  <div>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-accent mb-4"
                      style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.2), rgba(0,119,182,0.15))", border: "1px solid rgba(95,194,227,0.3)" }}>
                      {(() => {const Icon = advancedCapabilities[activeCapTab].icon;return <DynamicIcon name={Icon} className="w-5 h-5" />;})()}
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2 leading-snug" dangerouslySetInnerHTML={{ __html: advancedCapabilities[activeCapTab].contentTitle}}></h3>
                    <div className="w-8 h-[2px] mb-3" style={{ background: "linear-gradient(90deg, #5FC2E3, transparent)" }} />
                    <p className="text-sm text-muted-foreground leading-relaxed">{advancedCapabilities[activeCapTab].subtitle}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-accent text-xs font-semibold tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
                    {advancedCapabilities[activeCapTab].liveText}
                  </div>
                </div>
                {/* Right: items grid */}
                <div className="flex-1 p-6 lg:p-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {advancedCapabilities[activeCapTab].items.map((item, i) =>
                    <div key={i} className="flex flex-col gap-1.5 p-3.5 rounded-lg transition-colors duration-200 hover:bg-white/[0.03]"
                    style={{ border: "1px solid rgba(148,163,184,0.08)" }}>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#5FC2E3" }} />
                        <span className="text-sm font-bold text-foreground/90" dangerouslySetInnerHTML={{ __html: item.label}}></span>
                      </div>
                      <p className="text-[13px] text-muted-foreground leading-relaxed pl-3.5" dangerouslySetInnerHTML={{ __html: item.details}}></p>
                    </div>
                    )}
                </div>
              </div>
            </div>
            </div>{/* end fade wrapper */}

            {/* Tab progress dots */}
            <div className="flex justify-center gap-2 mt-4">
              {advancedCapabilities.map((_, i) =>
              <button key={i} onClick={() => handleCapTabChange(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeCapTab === i ? "24px" : "6px",
                height: "6px",
                background: activeCapTab === i ? "#5FC2E3" : "rgba(95,194,227,0.25)"
              }} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA 2 ====== */}
      <InlineCTA
        title={loaderData?.data?.data?.data_engineers_for_the_reliable_services_section?.heading}
        subtitle={loaderData?.data?.data?.data_engineers_for_the_reliable_services_section?.content}
        cta={loaderData?.data?.data?.data_engineers_for_the_reliable_services_section?.cta_text}
        ctaLink={loaderData?.data?.data?.data_engineers_for_the_reliable_services_section?.cta_url} />
      

      {/* ====== ENGAGEMENT MODELS ====== */}
      {/* ====== ENGAGEMENT MODELS ====== */}
      <section id="engagement" ref={setSectionRef("engagement")} className="relative py-14 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)" }}>
        <FloatingParticles count={8} />
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header */}
          <div className={`text-center mb-14 transition-all duration-700 ${visibleSections.engagement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#38BDF8] mb-3 px-3 py-1 rounded-full" style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)" }}>
              {loaderData?.data?.data?.data_engineers_engagement_models_section?.tag_heading}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.data_engineers_engagement_models_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {engagementModels.map((model, index) => (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-700 hover:-translate-y-2 ${visibleSections.engagement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
                style={{
                  transitionDelay: `${index * 180}ms`,
                  background: "linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(10,16,30,0.98) 100%)",
                  border: `1px solid rgba(${index === 0 ? "56,189,248" : index === 1 ? "167,139,250" : "52,211,153"},0.2)`,
                  boxShadow: `0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`
                }}
              >
                {/* Image block */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* dark gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(10,16,30,0.85) 100%)" }} />
                  {/* Badge */}
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ background: `${model.accentColor}22`, border: `1px solid ${model.accentColor}55`, color: model.accentColor }}
                  >
                    {model.badge}
                  </span>
                  {/* Icon */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${model.accentColor}22`, border: `1px solid ${model.accentColor}44` }}>
                    <DynamicIcon name={model.icon} className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Accent line */}
                  <div className="w-8 h-0.5 mb-4 rounded-full" style={{ background: `linear-gradient(90deg, ${model.accentColor}, transparent)` }} />
                  <h3 className="text-lg font-bold text-foreground mb-3 leading-tight">{model.title}</h3>
                  <p className="text-sm leading-relaxed mb-5 text-left" style={{ color: "#A7B0C0" }} dangerouslySetInnerHTML={{__html:model.description}}></p>

                  {/* Bullet highlights */}
                  {/* <div className="mt-auto grid grid-cols-2 gap-2">
                    {model.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#CBD5E1" }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: model.accentColor }} />
                        {b}
                      </div>
                    ))}
                  </div> */}
                  <div className="mt-auto grid grid-cols-2 gap-2" dangerouslySetInnerHTML={{__html: he.decode(model.bullets)}}>
                  </div>
                </div>

                {/* Bottom accent glow bar */}
                <div className="h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${model.accentColor}, transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INDUSTRIES ====== */}
      <section id="industries" ref={setSectionRef("industries")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(95,194,227,0.04) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">

          {/* Header */}
          <div className={`mb-8 transition-all duration-700 ${visibleSections.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.industries_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} ></h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
              {loaderData?.data?.data?.industries_paragraph}
            </p>
          </div>

          {/* Split layout: left sidebar tabs + right content panel */}
          <div className={`flex flex-col lg:flex-row gap-4 transition-all duration-700 delay-200 ${visibleSections.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:w-[220px] flex-shrink-0 pb-2 lg:pb-0">
              {industriesData.map((ind, i) => {
                const isActive = indTab === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleIndTabChange(i)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink w-full ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
                    style={isActive ? {
                      background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.12))",
                      border: "1px solid rgba(95,194,227,0.3)",
                      boxShadow: "0 0 16px rgba(95,194,227,0.08)"
                    } : {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)"
                    }}>
                    
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive ? "text-accent" : "text-muted-foreground"}`}
                    style={{ background: isActive ? "rgba(95,194,227,0.15)" : "rgba(255,255,255,0.05)" }}>
                      <DynamicIcon name={ind.icon} className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs">{ind.title}</span>
                    {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-accent hidden lg:block" />}
                  </button>);

              })}
            </div>

            <div className="flex-1 min-w-0">
              <div className="relative rounded-2xl overflow-hidden" style={{
                border: "1px solid rgba(95,194,227,0.15)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)"
              }}>
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent/40 rounded-tl-sm z-10" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/40 rounded-tr-sm z-10" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-accent/40 rounded-bl-sm z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-accent/40 rounded-br-sm z-10" />

                {/* Preload all industry images for instant switching */}
                <div className="hidden">
                  {industriesData.map((ind, i) =>
                  <img key={i} src={ind.image} alt="" loading="eager" />
                  )}
                </div>

                {/* Banner Image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ height: "160px", opacity: indFading ? 0 : 1, transition: "opacity 220ms ease" }}>
                  
                  <img
                    src={industriesData[indTab].image}
                    alt={industriesData[indTab].title}
                    className="w-full h-full object-cover object-center transition-all duration-500" />
                  
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,11,18,0.2) 0%, rgba(7,11,18,0.75) 100%)" }} />
                  {/* Overlay label */}
                  <div className="absolute bottom-4 left-6 z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent flex-shrink-0"
                    style={{ background: "rgba(10,20,40,0.85)", border: "1px solid rgba(95,194,227,0.3)", backdropFilter: "blur(8px)" }}>
                      {(() => {const Icon = industriesData[indTab].icon;return <DynamicIcon name={Icon} className="w-5 h-5" />;})()}
                    </div>
                    <div>
                      <p className="text-foreground font-bold text-base leading-tight">{industriesData[indTab].title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-xs text-accent/70 font-medium">{industriesData[indTab].activeText}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capabilities below the banner */}
                <div
                  className="p-6 lg:p-7"
                  style={{
                    background: "linear-gradient(135deg, hsl(222 47% 6.5%), hsl(210 60% 8%))",
                    opacity: indFading ? 0 : 1, transform: indFading ? "translateY(6px)" : "translateY(0)", transition: "opacity 220ms ease, transform 220ms ease"
                  }}>
                  
                  <p className="text-xs text-accent/60 font-semibold tracking-widest uppercase mb-4">{industriesData[indTab].subHeading}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {industriesData[indTab].bullets.map((b, i) =>
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl"
                    style={{ background: "rgba(95,194,227,0.04)", border: "1px solid rgba(95,194,227,0.08)" }}>
                        <CheckCircle className="w-4 h-4 text-accent/70 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-snug">{b.label}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-5">
            {industriesData.map((_, i) =>
            <button key={i} onClick={() => handleIndTabChange(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: indTab === i ? "24px" : "6px",
              height: "6px",
              background: indTab === i ? "linear-gradient(90deg, #5FC2E3, #0077B6)" : "rgba(95,194,227,0.25)"
            }} />
            )}
          </div>
        </div>
      </section>

      {/* ====== ENGINEERING PROCESS ====== */}
      <section id="process" ref={setSectionRef("process")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)" }}>
        <FloatingParticles count={6} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(56,189,248,0.04) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">

          {/* Header */}
          <div className={`mb-12 transition-all duration-700 ${visibleSections.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.our_engineering_process_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}></h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xl">{loaderData?.data?.data?.our_engineering_process_section?.paragraph}</p>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {engineeringProcess.map((item, index) =>
            <div key={index} className={`group relative transition-all duration-700 hover:-translate-y-1 ${visibleSections.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: `${index * 120}ms` }}>
                {index < engineeringProcess.length - 1 &&
              <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 w-8 z-20 items-center justify-center">
                    <div className="w-full h-px" style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.5), rgba(56,189,248,0.1))" }} />
                    <div className="absolute right-0 w-0 h-0" style={{ borderTop: "3px solid transparent", borderBottom: "3px solid transparent", borderLeft: "5px solid rgba(56,189,248,0.4)" }} />
                  </div>
              }
                <div className="h-full rounded-2xl p-6 flex flex-col relative overflow-hidden" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)" }} />
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(37,99,235,0.1))", border: "1px solid rgba(56,189,248,0.2)" }}>
                    <DynamicIcon name={item.icon} className="w-5 h-5 text-accent" />
                  </div>
                  {/* Phase label */}
                  <span className="text-xs font-semibold tracking-widest text-accent/50 uppercase mb-1">{item.tag}</span>
                  {/* Title */}
                  <h3 className="text-foreground font-bold text-base mb-3 group-hover:text-accent transition-colors duration-300" dangerouslySetInnerHTML={{ __html: item.title}}></h3>
                  {/* Divider */}
                  <div className="w-8 h-px mb-4" style={{ background: "rgba(56,189,248,0.3)" }} />
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-[1.75] text-left flex-1"  dangerouslySetInnerHTML={{ __html: item.description}}></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== CTA 3 ====== */}
      <InlineCTA
        title={loaderData?.data?.data?.data_engineers_hire_experts_section?.heading}
        subtitle={loaderData?.data?.data?.data_engineers_hire_experts_section?.content}
        cta={loaderData?.data?.data?.data_engineers_hire_experts_section?.cta_text}
        ctaLink={loaderData?.data?.data?.data_engineers_hire_experts_section?.cta_url} />
      

      {/* ====== TECH STACK ====== */}
      <section id="techstack" ref={setSectionRef("techstack")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`, backgroundSize: "60px 60px" }} />
        <PulsingGlow className="top-20 left-0 w-[400px] h-[400px]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.techstack ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.data_engineering_technology_stack_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {techStack.map((stack, index) =>
            <div key={index} className={`group p-5 rounded-xl transition-all duration-500 hover:-translate-y-1 ${visibleSections.techstack ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transitionDelay: `${index * 100}ms` }}>
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3" dangerouslySetInnerHTML={{__html: he.decode(stack.category)}}></h3>
                <div className="w-8 h-[1px] mb-3 opacity-40" style={{ background: "linear-gradient(90deg, #5FC2E3, transparent)" }} />
                {/* <ul className="space-y-2">
                  {stack.items.map((item, i) =>
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                      <Server className="w-3 h-3 text-accent/50 flex-shrink-0" />{item}
                    </li>
                )}
                </ul> */}
                <div dangerouslySetInnerHTML={{__html: he.decode(stack.items)}}></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section id="whychoose" ref={setSectionRef("whychoose")} className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, hsl(220 60% 4%) 0%, hsl(215 55% 7%) 50%, hsl(220 60% 4%) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse 80% 50% at 10% 50%, rgba(0,119,182,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 30%, rgba(95,194,227,0.08) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(95,194,227,0.5) 40px)" }} />
        <FloatingParticles count={10} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Heading + sub-stats row */}
          <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 transition-all duration-700 ${visibleSections.whychoose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} ></h2>
              <p className="mt-3 text-sm lg:text-base max-w-xl" style={{ color: "rgba(180,210,240,0.60)" }}>{loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.paragraph}
              </p>
            </div>
            {/* Inline KPIs */}
            <div className="flex gap-8 shrink-0">
              {[{ val: loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.count_number_1, lbl: loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.count_text_1 }, { val: loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.count_number_2, lbl: loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.count_text_2 }, { val: loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.count_number_3, lbl: loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.count_text_3 }].map((k, i) =>
              <div key={i} className="text-center">
                  <div className="text-2xl lg:text-3xl font-black" style={{ background: "linear-gradient(135deg,#5FC2E3,#0077B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{k.val}</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(180,210,240,0.55)" }}>{k.lbl}</div>
                </div>
              )}
            </div>
          </div>

          {/* 3-col card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyChooseItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${visibleSections.whychoose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                  style={{
                    background: "linear-gradient(145deg, rgba(19,42,74,0.80) 0%, rgba(11,18,32,0.70) 100%)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(95,194,227,0.12)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(95,194,227,0.07)",
                    transitionDelay: `${index * 100}ms`
                  }}>
                  
                  {/* Hover radial glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(95,194,227,0.12) 0%, transparent 60%)" }} />
                  {/* Top edge glow */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent 5%, #5FC2E3 50%, transparent 95%)" }} />
                  {/* Left accent bar */}
                  <div className="absolute top-6 left-0 w-0.5 h-12 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: "linear-gradient(180deg, #5FC2E3, rgba(0,119,182,0.3))" }} />

                  <div className="relative z-10 p-7 flex flex-col gap-5 h-full">
                    {/* Icon badge */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: "linear-gradient(135deg, rgba(0,119,182,0.35), rgba(95,194,227,0.15))", border: "1px solid rgba(95,194,227,0.22)" }}>
                      <DynamicIcon name={item.icon} />
                    </div>
                    {/* Title */}
                    <h3 className="text-base lg:text-lg font-bold text-foreground leading-snug group-hover:text-[#5FC2E3] transition-colors duration-300" dangerouslySetInnerHTML={{ __html: item.title}}></h3>
                    {/* Divider */}
                    <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, #5FC2E3, transparent)" }} />
                    {/* Description */}
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(180,210,240,0.68)" }}>{item.description}</p>
                    {/* Footer tag */}
                    <div className="mt-auto pt-4 border-t" style={{ borderColor: "rgba(95,194,227,0.08)" }}>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(95,194,227,0.07)", border: "1px solid rgba(95,194,227,0.14)", color: "#5FC2E3" }}>
                        <CheckCircle size={11} />
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  {/* Watermark index */}
                  <div className="absolute bottom-4 right-5 text-[72px] font-black leading-none select-none pointer-events-none" style={{ color: "rgba(95,194,227,0.03)", fontFamily: "JetBrains Mono, monospace" }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>);

            })}
          </div>

          {/* Bottom trust strip */}
          <div className={`mt-10 flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-500 ${visibleSections.whychoose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {loaderData?.data?.data?.data_engineers_benefits_of_choosing_section?.bottom_bullets?.map((item, index) => (
  <div
    key={index}
    className="flex items-center gap-2 text-sm font-medium"
    style={{ color: "rgba(180,210,240,0.55)" }}
  >
    <div className="w-1 h-1 rounded-full" style={{ background: "#5FC2E3" }} />
    {item.label}
  </div>
))}
          </div>
        </div>
      </section>

      {/* ====== CASE STUDIES ====== */}
      {/* <section id="casestudies" ref={setSectionRef("casestudies")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}>
        <PulsingGlow className="top-1/4 right-0 w-[400px] h-[400px]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.casestudies ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Data Engineering <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Case Studies</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {caseStudies.map((cs, index) =>
            <div key={index} className={`group relative p-6 rounded-xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.casestudies ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transitionDelay: `${index * 150}ms` }}>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(95,194,227,0.06) 0%, transparent 60%)" }} />
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-4">{cs.impact}</div>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent/90 transition-colors duration-300">{cs.title}</h3>
                  <p className="text-muted-foreground text-sm leading-[1.7] text-justify">{cs.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section> */}

      {/* ====== SECURITY & COMPLIANCE ====== */}
      <section id="security" ref={setSectionRef("security")} className="relative py-12 lg:py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}>
        <FloatingParticles count={8} />
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(56,189,248,0.04) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">

          {/* Header */}
          <div className={`mb-12 transition-all duration-700 ${visibleSections.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.digital_security_compliance_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}></h2>
                <p className="text-muted-foreground text-sm mt-2 max-w-xl">{loaderData?.data?.data?.digital_security_compliance_section?.paragraph}</p>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {loaderData?.data?.data?.digital_security_compliance_section?.tags?.map((badge, i) =>
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", color: "#5FC2E3" }}>
                    <Shield className="w-3 h-3" />
                    {badge.label}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {securityItems.map((item, index) =>
            <div key={index} className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${visibleSections.security ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", transitionDelay: `${index * 120}ms` }}>
                {/* Hover glow line */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)" }} />
                <div className="flex flex-col lg:flex-row gap-0">
                  {/* Left: icon + title */}
                  <div className="flex items-start gap-4 p-6 lg:p-7 lg:w-72 lg:flex-shrink-0 lg:border-r" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(37,99,235,0.1))", border: "1px solid rgba(56,189,248,0.2)" }}>
                      <DynamicIcon name={item.icon} className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-sm lg:text-base leading-snug group-hover:text-accent transition-colors duration-300" dangerouslySetInnerHTML={{ __html: item.title}}></h3>
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-accent/60 text-xs font-medium">{item.label}</span>
                      </div>
                    </div>
                  </div>
                  {/* Right: description */}
                  <div className="flex-1 p-6 lg:p-7 flex items-center">
                    <p className="text-muted-foreground text-sm leading-[1.8] text-left" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== CERTIFICATIONS ====== */}
      <CertificationsSection certificationData={loaderData.data?.data?.certifications_section} sectionRef={certRef as any} isVisible={visibleSections.security || false} />

      {/* ====== CTA 4 ====== */}
      <InlineCTA
        title={loaderData?.data?.data?.data_engineers_security_brief_cta_section?.heading}
        subtitle={loaderData?.data?.data?.data_engineers_security_brief_cta_section?.content}
        cta={loaderData?.data?.data?.data_engineers_security_brief_cta_section?.cta_text}
        ctaLink={loaderData?.data?.data?.data_engineers_security_brief_cta_section?.cta_url} />
      

      {/* ====== TESTIMONIALS ====== */}
      <section id="testimonials" ref={setSectionRef("testimonials")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.voices_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}></h2>
            <div className="relative w-24 h-px mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {testimonials.map((t, index) =>
            <div key={index} className={`group relative rounded-2xl transition-all duration-500 hover:-translate-y-1 ${visibleSections.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/15 backdrop-blur-md border border-border/20 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/10" />
                <div className="relative p-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                    <Quote className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: t.quote }}></p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center">
                      <span className="text-foreground font-semibold text-xs">{t.name.split(" ").map((n) => n[0]).join("")}</span>
                    </div>
                    <div>
                      <h4 className="text-foreground font-semibold text-sm">{t.name}</h4>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                      <p className="text-accent/80 text-xs">{t.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== FAQs ====== */}
      <section id="faqs" ref={setSectionRef("faqs")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-3xl">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.faqs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{__html: addClassToSpan(loaderData?.data?.data?.faq_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}></h2>
          </div>
          <Accordion type="single" collapsible className={`space-y-3 transition-all duration-700 ${visibleSections.faqs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {faqs.map((faq, index) =>
            <AccordionItem key={index} value={`faq-${index}`} className="border-none rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <AccordionTrigger className="px-5 py-4 text-foreground hover:text-accent hover:no-underline text-left text-sm font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-muted-foreground text-sm leading-[1.7]">{faq.a}</AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </section>

      {/* ====== BLOGS ====== */}
      {/* <section id="blogs" ref={setSectionRef("blogs")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`text-center mb-10 transition-all duration-700 ${visibleSections.blogs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Latest <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Insights</span> on Data Engineering
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {[
            { title: "Building Real-Time Data Pipelines with Apache Kafka", tag: "Data Streaming", excerpt: "Learn how to architect high-throughput, low-latency data pipelines using Kafka for real-time analytics." },
            { title: "Data Lakehouse: The Future of Data Architecture", tag: "Architecture", excerpt: "Discover why leading enterprises are adopting the lakehouse paradigm to unify their data strategy." },
            { title: "DataOps Best Practices for Enterprise Teams", tag: "DataOps", excerpt: "Implement CI/CD for data pipelines and automate quality checks for reliable, production-grade data systems." }].
            map((blog, index) =>
            <div key={index} className={`group relative p-6 rounded-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${visibleSections.blogs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transitionDelay: `${index * 150}ms` }}>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(95,194,227,0.06) 0%, transparent 60%)" }} />
                <div className="relative z-10">
                  <span className="text-[10px] font-semibold text-accent/60 uppercase tracking-wider">{blog.tag}</span>
                  <h3 className="text-base font-bold text-foreground mt-2 mb-3 group-hover:text-accent transition-colors duration-300">{blog.title}</h3>
                  <p className="text-muted-foreground text-sm leading-[1.7] mb-4">{blog.excerpt}</p>
                  <div className="flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    <BookOpen className="w-4 h-4" />Read More <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section> */}

      {/* ====== FAQs ====== */}
      {/* ====== CONTACT ====== */}
      <section id="contact" ref={setSectionRef("contact")} className="relative py-10 lg:py-14 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 50% 6%) 0%, hsl(222 47% 5%) 100%)" }}>
        <PulsingGlow className="top-0 left-0 w-[500px] h-[500px]" />
        <FloatingParticles count={6} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-700 ${visibleSections.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="inline-block text-xs font-semibold tracking-[0.25em] text-accent/70 mb-3 uppercase">{loaderData?.data?.data?.services_get_started_section_section?.small_heading}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(loaderData?.data?.data?.services_get_started_section_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base mb-4 text-left">
                {loaderData?.data?.data?.services_get_started_section_section?.paragraph}
              </p>
              <div className="space-y-2">
                {loaderData?.data?.data?.services_get_started_section_section?.lists?.map((item, index) =>
                <div key={index} className={`flex items-center gap-3 transition-all duration-500 ${visibleSections.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}>
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground/80" dangerouslySetInnerHTML={{ __html: item.list}}></span>
                  </div>
                )}
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${visibleSections.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="p-6 lg:p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(95,194,227,0.05)" }}>
                <ContactUsForm contactFormFields={contactFormFields} onSubmit={handleFormSubmit} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>);

};

export default DataEngineering;