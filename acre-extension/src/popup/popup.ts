import { getCurrentUser, clearAuth } from "../shared/auth";
import type { ChromeMessage } from "../shared/types";

document.addEventListener("DOMContentLoaded", async () => {
  const notAuthenticatedEl = document.getElementById("not-authenticated") as HTMLDivElement;
  const authenticatedEl = document.getElementById("authenticated") as HTMLDivElement;
  const loadingEl = document.getElementById("loading") as HTMLDivElement;

  // On popup open → check user
  const session = await getCurrentUser();
  if (session) {
    showAuthenticated();
  } else {
    showNotAuthenticated();
  }

  // Button: Google login
  (document.getElementById("connect-google-btn") as HTMLButtonElement).addEventListener("click", async () => {
    showLoading();
    chrome.runtime.sendMessage({ action: "loginWithGoogle" });
  });

  // Button: Email login
  (document.getElementById("connect-email-btn") as HTMLButtonElement).addEventListener("click", async () => {
    showLoading();
    chrome.runtime.sendMessage({ action: "loginWithEmail" });
  });

  // Button: Disconnect
  (document.getElementById("disconnect-btn") as HTMLButtonElement).addEventListener("click", async () => {
    await clearAuth();
    showNotAuthenticated();
  });

  // Listen for auth success from background
  chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
    if (message.action === "authSuccess") {
      showAuthenticated();
    }
  });

  // UI state handlers
  function showAuthenticated() {
    notAuthenticatedEl.style.display = "none";
    authenticatedEl.style.display = "block";
    loadingEl.style.display = "none";
  }

  function showNotAuthenticated() {
    notAuthenticatedEl.style.display = "block";
    authenticatedEl.style.display = "none";
    loadingEl.style.display = "none";
  }

  function showLoading() {
    notAuthenticatedEl.style.display = "none";
    authenticatedEl.style.display = "none";
    loadingEl.style.display = "block";
  }
});
