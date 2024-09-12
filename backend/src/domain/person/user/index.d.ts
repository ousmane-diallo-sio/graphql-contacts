import { z } from "zod";
import { NightTime } from "../night-time";
import { CreateUserSchema, UpdateUserSchema } from "./ZodSchema";

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;