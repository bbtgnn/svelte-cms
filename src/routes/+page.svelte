<script lang="ts">
	import { Collection, Document, Relation } from '$modules/components';
	import { db } from '$modules/index';

	const links = db.get_paths();
	const o = db.get_document('organizations', 'dyne');
	console.log(o);
</script>

<div class="space-y-2 p-4">
	{#each links as link}
		<a class="link block" href={link}>{link}</a>
	{/each}
</div>

<svelte:component this={o.content}></svelte:component>
<pre>{JSON.stringify(o, null, 2)}</pre>

<Document collection="organizations" name="dyne" let:doc>
	<pre>{JSON.stringify(doc)}</pre>
	<img src={doc.props?.logo} />
	<!-- <EntryContent /> -->
</Document>

<hr />

<Collection name="work_experiences" let:entries>
	<div class="flex gap-2">
		{#each entries as experience}
			<div class="rounded-lg border border-gray-300 p-4">
				<pre>{JSON.stringify(experience, null, 2)}</pre>

				<Relation relation={experience.props?.organization} let:relation>
					<pre>{JSON.stringify(relation, null, 2)}</pre>
				</Relation>
			</div>
		{/each}
	</div>
</Collection>
