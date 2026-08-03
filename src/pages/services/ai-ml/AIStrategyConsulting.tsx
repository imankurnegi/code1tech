import ServicePageLayout from "@/components/ServicePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  ShieldCheck,
  Building2,
  Sparkles,
  Compass,
  Handshake,
  LifeBuoy,
  Brain,
  ClipboardCheck,
  Map,
  Lightbulb,
  Layers,
  Workflow,
  Rocket,
  Cog,
  FileSearch,
  DollarSign,
  Repeat,
  BarChart3,
  Scale,
  Lock,
  Database,
  Network,
  Cloud,
  HeartPulse,
  Landmark,
  ShieldAlert,
  ShoppingBag,
  Factory,
  Truck,
  GraduationCap,
  Users,
  PhoneCall,
  MessageSquare,
  TrendingUp,
  Boxes,
  Gauge,
  ListChecks,
  Settings2,
  BookOpen,
  FileCheck2,
} from "lucide-react";
import heroImg from "@/assets/ai-strategy/ai-strategy-hero-v2.jpg";
import ftWhy1 from "@/assets/ai-strategy/why-align-business.jpg";
import ftWhy2 from "@/assets/ai-strategy/why-use-cases.jpg";
import ftWhy3 from "@/assets/ai-strategy/why-risk.jpg";
import ftWhy4 from "@/assets/ai-strategy/why-roadmap.jpg";
import indHealthcareImg from "@/assets/industry-healthcare.jpg";
import indFinanceImg from "@/assets/industry-finance.jpg";
import indRetailImg from "@/assets/industry-retail.jpg";
import indManufacturingImg from "@/assets/industry-manufacturing.jpg";
import indTechnologyImg from "@/assets/industry-technology.jpg";
import indLogisticsImg from "@/assets/de-automation-hero.jpg";
import indEducationImg from "@/assets/ai-strategy/ind-education.jpg";
import indLegalImg from "@/assets/ai-strategy/ind-legal.jpg";
import indInsuranceImg from "@/assets/ai-strategy/ind-insurance.jpg";
import indHRImg from "@/assets/ai-strategy/ind-hr.jpg";
import indTelecomImg from "@/assets/ai-strategy/ind-telecom.jpg";
import wubImg1 from "@/assets/ai-strategy/wu-business-first.jpg";
import wubImg2 from "@/assets/ai-strategy/wu-experienced.jpg";
import wubImg3 from "@/assets/ai-strategy/wu-vendor-neutral.jpg";
import wubImg4 from "@/assets/ai-strategy/wu-end-to-end.jpg";
import wubImg5 from "@/assets/ai-strategy/wu-scalable.jpg";
import wubImg6 from "@/assets/ai-strategy/wu-partnership.jpg";
import ChallengeHub from "@/components/finetuning/ChallengeHub";
import TechEcosystem from "@/components/finetuning/TechEcosystem";
import FineTuningIndustryOrbit from "@/components/ai-ml/FineTuningIndustryOrbit";
import WhyUsBlueprint from "@/components/WhyUsBlueprint";
import {
  useReveal,
  InlineCTA,
  WhyMattersSticky,
  ServicesBento,
  ClosingContact,
  SectionTitle,
} from "@/components/ai-ml/AIMLPageSections";
import { PremiumBenefitsShowcase } from "@/components/ai-ml/PremiumBenefitsShowcase";

const whyMatters = [
  { icon: Target, image: ftWhy1, title: "Align AI with Your Business Strategies", desc: "Our Enterprise AI Consulting services help businesses leverage AI to enhance processes, improve the customer experience, and achieve measurable outcomes aligned with company goals." },
  { icon: Lightbulb, image: ftWhy2, title: "Make Use of Useful AI Scenarios", desc: "Not all processes should use AI. Our approach includes evaluating processes, data, and operational problems to identify AI Opportunity Assessment programs that are most beneficial for the business." },
  { icon: ShieldCheck, image: ftWhy3, title: "Minimize AI Adoption Risks", desc: "Using AI without proper planning leads to increased costs and delays. Our AI Readiness Assessment analyzes technology, data, and processes to define risk and create a strong foundation." },
  { icon: Map, image: ftWhy4, title: "Build a Future-Ready AI Roadmap", desc: "AI is a continuous business process rather than a one-time operation. Therefore, our AI Roadmap Development strategy is based on the idea that optimal solutions can be implemented gradually." },
];

