import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSupabaseConfig, setSupabaseConfig, testSupabaseConnection } from '../../lib/supabase';
import {
  Settings,
  ShieldCheck,
  KeyRound,
  Users,
  Database,
  Lock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Laptop,
  Globe,
  Trash2,
  RefreshCw,
  Plus
} from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const { user, updateAdminPassword } = useAuth();
  const config = getSupabaseConfig();

  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Supabase Config state
  const [supabaseUrl, setSupabaseUrl] = useState(config.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(config.anonKey);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Authorized Admin Team list state
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Studio Principal & Director', email: 'admin@kineticstudios.com', role: 'Super Admin', status: 'Active' },
    { id: '2', name: 'Design Director', email: 'design@kineticstudios.com', role: 'Admin', status: 'Active' },
  ]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Admin');
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  // Active Sessions state
  const [activeSessions] = useState([
    { id: 'sess-1', device: 'Current Browser Session (Windows / Chrome)', ip: '127.0.0.1 (Localhost)', lastActive: 'Now (Active)', current: true },
    { id: 'sess-2', device: 'Studio Workstation (macOS / Safari)', ip: '198.51.100.4', lastActive: '2 hours ago', current: false },
  ]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ success: false, message: 'Passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordStatus({ success: false, message: 'Password must be at least 6 characters.' });
      return;
    }

    setIsUpdatingPassword(true);
    const result = await updateAdminPassword(newPassword);
    setIsUpdatingPassword(false);
    setPasswordStatus(result);

    if (result.success) {
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSupabaseConfig(supabaseUrl, supabaseAnonKey);
    setTestResult({ success: true, message: 'Supabase credentials saved successfully!' });
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    // ensure saved
    setSupabaseConfig(supabaseUrl, supabaseAnonKey);
    const result = await testSupabaseConnection();
    setIsTesting(false);
    setTestResult(result);
  };

  const handleCopySql = () => {
    const sqlScript = `-- KINETIC STUDIOS PRODUCTION SUPABASE SCHEMA
CREATE TABLE IF NOT EXISTS website_settings (
  id TEXT PRIMARY KEY DEFAULT 'kinetic-settings-default',
  company_name TEXT DEFAULT 'KINETIC STUDIOS' NOT NULL,
  hero_heading TEXT NOT NULL,
  hero_description TEXT NOT NULL,
  bg_color TEXT DEFAULT '#080808' NOT NULL,
  accent_color TEXT DEFAULT '#8B5CF6' NOT NULL
);
-- Refer to supabase-schema.sql in the project root for full table schema & RLS policies!`;

    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminName.trim()) return;

    setTeamMembers(prev => [
      ...prev,
      {
        id: `adm-${Date.now()}`,
        name: newAdminName.trim(),
        email: newAdminEmail.trim(),
        role: newAdminRole,
        status: 'Active',
      },
    ]);
    setNewAdminName('');
    setNewAdminEmail('');
    setShowAddAdminModal(false);
  };

  const handleRemoveMember = (id: string) => {
    if (teamMembers.length <= 1) return;
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            SECURITY & INFRASTRUCTURE
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Admin Settings & Database
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
            Manage admin authentication, credential security, team permissions, and Supabase connection.
          </p>
        </div>
      </div>

      {/* 1. Supabase Database Connection Manager */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-[#8B5CF6]/30 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-white">
                Supabase Database & Storage Engine
              </h2>
              <p className="text-xs text-zinc-400 font-light">
                Connect your live Supabase project. Changes in this dashboard persist automatically.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopySql}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>{copiedSql ? 'Copied SQL!' : 'Copy Schema SQL'}</span>
          </button>
        </div>

        {testResult && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-start gap-3 ${
              testResult.success
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            }`}
          >
            {testResult.success ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
            <div>
              <div className="font-semibold">{testResult.success ? 'Connection Verified' : 'Notice'}</div>
              <div>{testResult.message}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSaveSupabaseConfig} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Supabase Project URL
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={e => setSupabaseUrl(e.target.value)}
              placeholder="https://your-project-id.supabase.co"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Supabase Anon Public API Key (Safe for frontend)
            </label>
            <input
              type="password"
              value={supabaseAnonKey}
              onChange={e => setSupabaseAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#8B5CF6]"
            />
            <p className="text-[11px] text-zinc-500 mt-1.5 font-mono">
              Never expose service-role secret keys. The website uses standard public anon keys governed by Supabase Row Level Security (RLS).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
            <span className="text-xs font-mono text-zinc-400">
              Schema File: <span className="text-white">supabase-schema.sql</span> (in project root)
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono border border-white/10 transition-colors flex items-center gap-1.5"
              >
                {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 transition-all"
              >
                Save DB Credentials
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 2. Change Admin Password */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold font-display text-white border-b border-white/5 pb-4">
          <KeyRound className="w-4 h-4 text-[#8B5CF6]" />
          <span>Change Administrator Password</span>
        </div>

        {passwordStatus && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
              passwordStatus.success
                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}
          >
            {passwordStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 transition-all disabled:opacity-50"
          >
            {isUpdatingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* 3. Authorized Admin Accounts */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2 text-sm font-bold font-display text-white">
            <Users className="w-4 h-4 text-[#8B5CF6]" />
            <span>Authorized Administrator Accounts</span>
          </div>

          <button
            onClick={() => setShowAddAdminModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Add Admin</span>
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {teamMembers.map(member => (
            <div key={member.id} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center font-bold text-[#8B5CF6]">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{member.name}</div>
                  <div className="text-[11px] font-mono text-zinc-500">{member.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/5">
                  {member.role}
                </span>
                {member.email !== user?.email && (
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-zinc-500 hover:text-red-400 p-1"
                    title="Revoke access"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Active Login Sessions */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold font-display text-white border-b border-white/5 pb-4">
          <Laptop className="w-4 h-4 text-[#8B5CF6]" />
          <span>Active Login Sessions</span>
        </div>

        <div className="space-y-3">
          {activeSessions.map(sess => (
            <div
              key={sess.id}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>{sess.device}</span>
                  {sess.current && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      CURRENT
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-mono text-zinc-500 mt-1">
                  IP: {sess.ip} • Last seen: {sess.lastActive}
                </div>
              </div>

              {!sess.current && (
                <button
                  className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 font-mono text-[11px] transition-colors"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 max-w-md w-full">
            <h3 className="text-lg font-bold font-display text-white mb-2">Authorize Administrator</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Grant dashboard management rights to an agency collaborator.
            </p>

            <form onSubmit={handleAddTeamMember} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newAdminName}
                  onChange={e => setNewAdminName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={e => setNewAdminEmail(e.target.value)}
                  placeholder="jordan@kineticstudios.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Role Permission
                </label>
                <select
                  value={newAdminRole}
                  onChange={e => setNewAdminRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121216] border border-white/10 text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
                >
                  <option value="Admin">Admin (Full Editor)</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Editor">Editor (Content Only)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold"
                >
                  Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
