import { RefObject, useEffect, useState } from "react";

export default function HeartBeat({ audioRef }: { audioRef: RefObject<HTMLAudioElement> }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setScale((prev) => (prev === 1 ? 1.2 : 1));
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="heartbeat"
      style={{ transform: `scale(${scale})`, transition: "0.3s ease" }}
    >
      💗
    </div>
  );
}