const services = [
  { icon: ClipboardCheck, title: "AI Readiness Assessment", desc: "AI implementation begins with assessing your existing potential. Our AI Readiness Assessment checks how well your technology, data, business processes, and overall organizational readiness are aligned to identify strengths and weaknesses and build a foundation for AI transformation." },
  { icon: Map, title: "AI Strategy Roadmap Development", desc: "Create a practical plan for implementing your AI vision with the help of our AI Roadmap Development services. Our experts define the main aspects of an efficient AI implementation plan, including strategic priorities, implementation phases, tech recommendations, and measurable outcomes." },
  { icon: Lightbulb, title: "AI Opportunity Identification", desc: "Every organization can leverage AI to drive business value. With our AI Opportunity Assessment, we study your organization's processes and customer interactions to find the types of usage that can bring maximum value." },
  { icon: ListChecks, title: "AI Use Case Identification", desc: "Selecting the right AI use cases is critical for value and return on investment. Therefore, we analyze your challenges, goals, and future growth strategies to identify AI use cases that will help you achieve tangible results." },
  { icon: Workflow, title: "Business Processes Assessment", desc: "Business processes must be efficient for AI solutions to be implemented successfully. We analyze existing processes, opportunities for automation, and inefficiencies, then recommend improvements enabled by AI." },
  { icon: Sparkles, title: "AI Generative Strategy", desc: "Generative AI is redefining how businesses innovate, cooperate, and satisfy consumer demands. Our team identifies valuable use cases, analyses implementation requirements, and creates a strategy that ensures effective implementation while aligning with the overall business and future ambitions." },
  { icon: Building2, title: "AI Enterprise Consultation", desc: "Enterprise AI Consulting refers to the services we offer to help companies create an efficient AI strategy that is compatible with existing systems and processes. All AI solutions we implement contribute to operational effectiveness, goal achievement, governance compliance, and harmonious digital transformation." },
  { icon: ShieldCheck, title: "AI Governance and Responsibility", desc: "Responsible AI builds trust, reduces risks, and ensures success through governance structure creation, ethical AI practices and compliance development, and security framework development." },
  { icon: Settings2, title: "Selection of AI Technology", desc: "Selecting the appropriate AI technology can determine the success or failure of the project. We analyze up-to-date AI platforms, cloud technologies, and development methodologies to select options that suit your business goals, budget, infrastructure, and long-term technology development." },
  { icon: FileCheck2, title: "Proof Of Concept (PoC) Strategy", desc: "Test your AI ideas before deploying them to production. Our Proof of Concept (PoC) strategy allows you to check the practicality of technology, assess project value, and minimize risk, helping you invest your money wisely based on real data." },
  { icon: DollarSign, title: "AI ROI Assessment", desc: "Knowing how AI impacts the company financially is important to make smart decisions. We measure expenses and expected results in business and operations so that our clients have a clear plan to make a return on their investment in AI." },
  { icon: Rocket, title: "AI Transformation Consulting", desc: "AI transformation is not only about the technology itself. We help companies with strategic thinking, implementing modern processes, and working with stakeholders to turn AI into a long-term competence." },
];

