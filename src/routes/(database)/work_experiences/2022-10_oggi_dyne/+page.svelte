<script lang="ts" context="module">
	import { db } from '$modules/index';

	export const props = db.create('work_experiences', {
		date_start: '2022-10',
		current: true,
		organization: 'ff3300'
	});
</script>

<!-- {#await db.page('work_experiences') then result}
	{#await result.organization.get() then organization}
		{organization.location}
	{/await}
{/await} -->
