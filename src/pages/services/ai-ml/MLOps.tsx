import ServicePageLayout from "@/components/ServicePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Workflow,
  Rocket,
  Gauge,
  Boxes,
  GitBranch,
  Database,
  Layers,
  RefreshCw,
  Cog,
  ServerCog,
  Activity,
  ShieldCheck,
  Lightbulb,
  Repeat,
  Timer,
  DollarSign,
  Users,
  Eye,
  AlertTriangle,
  Wrench,
  HeartPulse,
  Landmark,
  ShieldAlert,
  ShoppingBag,
  Factory,
  Truck,
  PhoneCall,
  Zap,
  Clapperboard,
  Cloud,
  Handshake,
  LifeBuoy,
  Target,
  Settings2,
  TrendingUp,
} from "lucide-react";
import heroImg from "@/assets/core-mlops.jpg";
import ftWhy1 from "@/assets/mlops/mlops-why-1.jpg";
import ftWhy2 from "@/assets/mlops/mlops-why-2.jpg";
import ftWhy3 from "@/assets/mlops/mlops-why-3.jpg";
import ftWhy4 from "@/assets/mlops/mlops-why-4.jpg";
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
import FineTuningIndustryOrbit from "@/components/ai-ml/FineTuningIndustryOrbit";
import WhyUsBlueprint from "@/components/WhyUsBlueprint";
import {
  useReveal,
  InlineCTA,
  WhyMattersSticky,
  ClosingContact,
  SectionTitle,
} from "@/components/ai-ml/AIMLPageSections";
import { PremiumBenefitsShowcase } from "@/components/ai-ml/PremiumBenefitsShowcase";
import MLOpsServicesEcosystem from "@/components/ai-ml/MLOpsServicesEcosystem";


const whyMatters = [
  { icon: Workflow, image: ftWhy1, title: "Streamline the Machine Learning Lifecycle", desc: "Disconnected workflows can slow down AI process delivery and add complexity to operations. Machine Learning Pipeline Development automates data ingestion, feature creation, algorithm training and validation, and ML model deployment and monitoring." },
  { icon: Rocket, image: ftWhy2, title: "Accelerate Model Deployment", desc: "Bringing a model from development to production should not cause any significant problems. Implementing CI/CD for machine learning automates testing, versioning, and deploying ML models, making the release of validated models fast and consistent." },
  { icon: Gauge, image: ftWhy3, title: "Improve Model Reliability and Performance", desc: "Machine learning models need to be monitored to stay relevant and accurate as data changes. Through model monitoring, it is possible to detect performance issues, trigger retraining, and ensure models produce quality results." },
  { icon: Boxes, image: ftWhy4, title: "Enable Scalable AI Operations", desc: "As AI initiatives grow, operational complexity increases. Our AI Model Lifecycle Management framework provides consistency across activities, governance, and infrastructure, allowing companies to manage multiple machine learning models together and support enterprise-wide AI operations and future development." },
];

