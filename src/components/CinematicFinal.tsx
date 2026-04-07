
// src/components/CinematicFinal.tsx

import { useEffect, useState } from "react";
import Typewriter from "./TypeWriter";
import "./CinematicFinal.css";

type Props = {
  onClose?: () => void;
};

export default function CinematicFinal({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Start animation
  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 800);
    return () => clearTimeout(timer);
  }, []);

  // Final fade out
  useEffect(() => {
    if (step === 11) {
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);

        const closeTimer = setTimeout(() => {
          onClose?.();
        }, 2000);

        return () => clearTimeout(closeTimer);
      }, 3000);

      return () => clearTimeout(fadeTimer);
    }
  }, [step, onClose]);

  return (
    <div className={`cinematic-container ${fadeOut ? "fade-out" : ""}`}>

      {step === 1 && (
        <h1
          className="cinematic-name"
          onAnimationEnd={() => setTimeout(() => setStep(2), 800)}
        >
          Hey Pavi
        </h1>
      )}

      {step === 2 && (
        <Typewriter
          text="You deserve happiness in ways big and small, every single day.…"
          onDone={() => setTimeout(() => setStep(3), 1200)}
        />
      )}

      {step === 3 && (
        <Typewriter
          text="May you find more reasons to feel proud of yourself. 🙂"
          onDone={() => setTimeout(() => setStep(4), 1500)}
        />
      )}

      {step === 4 && (
        <Typewriter
          text="Thank you for being real, kind, and always yourself."
          onDone={() => setTimeout(() => setStep(5), 1500)}
        />
      )}

      {step === 5 && (
        <Typewriter
          text="You deserve all the good things that are coming your way."
          onDone={() => setTimeout(() => setStep(6), 1200)}
        />
      )}

      {step === 6 && (
        <Typewriter
          text="Hope today brings you lots of happiness and a little extra luck too. 💖"
          speed={35} 
          onDone={() => setTimeout(() => setStep(7), 2000)}
        />
      )}

      {step === 7 && (
        <Typewriter
          text="May things work out in your favor in the best way possible. 🙂"
          onDone={() => setTimeout(() => setStep(8), 2000)}
        />
      )}

      {step === 8 && (
        <Typewriter
          text="Have a beautiful day,an even better year ahead and take care always! ✨"
          onDone={() => setTimeout(() => setStep(9), 1500)}
        />
      )}

      {step === 9 && (
        <Typewriter
          text="I hope this year brings you confidence, peace, and happiness. 🙂"
          onDone={() => setTimeout(() => setStep(10), 1500)}
        />
      )}

      {step === 10 && (
        <Typewriter
          text="Happy Birthday ✨"
          onDone={() => setTimeout(() => setStep(11), 1500)}
        />
      )}

      {/* 💖 Final Heart */}
      {step === 11 && <div className="cinematic-heart">💖</div>}

    </div>
  );
}

