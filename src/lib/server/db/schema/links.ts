import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
import { user } from './auth';
import { sql } from 'drizzle-orm';
import { FOLDERS } from '$lib/helper/constant.ts';

export const links = sqliteTable(
	'links',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		shortCode: text('short_code').notNull().unique(),
		destinationUrl: text('destination_url').notNull(),
		title: text('title'),
		folderId: text('folder_id').references(() => folders.id, { onDelete: 'set null' }),
		password: text('password'),
		expireAt: integer('expire_at', { mode: 'timestamp' }).notNull(),
		isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`),
		updatedAt: integer('updated_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`)
	},
	(table) => [
		index('link_short_code_idx').on(table.shortCode),
		index('link_user_id_idx').on(table.userId),
		index('link_folder_id_idx').on(table.folderId)
	]
);

export const folders = sqliteTable(
	'folders',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		name: text('name', { enum: FOLDERS }).notNull(),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`)
	},
	(table) => [index('folder_user_id_idx').on(table.userId)]
);

export const clicks = sqliteTable(
	'clicks',
	{
		id: text('id').primaryKey(),
		linkId: text('link_id')
			.notNull()
			.references(() => links.id, { onDelete: 'cascade' }),
		country: text('country'),
		city: text('city'),
		region: text('region'),
		referrer: text('referrer'),
		referrerSource: text('referrer_source'),
		device: text('device'),
		os: text('os'),
		browser: text('browser'),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		isQrScan: integer('is_qr_scan', { mode: 'boolean' }).notNull().default(false),
		clickedAt: integer('clicked_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`)
	},
	(table) => [
		index('link_id_idx').on(table.linkId),
		index('clicked_at_idx').on(table.clickedAt),
		index('link_clicked_idx').on(table.linkId, table.clickedAt)
	]
);

export const qrCodes = sqliteTable(
	'qr_codes',
	{
		id: text('id').primaryKey(),
		linkId: text('link_id')
			.notNull()
			.references(() => links.id, { onDelete: 'cascade' }),
		imageData: text('image_data').notNull(),
		size: integer('size').notNull().default(256),
		format: text('format').notNull().default('png'),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`)
	},
	(table) => [index('qr_link_id_idx').on(table.linkId)]
);

export const linkAnalyticsSummary = sqliteTable(
	'link_analytics_summary',
	{
		id: text('id').primaryKey(),
		linkId: text('link_id')
			.notNull()
			.references(() => links.id, { onDelete: 'cascade' }),
		date: text('date').notNull(),
		totalClicks: integer('total_clicks').notNull().default(0),
		uniqueClicks: integer('unique_clicks').notNull().default(0),
		qrScans: integer('qr_scans').notNull().default(0),
		topReferrers: text('top_referrers', { mode: 'json' }),
		topCountries: text('top_countries', { mode: 'json' }),
		deviceBreakdown: text('device_breakdown', { mode: 'json' }),
		createdAt: integer('created_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`)
	},
	(table) => [index('link_id_date_idx').on(table.linkId, table.date)]
);
