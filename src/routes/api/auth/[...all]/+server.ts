import { auth } from '$lib/auth';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	return auth.handler(event.request);
}

export async function POST(event: RequestEvent) {
	return auth.handler(event.request);
}
