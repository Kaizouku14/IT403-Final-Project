import type { RequestHandler } from '@sveltejs/kit';
import { db, eq, and } from '$lib/server/db';
import { links as LinksTable } from '$lib/server/db/schema/index.ts';

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
