<script lang="ts">
	import { getDocumentContext } from './Document.svelte';

	export let content: ConstructorOfATypedSvelteComponent | undefined = undefined;

	const context = getDocumentContext();
</script>

{#if content}
	<svelte:component this={content} />
{:else if context && context.content}
	<svelte:component this={context.content} />
{/if}
