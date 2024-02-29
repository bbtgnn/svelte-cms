<script lang="ts">
	import { db } from '$modules';

	import { type BaseRelationTransform } from '$modules/fields';
	import type { CollectionName } from '$modules/database';

	type C = $$Generic<CollectionName>;

	export let relation: BaseRelationTransform<C> | undefined;
</script>

{#if relation}
	<slot relation={db.get_document(relation?.collection, relation.id)} />
{/if}
