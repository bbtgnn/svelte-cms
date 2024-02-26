<script lang="ts">
	import { db } from '$lib';
</script>

{#await db.page('work_experiences') then page}
	<pre>{JSON.stringify(page, null, 2)}</pre>
{/await}

<slot />
