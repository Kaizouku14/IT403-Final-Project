<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.ts';
	import { Trash2Icon } from '@lucide/svelte';
	import { buttonVariants } from '../ui/button';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { pageRoutes } from '$lib/helper/enums';

	let { folderId, folderName } = $props();
	let open = $state(false);

	const handleDeleteFolder = async () => {
		const response = await fetch(`/folder/${folderId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			open = false;
			goto(pageRoutes.DASHBOARD);
			toast.success('Folder deleted successfully');
		} else {
			toast.error('Failed to delete folder');
		}
	};
</script>

<AlertDialog.Root {open} onOpenChange={(e) => (open = e.valueOf())}>
	<AlertDialog.Trigger
		title="Delete Folder"
		class={buttonVariants({
			variant: 'destructive',
			size: 'icon'
		})}
	>
		<Trash2Icon class="size-4" />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="font-bold">Delete {folderName}?</AlertDialog.Title>
			<AlertDialog.Description>
				Deleting this folder is permanent and cannot be undone. All associated links in this folder,
				will be removed.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				onclick={handleDeleteFolder}
				class="rounded-md bg-destructive px-4 py-2 text-white hover:bg-destructive/80 focus:ring-2 focus:ring-destructive"
			>
				Delete Folder
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
