<script lang="ts">
	import { db } from '$lib';
</script>

{#await db.collection('work_experiences').get_one('2022-10_oggi_dyne') then res}
	<pre>{JSON.stringify(res, null, 2)}</pre>
{/await}
