import { z } from 'zod';

export const CreateAddressSchema = z.object({
  country: z.string().min(1, { message: "Le pays doit contenir au moins {#limit} caractères" }),
  city: z.string().min(1, { message: "La ville doit contenir au moins {#limit} caractères" }),
  street: z.string().min(1, { message: "La rue doit contenir au moins {#limit} caractères" }),
  zipCode: z.string().min(1, { message: "Le code postal doit contenir au moins {#limit} caractères" }),
});

export const UpdateAddressSchema = CreateAddressSchema.partial();