import { z } from 'zod';

export const SocialNetworksSchema = z.object({
  facebookUrl: z.string().url().optional(),
  twitterUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
});