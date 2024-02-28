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
	import type { CollectionEntry } from '$modules/db';

	type C = $$Generic<CollectionName>;

	export let collection: C;
	export let name: CollectionEntry<C>;

	const entry = db.get(collection, name);
	setContext<EntryContext>(EntryContextKey, {
		content: entry._content
	});
</script>

<slot {entry} />
