<script lang="ts">
	import type { SortProp } from '$modules/dao/sorting';

	import { db } from '$modules/index';
	import type { CollectionName } from '$modules/database';

	//

	type C = $$Generic<CollectionName>;

	export let name: C;
	export let sort: SortProp<C> | undefined = undefined;
</script>

<slot entries={db.get_collection(name, { sort })} />
