<script lang="ts">
	import WelcomeBanner from '$lib/components/layout/welcome-banner.svelte';
	import type { PageData } from './$types';
	import StatCard from '$lib/components/card/stat-card.svelte';
	import FolderCard from '$lib/components/card/folder-card.svelte';
	import FolderForm from '$lib/components/form/folder-form.svelte';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { SearchIcon } from '@lucide/svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Empty from '$lib/components/ui/empty/index.ts';
	import { Folder as FolderIcon } from '@lucide/svelte';

	export let data: PageData;
	$: ({ user, form, folders, summary } = data);

	let query = '';
	$: filteredData = query
		? data.folders.filter((link) => link.name.toLowerCase().includes(query.toLowerCase()))
		: folders;
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
	<StatCard {...summary} />

	<InputGroup.Root class="sm:max-w-96">
		<InputGroup.Input placeholder="Search..." bind:value={query} />
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Addon align="inline-end">{filteredData.length} results</InputGroup.Addon>
	</InputGroup.Root>

	<ScrollArea class="max-h-96">
		{#if filteredData.length > 0}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				{#each filteredData as folder (folder.id)}
					<FolderCard {folder} />
				{/each}
			</div>
		{:else}
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<FolderIcon />
					</Empty.Media>
					<Empty.Title>No Folders Yet</Empty.Title>
					<Empty.Description>
						You haven't created any folder yet. Get started by creating your first folder.
					</Empty.Description>
				</Empty.Header>
			</Empty.Root>
		{/if}
	</ScrollArea>
</section>
