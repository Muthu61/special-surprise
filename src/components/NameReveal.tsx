import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface Props {
  name: string;
  onComplete: () => void;
}

export default function CinematicReveal({ name, onComplete }: Props) {

  useEffect(() => {
    // Soft sparkle confetti
    confetti({
      particleCount: 80,
      spread: 120,
      startVelocity: 20,
      gravity: 0.4,
      scalar: 0.8,
      origin: { y: 0.6 }
    });

    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cinematic-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="cinematic-content"
      >
        ✨ Happy Birthday ✨
        <br />
        <span className="birthday-name">{name}</span>
      </motion.div>
    </div>
  );
}

