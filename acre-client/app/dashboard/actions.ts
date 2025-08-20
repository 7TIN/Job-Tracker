"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";

const jobSchema = z.object({
  company: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  applicationLink: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  appliedDate: z.string().nullable().optional(), 
  location: z.string().nullable().optional(),
  platform: z.string().nullable().optional(),
  salary: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export async function createJob(data: unknown) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to add a job." };
  }

  const validation = jobSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid data provided. Please check the fields." };
  }

  const { appliedDate, ...jobData } = validation.data;

  try {
    const newJob = await prisma.job.create({
      data: {
        ...jobData,

        appliedDate: appliedDate ? new Date(appliedDate) : null,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,

      data: {
        ...newJob,
        appliedDate: newJob.appliedDate ? newJob.appliedDate.toISOString().split('T')[0] : null,
      },
    };
  } catch (error) {
    console.error("Failed to create job:", error);
    return { error: "Database error: Could not save the job." };
  }
}

const updateJobSchema = jobSchema.extend({
  id: z.uuid(),
});

export async function updateJob(data: unknown) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const validation = updateJobSchema.safeParse(data);
  if (!validation.success) {
    console.error("Zod validation failed:", validation.error.issues);
    return { error: "Invalid data for update." };
  }

  const { id, appliedDate, ...jobData } = validation.data;

  try {
    const updatedJob = await prisma.job.update({
      where: {
        id: id,
        userId: user.id, 
      },
      data: {
        ...jobData,
        appliedDate: appliedDate ? new Date(appliedDate) : null,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      data: {
        ...updatedJob,
        appliedDate: updatedJob.appliedDate ? updatedJob.appliedDate.toISOString().split('T')[0] : null,
      },
    };
  } catch (error) {
    console.error("Failed to update job:", error);
    return { error: "Database error: Could not update the job." };
  }
}