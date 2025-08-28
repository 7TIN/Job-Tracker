import { z } from 'zod';

// Zod schema for validating job data from the extension
const jobSchema = z.object({
  company: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  applicationLink: z.url().nullable().optional(),
  status: z.string().nullable().optional(),
  // The extension will send a full ISO string
  appliedDate: z.iso.datetime().nullable().optional(),
  location: z.string().nullable().optional(),
  platform: z.string().nullable().optional(),
  salary: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

// This TypeScript type is inferred from the Zod schema
export type JobPayload = z.infer<typeof jobSchema>;

// Defines the structure for tokens stored locally
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

// Defines all possible messages that can be sent between extension scripts
export type ChromeMessage =
  | { action: 'openAuthTab'; url: string }
  | { action: 'checkAuth' }
  | { action: 'clearAuth' }
  | { action: 'createJob'; jobData: JobPayload }
  | { action: 'authSuccess'};