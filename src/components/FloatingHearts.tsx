import { RefObject, useEffect } from "react";

interface FloatingHeartsProps {
  audioRef: RefObject<HTMLAudioElement>;
}

export default function FloatingHearts({ audioRef }: FloatingHeartsProps) {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDuration = 2 + Math.random() * 3 + "s";
      heart.textContent = "💖";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    };

    const interval = setInterval(createHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return null;
}