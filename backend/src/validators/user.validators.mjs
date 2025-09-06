import {z} from "zod";


export const registerSchema = z.object({
    name: z.string().min(2,"Name must be at least 2 characters long"),
    email: z.email({error: "inavalid"}),
    password: z.string().min(6,"minimum length of 6"),
})

export const loginSchema = z.object({
    email: z.email({error: "inavalid"}),
    password: z.string().min(6),

});