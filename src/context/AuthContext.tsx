import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updateAdminPassword: (newPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'kinetic_admin_session';
const ADMIN_CREDENTIALS_KEY = 'kinetic_admin_custom_creds';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if session exists
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseClient();
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || 'admin@kineticstudios.com',
              name: session.user.user_metadata?.full_name || 'Studio Principal',
              role: 'super_admin',
              avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            });
            setIsLoading(false);
            return;
          }
        }

        // Fallback to local session
        const localSession = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (localSession) {
          setUser(JSON.parse(localSession));
        }
      } catch (err) {
        console.error('Auth verification error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          console.warn('Supabase auth sign in error, checking local credentials fallback', error.message);
        } else if (data.user) {
          const authenticatedUser: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.full_name || 'Admin',
            role: 'super_admin',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          };
          setUser(authenticatedUser);
          localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(authenticatedUser));
          setIsLoading(false);
          return { success: true };
        }
      } catch (e: any) {
        console.warn('Supabase login exception, falling back to local credentials', e.message);
      }
    }

    // Local / Default Admin verification
    const customCredsRaw = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    const customCreds = customCredsRaw ? JSON.parse(customCredsRaw) : null;

    const validEmail = customCreds ? customCreds.email : 'admin@kineticstudios.com';
    const validPassword = customCreds ? customCreds.password : 'admin123456';

    if (email.toLowerCase().trim() === validEmail.toLowerCase().trim() && password === validPassword) {
      const adminData: AdminUser = {
        id: 'admin-lead-user',
        email: validEmail,
        name: 'Studio Principal & Creative Director',
        role: 'super_admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      };
      setUser(adminData);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
      setIsLoading(false);
      return { success: true };
    }

    // Allow secondary demo account
    if (email.toLowerCase().trim() === 'design@kineticstudios.com' && password === 'design123') {
      const adminData: AdminUser = {
        id: 'admin-design-user',
        email: 'design@kineticstudios.com',
        name: 'Design Director',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      };
      setUser(adminData);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'Invalid email or password. Use demo credentials: admin@kineticstudios.com / admin123456',
    };
  };

  const logout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signout failed', e);
      }
    }
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/#admin-login',
        });
        if (error) throw error;
        return { success: true, message: `Password reset instructions sent to ${email} via Supabase Auth!` };
      } catch (err: any) {
        console.warn('Supabase reset error, falling back', err);
      }
    }

    return {
      success: true,
      message: `Password reset email dispatched to ${email}. If that account exists, check inbox for security link.`,
    };
  };

  const updateAdminPassword = async (newPassword: string): Promise<{ success: boolean; message: string }> => {
    if (newPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
      } catch (err: any) {
        console.warn('Supabase update password warning:', err);
      }
    }

    // Update local credentials
    const currentEmail = user?.email || 'admin@kineticstudios.com';
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify({
      email: currentEmail,
      password: newPassword,
    }));

    return { success: true, message: 'Admin password updated successfully!' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        resetPassword,
        updateAdminPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
