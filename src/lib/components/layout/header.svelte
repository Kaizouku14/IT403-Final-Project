<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { authClient } from '$lib/auth-client';
	import { pageRoutes } from '$lib/helper/enums';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import Toggler from '../theme/toggler.svelte';

	export let user;

	const handleLogOut = async () => {
		toast.loading('Logging out...');

		try {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						toast.success('Successfully logged out.');
						goto(pageRoutes.LOGIN);
					}
				}
			});
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
</script>

<header class="flex h-15 w-full items-center justify-between p-6">
	<h1 class="text-2xl font-black">Sniplink</h1>

	<div class="flex items-center gap-2">
		<Toggler />

		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar.Root class="size-9.5 rounded-full">
					<Avatar.Image src={user.image} alt={user.name} />
					<Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Profile</DropdownMenu.Item>
					<DropdownMenu.Item onclick={handleLogOut}>Log out</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
