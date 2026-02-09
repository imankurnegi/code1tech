import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ServicePageLayout from "@/components/ServicePageLayout";
import ClientsLogoSlider from "@/components/ClientsLogoSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Phone, CheckCircle2, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLoaderData } from "react-router-dom";
import { api } from "@/api";
import { DynamicIcon } from "@/components/DynamicIcon";
import SeoTags from "@/components/SeoTags";
import { useQuery } from "@tanstack/react-query";
const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Please enter your last name").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Please enter your phone number").max(20, "Phone number must be less than 20 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  message: z.string().trim().min(10, "Please share a bit more about your needs").max(1000, "Message must be less than 1000 characters")
});
type ContactFormData = z.infer<typeof contactSchema>;
const countryCodes = [{
  code: "+1",
  country: "US"
}, {
  code: "+44",
  country: "UK"
}, {
  code: "+91",
  country: "IN"
}, {
  code: "+61",
  country: "AU"
}, {
  code: "+49",
  country: "DE"
}, {
  code: "+33",
  country: "FR"
}, {
  code: "+81",
  country: "JP"
}, {
  code: "+86",
  country: "CN"
}];


export async function loader() {
  try {
    const [contactData, clientLogos] = await Promise.all([
      api.getContactData(),
      api.getClientLogos(),
    ]);

    return {
      contactData,
      clientLogos,
    };
  } catch (error) {
    console.error("Failed to load contact page SSG data", error);
    return {
      contactData: null,
      clientLogos: { data: [] },
    };
  }
}

