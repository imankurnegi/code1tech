import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ServicePageLayout from "@/components/ServicePageLayout";
import SimKycCaseStudy from "@/pages/case-studies/SimKycCaseStudy";
import OracleDatabricksCaseStudy from "@/pages/case-studies/OracleDatabricksCaseStudy";
import PowerBiCaseStudy from "@/pages/case-studies/PowerBiCaseStudy";

import { Button } from "@/components/ui/button";
import { 
  ArrowRight, ArrowLeft, CheckCircle, TrendingUp, Clock, Users, Zap, Building2, HeartPulse, ShoppingCart, Factory, Smartphone,
  Shield, Lock, Workflow, Rocket, Target, Award, BarChart3, Headphones, FileCheck, Server, Smartphone as SmartphoneIcon
} from "lucide-react";
import SeoTags from "@/components/SeoTags";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorFallback from "@/components/ErrorFallback";

const caseStudiesData: Record<string, {
  industry: string;
  title: string;
  quote: string;
  description: string;
  challenge: string;
  challengeDetails: string[];
  solution: string;
  solutionDetails: string[];
  implementation: string[];
  results: { value: string; label: string }[];
  testimonial?: { quote: string; author: string; role: string };
  technologies: string[];
  icon: typeof TrendingUp;
  categoryIcon: typeof Building2;
  image: string;
}> = {
  "ai-driven-automation": {
    industry: "Banking & Finance",
    title: "AI-Driven Compliance Automation",
    quote: "Automating 65% of compliance checks",
    description: "A leading financial services firm transformed their compliance operations with AI-powered automation.",
    challenge: "Manual compliance checks were time-consuming, error-prone, and couldn't scale with growing regulatory requirements.",
    challengeDetails: [
      "Over 10,000 transactions requiring manual review daily",
      "High error rates in compliance flagging (12% false positives)",
      "Regulatory changes required weeks of training updates",
      "Growing backlog of compliance reports"
    ],
    solution: "Implemented an AI-driven automation platform that analyzes transactions in real-time, flags potential issues, and generates compliance reports automatically.",
    solutionDetails: [
      "Custom ML models trained on historical compliance data",
      "Real-time transaction analysis with sub-second response",
      "Automated regulatory update integration",
      "Self-learning system that improves with feedback"
    ],
    implementation: [
      "Phase 1: Data integration and model training (8 weeks)",
      "Phase 2: Pilot deployment with 10% of transactions (4 weeks)",
      "Phase 3: Full rollout with monitoring dashboard (6 weeks)",
      "Phase 4: Continuous optimization and expansion (ongoing)"
    ],
    results: [
      { value: "65%", label: "Efficiency Gain" },
      { value: "$2.4M", label: "Annual Savings" },
      { value: "95%", label: "Accuracy Rate" },
      { value: "3x", label: "Faster Reviews" }
    ],
    testimonial: {
      quote: "Code1's AI solution transformed our compliance operations. What used to take our team days now happens in minutes with higher accuracy.",
      author: "Sarah Chen",
      role: "Chief Compliance Officer"
    },
    technologies: ["Python", "TensorFlow", "Apache Kafka", "PostgreSQL", "AWS", "Docker"],
    icon: TrendingUp,
    categoryIcon: Building2,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=600&fit=crop"
  },
  "intelligent-healthcare-dashboards": {
    industry: "Healthcare",
    title: "Intelligent Healthcare Dashboards",
    quote: "Real-time analytics for faster patient care",
    description: "A unified analytics platform with predictive capabilities that improved care quality across all facilities.",
    challenge: "Fragmented data systems made it difficult to get a holistic view of patient health and operational metrics.",
    challengeDetails: [
      "Patient data scattered across 15+ legacy systems",
      "Average 48-hour delay in critical reporting",
      "No predictive capabilities for patient outcomes",
      "Manual data reconciliation consuming 40+ hours weekly"
    ],
    solution: "Built a comprehensive data platform that unifies patient records, operational data, and predictive analytics into real-time dashboards.",
    solutionDetails: [
      "Unified data lake architecture for all patient data",
      "Real-time streaming analytics for vital monitoring",
      "Predictive models for patient risk scoring",
      "Role-based dashboards for different care teams"
    ],
    implementation: [
      "Phase 1: Data source mapping and ETL pipeline design (6 weeks)",
      "Phase 2: Core platform build with initial integrations (10 weeks)",
      "Phase 3: Predictive model development and validation (8 weeks)",
      "Phase 4: Dashboard deployment and training (4 weeks)"
    ],
    results: [
      { value: "45%", label: "Faster Diagnosis" },
      { value: "98%", label: "Data Accuracy" },
      { value: "30%", label: "Cost Reduction" },
      { value: "24/7", label: "Monitoring" }
    ],
    testimonial: {
      quote: "The unified dashboard has revolutionized how we deliver patient care. Real-time insights mean we can intervene earlier and save more lives.",
      author: "Dr. Michael Roberts",
      role: "Chief Medical Officer"
    },
    technologies: ["Apache Spark", "Snowflake", "Python", "React", "Tableau", "Azure"],
    icon: Clock,
    categoryIcon: HeartPulse,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop"
  },
  "personalized-retail-experiences": {
    industry: "Retail & eCommerce",
    title: "AI-Powered Personalization Engine",
    quote: "Smart recommendations that boost conversions",
    description: "An AI-powered personalization system that transformed customer engagement and conversion rates.",
    challenge: "Generic product recommendations were leading to low conversion rates and high cart abandonment.",
    challengeDetails: [
      "Cart abandonment rate exceeding 75%",
      "Low click-through rate on recommendations (2.1%)",
      "No behavioral segmentation of customers",
      "Email campaigns had under 10% open rates"
    ],
    solution: "Deployed machine learning models that analyze customer behavior in real-time to deliver hyper-personalized recommendations.",
    solutionDetails: [
      "Real-time behavior tracking and analysis",
      "Collaborative filtering with deep learning",
      "Dynamic pricing optimization",
      "Cross-channel personalization (web, email, app)"
    ],
    implementation: [
      "Phase 1: Customer data platform setup (4 weeks)",
      "Phase 2: Recommendation engine development (8 weeks)",
      "Phase 3: A/B testing framework and optimization (6 weeks)",
      "Phase 4: Full deployment with monitoring (4 weeks)"
    ],
    results: [
      { value: "28%", label: "Revenue Increase" },
      { value: "40%", label: "Cart Recovery" },
      { value: "3.5x", label: "Engagement" },
      { value: "15%", label: "AOV Increase" }
    ],
    testimonial: {
      quote: "The personalization engine has completely changed our customer relationships. Our shoppers now feel understood, and our revenue reflects that.",
      author: "Jennifer Walsh",
      role: "VP of Digital Commerce"
    },
    technologies: ["Python", "PyTorch", "Redis", "Elasticsearch", "Google Cloud", "React"],
    icon: Users,
    categoryIcon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop"
  },
  "smart-manufacturing-operations": {
    industry: "Manufacturing",
    title: "Predictive Maintenance Revolution",
    quote: "IoT-enabled smart factory transformation",
    description: "An IoT-powered predictive maintenance system that reduced unplanned downtime and optimized efficiency.",
    challenge: "Unexpected equipment failures were causing costly production delays and reactive maintenance.",
    challengeDetails: [
      "Average 120 hours of unplanned downtime monthly",
      "Maintenance costs exceeding $3M annually",
      "No visibility into equipment health status",
      "Reactive maintenance leading to cascading failures"
    ],
    solution: "Implemented IoT sensors with ML-based predictive models that forecast equipment failures before they occur.",
    solutionDetails: [
      "IoT sensor network across 500+ machines",
      "Edge computing for real-time anomaly detection",
      "Predictive maintenance scheduling system",
      "Mobile alerts for maintenance teams"
    ],
    implementation: [
      "Phase 1: IoT infrastructure and sensor deployment (8 weeks)",
      "Phase 2: Data pipeline and storage architecture (6 weeks)",
      "Phase 3: ML model training and validation (10 weeks)",
      "Phase 4: Production rollout and optimization (8 weeks)"
    ],
    results: [
      { value: "50%", label: "Less Downtime" },
      { value: "3x", label: "Efficiency Gain" },
      { value: "$1.8M", label: "Savings/Year" },
      { value: "99.5%", label: "Uptime" }
    ],
    testimonial: {
      quote: "We went from fighting fires to preventing them. The predictive system has transformed our entire maintenance philosophy.",
      author: "Robert Martinez",
      role: "Director of Operations"
    },
    technologies: ["IoT Hub", "Azure ML", "Time Series DB", "Python", "React Native", "Kubernetes"],
    icon: Zap,
    categoryIcon: Factory,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop"
  },
  "seamless-sim-replacement-kyc": {
    industry: "Telecommunications",
    title: "Seamless SIM Replacement with KYC Integration",
    quote: "From store queues to a fully digital SIM journey",
    description: "A major telecom operator transformed SIM replacement into a mobile-first, KYC-compliant digital experience, eliminating physical visits and manual verification.",
    challenge: "Customers had to visit stores for SIM replacement, while KYC verification remained manual, fragmented, and operationally heavy.",
    challengeDetails: [
      "Customers had to visit stores to replace their SIMs, making the process tedious and inconvenient.",
      "KYC verification was not digitized, adding operational and legal obligations.",
      "Multiple teams had to coordinate across mobile, backend, KYC provider, and QA systems.",
      "A fragmented customer journey increased mistakes and support requests."
    ],
    solution: "Built an end-to-end mobile workflow integrated with third-party KYC APIs and telecom backend systems for secure, automated identity verification and SIM activation.",
    solutionDetails: [
      "Digital SIM replacement requests with assistant UI/UX screens",
      "Third-party KYC APIs connected to telecom and application backends",
      "Real-time request processing and SIM activation workflows",
      "Status tracking, clear error messages, and exception handling"
    ],
    implementation: [
      "Phase 1: Mobile journey design and KYC API mapping (6 weeks)",
      "Phase 2: Backend integration with telecom systems and security layer (8 weeks)",
      "Phase 3: End-to-end QA, compliance validation, and CI/CD rollout (6 weeks)",
      "Phase 4: Go-live support and post-deployment monitoring (ongoing)"
    ],
    results: [
      { value: "100%", label: "Regulatory Compliance" },
      { value: "25%", label: "Faster Delivery" },
      { value: "3x", label: "Operational Performance" },
      { value: "Reduced", label: "Client Complaints" }
    ],
    testimonial: {
      quote: "What used to require a store visit and paperwork now happens in minutes on the customer's phone. The modular KYC architecture gives us room to grow.",
      author: "Head of Digital Channels",
      role: "Major Telecom Operator"
    },
    technologies: ["React Native", "Node.js", "REST APIs", "OAuth 2.0", "AWS", "CI/CD", "KYC SDK"],
    icon: Smartphone,
    categoryIcon: Smartphone,
    image: "/images/case-studies/sim-kyc-hero.jpg"
  }
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, [slug]);

  
  const { data, isLoading, error } = useQuery({
      queryKey: ["case-study-detail", slug],
      queryFn: () => api.getCaseStudyBySlug(slug || ""),
    });
    const pageData = data;

    const study = pageData?.data?.[0]?.content;
  // const CategoryIcon = study.categoryIcon;

   if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorFallback error={error as Error} onRetry={() => window.location.reload()} />;
  
  if (slug === "seamless-sim-replacement-with-kyc-integration") {
    const simKycData = pageData?.data?.find((item: any) => item?.slug === "seamless-sim-replacement-with-kyc-integration");
    if (simKycData) {
      return <SimKycCaseStudy data={simKycData} />;
    }
  }

  if (slug === "migration-of-oracle-with-databricks-analytics") {
    const oracleDatabricksData = pageData?.data?.find((item: any) => item?.slug === "migration-of-oracle-with-databricks-analytics");
    if (oracleDatabricksData) {
      return <OracleDatabricksCaseStudy data={oracleDatabricksData} />;
    }
  }

  if (slug === "seamless-power-bi-deployment") {
    const powerBiData = pageData?.data?.find((item: any) => item?.slug === "seamless-power-bi-deployment");
    if (powerBiData) {
      return <PowerBiCaseStudy data={powerBiData} />;
    }
  }

  if (!slug || !caseStudiesData[slug]) {
    return <Navigate to="/case-studies" replace />;
  }

  return;

  return (
    <>
    {/* <SeoTags
                title={study.seo.title}
                description={study.seo.description}
                ogImage={study.seo.og_image}
                schema={study.schema}
              /> */}
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,8%)] via-[hsl(222,47%,6%)] to-[hsl(222,47%,5%)]" />
        
        <div className="absolute inset-0">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            to="/case-studies"
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          <div className={`max-w-4xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                {/* <CategoryIcon className="w-4 h-4 text-accent" /> */}
                <span className="text-accent text-sm font-medium">{study.industry}</span>
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {study.title}
            </h1>
            
            <p className="text-xl text-accent font-medium mb-6">
              "{study.quote}"
            </p>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 text-left">
              {study.description}
            </p>

            {/* Results Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl">
              {study.results.map((result, i) => (
                <div key={i} className="text-center">
                  <span className="text-3xl lg:text-4xl font-bold text-accent block">{result.value}</span>
                  <span className="text-muted-foreground text-sm">{result.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`max-w-4xl transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">The Challenge</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-left">{study.challenge}</p>
            
            <div className="grid gap-3">
              {study.challengeDetails.map((detail, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 shrink-0" />
                  <span className="text-muted-foreground">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className={`max-w-4xl transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Our Solution</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-left">{study.solution}</p>
            
            <div className="grid gap-3">
              {study.solutionDetails.map((detail, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`max-w-4xl transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Implementation Approach</h2>
            
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/50" />
              
              <div className="space-y-6">
                {study.implementation.map((phase, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 bg-accent/20 border border-accent/40 rounded-full flex items-center justify-center">
                      <span className="text-accent text-sm font-bold">{i + 1}</span>
                    </div>
                    <div className="p-4 bg-card/30 border border-border/30 rounded-lg">
                      <p className="text-foreground">{phase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`max-w-4xl transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Technologies Used</h2>
            
            <div className="flex flex-wrap gap-3">
              {study.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-muted/50 border border-border/30 rounded-lg text-foreground text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {study.testimonial && (
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className={`max-w-3xl mx-auto text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="p-8 lg:p-12 bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl">
                <p className="text-xl lg:text-2xl text-foreground italic mb-6">
                  "{study.testimonial.quote}"
                </p>
                <div>
                  <p className="text-accent font-semibold">{study.testimonial.author}</p>
                  <p className="text-muted-foreground text-sm">{study.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Let's discuss how we can help transform your business with innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Schedule Strategy Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View More Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyDetail;
