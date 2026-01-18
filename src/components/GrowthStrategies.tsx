import { useEffect, useRef, useState, useCallback } from "react";
import { Users, Cpu, Network, Cog } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
const GrowthStrategies = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<'left' | 'right' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxOffset = useParallax(0.08);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Delay line animation until cards appear
        setTimeout(() => setLineVisible(true), 800);
      }
    }, {
      threshold: 0.15
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Animated mesh/particle network background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }
    const nodes: Node[] = [];
    const nodeCount = window.innerWidth < 768 ? 50 : 100;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
    let animationId: number;
    const connectionDistance = 160;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.35;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 4);
        gradient.addColorStop(0, `rgba(56, 189, 248, ${node.alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${node.alpha})`;
        ctx.fill();

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  return <section ref={sectionRef} className="relative pb-16 md:pb-24 lg:pb-28 overflow-hidden" id="solutions" style={{
    background: "linear-gradient(180deg, hsl(222 47% 5%) 0%, hsl(222 47% 4%) 50%, hsl(222 47% 5%) 100%)"
  }}>
      {/* Animated Mesh Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />

      {/* Top fade for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)'
    }} />
      
      {/* Bottom fade for seamless transition to EngineeringServices */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to top, hsl(222 47% 5%) 0%, hsl(222 47% 5%) 40%, transparent 100%)'
    }} />

      {/* Radial glow behind heading with parallax */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" style={{
      transform: `translateX(-50%) translateY(${parallaxOffset * 0.4}px)`
    }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`max-w-4xl mx-auto text-center mb-10 md:mb-24 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight px-2 lg:text-4xl">
            Two Growth Strategies.
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              One Mission: Your Success.
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            From outsourcing consultation to AI-driven enterprise solutions.
          </p>
        </div>

        {/* Dual Card Layout */}
        <div className="relative">
          {/* Center Data Flow Line - Desktop */}
          <div className={`hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center justify-center transition-all duration-1000 ${lineVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Main glowing line */}
            <div className="absolute inset-y-4 w-[2px] bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
            
            {/* Animated pulse overlay */}
            <div className={`absolute inset-y-4 w-[4px] -translate-x-[1px] transition-opacity duration-500 ${hoveredCard ? "opacity-100" : "opacity-60"}`} style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(var(--accent) / 0.6) 50%, transparent 100%)",
            filter: "blur(2px)"
          }} />

            {/* Animated dots moving along the line */}
            {[0, 1, 2, 3, 4].map(i => <div key={i} className="absolute w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]" style={{
            animation: `dataFlowUp 4s linear infinite`,
            animationDelay: `${i * 0.8}s`,
            top: "100%"
          }} />)}
            {[0, 1, 2, 3, 4].map(i => <div key={`down-${i}`} className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" style={{
            animation: `dataFlowDown 4s linear infinite`,
            animationDelay: `${i * 0.8 + 0.4}s`,
            top: "0%"
          }} />)}
          </div>

          {/* Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-stretch">
            {/* Left Card - Strategy One */}
            <div className={`transition-all duration-700 ease-out h-full ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`} style={{
            transitionDelay: "300ms"
          }} onMouseEnter={() => setHoveredCard('left')} onMouseLeave={() => setHoveredCard(null)}>
              <div className={`relative h-full flex flex-col p-5 sm:p-8 md:p-10 rounded-2xl border border-border/20 transition-all duration-300 ${hoveredCard === 'left' ? '-translate-y-1.5' : ''}`} style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: hoveredCard === 'left' ? "0 25px 60px -12px rgba(0, 200, 200, 0.25), inset 0 1px 0 0 rgba(255,255,255,0.08)" : "0 8px 32px -8px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255,255,255,0.05)"
            }}>
                {/* Inner glow */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${hoveredCard === 'left' ? 'opacity-100' : 'opacity-0'}`} style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(0, 200, 200, 0.15) 0%, transparent 60%)"
              }} />

                {/* Animated Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00C8C8]/20 to-[#00C8C8]/5 flex items-center justify-center border border-[#00C8C8]/30">
                    <Network className="w-7 h-7 text-[#00C8C8] animate-pulse" style={{
                    animationDuration: "3s"
                  }} />
                  </div>
                  <div className="absolute -inset-2 rounded-2xl bg-[#00C8C8]/10 blur-xl opacity-50 animate-pulse" style={{
                  animationDuration: "4s"
                }} />
                </div>

                {/* Strategy Label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#00C8C8] text-xs font-bold tracking-[0.25em] uppercase">
                    Strategy One
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#00C8C8]/40 to-transparent" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-5 leading-tight">
                  Outsourcing Advisory &<br />
                  <span className="bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">
                    Talent Solutions
                  </span>
                </h3>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-200 flex-1 text-justify">
                  We assist firms in team building, negotiating contracts that save costs, enabling upscaling and downscaling so that you can scale operations rapidly while decreasing overhead and focusing on the core aspects of growing your business.









                </p>

                {/* Decorative elements */}
                <div className="flex items-center gap-2 mt-4 sm:mt-6">
                  <Users className="w-4 h-4 text-[#00C8C8]/60" />
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#00C8C8]/50 animate-pulse" style={{
                    animationDelay: `${i * 0.4}s`
                  }} />)}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Divider */}
            <div className="lg:hidden flex items-center justify-center py-4">
              <div className="relative flex items-center gap-3">
                {[0, 1, 2].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))] animate-pulse" style={{
                animationDelay: `${i * 0.3}s`
              }} />)}
              </div>
            </div>

            {/* Right Card - Strategy Two */}
            <div className={`transition-all duration-700 ease-out h-full ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`} style={{
            transitionDelay: "500ms"
          }} onMouseEnter={() => setHoveredCard('right')} onMouseLeave={() => setHoveredCard(null)}>
              <div className={`relative h-full flex flex-col p-5 sm:p-8 md:p-10 rounded-2xl border border-border/20 transition-all duration-300 ${hoveredCard === 'right' ? '-translate-y-1.5' : ''}`} style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: hoveredCard === 'right' ? "0 25px 60px -12px rgba(56, 189, 248, 0.25), inset 0 1px 0 0 rgba(255,255,255,0.08)" : "0 8px 32px -8px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255,255,255,0.05)"
            }}>
                {/* Inner glow */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${hoveredCard === 'right' ? 'opacity-100' : 'opacity-0'}`} style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.15) 0%, transparent 60%)"
              }} />

                {/* Animated Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/30">
                    <Cpu className="w-7 h-7 text-accent animate-pulse" style={{
                    animationDuration: "3s",
                    animationDelay: "0.5s"
                  }} />
                  </div>
                  <div className="absolute -inset-2 rounded-2xl bg-accent/10 blur-xl opacity-50 animate-pulse" style={{
                  animationDuration: "4s",
                  animationDelay: "0.5s"
                }} />
                </div>

                {/* Strategy Label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">
                    Strategy Two
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-accent/40 to-transparent" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-5 leading-tight">
                  Technology Consulting &<br />
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Implementation
                  </span>
                </h3>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#e1e7ef] flex-1 text-justify">
                  Our specialists design and implement AI and data solutions suited to your 
                  specific industry. We create solutions to modernize workflows, unlock efficiencies, 
                  and deliver tangible success through data-driven digital transformation initiatives,
                  from strategy to execution.
                </p>

                {/* Decorative elements */}
                <div className="flex items-center gap-2 mt-4 sm:mt-6">
                  <Cog className="w-4 h-4 text-accent/60" />
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-pulse" style={{
                    animationDelay: `${i * 0.4}s`
                  }} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom keyframes for data flow animation */}
      <style>{`
        @keyframes dataFlowUp {
          0% {
            top: 100%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 0%;
            opacity: 0;
          }
        }
        @keyframes dataFlowDown {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>;
};
export default GrowthStrategies;