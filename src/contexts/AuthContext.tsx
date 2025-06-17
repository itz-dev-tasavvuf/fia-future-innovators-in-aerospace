
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profileLoading: boolean;
  isProfileComplete: boolean;
  setProfileAsComplete: () => void;
  signUp: (email: string, password: string, metadata: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
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
  const [profileLoading, setProfileLoading] = useState(true);
  const [isProfileComplete, setProfileComplete] = useState(false);

  const checkUserProfileCompleteness = async (userId: string) => {
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('location, dream')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking profile completeness:', error);
        setProfileComplete(false);
        return;
      }
      
      if (data && data.location && data.dream) {
        setProfileComplete(true);
      } else {
        setProfileComplete(false);
      }
    } catch (e) {
      console.error('Error in checkUserProfileCompleteness:', e);
      setProfileComplete(false);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          checkUserProfileCompleteness(currentUser.id);
          
          // Handle OAuth redirect - redirect to home after successful auth
          if (event === 'SIGNED_IN' && window.location.hash.includes('access_token')) {
            // Clear the hash and redirect to home
            window.history.replaceState(null, '', window.location.pathname);
            window.location.href = '/home';
          }
        } else {
          setProfileComplete(false);
          setProfileLoading(false);
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setLoading(false);
        setProfileLoading(false);
        setProfileComplete(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setProfileAsComplete = () => {
    setProfileComplete(true);
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/home`
      }
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

  const value = {
    user,
    session,
    loading,
    profileLoading,
    isProfileComplete,
    setProfileAsComplete,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
