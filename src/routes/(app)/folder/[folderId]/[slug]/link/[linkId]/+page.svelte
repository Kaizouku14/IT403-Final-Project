<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft } from '@lucide/svelte';
	import AnalyticsBreakdownCard from '$lib/components/card/analytics-breakdown.svelte';
	import * as Select from '$lib/components/ui/select/index.ts';
	import type { PageData } from '../../$types';
	import { onMount } from 'svelte';
	import type { AnalyticsBreakdown } from '$lib/interfaces/analytics';
	import { toast } from 'svelte-sonner';
	import LinkStatsCard from '$lib/components/card/link-stats.svelte';
	import { Spinner } from '$lib/components/ui/spinner/index.ts';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { pageRoutes } from '$lib/helper/enums';

	export let data: PageData;
	const { link } = data;

	let analyticsData: AnalyticsBreakdown | null = null;
	let days = '30';
	const linkId = link.id;

	async function loadAnalytics(selectedDays: string) {
		try {
			const res = await fetch(
				`/folder/${link.folderId}/${link.folder}/link/${linkId}?days=${selectedDays}`
			);
			if (!res.ok) throw new Error('Failed to fetch analytics');
			analyticsData = await res.json();
		} catch (err) {
			console.log(err);
			toast.error('Failed to fetch analytics');
		}
	}

	onMount(() => loadAnalytics(days));
</script>

<svelte:head>
	<title>{link.name}</title>
</svelte:head>

<section class="flex min-h-[80vh] w-full flex-col gap-6 p-6">
	<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
		<div class="flex items-center gap-3">
			<Button
				variant="outline"
				size="icon"
				title="Back to Dashboard"
				class="shrink-0"
				onclick={() =>
					goto(
						resolve(pageRoutes.FOLDER, {
							folderId: link.folderId,
							slug: link.folderName
						})
					)}
			>
				<ChevronLeft class="size-5" />
			</Button>

			<div class="flex flex-col">
				<small class="text-sm text-muted-foreground">Back to {link.folderName}</small>
				<h2 class="max-w-[16rem] truncate text-xl leading-tight font-bold md:max-w-none">
					{link.name}
				</h2>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<Select.Root type="single" bind:value={days} onValueChange={(value) => loadAnalytics(value)}>
				<Select.Trigger class="w-[180px]">Last {days} Days</Select.Trigger>
				<Select.Content>
					<Select.Item value="7">Last 7 Days</Select.Item>
					<Select.Item value="30">Last 30 Days</Select.Item>
					<Select.Item value="90">Last 90 Days</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	{#if analyticsData}
		<LinkStatsCard
			totalClicks={analyticsData.totalClicks}
			qrScans={analyticsData.qrScans}
			totalCountries={analyticsData.totalCountries}
			avgDaily={analyticsData.avgDaily}
		/>

		<AnalyticsBreakdownCard {analyticsData} />
	{:else}
		<div class="flex h-[50vh] flex-col items-center justify-center gap-4">
			<Spinner class="size-6" />
			<p class=" animate-pulse text-muted-foreground">fetching analytics...</p>
		</div>
	{/if}
</section>
