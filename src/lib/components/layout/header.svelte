<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { authClient } from '$lib/auth-client';
	import { pageRoutes } from '$lib/helper/enums';
	import { goto } from '$app/navigation';

	export let user;

	const handleLogOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					goto(pageRoutes.LOGIN);
				}
			}
		});
	};
</script>

<header class="flex h-15 w-full items-center justify-between p-6">
	<h1 class="text-2xl font-black">VaultTrack</h1>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Avatar.Root class="size-9.5 rounded-full">
				<Avatar.Image src={user.image} alt={user.name} />
				<Avatar.Fallback>CN</Avatar.Fallback>
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
</header>
