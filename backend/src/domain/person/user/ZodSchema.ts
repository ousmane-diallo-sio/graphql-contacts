import { z } from 'zod';
import { CreateAddressSchema } from '../../address/ZodSchema';
import { GenderEnum } from './Entity';
import { SocialNetworksSchema } from '../../social-networks/ZodSchema';

export const PasswordSchema = z.string()
  .min(8, { message: "Le mot de passe doit contenir au moins {#limit} caractères" })
  .max(20, { message: "Le mot de passe ne doit pas dépasser {#limit} caractères" });

export const CreateUserSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  name: z.string().min(1, "Vous n'avez pas renseigné votre nom"),
  address: CreateAddressSchema.optional(),
  phoneNumber: z.string().optional(),
  gender: z.nativeEnum(GenderEnum),
  height: z.number().optional(),
  weight: z.number().optional(),
  socialNetworks: SocialNetworksSchema.optional(),
  password: PasswordSchema
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const UserLoginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Vous n'avez pas renseigné votre mot de passe")
});