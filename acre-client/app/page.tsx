// import Noise from "@/components/customCards/wobble-card";
// import { WobbleCard } from "@/components/ui/wobble-card";
import AnimatedHero from "@/components/heroSection";
import JobGridPreview from "@/components/JobGridPreview";
// import LogoutButton from "./(auth)/logout/logoutButton";
// // import { Card } from "@/components/ui/card";
// import { WobbleCardDemo } from "@/components/customCards/WobbleCardDemo";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Job } from "@/types/job";



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
]

export default function Home() {
  return (
    // <div className="flex flex-col items-center text-5xl justify-center min-h-screen space-y-3.5">
      
    //   <div className ="">
    //     Welcome
    //   </div>
    //   <LogoutButton />
    //   {/* <WobbleCardDemo /> */}

    //   <JobGridPreview data={sampleJobs}/>

    // </div>

      <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated hero section */}
      <AnimatedHero />

      {/* Existing job grid section */}
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Job Application Tracker
            </h1>
            <p className="text-muted-foreground text-lg">Track your job applications with style and precision</p>
          </div>

          {/* Preview section */}
          <div className="flex justify-center mb-16">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <JobGridPreview data={sampleJobs} />
            </div>
          </div>

          {/* Features section */}
          <div className="text-center">
            <p className="text-muted-foreground">Interactive preview with hover effects and smooth animations</p>
          </div>
        </div>
      </div>
    </div>

  );
}
