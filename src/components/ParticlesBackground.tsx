import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    const createParticle = () => {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDuration = 5 + Math.random() * 5 + "s";
      p.style.background = Math.random() > 0.5 ? "#ff9ecf" : "#7CFFB2";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 10000);
    };
    const interval = setInterval(createParticle, 400);
    return () => clearInterval(interval);
  }, []);
  return null;
}