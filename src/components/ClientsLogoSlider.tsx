import { useState, useEffect, useRef, memo } from "react";

type ClientLogo = {
  title?: string;
  image?: string;
};

interface dataClientLogoProps {
  dataClientLogo?: ClientLogo[];
}

const LogoTrack = memo(({clients} : {clients: ClientLogo[]}) => (
  <div className="flex items-center shrink-0 gap-5 md:gap-8 lg:gap-10 px-3 md:px-4 lg:px-5">
    {clients.map((client, index) => (
      <div 
        key={index} 
        className="flex-shrink-0 h-24 md:h-28 lg:h-32 flex items-center justify-center"
      >
        {client.image ? (
          <img 
            src={client.image} 
            alt={client.title}
            className="h-16 md:h-20 lg:h-24 w-auto object-contain opacity-90"
            draggable={false}
            loading="lazy"
          />
        ) : (
          <span className="font-bold text-2xl md:text-3xl lg:text-4xl text-foreground/80 whitespace-nowrap">
            {client.title}
          </span>
        )}
      </div>
    ))}
  </div>
));

LogoTrack.displayName = "LogoTrack";

const ClientsLogoSlider = ({ dataClientLogo }: dataClientLogoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <div 
      ref={sectionRef}
      className={`relative w-[100vw] left-1/2 -translate-x-1/2 py-0 overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="relative z-10">
        <div className="relative">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-20 pointer-events-none" style={{
            background: 'linear-gradient(to right, hsl(222 47% 8%) 0%, transparent 100%)'
          }} />
          
          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-20 pointer-events-none" style={{
            background: 'linear-gradient(to left, hsl(222 47% 8%) 0%, transparent 100%)'
          }} />

          <div className="flex items-center w-max animate-marquee">
            <LogoTrack clients={dataClientLogo} />
            <LogoTrack clients={dataClientLogo} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee-scroll 55s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }
        @media (min-width: 769px) {
          .animate-marquee {
            animation-duration: 45s;
          }
        }
      `}</style>
    </div>
  );
};

export default ClientsLogoSlider;
