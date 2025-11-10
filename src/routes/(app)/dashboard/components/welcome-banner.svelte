<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Form from '$lib/components/form/form.svelte';
	import { PlusIcon } from '@lucide/svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
	export const { user, form } = data;
</script>

<div class="flex items-center justify-between">
	<div>
		<h1 class="mb-1 text-3xl font-bold text-foreground">Welcome, {user.name}</h1>
		<p class="text-muted-foreground">Manage and track your shortened URLs</p>
	</div>

	<Dialog.Root>
		<Dialog.Trigger>
			<Button class="flex items-center gap-2">
				<PlusIcon class="size-4" />
				<span class="font-bold">Create Link</span>
			</Button>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Create Short Link</Dialog.Title>
				<Dialog.Description>
					Fill in the URL and optional details to create your short link.
				</Dialog.Description>
			</Dialog.Header>
			<Form {data} />
		</Dialog.Content>
	</Dialog.Root>
</div>
