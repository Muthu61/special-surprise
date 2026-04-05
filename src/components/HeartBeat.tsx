// src/components/VoiceMemories.tsx

import { useRef, useState } from "react";
import { useContext } from "react";
import { AudioContext } from "../App";


type Memory = {
  text: string;
  file: string;
};

const memories: Memory[] = [
  {
    text: "That random night you sang this… I didn’t expect it 🙂",
    file: "/unfinished.mp3",
  },
  {
    text: "I still remember replaying this more than I should…",
    file: "/neelothi.mp3",
  },
  {
    text: "This one just stayed with me for some reason 💖",
    file: "/kannukulla.mp3",
  },
];

export default function VoiceMemories() {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const audioContext = useContext(AudioContext);
  const audioRef = audioContext?.audioRef;

  const handleToggle = (index: number) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    // Pause all voice audios
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (activeIndex === index) {
      currentAudio.pause();
      setActiveIndex(null);

      // ▶️ Resume background music
      audioRef?.current?.play().catch(() => { });
    } else {
      // ⏸ Pause background music
      audioRef?.current?.pause();

      currentAudio
        .play()
        .then(() => setActiveIndex(index))
        .catch(() => { });
    }
  };

  return (
    <div className="voice-memory-container">
      <h2>Moments You Sang… 💖</h2>

      <p className="voice-intro">
        These are not just songs…
        they’re moments I didn’t want to forget 🙂
      </p>

      <div className="memory-list">
        {memories.map((item, index) => (
          <div
            key={index}
            className={`memory-card ${activeIndex === index ? "active" : ""
              }`}
          >
            <p className="memory-text">{item.text}</p>

            <button onClick={() => handleToggle(index)}>
              {activeIndex === index ? "Pause ⏸️" : "Listen again… 🎧"}
            </button>

            {/* 🎵 Wave Animation */}
            {activeIndex === index && (
              <div className="wave">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={item.file}
              onEnded={() => {
                setActiveIndex(null);
                audioRef?.current?.play().catch(() => { });
              }}
            />
          </div>
        ))}
      </div>

      <p className="voice-ending">
        Maybe these were just small moments for you…
        but for me, they became memories 🙂
      </p>
    </div>
  );
}