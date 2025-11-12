import type { Actions, PageServerLoad } from './$types.ts';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { db, eq, count, sql } from '$lib/server/db/index.ts';
import {
	links as LinksTable,
	folders as FoldersTable,
	clicks as ClicksTable,
	qrCodes as qrCodesTable
} from '$lib/server/db/schema/index.ts';
import { generateId, generateUniqueSlug, isSlugTaken } from '$lib/helper/helper.ts';
import { formSchema } from '$lib/components/schema/create-link.ts';
import type { Links } from '$lib/interfaces/link.ts';

export const load: PageServerLoad = async ({ params }) => {
	const { slug, id } = params;
	const form = await superValidate(zod4(formSchema));

	const links = await db
		.select({
			folderId: FoldersTable.id,
			folderName: FoldersTable.name,
			folderColor: FoldersTable.color,
			linksId: LinksTable.id,
			title: LinksTable.title,
			shortCode: LinksTable.shortCode,
			destinationUrl: LinksTable.destinationUrl,
			expireAt: LinksTable.expireAt,
			isActive: LinksTable.isActive,
			noOfClicks: count(ClicksTable.id),
			createdAt: LinksTable.createdAt,
			updatedAt: LinksTable.updatedAt,
			protected: sql<boolean>`
      CASE WHEN ${LinksTable.password} IS NULL OR ${LinksTable.password} = '' THEN false ELSE true END
    `,
			imageData: qrCodesTable.imageData,
			format: qrCodesTable.format,
			size: qrCodesTable.size
		})
		.from(LinksTable)
		.leftJoin(FoldersTable, eq(LinksTable.folderId, FoldersTable.id))
		.leftJoin(ClicksTable, eq(LinksTable.id, ClicksTable.linkId))
		.leftJoin(qrCodesTable, eq(LinksTable.id, qrCodesTable.linkId))
		.where(eq(FoldersTable.id, id))
		.groupBy(LinksTable.id)
		.execute();

	return {
		form,
		slug,
		links: links as Links[]
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
