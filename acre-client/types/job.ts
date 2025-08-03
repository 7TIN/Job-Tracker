export interface Job {
  id: string;
  company: string;
  title: string;
  appliedDate: string;
  platform: string;
  status: 'Applied' | 'Interviewing' | 'Rejected' | 'Offer';
  notes?: string;
}