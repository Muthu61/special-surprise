import { motion } from "framer-motion";

const steps = [
    "It started with just a normal conversation…",
    "Slowly, we started talking more often.",
    "Some random conversations turned into long ones.",
    "Talking to you just feels easy and natural now.",
    "And we somehow ended up being good friends."
];

export default function JourneySection() {
    return (
        <div className="journey-container">
            <h2>Our Journey 💫</h2>

            <div className="timeline">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3 }}
                    >
                        <span className="dot" />
                        <p>{step}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}