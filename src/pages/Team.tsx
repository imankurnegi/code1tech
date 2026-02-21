import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Team member photos
import bhageshImg from "@/assets/team/bhagesh.png";
import tanishaImg from "@/assets/team/tanisha.png";
import shanuImg from "@/assets/team/shanu.png";
import mukeshImg from "@/assets/team/mukesh.png";
import abhilashImg from "@/assets/team/abhilash.png";
import rajatImg from "@/assets/team/rajat.png";
import darshanImg from "@/assets/team/darshan.png";
import ruchitaImg from "@/assets/team/ruchita.png";
import teamHeroBg from "@/assets/team-hero-bg.jpg";

// Architect photos
import gursimranImg from "@/assets/team/gursimran.jpg";
import mohitImg from "@/assets/team/mohit.jpg";
import rahulImg from "@/assets/team/rahul.jpg";
import vivekImg from "@/assets/team/vivek.jpg";

// Engineer photos
import supriyoImg from "@/assets/team/supriyo.jpg";
import ashutoshImg from "@/assets/team/ashutosh.jpg";
import chandraImg from "@/assets/team/chandra.jpg";
import nitinImg from "@/assets/team/nitin.jpg";
import sachinImg from "@/assets/team/sachin.jpg";
import rakeshImg from "@/assets/team/rakesh.jpg";
import divyavijayImg from "@/assets/team/divyavijay.jpg";
import abhayImg from "@/assets/team/abhay.jpg";

const Team = () => {
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

  const leadershipTeam = [
    { name: "Bhagesh", title: "Director", image: bhageshImg },
    { name: "Tanisha", title: "Business Delivery Head", image: tanishaImg, scale: "scale-110" },
    { name: "Mukesh", title: "Finance Head", image: mukeshImg },
    { name: "Shanu", title: "Human Resources Manager", image: shanuImg },
    { name: "Abhilash", title: "Delivery Manager", image: abhilashImg },
    { name: "Rajat", title: "Technical Lead", image: rajatImg },
    { name: "Darshan", title: "Sales Lead", image: darshanImg },
    { name: "Ruchita", title: "Growth Manager", image: ruchitaImg },
  ];

  const architects = [
    { name: "Vivek", title: "AWS Solution Architect", image: vivekImg },
    { name: "Gur Simran", title: "GCP Solution Architect", image: gursimranImg },
    { name: "Vivek", title: "Azure Solution Architect", image: mohitImg },
    { name: "Rahul", title: "Infra Architect", image: rahulImg },
  ];

  const engineers = [
    { name: "Supriyo", title: "Sr. Data Engineer", image: supriyoImg },
    { name: "Ashutosh", title: "Sr. Adobe Engineer", image: ashutoshImg },
    { name: "Abhay", title: "Backend Engineer", image: abhayImg },
    { name: "Chandra", title: "Power BI Engineer", image: chandraImg },
    { name: "Nitin", title: "Sr. Python Engineer", image: nitinImg },
    { name: "Sachin", title: "Sr. SAP IBP Engineer", image: sachinImg },
    { name: "Rakesh", title: "Sr. Data Engineer", image: rakeshImg },
    { name: "Divyavijay", title: "Sr. Data Scientist", image: divyavijayImg },
  ];

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const TeamMemberCard = ({ member, index, isVisible }: { member: { name: string; title: string; image?: string; scale?: string }; index: number; isVisible: boolean }) => (
    <div 
      className={`flex flex-col items-center text-center group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 mb-5 overflow-hidden rounded-full">
        <div className="absolute inset-0 rounded-full border-4 border-primary/30 group-hover:border-accent/50 transition-colors duration-300 z-10 pointer-events-none" />
        {member.image ? (
          <img
            src={member.image}
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
            <img src={teamHeroBg} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-background/60" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight lg:whitespace-nowrap">
                The People Behind <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Code1 Tech</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                A passionate team of leaders, architects, and engineers committed to transforming ideas into exceptional digital solutions.
              </p>
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
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our{" "}
                  <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Leadership Team</span>
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  The team believes in leading with clarity, trust, and empathy. With transparency and tech development at our core, we listen to our clients and teams to create an environment where ideas grow, challenges are met head-on, and progress feels purposeful. We believe every problem brings an opportunity to invent, develop, and transform.
                </p>
              </div>

              {/* Leadership Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                {leadershipTeam.map((member, index) => (
                  <TeamMemberCard key={member.name} member={member} index={index} isVisible={leadershipVisible} />
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
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our{" "}
                  <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Architects</span>
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  The tech architects working with us love tackling challenges and turning them into clear, practical solutions. Our team focuses on building strong, scalable, and secure systems that are easy to maintain. Our team works closely with clients and developers to deliver solutions that address today's challenges and prepare for what lies ahead!
                </p>
              </div>

              {/* Architects Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-4xl mx-auto">
                {architects.map((member, index) => (
                  <TeamMemberCard key={member.name} member={member} index={index} isVisible={architectsVisible} />
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
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our{" "}
                  <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">Engineers</span>
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  We are proud to have a team of enthusiastic engineers who are willing to experiment and explore. They are hands-on, curious, and deeply committed to quality. Whether we're discussing data, AI, analytics, or an enterprise platform, the experts bring craftsmanship and new ideas to every build. With experience in Python, SAP IBP, Adobe, Power BI, and data science, our team turns challenges into solutions.
                </p>
              </div>

              {/* Engineers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 max-w-4xl mx-auto">
                {engineers.map((member, index) => (
                  <TeamMemberCard key={member.name} member={member} index={index} isVisible={engineersVisible} />
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 mt-16 transition-all duration-1000 delay-300 ${engineersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
                Want to Join Our Team?
              </h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals who share our passion for technology and innovation.
              </p>
              <Link to="/hire-talent">
                <Button variant="hero" size="lg" className="group">
                  Explore Opportunities
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
