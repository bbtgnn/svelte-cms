<script lang="ts">
	import { type BaseRelationTransform } from '$modules/fields';
	import type { CollectionName } from '$modules/database';

	type C = $$Generic<CollectionName>;

	export let relation: BaseRelationTransform<C>;
</script>

{#await relation.get() then relation}
	<slot {relation} />
{/await}
