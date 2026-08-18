'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    let mounted = true;

    /*
     * IMPORTANT:
     * Register the auth listener immediately.
     * This prevents the UI from missing the SIGNED_IN event
     * while getSession() is still running.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!mounted) return;

        console.log(
          '[AuthProvider] Auth event:',
          event,
          !!currentSession
        );

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
      }
    );

    /*
     * Get the existing session after the listener
     * has already been registered.
     */
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!mounted) return;

        if (error) {
          console.error(
            '[AuthProvider] getSession error:',
            error
          );

          setSession(null);
          setUser(null);
          setIsLoading(false);
          return;
        }

        setSession(data.session);
        setUser(data.session?.user ?? null);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!mounted) return;

        console.error(
          '[AuthProvider] Session initialization error:',
          error
        );

        setSession(null);
        setUser(null);
        setIsLoading(false);
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error(
          '[AuthProvider] Sign out error:',
          error
        );
      }
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
