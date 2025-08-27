import { supabase } from './supabase';
import type {User} from '@supabase/supabase-js';

const WEB_APP_URL = 'http://localhost:3000'; // Change to your production domain

/**
 * Initiates the Google OAuth flow by redirecting the user to the web app.
 */
export async function initiateAuth(): Promise<void> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${WEB_APP_URL}/auth/callback?from_extension=true`
    }
  });

  if (error) {
    throw new Error('Failed to initiate Google auth: ' + error.message);
  }

  if (data.url) {
    await chrome.runtime.sendMessage({ action: 'openAuthTab', url: data.url });
  }
}

/**
 * Initiates the email/password auth flow by redirecting to the web app's login page.
 */
export async function initiateEmailAuth(): Promise<void> {
  const authUrl = `${WEB_APP_URL}/login?from_extension=true`;
  await chrome.runtime.sendMessage({ action: 'openAuthTab', url: authUrl });
}

/**
 * Retrieves the current user session from storage and refreshes it if necessary.
 * @returns The user object and a valid access token, or null if not authenticated.
 */
export async function getCurrentUser(): Promise<{ user: User; accessToken: string } | null> {
  const stored = await chrome.storage.local.get(['job_tracker_access_token', 'job_tracker_refresh_token']);
  const accessToken = stored.job_tracker_access_token;
  const refreshToken = stored.job_tracker_refresh_token;

  if (accessToken && refreshToken) {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      console.error('Session restore failed, clearing auth.', error);
      await clearAuth();
      return null;
    }
    
    if (data.session?.user && data.session?.access_token) {
        return { user: data.session.user, accessToken: data.session.access_token };
    }
  }

  return null;
}

export async function clearAuth(): Promise<void> {
  await chrome.storage.local.remove([
    'job_tracker_access_token',
    'job_tracker_refresh_token',
  ]);
  await supabase.auth.signOut();
}