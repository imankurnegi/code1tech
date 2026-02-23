import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "react-router-dom";

import { api } from "@/api";
import { addClassToSpan } from "@/lib/utils";


  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const TeamMemberCard = ({ member, index, isVisible }: { member: { name: string; title: string; image?:{url:string}; scale?: string }; index: number; isVisible: boolean }) => (
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
      <p className="text-sm text-accent">{member.title}</p>
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
  const [engineersVisible, setEngineersVisible] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const leadershipRef = useRef<HTMLElement>(null);
  const architectsRef = useRef<HTMLElement>(null);
  const engineersRef = useRef<HTMLElement>(null);

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
          if (entry.target === engineersRef.current) setEngineersVisible(true);
        }
      });
    }, observerOptions);

    [heroRef, leadershipRef, architectsRef, engineersRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);


  return (
      <>
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
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html : loaderData?.data?.page_description}}></p>
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

          {/* CTA Section */}
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 mt-16 transition-all duration-1000 delay-300 ${engineersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
               {loaderData?.data?.join_us_section?.heading}
              </h3>
              <p className="text-muted-foreground mb-6">
                {loaderData?.data?.join_us_section?.description}
              </p>
              <Link to={`/${loaderData?.data?.join_us_section?.button_url}`} className="inline-flex items-center">
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
