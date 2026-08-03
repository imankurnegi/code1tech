import ServicePageLayout from "@/components/ServicePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  Workflow,
  UserCheck,
  Files,
  Headphones,
  BookOpen,
  ShieldCheck,
  Languages,
  Search,
  Cog,
  Wrench,
  ScanText,
  Bot,
  Smile,
  Tags,
  UserSearch,
  SearchCode,
  Mic,
  FileScan,
  Globe2,
  FileText,
  Sparkles,
  HeartPulse,
  Landmark,
  ShieldAlert,
  ShoppingBag,
  Factory,
  Truck,
  Scale,
  GraduationCap,
  Users,
  PhoneCall,
  Brain,
  Puzzle,
  CloudCog,
  Cloud,
  Plug,
  Gauge,
  Smile as SmileIcon,
  Lightbulb,
  Rocket,
  TrendingDown,
  Scaling,
  UsersRound,
  Layers,
  Handshake,
  ClipboardList,
  LifeBuoy,
  Compass,
  MessageCircle,
  ShieldEllipsis,
  Network,
} from "lucide-react";
import nlpHero from "@/assets/nlp/nlp-hero.jpg";
import techLLM from "@/assets/nlp/tech-llm.jpg";
import techFrameworks from "@/assets/nlp/tech-frameworks.jpg";
import techRAG from "@/assets/nlp/tech-rag.jpg";
import techAgents from "@/assets/nlp/tech-agents.jpg";
import indHealthcareImg from "@/assets/industry-healthcare.jpg";
import indFinanceImg from "@/assets/industry-finance.jpg";
import indRetailImg from "@/assets/industry-retail.jpg";
import indManufacturingImg from "@/assets/industry-manufacturing.jpg";
import indTechnologyImg from "@/assets/industry-technology.jpg";
import indLogisticsImg from "@/assets/de-automation-hero.jpg";
import indEducationImg from "@/assets/education/education-hero.jpg";
import wubImg1 from "@/assets/finetuning/why/why-1.jpg";
import wubImg2 from "@/assets/finetuning/why/why-2.jpg";
import wubImg3 from "@/assets/finetuning/why/why-3.jpg";
import wubImg4 from "@/assets/finetuning/why/why-4.jpg";
import wubImg5 from "@/assets/finetuning/why/why-5.jpg";
import ChallengeHub from "@/components/finetuning/ChallengeHub";
import TechEcosystem from "@/components/finetuning/TechEcosystem";
import FineTuningIndustryOrbit from "@/components/ai-ml/FineTuningIndustryOrbit";
import WhyUsBlueprint from "@/components/WhyUsBlueprint";
import {
  useReveal,
  InlineCTA,
  WhyMattersSticky,
  ServicesBento,
  BenefitsGrid,
  ClosingContact,
  SectionTitle,
} from "@/components/ai-ml/AIMLPageSections";

const whyMatters = [
  { icon: Database, image: techLLM, title: "Turn Unstructured Data into Actionable Insights", desc: "A lot of business information can be found in emails, reports, contracts, requests for help, and various customer opinions. Our Natural Language Processing services help analyze and classify this data to make decisions faster and more effectively, providing the information your employees need to work efficiently." },
  { icon: Workflow, image: techFrameworks, title: "Automate Repetitive Language-Based Tasks", desc: "Actions such as email sorting, document classification, and invoice processing consume time and energy unnecessarily. With our Natural Language Processing technologies, these tasks can be automated to make the workflow more effective." },
  { icon: UserCheck, image: techRAG, title: "Provide Customers with Personalized Experiences", desc: "Today's customers want engagements that are accurate, personalized, and quick. Businesses are now utilizing AI and machine learning technologies, including Conversational AI, Sentiment Analysis, and Intelligent Language Understanding, to provide the required support, boost engagement, and develop strong relationships with customers at every engagement point." },
];

