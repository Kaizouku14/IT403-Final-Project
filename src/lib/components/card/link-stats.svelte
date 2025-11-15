<script lang="ts">
	import { Globe, ScanQrCode, TrendingUp, Clock } from '@lucide/svelte';

	let { totalClicks = 0, qrScans = 0, totalCountries = 0, avgDaily = 0 } = $props();

	let stats = [
		{
			title: 'Total Clicks',
			value: totalClicks,
			description: 'All-time click count',
			icon: TrendingUp
		},
		{
			title: 'QR Scans',
			value: qrScans,
			description: 'Number of QR codes scanned',
			icon: ScanQrCode
		},
		{
			title: 'Countries',
			value: totalCountries,
			description: 'Total countries visited',
			icon: Globe
		},
		{
			title: 'Avg Daily Clicks',
			value: avgDaily,
			description: 'Average clicks per day',
			icon: Clock
		}
	];
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
	{#each stats as stat (stat.title)}
		{@const Icon = stat.icon}
		<div
			class="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-2xs
"
		>
			<div class="flex items-center justify-between">
				<h2 class="text-base font-bold">{stat.title}</h2>

				<div class="flex size-4 items-center justify-center">
					<Icon class="size-6" />
				</div>
			</div>

			<p class="mt-4 text-2xl font-bold">{stat.value}</p>
			<p class="text-xs text-muted-foreground">{stat.description}</p>
		</div>
	{/each}
</div>