const process = [
  { icon: MessageSquare, title: "Business Discovery Workshop", desc: "All projects begin with a comprehensive analysis of your business goals and operational problems. Our consultants work closely with important stakeholders to determine objectives, productivity measuring criteria, and the framework for the AI implementation process." },
  { icon: FileSearch, title: "Current State Assessment", desc: "The analysis of your current technology, data, and operational ability is equally important. With our AI Readiness Assessment, we assess your organization's infrastructure, processes, and data quality to identify strengths and weaknesses in your AI readiness." },
  { icon: Lightbulb, title: "AI Opportunity Mapping", desc: "Not every process is suitable for AI transformation. We conduct a comprehensive AI Opportunity Assessment to determine the most appropriate use cases for AI based on their business relevance, implementation difficulty, prospective outcomes, and alignment with your institution's goals." },
  { icon: Map, title: "AI Strategy Development", desc: "Based on the research conducted, we release an AI Roadmap Development proposal that summarizes the strategic initiatives, required technologies, eventual implementation timing, governance considerations, and measurable milestones that will ensure sustainable adoption of AI in your organization." },
  { icon: Settings2, title: "Technology and Platform Selection", desc: "Choosing the appropriate AI tools can make or break the project. Therefore, we study various AI platforms, cloud services, and tools to provide the best proposal based on your needs, budget, scalability, and existing technical resources." },
  { icon: FileCheck2, title: "Proof of Concept Planning", desc: "Before starting large implementation programs, we suggest creating a Proof of Concept (PoC) to check whether this technology can work, whether it truly benefits the business, and to reduce potential risks. PoC provides actionable data that will help make decisions on further investments." },
  { icon: Rocket, title: "Implementation Roadmap", desc: "Keeping the roadmap simple for automation strategies allows organizations to monitor and assess the effectiveness of AI initiatives. At this stage, each phase of the project, required resources, deadlines, and management approach will be determined to ensure the successful introduction of AI into business processes." },
  { icon: Handshake, title: "AI Adoption and Change Management", desc: "For a technology implementation to be successful, people must be willing to accept change. At this stage, we establish an approach to involve different parties in the implementation process." },
];

const journey = [
  { label: "Discover", Icon: MessageSquare },
  { label: "Assess", Icon: FileSearch },
  { label: "Map", Icon: Lightbulb },
  { label: "Strategize", Icon: Map },
  { label: "Select", Icon: Settings2 },
  { label: "PoC", Icon: FileCheck2 },
  { label: "Deploy", Icon: Rocket },
  { label: "Adopt", Icon: Handshake },
];

const challenges = [
  { icon: Compass, title: "Undefined AI Vision and Strategy", desc: "While investing in AI, many companies do not define their goals and strategy. AI Strategy Roadmap Development aims to align AI investments with business goals, clarifying the vision that will support innovation and operational efficiency." },
  { icon: Lightbulb, title: "Inability to Select the Most Valuable AI Use Cases", desc: "AI is not the answer to every business problem. With the help of AI Opportunity Assessment, we analyze companies' operations, customer journeys, and goals to identify feasible AI use cases that deliver real benefits." },
  { icon: Scale, title: "Mismatch Between Technology and Business", desc: "AI projects often fall short of expectations because technical processes fail to meet business requirements. Our Enterprise AI Consulting eliminates this gap by aligning technology decisions with operational goals to ensure every AI project is viable." },
  { icon: Database, title: "Data Readiness and Quality Challenges", desc: "In terms of performance, AI relies on accurate, well-organized data. We analyze your data environment to ensure your data is high quality and usable for accurate predictions, process automation, and informed decision-making." },
  { icon: Layers, title: "Legacy System Integration Complexities", desc: "Integrating AI with company systems can also be problematic. We create plans to integrate AI solutions into your existing system to reduce implementation risks." },
  { icon: Lock, title: "AI Governance and Compliance Concerns", desc: "Governance means using AI wisely. We set up AI Governance frameworks that consider privacy, compliance, safety, transparency, and ethical usage, helping you use AI efficiently." },
  { icon: Boxes, title: "Scaling AI Across the Enterprise", desc: "Our AI Transformation Strategy helps implement AI at the enterprise level, ensure uniform implementation across departments, optimize allocated resources, and adhere to governance policies that support continuous innovation and sustainable business models." },
  { icon: DollarSign, title: "Managing AI Investment and ROI Expectations", desc: "Organizations need assurance of the profitability of their AI investment. We study implementation costs, expected business impact, and priorities, then develop our own plans for introduction while balancing innovation with operational delivery and business development." },
];

