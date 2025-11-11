<script lang="ts">
	import { pageRoutes } from '$lib/helper/enums';
	import { page } from '$app/state';

	const { error, status } = page;
</script>

<div
	class="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-secondary/5 px-4"
>
	<div
		class="flex flex-col items-center justify-center gap-6 rounded-xl border border-border/40 bg-card p-10 text-center shadow-lg backdrop-blur-sm max-sm:p-6"
	>
		<div class="rounded-full bg-primary/10 p-6">
			<h1 class="text-6xl font-extrabold text-primary max-sm:text-4xl">{status}</h1>
		</div>
		<h2 class="text-2xl font-semibold text-foreground max-sm:text-lg">
			{status === 404 ? 'Page Not Found' : 'Something went wrong'}
		</h2>

		<p class="max-w-sm text-sm text-muted-foreground">
			{status === 404
				? 'The link you’re looking for might have expired or doesn’t exist.'
				: error?.message}
		</p>

		<a
			href={pageRoutes.DASHBOARD}
			class="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
		>
			Go Back
		</a>
	</div>
</div>
