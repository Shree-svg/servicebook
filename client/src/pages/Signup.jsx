import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, getRoleRedirect } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const userData = await signup(name, email, password, role);
      navigate(getRoleRedirect(userData.role));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 antialiased glass-panel anim-fade-up">
      <div className="w-full max-w-lg">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 gradient-primary/20 rounded-2xl flex items-center justify-center mb-4 border border-primary/30 gradient-glow">
            <span className="material-symbols-outlined text-primary text-4xl">person_add</span>
          </div>
          <h1 className="text-display-sm font-display-sm text-gradient">Join ServiceBook</h1>
          <p className="text-muted text-body-md mt-2 max-w-sm">The all-in-one marketplace for home services and professionals.</p>
        </div>

        {/* Signup Card */}
        <div className="gradient-card border border-outline-variant/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-error/10 border border-error/20 text-error text-label-md p-4 rounded-xl flex items-center gap-3 animate-shake">
                <span className="material-symbols-outlined text-md">error</span>
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                  role === 'customer'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-container-high border-outline-variant text-on-surface-variant hover:border-primary/50'
                }`}
              >
                <span className="material-symbols-outlined">person</span>
                <span className="text-label-md font-bold">I'm a Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('provider')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                  role === 'provider'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-container-high border-outline-variant text-on-surface-variant hover:border-primary/50'
                }`}
              >
                <span className="material-symbols-outlined">engineering</span>
                <span className="text-label-md font-bold">I'm a Provider</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant">Full Name</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl py-4 pl-12 pr-4 text-on-surface outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant">Email Address</label>
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
              <label className="text-label-md text-on-surface-variant">Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl py-4 pl-12 pr-4 text-on-surface outline-none transition-all"
                  placeholder="At least 6 characters"
                  minLength="6"
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
                  Create Account
                  <span className="material-symbols-outlined text-md">how_to_reg</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant text-center">
            <p className="text-on-surface-variant text-body-md">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
