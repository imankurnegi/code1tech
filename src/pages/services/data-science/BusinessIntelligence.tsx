import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Sparkles, FileCheck, Quote } from "lucide-react";
import { useState } from "react";
import ContactUsForm from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";
import { DynamicIcon } from "@/components/DynamicIcon";
import { addClassToSpan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { useInViewMap } from "@/hooks/useInView";


const cardStyle = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(148,163,184,0.12)",
};
function decodeHTMLEntities(str: string) {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}
// ─── DATA ────────────────────────────────────────────────────────────────

const InlineCTA = ({ title, sub, btn, btnUrl }: { title: string; sub: string; btn: string; btnUrl: string }) => (
  <div style={{ background: "#070B12" }} className="py-6">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7" style={{ background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)", border: "1px solid rgba(148,163,184,0.15)", boxShadow: "0 4px 32px rgba(0,0,0,0.6)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(120,60,220,0.28) 0%, transparent 70%)", filter: "blur(24px)" }} />
          <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
        </div>
        <div className="flex-1 relative z-10 text-left">
          <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{sub}</p>
        </div>
        <Link to={btnUrl} className="flex-shrink-0 relative z-10">
          <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
            {btn}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

// ─── Dashboard preview mocks ───
const ExecutiveMock = ({ data }: { data?: any }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {(data?.kpi || []).map((k: any, i: number) => (
          <div key={i} className="rounded-lg p-3" style={{ background: "rgba(95,194,227,0.06)", border: "1px solid rgba(95,194,227,0.15)" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k.l}</div>
            <div className="text-base font-bold text-foreground font-mono mt-1">{k.v}</div>
            <div className="text-[10px] text-accent font-mono mt-0.5">{k.d}</div>
          </div>
        ))}
      </div>
      {data?.chartTitle && (
        <div className="rounded-lg p-3" style={{ background: "rgba(95,194,227,0.04)", border: "1px solid rgba(95,194,227,0.12)" }}>
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">{data.chartTitle}</div>
          <div className="flex items-end gap-1.5 h-24">
            {(data?.chartData || []).map((h: number, i: number) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: "linear-gradient(180deg, #5FC2E3 0%, #0077B6 100%)", opacity: 0.85 }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const KpiMock = ({ data }: { data?: any }) => {
  return (
    <div className="space-y-3">
      {data?.gaugeValue && (
        <div className="rounded-lg p-4 flex items-center justify-center" style={{ background: "rgba(95,194,227,0.04)", border: "1px solid rgba(95,194,227,0.12)" }}>
          <svg viewBox="0 0 160 96" className="w-full max-w-[220px]">
            <path d="M16,80 A64,64 0 0 1 144,80" fill="none" stroke="rgba(95,194,227,0.18)" strokeWidth="10" strokeLinecap="round" />
            <path d="M16,80 A64,64 0 0 1 128,32" fill="none" stroke="url(#kpig)" strokeWidth="10" strokeLinecap="round" />
            <defs>
              <linearGradient id="kpig" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5FC2E3" />
                <stop offset="100%" stopColor="#0077B6" />
              </linearGradient>
            </defs>
            <text x="80" y="74" textAnchor="middle" fill="#fff" fontFamily="JetBrains Mono, monospace" fontSize="22" fontWeight="700">{data.gaugeValue}</text>
            <text x="80" y="88" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace" fontSize="8">{data.gaugeLabel || ""}</text>
          </svg>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {(data?.kpi || []).map((k: any, i: number) => (
          <div key={i} className="rounded-lg p-2.5 flex items-center justify-between" style={{ background: "rgba(95,194,227,0.05)", border: "1px solid rgba(95,194,227,0.12)" }}>
            <span className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">{k.l}</span>
            <span className="text-sm font-bold text-foreground font-mono">{k.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReportingMock = ({ data }: { data?: any }) => (
  <div className="rounded-lg overflow-hidden" style={{ background: "rgba(95,194,227,0.04)", border: "1px solid rgba(95,194,227,0.12)" }}>
    <div className="px-3 py-2 flex items-center gap-2 border-b" style={{ borderColor: "rgba(95,194,227,0.10)", background: "rgba(0,0,0,0.2)" }}>
      <FileCheck className="w-3.5 h-3.5 text-accent" />
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{data?.title || ""}</span>
    </div>
    <div className="divide-y" style={{ borderColor: "rgba(95,194,227,0.08)" }}>
      {(data?.rows || []).map((r: any, i: number) => (
        <div key={i} className="px-3 py-2 flex items-center justify-between text-xs" style={{ borderColor: "rgba(95,194,227,0.08)" }}>
          <span className="text-foreground/85">{r.d}</span>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-mono uppercase tracking-wider ${r.t === "ok" ? "text-accent" : "text-yellow-400/80"}`}>{r.s}</span>
            <span className="text-foreground font-mono w-20 text-right">{r.v}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SelfServeMock = ({ data }: { data?: any }) => (
  <div className="space-y-3">
    <div className="rounded-lg p-3" style={{ background: "rgba(95,194,227,0.04)", border: "1px solid rgba(95,194,227,0.12)" }}>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{data?.dragLabel || ""}</div>
      <div className="flex flex-wrap gap-1.5">
        {(data?.fields || []).map((f: string, i: number) => (
          <span key={i} className="px-2 py-1 rounded text-[11px] font-mono text-foreground/80" style={{ background: "rgba(95,194,227,0.10)", border: "1px dashed rgba(95,194,227,0.30)" }}>
            {f}
          </span>
        ))}
      </div>
    </div>
    <div className="rounded-lg p-3" style={{ background: "rgba(95,194,227,0.04)", border: "1px solid rgba(95,194,227,0.12)" }}>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{data?.viewLabel || ""}</div>
      <div className="space-y-1.5">
        {(data?.bars || []).map((b: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-muted-foreground w-12">{b.l}</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(95,194,227,0.10)" }}>
              <div className="h-full rounded-full" style={{ width: `${b.v}%`, background: "linear-gradient(90deg, #5FC2E3 0%, #0077B6 100%)" }} />
            </div>
            <span className="text-[11px] font-mono text-foreground/80 w-8 text-right">{b.v}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RealtimeMock = ({ data }: { data?: any }) => (
  <div className="space-y-3">
    <div className="rounded-lg p-3" style={{ background: "rgba(95,194,227,0.04)", border: "1px solid rgba(95,194,227,0.12)" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{data?.sessionsLabel || ""}</span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> {data?.streamingLabel || ""}
        </span>
      </div>
      <div className="flex items-end justify-between gap-1 h-20">
        <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rtfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5FC2E3" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0077B6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,55 L20,48 L40,52 L60,38 L80,42 L100,28 L120,35 L140,22 L160,30 L180,18 L200,24 L200,80 L0,80 Z" fill="url(#rtfill)" />
          <path d="M0,55 L20,48 L40,52 L60,38 L80,42 L100,28 L120,35 L140,22 L160,30 L180,18 L200,24" fill="none" stroke="#5FC2E3" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-xl font-bold text-foreground font-mono">{data?.currentValue || ""}</span>
        <span className="text-[10px] text-accent font-mono">{data?.change || ""}</span>
      </div>
    </div>
    <div className="rounded-lg p-3 space-y-1.5" style={{ background: "rgba(95,194,227,0.04)", border: "1px solid rgba(95,194,227,0.12)" }}>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{data?.eventLabel || ""}</div>
      {(data?.events || []).map((r: any, i: number) => (
        <div key={i} className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-muted-foreground">{r.t}</span>
          <span className="text-foreground/85 flex-1 px-2 truncate">{r.e}</span>
          <span className="text-accent">{r.v}</span>
        </div>
      ))}
    </div>
  </div>
);

const getDashboardCardDescription = (html: string) => {
  if (!html) return "";
  if (!html.includes("<")) return html;
  const regex = /<p class="text-sm lg:text-\[15px\] text-muted-foreground leading-relaxed">([\s\S]*?)<\/p>/g;
  let match;
  let last = "";
  while ((match = regex.exec(html)) !== null) {
    last = match[1];
  }
  return last;
};

const RenderIcon = ({ icon, className }: any) => {
  if (!icon) return null;
  if (typeof icon === "string") return <DynamicIcon name={icon} className={className} />;
  const IconComp = icon as any;
  return <IconComp className={className} />;
};

const ModernBITabs = ({ tabs }: { tabs: any[] }) => {
  const [active, setActive] = useState(0);
    const m = tabs[active];
  
    const Visual = ({ i }: { i: number }) => {
       if (i === 0) return (
      <>
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-mono text-[#5FC2E3]" style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(148,163,184,0.2)" }}>REAL-TIME FEED</div>
        <div className="absolute top-3 right-3 flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent/20" />
        </div>
        <div className="relative flex gap-3 items-end">
          {[44, 76, 100, 56, 88, 64].map((h, k) => (
            <div key={k} className="w-7 lg:w-9 rounded-t-md" style={{ height: `${h * 1.5}px`, background: k === 2 ? "linear-gradient(to top, #0077B6, #5FC2E3)" : `rgba(95,194,227,${0.18 + k * 0.06})`, border: "1px solid rgba(95,194,227,0.35)" }} />
          ))}
        </div>
      </>
    );
    if (i === 1) return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full border border-dashed" style={{ borderColor: "rgba(95,194,227,0.3)", animation: "spin 14s linear infinite" }} />
        <div className="absolute w-20 h-20 rounded-full blur-xl opacity-40 bg-gradient-to-br from-[#5FC2E3] to-[#0077B6]" />
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="absolute w-3 h-3 rounded-full bg-[#5FC2E3]" style={{ transform: `rotate(${k * 90}deg) translateY(-80px)`, boxShadow: "0 0 12px rgba(95,194,227,0.9)" }} />
        ))}
        <div className="w-3.5 h-3.5 rounded-full bg-foreground/80" style={{ boxShadow: "0 0 14px rgba(255,255,255,0.6)" }} />
      </div>
    );
    if (i === 2) return (
      <div className="flex items-center gap-6">
        <div className="px-6 py-4 rounded-lg" style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(95,194,227,0.25)" }}>
          <div className="w-12 h-[2px] mb-2 rounded-full bg-[#5FC2E3]" />
          <div className="text-foreground font-bold text-3xl font-mono leading-none">98<span className="text-accent text-xl">%</span></div>
        </div>
        <div className="text-accent/40 text-2xl">→</div>
        <div className="px-6 py-4 rounded-lg" style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(0,119,182,0.35)" }}>
          <div className="w-12 h-[2px] mb-2 rounded-full bg-[#0077B6]" />
          <div className="text-foreground font-bold text-3xl font-mono leading-none">+24<span className="text-accent text-xl">%</span></div>
        </div>
      </div>
    );
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 320 120" preserveAspectRatio="none" className="absolute inset-0">
            <defs>
              <linearGradient id="biGrowthGrad" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#5FC2E3" />
                <stop offset="1" stopColor="#0077B6" />
              </linearGradient>
              <linearGradient id="biGrowthFill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#5FC2E3" stopOpacity="0.25" />
                <stop offset="1" stopColor="#5FC2E3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 100 C40 100 60 90 90 75 C120 60 150 65 180 45 C210 28 250 30 290 12 L320 8 L320 120 L0 120 Z" fill="url(#biGrowthFill)" />
            <path d="M0 100 C40 100 60 90 90 75 C120 60 150 65 180 45 C210 28 250 30 290 12 L320 8" stroke="url(#biGrowthGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(95,194,227,0.5)]" />
            <circle cx="290" cy="12" r="5" fill="#5FC2E3" className="drop-shadow-[0_0_10px_rgba(95,194,227,0.9)]" />
          </svg>
        </div>
      );
    };
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 lg:gap-6">
        {/* Tab rail */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar p-2 rounded-2xl"
          style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.55), rgba(11,18,32,0.35))", border: "1px solid rgba(148,163,184,0.12)" }}>
          {tabs.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`group relative flex items-center gap-3 text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex-shrink-0 lg:flex-shrink ${isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"}`}
                style={isActive ? { border: "1px solid rgba(95,194,227,0.32)", boxShadow: "0 0 24px rgba(95,194,227,0.10) inset" } : { border: "1px solid rgba(148,163,184,0.08)" }}
              >
                {isActive && <span className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-[#5FC2E3] to-[#0077B6]" />}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isActive ? "scale-105" : ""}`}
                  style={{ background: isActive ? "linear-gradient(135deg, rgba(95,194,227,0.20), rgba(0,119,182,0.14))" : "rgba(95,194,227,0.08)", border: `1px solid ${isActive ? "rgba(95,194,227,0.35)" : "rgba(95,194,227,0.18)"}` }}>
                  <DynamicIcon name={t.icon} className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-semibold leading-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>{t.title}</div>
                </div>
              </button>
            );
          })}
        </div>
  
        {/* Panel */}
        <div key={active} className="relative rounded-2xl overflow-hidden animate-fade-in"
          style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.7), rgba(11,18,32,0.5))", border: "1px solid rgba(148,163,184,0.12)", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Visualization */}
            <div className="relative h-64 md:h-auto md:min-h-[340px] overflow-hidden flex items-center justify-center" style={{ background: "rgba(8,13,24,0.55)", borderRight: "1px solid rgba(148,163,184,0.08)" }} dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(m?.image_data) }}>
              {/* <Visual i={active} /> */}
            </div>
            {/* Text */}
            <div className="p-7 lg:p-9 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.10))", border: "1px solid rgba(95,194,227,0.28)" }}>
                  <DynamicIcon name={m.icon} className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-snug text-left">{m.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">{m.content}</p>
              <div className="mt-5 h-px w-12 bg-accent/40" />
            </div>
  
          </div>
        </div>
      </div>
  );
};




const BusinessIntelligence = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const [activeDash, setActiveDash] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeWhy, setActiveWhy] = useState(0);

  const { data, isLoading, error } = useQuery({
      queryKey: ["business-intelligence-engineers"],
      queryFn: api.getBusinessIntelligenceEngineers,
    });
  
    if (isLoading) return null;
    if (error) return null;
  
    const pageData = data?.data;

  // Extract data from JSON with defensive fallbacks
  const bannerSection = pageData?.banner_section ?? {};
  const whyModernSection = pageData?.why_businesses_need_modern_business_intelligence_services ?? {};
  const dataEngineerCta = pageData?.data_engineers_security_brief_cta ?? {};
  const comprehensiveSection = pageData?.comprehensive_business_intelligence_and_data_analytics_services ?? {};
  const analyticsConsultingSection = pageData?.data_analytics_consulting_services ?? {};
  const biConsultingSection = pageData?.business_intelligence_consulting_services ?? {};
  const dashboardSection = pageData?.business_intelligence_solutions_and_dashboard_development ?? {};
  const onDemandCta = pageData?.on_demand_cta ?? {};
  const processSection = pageData?.how_our_business_intelligence_experts_help_you_from_strategy_to_business_impact ?? {};
  const industriesSection = pageData?.industry_specific_business_intelligence_solutions ?? {};
  const cta104Section = pageData?.cta_section_104 ?? {};
  const whyChooseSection = pageData?.why_choose_code1_tech_systems_as_your_data_analytics_consulting_company ?? {};
  const ctaTestimonials = pageData?.cta_testimonials ?? {};
  const contactSection = pageData?.services_get_started_section ?? {};
  const faqHeading = pageData?.faq_section_heading ?? "";
  const faqsData = Array.isArray(pageData?.frequently_asked_question)
    ? pageData.frequently_asked_question.map((item: any) => ({
        q: item.post_title ?? "",
        a: item.post_content ?? "",
      }))
    : [];

  // Extract specific data with fallbacks
  const heroImage = bannerSection.banner_image?.url;
  const heroHeading = bannerSection.banner_heading ?? "";
  const heroParagraph = bannerSection.banner_description ?? "";
  const heroCtaText = bannerSection.cta_text ?? "";
  const heroCtaLink = bannerSection.cta_url ?? "/contactus";
  const heroBackLink = bannerSection.back_service_button ?? "";
  const floatingBadges = Array.isArray(bannerSection.floating_badge_fields) ? bannerSection.floating_badge_fields : [];

  const whyModernHeading = whyModernSection.heading ?? "";
  const whyModernParagraph = whyModernSection.paragraph ?? "";
  const whyModernTabs = Array.isArray(whyModernSection.tabs) ? whyModernSection.tabs : [];

  const comprehensiveHeading = comprehensiveSection.heading ?? "";
  const comprehensiveParagraph = comprehensiveSection.paragraph ?? "";
  const comprehensiveBgImage = comprehensiveSection.background_image?.url;
  const comprehensiveButton = comprehensiveSection.button_text ?? "";
  const comprehensiveButtonUrl = comprehensiveSection.button_url ?? "/contactus";

  const analyticsConsultingHeading = analyticsConsultingSection.heading ?? "";
  const analyticsConsultingParagraph = analyticsConsultingSection.paragraph ?? "";
  const analyticsConsultingWhiteText = analyticsConsultingSection.white_text ?? "";
  const analyticsConsultingButton = analyticsConsultingSection.button_text ?? "";
  const analyticsConsultingButtonUrl = analyticsConsultingSection.button_url ?? "/contactus";
  const analyticsConsultingCards = Array.isArray(analyticsConsultingSection.cards) ? analyticsConsultingSection.cards : [];

  const biConsultingHeading = biConsultingSection.heading ?? "";
  const biConsultingParagraph = biConsultingSection.paragraph ?? "";
  const biConsultingCards = Array.isArray(biConsultingSection.cards) ? biConsultingSection.cards : [];
  const biConsultingBottomText = biConsultingSection.bottom_text ?? "";
  const biConsultingButton = biConsultingSection.button_text ?? "";
  const biConsultingButtonUrl = biConsultingSection.button_url ?? "/contactus";
  const biConsultingLeftLabel = biConsultingSection.left_label ?? "";
  const biConsultingLeftImage = biConsultingSection.left_image?.url;
  const biConsultingLeftBottomText = biConsultingSection.left_bottom_text ?? "";

  const dashboardHeading = dashboardSection.heading ?? "";
  const dashboardParagraph = dashboardSection.paragraph ?? "";
  const dashboardCards = Array.isArray(dashboardSection.cards) ? dashboardSection.cards : [];
  const dashboardServices = Array.isArray(dashboardSection.tabs) ? dashboardSection.tabs : dashboardCards;

  const processHeading = processSection.heading ?? "";
  const processParagraph = processSection.paragraph ?? "";
  const processTabs = Array.isArray(processSection.tabs) ? processSection.tabs : [];

  const industriesHeading = industriesSection.heading ?? "";
  const industriesParagraph = industriesSection.paragraph ?? "";
  const industryCards = Array.isArray(industriesSection.cards) ? industriesSection.cards : [];

  const whyChooseHeading = whyChooseSection.heading ?? "";
  const whyChooseParagraph = whyChooseSection.paragraph ?? "";
  const whyChooseTabs = Array.isArray(whyChooseSection.tabs) ? whyChooseSection.tabs : [];

  const contactHeading = contactSection.heading ?? "";
  const contactParagraph = contactSection.paragraph ?? "";
  const contactButtons = Array.isArray(contactSection.buttons) ? contactSection.buttons : [];
  const contactButton = contactButtons[0] ?? null;

  return (
    <>
    <SeoTags
        title={pageData?.seo?.title}
        description={pageData?.seo?.description}
        ogImage={pageData?.seo?.og_image}
        schema={pageData?.schema}
      />
      {/* HERO */}
      <section
        ref={setRef("hero")}
        className="relative py-10 lg:py-16 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 50%, hsl(222 47% 4%) 100%)" }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none hidden md:block" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.10) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none hidden md:block" style={{ background: "radial-gradient(circle, rgba(0,78,158,0.12) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 lg:pt-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-12 items-center">
            <div className={`relative transition-all duration-700 ease-out ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(95,194,227,0.08)" }}>
                <img src={heroImage} alt={bannerSection.banner_image?.alt || ""} className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="eager" width={1280} height={896} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              </div>
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
              {floatingBadges[1] && (
                <div className={`absolute right-4 top-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ background: "rgba(10,15,30,0.85)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "float 6s ease-in-out infinite" }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{floatingBadges[1].badge_heading ?? ""}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{floatingBadges[1].badge_text ?? ""}</div>
                </div>
              )}
              {floatingBadges[0] && (
                <div className={`absolute left-4 bottom-1/4 p-3 rounded-xl backdrop-blur-xl hidden sm:block transition-all duration-1000 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ background: "rgba(10,15,30,0.85)", border: "1px solid rgba(95,194,227,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "float 5s ease-in-out infinite", animationDelay: "2s" }}>
                  <div className="text-xl font-bold bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent font-mono">{floatingBadges[0].badge_heading ?? ""}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{floatingBadges[0].badge_text ?? ""}</div>
                </div>
              )}
            </div>
            <div className={`transition-all duration-1000 ease-out delay-150 ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              {heroBackLink ? (
                <Link to={heroBackLink} className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                  ← Data Science
                </Link>
              ) : null}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              {heroParagraph ? (
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left" dangerouslySetInnerHTML={{ __html: heroParagraph }} />
              ) : null}
              {bannerSection.highlighted_text && (
                <p className="text-sm sm:text-base text-foreground/85 font-medium mb-4 text-left">{bannerSection.highlighted_text}</p>
              )}
              <Link to={heroCtaLink}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {heroCtaText}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
      </section>

    <section style={{ display: "none" }} className="lg:grid-cols-[1.1fr_1fr]">
    <span className="w-2.5 h-2.5 rounded-full bg-red-400/60 bg-[rgba(95,194,227,0.06)] border border-[rgba(95,194,227,0.15)]"></span>
    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60 bg-[rgba(95,194,227,0.08)] border border-[rgba(95,194,227,0.2)]"></span>
    <span className="w-2.5 h-2.5 rounded-full bg-green-400/60"></span>
</section>

     {/* ─── WHY MODERN BI — ASYMMETRIC BENTO WITH NUMERAL MARKERS ─── */}
       <section
        ref={setRef("why-modern")}
        className={`relative py-12 lg:py-20 overflow-hidden transition-all duration-700 ${visible["why-modern"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 mb-10 lg:mb-14 items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyModernHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            </div>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed lg:pb-2" dangerouslySetInnerHTML={{ __html: whyModernParagraph }} />
          </div>

          <ModernBITabs tabs={whyModernTabs} />
        </div>
      </section>

      {dataEngineerCta.heading ? (
        <InlineCTA
          title={dataEngineerCta.heading}
          sub={dataEngineerCta.content ?? ""}
          btn={dataEngineerCta.cta_text ?? ""}
          btnUrl={dataEngineerCta.cta_url ?? "/contactus"}
        />
      ) : null}

      {/* ─── COMPREHENSIVE ─── */}
      <section
        ref={setRef("comprehensive")}
        className={`relative py-12 lg:py-16 overflow-hidden transition-all duration-700 ${visible.comprehensive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "#070B12" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="relative rounded-3xl overflow-hidden min-h-[360px] lg:min-h-[420px]" style={{ border: "1px solid rgba(148,163,184,0.15)" }}>
            <img src={comprehensiveBgImage} alt={comprehensiveSection.background_image?.alt || ""} className="absolute inset-0 w-full h-full object-cover opacity-55" loading="lazy" width={1920} height={1080} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(7,11,18,0.95) 0%, rgba(11,18,32,0.85) 45%, rgba(11,18,32,0.35) 100%)" }} />
            <div className="relative z-10 grid lg:grid-cols-[7fr_5fr] gap-8 p-7 sm:p-10 lg:p-14 h-full items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(comprehensiveHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: comprehensiveParagraph }} />
              </div>
              <div className="flex lg:justify-end">
                <Link to={comprehensiveButtonUrl} className="w-full sm:w-auto">
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(0,194,255,0.35)] hover:shadow-[0_0_50px_rgba(0,194,255,0.55)] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                    {comprehensiveButton}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANALYTICS CONSULTING ─── */}
      <section
        ref={setRef("analytics-consulting")}
        className={`relative py-12 lg:py-20 overflow-hidden transition-all duration-700 ${visible["analytics-consulting"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-[1.08] text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(analyticsConsultingHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: analyticsConsultingParagraph }} />
              {analyticsConsultingWhiteText && (
                <p className="text-foreground/85 text-sm font-medium mb-6">{analyticsConsultingWhiteText}</p>
              )}
              <Link to={analyticsConsultingButtonUrl}>
                <Button variant="outline" className="group border-accent/40 hover:bg-accent/10">
                  {analyticsConsultingButton}
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {analyticsConsultingCards.map((s: any, i: number) => (
                <div
                  key={i}
                  className="group relative rounded-2xl p-5 lg:p-6 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                  style={cardStyle}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(420px circle at 0% 0%, rgba(95,194,227,0.10), transparent 60%)" }} />
                  <div className="absolute left-0 top-5 bottom-5 w-[2px] bg-gradient-to-b from-[#5FC2E3]/60 to-[#0077B6]/0 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-105" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.12), rgba(0,119,182,0.08))", border: "1px solid rgba(95,194,227,0.22)" }}>
                      <RenderIcon icon={s.icon} className="w-5 h-5 text-accent" strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] lg:text-[16px] font-semibold text-foreground leading-snug">{s.label}</h3>
                      <div className="mt-3 h-px w-8 bg-accent/30 group-hover:w-20 transition-all duration-500" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── BI CONSULTING ─── */}
      <section
        ref={setRef("bi-consulting")}
        className={`relative py-12 lg:py-20 overflow-hidden transition-all duration-700 ${visible["bi-consulting"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
            {/* LEFT — image collage with floating KPI chips */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 rounded-[2rem] opacity-[0.08] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.5) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />

              <div className="relative rounded-3xl overflow-hidden group" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(95,194,227,0.12)", border: "1px solid rgba(95,194,227,0.18)" }}>
                <img src={biConsultingLeftImage} alt={biConsultingSection.left_image?.alt || ""} className="w-full h-[420px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" width={1024} height={1024} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0077B6]/10 via-transparent to-[#5FC2E3]/10 mix-blend-overlay" />

                {biConsultingLeftLabel && (
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md" style={{ background: "rgba(10,15,30,0.72)", border: "1px solid rgba(95,194,227,0.3)" }}>
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/90 font-mono">{biConsultingLeftLabel}</span>
                  </div>
                )}
              </div>

              {biConsultingLeftBottomText && (
                <div className="absolute -bottom-6 -right-4 sm:-right-8 p-5 rounded-2xl backdrop-blur-xl max-w-[260px] hidden sm:block" style={{ background: "rgba(10,15,30,0.94)", border: "1px solid rgba(95,194,227,0.3)", boxShadow: "0 16px 50px rgba(0,0,0,0.55)" }}>
                  <div className="text-sm font-semibold text-foreground leading-snug">{biConsultingLeftBottomText}</div>
                </div>
              )}
            </div>

            {/* RIGHT — heading + capability grid */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.08] text-left" dangerouslySetInnerHTML={{ __html: addClassToSpan(biConsultingHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base leading-relaxed mb-7" dangerouslySetInnerHTML={{ __html: biConsultingParagraph }} />

              <div className="grid sm:grid-cols-2 gap-3 mb-7">
                {biConsultingCards.map((t: any, i: number) => (
                  <div
                    key={i}
                    className="group relative flex items-start gap-3 p-3.5 rounded-xl transition-all duration-400 hover:-translate-y-0.5 overflow-hidden"
                    style={{ background: "linear-gradient(160deg, rgba(15,23,42,0.55), rgba(11,18,32,0.35))", border: "1px solid rgba(148,163,184,0.12)" }}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(280px circle at 0% 0%, rgba(95,194,227,0.10), transparent 60%)" }} />
                    <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#5FC2E3]/70 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.14), rgba(0,119,182,0.08))", border: "1px solid rgba(95,194,227,0.22)" }}>
                      <RenderIcon icon={t.icon} className="w-4 h-4 text-accent" strokeWidth={1.7} />
                    </div>
                    <span className="text-sm text-foreground/90 leading-snug pt-1.5 relative">{t.label}</span>
                  </div>
                ))}
              </div>

              {biConsultingBottomText && (
                <p className="text-foreground/85 text-sm font-medium mb-5">{biConsultingBottomText}</p>
              )}
              <Link to={biConsultingButtonUrl}>
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-7 py-5 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  {biConsultingButton}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DASHBOARDS ─── */}
      <section
        ref={setRef("dashboards")}
        className={`relative py-12 lg:py-20 overflow-hidden transition-all duration-700 ${visible.dashboards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto mb-10 lg:mb-14 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15] mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(dashboardHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.75] max-w-5xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: dashboardParagraph }} />
          </div>

          {/* Tabbed dashboard preview */}
          {dashboardServices.length > 0 && (
          <div className="grid lg:grid-cols-[300px_1fr] gap-4 lg:gap-6">
            {/* Tab rail */}
            <div
              className="rounded-2xl p-3 lg:p-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar"
              style={cardStyle}
            >
              {dashboardServices.map((s, i) => {
                const active = activeDash === i;
                const Icon = s.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveDash(i)}
                    className="group relative flex items-center gap-3 rounded-xl px-3 py-3 lg:py-3.5 text-left transition-all duration-300 flex-shrink-0 lg:flex-shrink"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, rgba(0,78,158,0.35) 0%, rgba(95,194,227,0.12) 100%)"
                        : "transparent",
                      border: active
                        ? "1px solid rgba(95,194,227,0.40)"
                        : "1px solid rgba(95,194,227,0.08)",
                      boxShadow: active ? "0 0 24px rgba(95,194,227,0.18) inset" : "none",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: active ? "rgba(95,194,227,0.20)" : "rgba(95,194,227,0.06)",
                        border: "1px solid rgba(95,194,227,0.20)",
                      }}
                    >
                      <DynamicIcon name={s.icon} className="w-4 h-4 text-accent" />
                    </div>
                    <span
                      className={`text-sm font-semibold leading-tight whitespace-nowrap lg:whitespace-normal ${
                        active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {s.title}
                    </span>
                    {active && (
                      <span className="hidden lg:block absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-[#5FC2E3] to-[#0077B6]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Preview panel */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,18,32,0.85) 0%, rgba(8,13,24,0.95) 100%)",
                border: "1px solid rgba(95,194,227,0.22)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 40px rgba(95,194,227,0.06)",
              }}
            >
              
             <div dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(dashboardServices[activeDash].content) }} />
            </div>
          </div>
          )}
        </div>
      </section>

      {onDemandCta.heading ? (
        <InlineCTA
          title={onDemandCta.heading}
          sub={onDemandCta.content ?? ""}
          btn={onDemandCta.cta_text ?? ""}
          btnUrl={onDemandCta.cta_url ?? "/contactus"}
        />
      ) : null}

      {/* ─── PROCESS — COMPACT INTERACTIVE STEPPER (ONE-SCROLL) ─── */}
            <section
              ref={setRef("process")}
              className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 pointer-events-none opacity-60">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(95,194,227,0.10) 0%, transparent 70%)", filter: "blur(40px)" }} />
              </div>
      
              <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto mb-8 lg:mb-10 text-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(processHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-base leading-[1.75] max-w-4xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: processParagraph }} />
                </div>
      
                <div className="max-w-6xl mx-auto">
                  {/* Horizontal step rail */}
                  <div className="relative mb-6 lg:mb-8">
                    {/* Connector line */}
                    <div className="absolute top-7 left-0 right-0 h-px hidden md:block" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(95,194,227,0.25) 8%, rgba(95,194,227,0.25) 92%, transparent 100%)" }} />
                    {/* Progress fill */}
                    <div className="absolute top-7 left-0 h-px hidden md:block transition-all duration-500" style={{ width: `${(activeStep / (processTabs.length - 1)) * 100}%`, background: "linear-gradient(90deg, #5FC2E3 0%, #0077B6 100%)", boxShadow: "0 0 12px rgba(95,194,227,0.6)" }} />
      
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 relative">
                      {processTabs.map((p, i) => {
                        const isActive = activeStep === i;
                        const isPast = i < activeStep;
                        return (
                          <button
                            key={i}
                            onClick={() => setActiveStep(i)}
                            className="group flex flex-col items-center text-center gap-2 outline-none"
                          >
                            <div className="relative">
                              {isActive && <div className="absolute inset-0 rounded-full blur-md" style={{ background: "rgba(95,194,227,0.7)" }} />}
                              <div
                                className="relative w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all duration-300"
                                style={
                                  isActive || isPast
                                    ? { background: "linear-gradient(135deg, #5FC2E3 0%, #0077B6 100%)", border: "2px solid rgba(11,18,32,1)", boxShadow: isActive ? "0 0 0 5px rgba(95,194,227,0.18)" : "none", color: "#fff" }
                                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(148,163,184,0.20)", color: "rgba(148,163,184,0.85)" }
                                }
                              >
                                <DynamicIcon name={p.icon} className="w-5 h-5" />
                              </div>
                            </div>
                            <div className="hidden md:block">
                              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</div>
                              <div className={`text-[11px] leading-tight mt-0.5 font-medium transition-colors line-clamp-2 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                                {p.tabs_title.split(" ").slice(0, 3).join(" ")}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
      
                  {/* Active step detail panel */}
                  <div
                    key={activeStep}
                    className="relative rounded-2xl p-6 lg:p-8 animate-fade-in overflow-hidden"
                    style={{ background: "linear-gradient(135deg, rgba(14,21,37,0.95) 0%, rgba(11,18,32,0.98) 100%)", border: "1px solid rgba(95,194,227,0.18)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
                  >
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.12) 0%, transparent 70%)" }} />
      
                    <div className="relative grid md:grid-cols-[auto_1fr] gap-5 lg:gap-7 items-start">
                      <div className="flex md:flex-col items-center md:items-start gap-3">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18) 0%, rgba(0,119,182,0.18) 100%)", border: "1px solid rgba(95,194,227,0.35)" }}>
                          <DynamicIcon name={processTabs[activeStep].icon} className="w-8 h-8 lg:w-10 lg:h-10 text-accent" />
                        </div>
                        <div className="md:mt-3">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-accent">Step {String(activeStep + 1).padStart(2, "0")} / {String(processTabs.length).padStart(2, "0")}</div>
                        </div>
                      </div>
      
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug mb-3">
                          <div dangerouslySetInnerHTML={{ __html: processTabs[activeStep].cards_title }} />
                        </h3>
                        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{processTabs[activeStep].cards_content}</p>
      
                        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border/40">
                          <button
                            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                            disabled={activeStep === 0}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                          >
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Prev
                          </button>
                          <button
                            onClick={() => setActiveStep((s) => Math.min(processTabs.length - 1, s + 1))}
                            disabled={activeStep === processTabs.length - 1}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                          >
                            Next <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <div className="ml-auto text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            {String(activeStep + 1).padStart(2, "0")} · {processTabs.length - activeStep - 1} remaining
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

      {/* ─── INDUSTRIES ─── */}
      <section
        ref={setRef("industries")}
        className={`relative py-12 lg:py-20 overflow-hidden transition-all duration-700 ${visible.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="mb-10 lg:mb-12">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.08] mb-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: addClassToSpan(industriesHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <p className="text-muted-foreground text-base leading-[1.75] max-w-4xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: industriesParagraph }} />
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-stretch gap-5">
            {industryCards.map((ind: any, i: number) => (
              <article
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
                style={{ border: "1px solid rgba(148,163,184,0.12)", background: "rgba(255,255,255,0.025)" }}
              >
                <div className="relative h-44 flex-shrink-0 overflow-hidden">
                  <img src={ind.image?.url} alt={ind.image?.alt || ind.title || ""} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,18,32,0.2) 0%, rgba(11,18,32,0.95) 100%)" }} />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md" style={{ background: "rgba(11,18,32,0.7)", border: "1px solid rgba(95,194,227,0.30)" }}>
                    <RenderIcon icon={ind.icon} className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent mb-1.5 leading-none">{ind.label ?? ""}</div>
                    <h3 className="text-lg font-bold text-foreground leading-tight">{ind.title}</h3>
                  </div>
                </div>
                <div className="px-5 py-5 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground leading-[1.65] text-left" dangerouslySetInnerHTML={{ __html: ind.content ?? "" }} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {cta104Section.heading ? (
        <InlineCTA
          title={cta104Section.heading}
          sub={cta104Section.paragraph ?? ""}
          btn={cta104Section.button_text ?? ""}
          btnUrl={cta104Section.button_url ?? "/contactus"}
        />
      ) : null}

      {/* ─── WHY CHOOSE — EDITORIAL ROWS WITH OVERSIZED NUMERALS ─── */}
            <section
              ref={setRef("why")}
              className={`relative py-10 lg:py-14 overflow-hidden transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 pointer-events-none opacity-50">
                <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(95,194,227,0.10) 0%, transparent 70%)", filter: "blur(50px)" }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(0,119,182,0.10) 0%, transparent 70%)", filter: "blur(50px)" }} />
              </div>
      
              <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto mb-8 lg:mb-10 text-center">
                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(whyChooseHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-muted-foreground text-sm sm:text-base leading-[1.75] max-w-4xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: whyChooseParagraph }} />
                </div>
      
                {/* Bento split: interactive list + detail panel */}
                <div className="grid lg:grid-cols-[1.05fr_1.4fr] gap-4 lg:gap-6 mb-6 lg:mb-8">
                  {/* Left list */}
                  <div className="flex flex-col gap-2">
                    {whyChooseTabs.map((w, i) => {
                      const isActive = activeWhy === i;
                      return (
                        <button
                          key={i}
                          onMouseEnter={() => setActiveWhy(i)}
                          onClick={() => setActiveWhy(i)}
                          className="group relative text-left rounded-xl px-4 py-3 lg:px-5 lg:py-3.5 transition-all duration-300 overflow-hidden"
                          style={
                            isActive
                              ? { background: "linear-gradient(110deg, rgba(95,194,227,0.10) 0%, rgba(0,119,182,0.06) 100%)", border: "1px solid rgba(95,194,227,0.35)" }
                              : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(148,163,184,0.10)" }
                          }
                        >
                          {isActive && <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(180deg, #5FC2E3 0%, #0077B6 100%)" }} />}
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold font-mono leading-none bg-gradient-to-br from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent w-10 flex-shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm lg:text-base font-bold leading-snug transition-colors ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{w.title}</h3>
                            </div>
                            <ArrowUpRight className={`w-4 h-4 flex-shrink-0 transition-all ${isActive ? "text-accent translate-x-0" : "text-muted-foreground/40 -translate-x-1"}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
      
                  {/* Right detail panel */}
                  <div
                    key={activeWhy}
                    className="relative rounded-2xl p-6 lg:p-8 animate-fade-in overflow-hidden"
                    style={{ background: "linear-gradient(135deg, rgba(14,21,37,0.95) 0%, rgba(11,18,32,0.98) 100%)", border: "1px solid rgba(95,194,227,0.20)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
                  >
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(95,194,227,0.14) 0%, transparent 70%)" }} />
      
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18) 0%, rgba(0,119,182,0.18) 100%)", border: "1px solid rgba(95,194,227,0.35)" }}>
                          <DynamicIcon name={whyChooseTabs[activeWhy].icon} className="w-7 h-7 lg:w-8 lg:h-8 text-accent" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-0.5">{String(activeWhy + 1).padStart(2, "0")} / {String(whyChooseTabs.length).padStart(2, "0")}</div>
                          <h3 className="text-lg lg:text-xl font-bold text-foreground leading-tight">{whyChooseTabs[activeWhy].title}</h3>
                        </div>
                      </div>
                      <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{whyChooseTabs[activeWhy].content}</p>
                    </div>
                  </div>
                </div>
      
                {/* Compact pull quote band */}
                {ctaTestimonials.heading ? (
                <div className="relative rounded-2xl px-5 py-5 lg:px-8 lg:py-6 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6" style={{ background: "linear-gradient(110deg, rgba(0,78,158,0.18) 0%, rgba(95,194,227,0.06) 100%)", border: "1px solid rgba(95,194,227,0.22)" }}>
                  <RenderIcon icon={ctaTestimonials.icon} className="w-5 h-5 text-accent" strokeWidth={1.6} />
                  <div className="flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">{ctaTestimonials.top_text}</div>
                    <p className="text-base lg:text-lg font-bold text-foreground leading-snug">
                      {ctaTestimonials.heading}
                    </p>
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-xs lg:border-l lg:border-white/10 lg:pl-6">
                    {ctaTestimonials.content}
                  </p>
                </div>) : null
}
              </div>
            </section>

      {/* FAQ */}
      <section
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 6%) 100%)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(faqHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqsData.map((f: any, i: number) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border rounded-2xl px-5 backdrop-blur-sm"
                style={{ background: "rgba(15,23,42,0.50)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-accent py-4">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed text-left">
                  <div dangerouslySetInnerHTML={{ __html: f.a }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>


      {/* ─── CONTACT ─── */}
      <section
        ref={setRef("contact")}
        className="relative py-12 lg:py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 6%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className={`transition-all duration-700 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.08]" dangerouslySetInnerHTML={{ __html: addClassToSpan(contactHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
              <div className="space-y-3 text-muted-foreground text-sm sm:text-base leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: contactParagraph }} />
              {contactButton && (
                <Link to={contactButton.cta_url ?? "/contactus"}>
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                    {contactButton.cta_text ?? ""}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              )}
            </div>
            <div className={`transition-all duration-700 delay-150 ${visible.contact ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>

      </>
      );
    };

export default BusinessIntelligence;
