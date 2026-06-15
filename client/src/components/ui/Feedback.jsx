import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export function Toast({
  message = '',
  type = 'info',
  onClose = () => {},
  duration = 4000,
}) {
  const icons = {
    success: <CheckCircle size={20} className="text-success" />,
    error: <AlertCircle size={20} className="text-error" />,
    info: <Info size={20} className="text-secondary" />,
  };

  const colors = {
    success: 'bg-success/20 border-success/30',
    error: 'bg-error/20 border-error/30',
    info: 'bg-secondary/20 border-secondary/30',
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className={`fixed bottom-6 right-6 glass-card ${colors[type]} rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl z-50`}
    >
      {icons[type]}
      <p className="text-sm text-text">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-muted hover:text-text transition"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

export function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      className={`rounded-full border-2 border-border border-t-primary ${sizes[size]}`}
    />
  );
}

export function EmptyState({
  icon: Icon,
  title = 'No results',
  description = '',
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {Icon && <Icon size={48} className="text-muted mb-4" />}
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      {description && <p className="text-sm text-muted max-w-xs">{description}</p>}
    </div>
  );
}

export function Skeleton({
  className = '',
  count = 1,
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse rounded-lg bg-surface/70 h-4 ${className}`}
        />
      ))}
    </div>
  );
}
