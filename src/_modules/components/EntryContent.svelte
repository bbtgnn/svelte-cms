<script lang="ts">
	import { getEntryContext } from './Entry.svelte';

	export let content: ConstructorOfATypedSvelteComponent | undefined = undefined;

	const context = getEntryContext();
</script>

{#if content}
	<svelte:component this={content} />
{:else if context && context.content}
	<svelte:component this={context.content} />
{/if}