const Contact = () => {
  
  const loaderData = useLoaderData() as any;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLocationsVisible, setIsLocationsVisible] = useState(false);
  const [isBrandsVisible, setIsBrandsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const locationsRef = useRef<HTMLElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);

  // const { isError, error } = useQuery({
  //   queryKey: ["contactpage"],
  //   queryFn: async () => {
  //      await Promise.all([
  //       api.getContactData(),
  //       api.getClientLogos(),
  //     ]);
  //   },
  //   initialData: loaderData,
  //   staleTime: Infinity,
  //   refetchOnMount: false,
  // });

  const clientLogosData = loaderData?.clientLogos?.data ?? [];

  const salesNumbers = [loaderData?.contactData?.data?.sales_group?.phone_1, loaderData?.contactData?.data?.sales_group?.phone_2, loaderData?.contactData?.data?.sales_group?.phone_3].filter((n): n is string => !!n);
  const hrNumbers = [loaderData?.contactData?.data?.career_group?.phone_1, loaderData?.contactData?.data?.career_group?.phone_2].filter((n): n is string => !!n);

  const officeLocations = [{
    city: loaderData?.contactData?.data?.locations_group?.sub_heading,
    address: loaderData?.contactData?.data?.locations_group?.address,
    country: "India"
  }, {
    city: loaderData?.contactData?.data?.locations_group?.sub_heading_2,
    address: loaderData?.contactData?.data?.locations_group?.address_2,
    country: "USA"
  }];

  const {
    toast
  } = useToast();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  // Intersection observers for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const createObserver = (ref: React.RefObject<Element>, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setter(true);
        }
      }, {
        threshold: 0.1
      });
      if (ref.current) observer.observe(ref.current);
      observers.push(observer);
    };
    createObserver(heroRef, setIsHeroVisible);
    createObserver(formRef, setIsFormVisible);
    createObserver(locationsRef, setIsLocationsVisible);
    createObserver(brandsRef, setIsBrandsVisible);
    return () => observers.forEach(obs => obs.disconnect());
  }, []);
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours."
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };
  return <ServicePageLayout>
    <SeoTags
        title={"Contact Us - Code1Tech"}
        description={"Get in touch with Code1Tech for expert software development, AI solutions, and digital transformation services. We're here to help your business thrive in the digital age."}
        ogImage="https://lovable.dev/opengraph-image-p98pqg.png"
      />
    {/* ========== HERO SECTION ========== */}
    <section ref={heroRef} className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 lg:pt-24" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      {/* Top fade for seamless navbar blend */}
      <div className="absolute top-0 left-0 right-0 h-32 md:h-40 pointer-events-none z-[2]" style={{
        background: 'linear-gradient(to bottom, hsl(222 47% 5%) 0%, hsl(222 47% 5%) 30%, transparent 100%)'
      }} />

      {/* Background Image with improved visibility */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50" style={{
        backgroundImage: `url(${loaderData?.contactData?.data?.banner_image || ""})`
      }} />

      {/* Subtle gradient overlay instead of heavy dark shade */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, hsl(222 47% 5% / 0.5) 0%, hsl(222 47% 4% / 0.35) 50%, hsl(222 47% 5% / 0.5) 100%)'
      }} />

      {/* Soft vignette on edges for enterprise look */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 150px 60px hsl(222 47% 5% / 0.6)'
      }} />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
        backgroundSize: '60px 60px'
      }} />


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-center">
            <span className="text-foreground">Contact </span>
            <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Us</span>
          </h1> */}
                  <h1 dangerouslySetInnerHTML={{ __html: loaderData?.contactData?.data?.page_title || "" }} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-center">
          </h1>
          <p dangerouslySetInnerHTML={{ __html: loaderData?.contactData?.data?.page_content || "" }} className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-slate-200 leading-relaxed text-center"></p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none z-[1]" style={{
        background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
      }} />
    </section>

    {/* ========== CONTACT FORM + IMAGE SECTION ========== */}
    <section ref={formRef} id="contact-form" className="py-10 lg:py-16 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(95,194,227,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto items-stretch transition-all duration-700 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* LEFT COLUMN - CONTACT FORM */}
          <div className="order-2 lg:order-1 flex flex-col">
            <div className="relative group h-full flex flex-col">
              {/* Outer glow on hover */}
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-sm pointer-events-none" />

              {/* Glassmorphism card */}
              <div className="relative rounded-2xl bg-card/20 backdrop-blur-xl border border-border/20 overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_25px_60px_rgba(0,78,158,0.15)] h-full flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 sm:p-8 lg:p-10">
                  {/* <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Send us a <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">message</span>
                  </h2> */}
                  <h2 dangerouslySetInnerHTML={{ __html: loaderData?.contactData?.data?.form_heading || "" }} className="text-2xl sm:text-3xl font-bold text-foreground mb-2"></h2>
                  <p className="text-muted-foreground mb-8">{loaderData?.contactData?.data?.form_paragraph}</p>

                  {/* Name Fields - Two Column */}
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input id="firstName" placeholder="John" {...register("firstName")} className={`bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200 ${errors.firstName ? "border-destructive" : ""}`} />
                      {errors.firstName && <p className="text-destructive text-xs mt-1.5">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input id="lastName" placeholder="Smith" {...register("lastName")} className={`bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200 ${errors.lastName ? "border-destructive" : ""}`} />
                      {errors.lastName && <p className="text-destructive text-xs mt-1.5">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input id="email" type="email" placeholder="john@company.com" {...register("email")} className={`bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200 ${errors.email ? "border-destructive" : ""}`} />
                    {errors.email && <p className="text-destructive text-xs mt-1.5">{errors.email.message}</p>}
                  </div>

                  {/* Phone Field with Country Code */}
                  <div className="mb-5">
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative">
                        <button type="button" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)} className="h-12 px-3 bg-muted/30 border border-border/50 rounded-xl flex items-center gap-2 text-foreground hover:border-accent/50 transition-colors min-w-[80px]">
                          <span className="text-sm">{selectedCountryCode}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isCountryDropdownOpen && <div className="absolute top-full left-0 mt-1 bg-card border border-border/50 rounded-xl shadow-xl z-50 min-w-[120px] py-1">
                          {countryCodes.map(item => <button key={item.code} type="button" onClick={() => {
                            setSelectedCountryCode(item.code);
                            setIsCountryDropdownOpen(false);
                          }} className="w-full px-3 py-2 text-left text-sm hover:bg-muted/50 text-foreground flex items-center justify-between">
                            <span>{item.code}</span>
                            <span className="text-muted-foreground text-xs">{item.country}</span>
                          </button>)}
                        </div>}
                      </div>
                      <Input id="phone" type="tel" placeholder="123-456-7890" {...register("phone")} className={`flex-1 bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200 ${errors.phone ? "border-destructive" : ""}`} />
                    </div>
                    {errors.phone && <p className="text-destructive text-xs mt-1.5">{errors.phone.message}</p>}
                  </div>

                  {/* Company Field */}
                  <div className="mb-5">
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company Name <span className="text-muted-foreground">(Optional)</span>
                    </label>
                    <Input id="company" placeholder="Your company name" {...register("company")} className="bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 h-12 text-foreground placeholder:text-muted-foreground/50 rounded-xl transition-all duration-200" />
                  </div>

                  {/* Message Field */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea id="message" placeholder="Tell us about your project or challenge..." rows={5} {...register("message")} className={`bg-muted/30 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 text-foreground placeholder:text-muted-foreground/50 resize-none rounded-xl transition-all duration-200 ${errors.message ? "border-destructive" : ""}`} />
                    {errors.message && <p className="text-destructive text-xs mt-1.5">{errors.message.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="hero" size="lg" disabled={isSubmitting || isSubmitted} className="w-full group h-14 text-base font-semibold rounded-xl disabled:opacity-70">
                    {isSubmitting ? <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </span> : isSubmitted ? <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </span> : <>
                      Send Message
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>}
                  </Button>

                  {/* Helper text */}
                  <p className="text-center text-muted-foreground text-sm mt-4">
                    We usually respond within 24 hours
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - HOW CAN WE HELP */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <div className="h-full flex flex-col relative p-6 lg:p-8 overflow-hidden">

              {/* Decorative background pattern - subtle grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: `
                    linear-gradient(hsl(194 68% 63% / 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(194 68% 63% / 0.5) 1px, transparent 1px)
                  `,
                backgroundSize: '40px 40px'
              }} />

              {/* Corner accent decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
                <div className="absolute top-4 right-4 w-20 h-20 border border-accent/10 rounded-full" />
                <div className="absolute top-6 right-6 w-12 h-12 border border-accent/5 rounded-full" />
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none">
                <div className="absolute bottom-4 left-4 w-16 h-16 border border-primary/10 rounded-full" />
              </div>

              {/* Subtle background particle layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="w-full h-full opacity-50" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <filter id="helpGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="helpLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(194 68% 63%)" stopOpacity="0" />
                      <stop offset="50%" stopColor="hsl(194 68% 63%)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="hsl(205 100% 31%)" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal accent lines for structure */}
                  {[120, 250, 380, 500].map((y, i) => (
                    <line
                      key={`h-line-${i}`}
                      x1="30"
                      y1={y}
                      x2="370"
                      y2={y}
                      stroke="hsl(194 68% 63%)"
                      strokeWidth="0.3"
                      opacity="0.08"
                    />
                  ))}

                  {/* Drifting connection lines */}
                  {[
                    { x1: 20, y1: 100, x2: 150, y2: 160 },
                    { x1: 250, y1: 80, x2: 380, y2: 140 },
                    { x1: 50, y1: 240, x2: 180, y2: 300 },
                    { x1: 220, y1: 280, x2: 350, y2: 340 },
                    { x1: 80, y1: 400, x2: 200, y2: 460 },
                    { x1: 280, y1: 420, x2: 380, y2: 480 },
                    { x1: 40, y1: 520, x2: 160, y2: 570 },
                    { x1: 240, y1: 530, x2: 360, y2: 580 },
                  ].map((line, i) => (
                    <line
                      key={`help-line-${i}`}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="url(#helpLineGrad)"
                      strokeWidth="0.6"
                      opacity="0.2"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.1;0.25;0.1"
                        dur={`${10 + i * 1.5}s`}
                        repeatCount="indefinite"
                        begin={`${i * 1.2}s`}
                      />
                    </line>
                  ))}

                  {/* Floating particles - distributed evenly */}
                  {[
                    { cx: 60, cy: 70, r: 2.5, dur: 18 },
                    { cx: 340, cy: 100, r: 2, dur: 22 },
                    { cx: 100, cy: 180, r: 2.5, dur: 20 },
                    { cx: 300, cy: 220, r: 2, dur: 16 },
                    { cx: 50, cy: 320, r: 2.5, dur: 24 },
                    { cx: 350, cy: 360, r: 2, dur: 19 },
                    { cx: 150, cy: 420, r: 2.5, dur: 21 },
                    { cx: 280, cy: 470, r: 2, dur: 17 },
                    { cx: 200, cy: 130, r: 2, dur: 23 },
                    { cx: 180, cy: 290, r: 2.5, dur: 25 },
                    { cx: 80, cy: 530, r: 2.5, dur: 20 },
                    { cx: 320, cy: 550, r: 2, dur: 18 },
                  ].map((p, i) => (
                    <circle
                      key={`help-particle-${i}`}
                      cx={p.cx}
                      cy={p.cy}
                      r={p.r}
                      fill="hsl(194 68% 63%)"
                      filter="url(#helpGlow)"
                      opacity="0.35"
                    >
                      <animate
                        attributeName="cy"
                        values={`${p.cy};${p.cy - 12};${p.cy}`}
                        dur={`${p.dur}s`}
                        repeatCount="indefinite"
                        begin={`${i * 1}s`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0.2;0.45;0.2"
                        dur={`${p.dur}s`}
                        repeatCount="indefinite"
                        begin={`${i * 1}s`}
                      />
                    </circle>
                  ))}

                  {/* Soft pulsing ring nodes */}
                  {[
                    { cx: 100, cy: 140 },
                    { cx: 320, cy: 200 },
                    { cx: 80, cy: 380 },
                    { cx: 300, cy: 440 },
                    { cx: 200, cy: 540 },
                  ].map((node, i) => (
                    <circle
                      key={`help-node-${i}`}
                      cx={node.cx}
                      cy={node.cy}
                      r="5"
                      fill="none"
                      stroke="hsl(194 68% 63%)"
                      strokeWidth="0.6"
                      opacity="0.15"
                    >
                      <animate
                        attributeName="r"
                        values="5;14;5"
                        dur={`${8 + i * 1.5}s`}
                        repeatCount="indefinite"
                        begin={`${i * 2}s`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0.18;0.05;0.18"
                        dur={`${8 + i * 1.5}s`}
                        repeatCount="indefinite"
                        begin={`${i * 2}s`}
                      />
                    </circle>
                  ))}
                </svg>
              </div>

              {/* Content layer - vertically centered */}
              <div className="relative z-10 flex flex-col justify-center h-full py-4">
                {/* Header Section */}
                <div className="mb-8">
                  {/* <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    How Can We <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Help?</span>
                  </h3> */}
                  <h3 dangerouslySetInnerHTML={{ __html: loaderData?.contactData?.data?.contact_help_section?.help_section_heading || "" }} className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  </h3>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                    {loaderData?.contactData?.data?.contact_help_section?.help_section_paragraph}
                  </p>
                </div>

                {/* Divider with subtle gradient */}
                <div className="relative h-px mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                </div>

                {/* Bullet points with enhanced styling */}
                <ul className="space-y-6 mb-8">
                  {
                    loaderData?.contactData?.data?.contact_help_section?.help_lists?.length > 0 && loaderData?.contactData?.data?.contact_help_section?.help_lists?.map((point: any, index: number) => (

                      <li key={index} className="flex items-start gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-accent/20 group-hover:border-accent/50 group-hover:shadow-[0_0_15px_rgba(95,194,227,0.2)]">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground text-sm lg:text-base leading-relaxed pt-1">{point.list_text}</span>
                      </li>
                    ))
                  }
                </ul>

                {/* Subtle emphasis line */}
                <p className="text-muted-foreground/80 text-sm italic mb-8 text-center">{loaderData?.contactData?.data?.contact_help_section?.help_comment}</p>

                {/* Divider */}
                <div className="relative h-px mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                </div>

                {/* Trust row with enhanced styling */}
                <div className="flex flex-wrap justify-center gap-4 lg:gap-5 mt-4">
                  {
                    loaderData?.contactData?.data?.contact_help_section?.helop_bottom_section?.length > 0 && loaderData?.contactData?.data?.contact_help_section?.helop_bottom_section?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-accent/8 border border-accent/20 transition-all duration-300 hover:bg-accent/15 hover:border-accent/40">
                        <DynamicIcon name={item.icon} className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ========== CONTACT DETAILS INFO GRID ========== */}
    <section ref={locationsRef} className="relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      {/* Ambient glows */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      {/* AI-Inspired Particle Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="locParticleGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="locConnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(194 68% 63%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(194 68% 63%)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(205 100% 31%)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subtle connection lines */}
          {[
            { x1: 50, y1: 80, x2: 200, y2: 150 },
            { x1: 200, y1: 150, x2: 400, y2: 100 },
            { x1: 400, y1: 100, x2: 600, y2: 180 },
            { x1: 600, y1: 180, x2: 750, y2: 120 },
            { x1: 100, y1: 300, x2: 300, y2: 250 },
            { x1: 300, y1: 250, x2: 500, y2: 320 },
            { x1: 500, y1: 320, x2: 700, y2: 280 },
          ].map((line, i) => (
            <line
              key={`loc-conn-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#locConnGradient)"
              strokeWidth="0.5"
              opacity="0.15"
            >
              <animate
                attributeName="opacity"
                values="0.05;0.15;0.05"
                dur={`${12 + i * 1.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.9}s`}
              />
            </line>
          ))}

          {/* Floating particles */}
          {[
            { cx: 50, cy: 80, r: 2 }, { cx: 200, cy: 150, r: 2.5 },
            { cx: 400, cy: 100, r: 2 }, { cx: 600, cy: 180, r: 2.5 },
            { cx: 750, cy: 120, r: 2 }, { cx: 100, cy: 300, r: 2 },
            { cx: 300, cy: 250, r: 2.5 }, { cx: 500, cy: 320, r: 2 },
            { cx: 700, cy: 280, r: 2.5 },
          ].map((p, i) => (
            <circle
              key={`loc-particle-${i}`}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill="hsl(194 68% 63%)"
              filter="url(#locParticleGlow)"
              opacity="0.25"
            >
              <animate
                attributeName="cy"
                values={`${p.cy};${p.cy - 10};${p.cy}`}
                dur={`${15 + i * 0.9}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
              <animate
                attributeName="opacity"
                values="0.12;0.3;0.12"
                dur={`${15 + i * 0.9}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
            </circle>
          ))}

          {/* Tiny ambient dots */}
          {[
            { cx: 120, cy: 200 }, { cx: 280, cy: 50 }, { cx: 450, cy: 220 },
            { cx: 620, cy: 60 }, { cx: 180, cy: 350 }, { cx: 380, cy: 380 },
            { cx: 580, cy: 360 }, { cx: 720, cy: 350 },
          ].map((dot, i) => (
            <circle
              key={`loc-dot-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r="1"
              fill="hsl(205 100% 31%)"
              opacity="0.15"
            >
              <animate
                attributeName="opacity"
                values="0.08;0.2;0.08"
                dur={`${18 + i * 1.4}s`}
                repeatCount="indefinite"
                begin={`${i * 1.2}s`}
              />
            </circle>
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto transition-all duration-700 ${isLocationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">

            {/* Glowing divider */}
            <div className="relative w-24 sm:w-32 h-px mx-auto mt-6">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
            </div>
          </div>

          {/* 3-Column Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">

            {/* Locations Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-sm pointer-events-none" />
              <Card className="relative h-full bg-card/20 backdrop-blur-xl border-border/20 overflow-hidden transition-all duration-500 group-hover:border-accent/40 group-hover:-translate-y-2 group-hover:shadow-[0_25px_60px_rgba(95,194,227,0.15)]">
                <CardContent className="p-6 lg:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <DynamicIcon name={loaderData?.contactData?.data?.locations_group?.icon} className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">{loaderData?.contactData?.data?.locations_group?.heading}</h3>
                  <div className="space-y-4">
                    {officeLocations.length > 0 && officeLocations.map((location, index) => <div key={index} className="pb-4 border-b border-border/20 last:border-0 last:pb-0">
                      <p className="font-semibold text-foreground mb-1">{location.city}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{location.address}</p>
                    </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sales Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-sm pointer-events-none" />
              <Card className="relative h-full bg-card/20 backdrop-blur-xl border-border/20 overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:-translate-y-2 group-hover:shadow-[0_25px_60px_rgba(0,78,158,0.15)]">
                <CardContent className="p-6 lg:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <DynamicIcon name={loaderData?.contactData?.data?.sales_group?.icon} className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{loaderData?.contactData?.data?.sales_group?.heading}</h3>
                  <div className="space-y-3 mb-6">
                    {salesNumbers.length > 0 && salesNumbers.map((num, index) => <a key={index} href={`tel:${String(num).replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="text-sm">{num}</span>
                    </a>)}
                  </div>
                  <div className="pt-4 border-t border-border/20">
                    <a href={`mailto:${loaderData?.contactData?.data?.sales_group?.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Mail className="w-4 h-4 text-accent" />
                      <span className="text-sm">{loaderData?.contactData?.data?.sales_group?.email}</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* HR Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 blur-sm pointer-events-none" />
              <Card className="relative h-full bg-card/20 backdrop-blur-xl border-border/20 overflow-hidden transition-all duration-500 group-hover:border-accent/40 group-hover:-translate-y-2 group-hover:shadow-[0_25px_60px_rgba(95,194,227,0.15)]">
                <CardContent className="p-6 lg:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <DynamicIcon name={loaderData?.contactData?.data?.career_group?.icon} className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">{loaderData?.contactData?.data?.career_group?.heading}</h3>
                  <div className="space-y-3 mb-6">
                    {hrNumbers.length > 0 && hrNumbers.map((num, index) => <a key={index} href={`tel:${String(num).replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="text-sm">{num}</span>
                    </a>)}
                  </div>
                  <div className="pt-4 border-t border-border/20">
                    <a href={`mailto:${loaderData?.contactData?.data?.career_group?.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Mail className="w-4 h-4 text-accent" />
                      <span className="text-sm">{loaderData?.contactData?.data?.career_group?.email}</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Business Hours Strip */}
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 blur-sm pointer-events-none" />
            <div className="relative bg-card/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4 group-hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <DynamicIcon name={loaderData?.contactData?.data?.business_hours_group?.icon} className="w-6 h-6 text-accent" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-foreground font-semibold text-lg">{loaderData?.contactData?.data?.business_hours_group?.heading}</p>
                <p className="text-muted-foreground">{loaderData?.contactData?.data?.business_hours_group?.option_1}</p>
                <p className="text-muted-foreground">{loaderData?.contactData?.data?.business_hours_group?.option_2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ========== MAP SECTION ========== */}
    <section className="py-10 lg:py-16 relative" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            {/* <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Find Us on{" "}
              <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Map</span>
            </h2> */}
            <h2 dangerouslySetInnerHTML={{ __html: loaderData?.contactData?.data?.map_group?.heading || "" }} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"></h2>
            <p className="text-muted-foreground">{loaderData?.contactData?.data?.map_group?.sub_heading}</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/20 group">
            <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 blur-sm pointer-events-none" />
            <div dangerouslySetInnerHTML={{ __html: loaderData?.contactData?.data?.map_group?.map_code || "" }}></div>
          </div>
        </div>
      </div>
    </section>

    {/* ========== TRUST & BRANDS SECTION ========== */}
    <section className="py-10 lg:py-16 overflow-hidden relative" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={brandsRef} className={`text-center mb-10 transition-all duration-700 ${isBrandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Building Success with{" "}
            <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Global Brands</span>
          </h2> */}
          <h2 dangerouslySetInnerHTML={{ __html: loaderData?.contactData?.data?.brand_group?.heading || "" }} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"></h2>
          <p className="text-muted-foreground">{loaderData?.contactData?.data?.brand_group?.sub_heading}</p>
          {/* Glowing divider */}
          <div className="relative w-24 sm:w-32 h-px mx-auto mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
          </div>
        </div>
      </div>

      {/* Reusable Logo Slider Component */}
      <ClientsLogoSlider dataClientLogo={clientLogosData} />
    </section>

  </ServicePageLayout>;
};
export default Contact;