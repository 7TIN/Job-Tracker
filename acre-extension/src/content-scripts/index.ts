// import type { JobPayload } from "../shared/types";
import dayjs from 'dayjs';

class JobTracker {
  private accessToken: string | null = null;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    const accessTokenKey = 'job_tracker_access_token';
    // Get token from extension storage
    const storedData = await chrome.storage.local.get(accessTokenKey);
    this.accessToken = storedData[accessTokenKey] || null;


    this.addSaveButton();

    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes[accessTokenKey]) {
        this.accessToken = changes[accessTokenKey].newValue || null;
      }
    });
  }

 
  private addSaveButton(): void {
    const existingButton = document.querySelector('.job-tracker-save-btn');
    if (existingButton) existingButton.remove();

    const button = document.createElement('button');
    button.innerHTML = '💼 Save to Job Tracker';
    button.className = 'job-tracker-save-btn';
    button.style.cssText = `
      padding: 8px 12px;
      background: #0073b1;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin: 8px 0;
      z-index: 99999;
    `;
    button.onclick = () => this.saveJob(button);

    let container: Element | null = null;

    const hostname = window.location.hostname;
    if (hostname.includes('linkedin.com')) {
      container = document.querySelector('.job-details-jobs-unified-top-card__content') 
        || document.querySelector('.jobs-details-top-card');
    } else if (hostname.includes('indeed.com')) {
      container = document.querySelector('.jobsearch-JobInfoHeader-title-container');
    } else if (hostname.includes('glassdoor.com')) {
      container = document.querySelector('.JobDetails_jobDetailsHeader__iKixd');
    }

    if (container) {
      container.appendChild(button);
    } else {
      console.log('Job Tracker: Could not find a specific container. Using fallback floating button.');
      button.style.position = 'fixed';
      button.style.bottom = '20px';
      button.style.right = '20px';
      document.body.appendChild(button);
    }
  }


  // private async saveJob(button: HTMLButtonElement): Promise<void> {
  //   if (!this.accessToken) {
  //     this.showNotification('❌ Please connect the extension first', 'error');
  //     return;
  //   }

  //   const originalText = button.innerHTML;
  //   button.innerHTML = '⏳ Saving...';
  //   button.disabled = true;

  //   try {
  //     const jobData = this.extractJobData();

  //     const response = await chrome.runtime.sendMessage({
  //       action: 'createJob',
  //       jobData,
  //       access_token: this.accessToken
  //     });

  //     if (!response.success) {
  //       throw new Error(response.error || 'An unknown error occurred.');
  //     }

  //     this.showNotification('✅ Job saved successfully!', 'success');
  //     button.innerHTML = '✅ Saved!';

  //     setTimeout(() => {
  //       button.innerHTML = originalText;
  //       button.disabled = false;
  //     }, 2000);
  //   } catch (error) {
  //     this.showNotification(`❌ ${(error as Error).message}`, 'error');
  //     button.innerHTML = originalText;
  //     button.disabled = false;
  //   }
  // }

  private async saveJob(button: HTMLButtonElement): Promise<void> {
  if (!this.accessToken) {
    this.showNotification('❌ Please connect the extension first', 'error');
    return;
  }

  const originalText = button.innerHTML;
  button.innerHTML = '⏳ Saving...';
  button.disabled = true;

  try {
    // const jobData = {
    //   company: "OpenAI",
    //   position: "Software Engineer",
    //   link: window.location.href,
    //   appliedDate: dayjs().format('YYYY-MM-DD'),
    // };

    const jobData = {
    company: "Microsoft",
    position: "Software Engineer II",
    link: "https://careers.microsoft.com/us/en/job/12345",
    status: "Assessment",
    appliedDate: dayjs().format('YYYY-MM-DD'),
    location: "Hyderabad, India",
    platform: "Company Website",
    salary: "$60,000 - $70,000",
    notes: "Completed first technical round"
  };

    const response = await chrome.runtime.sendMessage({
      action: 'createJob',
      jobData,
      access_token: this.accessToken,
    });

    // console.log('Date:', jobData.appliedDate);


    if (!response.success) {
      throw new Error(response.error || 'An unknown error occurred.');
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
  // private extractJobData(): JobPayload {
  //   const hostname = window.location.hostname;
  //   if (hostname.includes('linkedin.com')) return this.extractLinkedInJob();
  //   return this.extractGenericJob();
  // }

  // private extractLinkedInJob(): JobPayload {
  //   const companyEl = document.querySelector<HTMLElement>('.job-details-jobs-unified-top-card__company-name a') || document.querySelector<HTMLElement>('.jobs-top-card__company-url');
  //   const positionEl = document.querySelector<HTMLHeadingElement>('h1.jobs-unified-top-card__job-title') || document.querySelector<HTMLHeadingElement>('.jobs-top-card__job-title');
  //   const locationEl = document.querySelector<HTMLElement>('.job-details-jobs-unified-top-card__bullet') || document.querySelector<HTMLElement>('.jobs-top-card__bullet');

  //   return {
  //     company: companyEl?.textContent?.trim() ?? 'Unknown Company',
  //     position: positionEl?.textContent?.trim() ?? document.title,
  //     location: locationEl?.textContent?.trim() ?? '',
  //     applicationLink: window.location.href,
  //     platform: 'LinkedIn',
  //     appliedDate: new Date().toISOString()
  //   };
  // }

  // private extractGenericJob(): JobPayload {
  //   return {
  //     company: 'Unknown',
  //     position: document.title.replace(/ - [^-]+$/, '').trim(),
  //     applicationLink: window.location.href,
  //     platform: window.location.hostname.replace('www.', ''),
  //     appliedDate: new Date().toISOString(),
  //   };
  // }
  
  private showNotification(message: string, type: 'success' | 'error'): void {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed; top: 80px; right: 20px; z-index: 10000;
      background: ${type === 'success' ? '#28a745' : '#dc3545'};
      color: white; padding: 12px 16px; border-radius: 6px;
      font-size: 14px; font-weight: 600;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      transform: translateX(120%);
      transition: transform 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

new JobTracker();

