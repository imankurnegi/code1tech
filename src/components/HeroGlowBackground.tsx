import React  from "react";
import heroBackground from "@/assets/hero-background.jpg";
import { useParallax } from "@/hooks/use-parallax";

interface HeroGlowBackgroundProps {
  backgroundImage?: string;
}

const HeroGlowBackground = React.memo(({ backgroundImage }: HeroGlowBackgroundProps) => {
  console.log(backgroundImage, "iiiiii")
  const parallaxOffset = useParallax(0.3);
  const imageSrc = backgroundImage || heroBackground;
  console.log("imageSrc", imageSrc);
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      {/* Background image with scroll parallax and zoom-in animation */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] animate-[hero-zoom-in_1.5s_ease-out_forwards]"
        style={{ 
          transform: `translateY(${parallaxOffset}px)` 
        }}
      >
        <img
          src={heroBackground}
          alt=""
          className="w-full h-full object-cover blur-[2px]"
        />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/50" />
      
      {/* Animated glow orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] animate-pulse pointer-events-none"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[100px] animate-pulse pointer-events-none"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      
      {/* Additional subtle orb */}
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
});

export default HeroGlowBackground;
