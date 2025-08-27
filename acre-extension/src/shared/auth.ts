import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

const WEB_APP_URL ='https://job-trackerz.vercel.app/*' // Change to your production domain

const StorageKeys = {
  AccessToken: 'job_tracker_access_token',
  RefreshToken: 'job_tracker_refresh_token',
  User: 'job_tracker_user',
} as const;

interface UserSession {
  user: User;
  accessToken: string;
}

export async function initiateAuth(): Promise<void> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${WEB_APP_URL}/auth/callback?from_extension=true`,
    },
  });

  if (error) {
    throw new Error(`Failed to initiate auth: ${error.message}`);
  }

  if (data.url) {
    await chrome.runtime.sendMessage({
      action: 'openAuthTab',
      url: data.url,
    });
  } else {
    throw new Error('No URL returned from Supabase for OAuth.');
  }
}

export async function initiateEmailAuth(): Promise<void> {
  const authUrl = `${WEB_APP_URL}/login?from_extension=true&redirect_to=${encodeURIComponent(
    WEB_APP_URL + '/extension-auth-success'
  )}`;

  await chrome.runtime.sendMessage({
    action: 'openAuthTab',
    url: authUrl,
  });
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const stored = await chrome.storage.local.get([
    StorageKeys.AccessToken,
    StorageKeys.RefreshToken,
  ]);

  const accessToken = stored[StorageKeys.AccessToken];
  const refreshToken = stored[StorageKeys.RefreshToken];

  if (accessToken && refreshToken) {
    try {
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) throw error;

      const user = data.session?.user;
      const newAccessToken = data.session?.access_token;

      if (user && newAccessToken) {
        return { user, accessToken: newAccessToken };
      }
    } catch (error) {
      console.error('Session restore failed:', error);
      await clearAuth();
    }
  }

  return null;
}

export async function clearAuth(): Promise<void> {
  await chrome.storage.local.remove([
    StorageKeys.AccessToken,
    StorageKeys.RefreshToken,
    StorageKeys.User,
  ]);

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out from Supabase:', error);
  }
}
