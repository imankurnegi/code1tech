import { useEffect, useRef, useState } from "react";

const AIOrbitVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - (rect.top / viewportHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const orbitNodes = [
    { label: "Data", angle: 0, radius: 180, speed: 25 },
    { label: "Agents", angle: 120, radius: 180, speed: 25 },
    { label: "Auto", angle: 240, radius: 180, speed: 25 },
    { label: "ML", angle: 60, radius: 130, speed: 18 },
    { label: "API", angle: 180, radius: 130, speed: 18 },
    { label: "ETL", angle: 300, radius: 130, speed: 18 },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] mx-auto"
      style={{ transform: `scale(${0.9 + scrollProgress * 0.1})` }}
    >
      {/* Radial glow background */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, hsl(var(--accent) / ${0.15 + scrollProgress * 0.1}) 0%, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Outer orbit ring */}
      <div 
        className="absolute inset-[15%] rounded-full border border-accent/20"
        style={{ 
          animation: "spin 40s linear infinite",
          boxShadow: `0 0 30px hsl(var(--accent) / ${0.1 + scrollProgress * 0.1})`
        }}
      />

      {/* Middle orbit ring */}
      <div 
        className="absolute inset-[25%] rounded-full border border-primary/20"
        style={{ 
          animation: "spin 30s linear infinite reverse",
          boxShadow: `0 0 20px hsl(var(--primary) / ${0.1 + scrollProgress * 0.1})`
        }}
      />

      {/* Inner orbit ring */}
      <div 
        className="absolute inset-[35%] rounded-full border border-accent/30"
        style={{ animation: "spin 20s linear infinite" }}
      />

      {/* Center AI Core */}
      <div className="absolute inset-[40%] flex items-center justify-center">
        <div 
          className="relative w-full h-full rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, hsl(var(--primary) / 0.2) 50%, transparent 70%)`,
            animation: "pulse 3s ease-in-out infinite",
          }}
        >
          <div 
            className="w-[60%] h-[60%] rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(var(--accent) / 0.5), hsl(var(--primary) / 0.4))`,
              boxShadow: `0 0 40px hsl(var(--accent) / ${0.4 + scrollProgress * 0.2}), inset 0 0 20px hsl(var(--accent) / 0.3)`,
            }}
          >
            <span className="text-xs lg:text-sm font-bold text-foreground">AI</span>
          </div>
        </div>
      </div>

      {/* Orbiting nodes */}
      {orbitNodes.map((node, index) => (
        <div
          key={node.label}
          className="absolute inset-0"
          style={{
            animation: `spin ${node.speed}s linear infinite ${index % 2 === 0 ? '' : 'reverse'}`,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `rotate(${node.angle}deg) translateY(-${node.radius}px)`,
            }}
          >
            <div 
              className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center text-[10px] lg:text-xs xl:text-sm font-medium text-foreground/90"
              style={{
                background: `linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.3))`,
                boxShadow: `0 0 20px hsl(var(--accent) / ${0.25 + scrollProgress * 0.15})`,
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`,
                transform: `rotate(-${node.angle}deg)`,
              }}
            >
              {node.label}
            </div>
          </div>
        </div>
      ))}

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {orbitNodes.map((node, i) => {
          const angleRad = (node.angle * Math.PI) / 180;
          const endX = 50 + Math.sin(angleRad) * (node.radius / 5);
          const endY = 50 - Math.cos(angleRad) * (node.radius / 5);
          return (
            <g key={`line-${i}`} filter="url(#glow)">
              <line
                x1="50"
                y1="50"
                x2={endX}
                y2={endY}
                stroke="url(#lineGradient)"
                strokeWidth="0.4"
                style={{
                  animation: `pulse ${2 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
              {/* Animated dot traveling along line */}
              <circle
                r="0.8"
                fill="hsl(var(--accent))"
                style={{
                  filter: "drop-shadow(0 0 2px hsl(var(--accent)))",
                }}
              >
                <animateMotion
                  dur={`${1.5 + i * 0.2}s`}
                  repeatCount="indefinite"
                  path={`M50,50 L${endX},${endY}`}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AIOrbitVisual;
