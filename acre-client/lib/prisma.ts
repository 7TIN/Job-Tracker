import { PrismaClient } from '@prisma/client';

// This prevents TypeScript errors in development due to hot-reloading
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// This creates a single, reusable instance of the PrismaClient.
// If we are in development, it checks for an existing instance on the global object
// to avoid creating new connections on every hot-reload.
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;