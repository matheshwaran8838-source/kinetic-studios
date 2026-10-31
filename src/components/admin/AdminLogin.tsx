import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowLeft, ShieldCheck, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Authentication failed.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@kineticstudios.com');
    setPassword('admin123456');
    setErrorMessage('');
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    const res = await resetPassword(forgotEmail);
    setForgotStatus(res);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" />

      {/* Return to Public Site Button */}
      <button
        onClick={onBackToSite}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors p-2 rounded-xl bg-white/5 border border-white/5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Public Website</span>
      </button>

      <div className="w-full max-w-md glass-panel-glow p-8 sm:p-10 rounded-3xl border border-white/10 relative z-10 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] p-0.5 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
            <div className="w-full h-full bg-[#080808] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#8B5CF6]" />
            </div>
          </div>
          <h1 className="text-2xl font-black font-display text-white">
            KINETIC STUDIOS
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-widest">
            AUTHENTICATED ADMIN PORTAL
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@kineticstudios.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotStatus(null);
                  setForgotEmail(email);
                  setShowForgotModal(true);
                }}
                className="text-xs font-mono text-[#8B5CF6] hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-semibold text-sm shadow-xl shadow-[#8B5CF6]/30 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-zinc-500 mb-3 font-mono">DEVELOPER TESTING SHORTCUT:</p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-colors flex items-center justify-center gap-2"
          >
            <span>Auto-Fill Demo Credentials (admin@kineticstudios.com)</span>
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 max-w-md w-full relative">
            <h3 className="text-lg font-bold font-display text-white mb-2">Reset Admin Password</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Enter your registered administrator email to trigger authentication recovery.
            </p>

            {forgotStatus && (
              <div className={`p-4 rounded-xl text-xs mb-4 flex items-start gap-2 ${
                forgotStatus.success ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'
              }`}>
                {forgotStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                <span>{forgotStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="admin@kineticstudios.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8B5CF6] text-white text-xs font-semibold"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
