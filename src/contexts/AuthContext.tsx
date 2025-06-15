import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithGitHub: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔐 Auth state change event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // The new database trigger `on_auth_user_created` now handles profile creation
        // automatically and reliably when a new user signs up.
        // We no longer need to call an RPC function from the client.
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🚀 Initial session check:', session?.user?.id || 'No session');
      // The onAuthStateChange listener will fire if a session exists,
      // handling state changes. If not, we just stop loading.
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata: any) => {
    console.log('📝 SignUp initiated with metadata:', metadata);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    
    console.log('📊 SignUp response:', {
      user_id: data.user?.id,
      error: error?.message,
      user_metadata: data.user?.user_metadata
    });
    
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
    return { data, error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGitHub,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
