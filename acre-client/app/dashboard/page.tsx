import JobGrid from "@/components/jobTable";
import { Job } from "@/types/job";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();


async function getJobsForUser(): Promise<Job[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const jobs = await prisma.job.findMany({
    where: {
      userId: user.id, 
    },
    orderBy: {
      appliedDate: 'desc', 
    },
  });

  return jobs.map(job => ({
    ...job,
    appliedDate: job.appliedDate ? job.appliedDate.toISOString().split('T')[0] : null,
  }));
}

export default async function DashboardPage() {
  const jobs = await getJobsForUser();
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 pb-15">Job Tracker</h1>
      <JobGrid data={jobs} />
    </main>
  );
}