<script lang="ts">
	import LinkForm from '$lib/components/form/link-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form } = data;
</script>

<section>
	<h1 class="text-2xl font-bold">Summary</h1>
	<LinkForm data={{ form }} />
</section>
