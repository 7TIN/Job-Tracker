
// import JobGrid from "@/components/jobTable";
import { JobGridSkeleton } from "@/components/skeletons";
// import { getJobsForUser } from "@/lib/jobService";
// import { Job } from "@/types/job";
// import { createClient } from "@/utils/supabase/server";
// import { PrismaClient } from "@prisma/client";
// import { redirect } from "next/navigation";
import { Suspense } from "react";
import JobTable from "./JobTable";

// const prisma = new PrismaClient();


// async function getJobsForUser(): Promise<Job[]> {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   const jobs = await prisma.job.findMany({
//     where: {
//       userId: user.id, 
//     },
//     orderBy: {
//       appliedDate: 'desc', 
//     },
//   });

//   return jobs.map(job => ({
//     ...job,
//     appliedDate: job.appliedDate ? job.appliedDate.toISOString().split('T')[0] : null,
//   }));
// }

// export default async function DashboardPage() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) redirect('/login');


//   const jobs = await getJobsForUser(user.id);

//   const formattedJobs = jobs.map((job) => ({
//     ...job,
//     appliedDate: job.appliedDate?.toISOString().split('T')[0] ?? null,
//   }));

//   return (
//     <main className="p-6 mx-auto">
//       <h1 className="text-2xl font-bold mb-4 pb-15">Job Tracker</h1>
//       <Suspense fallback={<JobGridSkeleton />}>
//         <JobGrid data={formattedJobs} />
//       </Suspense>
//     </main>
//   );
// }

export default function DashboardPage() {
  return (
    <main className="p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4 pb-15">Job Tracker</h1>
      <Suspense 
      // fallback={<JobGridSkeleton />}
      fallback={<JobGridSkeleton />}
      >
        {/* setTimeout(() => {
          <JobTable />
        }, 3000); */}
        <JobTable />
      </Suspense>
    </main>
  );
}