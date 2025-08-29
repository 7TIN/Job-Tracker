import { storeTokens, clearAuth, getCurrentUser } from '../shared/auth';
import type { ChromeMessage } from '../shared/types';

const WEB_APP_URL = 'http://localhost:3000'; 

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    try {
      switch (message.action) {
        case "loginUser":
          await chrome.tabs.create({ url: `${WEB_APP_URL}/login?from_extension=true` });
          break;

        case "getCurrentUser":
          const session = await getCurrentUser();
          sendResponse({ session });
          break;

        case "logout":
          await clearAuth();
          sendResponse({ success: true });
          break;

        case "createJob":
          const { jobData, access_token } = message;
          if (!access_token) {
            sendResponse({ success: false, error: "No access token provided" });
            return;
          }
          // const body = jobData && Object.keys(jobData).length > 0 ? jobData : {
          //   company: "OpenAI",
          //   position: "AI Engineer",
          //   appliedDate: new Date().toISOString(),
          //   status: "Applied",
          // };
          const response = await fetch(`${WEB_APP_URL}/api/jobs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(jobData),
          });
          // console.log('Date:', jobData.appliedDate);
          // console.log(JSON.stringify(jobData));

          if (!response.ok) throw new Error(await response.text() || "Failed to save job");
          sendResponse({ success: true, data: await response.json() });
          break;

        default:
          console.warn("Unknown action in background:", message.action);
      }
    } catch (err) {
      console.error("Error in background handler:", err);
      sendResponse({ error: (err as Error).message });
    }
  })();
  return true;
});


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

          const authSuccessMessage: ChromeMessage = { action: 'authSuccess' };
          chrome.runtime.sendMessage(authSuccessMessage).catch(() => {});
        }
      }
    } catch (err) {
      console.error("Failed to parse auth redirect:", err);
    }
  }
});
