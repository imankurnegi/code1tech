import { useState, useEffect, useRef } from "react";

type ClientLogo = {
  title?: string;
  image?: string;
};

interface dataClientLogoProps {
  dataClientLogo?: ClientLogo[];
}

const ClientsLogoSlider = ({ dataClientLogo }: dataClientLogoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const apiClients = dataClientLogo || [];

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

  const clients = apiClients.map((item) => ({
    name: item.title || "",
    logo: item.image,
  }));

  // Duplicate for seamless loop
  const allClients = [...clients, ...clients];

  return (
    <div
      ref={sectionRef}
      className={`relative w-[100vw] left-1/2 -translate-x-1/2 py-0 overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >

      {/* Content */}
      <div className="relative z-10">
        {/* Logo Slider Container */}
        <div className="relative">
          {/* Left gradient fade - matches hero background */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-20 pointer-events-none" style={{
            background: 'linear-gradient(to right, hsl(222 47% 8%) 0%, transparent 100%)'
          }} />

          {/* Right gradient fade - matches hero background */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-20 pointer-events-none" style={{
            background: 'linear-gradient(to left, hsl(222 47% 8%) 0%, transparent 100%)'
          }} />

          {/* Scrolling Container */}
          <div
            className="flex items-center relative z-10 py-0"
            style={{
              animation: 'marquee 20s linear infinite'
            }}
          >
            {allClients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8 h-28 md:h-32 lg:h-40 flex items-center justify-center group cursor-pointer"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-28 md:h-32 lg:h-40 w-auto object-contain transition-all duration-300 ease-out brightness-100 opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_hsl(var(--accent)/0.5)]"
                  />
                ) : (
                  <span className="font-bold text-2xl md:text-3xl lg:text-4xl text-foreground/80 whitespace-nowrap transition-all duration-300 ease-out group-hover:text-foreground group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_hsl(var(--accent)/0.4)]">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
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

        @media (max-width: 768px) {
          div[style*="animation: marquee"] {
            animation-duration: 30s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ClientsLogoSlider;
