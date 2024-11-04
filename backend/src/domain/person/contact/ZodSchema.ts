import { z } from 'zod';
import { CreateAddressSchema } from '../../address/ZodSchema';
import { GenderEnum } from './Entity';
import { SocialNetworksSchema } from '../../social-networks/ZodSchema';

export const CreateContactSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  name: z.string().min(1, "Vous n'avez pas renseigné votre nom"),
  address: CreateAddressSchema.optional(),
  phoneNumber: z.string().optional(),
  gender: z.nativeEnum(GenderEnum),
  height: z.number().optional(),
  weight: z.number().optional(),
  socialNetworks: SocialNetworksSchema.optional(),
  referral: z.string()
});

export const UpdateContactSchema = CreateContactSchema.partial();