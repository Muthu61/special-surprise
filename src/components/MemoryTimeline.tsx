import { useEffect, useState } from "react";

const steps = [
  "It started with just a normal conversation…",
  "Slowly, we started talking more often.",
  "Some random conversations turned into long ones.",
  "Talking to you feels easy and natural now.",
  "And we somehow ended up being good friends 🙂"
];

export default function CinematicTimeline() {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
 
  useEffect(() => {
    if (currentStep >= steps.length) return;
  
    let charIndex = 0;
  
    const typing = setInterval(() => {
      charIndex++;
  
      setDisplayedText(steps[currentStep].slice(0, charIndex));
  
      if (charIndex === steps[currentStep].length) {
        clearInterval(typing);
  
        setTimeout(() => {
          if (currentStep < steps.length - 1) {
            setDisplayedText("");
            setCurrentStep((prev) => prev + 1);
          }
        }, 1500);
      }
    }, 50);
  
    return () => clearInterval(typing);
  }, [currentStep]);

  return (
    <div className="cinematic-container">
      <h1 className="cinematic-text">
        {currentStep >= steps.length
          ? steps[steps.length - 1]
          : displayedText}
      </h1>
    </div>
  );
}