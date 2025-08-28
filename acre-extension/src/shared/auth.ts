// src/shared/auth.ts

const StorageKeys = {
  AccessToken: 'job_tracker_access_token',
  RefreshToken: 'job_tracker_refresh_token',
} as const;

export async function storeTokens(accessToken: string, refreshToken: string) {
  await chrome.storage.local.set({
    [StorageKeys.AccessToken]: accessToken,
    [StorageKeys.RefreshToken]: refreshToken,
  });
}

export async function getCurrentUser(): Promise<{ accessToken: string } | null> {
  const stored = await chrome.storage.local.get([
    StorageKeys.AccessToken,
    StorageKeys.RefreshToken,
  ]);

  if (stored[StorageKeys.AccessToken]) {
    return { accessToken: stored[StorageKeys.AccessToken] };
  }
  return null;
}

export async function clearAuth(): Promise<void> {
  await chrome.storage.local.remove([
    StorageKeys.AccessToken,
    StorageKeys.RefreshToken,
  ]);
}
