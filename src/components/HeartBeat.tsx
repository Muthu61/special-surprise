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
    text: "Jan 18 💖",
    file: "/yaarinda1.mp3",
  },
  {
    text: "Jan 20 💖",
    file: "/yaarinda2.mp3",
  },
  {
    text: "Feb 1 💖",
    file: "/kanave1.mp3",
  },
  {
    text: "Feb 1 💖",
    file: "/kanave2.mp3",
  },
  {
    text: "Feb 18 💖",
    file: "/sirukki1.mp3",
  },
  {
    text: "Feb 18 💖",
    file: "/sirukki2.mp3",
  },
  {
    text: "Mar 1 💖",
    file: "/thegidi1.mp3",
  },
  {
    text: "Apr 5 💖",
    file: "/jannal1.mp3",
  }
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
        Just small moments with songs you sang 🙂
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
        Just some songs, some moments, some memories 🙂
      </p>
    </div>
  );
}