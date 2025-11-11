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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
