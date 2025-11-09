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
	import PasswordInput from './password-input.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { pageRoutes, socialProviders } from '$lib/helper/enums';
	import { toast } from 'svelte-sonner';
	import { authClient } from '$lib/auth-client';

	let email = '';
	let password = '';
	let loading = false;

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
				<h1 class="text-xl font-bold">Welcome to VaultTrack .</h1>
				<FieldDescription>
					Don't have an account? <a href={pageRoutes.SIGNUP}>Sign up</a>
				</FieldDescription>
			</div>
			<div class="flex flex-col gap-4">
				<Field>
					<FieldLabel for="email">Email</FieldLabel>
					<Input id="email" type="email" placeholder="m@example.com" bind:value={email} required />
				</Field>
				<Field>
					<div class="flex items-center justify-between">
						<FieldLabel for="password">Password</FieldLabel>
						<a href={pageRoutes.FORGOT_PASSWORD} class="text-sm text-muted-foreground underline">
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
			<Field class="grid gap-4 sm:grid-cols-2">
				<Button variant="outline" type="button" onclick={handleRobloxSignin}>
					<svg
						version="1.1"
						id="svg10"
						x="0px"
						y="0px"
						viewBox="0 0 302.7 302.7"
						width="1.2em"
						height="1.2em"
						fill="currentColor"
						><path
							id="path20"
							d="M120.5,271.7c-110.9-28.6-120-31-119.9-31.5 C0.7,239.6,62.1,0.5,62.2,0.4c0,0,54,13.8,119.9,30.8S302.1,62,302.2,62c0.2,0,0.2,0.4,0.1,0.9c-0.2,1.5-61.5,239.3-61.7,239.5  C240.6,302.5,186.5,288.7,120.5,271.7z M174.9,158c3.2-12.6,5.9-23.1,6-23.4c0.1-0.5-2.3-1.2-23.2-6.6c-12.8-3.3-23.5-5.9-23.6-5.8  c-0.3,0.3-12.1,46.6-12,46.7c0.2,0.2,46.7,12.2,46.8,12.1C168.9,180.9,171.6,170.6,174.9,158L174.9,158z"
						></path></svg
					>
					Continue with Roblox
				</Button>
				<Button variant="outline" type="button" onclick={handleGoogleSignIn}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
							fill="currentColor"
						/>
					</svg>
					Continue with Google
				</Button>
			</Field>
		</FieldGroup>
	</form>
	<FieldDescription class="px-6 text-center">
		By clicking continue, you agree to our <a href="##">Terms of Service</a> and
		<a href="##">Privacy Policy</a>.
	</FieldDescription>
</div>
