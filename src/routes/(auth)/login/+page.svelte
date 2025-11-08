<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import LoginForm from '$lib/components/form/login-form.svelte';

	const handleGoogleSignIn = async () => {
		const data = await authClient.signIn.social({
			provider: 'google'
		});

		console.log(data);
	};

	const handleRobloxSignin = async () => {
		const data = await authClient.signIn.social({
			provider: 'roblox'
		});

		console.log(data);
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="login" content="Login page" />
</svelte:head>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
	<div class="w-full max-w-sm">
		<LoginForm signInWithGoogle={handleGoogleSignIn} signInWithRoblox={handleRobloxSignin} />
	</div>
</div>
