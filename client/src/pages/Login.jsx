import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, getRoleRedirect } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const userData = await login(email, password);
      navigate(getRoleRedirect(userData.role));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setIsSubmitting(true);
    try {
      const userData = await login(demoEmail, demoPassword);
      navigate(getRoleRedirect(userData.role));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 antialiased glass-panel anim-fade-up">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 gradient-primary/20 rounded-2xl flex items-center justify-center mb-4 border border-primary/30 gradient-glow">
            <span className="material-symbols-outlined text-primary text-4xl">home_repair_service</span>
          </div>
          <h1 className="text-display-sm font-display-sm text-gradient">Welcome Back</h1>
          <p className="text-muted text-body-md mt-2">Sign in to your ServiceBook account</p>
        </div>

        {/* Login Card */}
        <div className="gradient-card border border-outline-variant/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-error/10 border border-error/20 text-error text-label-md p-4 rounded-xl flex items-center gap-3 animate-shake">
                <span className="material-symbols-outlined text-md">error</span>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block font-label text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl py-4 pl-12 pr-4 text-on-surface outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block font-label text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Password</label>
                <Link to="/forgot-password" title="Coming Soon" onClick={(e) => e.preventDefault()} className="text-label-md text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl py-4 pl-12 pr-4 text-on-surface outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-primary text-on-primary py-4 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></span>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined text-md">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant text-center">
            <p className="text-on-surface-variant text-body-md">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </div>

        {/* Quick Demo Login Widget */}
        <div className="mt-6 gradient-card border border-outline-variant/30 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-body-md font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              Quick Demo Login
            </h3>
            <span className="bg-primary/10 text-primary text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Dev Tool</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleQuickLogin('customer@example.com', 'password123')}
              className="flex flex-col items-center p-3 rounded-2xl bg-surface-container-high/40 hover:bg-primary/10 border border-outline-variant/30 hover:border-primary/30 transition-all text-center group active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg text-muted group-hover:text-primary mb-1">person</span>
              <span className="text-[11px] font-bold text-on-surface">Customer</span>
              <span className="text-[9px] text-muted-variant mt-0.5">user</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleQuickLogin('john@example.com', 'password123')}
              className="flex flex-col items-center p-3 rounded-2xl bg-surface-container-high/40 hover:bg-secondary/10 border border-outline-variant/30 hover:border-secondary/30 transition-all text-center group active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg text-muted group-hover:text-secondary mb-1">engineering</span>
              <span className="text-[11px] font-bold text-on-surface">Provider</span>
              <span className="text-[9px] text-muted-variant mt-0.5">provider</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleQuickLogin('admin@example.com', 'password123')}
              className="flex flex-col items-center p-3 rounded-2xl bg-surface-container-high/40 hover:bg-tertiary/10 border border-outline-variant/30 hover:border-tertiary/30 transition-all text-center group active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg text-muted group-hover:text-tertiary mb-1">shield_person</span>
              <span className="text-[11px] font-bold text-on-surface">Admin</span>
              <span className="text-[9px] text-muted-variant mt-0.5">admin</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-on-surface-variant/40 text-label-sm mt-8 px-4">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
