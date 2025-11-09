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
	import SocialProvider from '$lib/components/form/social-provider.svelte';

	let username = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);

	const handleSignUp = async (e: Event) => {
		e.preventDefault();
		loading = true;

		try {
			const data = await authClient.signUp.email({
				name: username,
				email,
				password,
				callbackURL: pageRoutes.LOGIN
			});

			if (data.error) {
				throw new Error(data.error.message || 'Failed to sign up');
			}

			toast.success('Check your email to verify your account');
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Sign Up</title>
	<meta name="Sign Up" content="Sign Up page" />
</svelte:head>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
	<div class="w-full max-w-sm">
		<div class="flex flex-col gap-6">
			<form onsubmit={handleSignUp}>
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
							Already have an account? <a href={pageRoutes.LOGIN}>Sign in</a>
						</FieldDescription>
					</div>
					<div class="flex flex-col gap-2">
						<div class="grid gap-4 md:grid-cols-2">
							<Field>
								<FieldLabel for="username">Username</FieldLabel>
								<Input
									id="username"
									type="text"
									placeholder="i.e John Doe"
									bind:value={username}
									required
								/>
							</Field>
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
						</div>

						<Field>
							<FieldLabel for="password">Password</FieldLabel>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								bind:value={password}
								required
							/>
						</Field>
						<Field>
							<FieldLabel for="password">Confirm Password</FieldLabel>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								bind:value={confirmPassword}
								required
							/>
						</Field>
					</div>
					<Field>
						<Button type="submit" disabled={loading}>
							{loading ? 'Signing Up...' : 'Sign Up'}
						</Button>
					</Field>
					<FieldSeparator>Or</FieldSeparator>
					<SocialProvider requestSignUp={true} />
				</FieldGroup>
			</form>
			<FieldDescription class="px-6 text-center">
				By clicking continue, you agree to our <a href="##">Terms of Service</a> and
				<a href="##">Privacy Policy</a>.
			</FieldDescription>
		</div>
	</div>
</div>
