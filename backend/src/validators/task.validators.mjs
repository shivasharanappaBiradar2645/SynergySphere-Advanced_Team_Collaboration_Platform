import {z} from "zod";

export const taskSchema = z.object({
    title: z.string().min(3, "minimum length of 3"),
    description: z.string().optional(),
    assignee: z.number().optional(),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Due date must be YYYY-MM-DD"),
  status: z.enum(["To-Do", "In Progress", "Done"]).default("To-Do"),
});
