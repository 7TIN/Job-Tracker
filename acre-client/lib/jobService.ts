import { prisma } from './prisma';

export async function getJobsForUser(userId: string) {
  return prisma.job.findMany({
    where: { userId },
    orderBy: { appliedDate: 'desc' },
  });
}
