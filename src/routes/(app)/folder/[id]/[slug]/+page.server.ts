import type { Actions, PageServerLoad } from './$types.ts';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.ts';
import { links as LinksTable } from '$lib/server/db/schema/index.ts';
import { generateId, generateUniqueSlug, isSlugTaken } from '$lib/helper/helper.ts';
import { formSchema } from '$lib/components/schema/create-link.ts';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(formSchema));
	return {
		form
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

		const { customSlug, title, destinationUrl } = form.data;
		const folderId = event.params.id;
		const linkId = generateId();
		const generateSlug = await generateUniqueSlug();

		const exists = customSlug && (await isSlugTaken(customSlug));

		if (exists) {
			return fail(409, { message: 'Slug already taken' });
		}

		const expireAt = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000); //31 days
		await db.insert(LinksTable).values({
			id: linkId,
			userId: user.id,
			shortCode: customSlug ?? generateSlug,
			destinationUrl,
			title,
			folderId,
			expireAt
		});

		return {
			form
		};
	}
};
