import { z } from 'zod';

export const profileSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  partner_name: z.string().min(2, 'Partner name must be at least 2 characters'),
  wedding_date: z.string(),
  wedding_location: z.string().min(2, 'Location is required'),
  guest_count: z.number().min(1, 'Guest count must be at least 1'),
  budget: z.number().min(1000, 'Budget must be at least $1,000'),
  wedding_style: z.string(),
  created_at: z.string(),
  updated_at: z.string()
});

export type Profile = z.infer<typeof profileSchema>;

export type ProfileFormData = Omit<Profile, 'id' | 'user_id' | 'created_at' | 'updated_at'>;