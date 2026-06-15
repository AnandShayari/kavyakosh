import { motion } from 'framer-motion';

const buttonVariants = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

export function PrimaryButton({
  children,
  className = '',
  icon: Icon,
  loading = false,
  onClick,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <motion.button
      {...buttonVariants}
      onClick={onClick}
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-glow transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? <div className="animate-spin">⏳</div> : Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
}

export function SecondaryButton({
  children,
  className = '',
  icon: Icon,
  onClick,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <motion.button
      {...buttonVariants}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/90 px-6 py-3 text-sm text-text transition hover:border-primary hover:text-primary disabled:opacity-50 ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
}

export function GhostButton({
  children,
  className = '',
  icon: Icon,
  onClick,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <motion.button
      {...buttonVariants}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-muted transition hover:text-primary disabled:opacity-50 ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  );
}

export default PrimaryButton;
