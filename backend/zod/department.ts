import { z } from "zod"

export const department_schema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
    description: z.string().min(10, { message: "Description is required" }),
    contact_person_name: z.string().min(3, { message: "Contact person name is required" }),
    contact_person_email: z.string().email({ message: "Invalid email" }),
    contact_person_title: z.string().min(3, { message: "Contact person title is required" })
});