const industries = [
  { icon: HeartPulse, title: "Healthcare", tag: "Life Sciences", image: indHealthcareImg, intro: "The healthcare sector needs AI strategies to improve patient care while complying with the required laws. Our Enterprise AI Consulting helps organizations enhance clinic processes, automate administration, improve diagnosis, and support data-driven healthcare delivery." },
  { icon: Landmark, title: "Banking and Financial Services", tag: "BFSI", image: indFinanceImg, intro: "Banks and other financial organizations must always balance innovation, security, and compliance. Our AI strategies identify opportunities to improve fraud detection, provide instant customer service, automate document workflows, strengthen risk management, and maintain compliance and operations." },
  { icon: ShieldAlert, title: "Insurance", tag: "InsurTech", image: indInsuranceImg, intro: "The insurance industry handles extensive documentation, claims, and customer communication. Our Assessment of AI Opportunities helps identify AI applications that speed up claims processing, improve underwriting, personalize customer interactions, and enhance insurance processes end-to-end." },
  { icon: ShoppingBag, title: "Retail and eCommerce", tag: "Commerce", image: indRetailImg, intro: "Retail firms collect lots of important data about customers and operations regularly. We support businesses in implementing AI strategies to personalize the shopping experience, improve inventory management and forecasting, and enhance customer engagement across digital and physical platforms." },
  { icon: Factory, title: "Manufacturing", tag: "Industry 4.0", image: indManufacturingImg, intro: "Manufacturing companies want to improve their efficiency, product quality, and operations visibility. Our AI consulting service shows companies how to gain from predictive maintenance applied to production, limit production-related expenses and waste, and boost overall productivity." },
  { icon: Truck, title: "Logistics and Supply Chain", tag: "Logistics", image: indLogisticsImg, intro: "Supply chain operations rely on prompt decision-making and accurate information. We develop AI strategies that improve demand forecasting, route optimization, warehouse operations, shipment monitoring, and logistics." },
  { icon: Scale, title: "Legal Services", tag: "LegalTech", image: indLegalImg, intro: "Legal experts deal with complex documents, compliance cases, and information daily. Our AI service helps firms review documents, conduct research, analyze contracts, and manage knowledge effectively while ensuring compliance with legal requirements." },
  { icon: GraduationCap, title: "Education", tag: "EdTech", image: indEducationImg, intro: "To improve both learning and administration, schools are becoming more technologically savvy. We help them create an AI adoption plan that meets their goals of creating personalized experiences for students, automating administrative work, and improving decision-making efficiency." },
  { icon: Users, title: "Human Resources", tag: "HRTech", image: indHRImg, intro: "In HR, teams are busy with finding new employees, monitoring employee satisfaction, and planning various workforce-related activities. We help them use AI technologies to identify opportunities to automate processes such as candidate selection, employee feedback analysis, and general HR operations." },
  { icon: PhoneCall, title: "Telecommunication", tag: "Telecom", image: indTelecomImg, intro: "Telecommunication companies encounter numerous client-service requests and process a large amount of operational information. We develop AI plans that enable them to improve service support and increase operational efficiency." },
];

