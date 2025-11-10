import { db, eq } from '../server/db';
import { links as LinksTable } from '../server/db/schema';
import crypto from 'crypto';

export function generateId(): string {
	return crypto.randomUUID();
}

export const isSlugTaken = async (slug: string): Promise<boolean> => {
	const [existingSlug] = await db
		.select()
		.from(LinksTable)
		.where(eq(LinksTable.shortCode, slug))
		.limit(1)
		.execute();

	return !!existingSlug;
};

export const generateUniqueSlug = async (length: number = 4): Promise<string> => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let slug: string;
	let attempts = 0;
	const maxAttempts = 1000; // safety limit

	do {
		slug = '';
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			slug += characters[randomIndex];
		}
		attempts++;
		if (attempts > maxAttempts) {
			throw new Error('Unable to generate a unique slug after many attempts');
		}
	} while (await isSlugTaken(slug));

	return slug;
};
