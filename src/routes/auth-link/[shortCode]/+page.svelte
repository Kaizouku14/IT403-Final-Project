<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { Lock } from '@lucide/svelte';

	export let data: { form: SuperValidated<Infer<FormSchema>> };

	const form = superForm(data.form, {
		validators: zod4Client(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<svelte:head>
	<title>Protected Link</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-secondary/5 px-4 py-8"
>
	<div class="w-full max-w-sm space-y-8">
		<div class="space-y-3 text-center">
			<div class="flex justify-center">
				<div class="rounded-full bg-primary/10 p-3">
					<Lock class="h-6 w-6 text-primary" />
				</div>
			</div>
			<h1 class="text-3xl font-bold text-foreground">Protected Link</h1>
			<p class="text-base text-muted-foreground">
				This link is password protected. Enter the password to continue.
			</p>
		</div>

		<div class="rounded-lg border border-border/50 bg-card shadow-lg backdrop-blur-sm">
			<div class="space-y-6 p-6 sm:p-8">
				<form method="POST" use:enhance class="space-y-5">
					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Password</Form.Label>
								<Input
									{...props}
									type="password"
									bind:value={$formData.password}
									placeholder="Enter password"
									class="bg-input pr-10 text-sm"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Button
						class="w-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
					>
						Submit
					</Form.Button>
				</form>

				<div class="rounded-lg bg-accent/10 p-4">
					<p class="text-xs text-accent-foreground/70">
						Your password is encrypted and secure. We never store or log your passwords.
					</p>
				</div>
			</div>
		</div>

		<p class="text-center text-xs text-muted-foreground">
			Protected by Sniplink • All Rights Reserved
		</p>
	</div>
</div>
