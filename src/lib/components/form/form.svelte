<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema/schema.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { FOLDERS } from '$lib/helper/constant.js';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

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
				<div class="flex items-center gap-2">
					<span class="text-sm text-muted-foreground">sniplink.co/</span>
					<Input {...props} bind:value={$formData.customSlug} placeholder="my-custom-link" />
				</div>
			{/snippet}
		</Form.Control>
		<Form.Description>Custom short link code (optional).</Form.Description>
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

	<Form.Field {form} name="folder">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Folder (optional)</Form.Label>
				<Select.Root type="single" bind:value={$formData.folder} name={props.name}>
					<Select.Trigger class="w-full" {...props}>
						{$formData.folder ? $formData.folder : 'Select a Folder'}
					</Select.Trigger>
					<Select.Content>
						{#each FOLDERS as folder}
							<Select.Item value={folder}>{folder}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.Description>Organize your links (optional).</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<div class="flex w-full justify-end">
		<Form.Button>Submit</Form.Button>
	</div>
</form>
