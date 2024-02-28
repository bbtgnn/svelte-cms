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
	import type { DocumentName, CollectionName } from '$modules/types';

	//

	export let collection: C;
	export let name: DocumentName<C>;

	//

	const doc = db.get_document(collection, name);

	setContext<DocumentContext>(DocumentContextKey, {
		content: doc?.content
	});
</script>

<slot {doc} />
