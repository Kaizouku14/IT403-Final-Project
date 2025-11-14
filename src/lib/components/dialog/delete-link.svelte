<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.ts';
	import { Trash2Icon } from '@lucide/svelte';
	import { buttonVariants } from '../ui/button';

	let { linkId, name } = $props();
	let open = $state(false);

	const handleDeleteLink = async () => {
		const response = await fetch(`/api/link/${linkId}`, {
			method: 'DELETE'
		});
		if (response.ok) {
			open = false;
		}
	};
</script>

<AlertDialog.Root {open} onOpenChange={(e) => (open = e.valueOf())}>
	<AlertDialog.Trigger
		title="Delete Link"
		class={buttonVariants({
			variant: 'ghost',
			size: 'icon',
			class: 'size-9 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30'
		})}
	>
		<Trash2Icon class="size-4" />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="font-bold text-destructive">Delete {name}?</AlertDialog.Title>
			<AlertDialog.Description>
				Deleting this link is permanent and cannot be undone. All associated data, including click
				statistics and QR codes, will be removed.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				onclick={handleDeleteLink}
				class="rounded-md bg-destructive px-4 py-2 text-white hover:bg-destructive/80 focus:ring-2 focus:ring-destructive"
			>
				Delete Link
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
