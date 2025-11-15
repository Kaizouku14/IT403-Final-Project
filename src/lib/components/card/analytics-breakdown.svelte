<script lang="ts">
	import { Monitor, Smartphone, Tablet } from '@lucide/svelte';
	import { DEVICE } from '$lib/helper/enums';
	import { Progress } from '$lib/components/ui/progress/index.ts';
	import type { AnalyticsBreakdown } from '$lib/interfaces/analytics';

	export let analyticsData: AnalyticsBreakdown;

	$: maxClicks = Math.max(...analyticsData.clicksByDay.map((d) => d.count));
</script>

<div class=" grid grid-cols-1 gap-4 lg:grid-cols-2">
	<div class="rounded-xl border border-border bg-card p-6 shadow-2xs">
		<h3 class="mb-6 text-lg font-bold">Clicks Over Time</h3>

		<div class="min-h-44 space-y-3">
			{#if analyticsData.clicksByDay.length > 0}
				{#each analyticsData.clicksByDay as day (day.key)}
					<div class="flex items-center gap-3">
						<div class="w-24 text-sm">{day.key}</div>

						<div class="h-6 flex-1 overflow-hidden rounded-full bg-primary/20">
							<div
								class="flex h-full items-center justify-end rounded-full bg-primary pr-3 transition-all"
								style="width: {(day.count / maxClicks) * 100}%"
							>
								<span class="text-xs font-semibold text-white dark:text-black">{day.count}</span>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="flex h-40 items-center justify-center">
					<p class="text-muted-foreground">No data available</p>
				</div>
			{/if}
		</div>
	</div>

	<div class="rounded-xl border border-border bg-card p-6 shadow-2xs">
		<h3 class="mb-6 text-lg font-semibold">Device Breakdown</h3>

		<div class="min-h-44 space-y-3">
			{#if analyticsData.deviceBreakdown.length > 0}
				{#each analyticsData.deviceBreakdown as device (device.key)}
					<div>
						<div class="mb-2 flex items-center justify-between">
							<div class="flex items-center gap-2">
								{#if device.key === DEVICE.MOBILE}
									<Smartphone class="size-5 text-muted-foreground" />
								{:else if device.key === DEVICE.TABLET}
									<Tablet class="size-5 text-muted-foreground" />
								{:else}
									<Monitor class="size-5 text-muted-foreground" />
								{/if}

								<span class="font-medium">{device.key}</span>
							</div>

							<div class="text-right text-sm">
								<span class="font-semibold">{device.count}</span>
								<span class="text-xs text-muted-foreground">({device.percentage}%)</span>
							</div>
						</div>

						<Progress value={device.percentage} class="w-full fill-chart-3" />
					</div>
				{/each}
			{:else}
				<div class="flex h-40 items-center justify-center">
					<p class="text-muted-foreground">No data available</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
	<div class="rounded-xl border border-border bg-card p-6 shadow-2xs">
		<h3 class="mb-6 text-lg font-semibold">Top Referrers</h3>

		<div class="min-h-44 space-y-3">
			{#if analyticsData.referrerBreakdown.length > 0}
				{#each analyticsData.referrerBreakdown as referrer (referrer.key)}
					<div class="flex items-center justify-between">
						<span class="font-medium">{referrer.key}</span>

						<div class="flex items-center gap-3">
							<Progress value={referrer.percentage} class="w-40" />
							<span class="w-20 text-right text-sm">
								{referrer.count}
								<span class="text-xs text-muted-foreground"> ({referrer.percentage}%)</span>
							</span>
						</div>
					</div>
				{/each}
			{:else}
				<div class="flex h-40 items-center justify-center">
					<p class="text-muted-foreground">No data available</p>
				</div>
			{/if}
		</div>
	</div>

	<div class="rounded-xl border border-border bg-card p-6 shadow-2xs">
		<h3 class="mb-6 text-lg font-semibold">Top Countries</h3>

		<div class="min-h-44 space-y-3">
			{#if analyticsData.countryBreakdown.length > 0}
				{#each analyticsData.countryBreakdown as country (country.key)}
					<div class="flex items-center justify-between">
						<span class="font-medium">{country.key}</span>

						<div class="flex items-center">
							<Progress value={country.percentage} class="w-40" />
							<span class="w-20 text-right text-sm">
								{country.count}
								<span class="text-xs text-muted-foreground"> ({country.percentage}%)</span>
							</span>
						</div>
					</div>
				{/each}
			{:else}
				<div class="flex h-40 items-center justify-center">
					<p class="text-muted-foreground">No data available</p>
				</div>
			{/if}
		</div>
	</div>
</div>
