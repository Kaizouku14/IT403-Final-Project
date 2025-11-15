import type { PageServerLoad } from '../../$types';
import { links as LinksTable, folders as FolderTable } from '$lib/server/db/schema/index.ts';
import { db, eq, and } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { linkId, folderId } = params;

	const [link] = await db
		.select({
			id: LinksTable.id,
			name: LinksTable.title,
			folderId: LinksTable.folderId,
			folderName: FolderTable.name
		})
		.from(LinksTable)
		.leftJoin(FolderTable, eq(FolderTable.id, LinksTable.folderId))
		.where(and(eq(LinksTable.id, linkId), eq(LinksTable.folderId, folderId)))
		.limit(1)
		.execute();

	if (!link) {
		throw error(404, 'Link not found');
	}

	return {
		link
	};
};
