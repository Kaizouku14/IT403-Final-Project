<script lang="ts">
	import WelcomeBanner from '$lib/components/layout/welcome-banner.svelte';
	import type { PageData } from './$types';
	import * as Empty from '$lib/components/ui/empty/index.ts';
	import { Link2Off } from '@lucide/svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import type { folderTypes } from '$lib/helper/constant';
	import type { Folder } from '$lib/interfaces/folder';
	import StatCard from '$lib/components/card/stat-card.svelte';
	import FolderCard from '$lib/components/card/folder-card.svelte';

	export let data: PageData;
	const { user, folderAndLinks } = data;

	const folderValues: Record<folderTypes, Folder> = {
		Personal: { noOfLinks: 5, updatedAt: new Date('2025-11-09T10:00:00') },
		Marketing: { noOfLinks: 12, updatedAt: new Date('2025-11-10T12:30:00') },
		Development: { noOfLinks: 8, updatedAt: new Date('2025-11-11T08:15:00') }
	};
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="dashboard" content="Dashboard page" />
</svelte:head>

<section class="flex w-full flex-col gap-6 px-6 py-4">
	<div class="flex items-center justify-between">
		<WelcomeBanner {user} />
	</div>
	<StatCard values={{ totalLinks: 10, totalScans: 10, totalClicks: 10, avgDailyClicks: 10 }} />

	<Tabs.Root value="folders">
		<Tabs.List>
			<Tabs.Trigger value="folders" class="text-sm font-bold">Folders</Tabs.Trigger>
			<Tabs.Trigger value="links" class="text-sm font-bold">Summary</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="folders" class="py-2">
			<FolderCard {folderValues} />
		</Tabs.Content>
		<Tabs.Content value="links" class="rounded-md border border-border bg-card">
			{#if folderAndLinks.length > 0}
				<p>too hot!</p>
			{:else}
				<Empty.Root>
					<Empty.Header>
						<Empty.Media variant="icon">
							<Link2Off />
						</Empty.Media>
						<Empty.Title>No Links Yet</Empty.Title>
						<Empty.Description>
							You haven't created any Links yet. Get started by creating your first short link.
						</Empty.Description>
					</Empty.Header>
					<Empty.Content></Empty.Content>
				</Empty.Root>
			{/if}
		</Tabs.Content>
	</Tabs.Root>
</section>
