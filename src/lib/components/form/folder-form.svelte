<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';
	import { formSchema, type FormSchema } from '$lib/components/schema/folder.ts';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { Spinner } from '$lib/components/ui/spinner';
	import { FolderPlus } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '../ui/button';
	import * as Dialog from '../ui/dialog';
	import { Textarea } from '../ui/textarea';
	import { cn } from '$lib/utils';

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
			toast.error(result.error.message);
		}
	});

	let colorInput: HTMLInputElement;

	const { form: formData, enhance, submitting } = form;
</script>

<!-- Not bindable, I handle it manually via onOpenChange -->
<Dialog.Root {open} onOpenChange={(e) => (open = e.valueOf())}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<FolderPlus class="size-4" />
		<span class="font-bold">Create Folder</span>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title>Create Folder</Dialog.Title>
			<Dialog.Description>
				Fill in all the required details to create your folder.
			</Dialog.Description>
		</Dialog.Header>

		<form method="POST" use:enhance class="space-y-5">
			<Form.Field {form} name="folder">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Folder</Form.Label>
						<Input
							{...props}
							type="text"
							bind:value={$formData.folder}
							placeholder="Enter folder"
						/>
					{/snippet}
				</Form.Control>
				<Form.Description>Enter a name for your folder.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="description">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Description (optional)</Form.Label>
						<Textarea
							{...props}
							bind:value={$formData.description}
							placeholder="Enter description"
							class="max-h-40 w-full wrap-break-word"
						/>
					{/snippet}
				</Form.Control>
				<Form.Description>Enter a description for your folder.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="color">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Pick a Color (optional)</Form.Label>
						<div class="flex items-center gap-3">
							<Button
								variant="ghost"
								size="sm"
								class={cn('relative size-10  rounded-xl', `bg-${$formData.color}`)}
								onclick={() => colorInput.click()}
							>
								<input
									bind:this={colorInput}
									type="color"
									{...props}
									bind:value={$formData.color}
									class="absolute size-10"
								/>
							</Button>
							<span class="text-muted-foreground">{$formData.color}</span>
						</div>
					{/snippet}
				</Form.Control>
				<Form.Description>Select a color for your folder.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button
				class="w-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
				disabled={$submitting}
			>
				{#if $submitting}
					<Spinner />
					Submitting...
				{:else}
					<span>Submit</span>
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
