import type { RequestHandler } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { pageRoutes } from '$lib/helper/enums';
import { resolve } from '$app/paths';
import { getLinkByShortCode, trackClick } from '$lib/helper/helper';
import { getRealClientIP } from '$lib/utils';

export const GET: RequestHandler = async ({ url, params, request, getClientAddress }) => {
	const link = await getLinkByShortCode(params.shortCode);

	if (!link) {
		throw error(404, 'This short link does not exist or has expired');
	}

	const { id, password, destinationUrl } = link;

	if (password) {
		throw redirect(
			302,
			resolve(pageRoutes.AUTH_LINK, {
				shortCode: params.shortCode
			})
		);
	}

	const ip = getRealClientIP(request, getClientAddress);
	const isQrScan = url.searchParams.get('qr') === 'true';
	trackClick(request, ip, id, isQrScan).catch(() => {
		console.error('Failed to track click');
	});

	return new Response(null, {
		status: 302,
		headers: {
			location: destinationUrl
		}
	});
};
