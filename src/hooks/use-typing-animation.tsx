import { useState, useEffect, useCallback } from "react";

interface UseTypingAnimationProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  onFirstComplete?: () => void;
}

export const useTypingAnimation = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
  onFirstComplete,
}: UseTypingAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasCompletedFirst, setHasCompletedFirst] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      setDisplayText(currentPhrase.substring(0, displayText.length - 1));
    } else {
      setDisplayText(currentPhrase.substring(0, displayText.length + 1));
    }
  }, [displayText, isDeleting, phraseIndex, phrases]);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentPhrase) {
      // Finished typing current phrase
      setIsComplete(true);
      
      if (!hasCompletedFirst) {
        setHasCompletedFirst(true);
        onFirstComplete?.();
      }
      
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
      }, pauseDuration);
    } else if (isDeleting && displayText === "") {
      // Finished deleting
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      // Continue typing or deleting
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(tick, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration, tick, hasCompletedFirst, onFirstComplete]);

  return { displayText, isComplete, hasCompletedFirst };
};
