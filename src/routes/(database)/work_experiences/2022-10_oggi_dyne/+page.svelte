<script lang="ts" context="module">
	import { db } from '$modules/index';
	import { Document } from '$modules/components';

	export const props = db.create('work_experiences', {
		date_start: '2022-10',
		current: true,
		organization: 'dyne'
	});
</script>

<!-- {#await db.page('work_experiences') then result}
	{#await result.organization.get() then organization}
		{organization.location}
	{/await}
{/await} -->

<Document collection="organizations" name={props.organization.document} let:doc>
	<pre>{JSON.stringify(doc, null, 2)}</pre>
	<!-- <img src={entry.logo} alt="" /> -->
</Document>
