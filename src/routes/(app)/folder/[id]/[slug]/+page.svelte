<script lang="ts">
	import type { PageData } from './$types';
	import LinkForm from '$lib/components/form/link-form.svelte';
	import LinkCard from '$lib/components/card/link-card.svelte';
	import { slugToText } from '$lib/utils';
	import * as Empty from '$lib/components/ui/empty';
	import { Link2Off, ChevronLeft, SearchIcon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { pageRoutes } from '$lib/helper/enums';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	export let data: PageData;
	$: ({ form, links: LinksData, slug } = data);

	let query = '';
	$: folderName = slugToText(slug);
	const handleBackButton = () => {
		goto(pageRoutes.DASHBOARD);
	};

	$: filteredData = query
		? LinksData.filter((link) => link.title.toLowerCase().includes(query.toLowerCase()))
		: LinksData;
</script>

<svelte:head>
	<title>{folderName} | Folder</title>
</svelte:head>

<section class="flex min-h-[80vh] flex-col gap-6 p-6">
	<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
		<div class="flex items-center gap-3">
			<Button
				variant="outline"
				size="icon"
				title="Back to Dashboard"
				onclick={handleBackButton}
				class="shrink-0"
			>
				<ChevronLeft class="size-5" />
			</Button>

			<div class="flex flex-col">
				<small class="text-sm text-muted-foreground">Back to Dashboard</small>
				<h2 class="max-w-[16rem] truncate text-xl leading-tight font-semibold md:max-w-none">
					{folderName} Folder
				</h2>
			</div>
		</div>

		<LinkForm {form} />
	</div>

	<InputGroup.Root class="sm:max-w-120">
		<InputGroup.Input placeholder="Search..." bind:value={query} />
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Addon align="inline-end">{filteredData.length} results</InputGroup.Addon>
	</InputGroup.Root>

	{#if LinksData.length > 0}
		<ScrollArea class="sm:max-h-120">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#if filteredData.length > 0}
					{#each filteredData as links (links.linksId)}
						<LinkCard {links} />
					{/each}
				{:else}
					<div class="flex h-86 items-center justify-center">
						<div class="flex flex-col items-center gap-3 text-center text-muted-foreground">
							<Link2Off class="size-10 text-gray-400" />
							<span class="text-base font-medium">No links found</span>
						</div>
					</div>
				{/if}
			</div>
		</ScrollArea>
	{:else}
		<div class="flex flex-1 flex-col items-center justify-center">
			<Empty.Root class="flex flex-col items-center gap-6">
				<Empty.Header class="text-center">
					<Empty.Media variant="icon">
						<Link2Off class="size-6 text-muted-foreground" />
					</Empty.Media>
					<Empty.Title>No Links Yet</Empty.Title>
					<Empty.Description>
						You haven't created any link yet. Get started by creating your first link.
					</Empty.Description>
				</Empty.Header>

				<Empty.Content>
					<div class="flex gap-2">
						<LinkForm {form} />
						<Button variant="outline" onclick={handleBackButton}>View Folders</Button>
					</div>
				</Empty.Content>
			</Empty.Root>
		</div>
	{/if}
</section>
