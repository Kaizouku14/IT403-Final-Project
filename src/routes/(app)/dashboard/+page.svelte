<script lang="ts">
	import WelcomeBanner from '$lib/components/layout/welcome-banner.svelte';
	import type { PageData } from './$types';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import StatCard from '$lib/components/card/stat-card.svelte';
	import FolderCard from '$lib/components/card/folder-card.svelte';
	import FolderForm from '$lib/components/form/folder-form.svelte';

	export let data: PageData;
	$: ({ user, form, folders } = data);
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="dashboard" content="Dashboard page" />
</svelte:head>

<section class="flex w-full flex-col gap-6 px-6 py-4">
	<div class="flex items-center justify-between">
		<WelcomeBanner {user} />
		<FolderForm {form} />
	</div>
	<StatCard values={{ totalLinks: 10, totalScans: 10, totalClicks: 10, avgDailyClicks: 10 }} />

	<Tabs.Root value="folders">
		<Tabs.List>
			<Tabs.Trigger value="folders" class="text-sm font-bold">Folders</Tabs.Trigger>
			<Tabs.Trigger value="links" class="text-sm font-bold">Summary</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="folders" class="py-2">
			<FolderCard {folders} />
		</Tabs.Content>
		<Tabs.Content value="links" class="rounded-md border border-border bg-card"></Tabs.Content>
	</Tabs.Root>
</section>
