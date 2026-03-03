import { useState } from "react";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const secret = "ammu"; // your special secret

  const check = () => {
    if (password.toLowerCase() === secret.toLowerCase()) setUnlocked(true);
    else alert("Try again 💛");
  };

  return (
    <div className="password-section">
      {unlocked ? (
        <div className="final-message">
          Surprise! 💖 This is our secret page. You are my special one!
        </div>
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter your nickname 💛"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" onClick={check}>Unlock</button>
        </>
      )}
    </div>
  );
}