const services = [
  { icon: Workflow, title: "ML Pipeline Design and Development", desc: "As part of our Machine Learning Pipeline Development services, we create automated, complex systems that interconnect processes such as data intake, preparation, feature creation, training, evaluation, deployment, and monitoring." },
  { icon: Database, title: "Data Pipeline Engineering", desc: "We create high-quality data pipelines to automate the processes of gathering, converting, checking, and merging data so that your models can work with the right data formats necessary for correct functioning." },
  { icon: Layers, title: "Feature Engineering Pipelines", desc: "We engineer automated pipelines that convert raw data into informative features, improve your model's accuracy, minimize manual work, and ensure consistent processes throughout the machine learning cycle." },
  { icon: Cog, title: "Automating Models’ Training", desc: "By automating model training, we streamline data preparation, hyperparameter tuning, experiment tracking, and model validation, speeding up iterations and improving process reproducibility." },
  { icon: GitBranch, title: "Machine Learning CI/CD", desc: "New types of Artificial Intelligence solutions need CI/CD processes that correspond to the standards of the software engineering industry. Our CI/CD for machine learning ensures the released product is reliable and ready to operate." },
  { icon: Rocket, title: "Model Deployment and Service", desc: "Transferring models into operation requires high flexibility, strong reliability, and short response times. We provide trustworthy Model Deployment Services that work easily with your applications and allow real-time and batch inference." },
  { icon: Activity, title: "Model Monitoring and Observability", desc: "Models in use require constant tracking to work effectively. Our Model Monitoring system tracks prediction performance, data drift, concept drift, and productivity activities, enabling quick prevention of potential failures." },
  { icon: RefreshCw, title: "Model Retraining and Continuous Learning", desc: "Business data changes constantly, and machine learning models have to change in the same way. We create Continuous Learning systems that allow models to change automatically, test revised models, and implement changes to keep them efficient." },
  { icon: Lightbulb, title: "MLOps Consulting", desc: "Our MLOps services help companies develop effective practices for automation, management, infrastructure, and process execution. We analyze the existing situation and suggest scalable architectures and implementation approaches to encourage company-wide machine learning." },
  { icon: ServerCog, title: "Infrastructure Automation", desc: "Reliable infrastructure is vital in building scalable machine learning models. We use cloud-native technologies to automate provisioning, configuration, orchestration, and resource management, creating stable environments and improving deployment speed, efficiency, and infrastructure reliability." },
  { icon: ShieldCheck, title: "Model Governance and Compliance", desc: "Enterprise AI needs robust governance throughout the entire ML lifecycle. We employ AI Governance frameworks that enable model versioning, auditability, security, compliance, and responsible AI use, ensuring companies maintain transparency and readiness for any regulation." },
  { icon: Settings2, title: "ML Workflow Optimization", desc: "By enhancing workflow processes, we can improve productivity and reduce operational costs. We review existing ML processes, remove bottlenecks, automate repetitive initiatives, and implement engineering best practices to speed model development and improve collaboration across different teams" },
];

const challenges = [
  { icon: Timer, title: "Slow and Complex Model Deployment", desc: "Entering the production stage for systems developed with machine learning requires manual work and complicated processes. Our Model deployment services address this by automating deployment processes to reduce deployment time." },
  { icon: Cog, title: "Manual Machine Learning Workflows", desc: "Preparing data manually, training the model, and validating results can take a lot of effort from engineers. With ML Workflow Automation, we automate repetitive tasks, establish uniform specifications, and develop coordinated workflows, giving freedom to focus on building important AI products." },
  { icon: Database, title: "Inconsistent Data Pipelines", desc: "Any machine learning model is no more reliable than the data that is used for its training. Our Data Pipeline Engineering services help us develop automated, certified, and scalable data pipelines to assure the reliability of data flow used for training, testing, and production." },
  { icon: AlertTriangle, title: "Model Performance Degradation", desc: "Previously trained models can lose their efficiency over time. With Model Monitoring and Drift Detection services, we analyze model performance on an ongoing basis, identify symptoms of drift, and start retraining accordingly." },
  { icon: Eye, title: "Limited Visibility into Model Health", desc: "Performance issues typically go unnoticed until they impact business operations. We deploy observability frameworks designed to measure prediction accuracy, latency, resource utilization, and operational metrics, resulting in useful insights for services to mitigate the problem." },
  { icon: Boxes, title: "Scaling Machine Learning Across the Enterprise", desc: "As the implementation of AI in enterprises grows, coordinating models, teams, and environments becomes more challenging. Our approach to AI Model Lifecycle Management standardizes governance, automation, and deployment processes, allowing organizations to successfully scale their machine learning systems." },
  { icon: ShieldCheck, title: "Governance, Security, and Compliance Challenges", desc: "Succeeding with enterprise AI systems requires transparency and accountability, as well as regulatory compliance. We use an AI Governance framework that provides model versioning, audit trail creation, and secure access policies, helping ensure compliance and transparency for machine learning solutions." },
  { icon: Wrench, title: "Managing Infrastructure Complexity", desc: "To support machine learning in production, it is crucial to have reliable infrastructure and effective resource management. For this reason, we build fully automated, cloud-native infrastructure that makes resources easier to operate and use more efficiently." },
];