const technologies = [
  { icon: Sparkles, title: "Generative AI Platforms", desc: "We help organizations evaluate top Generative AI platforms based on organizational goals, data security, scalability, and implementation needs. Our suggestions help ensure you implement technology that delivers significant profit and enables you to move forward with innovation and growth.", chips: ["OpenAI", "Anthropic", "Vertex AI"] },
  { icon: BookOpen, title: "Large Language Models (LLMs)", desc: "Selecting the appropriate Large Language Model (LLM) depends on the intended purpose, company sector, and regulatory requirements. We evaluate popular commercial and open systems to recommend solutions that balance overall performance, flexibility, cost, and solution maturity.", chips: ["GPT", "Claude", "Llama"] },
  { icon: Layers, title: "AI Development Frameworks", desc: "An effective development framework streamlines AI implementation and simplifies future upgrades. We recommend various AI frameworks, including PyTorch, TensorFlow, Hugging Face, and LangChain, which help develop powerful, scalable, and well-performing AI applications.", chips: ["PyTorch", "TensorFlow", "LangChain"] },
  { icon: Cloud, title: "Cloud AI Services", desc: "The importance of cloud infrastructures in the successful implementation of AI can hardly be overestimated. We assist organizations in analyzing AWS, Microsoft Azure, Google Cloud, and hybrid infrastructures to ensure smooth operation of your AI-powered solutions across scalability, stability, security, and cost-effectiveness for enterprise workloads.", chips: ["AWS", "Azure", "GCP"] },
  { icon: Cog, title: "AI Automation Platforms", desc: "Automation improves productivity by eliminating repetitive tasks and improving operational efficiency. Thus, we offer recommendations for AI Automation platforms that fit your business processes to create intelligent workflows, accelerate decision-making, and improve customer and employee experience.", chips: ["n8n", "Zapier", "Power Automate"] },
  { icon: Database, title: "Data and Analytics Ecosystem", desc: "Reliable AI is achievable due to high-quality data and actionable insights. We analyze your data architecture, as well as analytics platforms and governance processes, to ensure your AI initiatives are backed by accurate, secure, and well-managed data.", chips: ["Snowflake", "Databricks", "BigQuery"] },
  { icon: ShieldCheck, title: "Safety and Governance of Artificial Intelligence", desc: "Artificial Intelligence for Businesses needs effective governance and risk management measures in place. Our consulting services include developing suitable frameworks for managing AI, advising on responsible AI practices and security measures, and ensuring compliance and data defense.", chips: ["Governance", "Compliance", "Responsible AI"] },
];

const benefits = [
  { icon: Rocket, title: "Accelerate AI Adoption", desc: "Creating an effective AI strategy reduces confusion and lays out a clear route for implementation. The AI Transformation Strategy allows businesses to prioritize and make fast decisions while using AI." },
  { icon: DollarSign, title: "Make Smarter AI Investment Decisions", desc: "Each AI investment must be made according to measurable criteria. We offer AI ROI Assessment services to analyze key opportunities, potential profits, implementation costs, and company priorities." },
  { icon: ShieldCheck, title: "Reduce Implementation Risks", desc: "Our AI Readiness Assessment helps highlight risks, address gaps in our capabilities, and develop management processes that increase the likelihood of success and eliminate implementation hindrances." },
  { icon: Gauge, title: "Improve Operational Efficiency", desc: "Artificial intelligence improves effective decision-making. We identify the areas where intelligent automation delivers clear benefits for productivity, resource utilization, and operational efficiency." },
  { icon: TrendingUp, title: "Strengthen Competitive Advantage", desc: "Companies with a reliable AI strategy respond faster to market shifts. Our enterprise AI consulting leverages new technologies for innovation, improving services and ensuring a competitive advantage." },
  { icon: Repeat, title: "Build a Future-Ready Organization", desc: "AI is developing fast, and the overall business strategy should keep pace with it as well. We develop scalable AI roadmap strategies that ensure ongoing innovation for the organization." },
  { icon: BarChart3, title: "Drive Sustainable Business Growth", desc: "AI implementation provides long-term benefits beyond efficiency improvement. By tailoring AI programs to organizational goals, we help improve customer experience and discover new possibilities." },
];

const whyChoose = [
  { icon: Compass, image: wubImg1, title: "Business-First AI Consulting", desc: "At Code1 Tech Systems, we adhere to an AI consulting methodology that identifies where AI can deliver real impact, ensuring our proposals and recommendations align with your goals and priorities." },
  { icon: Brain, image: wubImg2, title: "Experienced AI Strategy Consultants", desc: "The consultants at Code1 Tech Systems are trained in Generative AI, Machine Learning, Large Language Models, and enterprise AI adoption to build successful AI strategies that address real-world business problems." },
  { icon: Network, image: wubImg3, title: "Vendor-Neutral Technology Recommendations", desc: "Selecting the best technology should be based on your specific needs instead of vendors' bias. We help you make the right decisions by providing sound advice on AI platforms, frameworks, and cloud services." },
  { icon: Boxes, image: wubImg4, title: "End-to-End AI Expertise", desc: "From AI readiness assessments and strategy development to implementation planning and optimization, we advise our clients on all aspects of their AI projects, reducing implementation-related risks." },
  { icon: Repeat, image: wubImg5, title: "Scalable, Future-Ready AI Strategies", desc: "Because businesses change, their AI strategies must change as well. We develop AI Roadmap plans that enable continuous improvement and adaptability." },
  { icon: LifeBuoy, image: wubImg6, title: "Collaborative Partnership and Ongoing Support", desc: "The success of AI transformation depends on clear communication. Our company cooperates with clients' representatives transparently and provides follow-up support to help achieve successful results." },
];

