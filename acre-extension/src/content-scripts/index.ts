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
    return this.extractGenericJob();
  }

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
    return {
      company: 'Unknown',
      position: document.title,
      applicationLink: window.location.href,
      platform: window.location.hostname,
      appliedDate: new Date().toISOString(),
    };
  }
  
  private showNotification(message: string, type: 'success' | 'error'): void {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed; top: 80px; right: 20px; z-index: 10000;
      background: ${type === 'success' ? '#28a745' : '#dc3545'};
      color: white; padding: 12px 16px; border-radius: 6px;
      font-size: 14px; font-weight: 600;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      animation: job-tracker-slideIn 0.3s ease-out;
    `;
    
    const styleId = 'job-tracker-animation-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          @keyframes job-tracker-slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'job-tracker-slideIn 0.3s ease-out reverse forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

new JobTracker();
