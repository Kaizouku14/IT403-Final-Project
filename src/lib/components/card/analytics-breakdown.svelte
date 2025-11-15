<script lang="ts">
	import { Monitor, Smartphone, Tablet } from '@lucide/svelte';
	import { DEVICE } from '$lib/helper/enums';
	import { Progress } from '$lib/components/ui/progress/index.ts';

	export let analyticsData;

	const maxClicks = Math.max(...analyticsData.clicksByDay.map((d) => d.clicks));
</script>

<div class=" grid grid-cols-1 gap-4 lg:grid-cols-2">
	<div class="rounded-xl border border-border bg-card p-6 shadow-2xs">
		<h3 class="mb-6 text-lg font-bold">Clicks Over Time</h3>

		<div class="space-y-3">
			{#each analyticsData.clicksByDay as day (day)}
				<div class="flex items-center gap-3">
					<div class="w-24 text-sm">{day.date.slice(5)}</div>

					<div class="h-6 flex-1 overflow-hidden rounded-full bg-primary/20">
						<div
							class="flex h-full items-center justify-end rounded-full bg-primary pr-3 transition-all"
							style="width: {(day.clicks / maxClicks) * 100}%"
						>
							<span class="text-xs font-semibold text-white dark:text-black">{day.clicks}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="rounded-xl border border-border bg-card p-6 shadow-2xs">
		<h3 class="mb-6 text-lg font-semibold">Device Breakdown</h3>

		<div class="space-y-4">
			{#each analyticsData.devices as device (device)}
				<div>
					<div class="mb-2 flex items-center justify-between">
						<div class="flex items-center gap-2">
							{#if device.name === DEVICE.MOBILE}
								<Smartphone class="size-5 text-muted-foreground" />
							{:else if device.name === DEVICE.TABLET}
								<Tablet class="size-5 text-muted-foreground" />
							{:else}
								<Monitor class="size-5 text-muted-foreground" />
							{/if}

							<span class="font-medium">{device.name}</span>
						</div>

						<div class="text-right text-sm">
							<span class="font-semibold">{device.count.toLocaleString()}</span>
							<span class="ml-2 text-muted-foreground">({device.percentage}%)</span>
						</div>
					</div>

					<Progress value={device.percentage} class="w-full fill-chart-3" />
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
	<div class="rounded-xl border border-border bg-card p-6 shadow-2xs">
		<h3 class="mb-6 text-lg font-semibold">Top Referrers</h3>

		<div class="space-y-3">
			{#each analyticsData.topReferrers as referrer (referrer)}
				<div class="flex items-center justify-between">
					<span class="font-medium">{referrer.source}</span>

					<div class="flex items-center gap-3">
						<Progress value={referrer.percentage} class="w-40" />
						<span class="w-20 text-right text-sm text-muted-foreground">
							{referrer.count} ({referrer.percentage}%)
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="rounded-xl border border-border bg-card p-6 shadow-2xs">
		<h3 class="mb-6 text-lg font-semibold">Top Countries</h3>

		<div class="space-y-3">
			{#each analyticsData.topCountries as country (country)}
				<div class="flex items-center justify-between">
					<span class="font-medium">{country.country}</span>

					<div class="flex items-center">
						<Progress value={country.percentage} class="w-40" />
						<span class="w-20 text-right text-sm text-muted-foreground">
							{country.count} ({country.percentage}%)
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
