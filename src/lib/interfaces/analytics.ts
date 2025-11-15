interface ClicksByDay {
	date: string;
	clicks: number;
}

interface Devices {
	name: string;
	count: number;
	percentage: number;
}

interface TopReferrers {
	source: string;
	count: number;
	percentage: number;
}

interface TopCountries {
	country: string;
	count: number;
	percentage: number;
}

export interface AnalyticsBreakdownProps {
	totalClicks: number;
	qrScans: number;
	countries: number;
	avgDaily: number;
	clicksByDay: ClicksByDay[];
	devices: Devices[];
	topReferrers: TopReferrers[];
	topCountries: TopCountries[];
}