const services = [
  { icon: Wrench, title: "Tailored NLP Development", desc: "Every company has its own way of doing things, which means that ready-made solutions can be inadequate. We develop bespoke NLP systems that take your needs into account, integrate with your existing software, and deliver scalable performance." },
  { icon: ScanText, title: "Smart Document Processing", desc: "If you handle your invoices, contracts, and reports manually, you slow down your company and increase errors. With our smart document processing services, we provide tools that automatically extract, classify, and organize data, speeding up workflows and increasing accuracy." },
  { icon: Bot, title: "AI Chatbots and Virtual Assistants", desc: "Get immediate customer assistance with AI chatbots and virtual assistants. With our expertise in Natural Language Processing, we create solutions that carry on conversations and understand what the user wants." },
  { icon: Smile, title: "Sentiment Analysis", desc: "Know the true sentiments of your customers regarding your products, services, or brands. Our sentiment analysis solutions give businesses insights from reviews, surveys, and social media, enabling them to make intelligent decisions that strengthen relationships with their clients." },
  { icon: Tags, title: "Text Classification", desc: "In a world where large volumes of text cannot be handled manually, companies provide intelligent text classification solutions that classify all textual materials automatically with a single click." },
  { icon: UserSearch, title: "Named Entity Recognition", desc: "With Named Entity Recognition, you can obtain valuable information from unstructured content. Our NLP is capable of identifying people, organizations, places, and different key entities." },
  { icon: SearchCode, title: "Semantic Search Solutions", desc: "Semantic search solutions are not the same as traditional keyword searches, which only return results about the letter \"M\". Semantic search solutions provide on-point answers and help customers and employees find answers quickly and easily." },
  { icon: Mic, title: "Solutions for Speech Recognition", desc: "AI speech recognition technology enables the conversion of spoken conversations into organized and accessible data. We create solutions that improve access, automate transcription, and provide insight into voice communication to support businesses." },
  { icon: FileScan, title: "Text Extraction Using Optical Character Recognition", desc: "Optical Character Recognition and Natural Language Processing technologies can be combined to digitize printed and handwritten text. Our technologies extract useful information from scanned documents, reducing manual data entry and improving the speed and consistency of document access." },
  { icon: Globe2, title: "Translation Solutions", desc: "Expand your business worldwide with translation solutions. Our team of engineers develops multilingual NLP systems for translation while preserving context." },
  { icon: FileText, title: "Text Summarization", desc: "Receiving large amounts of text can slow decision-making. AI text summarization technology provides valuable summaries that allow teams to review reports, research papers, contracts, etc. without losing the essential information." },
  { icon: Sparkles, title: "Advantages of Modern Models", desc: "Using modern large language models to transform business applications is highly advantageous. Our experience allows us to integrate our solutions into existing systems, providing your business with opportunities for effective content generation, data retrieval, and more." },
];

const challenges = [
  { icon: Files, title: "Handle Bigger Amounts of Unstructured Data", desc: "Information crucial for a business is often found in various places, from emails and documentation to consumers' chats and reports. Our NLP technologies organize, analyze, and collect information from unstructured data, making it easier to access, understand, and use." },
  { icon: FileScan, title: "Minimize Manual Processes in Document Handling", desc: "Manual processes lead to higher operational expenses and slower operations. Our technology automation can help extract, categorize, and validate data in contracts, bills, forms, and records, enabling faster processes without compromising consistency, correctness, or requirements across all departments." },
  { icon: Headphones, title: "Enhance Customer Support Performance", desc: "Customers need prompt, accurate responses across various communication channels. We use AI-powered NLP solutions to respond to routine requests, generate recommendations, and create tailored interactions that enhance the customer experience and improve response and resolution processes." },
  { icon: BookOpen, title: "Share Knowledge throughout the Enterprise", desc: "Valuable corporate knowledge remains concealed in the internal systems and documentation. We provide intelligent search solutions so employees can find the necessary information and collaborate effectively." },
  { icon: ShieldCheck, title: "Facilitate Compliance with Regulations", desc: "Compliance with industry standards goes hand in hand with working with numerous documents. Our NLP-based solutions automatically analyze documents and find crucial information useful for compliance and standards monitoring." },
  { icon: Languages, title: "Overcome Language Barriers", desc: "To operate in other markets, it is important to communicate in several languages. NLP enables text translation, content localization, and communication with customers in their own languages." },
  { icon: Search, title: "Improve Enterprise Search", desc: "Standard keyword search methods frequently yield incomplete or irrelevant search results. Our semantic search solutions take context and intent into account, so employees and customers can find the right information sooner and more efficiently, resulting in better productivity and a more user-friendly search experience." },
  { icon: Cog, title: "Automate Mundane Business Processes", desc: "Monotonous, logic-oriented tasks take much of workers' time and resources. We create intelligent automation solutions that simplify document processing, email processing, customer communication, and approval processes so employees can devote their time to innovation and other critical business needs." },
];

