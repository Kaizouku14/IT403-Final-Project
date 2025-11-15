import type { Actions, PageServerLoad } from './$types.ts';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';
import { db, eq, count } from '$lib/server/db/index.ts';
import {
	links as LinksTable,
	folders as FoldersTable,
	clicks as ClicksTable
} from '$lib/server/db/schema/index.ts';
import { formSchema } from '$lib/components/schema/folder.ts';
import { generateId } from '$lib/helper/helper.ts';
import type { Folder } from '$lib/interfaces/folder.ts';

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

	const clickData = await db
		.select({
			id: ClicksTable.id,
			linkId: ClicksTable.linkId,
			isQrScan: ClicksTable.isQrScan,
			clickedAt: ClicksTable.clickedAt
		})
		.from(ClicksTable)
		.leftJoin(LinksTable, eq(ClicksTable.linkId, LinksTable.id))
		.where(eq(LinksTable.userId, user.id))
		.execute();

	const totalLinks = folders.reduce((acc, f) => acc + Number(f.noOfLinks), 0);
	const totalScans = clickData.filter((c) => c.isQrScan).length;
	const totalClicks = clickData.length;

	const clicksByDay: Record<string, number> = {};
	clickData.forEach((c) => {
		const date = c.clickedAt.toISOString().split('T')[0];
		clicksByDay[date] = (clicksByDay[date] || 0) + 1;
	});
	const days = Object.keys(clicksByDay).length || 1;
	const avgDailyClicks = Math.round(totalClicks / days);

	const form = await superValidate(zod4(formSchema));

	return {
		form,
		folders: folders as Folder[],
		summary: {
			totalLinks,
			totalScans,
			totalClicks,
			avgDailyClicks
		}
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
