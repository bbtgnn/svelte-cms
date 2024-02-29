<script lang="ts">
	import { db } from '$modules/index';
</script>

<!-- {#await db.page('work_experiences') then page}
	<pre>{JSON.stringify(page, null, 2)}</pre>
{/await} -->

<slot />
