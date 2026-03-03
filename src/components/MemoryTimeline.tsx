export default function MemoryTimeline() {
    const events = [
      { year: "2025", desc: "We first met online 💛" },
      { year: "2025", desc: "Shared our first memory" },
      { year: "2026", desc: "Growing closer every day" },
    ];
  
    return (
      <div className="memory-timeline">
        {events.map((e, i) => (
          <div key={i} className="timeline-event">
            <div className="year">{e.year}</div>
            <div className="desc">{e.desc}</div>
          </div>
        ))}
      </div>
    );
  }