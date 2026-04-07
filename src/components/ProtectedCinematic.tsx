// src/components/ProtectedCinematic.tsx

import { useState, useRef } from "react";
import CinematicFinal from "./CinematicFinal";
import "./MagicalPassword.css";

export default function ProtectedCinematic() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [showCinematic, setShowCinematic] = useState(false);
  const [burst, setBurst] = useState(false);
  const [ripple, setRipple] = useState(false);

  const correctPassword = "pavithra";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playKeySound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const handleUnlock = () => {
    if (input.toLowerCase() === correctPassword) {
      setError(false);

      // 💫 trigger ripple + burst
      setRipple(true);
      setBurst(true);

      setTimeout(() => {
        setShowCinematic(true);
        setRipple(false);
      }, 900);

    } else {
      setError(true);
    }
  };

  const letters = input.split("");

  return (
    <>
      {!showCinematic && (
        <div className={`magic-container ${burst ? "burst" : ""}`}>

          {/* 💫 RIPPLE EFFECT */}
          {ripple && <span className="ripple-effect"></span>}

          <h2 className="magic-title">🔐 A Small Secret Awaits…</h2>

          {/* 💖 Letters */}
          <div className="letter-container">
            {letters.map((char, i) => {
              const isCorrect =
                correctPassword[i] &&
                char.toLowerCase() === correctPassword[i];

              return (
                <span
                  key={i}
                  className={`letter ${isCorrect ? "correct" : "wrong"}`}
                >
                    {isCorrect ? "💖" : char ? "💫" : ""}
                </span>
              );
            })}
          </div>

          <input
            type="text"
            placeholder="Type something special…"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
              playKeySound();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUnlock();
            }}
          />

          <button className="unlock-btn" onClick={handleUnlock}>
            Unlock 💖
          </button>

          <p className="hint">
            Hint: It’s who this is all about 🙂
          </p>

          {error && <p className="error">Hmm… try again 🙂</p>}

          <audio ref={audioRef} src="/tick.wav" />

        </div>
      )}

      {showCinematic && (
       <CinematicFinal
       onClose={() => {
         setShowCinematic(false);
         setInput("");       // 💥 clear input
         setBurst(false);    // reset animation
         setError(false);    // reset error
       }}
     />
      )}
    </>
  );
}