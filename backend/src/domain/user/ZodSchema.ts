import { z } from 'zod';
import { CreateAddressSchema } from '../address/ZodSchema';
import { GenderEnum } from './Entity';

export const PasswordValidatior = z.string()
  .min(8, { message: "Le mot de passe doit contenir au moins {#limit} caractères" })
  .max(20, { message: "Le mot de passe ne doit pas dépasser {#limit} caractères" });

export const CreateUserSchema = z.object({
  email: z.string()
    .email({ message: "L'adresse email est invalide" })
    .min(1, { message: "L'adresse email doit contenir au moins {#limit} caractères" }),
  name: z.string()
    .min(2, { message: "Le nom doit contenir au moins {#limit} caractères" })
    .max(50, { message: "Le nom ne doit pas dépasser {#limit} caractères" }),
  password: PasswordValidatior,
  address: CreateAddressSchema.optional(),
  phoneNumber: z.string().optional(),
  gender: z.nativeEnum(GenderEnum),
  height: z.number().optional(),
  weight: z.number().optional(),
  socialNetworks: z.object({
    facebookUrl: z.string().optional(),
    twitterUrl: z.string().optional(),
    instagramUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
  }).optional()
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const UserLoginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Vous n'avez pas renseigné votre mot de passe")
});