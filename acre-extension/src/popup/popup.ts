import { initiateAuth, initiateEmailAuth } from '../shared/auth';
import type { ChromeMessage } from '../shared/types';

document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status') as HTMLDivElement;
  const notAuthenticatedEl = document.getElementById('not-authenticated') as HTMLDivElement;
  const authenticatedEl = document.getElementById('authenticated') as HTMLDivElement;
  const loadingEl = document.getElementById('loading') as HTMLDivElement;

  chrome.runtime.sendMessage({ action: 'checkAuth' }, (response) => {
    if (response.authenticated) {
      showAuthenticated();
    } else {
      showNotAuthenticated();
    }
  });

  (document.getElementById('connect-google-btn') as HTMLButtonElement).addEventListener('click', async () => {
    showLoading();
    try {
      await initiateAuth();
    } catch (error) {
      showError(`Failed to initiate Google auth: ${(error as Error).message}`);
    }
  });

  (document.getElementById('connect-email-btn') as HTMLButtonElement).addEventListener('click', async () => {
    showLoading();
    try {
      await initiateEmailAuth();
    } catch (error) {
      showError(`Failed to initiate email auth: ${(error as Error).message}`);
    }
  });
  
  (document.getElementById('disconnect-btn') as HTMLButtonElement).addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'clearAuth' }, () => {
      showNotAuthenticated();
    });
  });

  chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
    if (message.action === 'authSuccess') {
      showAuthenticated();
    }
  });

  function showAuthenticated() {
    statusEl.style.display = 'none';
    notAuthenticatedEl.style.display = 'none';
    authenticatedEl.style.display = 'block';
    loadingEl.style.display = 'none';
  }

  function showNotAuthenticated() {
    statusEl.style.display = 'none';
    notAuthenticatedEl.style.display = 'block';
    authenticatedEl.style.display = 'none';
    loadingEl.style.display = 'none';
  }

  function showLoading() {
    statusEl.style.display = 'none';
    notAuthenticatedEl.style.display = 'none';
    authenticatedEl.style.display = 'none';
    loadingEl.style.display = 'block';
  }

  function showError(message: string) {
    statusEl.textContent = message;
    statusEl.className = 'status error';
    statusEl.style.display = 'block';
    showNotAuthenticated();
  }
});