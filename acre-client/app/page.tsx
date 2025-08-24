// import Noise from "@/components/customCards/wobble-card";
// import { WobbleCard } from "@/components/ui/wobble-card";
import AnimatedHero from "@/components/heroSection";
import JobGridPreview from "@/components/JobGridPreview";
import sampleJobs from "@/data/sampleJobs";
// import LogoutButton from "./(auth)/logout/logoutButton";
// // import { Card } from "@/components/ui/card";
// import { WobbleCardDemo } from "@/components/customCards/WobbleCardDemo";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Job } from "@/types/job";

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

    //   <div className="min-h-screen bg-background relative overflow-hidden">
    //   {/* Animated hero section */}
    //   <AnimatedHero />

    //   {/* Existing job grid section */}
    //   <div className="relative overflow-hidden">
    //     {/* Background elements */}
    //     {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
    //     <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
    //     <div
    //       className="absolute bottom-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
    //       style={{ animationDelay: "2s" }}
    //     /> */}

    //     <div className="relative z-10 container mx-auto px-6 py-20">
    //       <div className="flex justify-center mb-16">
    //         <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
    //           <JobGridPreview data={sampleJobs} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen w-full bg-gradient-to-b from-background via-background to-secondary/10">
      {/* Animated hero section */}
      <AnimatedHero />
      <div className="h-24 w-full bg-gradient-to-b from-transparent to-background"></div>
      {/* Job grid section - removed problematic background elements */}
      <div className="w-full ">
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-20">
          <div className="mb-10 sm:mb-16 flex justify-center">
            <div
              className="w-full max-w-6xl animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <JobGridPreview data={sampleJobs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
