import { db, eq, and, gt } from '$lib/server/db';
import type { RequestHandler } from './$types';
import { links as LinksTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { pageRoutes } from '$lib/helper/enums';

export const GET: RequestHandler = async ({ params }) => {
	const [links] = await db
		.select({
			destinationUrl: LinksTable.destinationUrl,
			password: LinksTable.password
		})
		.from(LinksTable)
		.where(
			and(
				eq(LinksTable.shortCode, params.shortCode),
				eq(LinksTable.isActive, true),
				gt(LinksTable.expireAt, new Date())
			)
		)
		.limit(1)
		.execute();

	if (!links) {
		return new Response('Not Found', { status: 404 });
	}

	if (links.password) {
		throw redirect(302, pageRoutes.AUTH_LINK);
	}

	return new Response(null, {
		status: 302,
		headers: {
			location: links.destinationUrl
		}
	});
};
