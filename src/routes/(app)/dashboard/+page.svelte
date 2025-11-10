<script lang="ts">
	import WelcomeBanner from '$lib/components/layout/welcome-banner.svelte';
	import type { PageData } from './$types';
	import Form from './components/form.svelte';

	export let data: PageData;
	const { user, form } = data;
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="dashboard" content="Dashboard page" />
</svelte:head>

<section class="flex w-full flex-col gap-6 px-6 py-4">
	<div class="flex items-center justify-between">
		<WelcomeBanner {user} />
		<Form data={{ form }} />
	</div>
</section>
