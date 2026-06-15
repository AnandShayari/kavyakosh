import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function PoetryCard({ id, title, excerpt, author, mood }) {
  const navigate = useNavigate();

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="glass-card group relative overflow-hidden rounded-3xl p-6 shadow-xl"
    >
      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
        {mood}
      </span>
      <h3 className="mt-5 text-xl font-semibold text-text">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{excerpt}</p>
      <div className="mt-6 flex items-center justify-between text-sm text-muted">
        <p>{author}</p>
        <button
          onClick={() => id ? navigate(`/poems/${id}`) : navigate('/explore')}
          className="rounded-full border border-border px-3 py-1 hover:border-primary hover:text-primary transition"
        >
          Read
        </button>
      </div>
      <div className="pointer-events-none absolute -right-8 top-1/2 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
    </motion.article>
  );
}

export default PoetryCard;
