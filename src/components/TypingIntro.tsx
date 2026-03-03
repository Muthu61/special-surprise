import { useEffect, useState } from "react";

export default function TypingIntro() {
  const message =
    "Hey… there’s something I’ve been meaning to share with you 💛";
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <h1 className="typing-intro">{text}</h1>;
}
