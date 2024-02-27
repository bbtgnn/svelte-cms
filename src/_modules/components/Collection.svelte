<script lang="ts">
	import { db } from '$modules';
	import type { CollectionName } from '$modules/database';

	type C = $$Generic<CollectionName>;
	export let name: C;
</script>

{#await db.get_collection(name) then entries}
	<slot {entries} />
{/await}
