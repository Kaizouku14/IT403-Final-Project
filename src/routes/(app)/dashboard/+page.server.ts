import type { Actions, PageServerLoad } from './$types.ts';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
import { db, eq, count } from '$lib/server/db/index.ts';
import { links as LinksTable, folders as FoldersTable } from '$lib/server/db/schema/index.ts';
import { formSchema } from '$lib/components/schema/folder.ts';
import { generateId } from '$lib/helper/helper.ts';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const folders = await db
		.select({
			id: FoldersTable.id,
			name: FoldersTable.name,
			description: FoldersTable.description,
			color: FoldersTable.color,
			createdAt: FoldersTable.createdAt,
			updatedAt: FoldersTable.updatedAt,
			noOfLinks: count(LinksTable.id)
		})
		.from(FoldersTable)
		.leftJoin(LinksTable, eq(FoldersTable.id, LinksTable.folderId))
		.where(eq(FoldersTable.userId, user.id))
		.groupBy(FoldersTable.id)
		.execute();

	const form = await superValidate(zod4(formSchema));

	return {
		form,
		folders
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const user = event.locals.user;
		if (!user) return error(401, { message: 'Unauthorized' });

		const { folder, description, color } = form.data;

		await db.insert(FoldersTable).values({
			id: generateId(),
			userId: user.id,
			name: folder,
			description,
			color
		});

		return {
			form
		};
	}
};