const engagementModels = [
  { icon: UsersRound, title: "Dedicated Development Team", desc: "Create a better team of professional NLP specialists, and AI experts who will work only on your project. This model is well-suited for long-term projects that require ongoing development while maintaining a smooth collaboration process." },
  { icon: Users, title: "Team Augmentation", desc: "You can add skilled NLP specialists to your existing development team to integrate them into your process easily." },
  { icon: ClipboardList, title: "Engagements Based on Projects", desc: "This is perfect for organizations with clear specifications and guidelines. We take complete control of the entire process of developing NLP solutions, including planning, implementation, and deployment, allowing us to deliver high standards of quality within agreed parameters." },
  { icon: Compass, title: "Consulting around Artificial Intelligence and Strategy", desc: "If you do not know how to get started with Natural Language Processing, our professionals will evaluate your business tasks, identify the most promising opportunities, suggest appropriate technologies, and build a clear development plan to fit your objectives and digital transformation strategy." },
  { icon: Lightbulb, title: "Development of the Proof of Concept", desc: "Assess your concept in NLP before investing your money into it. We create a proof of concept that demonstrates both the feasibility of your idea and the business benefits of NLP solutions, helping you make more informed decisions." },
  { icon: LifeBuoy, title: "Support and Maintenance", desc: "Once we finish implementing your NLP solution, we do not stop working with you. Our company is there to continue monitoring its performance and improving the solution for operational efficiency." },
];

const journey = [
  { label: "Ingest", Icon: Files },
  { label: "Structure", Icon: ScanText },
  { label: "Train", Icon: Brain },
  { label: "Evaluate", Icon: ClipboardList },
  { label: "Deploy", Icon: Rocket },
  { label: "Improve", Icon: Workflow },
];

const industries = [
  { icon: HeartPulse, title: "Healthcare", tag: "Life Sciences", image: indHealthcareImg, intro: "Organizations in the sector deal with enormous amounts of patient data, clinical documents, and medical records. Our solutions make information extraction easier, support clinical decision-making, improve documentation quality, and enable a better patient experience backed by data security and regulatory compliance." },
  { icon: Landmark, title: "Banking and Financial Services", tag: "BFSI", image: indFinanceImg, intro: "In the financial sector, organizations process huge volumes of data concerning clients, financial transactions, and laws. Code1 Tech Systems has developed NLP solutions that automate document analysis, improve fraud detection, provide proper customer service, and support data-driven decision-making." },
  { icon: ShieldAlert, title: "Insurance", tag: "InsurTech", image: indFinanceImg, intro: "In the insurance industry, companies manage huge amounts of documentation every day. Our NLP solutions help automate document processing, speed up claims processing, improve risk assessment, and enhance customer service through intelligent, context-aware tools." },
  { icon: ShoppingBag, title: "Retail and eCommerce", tag: "Commerce", image: indRetailImg, intro: "Through customer reviews, product descriptions, and customer service interactions, companies gather insights that reveal customers' behavior. Our company proposes solutions that allow retailers to understand customers' sentiments, customize shopping processes, manage product categorization processes automatically, and engage with clients more effectively via AI-based natural language processing." },
  { icon: Factory, title: "Manufacturing Industry", tag: "Industry 4.0", image: indManufacturingImg, intro: "Manufacturers provide various documents, including manuals, quality reports, maintenance history, and the types of supplies received. The NLP technology our company offers facilitates the processing of large amounts of data, so that the exchange of information is quicker and compliance is easier to achieve." },
  { icon: Truck, title: "Logistics and Supply Chain", tag: "Logistics", image: indLogisticsImg, intro: "Companies in the supply chain area rely heavily on proper documentation and timely interaction with all stakeholders. We design NLP solutions that automate the generation of shipping documents, import logistics information, coordinate communication channels, and produce reports with practical suggestions." },
  { icon: Scale, title: "Legal Field", tag: "LegalTech", image: indEducationImg, intro: "Legal specialists spend much time reviewing contracts, agreements, and various documents, and the Natural Language Processing software we provide enables quick analysis of legal papers, highlighting important clauses and making information accessible from different perspectives." },
  { icon: GraduationCap, title: "Education", tag: "EdTech", image: indEducationImg, intro: "Higher education institutions oversee the admission process, maintain student records, and establish communication channels. Our NLP solutions help manage the educational process, accelerate learning, and automate communication among all parties involved." },
  { icon: Users, title: "Human Resources", tag: "HRTech", image: indTechnologyImg, intro: "HR specialists work with resumes, workers' records, performance appraisals, and communications daily. We propose our innovative NLP solutions to simplify the process of searching for the proper candidates as well as to enhance document management and analysis of workforce feedback." },
  { icon: PhoneCall, title: "Telecommunications", tag: "Telecom", image: indTechnologyImg, intro: "Telephone companies deal with a great number of customer inquiries, service orders, and technical documentation. Our NLP solutions improve automation in customer service, analyze customer feedback, optimize information management, and assist service personnel in problem-solving." },
];

