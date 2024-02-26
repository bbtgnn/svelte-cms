<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('work_experiences', {
		date_start: '2022-10',
		current: true,
		organization: 'dyne'
	});
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>

<hr />

{#await db.get('work_experiences', '2022-10_oggi_dyne') then experience}
	{#await experience.organization.get() then organization}
		<pre>{JSON.stringify(organization, null, 2)}</pre>
	{/await}
	{experience.organization}
	<pre>{JSON.stringify(experience, null, 2)}</pre>
{:catch e}
	<pre>{JSON.stringify(e, null, 2)}</pre>
{/await}
