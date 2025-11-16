<script lang="ts">
	import { pageRoutes } from '$lib/helper/enums';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Zynkly — Modern URL Shortener</title>
	<meta
		name="description"
		content="Zynkly is a fast and privacy-focused URL shortener with analytics, QR codes, custom slugs, and more."
	/>
</svelte:head>

<main>
	<header class="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
			<a href="/" class="text-2xl font-bold tracking-tight">
				Zyn<span class="text-primary">kly</span>
			</a>

			<nav class=" flex items-center gap-6 text-sm">
				<a href={resolve(pageRoutes.LOGIN, {})} class="transition hover:text-primary">Login</a>
				<a
					href={resolve(pageRoutes.DASHBOARD, {})}
					class="hidden rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90 md:flex"
				>
					Get Started
				</a>
			</nav>
		</div>
	</header>

	<section class="mx-auto max-w-4xl px-6 pt-28 pb-20 text-center">
		<h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
			Shorten links. Track clicks. <br />
			<span class="text-primary">Grow smarter.</span>
		</h1>

		<p class="text-md mx-auto mb-8 max-w-2xl text-muted-foreground md:text-lg">
			Zynkly is a modern, privacy-friendly URL shortener with real-time analytics, custom slugs, QR
			codes, password protection, and blazing-fast redirects.
		</p>

		<div class="flex justify-center gap-2 md:gap-4">
			<a
				href={resolve(pageRoutes.DASHBOARD, {})}
				class="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
			>
				Get Started
			</a>

			<a
				href={resolve(pageRoutes.LOGIN, {})}
				class="rounded-lg bg-muted px-6 py-3 font-medium transition hover:bg-muted/80"
			>
				Log In
			</a>
		</div>
	</section>

	<section class="bg-muted/30 py-24">
		<div class="mx-auto max-w-6xl px-6">
			<h2 class="mb-12 text-center text-3xl font-bold">Why Zynkly?</h2>

			<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
				<div class="rounded-xl border bg-background p-6 shadow-sm">
					<h3 class="mb-2 text-xl font-semibold">Fast Redirects</h3>
					<p class="text-muted-foreground">
						Built on Turso Edge — your links load instantly from anywhere in the world.
					</p>
				</div>

				<div class="rounded-xl border bg-background p-6 shadow-sm">
					<h3 class="mb-2 text-xl font-semibold">Analytics</h3>
					<p class="text-muted-foreground">
						Track devices, countries, referrers, browsers, and click trends.
					</p>
				</div>

				<div class="rounded-xl border bg-background p-6 shadow-sm">
					<h3 class="mb-2 text-xl font-semibold">Custom Slugs</h3>
					<p class="text-muted-foreground">
						Create branded, memorable short links with your own custom keywords.
					</p>
				</div>

				<div class="rounded-xl border bg-background p-6 shadow-sm">
					<h3 class="mb-2 text-xl font-semibold">Password Protection</h3>
					<p class="text-muted-foreground">
						Lock your links with secure passwords for private access.
					</p>
				</div>

				<div class="rounded-xl border bg-background p-6 shadow-sm">
					<h3 class="mb-2 text-xl font-semibold">QR Codes Included</h3>
					<p class="text-muted-foreground">
						Every short link automatically generates a high-quality QR code.
					</p>
				</div>

				<div class="rounded-xl border bg-background p-6 shadow-sm">
					<h3 class="mb-2 text-xl font-semibold">Organize with Folders</h3>
					<p class="text-muted-foreground">
						Group your links into folders for easy management and clean workflows.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="px-6 py-24 text-center">
		<h2 class="mb-4 text-3xl font-bold sm:text-4xl">Ready to simplify your links?</h2>
		<p class="mb-8 text-muted-foreground">
			Create your first short link in seconds — no complexity, no distractions.
		</p>

		<a
			href={resolve(pageRoutes.SIGNUP, {})}
			class="rounded-xl bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition hover:opacity-90"
		>
			Get Started Free →
		</a>
	</section>

	<footer class="flex items-center justify-center border-t bg-muted/30 p-4">
		<div class="text-center text-sm text-muted-foreground">
			© {new Date().getFullYear()} Zynkly. All rights reserved.
		</div>
	</footer>
</main>