const AIStrategyConsulting = () => {
  const { visible, setRef } = useReveal();

  return (
    <ServicePageLayout>
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
                <picture>
                  <source
                    srcSet="/images/ai-strategy/hero-768.avif 768w, /images/ai-strategy/hero-1280.avif 1280w, /images/ai-strategy/hero-1920.avif 1920w"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/ai-strategy/hero-768.webp 768w, /images/ai-strategy/hero-1280.webp 1280w, /images/ai-strategy/hero-1920.webp 1920w"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    type="image/webp"
                  />
                  <img
                    src="/images/ai-strategy/hero-1280.jpg"
                    srcSet="/images/ai-strategy/hero-768.jpg 768w, /images/ai-strategy/hero-1280.jpg 1280w"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    alt="AI strategy and consulting roadmap"
                    className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover"
                    loading="eager"
                    fetchPriority="high"
                    width={1280}
                    height={720}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              </div>
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
            </div>

            <div className={`transition-all duration-1000 ease-out delay-150 ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <Link to="/services/ai-ml-solutions" className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                ← AI / ML
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left">
                <span className="text-foreground">AI Strategy & Consulting Company for </span>
                <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Business-Driven AI Transformation</span>
              </h1>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left">
                <p>The success of AI begins with the right strategy, not the right technology. Code1 Tech Systems is an AI Strategy and Consulting Company that helps businesses identify the best AI opportunities, create realistic implementation timelines, and implement smart solutions that make operations more efficient and results more effective and measurable.</p>
              </div>
              <Link to="/contact">
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  Talk to Our AI Consultants
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhyMattersSticky
        sectionId="why-matters"
        pre="Why AI Strategy &"
        hi="Consulting Matters"
        sub="The success of an AI project relies on knowing where it is headed. Our AI Consulting Services enable companies to align their AI expenses with their organizational objectives while keeping implementation hurdles to a minimum, paving the way for future innovation and growth."
        items={whyMatters}
        visible={visible}
        setRef={setRef}
      />

      <InlineCTA
        title="Ready to create an AI strategy that delivers measurable business results?"
        sub="Partner with our consultants to shape a business-first AI roadmap."
        btn="Start Your AI Journey"
      />

      <section
        ref={setRef("services")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Our AI Strategy &"
            hi="Consulting Services"
            sub="Every company has its own stage on the AI road. Our AI Strategy Consulting Services support organizations in evaluating their readiness level, identifying potential scenarios, developing implementation plans, and integrating AI technologies and solutions to achieve long-term growth and measurable business results."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 ${visible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    background: "linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.5) 100%)",
                    border: "1px solid rgba(148,163,184,0.12)",
                    transitionDelay: `${idx * 50}ms`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,78,158,0.25) 0%, rgba(95,194,227,0.15) 100%)", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        title="Looking for an AI strategy tailored to your business goals and growth plans?"
        sub="Speak with our strategists to map priorities, use cases, and ROI."
        btn="Talk to Our AI Strategy Experts"
      />

      <section
        ref={setRef("challenges")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Business"
            hi="Challenges We Solve"
            sub="Many companies recognize the advantages AI can bring; however, turning these ideas into reality is full of challenges. Our AI Strategy Consulting services help companies tackle strategic, operational, and technological obstacles to accelerate AI integration across their operations."
          />
          <ChallengeHub
            items={challenges}
            centerIcon={Compass}
            centerLabel={
              <>
                AI Strategy
                <br />
                Solutions
              </>
            }
            centerTagline="Strategy Hub"
          />
        </div>
      </section>

      <InlineCTA
        title="Facing challenges that are slowing your AI transformation journey?"
        sub="Bring us your toughest blocker and we'll help you clear the path."
        btn="Let's Solve Them Together"
      />

      <section
        ref={setRef("industries")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Industries"
            hi="We Serve"
            sub="In each industry, there are unique operational hurdles and prospects for growth. Our AI Strategy Consulting services help firms develop practical AI strategies that align with their business goals, drive innovation, and deliver measurable results across sector-specific cases."
          />
          <FineTuningIndustryOrbit items={industries} />
        </div>
      </section>

      <InlineCTA
        title="Looking for an AI strategy designed specifically for your industry?"
        sub="Our industry specialists will map AI to your workflows and outcomes."
        btn="Consult Our Industry Experts"
      />

      <section
        ref={setRef("process")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Our AI Strategy and"
            hi="Consulting Process"
            sub="The deployment of a successful AI strategy requires a systematic, fact-based approach. Our AI Strategy Consulting provides a tried-and-true system of assessment and monitoring that allows organizations to measure the implementation level of AI and its effect on the business."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 ${visible.process ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    background: "linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.5) 100%)",
                    border: "1px solid rgba(148,163,184,0.12)",
                    transitionDelay: `${idx * 60}ms`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,78,158,0.25) 0%, rgba(95,194,227,0.15) 100%)", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        title="Ready to turn your AI vision into a practical execution plan?"
        sub="We'll translate your strategy into a step-by-step delivery roadmap."
        btn="Build Your AI Roadmap"
      />


      <section
        ref={setRef("tech")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Technologies &"
            hi="Platforms We Advise On"
            sub="Identifying the right AI ecosystem is a critical part of determining the right AI strategy. Our AI Strategy Consulting Services allow organizations to consider technologies, platforms, and frameworks that align with operational objectives, growth potential, security, and sustained innovation."
          />
          <TechEcosystem items={technologies} />
        </div>
      </section>

      <InlineCTA
        title="Need expert guidance on selecting the right AI technologies for your business?"
        sub="Our advisors will match the ideal stack to your budget and scale."
        btn="Speak with Our AI Advisors"
      />

      <PremiumBenefitsShowcase
        sectionId="benefits"
        pre="Business Benefits of"
        hi="AI Strategy & Consulting"
        sub="An effective AI strategy enables businesses to make wise decisions, lessen implementation risks, and increase business profitability. Our AI consultants provide successful AI implementation services to firms with complete direction, confidence, and plans for continuing development."
        items={benefits}
        visible={visible}
        setRef={setRef}
      />

      <InlineCTA
        title="Ready to unlock the full business potential of AI with a clear strategy?"
        sub="Book a strategy session and unlock measurable outcomes."
        btn="Plan Your AI Strategy"
      />

      <section
        ref={setRef("why")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Why Choose"
            hi="Code1 Tech Systems"
            sub="Choosing the right AI consulting partner can be pivotal to the success of your transformation journey. Code1 Tech Systems' specialization comes from its combination of strategic know-how, technical superiority, and industry experience. Thus, they can provide you with cutting-edge AI strategy consulting services, ensuring measurable business value."
          />
          <WhyUsBlueprint
            items={whyChoose}
            centerIcon={Compass}
            centerLabel="CODE1 AI"
            centerTagline="Strategy to Impact"
            lifecycleLabel="AI STRATEGY LIFECYCLE"
            ariaLabel="AI strategy consulting capabilities"
          />
        </div>
      </section>

      <ClosingContact
        sectionId="contact"
        heading="Ready to partner with"
        hi="AI consultants"
        tail="who put your business goals first?"
        para="From AI readiness assessments and roadmap development to technology selection, PoC planning, and enterprise-wide transformation — our specialists guide you at every stage of your AI journey, ensuring measurable business value and responsible adoption."
        bullets={[
          "Business-first AI strategy aligned to measurable outcomes",
          "AI readiness, opportunity, and use-case identification",
          "Vendor-neutral technology, platform, and PoC guidance",
          "End-to-end roadmap, governance, and change management",
        ]}
        serviceName="AI Strategy & Consulting"
        btn="Partner with Code1 Tech Systems"
        visible={visible}
        setRef={setRef}
      />
    </ServicePageLayout>
  );
};

export default AIStrategyConsulting;
