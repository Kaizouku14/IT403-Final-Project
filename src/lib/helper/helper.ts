import { db, eq, and, gt } from '../server/db';
import { links as LinksTable } from '../server/db/schema';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
	const SALT_ROUNDS = 12;
	const hash = await bcrypt.hash(password, SALT_ROUNDS);
	return hash;
};

export const verifyPassword = async (password: string, hashed: string): Promise<boolean> => {
	return bcrypt.compare(password, hashed);
};

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

export const getLink = async (shortCode: string) => {
	const [links] = await db
		.select({
			destinationUrl: LinksTable.destinationUrl,
			password: LinksTable.password
		})
		.from(LinksTable)
		.where(
			and(
				eq(LinksTable.shortCode, shortCode),
				eq(LinksTable.isActive, true),
				gt(LinksTable.expireAt, new Date())
			)
		)
		.limit(1)
		.execute();

	return links;
};
