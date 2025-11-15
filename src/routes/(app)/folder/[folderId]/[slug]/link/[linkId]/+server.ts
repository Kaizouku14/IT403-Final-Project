import type { RequestHandler } from '@sveltejs/kit';
import { db, eq, and } from '$lib/server/db';
import { links as LinksTable } from '$lib/server/db/schema/index.ts';
import { getLinkAnalytics } from '$lib/helper/helper';

export const DELETE: RequestHandler = async ({ params }) => {
	const { folderId, linkId } = params;

	try {
		const [link] = await db
			.select()
			.from(LinksTable)
			.where(and(eq(LinksTable.id, linkId), eq(LinksTable.folderId, folderId)))
			.limit(1)
			.execute();

		if (!link) {
			return new Response('Link not found', { status: 404 });
		}

		await db.delete(LinksTable).where(eq(LinksTable.id, linkId)).execute();

		return new Response('Link deleted successfully', { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return new Response(error.message, { status: 500 });
		}

		return new Response('An unexpected error occurred', { status: 500 });
	}
};

export const GET: RequestHandler = async ({ params, url }) => {
	const { linkId } = params;
	const days = Number(url.searchParams.get('days')) || 30;

	if (!linkId) return new Response('Missing linkId', { status: 400 });

	const analytics = await getLinkAnalytics(linkId, days);

	return new Response(JSON.stringify(analytics));
};
