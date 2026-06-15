import { Link } from 'react-router-dom';
import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-lg rounded-[2rem] border border-border bg-surface/90 p-10 shadow-xl">
        <h1 className="text-3xl font-semibold text-text">Forgot password</h1>
        <p className="mt-3 text-sm text-muted">Enter your email and we will send a reset link to your inbox.</p>
        <form className="mt-8 space-y-6">
          <label className="block text-sm text-muted">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-3 w-full rounded-3xl border border-border bg-background/90 px-5 py-4 text-text outline-none transition focus:border-primary" />
          </label>
          <button className="w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-background transition hover:bg-yellow-500">Send reset link</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Remembered it? <Link to="/login" className="text-primary hover:text-text">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
