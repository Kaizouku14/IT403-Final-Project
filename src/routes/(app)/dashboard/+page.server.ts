import type { Actions, PageServerLoad } from './$types.ts';
import { formSchema } from './components/schema.ts';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.ts';
import { links as LinksTable, folders as FoldersTable } from '$lib/server/db/schema/index.ts';
import { generateId, generateUniqueSlug, isSlugTaken } from '$lib/helper/helper.ts';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(formSchema))
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
		if (!user) return fail(401, { message: 'Unauthorized' });

		const { customSlug, title, destinationUrl, folder } = form.data;
		let folderId = null;
		const linkId = generateId();
		const generateSlug = await generateUniqueSlug();

		const exists = customSlug && (await isSlugTaken(customSlug));

		if (exists) {
			return fail(409, { message: 'Slug already taken' });
		}

		if (folder) {
			const result = await db
				.insert(FoldersTable)
				.values({
					id: generateId(),
					userId: user.id,
					name: folder
				})
				.returning({ id: FoldersTable.id });

			folderId = result[0].id;
		}

		await db.insert(LinksTable).values({
			id: linkId,
			userId: user.id,
			shortCode: customSlug ?? generateSlug,
			destinationUrl,
			title,
			folderId
		});

		return {
			form
		};
	}
};
