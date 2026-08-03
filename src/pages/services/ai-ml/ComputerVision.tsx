import ServicePageLayout from "@/components/ServicePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ScanSearch,
  Bug,
  Sparkles,
  ClipboardList,
  Aperture,
  BrainCircuit,
  ClipboardCheck,
  Plug,
  HeartPulse,
  Timer,
  TrendingDown,
  ScanLine,
  SearchX,
  Focus,
  Images,
  LayoutGrid,
  FileText,
  HardHat,
  Wrench,
  Factory,
  Car,
  Microchip,
  Apple,
  Pill,
  Truck,
  Plane,
  PencilRuler,
  Compass,
  Puzzle,
  FlaskConical,
  Link2,
  MessageCircle,
  Handshake,
  Award,
  Minimize2,
  Activity,
  LineChart,
  ShieldCheck,
  Maximize,
  Cpu,
  Brain,
  Layers,
  Cloud,
  Boxes,
  RefreshCcw,
  Server,
} from "lucide-react";
import cvHero from "@/assets/computer-vision/cv-hero.jpg";
import cvSolutions from "@/assets/computer-vision/cv-solutions.jpg";
import cvProcess from "@/assets/computer-vision/cv-process.jpg";
import cvOutcomes from "@/assets/computer-vision/cv-outcomes.jpg";
import indHealthcareImg from "@/assets/industry-healthcare.jpg";
import indFinanceImg from "@/assets/industry-finance.jpg";
import indRetailImg from "@/assets/industry-retail.jpg";
import indManufacturingImg from "@/assets/industry-manufacturing.jpg";
import indTechnologyImg from "@/assets/industry-technology.jpg";
import indLogisticsImg from "@/assets/de-automation-hero.jpg";
import wubImg1 from "@/assets/finetuning/why/why-1.jpg";
import wubImg2 from "@/assets/finetuning/why/why-2.jpg";
import wubImg3 from "@/assets/finetuning/why/why-3.jpg";
import wubImg4 from "@/assets/finetuning/why/why-4.jpg";
import wubImg5 from "@/assets/finetuning/why/why-5.jpg";
import wubImg6 from "@/assets/finetuning/why/why-6.jpg";
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
  { icon: ScanSearch, image: cvSolutions, title: "Automated Visual Inspection", desc: "Instead of relying only on standard technologies for manual inspection, Automated Visual Inspection inspects products for imperfections, such as damage, missing parts, and errors in product assembly." },
  { icon: Bug, image: cvProcess, title: "Intelligent Defect Detection", desc: "Defect detection becomes increasingly complicated, especially as manufacturing speed increases. With Convolutional Neural Networks and Vision Transformers, it is possible to detect even slight defects that would affect future manufacturing capabilities and customer satisfaction." },
  { icon: Sparkles, image: cvOutcomes, title: "AI-Powered Decision Support", desc: "Besides defect identification, your Industrial Computer Vision Solutions should provide operational decision support through automated solutions. By combining inspection monitoring data with existing production technology, you can react quickly, identify recurring problems, and make better decisions." },
];

const services = [
  { icon: ScanLine, title: "Automated Visual Inspection", desc: "Bid farewell to painstaking manual inspection by utilizing advanced AI-based systems for conducting inspections in real time. We help achieve consistent inspections, clear bottlenecks, and provide your quality team with data-driven results." },
  { icon: SearchX, title: "Defect Detection", desc: "From scratches to product assembly defects, our AI-driven models can detect any anomalies. The earlier the problem is discovered, the less scrap and rework you'll have to handle." },
  { icon: Focus, title: "Object Detection & Tracking", desc: "Whatever the components, products, or equipment, you will always be able to track their location during the production process. YOLO and advanced detection models will help." },
  { icon: Images, title: "Image Classification", desc: "Defect detection is only one task for conducting inspections. There are cases when it is important to check whether the product or the packaging is the right one. AI makes such inspections easier and more efficient." },
  { icon: LayoutGrid, title: "Process of Image Segmentation", desc: "The need for pixel-level accuracy arises in certain applications. Image Segmentation is the process that allows identifying defects, measuring dimensions, and inspecting complex product surfaces, when conventional inspection methods often fail." },
  { icon: FileText, title: "Overview of OCR and Text Recognition", desc: "Thanks to OCR and Text Recognition, it is possible to read serial numbers, expiration dates, labels, barcodes, and other product inscriptions automatically despite harsh conditions. This facilitates product tracing, ensures compliance, and eliminates tedious manual work." },
  { icon: HardHat, title: "Monitoring of Worker Safety and PPE", desc: "Promoting safe working conditions with the help of safety gear detection, access control, and detection of dangerous situations. Our AI Vision Solutions provide instant alerts to prevent risks in the workplace." },
  { icon: Wrench, title: "Support of Predictive Maintenance", desc: "Vision systems do more than inspect products. They also monitor the status of equipment and the condition of machinery to eliminate problems before they trigger unexpected downtime." },
];

