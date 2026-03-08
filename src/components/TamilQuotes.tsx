import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const startDate = new Date("2026", "2", "8");

const quotes = [
  "30 days left… The countdown begins for a person who deserve more than just one day of celebration.Your presence itself feels like a gift.",
  "29 days to go… You remind me that good hearts still exist.",
  "28 days left… I may not say it often, but your presence means more than you know.",
  "27 days to go… My heart is already celebrating.",
  "26 days left… You deserve a life as beautiful as your heart.",
  "25 days to go… The stars know your magic.You deserve someone who values you the way you truly deserve.",
  "24 days left… You make ordinary days feel quietly extraordinary.",
  "23 days to go… If timing is everything, I’m glad ours happened.",
  "22 days left… Every day closer to your birthday feels like a celebration already..",
  "21 days to go… The countdown feels like poetry.",
  "20 days left… I’m grateful you exist. My day feels incomplete without hearing from you.",
  "19 days to go… Time feels different when it’s spent with you.",
  "18 days left… You are not replaceable, not comparable, not ordinary.",
  "17 days to go… The best part of some days is simply knowing you’re in my life.",
  "16 days left… it’s the celebration of someone unforgettable.",
  "15 days to go… Time with you doesn’t feel spent. It feels treasured.",
  "14 days left… Two weeks until magic.",
  "13 days to go… You have a heart that deserves the same care it gives.",
  "12 days left… The best part of certain days is simply talking to you.",
  "11 days to go… You have the kind of heart that deserves to be protected.",
  "10 days left… Sometimes I wonder if you realize how naturally you matter.",
  "9 days to go… Not every connection needs definition to feel real.",
  "8 days left…  Celebrating you who unknowingly means more than you think.",
  "7 days to go… One week to your glow.",
  "6 days left… May you always know you are valued in ways that aren’t always spoken.",
  "5 days to go… You are not just important — you are irreplaceable",
  "4 days left… Some hearts feel familiar from the very first moment. Yours did",
  "3 days to go… Some people are easy to forget. You are not one of them.",
  "2 days left… Almost your moment.",
  "1 day to go… Tomorrow the queen shines.",
  "The wait is over. Today we celebrates you, this isn’t just about candles and wishes. It’s about celebrating the rare soul who makes life better just by existing. May your life always reflect the light you bring into others"
];

export default function DailyQuotes() {
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0)

    const start = new Date(2026, 2, 8);
    start.setHours(0, 0, 0, 0)

    const diffDays = Math.floor(
      (today.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    if (diffDays >= 0 && diffDays < quotes.length) {
      setCurrentQuote(quotes[diffDays]);
    }
  }, []);

  return (
    <motion.div
      className="daily-quote"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>Today's Special Message 💌</h2>
      <p>{currentQuote}</p>
    </motion.div>
  );
}