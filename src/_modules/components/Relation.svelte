<script lang="ts">
	import type { Document } from '$modules/types';
	import DocumentComponent from './Document.svelte';

	import type { RelationField } from '$modules/fields';
	import type { CollectionName } from '$modules/database';

	//

	type C = $$Generic<CollectionName>;

	export let to: RelationField<C> | undefined;

	//

	/**
	 * THIS IS A HACK
	 *
	 * Aim: Enforce type-safety when using Relation component
	 * Why it's needed: Forwarding the "doc" slot prop of <DocumentComponent> breaks the type
	 *
	 * Important: All of the parts below are required
	 * 1. let doc variable
	 * 2. function castType
	 * 3. {_const doc} declaration
	 *
	 * The name used in 1. and 3. must match
	 */
	let doc: Document<C>;
	function castType(data: any): Document<C> {
		return data;
	}
</script>

{#if to}
	<DocumentComponent collection={to.collection} name={to.document} let:doc={relation}>
		{@const doc = castType(relation)}
		<slot {doc} />
	</DocumentComponent>
{/if}
