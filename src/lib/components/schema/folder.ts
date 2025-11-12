import { z } from 'zod';

export const formSchema = z.object({
	folder: z.string().min(1, { message: 'folder name is required' }),
	description: z.string().optional(),
	color: z.string().optional()
});

export type FormSchema = typeof formSchema;
