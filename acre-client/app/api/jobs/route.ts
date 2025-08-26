// Update your acre-client/app/api/jobs/route.ts file with this code

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Zod schema for validating the incoming job data from the extension
const jobSchema = z.object({
  company: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  applicationLink: z.url().nullable().optional(),
  status: z.string().nullable().optional(),
  appliedDate: z.iso.date().nullable().optional(),
  location: z.string().nullable().optional(),
  platform: z.string().nullable().optional(),
  salary: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

// Helper function to create Supabase client with Bearer token support
async function createClientWithAuth(request: Request) {
  // First try to get the Bearer token from Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    
    // Create a client with the access token
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    );
    
    return supabase;
  }
  
  // Fallback to cookie-based auth (for browser requests)
  return await createClient();
}

// GET method for testing authentication
export async function GET(request: Request) {
  const supabase = await createClientWithAuth(request);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized - No user found' }, { status: 401 });
  }

  try {
    // Get user's jobs to test database connection
    const userJobs = await prisma.job.findMany({
      where: { userId: user.id },
      take: 5 // Just get the latest 5 for testing
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Authentication successful!',
      user: {
        id: user.id,
        email: user.email
      },
      jobCount: userJobs.length,
      recentJobs: userJobs
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: true, 
      message: 'Authentication successful, but database error',
      user: {
        id: user.id,
        email: user.email
      },
      error: 'Database connection failed'
    }, { status: 200 });
  }
}

// POST method (your existing code)
export async function POST(request: Request) {
  // Create a Supabase client that handles both Bearer token and cookies
  const supabase = await createClientWithAuth(request);
  const { data: { user } } = await supabase.auth.getUser();

  // If no user is found in the session, return an unauthorized error
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = jobSchema.safeParse(body);

    if (!validation.success) {
      console.error('Zod Validation Error:', validation.error.issues);
      return NextResponse.json({ error: 'Invalid data provided.' }, { status: 400 });
    }

    const { appliedDate, ...jobData } = validation.data;

    // Use your existing Prisma client to create the new job record
    const newJob = await prisma.job.create({
      data: {
        ...jobData,
        appliedDate: appliedDate ? new Date(appliedDate) : null,
        userId: user.id, // Associate the job with the authenticated user
      },
    });

    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Database error: Could not save the job.' }, { status: 500 });
  }
}