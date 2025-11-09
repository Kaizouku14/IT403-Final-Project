<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	let { children } = $props();
</script>

<div class="app">
	<main class="h-screen p-6">
		<ModeWatcher />
		<Toaster />
		{@render children()}
	</main>
</div>
