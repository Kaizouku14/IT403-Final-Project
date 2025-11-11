<script lang="ts">
	import WelcomeBanner from '$lib/components/layout/welcome-banner.svelte';
	import { Link2, ScanQrCode, TrendingUp, Clock } from '@lucide/svelte';
	import type { PageData } from './$types';
	import Form from './components/form.svelte';

	export let data: PageData;
	const { user, form } = data;

	const stats = [
		{
			title: 'No. of Links',
			value: 10,
			description: 'Total links created by you',
			icon: Link2
		},
		{
			title: 'QR Scans',
			value: 10,
			description: 'Number of QR codes scanned',
			icon: ScanQrCode
		},
		{
			title: 'Total Clicks',
			value: 10,
			description: 'All-time click count',
			icon: TrendingUp
		},
		{
			title: 'Avg Daily Clicks',
			value: 10,
			description: 'Average clicks per day',
			icon: Clock
		}
	];
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="dashboard" content="Dashboard page" />
</svelte:head>

<section class="flex w-full flex-col gap-6 px-6 py-4">
	<div class="flex items-center justify-between">
		<WelcomeBanner {user} />
		<Form data={{ form }} />
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
		{#each stats as stat (stat.title)}
			<div class="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
				<div class="flex items-center justify-between">
					<h2 class="text-base font-bold">{stat.title}</h2>

					<div class="flex size-4 items-center justify-center">
						<svelte:component this={stat.icon} class="size-6" />
					</div>
				</div>

				<p class="mt-4 text-2xl font-bold">{stat.value}</p>
				<p class="text-xs text-muted-foreground">{stat.description}</p>
			</div>
		{/each}
	</div>
</section>
