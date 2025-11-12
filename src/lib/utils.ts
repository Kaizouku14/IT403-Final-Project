import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const categorizeReferrer = (referrer: string): string => {
	if (!referrer || referrer === 'Direct') return 'Direct';

	const url = referrer.toLowerCase();

	if (url.includes('facebook.com') || url.includes('fb.com')) return 'Facebook';
	if (url.includes('twitter.com') || url.includes('t.co')) return 'Twitter';
	if (url.includes('linkedin.com')) return 'LinkedIn';
	if (url.includes('instagram.com')) return 'Instagram';
	if (url.includes('google.com')) return 'Google';
	if (url.includes('youtube.com')) return 'YouTube';
	if (url.includes('reddit.com')) return 'Reddit';
	if (url.includes('tiktok.com')) return 'TikTok';

	return 'Other';
};

export const getRealClientIP = (request: Request, fallback: () => string): string => {
	const cfIp = request.headers.get('cf-connecting-ip'); // Check Cloudflare header
	if (cfIp) return cfIp;

	const xRealIp = request.headers.get('x-real-ip'); // Check Vercel/other proxies
	if (xRealIp) return xRealIp;

	const xForwardedFor = request.headers.get('x-forwarded-for'); // Check x-forwarded-for (take first IP)
	if (xForwardedFor) {
		return xForwardedFor.split(',')[0].trim();
	}

	return fallback();
};

export const slugify = (text: string): string => {
	return text
		.toLowerCase() // convert to lowercase
		.trim() // remove leading/trailing whitespace
		.normalize('NFD') // split accented characters
		.replace(/[\u0300-\u036f]/g, '') // remove accents
		.replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphen
		.replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
