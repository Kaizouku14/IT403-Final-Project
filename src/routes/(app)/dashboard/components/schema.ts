import { FOLDERS } from '$lib/helper/constant';
import { z } from 'zod';

export const formSchema = z.object({
	destinationUrl: z.url({ protocol: /^https$/ }),
	customSlug: z.string().optional(),
	title: z.string().min(1, {
		message: 'Please enter a title description'
	}),
	folder: z.enum(FOLDERS)
});

export type FormSchema = typeof formSchema;
