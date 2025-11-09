<script lang="ts">
	import { Eye, EyeClosed } from '@lucide/svelte';
	import { Input } from '../ui/input';

	let { id = '', placeholder = '', password = $bindable() } = $props();
	let showPassword = $state(false);

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};
</script>

<div class="relative flex items-center">
	<Input
		{id}
		type={showPassword ? 'text' : 'password'}
		{placeholder}
		bind:value={password}
		required
	/>
	<button
		type="button"
		class="absolute right-3 cursor-pointer hover:bg-transparent"
		onclick={toggleShowPassword}
		aria-label={showPassword ? 'Hide password' : 'Show password'}
	>
		{#if showPassword}
			<Eye class="size-4" />
		{:else}
			<EyeClosed class="size-4" />
		{/if}
	</button>
</div>
