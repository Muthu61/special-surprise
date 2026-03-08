import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./style.css";

import TypingIntro from "./components/TypingIntro";
import MusicToggle from "./components/MusicToggle";
import FloatingHearts from "./components/FloatingHearts";
import ParticlesBackground from "./components/ParticlesBackground";
import Countdown from "./components/Countdown";
import ChatMemories from "./components/ChatMemories";
import TamilQuotes from "./components/TamilQuotes";
import PasswordPage from "./components/PasswordPage";
import MemoryTimeline from "./components/MemoryTimeline";
import HeartBeat from "./components/HeartBeat";
import DailyQuotes from "./components/TamilQuotes";

export default function App() {
  const [dark, setDark] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [showContent, setShowContent] = useState(false); // <-- controls content visibility

  const songs = [
    "/saga.mp3",
    "/oorumblood.mp3",
    "/kannukula.mp3",
    "/neelothi.mp3",
    "/jaalakaari.mp3",
  ];
  const birthdaySong = "/malareninne.mp3";
  const birthdayDate = new Date("2026-04-08T00:00:00");

  const [currentSong, setCurrentSong] = useState("");

  // Select song based on birthday or 5-day rotation
  useEffect(() => {
    const now = new Date();

    if (
      now.getDate() === birthdayDate.getDate() &&
      now.getMonth() === birthdayDate.getMonth()
    ) {
      setCurrentSong(birthdaySong);
    } else {
      const startDate = new Date("2026-03-08T00:00:00");
      const diffTime = now.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const index = Math.floor(diffDays / 5) % songs.length;
      console.log(songs[index])
      setCurrentSong(songs[index]);
    }
  }, []);

  // Try autoplay, if blocked show overlay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const tryPlay = async () => {
      try {
        await audio.play();
        setShowContent(true); // autoplay allowed → show content immediately
      } catch {
        setAutoplayBlocked(true); // autoplay blocked → show overlay
      }
    };

    tryPlay();
  }, [currentSong]);

  const handleOverlayClick = () => {
    audioRef.current?.play();
    setAutoplayBlocked(false);
    setShowContent(true); // show main content after tap
  };

  return (
    <>
      <div className={dark ? "dark" : "light"}>

        {/* Background */}

        {showContent && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100vh",
              zIndex: -1,
              background: dark
                ? "linear-gradient(135deg,#041f13,#0f3d2e,#1b5e20)"
                : "linear-gradient(135deg,#ffd6ec,#e0ffe8)",
            }}
          />
        )}
        {showContent && (
          <>
            <ParticlesBackground />
            <FloatingHearts />
          </>
        )}
        {/* Audio */}
        <audio ref={audioRef} src={currentSong} loop />
        {showContent && (
          <>
            {/* Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "20px",
                gap: "8px",
              }}
            >
              <button className="btn" onClick={() => setDark(!dark)}>
                Princess Switch
              </button>
              <MusicToggle audioRef={audioRef} />
            </div>
          </>
        )}


        {/* Overlay for autoplay block */}
        {autoplayBlocked && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "radial-gradient(circle, rgba(255,182,193,0.6) 0%, rgba(75,0,130,0.85) 100%)",
              backdropFilter: "blur(10px)",
              color: "#fff0f5",
              fontSize: "28px",
              fontFamily: "'Cursive', 'Arial', sans-serif",
              zIndex: 9999,
              textAlign: "center",
              padding: "30px",
              cursor: "pointer",
              flexDirection: "column",
              animation: "fadeInOverlay 1.2s ease-out",
            }}
            onClick={handleOverlayClick}
          >
            <span style={{ fontSize: "3rem", marginBottom: "12px" }}>✨💖✨</span>
            <span style={{ fontSize: "2rem" }}>Unlock Your Magical Surprise 🎁</span>
            <span
              style={{
                marginTop: "15px",
                fontSize: "2rem",
                animation: "bounceArrow 1s infinite",
              }}
            >
              🌟⬇️🌟
            </span>
            <span style={{ fontSize: "1.2rem", marginTop: "10px", opacity: 0.8 }}>
              Just a tap… let the magic begin ✨
            </span>
          </div>
        )}

        {/* Main content */}
        {showContent && (
          <>
            <TypingIntro />

            {!unlocked && (
              <>
                <Countdown
                  unlockDate="2026-04-08"
                  fromDate="2026-03-08"
                  onUnlock={() => {
                    setUnlocked(true);
                    confetti({ particleCount: 150, spread: 100 });
                    audioRef.current?.play();
                  }}
                  specialMessage="Counting down to your magical day 💗"
                />
                <DailyQuotes />
              </>
            )}

            {unlocked && (
              <>
                {/* <BirthdayReveal name="Her Name" /> */}
                <HeartBeat audioRef={audioRef} />
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                  <ChatMemories />
                  <TamilQuotes />
                  <MemoryTimeline />
                </motion.div>
                <PasswordPage />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}