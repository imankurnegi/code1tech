import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import HeroGlowBackground from "./HeroGlowBackground";
import ClientsLogoSlider from "./ClientsLogoSlider";
import { addClassToSpan } from "@/lib/utils";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  dataBanner?: {
    banner_main_heading?: string;
    changeable_text?: {
      default_text?: string;
      second_text?: string;
      third_text?: string;
    };
    banner_paragraph?: string;
    banner_background_image?: string;
    button_text?: string;
    button_url?: string;
  };
}

const HeroSection = ({ dataBanner, dataClientLogo }: HeroSectionProps & {dataClientLogo?: any}) => {
  const [showCTA, setShowCTA] = useState(false);
  
  // Extract phrases from data
  const phrases = useMemo(() => {
    if (!dataBanner?.changeable_text) return [];
    const { default_text, second_text, third_text } = dataBanner.changeable_text;
    return [default_text, second_text, third_text].filter(Boolean);
  }, [dataBanner?.changeable_text]);

  const {
    displayText,
    isComplete
  } = useTypingAnimation({
    phrases,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2000,
    onFirstComplete: () => setShowCTA(true)
  });

  const mainHeading = dataBanner?.banner_main_heading ?? "";
  const paragraph = dataBanner?.banner_paragraph ?? "";
  const buttonText = dataBanner?.button_text ?? "";
  const buttonUrl = dataBanner?.button_url ?? "";
  const backgroundImage = dataBanner?.banner_background_image;
  
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24">
      {/* Top fade for seamless navbar blend */}
      <div className="absolute top-0 left-0 right-0 h-32 md:h-40 pointer-events-none z-[2]" style={{
        background: 'linear-gradient(to bottom, hsl(222 47% 5%) 0%, hsl(222 47% 5%) 30%, transparent 100%)'
      }} />
      
      {/* Animated Glow Background */}
      <HeroGlowBackground backgroundImage={backgroundImage} />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main headline - two lines */}


          {/* <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-6 animate-fade-in lg:text-6xl">
            {mainHeading
              // Split by <span>...</span> while keeping the span segments
              .split(/(<span>.*?<\/span>)/g)
              .map((segment, idx) => {
                const isSpan = segment.startsWith("<span>") && segment.endsWith("</span>");
                const cleanText = segment.replace("<span>", "").replace("</span>", "");
                return (
                  <span
                    key={idx}
                    className={
                      isSpan
                        ? "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent"
                        : "text-foreground"
                    }
                  >
                    {cleanText}
                  </span>
                );
              })}
          </h1> */}

          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight mb-6 animate-fade-in lg:text-6xl"
            dangerouslySetInnerHTML={{ __html: addClassToSpan(mainHeading, "bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent") ?? "" }}
          />


          {/* Typing headline */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-6 sm:mb-8 min-h-[1.2em]">
            <span className="font-sans text-5xl bg-gradient-to-r from-[#5FC2E3] to-[#0077B6] bg-clip-text text-transparent">{displayText}</span>
            <span className={`inline-block w-[2px] sm:w-[3px] h-[0.85em] bg-accent ml-1 align-middle transition-opacity duration-100 ${isComplete ? 'opacity-0' : 'animate-pulse'}`} />
          </div>

          {/* Static subheadline with fade-in */}
          <p style={{
          animationDelay: "0.5s",
          animationFillMode: "forwards"
        }} className="text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 opacity-0 animate-fade-in px-2 sm:px-0 text-slate-200 lg:text-xl">
            {paragraph}
          </p>

          {/* CTA Button - appears after first typing completes */}
          <div className={`transition-all duration-700 ease-out px-4 sm:px-0 ${showCTA ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
            <Button variant="hero" size="xl" className="group w-full sm:w-auto text-sm sm:text-base" asChild>
              <Link to={buttonUrl}>
                {buttonText}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>
            </Button>
          </div>

          {/* Client Logo Slider */}
          <div className="mt-12 w-full max-w-4xl mx-auto">
            <ClientsLogoSlider dataClientLogo ={dataClientLogo} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 z-10">
        
      </div>

      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none z-[1]" style={{
      background: 'linear-gradient(to top, hsl(222 47% 5%), transparent)'
    }} />
    </section>;
};
export default HeroSection;