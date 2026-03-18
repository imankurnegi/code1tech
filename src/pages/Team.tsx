import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "react-router-dom";

import { api } from "@/api";
import { addClassToSpan } from "@/lib/utils";
import SeoTags from "@/components/SeoTags";


  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const TeamMemberCard = ({ member, index, isVisible }: { member: { name: string; designation: string; image?:{url:string}; scale?: string }; index: number; isVisible: boolean }) => (
    <div 
      className={`flex flex-col items-center text-center group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 mb-5 overflow-hidden rounded-full">
        <div className="absolute inset-0 rounded-full border-4 border-primary/30 group-hover:border-accent/50 transition-colors duration-300 z-10 pointer-events-none" />
        {member.image ? (
          <img
            src={member.image?.url}
            alt={member.name}
            className={`w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105 ${member.scale || 'scale-100'}`}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary/60">{getInitials(member.name)}</span>
          </div>
        )}
      </div>
      <h4 className="text-xl font-semibold text-foreground mb-1">{member.name}</h4>
      <p className="text-sm text-accent">{member.designation}</p>
    </div>
  );

export async function loader() {
  try {
    const teamData = await api.getTeamData();
    return teamData;
  } catch (error) {
    console.error("Failed to load team page SSG data", error);
    return {
      teamData: null
    };
    }
  }

const Team = () => {
  const loaderData = useLoaderData() as any;
  const [heroVisible, setHeroVisible] = useState(false);
  const [leadershipVisible, setLeadershipVisible] = useState(false);
  const [architectsVisible, setArchitectsVisible] = useState(false);
   const [bannerVisible, setBannerVisible] = useState(false);
  const [engineersVisible, setEngineersVisible] = useState(false);
  const [engBannerVisible, setEngBannerVisible] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const leadershipRef = useRef<HTMLElement>(null);
  const architectsRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const engineersRef = useRef<HTMLElement>(null);
  const engBannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) setHeroVisible(true);
          if (entry.target === leadershipRef.current) setLeadershipVisible(true);
          if (entry.target === architectsRef.current) setArchitectsVisible(true);
          if (entry.target === bannerRef.current) setBannerVisible(true);
          if (entry.target === engineersRef.current) setEngineersVisible(true);
          if (entry.target === engBannerRef.current) setEngBannerVisible(true);
        }
      });
    }, observerOptions);

    [heroRef, leadershipRef, architectsRef,bannerRef, engineersRef, engBannerRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);
  return (
      <>
      <SeoTags
              title={loaderData?.data?.seo?.title}
              description={loaderData?.data?.seo?.description}
              ogImage={loaderData?.data?.seo?.og_image}
            />
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative pt-24 pb-8 lg:pt-32 lg:pb-12 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 100%)"
          }}
        >
          {/* Hero background image */}
          <div className="absolute inset-0 w-full h-full">
            <img src={loaderData?.data?.banner_image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-background/60" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight lg:whitespace-nowrap" dangerouslySetInnerHTML={{__html : addClassToSpan(loaderData?.data?.page_title, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}}></h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html : loaderData?.data?.page_content}}></p>
            </div>
          </div>

          {/* Bottom fade */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" 
            style={{ background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)' }} 
          />
        </section>

        {/* Leadership Section */}
        <section 
          ref={leadershipRef}
          className="py-8 lg:py-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
          }}
        >
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`max-w-5xl mx-auto transition-all duration-1000 ${leadershipVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              {/* Section Header */}
              <div className="text-center mb-12">
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6" dangerouslySetInnerHTML={{__html : addClassToSpan(loaderData?.data?.leadership_team_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}}>
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html : loaderData?.data?.leadership_team_section?.description}}>
                </p>
              </div>

              {/* Leadership Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                {loaderData?.data?.leadership_team_section.teams.length > 0 && loaderData?.data?.leadership_team_section?.teams?.map((member, index) => (
                  <TeamMemberCard key={index} member={member} index={index} isVisible={leadershipVisible} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Architects Section */}
        <section 
          ref={architectsRef}
          className="py-8 lg:py-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
          }}
        >
          <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`max-w-4xl mx-auto transition-all duration-1000 ${architectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              {/* Section Header */}
              <div className="text-center mb-12">
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6" dangerouslySetInnerHTML={{__html : addClassToSpan(loaderData?.data?.our_architects_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}}>
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html : loaderData?.data?.our_architects_section?.description}}>
                </p>
              </div>

              {/* Architects Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-4xl mx-auto">
                {loaderData?.data?.our_architects_section?.teams.length > 0 && loaderData?.data?.our_architects_section?.teams.map((member, index) => (
                  <TeamMemberCard key={index} member={member} index={index} isVisible={architectsVisible} />
                ))}
              </div>
            </div>
          </div>
        </section>
{/* Architects CTA Banner */}
        <section
          ref={bannerRef}
          className="py-6 lg:py-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 100%)"
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link to={loaderData?.data?.our_architects_section?.connection_section_url} className="block">
              <div
                className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 border border-border/10 hover:border-accent/20 ${bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  background: "linear-gradient(135deg, hsl(222 50% 7%) 0%, hsl(215 55% 10%) 100%)"
                }}
              >
                {/* Animated scanning line */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-[scan_4s_ease-in-out_infinite]" />
                </div>

                {/* Floating particles - hidden on mobile */}
                <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
                  <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-accent/30 animate-[float_6s_ease-in-out_infinite]" />
                  <div className="absolute top-[60%] left-[25%] w-1.5 h-1.5 rounded-full bg-accent/20 animate-[float_8s_ease-in-out_infinite_1s]" />
                  <div className="absolute top-[30%] right-[45%] w-1 h-1 rounded-full bg-accent/25 animate-[float_7s_ease-in-out_infinite_2s]" />
                </div>

                {/* Radial glow on hover */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/0 group-hover:bg-accent/5 blur-3xl transition-all duration-1000 pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-center relative z-10">
                  {/* Left - Text Content */}
                  <div className="flex-1 px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10 relative z-10">
                    {/* Animated corner brackets */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500 rounded-tl-sm" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500 rounded-bl-sm" />

                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-[1.15]" dangerouslySetInnerHTML={{__html : addClassToSpan(loaderData?.data?.our_architects_section?.connect_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}}>
                    </h3>

                    {/* CTA with pulse ring */}
                    <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm sm:text-base group-hover:gap-3 transition-all duration-300 relative">
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/60 group-hover:animate-ping" />
                      <span className="ml-1">{loaderData?.data?.our_architects_section?.connect_section_text}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Right - Image with geometric accent (hidden on mobile, shown sm+) */}
                  <div className="hidden sm:flex relative w-full lg:w-[28%] h-[170px] lg:h-[210px] flex-shrink-0 items-center justify-center">
                    {/* Orbiting dot */}
                    <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-[250px] h-[250px] pointer-events-none animate-[spin_12s_linear_infinite]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent/40" />
                    </div>

                    {/* Accent stripe */}
                    <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-4 rounded-l-lg overflow-hidden z-20">
                      <div className="w-full h-full bg-gradient-to-b from-[#5FC2E3] to-[#0077B6]" />
                    </div>

                    {/* Image clipped in circle */}
                    <div className="relative mr-8 sm:mr-10 lg:mr-12 w-[135px] h-[135px] lg:w-[170px] lg:h-[170px] rounded-full overflow-hidden border-4 border-accent/20 group-hover:border-accent/40 transition-all duration-500 shadow-[0_0_40px_rgba(92,200,220,0.1)] group-hover:shadow-[0_0_60px_rgba(92,200,220,0.2)]">
                      <img
                        src={loaderData?.data?.our_architects_section?.connect_section_image?.url}
                        alt={loaderData?.data?.our_architects_section?.connect_section_image?.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                  </div>
                </div>

                {/* Bottom accent line - animated shimmer */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent group-hover:via-accent/70 transition-all duration-700" />
                <style>{`
                  @keyframes scan { 0%, 100% { transform: translateY(0); opacity: 0; } 50% { transform: translateY(240px); opacity: 1; } }
                  @keyframes float { 0%, 100% { transform: translateY(0); opacity: 0.3; } 50% { transform: translateY(-12px); opacity: 0.6; } }
                `}</style>
              </div>
            </Link>
          </div>
        </section>
        {/* Engineers Section */}
        <section 
          ref={engineersRef}
          className="py-8 lg:py-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
          }}
        >
          <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`max-w-4xl mx-auto transition-all duration-1000 ${engineersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              {/* Section Header */}
              <div className="text-center mb-12">
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6" dangerouslySetInnerHTML={{__html : addClassToSpan(loaderData?.data?.our_engineers_section?.heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}}>
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html : loaderData?.data?.our_engineers_section?.description}}>
                </p>
              </div>

              {/* Engineers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 max-w-4xl mx-auto">
                {loaderData?.data?.our_engineers_section?.teams.length > 0 && loaderData?.data?.our_engineers_section?.teams.map((member, index) => (
                  <TeamMemberCard key={index} member={member} index={index} isVisible={engineersVisible} />
                ))}
              </div>
            </div>
          </div>
          </section>
           {/* Engineers CTA Banner */}
        <section
          ref={engBannerRef}
          className="py-6 lg:py-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 100%)"
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link to={loaderData?.data?.our_engineers_section?.cta_url} className="block">
              <div
                className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 border border-border/10 hover:border-accent/20 ${engBannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  background: "linear-gradient(135deg, hsl(222 50% 7%) 0%, hsl(215 55% 10%) 100%)"
                }}
              >
                {/* Animated scanning line */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-[scan_4s_ease-in-out_infinite_0.5s]" />
                </div>

                {/* Floating particles - hidden on mobile */}
                <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
                  <div className="absolute top-[25%] right-[15%] w-1 h-1 rounded-full bg-accent/30 animate-[float_6s_ease-in-out_infinite_0.5s]" />
                  <div className="absolute top-[55%] right-[25%] w-1.5 h-1.5 rounded-full bg-accent/20 animate-[float_8s_ease-in-out_infinite_1.5s]" />
                  <div className="absolute top-[35%] left-[45%] w-1 h-1 rounded-full bg-accent/25 animate-[float_7s_ease-in-out_infinite_2.5s]" />
                </div>

                {/* Radial glow on hover */}
                <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/0 group-hover:bg-accent/5 blur-3xl transition-all duration-1000 pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-center relative z-10">
                  {/* Left - Image with geometric accent (hidden on mobile, shown sm+) */}
                  <div className="hidden sm:flex relative w-full lg:w-[28%] h-[170px] lg:h-[210px] flex-shrink-0 items-center justify-center">
                    {/* Orbiting dot */}
                    <div className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 w-[250px] h-[250px] pointer-events-none animate-[spin_12s_linear_infinite_reverse]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent/40" />
                    </div>

                    {/* Accent stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 rounded-r-lg overflow-hidden z-20">
                      <div className="w-full h-full bg-gradient-to-b from-[#0077B6] to-[#5FC2E3]" />
                    </div>

                    {/* Image clipped in circle */}
                    <div className="relative ml-8 sm:ml-10 lg:ml-12 w-[135px] h-[135px] lg:w-[170px] lg:h-[170px] rounded-full overflow-hidden border-4 border-accent/20 group-hover:border-accent/40 transition-all duration-500 shadow-[0_0_40px_rgba(92,200,220,0.1)] group-hover:shadow-[0_0_60px_rgba(92,200,220,0.2)]">
                      <img
                        src={loaderData?.data?.our_engineers_section?.connect_section_image?.url}
                        alt={loaderData?.data?.our_engineers_section?.connect_section_image?.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Right - Text Content */}
                  <div className="flex-1 px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10 relative z-10">
                    {/* Corner brackets - right */}
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500 rounded-tr-sm" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500 rounded-br-sm" />

                    {/* Diagonal accent lines */}
                    <div className="absolute bottom-4 left-4 lg:left-auto lg:right-[60%] opacity-15 pointer-events-none">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <line x1="0" y1="0" x2="48" y2="48" stroke="hsl(var(--accent))" strokeWidth="1.5" />
                        <line x1="12" y1="0" x2="48" y2="36" stroke="hsl(var(--accent))" strokeWidth="1" />
                        <line x1="24" y1="0" x2="48" y2="24" stroke="hsl(var(--accent))" strokeWidth="0.75" />
                      </svg>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-[1.15]" dangerouslySetInnerHTML={{__html : addClassToSpan(loaderData?.data?.our_engineers_section?.connect_section_heading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent")}}>
                    </h3>

                    {/* CTA with pulse ring */}
                    <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm sm:text-base group-hover:gap-3 transition-all duration-300 relative">
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/60 group-hover:animate-ping" />
                      <span className="ml-1">{loaderData?.data?.our_engineers_section?.connect_section_text}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent group-hover:via-accent/70 transition-all duration-700" />
              </div>
            </Link>
          </div>
        </section>

          {/* Want to Join CTA */}
        <section
          className="py-8 lg:py-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
          }}
        >
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-300 ${engBannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
               {loaderData?.data?.join_us_section?.heading}
              </h3>
              <p className="text-muted-foreground mb-6">
                {loaderData?.data?.join_us_section?.description}
              </p>
              <Link to={`${loaderData?.data?.join_us_section?.button_url}`} className="inline-flex items-center">
                <Button variant="hero" size="lg" className="group">
                  {loaderData?.data?.join_us_section?.button_label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom fade */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" 
            style={{ background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)' }} 
          />
        </section>
      </>
  );
};

export default Team;