const technologies = [
  { icon: Brain, title: "Large Language Models (LLMs)", desc: "Our solutions utilize the most advanced large language models to implement intelligent applications that can understand context, generate relevant responses, summarize information, and assist in automating business processes. Our team selects the best model based on the project's requirements.", chips: ["GPT", "Claude", "Llama"] },
  { icon: Puzzle, title: "NLP Frameworks and Libraries", desc: "Our specialists use reliable frameworks, including spaCy, Hugging Face, NLTK, TensorFlow, and PyTorch, to create intelligent language applications. This technology enables us to perform text analytics, text classification, entity identification, and conversational AI meeting your requirements.", chips: ["spaCy", "Hugging Face", "PyTorch"] },
  { icon: Search, title: "Retrieval-Augmented Generation (RAG)", desc: "Using RAG technologies allows us to offer solutions that combine company knowledge with advanced language models to provide accurate, contextually relevant responses. By retrieving necessary information before generating a response, we avoid mistakes and increase the credibility of our applications.", chips: ["RAG", "Grounding"] },
  { icon: Network, title: "AI Agent Platforms", desc: "We develop smart AI agents using contemporary orchestration platforms to simplify complicated processes, perform multiple tasks, and interface with business systems. These products improve productivity and help organizations make more accurate decisions at all levels.", chips: ["LangGraph", "CrewAI"] },
  { icon: Database, title: "Vector Databases", desc: "Fast, intelligent access to data is essential for successful semantic searching and retrieval. We introduce vector databases that effectively categorize embeddings. This allows AI software to draw pertinent information from large databases quickly and accurately.", chips: ["Pinecone", "Weaviate"] },
  { icon: Cloud, title: "Cloud and Informatics Deployment", desc: "Cloud, on-premises, or hybrid architecture is up to you! We create NLP products compliant with your information solutions strategy. We help you install products seamlessly, integrate safely, and scale your architecture without mistakes.", chips: ["AWS", "Azure", "GCP"] },
  { icon: Plug, title: "API Integration and Automation", desc: "We incorporate NLP into your CRM, ERP, HRMS, customer service, and similar systems, enabling seamless data sharing, process automation, and improved teamwork without affecting existing software.", chips: ["CRM", "ERP", "HRMS"] },
];

const benefits = [
  { icon: Gauge, title: "Enhance Productivity", desc: "Many office tasks involve repeating the same phrases when writing documents, making NLP a perfect solution, as it can accelerate these processes without compromising quality." },
  { icon: SmileIcon, title: "Elevate Customer Satisfaction", desc: "AI-powered language understanding allows businesses to automate parts of client dialogues, making communication more effective and improving customer satisfaction." },
  { icon: Lightbulb, title: "Make Smart Business Decisions", desc: "There are large volumes of data that contain valuable information and insights for business decision-making; however, it is hard to analyze unstructured information precisely using traditional methods. This is where NLP can help." },
  { icon: Rocket, title: "Boost Workforce Efficiency", desc: "Workers lose precious time looking for details and completing tedious tasks. NLP makes it easy to find the knowledge one needs, perform monotonous jobs, and access company information, allowing people to concentrate on innovation, teamwork, and vital tasks." },
  { icon: TrendingDown, title: "Bring Down Operational Expenses", desc: "Handling paperwork, answering queries, and dealing with data takes time and resources. NLP automates these processes, allowing companies to cut operational costs while improving performance and effectiveness and achieving predictable results." },
  { icon: Scaling, title: "Grow with Ease", desc: "The expansion of the firm is followed by an ever-growing amount of data to be processed. Our scalable NLP solutions can meet changing business requirements, ensuring you can handle new tasks and information." },
];

