<script lang="ts">
	import Header from '$lib/components/layout/header.svelte';

	let { children, data } = $props();
</script>

<main class="flex w-full flex-col gap-2">
	<Header user={data.user} />
	{@render children()}
</main>
