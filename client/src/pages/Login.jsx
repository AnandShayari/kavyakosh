import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '../components/ui/Input';
import { PrimaryButton } from '../components/ui/Button';
import { Toast } from '../components/ui/Feedback';
import { slideUp } from '../utils/animations';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const userData = await login({ email, password });
      setToast({ type: 'success', message: 'Login successful! Redirecting...' });
      const destination = userData?.role === 'admin' ? '/admin' : '/user';
      setTimeout(() => navigate(destination), 1000);
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 items-center justify-center px-10 py-16"
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
            Welcome Back to KavyaKosh
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8">
            Continue your poetic journey. Login to access your saved verses and create new ones.
          </p>
          <div className="space-y-4">
            {[
              'Generate AI-powered poetry',
              'Save and organize your verses',
              'Connect with the poetry community',
            ].map((feature, idx) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="text-sm text-muted">{feature}</p>
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
            <h2 className="text-3xl font-display text-text mb-2">Login</h2>
            <p className="text-muted">Enter your credentials to continue</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
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
              transition={{ delay: 0.2 }}
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
            </motion.div>

            {/* Remember & Forgot */}
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-surface border border-border accent-primary"
                />
                <span className="text-sm text-muted">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-yellow-500 transition">
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit */}
            <motion.div
              variants={slideUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <PrimaryButton
                type="submit"
                fullWidth
                loading={loading}
                icon={ArrowRight}
              >
                Login
              </PrimaryButton>
            </motion.div>
          </form>

          {/* Signup Link */}
          <motion.p
            variants={slideUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-muted"
          >
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-yellow-500 font-semibold transition">
              Sign up
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

export default Login;
