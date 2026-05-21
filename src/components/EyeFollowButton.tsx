import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface EyeFollowButtonProps {
  text?: string;
  href?: string;
  eyeCount?: 1 | 2;
  eyeSize?: number;
  pupilSize?: number;
  eyeGap?: number;
  trackingRange?: number;
  blinkInterval?: number;
  className?: string;
}

const Eye = ({
  size,
  pupilSize,
  pupilX,
  pupilY,
  isBlinking,
}: {
  size: number;
  pupilSize: number;
  pupilX: number;
  pupilY: number;
  isBlinking: boolean;
}) => {
  const maxOffset = (size - pupilSize) / 2 - 2;

  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        background: "white",
      }}
    >
      {/* Eyelid (top) — does most of the closing like a real eye */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10"
        style={{ background: "hsl(222 47% 5%)", borderRadius: "0 0 50% 50%" }}
        animate={{ height: isBlinking ? size * 0.55 : 0 }}
        transition={{ duration: isBlinking ? 0.08 : 0.18, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Eyelid (bottom) — barely moves, like a real lower lid */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ background: "hsl(222 47% 5%)", borderRadius: "50% 50% 0 0" }}
        animate={{ height: isBlinking ? size * 0.15 : 0 }}
        transition={{ duration: isBlinking ? 0.08 : 0.18, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Pupil */}
      <motion.div
        className="rounded-full"
        style={{
          width: pupilSize,
          height: pupilSize,
          background: "hsl(222 47% 5%)",
        }}
        animate={{
          x: pupilX * maxOffset,
          y: pupilY * maxOffset,
          opacity: isBlinking ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      />
    </div>
  );
};

const EyeFollowButton = ({
  text = "Get Started",
  href = "/contact",
  eyeCount = 2,
  eyeSize = 32,
  pupilSize = 12,
  eyeGap = 4,
  trackingRange = 90,
  blinkInterval = 3000,
  className = "",
}: EyeFollowButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    setIsSleeping(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsSleeping(true), 3000);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      resetIdleTimer();
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDist = (trackingRange / 100) * Math.max(window.innerWidth, window.innerHeight) * 0.5;

      const clampedDist = Math.min(distance, maxDist);
      const ratio = clampedDist / maxDist;

      if (distance > 0) {
        setPupilPos({
          x: (dx / distance) * ratio,
          y: (dy / distance) * ratio,
        });
      }
    },
    [trackingRange, resetIdleTimer]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    idleTimer.current = setTimeout(() => setIsSleeping(true), 3000);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (isSleeping) return;

    const scheduleBlink = () => {
      const delay = blinkInterval + Math.random() * 2000;
      return setTimeout(() => {
        setIsBlinking(true);
        // Occasional double-blink (~25% chance)
        const isDouble = Math.random() < 0.25;
        setTimeout(() => {
          setIsBlinking(false);
          if (isDouble) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => setIsBlinking(false), 90);
            }, 120);
          }
        }, 100 + Math.random() * 40);
        timer = scheduleBlink();
      }, delay);
    };

    let timer = scheduleBlink();
    return () => clearTimeout(timer);
  }, [blinkInterval, isSleeping]);

  const eyes = Array.from({ length: eyeCount }, (_, i) => (
    <Eye
      key={i}
      size={eyeSize}
      pupilSize={pupilSize}
      pupilX={pupilPos.x}
      pupilY={pupilPos.y}
      isBlinking={isBlinking || isSleeping}
    />
  ));

  const zLetters = ["Z", "z", "z"];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Floating Z-z-z */}
      <AnimatePresence>
        {isSleeping && zLetters.map((z, i) => (
          <motion.span
            key={i}
            className="absolute pointer-events-none font-bold select-none"
            style={{
              right: -4 + i * 7,
              top: -6 - i * 6,
              fontSize: 14 - i * 3,
              color: "hsl(var(--accent))",
              zIndex: 20,
            }}
            initial={{ opacity: 0, y: 4, scale: 0.5 }}
            animate={{
              opacity: [0, 0.9, 0.9, 0],
              y: [4, -6 - i * 4],
              scale: [0.5, 1],
            }}
            exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.2 } }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            {z}
          </motion.span>
        ))}
      </AnimatePresence>
      <Link to={href}>
        <motion.div
          className="inline-flex items-center gap-5 cursor-pointer select-none"
          style={{
            background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))",
            padding: "4px 5px 4px 16px",
            borderRadius: 24,
            boxShadow: "0 3px 10px rgba(0, 194, 255, 0.2)",
          }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 6px 25px rgba(0, 194, 255, 0.35)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="text-sm font-semibold text-primary-foreground whitespace-nowrap">
            {text}
          </span>
          <div className="flex items-center" style={{ gap: eyeGap }}>
            {eyes}
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default EyeFollowButton;