const journey = [
  { label: "Understand", Icon: ClipboardList },
  { label: "Capture", Icon: Aperture },
  { label: "Train", Icon: BrainCircuit },
  { label: "Verify", Icon: ClipboardCheck },
  { label: "Integrate", Icon: Plug },
  { label: "Monitor", Icon: HeartPulse },
];

const challenges = [
  { icon: Activity, title: "Inconsistent Manual Inspections", desc: "Even if the workers are experienced, certain defects will be missed while they perform monotonous operations in large volumes. Industrial Computer Vision Solutions provide stable inspections and ensure there is no variability in actions taken without replacing trained personnel." },
  { icon: SearchX, title: "Defects Escaping Quality Checks", desc: "Defects that reach customers are associated with costs beyond rework. Our AI Quality Inspection solution helps detect defects in products at the very first moment of their appearance, allowing us to address the problem before a faulty product leaves the factory." },
  { icon: Timer, title: "Slowing Production Speeds", desc: "It is difficult to achieve a balance between production speed and quality. We have implemented automated visual inspection systems that allow us to inspect products at any moment without limiting the production process." },
  { icon: TrendingDown, title: "Escalating Expenses of Scrap and Rework", desc: "Recurring defects reveal more than manual inspections can detect. We use defect detection technology and production know-how to identify trends that reduce lost time, increase first-pass yield, and improve quality processes." },
  { icon: LineChart, title: "Limited Insight into Production", desc: "Identifying recurrent problems can be tricky without proper inspection data. We combine AI insight with Industrial IoT data to turn inspection results into useful operational information." },
  { icon: Maximize, title: "Growth Without Compromising on Quality", desc: "The larger the production, the more complex ensuring regular inspections becomes. Our Manufacturing Computer Vision solutions adapt and grow with your company, enabling you to observe quality standards across multiple lines and plants." },
];

const industries = [
  { icon: Factory, title: "Manufacturing", tag: "Industry 4.0", image: indManufacturingImg, intro: "We help manufacturers improve product quality and reduce rework, enabling them to maintain quality control without stalling production." },
  { icon: Car, title: "Automotive", tag: "Auto", image: indManufacturingImg, intro: "Our industrial computer vision solutions help automotive manufacturers spot defects early and meet quality standards throughout the production chain." },
  { icon: Microchip, title: "Electronics & Semiconductor", tag: "Electronics", image: indTechnologyImg, intro: "Tiny objects require extreme accuracy, and we employ defect detection and image segmentation techniques to help pinpoint missing elements, soldering problems, and surface flaws." },
  { icon: Apple, title: "Food & Beverage", tag: "F&B", image: indRetailImg, intro: "Our AI Quality inspection techniques help food producers enhance product quality and comply with safety and national regulations." },
  { icon: Pill, title: "Pharmaceutical & Life Sciences", tag: "Pharma", image: indHealthcareImg, intro: "Accuracy is critical in regulated environments. We automate inspection of packaging, labels, vials, and medical products, helping reduce human error while supporting traceability and compliance requirements." },
  { icon: Truck, title: "Logistics & Warehousing", tag: "Logistics", image: indLogisticsImg, intro: "Enhance operational visibility through OCR, barcode scanning, and object monitoring. We offer services to automate inventory checking, shipment validation, and warehouse processes to improve efficiency." },
  { icon: Plane, title: "Aerospace & Defense", tag: "Aerospace", image: indTechnologyImg, intro: "Our AI- and image recognition-based systems can inspect product surfaces, verify proper assembly, and ensure strict quality control during production." },
  { icon: PencilRuler, title: "Custom Vision Solutions", tag: "Custom", image: indFinanceImg, intro: "If your inspection needs are special, we will help you define your process and create a Computer Vision Service suited to your operational needs, manufacturing environment, and business goals." },
];

