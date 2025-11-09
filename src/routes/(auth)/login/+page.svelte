<script lang="ts">
	import LoginForm from '$lib/components/form/login-form.svelte';
</script>

<svelte:head>
	<title>Login</title>
	<meta name="login" content="Login page" />
</svelte:head>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
	<div class="w-full max-w-sm">
		<LoginForm />
	</div>
</div>
