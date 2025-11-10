import { z } from 'zod';

export const formSchema = z.object({
	destinationUrl: z.string().min(1, {
		message: 'Please enter a valid URL'
	}),
	customSlug: z.string().min(1, {
		message: 'Please enter a slug'
	}),
	title: z.string().min(1, {
		message: 'Please enter a title'
	}),
	folder: z.string().optional()
});

export type FormSchema = typeof formSchema;