const technologies = [
  { icon: Brain, title: "Deep Learning Algorithms", desc: "We create intelligent inspection systems using PyTorch or TensorFlow, depending on your system requirements.", chips: ["PyTorch", "TensorFlow"] },
  { icon: Focus, title: "Object Recognition Solutions", desc: "We apply proven models such as YOLO to provide reliable inspections.", chips: ["YOLO", "Detectron"] },
  { icon: Images, title: "Image Processing & Vision Libraries", desc: "Quality inspection begins with image processing. We use OpenCV and other advanced technologies to deliver high-quality images.", chips: ["OpenCV", "Pillow"] },
  { icon: Cloud, title: "Edge & Cloud Deployment", desc: "No production site is alike. Whether you choose Edge, cloud, or hybrid technology, we help you implement the most suitable options.", chips: ["Edge", "Cloud", "Hybrid"] },
  { icon: Server, title: "Factory System Integration", desc: "Technology is most effective when applied to current processes. We synchronize with MES, ERP, PLCs, cameras, and industrial automation systems to establish a connected inspection process.", chips: ["MES", "ERP", "PLC"] },
  { icon: RefreshCcw, title: "Continuous Model Improvement", desc: "Production environments evolve with time. We supervise model performance, assess new inspection data, and retrain AI models where necessary.", chips: ["MLOps", "Retraining"] },
];

const benefits = [
  { icon: Award, title: "Improve Product Quality", desc: "Quality control mistakes occur after some products have already reached the market, which negatively affects customers' opinions of the manufacturer." },
  { icon: Minimize2, title: "Reduce Scrap and Rework", desc: "Automated Visual Inspection can help eliminate recurring errors and thus reduce additional costs that accompany material waste and rework." },
  { icon: Activity, title: "Increase Production Throughput", desc: "While manual inspections create bottlenecks in production, industrial vision systems solve this problem by automating inspection." },
  { icon: LineChart, title: "Make Decisions Faster with Data", desc: "Inspection data becomes more useful and valid when it can be acted upon. By incorporating AI analytics with the insights from the manufacturing process, teams can recognize patterns, solve problems, and continually enhance processes." },
  { icon: ShieldCheck, title: "Improve Safety of Workers", desc: "Automating inspection tasks that are dangerous or repetitive helps operators focus on high-value work. AI vision solutions also help ensure workplace safety by tracking PPE and monitoring access to restricted areas." },
  { icon: Maximize, title: "Develop a Quality Process with Ability to Scale", desc: "As production grows, it becomes harder to maintain quality. Our Industrial Computer Vision Solutions allow scaling to all new products and lines and will enable you to expand without lowering your inspection quality." },
];

const whyChoose = [
  { icon: Compass, image: wubImg1, title: "Understanding Your Business Objectives", desc: "We don't start by discussing Computer Vision Services. We start by learning your business processes and identifying their limitations and objectives. This means our suggestions align with your priorities." },
  { icon: Puzzle, image: wubImg2, title: "Solutions Created for Your Operations", desc: "Given that different production environments are specific, our Industrial Computer Vision Solutions can be designed for your product, process, and quality measures to achieve great results without drastically changing your processes." },
  { icon: FlaskConical, image: wubImg3, title: "Practical AI Solutions", desc: "We think that AI should solve real problems. We choose solutions like visual inspection, defect detection, and workflow automation for their ability to resolve operational tasks." },
  { icon: Link2, image: wubImg4, title: "Smooth Incorporation with Current Systems", desc: "Both your technology ecosystem and your organization have well-functioning systems in place. We craft solutions compatible with MES, ERP, PLCs, cameras, and automation systems to ensure seamless implementation and keep the process efficient." },
  { icon: MessageCircle, image: wubImg5, title: "Clear Communication Inside the Project", desc: "The success of the project depends on effective communication. From feasibility study to rollout and continuous support, we keep your project team informed so that they know where the project stands and what complications it faces, and the next steps to take." },
  { icon: Handshake, image: wubImg6, title: "Partnership Beyond Implementation", desc: "Our collaboration does not finish when the system is launched. When the production starts, we help fine-tune the algorithms and continue supporting AI Vision Solutions." },
];

