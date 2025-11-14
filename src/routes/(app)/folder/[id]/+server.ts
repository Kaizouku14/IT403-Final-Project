import type { RequestHandler } from '@sveltejs/kit';
import { folders as FoldersTable } from '$lib/server/db/schema/index.ts';
import { db, eq } from '$lib/server/db';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;

	try {
		await db.delete(FoldersTable).where(eq(FoldersTable.id, id));

		return new Response('Folder deleted successfully', { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return new Response(error.message, { status: 500 });
		}

		return new Response('An unexpected error occurred', { status: 500 });
	}
};
