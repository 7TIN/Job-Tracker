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
    notes: 'Leetcode questions revision',
  },
  {
    "id": "3",
    "company": "Microsoft",
    "title": "Full Stack Engineer",
    "appliedDate": "2025-08-02",
    "platform": "Company Website",
    "status": "Applied",
    "notes": "Used a referral from a friend."
  },
  {
    "id": "4",
    "company": "Apple",
    "title": "iOS Developer",
    "appliedDate": "2025-08-01",
    "platform": "LinkedIn",
    "status": "Interviewing",
    "notes": "First round with HR scheduled for next week."
  },
  {
    "id": "5",
    "company": "Netflix",
    "title": "Senior Backend Engineer",
    "appliedDate": "2025-07-31",
    "platform": "Company Website",
    "status": "Rejected",
    "notes": "Received automated rejection email."
  },
  {
    "id": "6",
    "company": "Meta",
    "title": "Data Scientist",
    "appliedDate": "2025-07-29",
    "platform": "LinkedIn",
    "status": "Applied",
    "notes": "Tailored resume to highlight ML projects."
  },
  {
    "id": "7",
    "company": "Salesforce",
    "title": "DevOps Engineer",
    "appliedDate": "2025-07-27",
    "platform": "Indeed",
    "status": "Interviewing",
    "notes": "Technical assessment due on Friday."
  },
  {
    "id": "8",
    "company": "Adobe",
    "title": "UI/UX Designer",
    "appliedDate": "2025-07-26",
    "platform": "Company Website",
    "status": "Applied",
    "notes": "Portfolio link was included in the application."
  },
  {
    "id": "9",
    "company": "Stripe",
    "title": "Software Engineer",
    "appliedDate": "2025-07-25",
    "platform": "Company Website",
    "status": "Interviewing",
    "notes": "Completed the coding challenge."
  },
  {
    "id": "10",
    "company": "Shopify",
    "title": "Ruby on Rails Developer",
    "appliedDate": "2025-07-24",
    "platform": "LinkedIn",
    "status": "Offer",
    "notes": "Received a verbal offer, waiting for the official letter."
  },
  {
    "id": "11",
    "company": "Spotify",
    "title": "Machine Learning Engineer",
    "appliedDate": "2025-07-23",
    "platform": "Indeed",
    "status": "Rejected",
    "notes": "Did not pass the phone screen."
  },
  {
    "id": "12",
    "company": "Twitter (X)",
    "title": "Android Developer",
    "appliedDate": "2025-07-22",
    "platform": "AngelList",
    "status": "Applied",
    "notes": ""
  },
  {
    "id": "13",
    "company": "Uber",
    "title": "Product Manager",
    "appliedDate": "2025-07-21",
    "platform": "LinkedIn",
    "status": "Interviewing",
    "notes": "Preparing for the on-site interview loop."
  },
  {
    "id": "14",
    "company": "Lyft",
    "title": "Site Reliability Engineer",
    "appliedDate": "2025-07-20",
    "platform": "Company Website",
    "status": "Applied",
    "notes": "Focus on Kubernetes and AWS experience."
  },
  {
    "id": "15",
    "company": "Airbnb",
    "title": "Data Analyst",
    "appliedDate": "2025-07-19",
    "platform": "LinkedIn",
    "status": "Rejected",
    "notes": "Position was filled by another candidate."
  },
  {
    "id": "16",
    "company": "Coinbase",
    "title": "Security Engineer",
    "appliedDate": "2025-07-18",
    "platform": "Company Website",
    "status": "Applied",
    "notes": "Highlighted security certifications."
  },
  {
    "id": "17",
    "company": "Figma",
    "title": "Frontend Engineer (React)",
    "appliedDate": "2025-07-17",
    "platform": "LinkedIn",
    "status": "Interviewing",
    "notes": "Paired programming session went well."
  },
  {
    "id": "18",
    "company": "Notion",
    "title": "Full Stack Developer (TypeScript)",
    "appliedDate": "2025-07-16",
    "platform": "AngelList",
    "status": "Applied",
    "notes": "Sent a personalized cover letter."
  },
  {
    "id": "19",
    "company": "Slack",
    "title": "Senior Software Engineer, Backend",
    "appliedDate": "2025-07-15",
    "platform": "Company Website",
    "status": "Offer",
    "notes": "Negotiating salary and start date."
  },
  {
    "id": "20",
    "company": "Atlassian",
    "title": "Java Developer",
    "appliedDate": "2025-07-14",
    "platform": "Indeed",
    "status": "Rejected",
    "notes": "Feedback was about lack of specific framework experience."
  },
  {
    "id": "21",
    "company": "Canva",
    "title": "Frontend Developer",
    "appliedDate": "2025-07-13",
    "platform": "LinkedIn",
    "status": "Applied",
    "notes": ""
  },
  {
    "id": "22",
    "company": "Datadog",
    "title": "Site Reliability Engineer",
    "appliedDate": "2025-07-12",
    "platform": "Company Website",
    "status": "Interviewing",
    "notes": "System design interview next Tuesday."
  },
  {
    "id": "23",
    "company": "Palantir",
    "title": "Forward Deployed Software Engineer",
    "appliedDate": "2025-07-11",
    "platform": "Company Website",
    "status": "Applied",
    "notes": "Complex application process."
  },
  {
    "id": "24",
    "company": "Asana",
    "title": "Web Developer",
    "appliedDate": "2025-07-10",
    "platform": "LinkedIn",
    "status": "Rejected",
    "notes": "Application withdrawn."
  },
  {
    "id": "25",
    "company": "Zoom",
    "title": "Backend Engineer, Video",
    "appliedDate": "2025-07-09",
    "platform": "Indeed",
    "status": "Applied",
    "notes": "Requires C++ experience."
  },
  {
    "id": "26",
    "company": "Nvidia",
    "title": "Deep Learning Engineer",
    "appliedDate": "2025-07-08",
    "platform": "Company Website",
    "status": "Interviewing",
    "notes": "Discussed past projects with the hiring manager."
  },
  {
    "id": "27",
    "company": "Intel",
    "title": "Systems Engineer",
    "appliedDate": "2025-07-07",
    "platform": "LinkedIn",
    "status": "Applied",
    "notes": ""
  },
  {
    "id": "28",
    "company": "Oracle",
    "title": "Cloud Engineer",
    "appliedDate": "2025-07-06",
    "platform": "Company Website",
    "status": "Rejected",
    "notes": "Received automated rejection email."
  },
  {
    "id": "29",
    "company": "IBM",
    "title": "AI Research Scientist",
    "appliedDate": "2025-07-05",
    "platform": "Company Website",
    "status": "Applied",
    "notes": "PhD required, applied anyway."
  },
  {
    "id": "30",
    "company": "Cisco",
    "title": "Network Engineer",
    "appliedDate": "2025-07-04",
    "platform": "Indeed",
    "status": "Interviewing",
    "notes": "CCNA certification was a plus."
  },
  {
    "id": "31",
    "company": "VMware",
    "title": "Virtualization Engineer",
    "appliedDate": "2025-07-03",
    "platform": "LinkedIn",
    "status": "Applied",
    "notes": ""
  },
  {
    "id": "32",
    "company": "GitHub",
    "title": "Product Designer",
    "appliedDate": "2025-07-02",
    "platform": "Company Website",
    "status": "Applied",
    "notes": "Waiting for a more senior role to open up."
  }
];


export default function DashboardPage() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 pb-15">Job Tracker</h1>
      <JobGrid data={sampleJobs} />
    </main>
  );
}