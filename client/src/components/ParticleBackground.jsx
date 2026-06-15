import { motion } from 'framer-motion';

const particles = Array.from({ length: 8 }, (_, index) => index + 1);

function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((id) => (
        <motion.div
          key={id}
          className="absolute rounded-full bg-primary/20 blur-3xl"
          style={{ width: 180, height: 180 }}
          animate={{ x: [0, 80, 0], y: [0, -80, 0], opacity: [0.6, 0.25, 0.6] }}
          transition={{ repeat: Infinity, duration: 18 + id, ease: 'easeInOut', delay: id * 0.6 }}
        />
      ))}
    </div>
  );
}

export default ParticleBackground;
