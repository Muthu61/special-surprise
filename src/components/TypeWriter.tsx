// src/components/Typewriter.tsx

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;      // typing speed (ms per letter)
  delay?: number;      // optional delay before typing starts
  onDone?: () => void; // callback when typing finishes
};

export default function Typewriter({
  text,
  speed = 40,
  delay = 0,
  onDone,
}: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    let interval: NodeJS.Timeout;

    const startTyping = () => {
      interval = setInterval(() => {
        index++;

        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    };

    const delayTimer = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <p className="type-text">
      {displayed}
    </p>
  );
}