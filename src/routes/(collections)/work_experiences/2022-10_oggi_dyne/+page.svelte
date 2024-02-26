<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('work_experiences', {
		date_start: '2022-10',
		current: true,
		organization: 'dynddse'
	});
</script>

{#await db.page('work_experiences') then result}
	{#await result.organization.get() then organization}
		{organization.location}
	{/await}
{/await}
