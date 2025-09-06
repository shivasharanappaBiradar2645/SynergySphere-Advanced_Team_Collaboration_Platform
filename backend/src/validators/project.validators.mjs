import {z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(3,"minium length 3"),
    description: z.string().optional(),
    tags: z.string().optional(),
    imageUrl: z.string().optional(),
})