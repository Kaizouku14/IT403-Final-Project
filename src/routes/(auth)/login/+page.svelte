<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import LoginForm from '$lib/components/form/login-form.svelte';
	import { pageRoutes, socialProviders } from '$lib/helper/enums';
	import { toast } from 'svelte-sonner';

	const handleGoogleSignIn = async () => {
		try {
			const data = await authClient.signIn.social({
				provider: socialProviders.GOOGLE,
				callbackURL: pageRoutes.DASHBOARD
			});

			if (data.error) {
				throw new Error('Failed to sign in with Google');
			}
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	const handleRobloxSignin = async () => {
		try {
			const data = await authClient.signIn.social({
				provider: socialProviders.ROBLOX,
				callbackURL: pageRoutes.DASHBOARD
			});

			if (data.error) {
				throw new Error('Failed to sign in with Roblox');
			}
		} catch (error) {
			toast.error((error as Error).message);
		}
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