const industries = [
  { icon: HeartPulse, title: "Healthcare", tag: "Life Sciences", image: indHealthcareImg, intro: "Healthcare companies need accurate, scalable AI systems to improve clinical decision-making and enhance operational performance. We develop secure, internet-ready ML pipelines that automate the deployment, monitoring, and retraining of models." },
  { icon: Landmark, title: "Banking and Financial Services", tag: "BFSI", image: indFinanceImg, intro: "Financial service companies require machine learning solutions that are secure, explainable, and scalable. Our Machine Learning Pipeline Development services simplify fraud detection, risk modeling, customer analytics, and compliance processes through automated MLOps practices." },
  { icon: ShieldAlert, title: "Insurance", tag: "InsurTech", image: indFinanceImg, intro: "Every day, insurance companies deal with enormous amounts of claims, policies, and other customer data. Our team offers Data Pipeline Engineering and automated ML workflows that make underwriting more precise, speed up claims processing, and improve fraud detection and customer service." },
  { icon: ShoppingBag, title: "Retail and eCommerce", tag: "Commerce", image: indRetailImg, intro: "The retail industry relies on up-to-date information to enhance consumer satisfaction and ensure operational efficiency. We develop flexible ML systems for recommendation engines, demand prediction, inventory management, pricing strategies, and personalized shopping experiences across digital platforms." },
  { icon: Factory, title: "Manufacturing", tag: "Industry 4.0", image: indManufacturingImg, intro: "The manufacturing industry applies machine learning technologies to improve product quality, productivity, and operational resilience. Our MLOps systems allow us to automate predictive maintenance, manufacturing analytics, quality inspection processes, and monitoring of prediction models." },
  { icon: Truck, title: "Logistics and Supply Chain", tag: "Logistics", image: indLogisticsImg, intro: "The supply chain generates dynamic data and requires continuous improvement of operational processes. Our ML systems automate numerous processes such as demand prediction, route optimization, warehouse data analysis, and delivery tracking." },
  { icon: PhoneCall, title: "Telecommunications", tag: "Telecom", image: indTechnologyImg, intro: "The telecommunications industry needs AI capabilities that can handle huge volumes of real-time data. Our systems are designed to enable reliable operations for telecommunications companies by implementing ML for network optimization, maintenance prediction, customer experience analytics, and effective service management." },
  { icon: Zap, title: "Energy and Utilities", tag: "Energy", image: indManufacturingImg, intro: "Energy companies deploy different machine learning technologies for infrastructure optimization, demand modeling, and improved asset reliability. Our AI Model Lifecycle Management process keeps all models updated and running through regular check-ups and automated learning across key operational processes." },
  { icon: Clapperboard, title: "Media and Entertainment", tag: "Media", image: indRetailImg, intro: "Organizations operating in the media business use machine learning technologies to adapt personalized content for audiences and track their behavior. We offer automated ML pipelines and models that improve content personalization, audience segmentation, and advertising on social media." },
  { icon: Cloud, title: "Technology and SaaS", tag: "SaaS", image: indTechnologyImg, intro: "In the technology sector, it is critical to run a large number of experiments without disrupting production. Our MLOps Services offer the automation needed to speed up AI development and ensure optimal functionality." },
];

const benefits = [
  { icon: Rocket, title: "Accelerate Time-to-Production", desc: "Without automation, deploying ML solutions takes a lot of time. The ML pipeline development method automates model training and deployment, making the process fast while maintaining quality." },
  { icon: Gauge, title: "Improve Model Reliability", desc: "Tracking and automated validation, along with optimizing model performance, ensure the necessary responsiveness and accuracy, supported by the continuous nature of our services." },
  { icon: Workflow, title: "Enhance Operational Efficiency", desc: "Automated ML workflows eliminate repetitive engineering activities, increasing productivity, reducing development delays, and allowing teams to focus on innovation rather than manual tasks." },
  { icon: ShieldCheck, title: "Reduce Deployment Risks", desc: "Deploying requires proper validation and a controlled release process. Our solution, based on the principles of CI/CD for Machine Learning, helps minimize deployment failures and improve system reliability." },
  { icon: DollarSign, title: "Optimize Infrastructure Costs", desc: "Automated selection of computational resources, provision of needed infrastructure, and effective architecture enable optimized operational and infrastructure costs." },
  { icon: TrendingUp, title: "Scale AI with Confidence", desc: "As the number of machine learning projects increases, organizations need to implement standardized processes and reliable infrastructure. Our AI Model Lifecycle Management method makes it easy." },
  { icon: Users, title: "Strengthen Team Collaboration", desc: "Effective MLOps brings data science, data engineering, and operations together through shared processes and automation. We set up collaboration to enhance communication, accelerate delivery, and manage machine learning models." },
];

