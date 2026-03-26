import { useEffect, useRef, useState } from "react";
import ClientsLogoSlider from "@/components/ClientsLogoSlider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import SeoTags from "@/components/SeoTags";
import CertificationsSection from "@/components/CertificationsSection";
import { api } from "@/api";
import { addClassToSpan } from "@/lib/utils";
import { DynamicIcon } from "@/components/DynamicIcon";
import { useQuery } from "@tanstack/react-query";

const About = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [visionVisible, setVisionVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);
  const [approachVisible, setApproachVisible] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("vision");
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["aboutPageData"],
    queryFn: async () => {
      const [aboutData, clientLogos] = await Promise.all([
        api.getAboutData(),
        api.getClientLogos(),
      ]);

      return {
        aboutData,
        clientLogos,
      };
    },
  });

  useEffect(() => {
  setHeroVisible(true)

  const observers = []

  const createObserver = (ref, setter) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      setter(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setter(true)
          observer.unobserve(el) // optional (animation once)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    observers.push(observer)
  }

  createObserver(introRef, setIntroVisible)
  createObserver(visionRef, setVisionVisible)
  createObserver(valuesRef, setValuesVisible)
  createObserver(approachRef, setApproachVisible)
  createObserver(teamRef, setTeamVisible)

  return () => observers.forEach((o) => o.disconnect())
}, [])

  if (isLoading) return null;
  if (error) return null;

  const about = data?.aboutData?.data;
  const clientLogosData = data?.clientLogos?.data ?? [];

  return <>
    <SeoTags
      title={about?.seo?.title}
      description={about?.seo?.description}
      ogImage={about?.seo?.og_image}
    />
    {/* Hero Section - Matching Home page style */}
    <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 lg:pt-28" style={{
      background: "hsl(222 47% 5%)"
    }}>

      {/* Background Image with improved visibility */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45" style={{
        backgroundImage: `url(${about?.banner_image})`
      }} />

      {/* Subtle gradient overlay (top-to-bottom) instead of heavy dark shade */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, hsl(222 47% 5% / 0.6) 0%, hsl(222 47% 4% / 0.4) 50%, hsl(222 47% 5% / 0.6) 100%)'
      }} />

      {/* Soft vignette on edges for enterprise IT look */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 150px 60px hsl(222 47% 5% / 0.7)'
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

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => <div key={i} className="absolute w-1 h-1 rounded-full bg-accent/20 animate-float" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${6 + Math.random() * 4}s`
        }} />)}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight mb-6" dangerouslySetInnerHTML={{ __html: addClassToSpan(about?.page_title, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-slate-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: about?.page_content }}>
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none z-[1]" style={{
        background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
      }} />
    </section>

    {/* Clients Section */}
    <section className="pb-6 pt-4 relative" style={{
      background: "hsl(222 47% 5%)"
    }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ClientsLogoSlider dataClientLogo={clientLogosData} />
        <div className="text-center mt-10 animate-fade-in">

          <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg">
            {about?.paragraph_below_client_logo}
          </p>
        </div>
      </div>
    </section>

    {/* About Us / Intro Section - Left Image + Right Content */}
    <section ref={introRef} className="py-8 lg:py-12 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      {/* Top/Bottom fades */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
        background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)'
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
        background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
      }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(95,194,227,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Text-integrated layout with blended image */}
        <div className={`relative transition-all duration-1000 ${introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Blended image - positioned within text container */}
          <div className="hidden lg:block absolute top-0 right-0 w-[45%] h-full pointer-events-none">
            {/* Soft ambient glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-l from-accent/8 via-primary/5 to-transparent blur-2xl" />

            {/* Image with gradient blending */}
            <div className="relative h-full flex items-start pt-2">
              <div className="relative w-full">
                <img src={about?.what_can_we_do_section?.image?.url} alt={about?.what_can_we_do_section?.image?.alt} className="w-full h-auto object-cover rounded-l-2xl" />
                {/* Left fade - blends image into text area */}
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[hsl(222_47%_5%)] via-[hsl(222_47%_5%/0.7)] to-transparent pointer-events-none" />
                {/* Top fade */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[hsl(222_47%_5%/0.6)] to-transparent pointer-events-none" />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[hsl(222_47%_5%)] via-[hsl(222_47%_5%/0.8)] to-transparent pointer-events-none" />
                {/* Right edge fade */}
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[hsl(222_47%_5%/0.4)] to-transparent pointer-events-none" />
                {/* Soft vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10 pointer-events-none rounded-l-2xl" />
              </div>
            </div>
          </div>

          {/* Text content - primary container */}
          <div className="relative z-10 lg:max-w-[60%]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: addClassToSpan(about?.what_can_we_do_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}></h2>

            <div className="space-y-4 mb-8">
              <p className="text-base lg:text-lg text-foreground/90 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: about?.what_can_we_do_section?.description }}>

              </p>
              {/* <p className="text-base lg:text-lg text-foreground/90 leading-relaxed">
                Our mission is simple: turn complexity into clarity and innovation into results.
              </p>
              <p className="text-base lg:text-lg font-medium text-foreground">
                We don't just build technology. We build awareness.
              </p> */}
            </div>

            <Link to={about?.what_can_we_do_section?.button_url}>
              <Button variant="hero" size="lg" className="group shadow-lg shadow-primary/20">
                {about?.what_can_we_do_section?.button_label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile image - shown below text on smaller screens */}
          <div className="lg:hidden mt-8">
            <div className="relative">
              <img src={about?.what_can_we_do_section?.image?.url} alt={about?.what_can_we_do_section?.image?.alt} className="w-full h-auto object-cover rounded-xl" />
              {/* Soft gradient overlays for mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_5%)] via-transparent to-[hsl(222_47%_5%/0.3)] pointer-events-none rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Vision & Mission Section - Two Column Split Layout */}
    <section ref={visionRef} className="py-8 lg:py-12 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      {/* Ambient glows */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-10 lg:mb-14 transition-all duration-700 ${visionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(about?.our_vision_section?.vision_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }}>
          </h2>
          {/* Glowing divider */}
          <div className="relative w-24 sm:w-32 h-px mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
          </div>
        </div>

        {/* Two Column Split Layout */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto transition-all duration-700 delay-100 ${visionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* Left Side - Visual Area with Tab-Controlled Images */}
          <div className="relative group order-2 lg:order-1 h-[400px] lg:h-[520px]">
            {/* Glow effect on hover */}
            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative h-full rounded-2xl overflow-hidden border border-border/20 group-hover:border-primary/30 transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(0,78,158,0.15)]">
              {/* Vision Image */}
              <img src={about?.our_vision_section?.vision_tab_left_image?.url} alt={about?.our_vision_section?.vision_tab_left_image?.alt} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${activeTab === "vision" ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} />

              {/* Mission Image */}
              <img src={about?.our_vision_section?.mission_tab_left_image?.url} alt={about?.our_vision_section?.mission_tab_left_image?.alt} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${activeTab === "mission" ? "opacity-100 scale-100" : "opacity-0 scale-105"}`} />

              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent pointer-events-none" />

              {/* Visual label - changes based on tab */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl backdrop-blur-sm border flex items-center justify-center transition-all duration-300 ${activeTab === "vision" ? "bg-primary/20 border-primary/30" : "bg-accent/20 border-accent/30"}`}>
                    {activeTab === "vision" ? <DynamicIcon name={about?.our_vision_section?.vision_tab_left_image_icon} className="w-5 h-5 text-accent" /> : <DynamicIcon name={about?.our_vision_section?.mission_tab_left_image_icon} className="w-5 h-5 text-accent" />}
                  </div>
                  <div>
                    <p className="text-sm text-accent font-medium">
                      {activeTab === "vision" ? about?.our_vision_section?.vision_tab_left_image_heading : about?.our_vision_section?.mission_tab_left_image_heading}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activeTab === "vision" ? about?.our_vision_section?.vision_tab_left_image_content : about?.our_vision_section.mission_tab_left_image_content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Tabbed Content Area */}
          <div className="relative order-1 lg:order-2 h-[400px] lg:h-[520px] flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              {/* Tab Triggers */}
              <TabsList className="w-full bg-card/30 backdrop-blur-xl border border-border/20 p-1.5 rounded-xl mb-6 h-auto flex-shrink-0">
                <TabsTrigger value="vision" className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-primary/20 data-[state=active]:border-primary/40 data-[state=active]:shadow-[0_0_15px_rgba(0,78,158,0.2)] border border-transparent transition-all duration-300 hover:bg-card/50 hover:text-foreground">
                  <DynamicIcon name={about?.our_vision_section?.vision_tab_icon_class} className="w-4 h-4" />
                  <span className="font-semibold">{about?.our_vision_section?.vision_tab_label}</span>
                </TabsTrigger>
                <TabsTrigger value="mission" className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-accent/20 data-[state=active]:border-accent/40 data-[state=active]:shadow-[0_0_15px_rgba(95,194,227,0.2)] border border-transparent transition-all duration-300 hover:bg-card/50 hover:text-foreground">
                  <DynamicIcon name={about?.our_vision_section?.mission_tab_icon_class} className="w-4 h-4" />
                  <span className="font-semibold">{about?.our_vision_section?.mission_tab_label}</span>
                </TabsTrigger>
              </TabsList>

              {/* Vision Tab Content */}
              <TabsContent value="vision" className="mt-0 flex-1">
                <div className="group relative h-full">
                  {/* Hover glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <Card className="relative h-full bg-card/20 backdrop-blur-xl border-border/20 overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(0,78,158,0.15)]">
                    <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                      {/* Vision Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,78,158,0.2)]">
                          <DynamicIcon name={about?.our_vision_section?.vision_tab_content_icon} className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{about?.our_vision_section?.vision_tab_content_heading}</h3>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full mt-1" />
                        </div>
                      </div>

                      {/* Vision Content */}
                      <div className="space-y-4 flex-1" dangerouslySetInnerHTML={{ __html: about?.our_vision_section?.vision_tab_content_description }}>
                        {/* <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-justify">
                          To facilitate global businesses in making greater strides with fewer resources, leveraging smart, scalable, and deeply human technology.
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-base lg:text-lg text-justify">
                          We envision a world where innovation is not only a possibility for larger organizations, but for any organization with the courage to act on it.
                        </p> */}
                      </div>

                      {/* Decorative accent */}
                      <div className="mt-auto pt-6 border-t border-border/20">
                        <div className="flex items-center gap-2 text-accent text-sm">
                          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent))]" />
                          <span>{about?.our_vision_section?.vision_tab_content_bottom_text}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Mission Tab Content */}
              <TabsContent value="mission" className="mt-0 flex-1">
                <div className="group relative h-full">
                  {/* Hover glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <Card className="relative h-full bg-card/20 backdrop-blur-xl border-border/20 overflow-hidden transition-all duration-500 group-hover:border-accent/30 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(95,194,227,0.12)]">
                    <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                      {/* Mission Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center shadow-[0_0_20px_rgba(95,194,227,0.2)]">
                          <DynamicIcon name={about?.our_vision_section?.mission_tab_content_icon} className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{about?.our_vision_section?.mission_tab_content_heading}</h3>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-primary rounded-full mt-1" />
                        </div>
                      </div>

                      {/* Mission Content */}
                      <div className="space-y-4 flex-1" dangerouslySetInnerHTML={{ __html: about?.our_vision_section?.mission_tab_content_description }}>
                        {/* <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                          {about?.our_vision_section.mission_tab_content_description}
                        </p> */}

                        {/* Enhanced bullet points */}
                        {/* <ul className="space-y-3">
                          {["Discover new operational efficiencies and growth opportunities.", "Make daily operational and decision-making simpler.", "Empower teams with solutions that enhance success.", "Deliver meaningful value through intelligent transformation."].map((item, i) => <li key={i} className="flex items-start gap-3 group/item">
                            <div className="mt-1 flex-shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-accent opacity-80 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-muted-foreground leading-relaxed">{item}</span>
                          </li>)}
                        </ul> */}
                      </div>

                      {/* Decorative accent */}
                      <div className="mt-auto pt-4 border-t border-border/20">
                        <p className="text-muted-foreground text-sm">
                          {about?.our_vision_section?.mission_tab_content_bottom_text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-300 ${visionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link to={about?.our_vision_section?.bottom_button_url}>
            <Button variant="hero" size="lg" className="group">
              {about?.our_vision_section?.bottom_button_label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Values Section */}
    <section ref={valuesRef} className="py-8 lg:py-12 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(95,194,227,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(95,194,227,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-accent/10 rounded-full" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pulse ${4 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 4}s`
        }} />)}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: addClassToSpan(about?.our_values_section?.our_values_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} >
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: about?.our_values_section?.our_values_sub_heading }}></p>
          {/* Glowing divider */}
          <div className="relative w-24 sm:w-32 h-px mx-auto mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {about?.our_values_section?.our_values_blocks.length > 0 && about?.our_values_section?.our_values_blocks.map((value, index) => {
            const isHovered = hoveredValue === index;
            return <div key={index} onMouseEnter={() => setHoveredValue(index)} onMouseLeave={() => setHoveredValue(null)} className={`group relative transition-all duration-500 ${valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${isHovered ? "-translate-y-2" : ""}`} style={{
              transitionDelay: `${200 + index * 100}ms`
            }}>
              {/* Outer glow on hover */}
              <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-sm pointer-events-none`} />

              {/* Glassmorphism card */}
              <div className={`relative h-full rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-xl border transition-all duration-300 overflow-hidden ${isHovered ? "border-accent/40 shadow-xl shadow-accent/15" : "border-border/20"}`}>
                {/* Image */}
                <div className="relative h-36 sm:h-40 overflow-hidden">
                  <img src={value.image.large} alt={`${value.image.alt} visualization`} className="w-full h-full transition-transform duration-700 group-hover:scale-110 object-cover object-center" />
                  {/* No overlay - show image clearly */}

                  {/* Icon badge */}
                  <div className="absolute bottom-3 left-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border transition-all duration-300 ${isHovered ? "bg-accent/20 border-accent/40" : "bg-background/60 border-border/30"}`}>
                      <DynamicIcon name={value.icon_class} className={`w-5 h-5 transition-colors duration-300 ${isHovered ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6">
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${isHovered ? "text-accent" : "text-foreground"}`}>
                    {value.heading}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: value.content }}>

                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent to-transparent transition-all duration-500 ${isHovered ? "via-accent/70" : "via-primary/0"}`} />
              </div>
            </div>;
          })}
        </div>
      </div>
    </section>

    {/* Work Approach Section - Compact Visual Layout */}
    <section ref={approachRef} className="py-8 lg:py-12 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
    }}>
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${approachVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: addClassToSpan(about?.our_work_approach_section?.our_work_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") }} >

          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {about?.our_work_approach_section?.our_work_paragraph}
          </p>
        </div>

        {/* Two Column Layout: Image Left, Cards Right */}
        <div className={`flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto transition-all duration-700 delay-100 ${approachVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left - Visual */}
          <div className="lg:w-[40%] flex-shrink-0">
            <div className="relative h-full min-h-[280px] lg:min-h-0 rounded-xl overflow-hidden">
              {/* Glow backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent blur-xl opacity-60" />

              <div className="relative h-full rounded-xl overflow-hidden border border-border/20">
                <img src={about?.our_work_approach_section?.left_image.large} alt={about?.our_work_approach_section?.left_image.alt} className="w-full h-full object-cover" />
                {/* Soft overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[hsl(222_47%_5%/0.3)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_5%/0.4)] via-transparent to-transparent" />

                {/* Floating label */}
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg bg-card/60 backdrop-blur-sm border border-accent/20">
                  <div className="flex items-center gap-2">
                    <DynamicIcon name={about?.our_work_approach_section?.left_image_icon_class} className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{about?.our_work_approach_section?.left_image_text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - 2x2 Cards Grid */}
          <div className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about?.our_work_approach_section?.approach_blocks.length > 0 && about?.our_work_approach_section?.approach_blocks.map((approach, index) => {
              return <div key={index} className={`group relative transition-all duration-500 ${approachVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
                transitionDelay: `${150 + index * 75}ms`
              }}>
                <div className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 blur-sm pointer-events-none" />

                <div className="relative h-full p-4 lg:p-5 rounded-lg bg-card/20 backdrop-blur-sm border border-border/20 transition-all duration-300 hover:border-accent/30 hover:bg-card/30">
                  {/* Icon + Title row */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-md bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:border-accent/40 transition-colors flex-shrink-0">
                      <DynamicIcon name={approach.icon_class} className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors" dangerouslySetInnerHTML={{ __html: approach.heading }}>
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed text-left">
                    {approach.content}
                  </p>
                </div>
              </div>;
            })}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-8 transition-all duration-700 delay-400 ${approachVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link to={about?.our_work_approach_section?.bottom_button_url}>
            <Button variant="hero" size="lg" className="group shadow-lg shadow-primary/20">
              {about?.our_work_approach_section?.bottom_button_label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Certifications Section*/}
    <CertificationsSection certificationData={about?.certifications_section} sectionRef={teamRef} isVisible={teamVisible} />
  </>;
};
export default About;