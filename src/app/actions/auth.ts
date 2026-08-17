'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const NETWORK_ERROR_MSG = 'Unable to connect to the authentication server. Please check your Supabase configuration and try again.';

function formatAuthError(err: unknown): string {
  if (err instanceof Error) {
    const msg = err.message.toLowerCase();
    if (
      msg.includes('fetch failed') ||
      msg.includes('enotfound') ||
      msg.includes('econnrefused') ||
      msg.includes('failed to fetch') ||
      msg.includes('networkerror')
    ) {
      return NETWORK_ERROR_MSG;
    }
    return err.message;
  }
  return NETWORK_ERROR_MSG;
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email || email,
        display_name: data.user.user_metadata?.display_name || email.split('@')[0],
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error('[Supabase Diagnostic] signInWithEmail:ensureProfile:', {
          operation: 'signInWithEmail:ensureProfile',
          code: profileError.code,
          message: profileError.message,
          details: profileError.details || null,
          hint: profileError.hint || null,
          userExists: true,
        });
      }
    }

    revalidatePath('/', 'layout');
  } catch (err: unknown) {
    return { error: formatAuthError(err) };
  }

  redirect('/dashboard');
}

export async function signUpWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const displayName = formData.get('displayName') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long.' };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName || email.split('@')[0],
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email || email,
        display_name: displayName || email.split('@')[0],
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error('[Supabase Diagnostic] signUpWithEmail:ensureProfile:', {
          operation: 'signUpWithEmail:ensureProfile',
          code: profileError.code,
          message: profileError.message,
          details: profileError.details || null,
          hint: profileError.hint || null,
          userExists: true,
        });
      }
    }

    revalidatePath('/', 'layout');
  } catch (err: unknown) {
    return { error: formatAuthError(err) };
  }

  redirect('/dashboard');
}

export async function signOutUser() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
  } catch {
    // Ignore network error on signout
  }

  redirect('/');
}

export async function getUserSession() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch {
    return null;
  }
}

