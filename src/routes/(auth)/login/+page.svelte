<script lang="ts">
	import { CirclePoundSterling } from '@lucide/svelte/icons';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldSeparator
	} from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { pageRoutes } from '$lib/helper/enums';
	import { toast } from 'svelte-sonner';
	import { authClient } from '$lib/auth-client';
	import PasswordInput from '$lib/components/form/password-input.svelte';
	import SocialProvider from '$lib/components/form/social-provider.svelte';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);

	const handleEmailLogin = async (e: Event) => {
		e.preventDefault();
		loading = true;

		try {
			const data = await authClient.signIn.email({
				email,
				password,
				callbackURL: pageRoutes.DASHBOARD
			});

			if (data.error) {
				throw new Error(data.error.message || 'Failed to sign in');
			}
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="login" content="Login page" />
</svelte:head>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
	<div class="w-full max-w-sm">
		<div class="flex flex-col gap-6">
			<form onsubmit={handleEmailLogin}>
				<FieldGroup>
					<div class="flex flex-col items-center gap-2 text-center">
						<a href={pageRoutes.LOGIN} class="flex flex-col items-center gap-2 font-medium">
							<div class="flex size-8 items-center justify-center rounded-md">
								<CirclePoundSterling class="size-8" />
							</div>
							<span class="sr-only">VaultTrack.</span>
						</a>
						<h1 class="text-xl font-bold">Welcome to VaultTrack.</h1>
						<FieldDescription>
							Don't have an account? <a href={pageRoutes.SIGNUP}>Sign up</a>
						</FieldDescription>
					</div>
					<div class="flex flex-col gap-4">
						<Field>
							<FieldLabel for="email">Email</FieldLabel>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								bind:value={email}
								required
							/>
						</Field>
						<Field>
							<div class="flex items-center justify-between">
								<FieldLabel for="password">Password</FieldLabel>
								<a
									href={pageRoutes.FORGOT_PASSWORD}
									class="text-sm text-muted-foreground underline"
								>
									Forgot password?
								</a>
							</div>
							<PasswordInput id="password" placeholder="••••••••" bind:password />
						</Field>
					</div>
					<Field>
						<Button type="submit" disabled={loading}>
							{loading ? 'Logging in...' : 'Login'}
						</Button>
					</Field>
					<FieldSeparator>Or</FieldSeparator>
					<SocialProvider />
				</FieldGroup>
			</form>
			<FieldDescription class="px-6 text-center">
				By clicking continue, you agree to our <a href="##">Terms of Service</a> and
				<a href="##">Privacy Policy</a>.
			</FieldDescription>
		</div>
	</div>
</div>
