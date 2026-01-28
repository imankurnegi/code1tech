import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";

interface VideoDetails {
  video_text?: string;
  video_image?: boolean | string;
  video_url?: string;
}
interface trustedSectionProps {
  dataTrusted?: {
    main_heading?:string;
      left_video_section?:{
        first_video_details?:VideoDetails;
        second_video_details?: VideoDetails;
        third_video_details?: VideoDetails;
        fourth_video_details?: VideoDetails;
      };
       right_side_heading?: string;
       right_side_paragraph?: string; // HTML string
       cta_text?: string;
       cta_url?: string;
  };
}
const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 50;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(194, 68%, 63%, ${particle.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};
  // Convert API response into an array

// Video thumbnails data
const EnterpriseTechSection = ({dataTrusted}: trustedSectionProps) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const parallaxOffset = useParallax(0.1);

  // Build video list from API with safe fallbacks for SSG/SSR
  const videoFullData = dataTrusted?.left_video_section
    ? Object.values(dataTrusted.left_video_section).map((video, index) => ({
        id: index + 1,
        label: video.video_text,
        video: video.video_url,
        // image: video.video_image, // optional
      }))
    : [];

  // Fallback demo videos if API data is missing so SSG won't crash
  const videoData = videoFullData.length > 0
    ? videoFullData
    : [
        {
          id: 1,
          label: "AI Solutions",
          video: "/videos/ai-solutions.mp4",
        },
        {
          id: 2,
          label: "Data Engineering",
          video: "/videos/data-engineering.mp4",
        },
        {
          id: 3,
          label: "Full-Stack Engineering",
          video: "/videos/full-stack-engineering.mp4",
        },
        {
          id: 4,
          label: "Low-Code / No-Code",
          video: "/videos/low-code-no-code.mp4",
        },
      ];
  // Handle thumbnail hover play/pause
  const handleThumbnailHover = (index: number) => {
    setHoveredThumb(index);
    const video = thumbnailRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };
  const handleThumbnailLeave = (index: number) => {
    setHoveredThumb(null);
    const video = thumbnailRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Reset video when switching
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [activeThumb]);
  const currentVideo = videoData[activeThumb] ?? videoData[0];
  return <section ref={sectionRef} className="relative w-full pb-16 md:pb-24 lg:pb-28 overflow-hidden">
      {/* Dark navy to black gradient background */}
      <div className="absolute inset-0" style={{
      background: `linear-gradient(
            180deg,
            hsl(222 47% 5%) 0%,
            hsl(218 50% 7%) 50%,
            hsl(222 47% 5%) 100%
          )`
    }} />
      
      {/* Top fade for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to bottom, hsl(222 47% 5%), transparent)'
    }} />
      
      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
    }} />

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-30">
        <FloatingParticles />
      </div>

      {/* Subtle ambient glow effects with parallax */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-transform duration-100" style={{
      background: "hsla(194, 68%, 50%, 0.06)",
      transform: `translateY(${parallaxOffset * 0.5}px)`
    }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none transition-transform duration-100" style={{
      background: "hsla(205, 100%, 40%, 0.05)",
      transform: `translateY(${parallaxOffset * 0.3}px)`
    }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Main Heading - Full Width */}
        <div className={`text-center mb-8 md:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground max-w-5xl mx-auto px-2 lg:text-4xl">
              {dataTrusted?.main_heading
                // Split the string by <span>...</span> but keep the tags
                .split(/(<span>.*?<\/span>)/g)
                .map((segment, idx) => {
                  const isSpan = segment.startsWith("<span>") && segment.endsWith("</span>");
                  const cleanText = segment.replace("<span>", "").replace("</span>", "");
                  return (
                    <span
                      key={idx}
                      className={isSpan ? "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent" : "text-foreground"}
                    >
                      {cleanText}
                    </span>
                  );
                })}
            </h2>

        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch">
          {/* LEFT COLUMN - Media Showcase */}
          <div className={`transition-all duration-1000 delay-200 flex ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Media Card with Blue Glow */}
            <div className="relative w-full flex flex-col">
              {/* Outer glow effect */}
              <div className="absolute -inset-[2px] rounded-2xl opacity-60" style={{
              background: "linear-gradient(135deg, hsla(194, 68%, 55%, 0.25), transparent 40%, hsla(205, 100%, 45%, 0.2))",
              filter: "blur(1px)"
            }} />
              
              {/* Soft blue ambient glow behind card */}
              <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{
              background: "radial-gradient(ellipse at center, hsla(194, 68%, 50%, 0.12) 0%, transparent 70%)",
              filter: "blur(20px)"
            }} />

              {/* Main Card Container */}
              <div className="relative rounded-2xl overflow-hidden flex-1 flex flex-col" style={{
              background: "hsla(215, 55%, 10%, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid hsla(194, 68%, 50%, 0.15)"
            }}>
                {/* Video Container */}
                <div className="relative flex-1">
                  <video ref={videoRef} key={currentVideo.video} autoPlay muted loop playsInline className="w-full h-full object-cover min-h-[280px] lg:min-h-[340px]">
                    <source src={currentVideo.video} type="video/mp4" />
                  </video>
                  
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(180deg, transparent 60%, hsla(215, 55%, 8%, 0.4) 100%)"
                }} />
                </div>

                {/* Thumbnail Slider */}
                <div className="p-4 md:p-5">
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    {videoData.map((video, index) => <button key={video.id} onClick={() => setActiveThumb(index)} onMouseEnter={() => handleThumbnailHover(index)} onMouseLeave={() => handleThumbnailLeave(index)} className={`
                          relative flex-1 rounded-lg overflow-hidden 
                          transition-all duration-300 ease-out
                          transform-gpu
                          ${activeThumb === index ? "ring-2 ring-accent scale-[1.02]" : "opacity-70 hover:opacity-100 hover:scale-[1.04] hover:-translate-y-1"}
                          group
                        `} style={{
                    boxShadow: activeThumb === index ? "0 0 20px hsla(194, 68%, 50%, 0.35)" : "none"
                  }}>
                        {/* Hover glow effect */}
                        <div className={`
                            absolute -inset-[1px] rounded-lg pointer-events-none
                            transition-opacity duration-300
                            ${activeThumb === index ? "opacity-0" : "opacity-0 group-hover:opacity-100"}
                          `} style={{
                      background: "linear-gradient(135deg, hsla(194, 68%, 55%, 0.4), hsla(205, 100%, 45%, 0.3))",
                      filter: "blur(2px)"
                    }} />
                        
                        {/* Thumbnail Preview */}
                        <div className="aspect-video relative overflow-hidden">
                          <video ref={el => {
                        thumbnailRefs.current[index] = el;
                      }} muted loop playsInline className={`
                              w-full h-full object-cover 
                              transition-transform duration-500 ease-out
                              ${activeThumb !== index && hoveredThumb === index ? "scale-110" : ""}
                            `}>
                            <source src={video.video} type="video/mp4" />
                          </video>
                          
                          {/* Label Overlay with hover effect */}
                          <div className={`
                              absolute inset-0 flex items-end justify-center
                              transition-all duration-300
                              ${activeThumb !== index ? "group-hover:bg-gradient-to-t group-hover:from-accent/20 group-hover:to-transparent" : ""}
                            `} style={{
                        background: "linear-gradient(to top, hsla(215, 55%, 6%, 0.95) 0%, hsla(215, 55%, 6%, 0.6) 50%, transparent 100%)"
                      }}>
                            <span className={`
                                text-[9px] sm:text-[10px] md:text-xs font-medium pb-1.5 sm:pb-2 whitespace-nowrap
                                transition-all duration-300
                                ${activeThumb === index ? "text-accent" : "text-foreground/90 group-hover:text-accent group-hover:translate-y-[-2px]"}
                              `}>
                              {video.label}
                            </span>
                          </div>
                        </div>
                      </button>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Content */}
          <div className={`flex flex-col justify-center space-y-5 sm:space-y-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Subheading in accent blue */}
            <h3 className="text-lg sm:text-xl text-accent font-bold md:text-2xl line-clamp-2 overflow-hidden" style={{
            textAlign: 'left',
            wordSpacing: 'normal',
            letterSpacing: 'normal',
            lineHeight: '1.35'
          }}>
            {dataTrusted?.right_side_heading}
            </h3>

            {/* Content Text - Short readable paragraphs */}
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-[15px] text-foreground/90 leading-relaxed lg:leading-[1.85]">
              <p className="text-justify text-base"  dangerouslySetInnerHTML={{ __html: dataTrusted?.right_side_paragraph || "" }}>
            </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2 md:pt-4">
              <Button size="lg" className="relative group w-full sm:w-auto rounded-full px-6 sm:px-8 py-6 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{
              background: "linear-gradient(135deg, hsl(205 100% 35%), hsl(194 68% 55%))",
              boxShadow: "0 4px 25px hsla(205, 100%, 35%, 0.35)"
            }} onClick={() => window.location.href = dataTrusted?.cta_url}>
                {/* Hover glow effect */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                boxShadow: "0 0 35px hsla(194, 68%, 55%, 0.45), 0 0 70px hsla(194, 68%, 55%, 0.25)"
              }} />
                <span className="relative z-10 text-primary-foreground">
                  {dataTrusted?.cta_text}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default EnterpriseTechSection;