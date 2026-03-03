import { RefObject, useState } from "react";

interface MusicToggleProps {
  audioRef: RefObject<HTMLAudioElement>;
}

export default function MusicToggle({ audioRef }: MusicToggleProps) {
  const [playing, setPlaying] = useState(true);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <button className="btn" onClick={toggleMusic}>
      {playing ? "💖 Her Soundtrack": "🎵 For Ammu 🤍"}
    </button>
  );
}