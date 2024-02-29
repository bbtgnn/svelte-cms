<script lang="ts">
	import Document from './Document.svelte';

	import type { RelationField } from '$modules/fields';
	import type { CollectionName } from '$modules/database';

	//

	type C = $$Generic<CollectionName>;

	export let to: RelationField<C> | undefined;
</script>

{#if to}
	<Document collection={to.collection} name={to.document} let:doc>
		<slot {doc} />
	</Document>
{/if}