const ComputerVision = () => {
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
                <img src={cvHero} alt="Industrial computer vision quality inspection on production line" className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="eager" fetchPriority="high" width={1280} height={960} />
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
                <span className="text-foreground">Get Quality Inspections with </span>
                <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Industrial Computer Vision Solutions</span>
              </h1>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left">
                <p>Every production line faces its own challenges. At Code1 Tech Systems, we enable you to automate inspections, cut down on costly errors, and enhance your processes with custom Computer Vision services that work for you.</p>
                <p>When inspection errors hinder production or defects get into the hands of customers, this goes beyond the quality losses. We work alongside your people to understand the problem first, then offer Industrial Computer Vision solutions that include AI-based visual inspection, defect detection, and deep learning to deliver reliable results.</p>
                <p className="text-accent font-medium">Timely and precise solutions are our focus, whether you are modernizing an existing production line or starting an automation program from scratch.</p>
              </div>
              <Link to="/contact">
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhyMattersSticky
        sectionId="why-matters"
        pre="What Are the Solutions in"
        hi="Industrial Computer Vision?"
        sub="New manufacturing paradigms require the ability to make faster decisions and ensure greater consistency. In this case, Industrial Computer Vision Solutions use cameras, automation based on artificial intelligence, and computer vision models to conduct inspections, determine defects, and facilitate decision-making in real time."
        items={whyMatters}
        visible={visible}
        setRef={setRef}
      />

      <InlineCTA
        title="Want to understand how computer vision fits your manufacturing goals?"
        sub="Share your objectives with us and we'll outline a practical way forward."
        btn="Talk to an Expert"
      />

      <section
        ref={setRef("how")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(95,194,227,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.35) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="How"
            hi="Industrial Computer Vision Solutions Work"
            sub="Every effective vision system follows a process in the background. The first step in recommending the right AI vision solution is to learn the customer's product, production setup, and quality requirements."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: ClipboardList, title: "Understand Your Inspection Issue", desc: "Each production line tells a different story. The process of making recommendations starts by understanding the areas of defects, what inspections are being carried out at present, and what results are important." },
              { icon: Aperture, title: "Capture High-Quality Images", desc: "Achieving the right results means obtaining proper images. This means checking cameras, lighting, image-acquisition angles, and the surrounding conditions. This ensures the images collected provide accurate data for further AI-related inspections." },
              { icon: BrainCircuit, title: "Train AI Model", desc: "After understanding the inspection needs and receiving the images, we develop deep learning models that can distinguish between good and bad goods in the future." },
              { icon: ClipboardCheck, title: "Pre-deployment Verification", desc: "Every solution needs to be verified in practice before being used in production. Model accuracy is analyzed, and performance is improved while minimizing the false positive rate to ensure that your team can trust inspection results." },
              { icon: Plug, title: "Seamless Integration", desc: "Modern vision systems should support existing workflows rather than disrupt them. Our systems integrate with Manufacturing Execution Systems (MES), Enterprise Resource Planning (ERP) platforms, Programmable Logic Controllers (PLCs), and other factory systems." },
              { icon: HeartPulse, title: "Continuous Monitoring", desc: "The production process is changing, and so must your AI. Our solutions continuously monitor performance and develop models as needed." },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 ${visible.how ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    background: "linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.5) 100%)",
                    border: "1px solid rgba(148,163,184,0.12)",
                    transitionDelay: `${idx * 80}ms`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 shrink-0 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(0,78,158,0.25) 0%, rgba(95,194,227,0.15) 100%)", border: "1px solid rgba(95,194,227,0.25)" }}>
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <InlineCTA
        title="Not sure how AI inspection would integrate with your existing production line?"
        sub="Discuss your setup with us and we'll map the integration path."
        btn="Discuss Your Use Case"
      />

      <section
        ref={setRef("challenges")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Challenges We Help You Solve with"
            hi="Industrial Computer Vision Solutions"
            sub="The difficulties in production are seldom associated with one cause. Our team will help determine what is stopping the company from achieving the desired efficiency, quality, and uniformity of products. After that, we will recommend Computer Vision Services that will solve the core issues rather than treat the symptoms."
          />
          <ChallengeHub
            items={challenges}
            centerIcon={ScanSearch}
            centerLabel={
              <>
                Computer Vision
                <br />
                Solutions
              </>
            }
            centerTagline="Vision Hub"
          />
        </div>
      </section>

      <InlineCTA
        title="Facing recurring quality issues that are slowing production and increasing costs?"
        sub="Let's identify the root cause and build a vision solution that addresses it."
        btn="Let's Find the Root Cause"
      />

      <ServicesBento
        sectionId="services"
        pre="Our Industrial Computer Vision Solutions for"
        hi="Smarter Manufacturing"
        sub="Our Industrial Computer Vision Solutions enable smarter manufacturing. No two inspection challenges are alike. That's why we develop customized Computer Vision Services that meet the operational need while working seamlessly in the production environment."
        items={services}
        journey={journey}
        visible={visible}
        setRef={setRef}
        featuredLabels={["AI Inspection", "Defect Scan", "Detection Mesh"]}
        badges={["Real-time QA", "Deep Learning", null, null, null, null, "Worker Safety", null]}
      />

      <InlineCTA
        title="Not sure which computer vision solution best fits your inspection challenge?"
        sub="Share your setup with us and we'll map a practical path forward."
        btn="Explore the Right Solution"
      />

      <section
        ref={setRef("industries")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Industries We Help Transform with"
            hi="Industrial Computer Vision Solutions"
            sub="All sectors have their own unique quality standards, manufacturing challenges, and compliance requirements. We customize computer vision for manufacturing methods and AI-based inspection systems to meet your operational targets, products, and workflows."
          />
          <FineTuningIndustryOrbit items={industries} />
        </div>
      </section>

      <InlineCTA
        title="Wondering how AI vision can address challenges unique to your industry?"
        sub="Our industry specialists can shape a vision program around your specific workflows."
        btn="Discuss Your Industry"
      />

      <section
        ref={setRef("why")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="What Makes Businesses Opt for Our"
            hi="Industrial Computer Vision Solutions"
            sub="Choosing the right technology partner is as significant as selecting the right technology. We prioritize gaining a thorough understanding of your business, resolving real-world issues, and providing solutions that deliver long-term operational benefits."
          />
          <WhyUsBlueprint
            items={whyChoose}
            centerIcon={ScanSearch}
            centerLabel="CODE1 CV"
            centerTagline="Inspection to Insight"
            lifecycleLabel="VISION LIFECYCLE"
            ariaLabel="Computer vision capabilities"
          />
        </div>
      </section>

      <InlineCTA
        title="Looking for a partner who understands your operations before recommending technology?"
        sub="Meet the consultants who will shape your vision program end to end."
        btn="Meet Our Consultants"
      />

      <BenefitsGrid
        sectionId="benefits"
        pre="Business Outcomes You Can Expect from"
        hi="Industrial Computer Vision Solutions"
        sub="The most important benefits of computer vision include automation and efficiency in managing inspections. However, when implemented properly, such technology can not only improve production quality but also enhance the effectiveness of the entire operation, giving employees confidence in their work."
        items={benefits}
        visible={visible}
        setRef={setRef}
      />

      <InlineCTA
        title="Want to see where AI vision could create the biggest operational impact?"
        sub="Book a strategy session and turn inspection data into an operational advantage."
        btn="Assess Your Opportunity"
      />

      <section
        ref={setRef("tech")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(220 50% 7%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Technologies Behind Our"
            hi="Industrial Computer Vision Solutions"
            sub="Choosing the right technology depends on your inspection requirements, production environment, and scope. We use reliable technologies that work effectively with your already existing systems."
          />
          <TechEcosystem items={technologies} />
        </div>
      </section>

      <InlineCTA
        title="Need guidance on choosing the right AI technologies for your environment?"
        sub="We'll match the ideal frameworks and deployment model to your scale."
        btn="Talk to a Technical Expert"
      />



      <ClosingContact
        sectionId="contact"
        heading="Ready to Explore the Right"
        hi="Industrial Computer Vision Solution"
        tail="for Your Business?"
        para="Whether you are preparing for your first AI-checking project or revisiting one, we are ready to assist you by offering alternatives, answering your questions, and suggesting the right solution. Do you want to find out how computer vision may enhance quality, effectiveness, and assurance in your operations?"
        bullets={[
          "AI-based visual inspection tailored to your product",
          "Defect detection with deep learning and vision transformers",
          "Seamless integration with MES, ERP, PLCs, and cameras",
          "Continuous model monitoring and improvement",
        ]}
        serviceName="Industrial Computer Vision"
        btn="Talk to Our Computer Vision Experts"
        visible={visible}
        setRef={setRef}
      />
    </ServicePageLayout>
  );
};

export default ComputerVision;
