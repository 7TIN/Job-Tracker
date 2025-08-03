import JobGrid from "@/components/jobTable";
import { Job } from "@/types/job";



const sampleJobs: Job[] = [
  {
    id: '1',
    company: 'Google',
    title: 'Frontend Developer',
    appliedDate: '2025-07-30',
    platform: 'LinkedIn',
    status: 'Applied',
    notes: 'Reached out to recruiter',
  },
  {
    id: '2',
    company: 'Amazon',
    title: 'Backend Developer',
    appliedDate: '2025-07-28',
    platform: 'Indeed',
    status: 'Interviewing',
    notes: '',
  },
];


export default function DashboardPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Tracker</h1>
      <JobGrid data={sampleJobs} />
    </main>
  );
}