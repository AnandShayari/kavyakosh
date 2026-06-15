import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '../components/ui/Input';
import { PrimaryButton } from '../components/ui/Button';
import { Toast } from '../components/ui/Feedback';
import { slideUp } from '../utils/animations';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      });
      setLoading(false);
      setToast({ type: 'success', message: 'Account created! Redirecting to your panel...' });
      setTimeout(() => navigate('/user'), 1000);
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Signup failed. Please try again.' });
      setLoading(false);
    }
  };

  const passwordStrength = password
    ? password.length >= 12
      ? 'strong'
      : password.length >= 8
      ? 'medium'
      : 'weak'
    : '';

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Side - Benefits */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 items-center justify-center px-10 py-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-background"
      >
        <div className="max-w-md">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/60 text-xl font-bold text-background"
          >
            KK
          </motion.div>
          <h1 className="text-4xl font-display text-text leading-tight mb-4">
            Join the Poetry Revolution
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-10">
            Create, share, and discover poetry powered by AI. Connect with artists worldwide.
          </p>
          <div className="space-y-4">
            {[
              { icon: '✨', text: 'AI-powered poetry generation' },
              { icon: '💾', text: 'Save unlimited collections' },
              { icon: '🌐', text: 'Join global poetry community' },
              { icon: '🎨', text: 'Express yourself freely' },
            ].map((item, idx) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm text-muted">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/2 flex items-center justify-center px-6 py-12 lg:py-0"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-display text-text mb-2">Create Account</h2>
            <p className="text-muted">Join KavyaKosh and start your poetic journey</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
            >
              <TextInput
                label="Full Name"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                error={errors.name}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <TextInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                error={errors.email}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              <label className="mb-2 block text-sm font-medium text-text">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-2xl border bg-surface/50 px-4 py-3 text-sm text-text outline-none transition pl-12 ${
                    errors.password ? 'border-error' : 'border-border focus:border-primary'
                  }`}
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-error">{errors.password}</p>}
              
              {/* Password Strength */}
              {password && (
                <div className="mt-2 h-1.5 rounded-full bg-surface overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      passwordStrength === 'strong'
                        ? 'bg-success w-full'
                        : passwordStrength === 'medium'
                        ? 'bg-primary w-2/3'
                        : 'bg-error w-1/3'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                  />
                </div>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <label className="mb-2 block text-sm font-medium text-text">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                  placeholder="••••••••"
                  className={`w-full rounded-2xl border bg-surface/50 px-4 py-3 text-sm text-text outline-none transition pl-12 ${
                    errors.confirmPassword ? 'border-error' : 'border-border focus:border-primary'
                  }`}
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-error">{errors.confirmPassword}</p>
              )}
            </motion.div>

            {/* Terms */}
            <motion.label
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
              className="flex items-start gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 rounded bg-surface border border-border accent-primary"
                required
              />
              <span className="text-xs text-muted leading-relaxed">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </motion.label>

            {/* Submit */}
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
            >
              <PrimaryButton
                type="submit"
                fullWidth
                loading={loading}
                icon={ArrowRight}
              >
                Create Account
              </PrimaryButton>
            </motion.div>
          </form>

          {/* Login Link */}
          <motion.p
            variants={slideUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.7 }}
            className="mt-8 text-center text-sm text-muted"
          >
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-yellow-500 font-semibold transition">
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Signup;
