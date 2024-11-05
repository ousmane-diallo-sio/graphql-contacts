import { z } from "zod";
import { NightTime } from "../night-time";
import { CreateContactSchema, CreateUserSchema, UpdateContactSchema, UpdateUserSchema } from "./ZodSchema";

export type CreateContactDTO = z.infer<typeof CreateContactSchema>;

export type UpdateContactDTO = z.infer<typeof UpdateContactSchema>;