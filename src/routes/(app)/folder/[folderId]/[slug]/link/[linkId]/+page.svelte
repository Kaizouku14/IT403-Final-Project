<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft } from '@lucide/svelte';
	import LinkStatsCard from '$lib/components/card/link-stats.svelte';
	import AnalyticsBreakdownCard from '$lib/components/card/analytics-breakdown.svelte';
	import * as Select from '$lib/components/ui/select/index.ts';

	// export let slug;

	// console.log(slug);

	const analyticsData = {
		totalClicks: 1247,
		qrScans: 84,
		countries: 23,
		avgDaily: 42,
		clicksByDay: [
			{ date: '2025-11-04', clicks: 45 },
			{ date: '2025-11-05', clicks: 52 },
			{ date: '2025-11-06', clicks: 38 },
			{ date: '2025-11-07', clicks: 61 },
			{ date: '2025-11-08', clicks: 48 },
			{ date: '2025-11-09', clicks: 55 },
			{ date: '2025-11-10', clicks: 43 }
		],
		devices: [
			{ name: 'Mobile', count: 687, percentage: 55 },
			{ name: 'Desktop', count: 436, percentage: 35 },
			{ name: 'Tablet', count: 124, percentage: 10 }
		],
		topReferrers: [
			{ source: 'Twitter', count: 456, percentage: 37 },
			{ source: 'Facebook', count: 312, percentage: 25 },
			{ source: 'Direct', count: 248, percentage: 20 },
			{ source: 'LinkedIn', count: 143, percentage: 11 },
			{ source: 'Email', count: 88, percentage: 7 }
		],
		topCountries: [
			{ country: 'United States', count: 498, percentage: 40 },
			{ country: 'United Kingdom', count: 249, percentage: 20 },
			{ country: 'Canada', count: 187, percentage: 15 },
			{ country: 'Germany', count: 150, percentage: 12 },
			{ country: 'Australia', count: 163, percentage: 13 }
		]
	};
</script>

<svelte:head>
	<title>Link Page</title>
</svelte:head>

<section class="flex min-h-[80vh] w-full flex-col gap-6 p-6">
	<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
		<div class="flex items-center gap-3">
			<Button variant="outline" size="icon" title="Back to Dashboard" class="shrink-0">
				<ChevronLeft class="size-5" />
			</Button>

			<div class="flex flex-col">
				<small class="text-sm text-muted-foreground">Back to Folder name</small>
				<h2 class="max-w-[16rem] truncate text-xl leading-tight font-bold md:max-w-none">
					Link Name
				</h2>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<Select.Root type="single">
				<Select.Trigger class="w-[180px]">Select Date Range</Select.Trigger>
				<Select.Content>
					<Select.Item value="7">Last 7 Days</Select.Item>
					<Select.Item value="30">Last 30 Days</Select.Item>
					<Select.Item value="90">Last 90 Days</Select.Item>
				</Select.Content>
			</Select.Root>
			<!-- Delete Link Button -->
		</div>
	</div>
	<LinkStatsCard />
	<AnalyticsBreakdownCard {analyticsData} />
</section>
