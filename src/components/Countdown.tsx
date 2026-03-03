import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  fromDate: string;
  unlockDate: string;
  specialMessage?: string;
}

export default function Countdown({
  fromDate,
  unlockDate,
  specialMessage,
}: Props) {

  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState<any>({});

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const parseLocalDate = (dateString: string) => {
      const [year, month, day] = dateString?.split("-").map(Number);
      return new Date(year, month - 1, day); // LOCAL time
    };
    
    const start = parseLocalDate(fromDate).getTime();
    const end = parseLocalDate(unlockDate).getTime();

    const totalDuration = end - start;
    const remaining = end - now;

    if (remaining <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        progress: 100,
      };
    }

    if (now <= start) {
      return {
        days: Math.floor((end - start) / (1000 * 60 * 60 * 24)),
        hours: 0,
        minutes: 0,
        seconds: 0,
        progress: 0,
      };
    }

    const progress = ((now - start) / totalDuration) * 100;

    return {
      days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
      hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((remaining / 1000 / 60) % 60),
      seconds: Math.floor((remaining / 1000) % 60),
      progress: Math.min(progress, 100),
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 👇 Detect completion safely
  useEffect(() => {
    if (timeLeft.progress >= 100 && !isComplete) {
      setIsComplete(true);
    }
  }, [timeLeft.progress, isComplete]);

  const getRomanticMessage = (progress: number) => {
    if (progress < 25)
      return `Counting down to celebrate someone truly special 🌼`;

    if (progress < 50)
      return `Every passing day reminds me how lucky I am to have a friend like you  💞`;

    if (progress < 75)
      return `The universe is preparing something magical ✨`;

    if (progress < 100)
      return `Almost there… a day that deserves all the smiles 💓`;

    return `It’s your day… and the world shines for you, And you deserve every bit of happiness in it 🌟`;
  };

  return (
    <div className="countdown-wrapper">

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="countdown-title"
      >
        {specialMessage}
      </motion.h1>

      <div className="countdown-grid">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div key={unit} className="count-card">
            <span className="count-number">{timeLeft[unit]}</span>
            <span className="count-label">{unit}</span>
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${timeLeft.progress || 0}%` }}
        >
          <div className="progress-heart">
            <svg viewBox="0 0 32 29.6" className="heart-svg">
              <path
                d="M23.6,0c-3.4,0-6.3,2.1-7.6,5.2C14.7,2.1,11.8,0,8.4,0
          C3.8,0,0,3.8,0,8.4c0,9.4,16,21.2,16,21.2s16-11.8,16-21.2
          C32,3.8,28.2,0,23.6,0z"
              />
            </svg>
            {/* 
      💖 */}
            <span className="sparkle s1">✨</span>
            <span className="sparkle s2">✨</span>
            <span className="sparkle s3">✨</span>
          </div>
        </div>
      </div>

      <div className="progress-text">
        {getRomanticMessage(timeLeft.progress || 0)}
      </div>

      {isComplete && (
  <div className="celebration">
    <div className="golden-burst"></div>
    <div className="party-blast">
      {Array.from({ length: 25 }).map((_, i) => (
        <span
          key={i}
          className="party-emoji"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1.5}s`
          }}
        >
          🎉
        </span>
      ))}
    </div>
  </div>
)}
    </div>
  );
}
