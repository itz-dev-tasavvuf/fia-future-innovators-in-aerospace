
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
      async (event, session) => {
        console.log('🔐 Auth state change event:', event);
        console.log('📝 Session details:', {
          user_id: session?.user?.id,
          email: session?.user?.email,
          user_metadata: session?.user?.user_metadata
        });
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Check profile creation for any auth event with a user
        if (session?.user) {
          console.log('👤 User detected, checking profile creation...');
          
          // Wait a moment for the trigger to potentially complete
          setTimeout(async () => {
            try {
              console.log('🔍 Checking if profile exists for user:', session.user.id);
              
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (error) {
                console.error('❌ Error checking profile:', error);
                if (error.code === 'PGRST116') {
                  console.warn('⚠️ Profile not found - trigger may have failed');
                }
              } else if (profile) {
                console.log('✅ Profile found:', profile);
              } else {
                console.warn('⚠️ Profile query returned null');
              }
            } catch (err) {
              console.error('💥 Unexpected error checking profile:', err);
            }
          }, 1000); // Reduced to 1 second
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🚀 Initial session check:', session?.user?.id || 'No session');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
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

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
