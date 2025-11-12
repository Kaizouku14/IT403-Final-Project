<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.ts';
	import { Trash2Icon } from '@lucide/svelte';
	import { buttonVariants } from '../ui/button';

	let { linkName, linkId } = $props();

	const handleDelete = async () => {};
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger
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
			<AlertDialog.Title class="font-bold text-red-600 dark:text-red-400"
				>Delete {linkName}?</AlertDialog.Title
			>
			<AlertDialog.Description>
				Deleting this link is permanent and cannot be undone. All associated data, including click
				statistics and QR codes, will be removed.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				onclick={handleDelete}
				class="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 dark:bg-red-400 dark:hover:bg-red-500"
			>
				Delete Link
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
