import { auth } from '$lib/auth';
import { toSvelteKitHandler } from 'better-auth/svelte-kit';

const handler = toSvelteKitHandler(auth);

export const { GET, POST } = {
	GET: handler,
	POST: handler
};
