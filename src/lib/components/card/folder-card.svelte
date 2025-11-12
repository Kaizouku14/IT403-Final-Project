<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Empty from '$lib/components/ui/empty/index.ts';
	import { Folder as FolderIcon, Layers } from '@lucide/svelte';
	import { formatDistanceToNow } from 'date-fns';
	import type { Folder } from '$lib/interfaces/folder.ts';
	import { resolve } from '$app/paths';
	import { pageRoutes } from '$lib/helper/enums';
	import { goto } from '$app/navigation';
	import { slugify } from '$lib/utils';

	let data: { folders: Folder[] } = $props();
	const formatAgo = (d: Date) => formatDistanceToNow(d, { addSuffix: true });
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
	{#if data.folders.length > 0}
		{#each data.folders as folder (folder.id)}
			<Card.Root
				class="group t max-w-md cursor-pointer rounded-2xl border border-t-2 border-border/60 p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
				style="border-top-color: {folder.color}"
				onclick={() =>
					goto(
						resolve(pageRoutes.FOLDER, {
							id: folder.id,
							slug: slugify(folder.name)
						})
					)}
			>
				<Card.Header class="flex items-center justify-between">
					<div>
						<Card.Title
							class="text-lg font-bold text-foreground transition-colors group-hover:text-primary"
						>
							{folder.name}
						</Card.Title>
						<Card.Description class="text-xs text-muted-foreground">
							{folder.noOfLinks} links • Updated {formatAgo(folder.updatedAt)}
						</Card.Description>
					</div>
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary">
						<Layers color={folder.color} />
					</div>
				</Card.Header>

				<Card.Content class="mt-3 text-sm text-muted-foreground">
					{folder.description}
				</Card.Content>

				<Card.Footer class="mt-4 flex items-center justify-between text-xs text-muted-foreground">
					<span>Created {formatAgo(folder.updatedAt)}</span>
					<Button
						class="font-medium text-primary hover:underline"
						variant="link"
						onclick={() =>
							goto(
								resolve(pageRoutes.FOLDER, {
									id: folder.id,
									slug: slugify(folder.name)
								})
							)}>View</Button
					>
				</Card.Footer>
			</Card.Root>
		{/each}
	{:else}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<FolderIcon />
				</Empty.Media>
				<Empty.Title>No Folders Yet</Empty.Title>
				<Empty.Description>
					You haven't created any Folder yet. Get started by creating your first folder.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<!-- TODO: Add Folder Form -->
			</Empty.Content>
		</Empty.Root>
	{/if}
</div>
