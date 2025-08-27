import type { ChromeMessage } from '../shared/types';

document.addEventListener('DOMContentLoaded', () => {
//   const statusEl = document.getElementById('status') as HTMLDivElement;
  const notAuthenticatedEl = document.getElementById('not-authenticated') as HTMLDivElement;
  const authenticatedEl = document.getElementById('authenticated') as HTMLDivElement;
  const loadingEl = document.getElementById('loading') as HTMLDivElement;

  // Check the authentication status when the popup opens
  chrome.runtime.sendMessage({ action: 'checkAuth' }, (response) => {
    if (response.authenticated) {
      showAuthenticated();
    } else {
      showNotAuthenticated();
    }
  });

  // Event listeners for the buttons
  (document.getElementById('connect-google-btn') as HTMLButtonElement).addEventListener('click', () => {
    showLoading();
    chrome.runtime.sendMessage({ action: 'initiateAuth' });
  });

  (document.getElementById('connect-email-btn') as HTMLButtonElement).addEventListener('click', () => {
    showLoading();
    chrome.runtime.sendMessage({ action: 'initiateEmailAuth' });
  });
  
  (document.getElementById('disconnect-btn') as HTMLButtonElement).addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'clearAuth' }, () => {
      showNotAuthenticated();
    });
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
    if (message.action === 'authSuccess') {
      showAuthenticated();
    }
  });

  // UI state management functions
  function showAuthenticated() {
    notAuthenticatedEl.style.display = 'none';
    authenticatedEl.style.display = 'block';
    loadingEl.style.display = 'none';
  }

  function showNotAuthenticated() {
    notAuthenticatedEl.style.display = 'block';
    authenticatedEl.style.display = 'none';
    loadingEl.style.display = 'none';
  }

  function showLoading() {
    notAuthenticatedEl.style.display = 'none';
    authenticatedEl.style.display = 'none';
    loadingEl.style.display = 'block';
  }
});
