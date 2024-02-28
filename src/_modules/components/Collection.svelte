<script lang="ts">
	import { db } from '$modules';
	import type { CollectionName } from '$modules/database';

	//

	type C = $$Generic<CollectionName>;
	export let name: C;
</script>

<slot entries={db.get_collection(name)} />