const whyChoose = [
  { icon: Boxes, image: wubImg1, title: "End-to-End MLOps Expertise", desc: "From data pipeline engineering and model training to deployment, monitoring, and lifecycle management, our MLOps Services cover all aspects of machine learning operations, allowing clients to deploy reliable, scalable, production-ready AI solutions that generate profits." },
  { icon: Target, image: wubImg2, title: "Business-Driven Engineering Approach", desc: "Every MLOps solution is aligned with clients' objectives, workflows, and development strategies. We devise automated machine learning pipelines to streamline operations, accelerate innovation, reduce complexity, and achieve objectives." },
  { icon: Cloud, image: wubImg3, title: "Cloud-Native and Scalable Architectures", desc: "Our engineers create cloud-native ML architectures that ensure high availability while optimizing resources. The ML systems function well regardless of being deployed on AWS, Azure, or Google Cloud." },
  { icon: ShieldCheck, image: wubImg4, title: "Secure and Governed ML Pipelines", desc: "Our machine learning processes are characterized by security, governance, and compliance. We use AI Governance procedures, security measures, model logging, change tracking, and the proper application of AI technologies to protect data and ensure operational transparency." },
  { icon: Handshake, image: wubImg5, title: "Collaborative Delivery and Transparency", desc: "Effective AI solutions cannot be achieved without interaction and good communication between us and the other side. Our staff cooperates with your representatives, keeping them abreast of the developments and offering technical support." },
  { icon: LifeBuoy, image: wubImg6, title: "Continuous Optimization and Long-Term Support", desc: "Changing business needs and data usage patterns require constant improvements in machine learning systems. We provide constant supervision, fine-tuning, improvement, and overall management of AI technologies to keep them efficient." },
];

