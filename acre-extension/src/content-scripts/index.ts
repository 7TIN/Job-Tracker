import type { JobPayload } from '../shared/types';

class JobTracker {
  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    const authStatus = await this.checkAuth();
    if (authStatus.authenticated && this.isJobSite()) {
      this.addSaveButton();
    }
  }

  private checkAuth(): Promise<{ authenticated: boolean }> {
    return chrome.runtime.sendMessage({ action: 'checkAuth' });
  }

  private isJobSite(): boolean {
    const jobSites = ['linkedin.com', 'indeed.com', 'glassdoor.com'];
    return jobSites.some(site => window.location.hostname.includes(site));
  }

  private addSaveButton(): void {
    const existingButton = document.querySelector('.job-tracker-save-btn');
    if (existingButton) existingButton.remove();

    const button = document.createElement('button');
    button.innerHTML = '💼 Save to Job Tracker';
    button.className = 'job-tracker-save-btn';
    // Add your button styles here...
    
    button.onclick = () => this.saveJob(button);
    document.body.appendChild(button);
  }

  private async saveJob(button: HTMLButtonElement): Promise<void> {
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Saving...';
    button.disabled = true;

    try {
      const jobData = this.extractJobData();
      
      const response = await chrome.runtime.sendMessage({
        action: 'createJob',
        jobData: jobData,
      });

      if (!response.success) {
        throw new Error(response.error);
      }

      this.showNotification('✅ Job saved successfully!', 'success');
      button.innerHTML = '✅ Saved!';

      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
      }, 2000);
    } catch (error) {
      this.showNotification(`❌ ${(error as Error).message}`, 'error');
      button.innerHTML = originalText;
      button.disabled = false;
    }
  }

  private extractJobData(): JobPayload {
    const hostname = window.location.hostname;
    if (hostname.includes('linkedin.com')) return this.extractLinkedInJob();
    // Add other site extractors...
    return this.extractGenericJob();
  }

  // Example extractor, typed to return JobPayload
  private extractLinkedInJob(): JobPayload {
    return {
      company: document.querySelector<HTMLElement>('.job-details-jobs-unified-top-card__company-name a')?.textContent?.trim() ?? '',
      position: document.querySelector<HTMLHeadingElement>('h1')?.textContent?.trim() ?? '',
      location: document.querySelector<HTMLElement>('.job-details-jobs-unified-top-card__bullet')?.textContent?.trim() ?? '',
      applicationLink: window.location.href,
      platform: 'LinkedIn',
      appliedDate: new Date().toISOString()
    };
  }

  private extractGenericJob(): JobPayload {
    // ... your generic extractor logic
    return {
      company: 'Unknown',
      position: document.title,
      applicationLink: window.location.href,
      platform: window.location.hostname,
      appliedDate: new Date().toISOString(),
    };
  }
  
  private showNotification(message: string, type: 'success' | 'error'): void {
    // ... your notification logic
  }
}

new JobTracker();