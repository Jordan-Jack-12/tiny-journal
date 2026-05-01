import z from "zod";

export const SignUpSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z.string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
  first_name: z.string().min(2, {error: 'Name must be at least 2 characters long.'}).trim(),
  last_name: z.string().min(2, {error: 'Name must be at least 2 characters long.'}).trim(),
})

export const LogInSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z.string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
})

export const JournalBlockSchema = z.array(
  z.object({
    id: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    type: z.enum(["TODO", "PROMPT", "NOTE", "MOOD"]),
    jsonObj: z.object({
      text: z.string(),
      prompt: z.string().optional(),
      checked: z.boolean().optional(),
      mood: z.string().optional(),
    }),
    journalId: z.string(),
  }),
);

export const MoodSchema = z.array(
  z.object({
    jsonObj: z.object({
      text: z.string(),
      prompt: z.string().optional(),
      mood: z.string(),
    }),
  }),
);

