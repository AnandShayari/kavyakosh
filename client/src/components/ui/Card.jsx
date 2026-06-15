import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function Card({
  children,
  className = '',
  hover = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
      className={`glass-card rounded-3xl p-6 transition cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Modal({
  isOpen = false,
  onClose = () => {},
  title = '',
  children,
  size = 'md',
}) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`glass-card ${sizeClasses[size]} rounded-3xl p-8 w-[90vw] shadow-2xl`}
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-display text-text">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted transition hover:bg-surface hover:text-text"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Badge({
  children,
  variant = 'primary',
  className = '',
}) {
  const variants = {
    primary: 'bg-primary/20 text-primary border border-primary/30',
    success: 'bg-success/20 text-success border border-success/30',
    error: 'bg-error/20 text-error border border-error/30',
    secondary: 'bg-secondary/20 text-secondary border border-secondary/30',
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Chip({
  label,
  onRemove,
  selected = false,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRemove}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        selected
          ? 'bg-primary text-background border border-primary'
          : 'bg-surface/70 text-text border border-border hover:border-primary'
      }`}
    >
      {label} ✕
    </motion.button>
  );
}
