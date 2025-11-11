<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { FOLDERS, type folderTypes } from '$lib/helper/constant';
	import type { Folder } from '$lib/interfaces/folder';
	import { Code, Layers, User } from '@lucide/svelte';
	import { formatDistanceToNow } from 'date-fns';

	export let folderValues: Record<folderTypes, Folder>;
	const folderIcons = {
		Personal: User,
		Marketing: Layers,
		Development: Code
	};
	const formatAgo = (d: Date) => formatDistanceToNow(d, { addSuffix: true });
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
	{#each FOLDERS as folder (folder)}
		{@const values = folderValues[folder]}
		{@const Icon = folderIcons[folder]}

		<Card.Root
			class="group max-w-md cursor-pointer rounded-2xl border border-border/60 p-4 transition-all hover:border-primary/40 hover:shadow-md"
		>
			<Card.Header class="flex items-center justify-between">
				<div>
					<Card.Title
						class="text-lg font-bold text-foreground transition-colors group-hover:text-primary"
					>
						{folder}
					</Card.Title>
					<Card.Description class="text-xs text-muted-foreground">
						{values.noOfLinks} links • Updated {formatAgo(values.updatedAt)}
					</Card.Description>
				</div>
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary">
					<Icon />
				</div>
			</Card.Header>

			<Card.Content class="mt-3 text-sm text-muted-foreground">
				A collection of {folder.toLowerCase()} links and assets.
			</Card.Content>

			<Card.Footer class="mt-4 flex items-center justify-between text-xs text-muted-foreground">
				<span>Created {formatAgo(values.updatedAt)}</span>
				<Button class="font-medium text-primary hover:underline" variant="ghost" size="link"
					>View</Button
				>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
