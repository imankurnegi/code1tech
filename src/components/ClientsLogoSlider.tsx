import { useState, useEffect, useRef } from "react";

interface dataClientLogoProps {
    dataClientLogo?: {
    client_logo_section ? :{
      clent_logo?: string;
    }[];
  };
}
const ClientsLogoSlider = ({dataClientLogo}: dataClientLogoProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const apiClients = dataClientLogo?.client_logo_section || [];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  // const clients = [{
  //   name: "DELOITTE",
  //   style: "font-bold text-2xl md:text-3xl lg:text-4xl"
  // }, {
  //   name: "NAGARRO",
  //   style: "font-bold text-2xl md:text-3xl lg:text-4xl"
  // }, {
  //   name: "MATELLIO",
  //   style: "font-bold text-2xl md:text-3xl lg:text-4xl"
  // }, {
  //   name: "CLOUDWICK",
  //   style: "font-bold text-2xl md:text-3xl lg:text-4xl"
  // }, {
  //   name: "KPI PARTNERS",
  //   style: "font-bold text-2xl md:text-3xl lg:text-4xl"
  // }, {
  //   name: "ANVIZENT",
  //   style: "font-bold text-2xl md:text-3xl lg:text-4xl"
  // }, {
  //   name: "GIRNARSOFT",
  //   style: "font-bold text-2xl md:text-3xl lg:text-4xl"
  // }];
  const clients = apiClients.map((item) => ({
    name: item.clent_logo || "",
    style: "font-bold text-2xl md:text-3xl lg:text-4xl",
    }));


  // Duplicate for seamless loop
  const allClients = [...clients, ...clients];
  return <div 
    ref={sectionRef}
    className={`relative w-[100vw] left-1/2 -translate-x-1/2 py-8 overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
  >
      {/* Subtle separator lines */}
      <div className="absolute inset-x-0 top-0 h-px z-[2] pointer-events-none" style={{
      background: `linear-gradient(
            90deg,
            transparent 0%,
            hsl(194 68% 63% / 0.15) 20%,
            hsl(194 68% 63% / 0.25) 50%,
            hsl(194 68% 63% / 0.15) 80%,
            transparent 100%
          )`
    }} />
      
      <div className="absolute inset-x-0 bottom-0 h-px z-[2] pointer-events-none" style={{
      background: `linear-gradient(
            90deg,
            transparent 0%,
            hsl(194 68% 63% / 0.1) 20%,
            hsl(194 68% 63% / 0.18) 50%,
            hsl(194 68% 63% / 0.1) 80%,
            transparent 100%
          )`
    }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Logo Slider Container */}
        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          {/* Left gradient fade - matches hero background */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-20 pointer-events-none" style={{
          background: 'linear-gradient(to right, hsl(222 47% 8%) 0%, transparent 100%)'
        }} />
          
          {/* Right gradient fade - matches hero background */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-20 pointer-events-none" style={{
          background: 'linear-gradient(to left, hsl(222 47% 8%) 0%, transparent 100%)'
        }} />

          {/* Scrolling Container */}
          <div className={`flex items-center relative z-10 py-3 ${isPaused ? 'pause-animation' : ''}`} style={{
          animation: 'marquee 20s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}>
            {allClients.map((client, index) => <div key={index} className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16 flex items-center justify-center group cursor-pointer">
                <span className={`
                    text-foreground/80 whitespace-nowrap 
                    transition-all duration-300 ease-out
                    group-hover:text-foreground group-hover:opacity-100
                    group-hover:scale-105
                    group-hover:drop-shadow-[0_0_12px_hsl(var(--accent)/0.4)]
                    ${client.style}
                  `}>
                  {client.name}
                </span>
              </div>)}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .pause-animation {
          animation-play-state: paused !important;
        }

        @media (max-width: 768px) {
          div[style*="animation: marquee"] {
            animation-duration: 30s !important;
          }
        }
      `}</style>
    </div>;
};
export default ClientsLogoSlider;