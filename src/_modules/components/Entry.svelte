<script lang="ts" context="module">
	import { getContext, setContext } from 'svelte';

	type EntryContext = {
		content: ConstructorOfATypedSvelteComponent;
	};

	const EntryContextKey = Symbol('ECK');

	export function getEntryContext(): EntryContext {
		return getContext(EntryContextKey);
	}
</script>

<script lang="ts">
	import { db } from '$modules';
	import type { CollectionName } from '$modules/database';
	import type { CollectionEntry, EntryResponse } from '$modules/db';
	import TransitionContainer from './TransitionContainer.svelte';

	type C = $$Generic<CollectionName>;

	export let collection: C;
	export let name: CollectionEntry<C>;

	let className = '';
	export { className as class };

	async function loadEntry(collection: C, name: CollectionEntry<C>): Promise<EntryResponse<C>> {
		const entry = await db.get(collection, name);
		return entry;
	}
</script>

{#await loadEntry(collection, name) then entry}
	<TransitionContainer class={className}>
		<slot {entry} />
	</TransitionContainer>
{:catch error}
	<pre>{JSON.stringify(error, null, 2)}</pre>
{/await}
