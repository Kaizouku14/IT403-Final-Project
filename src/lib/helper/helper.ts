import { db, eq, and, sql } from '../server/db';
import { links as LinksTable, clicks as ClicksTable } from '../server/db/schema';
import { categorizeReferrer, countToArray } from '$lib/utils';
import { UAParser } from 'ua-parser-js';
import { geolocation } from '@vercel/functions';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

export const hashPassword = async (password: string): Promise<string> => {
	const SALT_ROUNDS = 12;
	const hash = await bcrypt.hash(password, SALT_ROUNDS);
	return hash;
};

export const verifyPassword = async (password: string, hashed: string): Promise<boolean> => {
	return bcrypt.compare(password, hashed);
};

export function generateId(): string {
	return nanoid(8);
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

export const getLinkByShortCode = async (shortCode: string) => {
	const link = await db.query.links.findFirst({
		where: and(eq(LinksTable.shortCode, shortCode), eq(LinksTable.isActive, true))
	});

	if (!link) return null;

	if (link.expireAt && link.expireAt < new Date()) {
		return null;
	}

	return link;
};

export const trackClick = async (
	request: Request,
	ip: string,
	linkId: string,
	isQrScan = false
) => {
	try {
		const userAgent = request.headers.get('user-agent') ?? 'unknown';
		const referer = request.headers.get('referer') ?? '';
		const { device, os, browser } = new UAParser(userAgent).getResult();
		const { city, country, countryRegion } = geolocation(request);

		await db.insert(ClicksTable).values({
			id: generateId(),
			linkId,
			country,
			city,
			region: countryRegion,
			referrer: referer,
			referrerSource: categorizeReferrer(referer),
			device: device?.type ?? 'Desktop',
			os: os?.name ?? 'unknown',
			browser: browser?.name ?? 'unknown',
			ipAddress: ip,
			userAgent,
			isQrScan,
			clickedAt: new Date()
		});
	} catch (error) {
		console.error('Error tracking click:', error);
	}
};

export const getLinkAnalytics = async (linkId: string, days = 30) => {
	const startDate = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;

	const clickData = await db.query.clicks.findMany({
		where: and(eq(ClicksTable.linkId, linkId), sql`${ClicksTable.clickedAt} >= ${startDate}`)
	});

	// Aggregate data
	const totalClicks = clickData.length;
	const qrScans = clickData.filter((c) => c.isQrScan).length;

	//Analytics breakdown
	const deviceBreakdown = countToArray(clickData, (c) => c.device || 'unknown');
	const referrerBreakdown = countToArray(clickData, (c) => c.referrerSource || 'direct');
	const countryBreakdown = countToArray(clickData, (c) => c.country || 'Unknown');
	const clicksByDay = countToArray(clickData, (c) => c.clickedAt.toISOString().split('T')[0]);

	const avgDaily = days > 0 ? Math.round(totalClicks / days) : totalClicks;

	return {
		totalClicks,
		qrScans,
		totalCountries: countryBreakdown.length,
		avgDaily,
		deviceBreakdown,
		referrerBreakdown,
		countryBreakdown,
		clicksByDay
	};
};
