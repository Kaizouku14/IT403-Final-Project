import type { RequestHandler } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { pageRoutes } from '$lib/helper/enums';
import { resolve } from '$app/paths';
import { getLink } from '$lib/helper/helper';

export const GET: RequestHandler = async ({ params }) => {
	const link = await getLink(params.shortCode);

	if (!link) {
		throw error(404, 'This short link does not exist or has expired');
	}

	if (link.password) {
		throw redirect(
			302,
			resolve(pageRoutes.AUTH_LINK, {
				shortCode: params.shortCode
			})
		);
	}

	return new Response(null, {
		status: 302,
		headers: {
			location: link.destinationUrl
		}
	});
};
