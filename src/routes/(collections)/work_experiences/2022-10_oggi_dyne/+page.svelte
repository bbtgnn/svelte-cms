<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('work_experiences', {
		date_start: '2022-10',
		date_end: 'oggi',
		organization: 'dyne'
	});
</script>

{#await db.get('work_experiences', '2022-10_oggi_dyne') then res}
	<pre>{JSON.stringify(res, null, 2)}</pre>
{/await}
