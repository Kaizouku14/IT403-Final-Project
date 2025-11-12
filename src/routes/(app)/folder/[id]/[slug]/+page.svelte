<script lang="ts">
	import type { PageData } from './$types';
	import LinkForm from '$lib/components/form/link-form.svelte';
	import LinkCard from '$lib/components/card/link-card.svelte';
	import { slugToText } from '$lib/utils';
	import * as Empty from '$lib/components/ui/empty';
	import { Link2Off } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { pageRoutes } from '$lib/helper/enums';

	export let data: PageData;
	const { form, links: LinksData, slug } = data;

	const folderName = slugToText(slug);
</script>

<svelte:head>
	<title>{folderName} | Folder</title>
</svelte:head>

<section class="flex min-h-[80vh] flex-col gap-4 p-6">
	<div class="flex items-center justify-between">
		<div class="flex flex-col">
			<h1 class="text-3xl font-bold">{folderName}</h1>
			<p class="text-sm text-muted-foreground">Manage all the links in this folder</p>
		</div>
		<LinkForm {form} />
	</div>

	{#if LinksData.length > 0}
		<div class="grid gap-4 py-6 md:grid-cols-2">
			{#each LinksData as links (links.linksId)}
				<LinkCard {links} />
			{/each}
		</div>
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
						<Button variant="outline" onclick={() => goto(pageRoutes.DASHBOARD)}
							>View Folders</Button
						>
					</div>
				</Empty.Content>
			</Empty.Root>
		</div>
	{/if}
</section>