const whyChoose = [
  { icon: Compass, image: wubImg1, title: "Approach Begins with Business", desc: "The purpose of technology should be to solve existing business problems, not to create new ones. We start every engagement by understanding your goals to make sure our NLP solutions help you achieve the desired result." },
  { icon: Puzzle, image: wubImg2, title: "AI + NLP Talents and Experience", desc: "Our specialists have hands-on knowledge and experience that allow them to create intelligent solutions using applicable techniques and modern technologies." },
  { icon: ShieldEllipsis, image: wubImg3, title: "Robust and Safe Architecture", desc: "Every solution is created with scalability, security, and efficiency in mind. We create strong architectures that secure your business data and support growth, whether you deploy in the cloud, on-site, or in hybrid environments." },
  { icon: MessageCircle, image: wubImg4, title: "Open Communication", desc: "Successful projects are based on good communication and common goals. We keep you updated at every stage of development with regular updates and transparent project management practices, which help build confidence and long-term collaboration." },
  { icon: Handshake, image: wubImg5, title: "Full Support from Beginning to End", desc: "From planning and development to deployment and continuous enhancement, we provide full support along your NLP journey. Our team aims to help you achieve maximum efficiency and gain lasting benefits from your AI." },
];

const NLP = () => {
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
                <img src={nlpHero} alt="Natural language processing turning text into structured insights" className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="eager" fetchPriority="high" width={1280} height={960} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
              </div>
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite" }} />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-2xl hidden sm:block" style={{ animation: "pulse 3s ease-in-out infinite", animationDelay: "1.5s" }} />
            </div>

            <div className={`transition-all duration-1000 ease-out delay-150 ${visible.hero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <Link to="/services/ai-ml" className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20 hover:bg-accent/20 transition-colors">
                ← AI / ML
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5 text-left">
                <span className="text-foreground">Natural Language Processing Services That Turn </span>
                <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Language into Business Value</span>
              </h1>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left">
                <p>Every day, businesses generate valuable information through emails, documents, customer interactions, and digital content. Code1 Tech Systems can help you exploit this information with Custom Natural Language Processing (NLP) services designed to automate business processes, extract meaningful information, and improve the customer experience.</p>
                <p className="text-accent font-medium">Whether you are just starting with Artificial Intelligence (AI) solutions or already have programs implemented, our experts can help you work with the latest technology and manage workflows better.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact">
                  <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                    Get a Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="px-8 py-6 rounded-lg border-accent/30 hover:border-accent/60 hover:bg-accent/5">
                    Talk to Our AI Experts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyMattersSticky
        sectionId="why-matters"
        pre="Why Natural Language Processing is a"
        hi="Growth Tool"
        post="for Modern Businesses"
        sub="Organizations depend on data when it comes to making decisions; however, a large part of this information is in the form of unstructured text. Natural Language Processing makes sense of it, turning unstructured text into practical information that helps organizations streamline their operations, improve efficiency, and enhance their services."
        items={whyMatters}
        visible={visible}
        setRef={setRef}
      />

      <InlineCTA
        title="Are you ready to tap into the hidden potential of your business data?"
        sub="Talk with our team and discover how NLP can unlock value from your existing content."
        btn="Get Started with NLP Solutions"
      />

      <section
        ref={setRef("challenges")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.35) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Business Challenges"
            hi="We Solve"
            sub="Every company encounters its own set of operational challenges that impede efficiency and growth. Our Natural Language Processing technologies can tackle real business issues by automating language-dependent processes, improving decision-making, and enabling teams to work efficiently with data-driven insights."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {challenges.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 ${visible.challenges ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    background: "linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.5) 100%)",
                    border: "1px solid rgba(148,163,184,0.12)",
                    transitionDelay: `${idx * 70}ms`,
                  }}
                >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,78,158,0.25) 0%, rgba(95,194,227,0.15) 100%)", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{c.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        title="Ready to overcome language-driven business challenges with intelligent AI solutions?"
        sub="Book a free consultation with our NLP specialists and map the fastest path forward."
        btn="Schedule a Free Consultation"
      />

      <section
        ref={setRef("services")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Our Natural Language"
            hi="Processing Services"
            sub="Any business's language processing requirements are unique. Code1 Tech Systems provides tailored Natural Language Processing capabilities so that companies can automate their operations, assess documents, improve their interactions, and develop smart AI systems that deliver value."
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
                    transitionDelay: `${idx * 60}ms`,
                  }}
                >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,78,158,0.25) 0%, rgba(95,194,227,0.15) 100%)", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        title="Looking for a Natural Language Processing solution built around your business goals?"
        sub="Share your goals and we'll shape an NLP roadmap that fits your operations."
        btn="Talk to Our NLP Experts"
      />

      <section
        ref={setRef("industries")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Industries"
            hi="We Serve"
            sub="Natural Language Processing offers advantages for companies in many sectors, where language, documents, and communications impact daily processes. Code1 Tech Systems creates customized NLP technologies that address industry peculiarities, enhance operational effectiveness, and simplify smarter decision-making."
          />
          <FineTuningIndustryOrbit items={industries} />
        </div>
      </section>

      <InlineCTA
        title="Are you looking for an NLP solution for your industry's requirements?"
        sub="Get in touch with our team and explore an industry-tailored NLP approach."
        btn="Contact Us"
      />

      <section
        ref={setRef("tech")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Technologies"
            hi="We Work With"
            sub="The effectiveness of an NLP solution is determined by selecting the right technologies based on business requirements. Our approach integrates modern AI-powered frameworks, trusted development software, and highly scalable cloud platforms to deliver secure, productive, and future-ready language-processing solutions."
          />
          <TechEcosystem items={technologies} />
        </div>
      </section>

      <InlineCTA
        title="Want to build your NLP solution with proven AI technologies?"
        sub="Our engineers can help you choose the right stack for your goals and constraints."
        btn="Explore Our AI Expertise"
      />

      <BenefitsGrid
        sectionId="benefits"
        pre="Business Benefits of"
        hi="Natural Language Processing"
        sub="Natural Language Processing (NLP) is a wonderful technology that could simplify our operations and improve the quality of services we provide to our clients. Moreover, with NLP, we can work smarter and allow our staff to make better decisions to improve their job performance."
        items={benefits}
        visible={visible}
        setRef={setRef}
      />

      <InlineCTA
        title="Ready to unlock measurable business value with Natural Language Processing?"
        sub="Book a strategy session and turn language data into a growth advantage."
        btn="Schedule a Strategy Session"
      />

      <section
        ref={setRef("engagement")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.35) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Flexible"
            hi="Engagement Models"
            sub="Each company has different needs for their projects, requirements for scheduled timeframes, and necessities for utilized resources. At Code1 Tech Systems, you can choose the cooperation model that best fits your requirements for greater transparency, scalability, and efficient results throughout the NLP development process."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {engagementModels.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 ${visible.engagement ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    background: "linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.5) 100%)",
                    border: "1px solid rgba(148,163,184,0.12)",
                    transitionDelay: `${idx * 80}ms`,
                  }}
                >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,78,158,0.25) 0%, rgba(95,194,227,0.15) 100%)", border: "1px solid rgba(95,194,227,0.25)" }}>
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{m.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        title="Need a collaboration model that fits your business goals and budget?"
        sub="Talk to our team and we'll shape the engagement around your operations."
        btn="Discuss Your Project"
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
            sub="Selecting the appropriate AI associate is critical to the effectiveness of your NLP endeavor. Code1 Tech Systems provides smart solutions with professional skills, business acumen, and a team spirit that deliver lasting advantages for your business."
          />
          <WhyUsBlueprint
            items={whyChoose}
            centerIcon={Brain}
            centerLabel="CODE1 NLP"
            centerTagline="Language to Value"
            lifecycleLabel="NLP LIFECYCLE"
            ariaLabel="Natural language processing capabilities"
          />
        </div>
      </section>

      <ClosingContact
        sectionId="contact"
        heading="Looking for a trusted"
        hi="Natural Language Processing"
        tail="development partner?"
        para="Partner with Code1 Tech Systems for intelligent NLP solutions built around your business goals, integrated with your existing systems, and supported end-to-end."
        bullets={[
          "Custom NLP development aligned to your workflows",
          "Smart document processing, chatbots, and semantic search",
          "Modern LLM, RAG, and vector database expertise",
          "Seamless integration with CRM, ERP, and HRMS systems",
        ]}
        serviceName="Natural Language Processing (NLP)"
        btn="Partner with Code1 Tech Systems"
        visible={visible}
        setRef={setRef}
      />
    </ServicePageLayout>
  );
};

export default NLP;