const MLOps = () => {
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
                <img src={heroImg} alt="ML pipeline engineering and MLOps automation" className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover" loading="eager" fetchPriority="high" width={1280} height={960} />
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
                <span className="text-foreground">ML Pipeline Engineering & MLOps Services for </span>
                <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Production-Ready AI</span>
              </h1>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 text-left">
                <p>Building an AI model is just the first step. To create real business value, machines must be used consistently, and for that, processes must be managed effectively and monitored constantly. Code1 Tech Systems offers ML Pipeline Engineering &amp; MLOps Services to help automate machine learning lifecycle management, deploy algorithms in production, and maintain high-quality AI systems.</p>
              </div>
              <Link to="/contact">
                <Button size="lg" className="group bg-gradient-to-r from-accent to-primary text-primary-foreground font-medium px-8 py-6 rounded-lg shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300">
                  Talk to Our MLOps Experts
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhyMattersSticky
        sectionId="why-matters"
        pre="Why ML Pipeline Engineering &"
        hi="MLOps Matter"
        sub="Deploying ML models in the absence of formal operational methodology often results in delays, inconsistencies, and growing costs. MLOps Services establishes automated, scalable workflows that keep AI systems efficient, reliable, and production-ready."
        items={whyMatters}
        visible={visible}
        setRef={setRef}
      />

      <InlineCTA
        title="Ready to operationalize machine learning with scalable, automated pipelines?"
        sub="Partner with our engineers to automate your ML lifecycle end to end."
        btn="Build Your MLOps Strategy"
      />

      <section
        ref={setRef("services")}
        className="relative py-10 lg:py-14 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 50% 7%) 0%, hsl(222 47% 5%) 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            pre="Our ML Pipeline Engineering &"
            hi="MLOps Services"
            sub="Establishing a good machine learning solution is more than just making advanced models. We offer ML Engineering & MLOps Services that automate, standardize, and optimize all processes related to the machine learning lifecycle so models can be deployed faster, operate more reliably, and scale."
          />
          <MLOpsServicesEcosystem services={services} visible={visible.services} />

        </div>
      </section>

      <InlineCTA
        title="Looking to build reliable ML pipelines that scale with your business?"
        sub="Our engineers design automated pipelines built for production."
        btn="Consult Our MLOps Engineers"
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
            sub="Many organizations have developed promising systems using machine learning technologies but face difficulties ensuring their operation is feasible at scale. Our ML pipeline engineering & operations services solve problems related to operational feasibility by automating workflows and ensuring models perform correctly during execution/service life."
          />
          <ChallengeHub
            items={challenges}
            centerIcon={GitBranch}
            centerLabel={
              <>
                MLOps
                <br />
                Solutions
              </>
            }
            centerTagline="Operations Hub"
          />
        </div>
      </section>

      <InlineCTA
        title="Ready to overcome operational challenges and scale machine learning with confidence?"
        sub="Bring us your toughest ML operations blocker and we'll clear the path."
        btn="Talk to Our MLOps Experts"
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
            sub="The adoption of machine learning differs from industry to industry, given that specific engineering practices and scalable operational structures have to be made. To help businesses build robust machine learning infrastructure, we offer our ML Pipeline Engineering & MLOps Services."
          />
          <FineTuningIndustryOrbit items={industries} />
        </div>
      </section>

      <InlineCTA
        title="Looking for ML pipelines designed around your industry's unique operational needs?"
        sub="Our industry specialists tailor MLOps to your workflows and outcomes."
        btn="Discuss Your MLOps Requirements"
      />

      <PremiumBenefitsShowcase
        sectionId="benefits"
        pre="Business Benefits of"
        hi="ML Pipeline Engineering & MLOps"
        sub="Proper MLOps implementation can turn machine learning processes from isolated trial-and-error experiments into scalable business operations. Standardization and automation of processes lead to faster innovation and improved operational efficiency, giving businesses the highest possible returns on investment in artificial intelligence."
        items={benefits}
        visible={visible}
        setRef={setRef}
        wideVisual="collaboration"
        wideChips={["Shared Processes", "Automated Workflows", "Faster Delivery"]}
      />

      <InlineCTA
        title="Ready to transform machine learning into a scalable business advantage?"
        sub="Turn experiments into reliable, automated production systems."
        btn="Unlock the Value of MLOps"
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
            sub="Producing machine learning systems ready for production entails more than just technical skills. Code1 Tech Systems brings together engineering know-how, cloud-native architectures, and years of experience in ML Pipeline Engineering & MLOps Services to help organizations implement AI solutions successfully and achieve business results."
          />
          <WhyUsBlueprint
            items={whyChoose}
            centerIcon={GitBranch}
            centerLabel="CODE1 MLOPS"
            centerTagline="Pipelines to Production"
            lifecycleLabel="ML LIFECYCLE"
            ariaLabel="ML pipeline engineering and MLOps capabilities"
          />
        </div>
      </section>

      <InlineCTA
        title="Looking for an experienced MLOps partner to scale your AI operations?"
        sub="Work with engineers who ship production-ready machine learning."
        btn="Partner with Code1 Tech Systems"
      />

      <ClosingContact
        sectionId="contact"
        heading="Ready to Operationalize"
        hi="Machine Learning"
        tail="with Confidence?"
        para="Building a machine learning model is only the first step. Creating lasting business value requires reliable processes. To generate sustainable business value, consistent processes, automated workflows, and continual improvement are necessary. With Code1 Tech System's ML pipeline engineering services, customers gain a dependable engineering partner that ensures the successful introduction, operation, and expansion of their AI systems."
        bullets={[
          "Automated, end-to-end machine learning pipelines",
          "CI/CD, deployment, monitoring, and continuous retraining",
          "Cloud-native infrastructure automation and scalability",
          "Governance, security, and compliance across the ML lifecycle",
        ]}
        serviceName="ML Pipeline Engineering & MLOps"
        btn="Start Your MLOps Journey"
        visible={visible}
        setRef={setRef}
      />
    </ServicePageLayout>
  );
};

export default MLOps;
