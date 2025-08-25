
export interface Job {
  company: string | null;
  position: string | null;
  status: string | null; 
  appliedDate: string | null;
  location: string | null;
  salary: string | null;
}

const sampleJobs: Job[] = [
  {
    company: "Google",
    position: "Software Engineer",
    status: "Applied",
    appliedDate: "2024-01-15",
    location: "Mountain View, CA",
    salary: "$150,000",
  },
  {
    company: "Microsoft",
    position: "Frontend Developer",
    status: "Interview",
    appliedDate: "2024-01-12",
    location: "Seattle, WA",
    salary: "$140,000",
  },
  {
    company: "Apple",
    position: "iOS Developer",
    status: "Rejected",
    appliedDate: "2024-01-10",
    location: "Cupertino, CA",
    salary: "$160,000",
  },
  {
    company: "Meta",
    position: "Full Stack Engineer",
    status: "Applied",
    appliedDate: "2024-01-08",
    location: "Menlo Park, CA",
    salary: "$155,000",
  },
  {
    company: "Netflix",
    position: "Backend Engineer",
    status: "Interview",
    appliedDate: "2024-01-05",
    location: "Los Gatos, CA",
    salary: "$145,000",
  },
  {
    company: "Amazon",
    position: "DevOps Engineer",
    status: "Applied",
    appliedDate: "2024-01-03",
    location: "Seattle, WA",
    salary: "$135,000",
  },
  {
    company: "Tesla",
    position: "Software Engineer",
    status: "Applied",
    appliedDate: "2024-01-01",
    location: "Austin, TX",
    salary: "$130,000",
  },
  {
    company: "Spotify",
    position: "Frontend Developer",
    status: "Interview",
    appliedDate: "2023-12-28",
    location: "New York, NY",
    salary: "$125,000",
  },
    {
    company: "Airbnb",
    position: "Data Scientist",
    status: "Interview",
    appliedDate: "2024-02-01",
    location: "San Francisco, CA",
    salary: "$160,000",
  },
  {
    company: "Stripe",
    position: "Backend Engineer",
    status: "Applied",
    appliedDate: "2024-02-09",
    location: "Seattle, WA",
    salary: "$155,000",
  },
  {
    company: "Salesforce",
    position: "Solution Engineer",
    status: "Negotiating",
    appliedDate: "2024-02-11",
    location: "San Francisco, CA",
    salary: "$165,000",
  },
]

export default sampleJobs;
