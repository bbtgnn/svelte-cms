<script lang="ts" context="module">
	import { getContext, setContext } from 'svelte';

	type DocumentContext = {
		content: ConstructorOfATypedSvelteComponent | undefined;
	};

	const DocumentContextKey = Symbol('DCK');

	export function getDocumentContext(): DocumentContext {
		return getContext(DocumentContextKey);
	}
</script>

<script lang="ts" generics="C extends CollectionName">
	import { db } from '$modules';
	import type { DocumentName, CollectionName, Document } from '$modules/types';
	import LogBanner from './LogBanner.svelte';

	//

	export let collection: C;
	export let name: DocumentName<C>;

	//

	// * Ugly workaround * //
	const doc = db.get_document(collection, name) as Document<C>;

	setContext<DocumentContext>(DocumentContextKey, {
		content: doc instanceof Error ? undefined : doc?.content
	});
</script>

{#if doc instanceof Error}
	<LogBanner content={doc} />
{:else}
	<slot {doc} />
{/if}
