import { clearAuth, getCurrentUser, initiateAuth, initiateEmailAuth } from '../shared/auth';
// import { supabase } from '../shared/supabase';
// import type { ChromeMessage, JobPayload } from '../shared/types';

// const WEB_APP_URL = 'http://localhost:3000';

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    try {
      switch (message.action) {
        case "openAuthTab":
          if (message.url) {
            await chrome.tabs.create({ url: message.url });
          }
          break;

        case "loginWithGoogle":
          await initiateAuth();
          break;

        case "loginWithEmail":
          await initiateEmailAuth();
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
          console.warn("Unknown action received in background:", message.action);
      }
    } catch (err) {
      console.error("Error handling background action:", err);
      sendResponse({ error: (err as Error).message });
    }
  })();

  // Required to allow async `sendResponse`
  return true;
});

// function handleAuthTab(authUrl: string): void {
//   chrome.tabs.onUpdated.removeListener(handleTabUpdate);
//   chrome.tabs.create({ url: authUrl, active: true }, () => {
//     chrome.tabs.onUpdated.addListener(handleTabUpdate);
//   });
// }


// type OnUpdatedCallback = Parameters<typeof chrome.tabs.onUpdated.addListener>[0];

// async function handleTabUpdate(...args: Parameters<OnUpdatedCallback>): Promise<void> {
//   const [_tabId, changeInfo, tab] = args;

//   if (changeInfo.status === 'complete' && tab.url) {
//     const url = new URL(tab.url);

//     if (url.origin === WEB_APP_URL && url.pathname === '/extension-auth-success') {
//       const hash = url.hash.substring(1);
//       const params = new URLSearchParams(hash);

//       const access_token = params.get('access_token');
//       const refresh_token = params.get('refresh_token');

//       if (access_token && refresh_token) {
//         await supabase.auth.setSession({ access_token, refresh_token });

//         if (tab.id) chrome.tabs.remove(tab.id);
//         chrome.tabs.onUpdated.removeListener(handleTabUpdate);

//         console.log('✅ Authentication successful!');

//         const authSuccessMessage: ChromeMessage = {
//           action: 'authSuccess',
//           tokens: { access_token, refresh_token },
//         };
//         chrome.runtime.sendMessage(authSuccessMessage).catch(() => {});
//       }
//     }
//   }
// }



// async function checkAuthStatus(): Promise<{ authenticated: boolean }> {
//   const { data } = await supabase.auth.getSession();
//   return { authenticated: !!data.session };
// }

// async function clearAuthAndNotify(): Promise<void> {
//   await supabase.auth.signOut();
// }

// async function createJobWithAuth(jobData: JobPayload): Promise<any> {
//     const { data: { session }, error } = await supabase.auth.getSession();

//     if (error || !session) {
//         throw new Error('Not authenticated or session expired.');
//     }

//     const response = await fetch(`${WEB_APP_URL}/api/jobs`, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${session.access_token}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(jobData),
//     });

//     if (!response.ok) {
//         if (response.status === 401) {
//             await supabase.auth.signOut();
//             throw new Error('Session expired. Please reconnect.');
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to save job');
//     }

//     return await response.json();
// }