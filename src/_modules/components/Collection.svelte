<script lang="ts">
	import { db } from '$modules/index';
	import type { CollectionName } from '$modules/database';
	import type { SortProp } from '$modules/db';

	//

	type C = $$Generic<CollectionName>;

	export let name: C;
	export let sort: SortProp<C> | undefined = undefined;
</script>

<slot entries={db.get_collection(name, { sort })} />
