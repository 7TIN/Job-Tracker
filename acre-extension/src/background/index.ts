import { storeTokens, clearAuth, getCurrentUser } from '../shared/auth';
import type { ChromeMessage } from '../shared/types';

const WEB_APP_URL = 'http://localhost:3000'; // Change to your deployed domain in prod

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    try {
      switch (message.action) {
        case "loginUser":
          // 🔹 Always start login flow at Next.js login page with ?from_extension=true
          await chrome.tabs.create({
            url: `${WEB_APP_URL}/login?from_extension=true`,
          });
          break;

        case "getCurrentUser":
          const session = await getCurrentUser();
          sendResponse({ session });
          break;

        case "logout":
          await clearAuth();
          sendResponse({ success: true });
          break;

        default:
          console.warn("Unknown action in background:", message.action);
      }
    } catch (err) {
      console.error("Error in background handler:", err);
      sendResponse({ error: (err as Error).message });
    }
  })();

  return true; // keep channel open
});

// 🔹 Watch for redirect after successful login
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const url = new URL(tab.url);

      if (url.origin === WEB_APP_URL && url.pathname === '/extension-auth-success') {
        const accessToken = url.searchParams.get('access_token');
        const refreshToken = url.searchParams.get('refresh_token');

        if (accessToken && refreshToken) {
          await storeTokens(accessToken, refreshToken);

          if (tabId) chrome.tabs.remove(tabId);

          // Notify popup that login was successful
          const authSuccessMessage: ChromeMessage = { action: 'authSuccess' };
          chrome.runtime.sendMessage(authSuccessMessage).catch(() => {});
        }
      }
    } catch (err) {
      console.error("Failed to parse auth redirect:", err);
    }
  }
});
