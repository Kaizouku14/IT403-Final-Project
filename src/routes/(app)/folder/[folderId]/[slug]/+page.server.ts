import type { Actions, PageServerLoad } from './$types.ts';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
import { db, eq, count, sql, and, desc } from '$lib/server/db/index.ts';
import {
	links as LinksTable,
	folders as FoldersTable,
	clicks as ClicksTable,
	qrCodes as qrCodesTable
} from '$lib/server/db/schema/index.ts';
import { generateId, generateUniqueSlug, hashPassword, isSlugTaken } from '$lib/helper/helper.ts';
import { formSchema } from '$lib/components/schema/create-link.ts';
import type { Links } from '$lib/interfaces/link.ts';
import { env } from '$env/dynamic/public';
import QRCode from 'qrcode';

export const load: PageServerLoad = async ({ params }) => {
	const { slug, folderId } = params;
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
		.where(eq(FoldersTable.id, folderId))
		.groupBy(LinksTable.id)
		.orderBy(desc(LinksTable.createdAt))
		.execute();

	return {
		form,
		slug,
		folderId,
		links: links as Links[]
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(formSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const user = event.locals.user;
		if (!user) {
			return error(401, {
				message: 'Unauthorized'
			});
		}

		const folderId = event.params.id;
		if (!folderId) {
			return error(400, {
				message: 'Folder ID is required'
			});
		}

		const folder = await db.query.folders.findFirst({
			where: and(eq(FoldersTable.id, folderId), eq(FoldersTable.userId, user.id))
		});

		if (!folder) {
			return error(403, {
				message: 'Folder not found or access denied'
			});
		}

		const { customSlug, title, destinationUrl, password } = form.data;

		try {
			new URL(destinationUrl);
		} catch {
			return fail(400, {
				form,
				message: 'Invalid destination URL'
			});
		}

		let finalSlug: string;

		if (customSlug) {
			// validate custom slug format
			if (!/^[a-zA-Z0-9_-]+$/.test(customSlug)) {
				return error(400, {
					message: 'Slug can only contain letters, numbers, hyphens, and underscores'
				});
			}

			if (await isSlugTaken(customSlug)) {
				return error(409, {
					message: 'This slug is already taken. Please choose another.'
				});
			}
			finalSlug = customSlug;
		} else {
			finalSlug = await generateUniqueSlug();
		}

		const hashedPassword = (password && (await hashPassword(password))) || null;
		const expireAt = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000);
		const linkId = generateId();

		try {
			await db.transaction(async (tx) => {
				const [returning] = await tx
					.insert(LinksTable)
					.values({
						id: linkId,
						userId: user.id,
						shortCode: finalSlug,
						destinationUrl,
						title: title || `Link to ${new URL(destinationUrl).hostname}`,
						folderId,
						password: hashedPassword,
						expireAt,
						isActive: true
					})
					.returning({
						id: LinksTable.id,
						shortCode: LinksTable.shortCode
					});

				const qrUrl = `${env.PUBLIC_URL}/${returning.shortCode}?qr=true`;
				const qrDataUrl = await QRCode.toDataURL(qrUrl, {
					width: 300,
					margin: 2,
					errorCorrectionLevel: 'M',
					color: {
						dark: '#020618',
						light: '#e7e5e4'
					}
				});

				await tx.insert(qrCodesTable).values({
					id: generateId(),
					linkId,
					imageData: qrDataUrl,
					format: 'png',
					size: 300
				});
			});

			return message(form, {
				type: 'success',
				text: `Link created successfully: ${env.PUBLIC_URL}/${finalSlug}`
			});
		} catch {
			return error(500, {
				message: 'Failed to create link. Please try again.'
			});
		}
	}
};
