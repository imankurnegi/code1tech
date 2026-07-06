import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  BarChart3,
  Server,
  Workflow,
  Cloud,
  Gauge,
  Building2,
  Users,
  Database,
  ShieldCheck,
  Code2,
  Boxes,
  Settings2,
  Rocket,
  Compass,
  CheckCircle2,
  Eye,
  RefreshCw,
  Target,
  Wrench,
  MessagesSquare,
  Zap,
  Handshake,
  LineChart,
  FileCog,
  Lock,
  MonitorSmartphone,
  Mail,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/microsoft/microsoft-hero.jpg";
import { useInViewMap } from "@/hooks/useInView";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ContactUsForm from "@/components/ContactUsForm";
import SeoTags from "@/components/SeoTags";

const InlineCTA = ({ title, btn }: { title: string; btn: string }) => (
  <div className="mt-12 lg:mt-14">
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 px-4 sm:px-8 py-7"
      style={{
        background: "linear-gradient(110deg, #0E1525 0%, #0B1220 40%, #12102A 70%, #0E1525 100%)",
        border: "1px solid rgba(148,163,184,0.15)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.6)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute" style={{ top: "-30%", right: "18%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(0,119,182,0.28) 0%, transparent 70%)", filter: "blur(24px)" }} />
        <div className="absolute" style={{ bottom: "-20%", right: "30%", width: "200px", height: "200px", background: "radial-gradient(ellipse at center, rgba(95,194,227,0.18) 0%, transparent 70%)", filter: "blur(20px)" }} />
      </div>
      <div className="flex-1 relative z-10 text-left">
        <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug">{title}</h3>
      </div>
      <Link to="" className="flex-shrink-0 relative z-10">
        <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(95,194,227,0.55)]">
          {btn}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </Button>
      </Link>
    </div>
  </div>
);


const Microsoft = () => {
  const { setRef, inViewMap: visible } = useInViewMap();
  const [activeCat, setActiveCat] = useState<ServiceCategory>("workplace");
 
  const renderDesc = (desc: string, highlight: string) => {
    const idx = desc.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return desc;
    return (
      <>
        {desc.slice(0, idx)}
        <strong className="text-foreground font-semibold">{desc.slice(idx, idx + highlight.length)}</strong>
        {desc.slice(idx + highlight.length)}
      </>
    );
  };

  const { data, isLoading, error } = useQuery({
      queryKey: ["microsoft-engineers"],
      queryFn: api.getMicrosoftEngineers,
    });

    if (isLoading) return null;
    if (error) return null;

  const pageData = data?.data;

  
// ── DATA ─────────────────────────────────────────────────────────────────

type ServiceCategory = "workplace" | "cloud" | "security";

const serviceCategories: { id: ServiceCategory; label: string; sub: string; icon: any }[] = [
  { id: "workplace", label: "Modern Workplace", sub: "M365 · Teams · SharePoint · Exchange", icon: Users },
  { id: "cloud", label: "Cloud & Infrastructure", sub: "Azure · Migration · Dynamics · Integration", icon: Cloud },
  { id: "security", label: "Security & Continuity", sub: "Defender · Disaster Recovery", icon: ShieldCheck },
];

const services: {
  icon: any;
  title: string;
  desc: string;
  highlight: string;
  bullets: string[];
  category: ServiceCategory;
}[] = [
  { category: "workplace", icon: MonitorSmartphone, title: "Microsoft 365 Implementation", desc: "When implementing Microsoft 365 for your business, we will make sure it is configured to adhere to security measures while users, policies, and collaboration tools are configured correctly.", highlight: "configured to adhere to security measures", bullets: ["Secure configuration", "User & policy setup", "Collaboration tools"] },
  { category: "workplace", icon: FileCog, title: "SharePoint Solutions", desc: "Create secure solutions for document sharing and collaboration that create easier ways to use knowledge within your company.", highlight: "secure solutions for document sharing", bullets: ["Document management", "Team collaboration", "Knowledge sharing"] },
  { category: "workplace", icon: MessagesSquare, title: "Microsoft Teams Solutions", desc: "Choose from various Microsoft Teams solutions that support current workflows to help team members communicate and work together more effectively.", highlight: "support current workflows", bullets: ["Workflow-aligned setup", "Meetings & channels", "Effective teamwork"] },
  { category: "workplace", icon: Mail, title: "Exchange Online", desc: "If your business's email is managed on Microsoft Exchange, we can assist you with migrating your existing email environment to Microsoft Exchange Online.", highlight: "migrating your existing email environment", bullets: ["Seamless migration", "Zero data loss", "Cloud-hosted email"] },
  { category: "cloud", icon: Cloud, title: "Cloud Migration", desc: "If you are considering moving your existing applications, databases, and workloads to Azure, we can help you do so quickly and with minimal disruption.", highlight: "quickly and with minimal disruption", bullets: ["Apps & DB migration", "Minimal disruption", "Azure-ready workloads"] },
  { category: "cloud", icon: Server, title: "Azure Infrastructure", desc: "If you have enterprise applications, virtual machines, networks, or storage that require a scalable Azure environment, we can assist in creating one for you.", highlight: "scalable Azure environment", bullets: ["VMs & networking", "Scalable storage", "Enterprise-grade"] },
  { category: "cloud", icon: Building2, title: "Dynamics 365 Consulting", desc: "By customizing Microsoft Dynamics 365 for your business, you can modernize your CRM and ERP processes.", highlight: "modernize your CRM and ERP processes", bullets: ["CRM modernization", "ERP optimization", "Business-fit customization"] },
  { category: "cloud", icon: Handshake, title: "System Integration", desc: "We can assist in connecting Microsoft applications with third-party systems to create a seamless environment where all systems work well together.", highlight: "seamless environment where all systems work well together", bullets: ["3rd-party connectors", "Unified data flow", "Seamless environment"] },
  { category: "security", icon: ShieldCheck, title: "Cloud Security", desc: "Microsoft's security framework, governance policies, and identity management solutions provide multiple layers of security for cloud environments.", highlight: "multiple layers of security", bullets: ["Identity & access", "Governance policies", "Layered defense"] },
  { category: "security", icon: LifeBuoy, title: "Disaster Recovery", desc: "Our services provide Azure backup, disaster recovery, and high-availability solutions that will improve your business's ability to function after a disaster.", highlight: "high-availability solutions", bullets: ["Azure backup", "High availability", "Business continuity"] },
];


const whyMicrosoft = [
  { icon: Sparkles, title: "Create a New Work Environment", desc: "By implementing Microsoft 365, teams can collaborate better and be more productive than before. We are a team of specialists at creating a workplace where employees will thrive in their communication, simplify their collaboration, and enhance overall productivity." },
  { icon: ShieldCheck, title: "Protect Your Enterprise", desc: "Defend yourself from cyber threats with Microsoft's advanced security measures. Our Microsoft consultants can assist with securing and protecting your users, devices, and business information while ensuring compliance to regulations, reducing cyber risk, and maintaining continuity of operations." },
  { icon: Workflow, title: "Automate Your Business", desc: "Save time by automating repetitive business processes. Our experts can use Microsoft's Power Automate and other integrated solutions to create streamlined business processes; this would improve operational efficiencies and give your employees the opportunity to focus on strategic work instead of doing busy work." },
  { icon: Cloud, title: "Cloud Scalability", desc: "You can be confident in scaling your business with Microsoft Azure. Our Microsoft consultants can create secure and scalable cloud environments to optimise performance, support growth, and allow for flexibility in your company's changing business needs." },
  { icon: BarChart3, title: "Implementing Business Analytics", desc: "Power BI and Microsoft Analytics are how you can convert your data into actionable insights; Our consultants work with you to create interactive dashboards that allow you to monitor actual performance against established goals and to identify trends to help you make informed business decisions." },
  { icon: Layers, title: "Create Your Future Infrastructure", desc: "Create a Microsoft-based ecosystem that will set you up for long-term success. Our consultants help with integrating various Microsoft applications, Microsoft Cloud Services, and your legacy or current Business Systems to create a scalable platform that will grow along with your business." },
];

const process = [
  { icon: Compass, title: "Assessment", desc: "We analyze your current infrastructure, processes, and technical challenges so that we can make suggestions that will ultimately result in successfully implementing the right Microsoft products." },
  { icon: Settings2, title: "Solution Design", desc: "We create a custom roadmap from our assessments to help align your solutions with your operational and digital transformation strategies." },
  { icon: CheckCircle2, title: "Testing and Training", desc: "We will test our solutions to ensure they are functioning as required and provide your employees with the necessary training, thus preparing them to utilize the solutions in their daily functions." },
  { icon: Eye, title: "Technology Assessment", desc: "Our consultants will perform a comprehensive review of your IT landscape to identify areas for modernization, optimization, and performance improvement." },
  { icon: Rocket, title: "Deployment", desc: "We will deploy Microsoft Solutions into your organization while minimizing any interruptions to normal business operations." },
  { icon: RefreshCw, title: "Optimization and Supporting Services", desc: "To continue to improve the performance of your Microsoft infrastructure, you can rely on us for ongoing monitoring, optimization, and support of your deployed technologies." },
];

const outcomes = [
  { icon: Zap, title: "Productivity Improvement", desc: "Our professional consultants develop effective methods to communicate with one another, create a digital work environment that allows your team to be better organized, and focus on completing tasks that can provide them with a sense of accomplishment." },
  { icon: Users, title: "Collaboration Improvement", desc: "We have Microsoft consultants who implement the appropriate collaboration tools to maintain a connection and to ensure that they are aware of project updates regarding the work that they are currently assigned to assist one another with." },
  { icon: Lock, title: "Security Improvement", desc: "Our team of professionals will improve your identity and access management programs and business databases and mitigate your organisation's cyber risk by assisting you in ensuring that you maintain your organisation's compliance with any applicable regulations." },
  { icon: Workflow, title: "Reduced Manual Work", desc: "Our team of professionals develops workflow automation solutions using Microsoft Power Platform technology to decrease manual processing requirements, create operational efficiencies and allow your employees to concentrate on higher priority items." },
  { icon: Cloud, title: "Cloud Scalability", desc: "With our Azure consultants, we develop scalable cloud-based environments that improve organisational flexibility, increase system performance and effectively support the ever-changing requirements of your organisation." },
  { icon: LineChart, title: "Better Decision Making", desc: "Our team of experts has implemented reporting/analytics solutions to enable you to monitor the performance of your organisation, identify trends and gain confidence in your ability to make data-driven decisions." },
];

const technologies = [
  { icon: Cloud, title: "Microsoft Azure", desc: "Moving to the cloud can be smooth with help from our Azure experts. We support you through the migration of your workloads to the cloud, building out secure cloud infrastructure, and optimizing your environment to achieve long-term growth for your business." },
  { icon: MessagesSquare, title: "Microsoft Teams", desc: "With the right tools, collaboration is easy. Our consultants help you implement and optimize Microsoft Teams to enable your employees to communicate with each other, share files, collaborate on projects, and remain productive wherever they are." },
  { icon: Building2, title: "Dynamics 365", desc: "Our team of Dynamics 365 professionals can assist you in modernizing your CRM & ERP processes; automating daily operations; making better customer experiences possible; and helping you to reach smarter decisions based on connected business data." },
  { icon: Database, title: "SQL Server", desc: "As a business, you depend on having accurate and secure data on a daily basis. We offer services to help you manage, optimize, and secure your databases in order to ensure high performance, fast queries, and ultimately, a stable platform for your business applications." },
  { icon: MonitorSmartphone, title: "Microsoft 365", desc: "Your company will benefit from the tools that allow your employees to collaborate without hassle. We can help you design and implement Microsoft 365, Outlook, Teams, Exchange, and SharePoint as part of your connected office with seamless communication, productivity, and collaboration between your employees." },
  { icon: Boxes, title: "Power Platform", desc: "The valuable time on repeated tasks could be spent creating new products. Our experts know how to use Power Apps, Power Automate, and Power BI to turn repetitive tasks into automated workflows and create the insights necessary for faster, smarter, data-driven decisions." },
  { icon: ShieldCheck, title: "Microsoft Defender", desc: "The team of Microsoft consultants can help you prepare for any eventuality through the deployment of Microsoft Defender in order to build protection for your business users, devices, and business data, respectively, and reduce the potential for security issues in your organisation." },
  { icon: FileCog, title: "SharePoint", desc: "Our professionals can build a secure SharePoint intranet portal, a document management system, and a place for your employees to collaborate so that they are able to quickly and easily share knowledge and manage documents among themselves." },
];

const partner = [
  { icon: Target, title: "Business-First Approach", desc: "Our consultants combine their technical knowledge and experience with extensive knowledge to create, deploy, and optimize Microsoft solutions that meet your objectives and provide long-term value." },
  { icon: Wrench, title: "Tailored Solutions", desc: "All of our solutions are designed specifically for the individual processes and functionalities of each customer and are flexible enough to accommodate future growth." },
  { icon: MessagesSquare, title: "Transparent Collaboration", desc: "Get regular updates on project status and clearly document what has occurred. In addition, you will have a dedicated consultant throughout the entire process so you always know where your project stands." },
  { icon: CheckCircle2, title: "End-to-End Project Delivery", desc: "Our experts manage the complete lifecycle of your Microsoft solutions - from the planning or migration stages to ongoing optimization and support - across all areas of expertise." },
  { icon: RefreshCw, title: "Ongoing Support", desc: "We will continue to work with you to optimize your Microsoft environment as your organization continues to change and grow after the deployment has taken place." },
  { icon: Gauge, title: "Measurable Results", desc: "Our consultants focus on delivering enterprise outcomes that improve productivity, strengthen security, and support your long-term digital transformation goals." },
];

 const filteredServices = services.filter((s) => s.category === activeCat);


  return (
    <>
      <SeoTags
        title={pageData?.seo?.title}
        description={pageData?.seo?.description}
        ogImage={pageData?.seo?.og_image}
        schema={pageData?.schema}
      />

      <section
        ref={setRef("hero")}
        className="relative overflow-hidden pt-24 pb-10 lg:pt-28 lg:pb-16"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(0,119,182,0.18) 0%, transparent 60%), linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(220 50% 6%) 60%, hsl(222 47% 4%) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(95,194,227,0.18) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,90,40,0.10) 0%, transparent 65%)" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-5 lg:mb-6 transition-all duration-700 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {heroBanner?.top_label || ""}
            </span>
          </div>

          <div className={`relative max-w-5xl mx-auto mb-8 lg:mb-10 transition-all duration-1000 delay-150 ${visible.hero ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}>
            <div className="absolute -inset-6 sm:-inset-10 rounded-[2rem] blur-3xl opacity-70 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(95,194,227,0.35) 0%, rgba(0,119,182,0.20) 40%, transparent 75%)" }} />

            <div className="hidden lg:flex absolute -left-6 top-12 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_6s_ease-in-out_infinite]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[0]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[0]?.label}</span>
            </div>
            <div className="hidden lg:flex absolute -right-6 top-24 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_7s_ease-in-out_infinite_reverse]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[1]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[1]?.label}</span>
            </div>
            <div className="hidden lg:flex absolute -left-8 bottom-20 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_8s_ease-in-out_infinite]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[2]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[2]?.label}</span>
            </div>
            <div className="hidden lg:flex absolute -right-8 bottom-24 z-20 items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md animate-[floatY_6.5s_ease-in-out_infinite_reverse]"
              style={{ background: "rgba(10,16,30,0.7)", border: "1px solid rgba(95,194,227,0.30)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
              <DynamicIcon name={heroBadges[3]?.icon} className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-foreground">{heroBadges[3]?.label}</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "835 / 445",
                border: "1px solid rgba(95,194,227,0.25)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 80px rgba(95,194,227,0.10)",
              }}>
              <img
                src={heroImageUrl}
                alt={heroBanner?.image?.alt || ""}
                className="w-full h-full object-cover"
                loading="eager"
                width={835}
                height={445}
              />
              <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-[2px] bg-gradient-to-r from-accent to-transparent" />
                <div className="absolute top-4 left-4 w-[2px] h-8 bg-gradient-to-b from-accent to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                <div className="absolute bottom-4 right-4 w-8 h-[2px] bg-gradient-to-l from-accent to-transparent" />
                <div className="absolute bottom-4 right-4 w-[2px] h-8 bg-gradient-to-t from-accent to-transparent" />
              </div>
            </div>

            <div className="relative z-10 mx-2 sm:mx-6 -mt-8 sm:-mt-10 rounded-xl backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden"
              style={{ background: "rgba(10,16,30,0.85)", border: "1px solid rgba(95,194,227,0.25)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
              {(heroStats || []).map((m: any, i: number) => (
                <div key={i} className="px-4 py-4 sm:py-5 text-center" style={{ background: "rgba(10,16,30,0.6)" }}>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">{m.label}</div>
                  <div className="text-sm sm:text-base font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">{m.heading}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`max-w-[95%] xl:max-w-6xl mx-auto text-center transition-all duration-700 delay-300 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-foreground leading-[1.1] mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(heroContent?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} />
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-[1.75] max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: heroContent?.paragraph || "" }} />
          </div>

          <div className={`mt-7 lg:mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-sm sm:text-base text-foreground/85 font-medium text-center sm:text-left">
              {heroContent?.white_text || ""}
            </p>
            <Link to={heroContent?.button_url || ""}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300"
              >
                {heroContent?.button_text || ""}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes floatY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>

      {/* INTRO */}
      <section
        ref={setRef("intro")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.intro ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        {/* Ambient glow accents */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.18]" aria-hidden="true">
          <div className="absolute top-[10%] right-[-6%] w-[520px] h-[520px] rounded-full blur-[130px]" style={{ background: "#004E9E" }} />
          <div className="absolute bottom-[-10%] right-[18%] w-[320px] h-[320px] rounded-full blur-[110px]" style={{ background: "#5FC2E3" }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-20 items-start">
            {/* Left 60% — headline + intro */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#5FC2E3]" />
                <span className="text-[#5FC2E3] font-medium tracking-[0.22em] uppercase text-[11px]">
                  Expertise • Innovation
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.1] text-left">
                <span className="text-foreground">Microsoft Consulting Services </span>
                <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Tailored to Your Business</span>
              </h2>

              <p className="max-w-2xl text-[15px] lg:text-base text-muted-foreground leading-[1.85] text-left">
                Discover how our Microsoft consultants help you maximize technology investments and improve business performance every day.
              </p>
            </div>

            {/* Right 40% — glass quote + strategy watermark */}
            <div className="lg:col-span-4 lg:mt-16 relative">
              <div
                className="relative p-7 lg:p-8 rounded-tr-3xl shadow-2xl backdrop-blur-xl"
                style={{
                  background: "rgba(19,42,74,0.45)",
                  borderTop: "1px solid rgba(95,194,227,0.22)",
                  borderLeft: "1px solid rgba(95,194,227,0.22)",
                }}
              >
                <div
                  className="absolute -top-6 -left-6 w-12 h-12 flex items-center justify-center rounded-sm shadow-lg"
                  style={{ background: "#004E9E" }}
                  aria-hidden="true"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <p className="text-[#5FC2E3] italic text-[15px] lg:text-base leading-[1.75] text-left">
                  We have a team of trained specialists to help you implement, integrate, and optimize Microsoft technologies in order to improve collaboration, automate business processes, and strengthen security, along with providing a modern digital workplace solution.
                </p>

                <div className="flex items-center gap-4 mt-7">
                  <div className="h-px flex-grow" style={{ background: "rgba(95,194,227,0.25)" }} />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Code1 Tech</span>
                </div>
              </div>

              {/* Editorial watermark */}
              <div className="mt-10 select-none pointer-events-none" aria-hidden="true">
                <div className="text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: "rgba(19,42,74,0.9)" }}>STRATEGY</div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight ml-8" style={{ color: "rgba(19,42,74,0.9)" }}>EXECUTION</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* SERVICES */}
      <section
        ref={setRef("services")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.4) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Category tabs */}
          <div
            role="tablist"
            aria-label="Microsoft service categories"
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 lg:mb-10"
          >
            {serviceCategories.map((cat) => {
              const isActive = cat.id === activeCat;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCat(cat.id)}
                  className="group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FC2E3]"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(0,119,182,0.28), rgba(95,194,227,0.15))"
                      : "rgba(255,255,255,0.025)",
                    border: isActive
                      ? "1px solid rgba(95,194,227,0.55)"
                      : "1px solid rgba(148,163,184,0.15)",
                    boxShadow: isActive ? "0 8px 32px -12px rgba(95,194,227,0.45)" : "none",
                  }}
                >
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #5FC2E3, #0077B6)"
                        : "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))",
                      border: "1px solid rgba(95,194,227,0.25)",
                    }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-accent"}`} />
                  </span>
                  <span className="flex flex-col">
                    <span className={`text-sm font-semibold leading-tight ${isActive ? "text-foreground" : "text-foreground/85"}`}>
                      {cat.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                      {cat.sub}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filtered cards */}
          <div
            key={activeCat}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr animate-tab-slide motion-reduce:animate-none"
          >
            {filteredServices.map((w, i) => (
              <div
                key={`${activeCat}-${i}`}
                className="group relative p-5 lg:p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(148,163,184,0.12)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(95,194,227,0.55)";
                  e.currentTarget.style.boxShadow = "0 12px 40px -12px rgba(0,119,182,0.55), 0 0 0 1px rgba(95,194,227,0.25) inset";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(148,163,184,0.12)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #5FC2E3, #0077B6)",
                    boxShadow: "0 8px 24px -10px rgba(0,119,182,0.7)",
                  }}
                >
                  <w.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground text-left leading-snug mb-2">
                  {w.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left mb-4">
                  {renderDesc(w.desc, w.highlight)}
                </p>
                <ul className="mt-auto space-y-1.5 pt-3 border-t border-white/5">
                  {w.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-[13px] text-foreground/85 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#5FC2E3] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>


          <InlineCTA
            title="Explore Microsoft consulting services designed to modernize your technology and support your long-term business objectives."
            btn="View Our Services"
          />
        </div>
      </section>

      {/* WHY CHOOSE MICROSOFT */}
      <section
        ref={setRef("why")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.why ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center">
              <span className="text-foreground">Why Choose Microsoft for </span>
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Enterprise Technology?</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              Our consultants for Microsoft assist you in identifying optimal tools and software, ensuring implementation runs smoothly, and improving how to configure your system so it supports your business today while giving you the ability to expand your company tomorrow. Utilizing their knowledge of the Microsoft technology ecosystem, we will enable you to use tools like Office 365 to create a collaborative workforce, Microsoft Teams for seamless communication across teams, & Power BI for insight into your data, resulting in enhanced operational efficiencies & overall digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {whyMicrosoft.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <w.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>

          <InlineCTA
            title="Learn why Microsoft solutions help organizations improve productivity, collaboration, and business performance."
            btn="Discover Microsoft Benefits"
          />
        </div>
      </section>

      {/* PROCESS */}
      <section
        ref={setRef("process")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center">
              <span className="text-foreground">Our </span>
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Microsoft Consulting Process</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              Before any new Microsoft project can succeed, it is important to clearly understand your company's objectives. We use a systematic process to help ensure that deploying the new technology yields quantifiable results without wasting time or money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {process.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <w.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section
        ref={setRef("outcomes")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.outcomes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center">
              <span className="text-foreground">Drive Measurable </span>
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Business Outcomes with Microsoft Solutions</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              Our Microsoft Consulting Services allow organizations to optimize their business processes/operations through improved collaboration capabilities, enhancing security, and creating a more productive work environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {outcomes.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <w.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>

          <InlineCTA
            title="See how our Microsoft consultants assist companies with improving productivity, collaboration, and overall business performance through technological advancements."
            btn="Measure Business Success"
          />
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section
        ref={setRef("tech")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.tech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center">
              <span className="text-foreground">Microsoft Technologies </span>
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">We Support</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              Our Microsoft consultants work across the Microsoft ecosystem to help you modernize infrastructure, improve collaboration, and accelerate digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
            {technologies.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-4" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                  <w.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-foreground text-left leading-snug mb-2">{w.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>

          <InlineCTA
            title="Explore the Microsoft technologies our experts implement, integrate, and optimize for growing businesses."
            btn="Explore Technologies Today"
          />
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        ref={setRef("industries")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.industries ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center">
              <span className="text-foreground">Industries </span>
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">We Serve</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              Technology-related obstacles vary from one industry to another. Microsoft consultants leverage unique approaches based on the goals and objectives of each sector. Solutions are developed specifically to help each organization reach its operational objectives and increase its collaboration, productivity, profitability, and overall business performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {["Healthcare", "Banking and Finance", "Manufacturing", "Consumer & Retail", "Distribution", "Academic", "Insurance", "Technology and SaaS"].map((industry, i) => (
              <div key={i} className="p-5 rounded-xl text-center transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <span className="text-base font-semibold text-foreground">{industry}</span>
              </div>
            ))}
          </div>

          <InlineCTA
            title="Learn more about how Microsoft consulting works with your organization to address specific technology-related issues applicable to your industry."
            btn="Learn About Your Industry"
          />
        </div>
      </section>

      {/* PARTNER */}
      <section
        ref={setRef("partner")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.partner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-center">
              <span className="text-foreground">Why Choose Code1 Tech Systems </span>
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">for Microsoft Consulting?</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.65] text-center">
              Finding the ideal Microsoft consulting partner can have a huge impact on your organization's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {partner.map((w, i) => (
              <div key={i} className="group relative p-5 lg:p-7 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(148,163,184,0.12)" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, rgba(95,194,227,0.18), rgba(0,119,182,0.18))", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <w.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground text-left leading-snug">{w.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.65] text-left">{w.desc}</p>
              </div>
            ))}
          </div>

          <InlineCTA
            title="Partner with Microsoft experts who understand your business goals and deliver solutions that create lasting value."
            btn="Meet Our Experts"
          />
        </div>
      </section>

      {/* FINAL CTA + CONTACT */}
      <section
        ref={setRef("contact")}
        className={`relative py-8 lg:py-12 overflow-hidden transition-all duration-700 ${visible.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5 text-left">
                <span className="text-foreground">Ready to Modernize Your </span>
                <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Microsoft Environment?</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-[1.75] text-left">
                Your IT should support your growth, collaboration, and innovation by giving you peace of mind. Code1 Tech Systems provides secure, scalable, and future-ready solutions that meet each of your unique business needs through Microsoft Consulting. Our experts are here to assist you in either transitioning to cloud computing, improving your collaboration capabilities, or modernizing your enterprise applications.
              </p>
            </div>
            <div>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Microsoft;
