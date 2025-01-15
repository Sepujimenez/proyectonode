"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from '@supabase/supabase-js';

interface AuthReturn {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: { name: string }) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

export function useAuth(): AuthReturn {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    router.refresh();
    router.push("/dashboard");
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    router.refresh();
    router.push("/login?message=Revisa tu email para confirmar tu cuenta");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  const updateProfile = async (data: { name: string }) => {
    const { error } = await supabase
      .from('profiles')
      .update({ name: data.name })
      .eq('id', user?.id);
    if (error) throw error;
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updatePassword,
  };
}
