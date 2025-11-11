import type { Actions, PageServerLoad } from './$types.ts';
// import { superValidate } from 'sveltekit-superforms';
// import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { db, eq } from '$lib/server/db/index.ts';
import { links as LinksTable, folders as FoldersTable } from '$lib/server/db/schema/index.ts';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const folderAndLinks = await db
		.select()
		.from(FoldersTable)
		.leftJoin(LinksTable, eq(FoldersTable.id, LinksTable.folderId))
		.where(eq(FoldersTable.userId, user.id));

	// console.log(await db.select().from(FoldersTable));
	// console.log(await db.select().from(LinksTable));
	console.log(folderAndLinks);

	// const form = await superValidate(zod4(formSchema));

	return {
		folderAndLinks
	};
};

export const actions: Actions = {
	default: async (event) => {
		// const form = await superValidate(event, zod4(formSchema));

		// if (!form.valid) {
		// 	return fail(400, {
		// 		form
		// 	});
		// }

		const user = event.locals.user;
		if (!user) return fail(401, { message: 'Unauthorized' });

		// return {
		// user
		// };
	}
};
