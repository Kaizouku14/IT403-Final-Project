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
	import DeleteFolder from '$lib/components/dialog/delete-folder.svelte';

	export let data: PageData;
	$: ({ form, links: LinksData, slug, folderId } = data);

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

<section class="flex min-h-[80vh] w-full flex-col gap-6 p-6">
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
				<h2 class="max-w-[16rem] truncate text-xl leading-tight font-bold md:max-w-none">
					{folderName}
				</h2>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<LinkForm {form} />
			<DeleteFolder {folderId} {folderName} />
		</div>
	</div>

	<InputGroup.Root class="sm:max-w-120">
		<InputGroup.Input placeholder="Search..." bind:value={query} />
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Addon align="inline-end">{filteredData.length} results</InputGroup.Addon>
	</InputGroup.Root>

	<ScrollArea class="h-96 md:h-120 ">
		{#if filteredData.length > 0}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each filteredData as links (links.linksId)}
					<LinkCard {links} />
				{/each}
			</div>
		{:else}
			<div class="flex h-full flex-1 flex-col items-center justify-center">
				<Empty.Root class="flex flex-col items-center gap-6 ">
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
						<Button variant="outline" onclick={handleBackButton}>View Folders</Button>
					</Empty.Content>
				</Empty.Root>
			</div>
		{/if}
	</ScrollArea>
</section>
