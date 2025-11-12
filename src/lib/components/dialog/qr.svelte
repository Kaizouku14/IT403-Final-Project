<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.ts';
	import { ScanQrCode } from '@lucide/svelte';
	import { Button, buttonVariants } from '../ui/button';

	let { imageData, format, size } = $props();

	const downloadQr = () => {
		if (!imageData) return;
		const link = document.createElement('a');
		link.href = imageData;
		link.download = `qr-code.${format}`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
</script>

<Dialog.Root>
	<Dialog.Trigger title="Show QR code" class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
		<ScanQrCode class="size-4" />
	</Dialog.Trigger>

	<Dialog.Content
		class="flex w-full flex-col gap-4 rounded-lg bg-background p-6 shadow-lg sm:max-w-sm"
		showCloseButton={false}
	>
		<img
			src={imageData}
			alt={`QR Code (${format}, ${size}px)`}
			class="max-h-80 max-w-full rounded-md border border-muted-foreground"
		/>

		<Dialog.Footer>
			<Button size="sm" onclick={downloadQr}>Download QR</Button>
			<Dialog.Close class={buttonVariants({ variant: 'outline', size: 'sm' })}>Close</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
