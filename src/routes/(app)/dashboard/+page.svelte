<script lang="ts">
	export let data;

	const { user } = data;
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="dashboard" content="Dashboard page" />
</svelte:head>

<section class="flex w-full flex-col gap-6 px-6 py-4">
	<div>
		<h1 class="mb-1 text-4xl font-bold text-foreground">Welcome, {user.name}</h1>
		<p class="text-muted-foreground">Manage and monitor your cryptocurrency holdings</p>
	</div>
</section>
