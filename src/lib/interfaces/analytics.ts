import type { InferSelectModel } from 'drizzle-orm';
import type { clicks } from '$lib/server/db/schema/links';

export type Click = InferSelectModel<typeof clicks>;

export interface CountWithPercentage<T extends string = string> {
	key: T;
	count: number;
	percentage: number;
}

export interface AnalyticsBreakdown {
	totalClicks: number;
	qrScans: number;
	countries: number;
	avgDaily: number;
	clicksByDay: CountWithPercentage[];
	deviceBreakdown: CountWithPercentage[];
	referrerBreakdown: CountWithPercentage[];
	countryBreakdown: CountWithPercentage[];
}
