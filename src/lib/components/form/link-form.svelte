<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.ts';
	import * as Dialog from '$lib/components/ui/dialog/index.ts';
	import { Spinner } from '$lib/components/ui/spinner/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';
	import { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { InfoIcon, PlusIcon } from '@lucide/svelte';
	import { formSchema, type FormSchema } from '../schema/create-link.ts';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as InputGroup from '$lib/components/ui/input-group/index.ts';
	import * as Popover from '$lib/components/ui/popover/index.ts';

	let data: { form: SuperValidated<Infer<FormSchema>> } = $props();
	let open = $state(false);
	const form = superForm(data.form, {
		validators: zod4Client(formSchema),
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				open = false;
				toast.success('Folder Created Succesfully');
			}
		},
		onError: ({ result }) => {
			toast.success(result.error.message);
		}
	});
	const { form: formData, enhance, submitting } = form;
</script>

<!-- Not bindable, I handle it manually via onOpenChange -->
<Dialog.Root {open} onOpenChange={(e) => (open = e.valueOf())}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<PlusIcon class="size-4" />
		<span class="hidden font-bold md:flex">Create Link</span>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create Short Link</Dialog.Title>
			<Dialog.Description>
				Fill in the URL and optional details to create your short link.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" use:enhance class="space-y-4">
			<Form.Field {form} name="destinationUrl">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Destination Url</Form.Label>
						<Input
							{...props}
							bind:value={$formData.destinationUrl}
							placeholder="https://example.com/your-long-url"
						/>
					{/snippet}
				</Form.Control>
				<Form.Description>Where your short link will redirect.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="customSlug">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Custom Slug (optional)</Form.Label>

						<InputGroup.Root>
							<Popover.Root>
								<Popover.Trigger>
									{#snippet child({ props })}
										<InputGroup.Addon>
											<InputGroup.Button {...props} variant="secondary" size="icon-xs">
												<InfoIcon />
											</InputGroup.Button>
										</InputGroup.Addon>
									{/snippet}
								</Popover.Trigger>
								<Popover.Content
									align="start"
									class="flex flex-col gap-1 rounded-xl text-sm leading-relaxed"
								>
									<p class="font-medium text-foreground">
										Set a <span class="font-semibold text-primary">custom slug</span> for your link.
									</p>
									<p>
										Keep it short and catchy.
										<span class="font-semibold text-muted-foreground"
											>Custom domains coming soon!</span
										>
									</p>
								</Popover.Content>
							</Popover.Root>
							<InputGroup.Addon class="pl-1.5 text-muted-foreground">
								<InputGroup.Text>zynkly.vercel.app/</InputGroup.Text>
							</InputGroup.Addon>
							<InputGroup.Input
								{...props}
								bind:value={$formData.customSlug}
								placeholder="my-custom-link"
							/>
							<InputGroup.Addon align="inline-end"></InputGroup.Addon>
						</InputGroup.Root>
					{/snippet}
				</Form.Control>
				<Form.Description>Custom short link code.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="title">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Title</Form.Label>
						<Input {...props} bind:value={$formData.title} placeholder="Link description" />
					{/snippet}
				</Form.Control>
				<Form.Description>Short label for your link.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password (optional)</Form.Label>
						<Input
							{...props}
							type="password"
							bind:value={$formData.password}
							placeholder="••••••••"
						/>
					{/snippet}
				</Form.Control>
				<Form.Description>Enter a name for your folder.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex w-full justify-end">
				<Form.Button disabled={$submitting} class="w-24">
					{#if $submitting}
						<Spinner />
					{:else}
						<span>Submit</span>
					{/if}
				</Form.Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
