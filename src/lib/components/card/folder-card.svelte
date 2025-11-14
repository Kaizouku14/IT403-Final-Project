<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Layers } from '@lucide/svelte';
	import type { Folder } from '$lib/interfaces/folder.ts';
	import { resolve } from '$app/paths';
	import { pageRoutes } from '$lib/helper/enums';
	import { goto } from '$app/navigation';
	import { formatAgo, slugify } from '$lib/utils';

	export let folder: Folder;
</script>

<Card.Root
	class="group max-w-md cursor-pointer rounded-2xl border border-t-2 border-border/60 p-4 shadow-2xs
    transition-all duration-200 hover:border-primary/40"
	style="border-top-color: {folder.color}"
	onclick={() =>
		goto(
			resolve(pageRoutes.FOLDER, {
				folderId: folder.id,
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

	<Card.Content class="mt-3 line-clamp-3 text-sm text-muted-foreground">
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
