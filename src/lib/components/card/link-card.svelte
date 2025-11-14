<script lang="ts">
	import * as Card from '../ui/card';
	import { Button } from '../ui/button';
	import {
		Copy,
		ChartColumnIncreasing,
		Lock,
		Calendar,
		Clock,
		MousePointerClick,
		Link2
	} from '@lucide/svelte';
	import { cn, formatAgo, isDeadlinePassed } from '$lib/utils';
	import type { Links } from '$lib/interfaces/link.ts';
	import { format } from 'date-fns';
	import { env } from '$env/dynamic/public';
	import { toast } from 'svelte-sonner';
	import QrCode from '$lib/components/dialog/qr.svelte';
	import DeleteLink from '$lib/components/dialog/delete-link.svelte';

	export let links: Links;
	export let slug: string;

	const handleCopy = () => {
		navigator.clipboard.writeText(`${env.PUBLIC_BASE_URL}/${links.shortCode}`);
		toast.success('Link copied to clipboard');
	};

	const isPassed = isDeadlinePassed(links.expireAt);
</script>

<Card.Root
	class="group relative max-w-full cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-background to-background/95 p-5 shadow-2xs transition-all
 duration-300 hover:border-primary/40"
	style={`border-top: 3px solid ${links.folderColor}`}
>
	<div class="absolute top-4 right-4">
		{#if links.isActive}
			<div
				class="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 ring-1 ring-green-500/20"
			>
				<div class="size-1.5 animate-pulse rounded-full bg-green-500"></div>
				Active
			</div>
		{:else}
			<div
				class="flex items-center gap-1.5 rounded-full bg-gray-500/10 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/20"
			>
				<div class="size-1.5 rounded-full bg-gray-500"></div>
				Inactive
			</div>
		{/if}
	</div>

	<Card.Header class="space-y-3 ">
		<div>
			<div class="flex items-start justify-between pr-20">
				<Card.Title
					class="text-xl font-bold text-foreground transition-colors group-hover:text-primary"
				>
					{links.title}
				</Card.Title>
			</div>

			<div class="mt-2 flex items-center gap-2">
				<div class="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 dark:bg-blue-950/30">
					<span class="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">
						{env.PUBLIC_BASE_URL}/{links.shortCode}
					</span>
					<Button
						variant="ghost"
						size="icon"
						onclick={handleCopy}
						class="size-7 hover:bg-blue-100 dark:hover:bg-blue-900/50"
						title="Copy link"
					>
						<Copy class="size-3.5" />
					</Button>
				</div>

				{#if links.protected}
					<div
						class="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
					>
						<Lock class="size-3" />
						Protected
					</div>
				{/if}
			</div>

			<Card.Description class="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
				<Link2 class="size-3 shrink-0" />
				<span class="truncate">{links.destinationUrl}</span>
			</Card.Description>
		</div>
	</Card.Header>

	<div class="flex items-center justify-between border-t border-border/40 px-6 pt-4">
		<div class="flex items-center gap-6">
			<div class="flex items-center gap-2">
				<div class="flex size-10 items-center justify-center rounded-lg bg-primary/10">
					<MousePointerClick class="size-4 text-primary" />
				</div>
				<div>
					<div class="text-lg font-bold text-foreground">{links.noOfClicks}</div>
					<div class="text-xs text-muted-foreground">Total clicks</div>
				</div>
			</div>

			{#if links.expireAt}
				<div class="flex items-center gap-2">
					<div class="flex size-10 items-center justify-center rounded-lg bg-orange-500/10">
						<Clock class="size-4 text-orange-600" />
					</div>
					<div>
						<div
							class={cn('text-sm font-semibold ', isPassed ? 'text-red-600' : 'text-foreground')}
						>
							{format(links.expireAt, 'MMM d, yyyy')}
						</div>
						<div class="text-xs text-muted-foreground">
							{isPassed ? 'Link expired' : 'Expires At'}
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="flex items-center gap-1">
			<Button
				variant="ghost"
				size="icon"
				class="size-9 hover:bg-primary/10 hover:text-primary"
				title="View analytics"
			>
				<ChartColumnIncreasing class="size-4" />
			</Button>
			<QrCode imageData={links.imageData} format={links.format} size={links.size} />
			<DeleteLink folderId={links.folderId} {slug} linkId={links.linksId} name={links.title} />
		</div>
	</div>

	<Card.Footer
		class="flex w-full items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground"
	>
		<span class="flex items-center gap-1.5">
			<Calendar class="size-3" />
			Created {format(links.createdAt, 'MMM d, yyyy')}
		</span>
		{#if links.updatedAt}
			<span class="flex items-center gap-1.5">
				<Clock class="size-3" />
				Updated {formatAgo(links.updatedAt)}
			</span>
		{/if}
	</Card.Footer>
</Card.Root>
