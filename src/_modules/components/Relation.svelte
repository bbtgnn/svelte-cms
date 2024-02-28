<script lang="ts">
	import { db } from '$modules';

	import { type BaseRelationTransform } from '$modules/fields';
	import type { CollectionName } from '$modules/database';

	type C = $$Generic<CollectionName>;

	export let relation: BaseRelationTransform<C>;

	console.log(relation);
	const rel = db.get(relation.collection, relation.id);
	// const rel = undefined;
</script>

<slot relation={rel} />
