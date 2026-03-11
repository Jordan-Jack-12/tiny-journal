import z from "zod";


export const JournalBlockSchema = z.array(z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    type: z.enum(['TODO', 'PROMPT', 'NOTE', 'MOOD']),
    jsonObj: z.object({
        text: z.string(),
        prompt: z.string().optional(),
        checked: z.boolean().optional(),
        mood: z.string().optional(),
    }),
    journalId: z.string()
}))