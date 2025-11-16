<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.ts';
	import { Ellipsis, GlobeLock, CircleMinus, CirclePlus } from '@lucide/svelte';
	import { buttonVariants } from '../ui/button';
	import { cn } from '$lib/utils';

	let { password, isActive } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={buttonVariants({ variant: 'ghost', size: 'icon' })}
		aria-label="Open menu"
	>
		<Ellipsis class="size-4" />
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-48">
		<DropdownMenu.Group>
			<DropdownMenu.Label class="text-xs text-muted-foreground">Menu</DropdownMenu.Label>

			<DropdownMenu.Separator />

			{#if password}
				<!-- TODO: Set Password Dialog -->
				<DropdownMenu.Item
					class="flex items-center gap-2"
					onSelect={() => console.log('Edit password')}
				>
					<GlobeLock class="size-4" />
					<span>Edit password</span>
				</DropdownMenu.Item>
			{:else}
				<DropdownMenu.Item
					class="flex items-center gap-2"
					onSelect={() => console.log('Set password')}
				>
					<GlobeLock class="size-4" />
					<span>Set password</span>
				</DropdownMenu.Item>
			{/if}

			<DropdownMenu.Item
				class={cn('flex items-center gap-2', isActive ? 'text-destructive' : 'text-green-600')}
				onSelect={() => console.log('Deactivate')}
			>
				{#if isActive}
					<CircleMinus class="size-4 text-destructive" />
					<span>Deactivate</span>
				{:else}
					<CirclePlus class="size-4 text-green-600" />
					<span>Activate</span>
				{/if}
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
