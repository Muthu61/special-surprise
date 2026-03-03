export default function ChatMemories() {
    const messages = [
      { sender: "You", text: "Remember our first chat? 💛" },
      { sender: "Her", text: "Yes, I remember 😌" },
      { sender: "You", text: "Every moment with you matters." },
    ];
  
    return (
      <div className="chat-memories">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender === "You" ? "mine" : "hers"}`}>
            <span>{m.text}</span>
          </div>
        ))}
      </div>
    );
  }