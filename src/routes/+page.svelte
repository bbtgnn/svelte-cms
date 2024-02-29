<script lang="ts">
	import { Collection, Document, Relation } from '$modules/components';
	import DocumentContent from '$modules/components/DocumentContent.svelte';
	import { db } from '$modules/index';

	const links = db.get_paths();
</script>

<div class="space-y-2 p-4">
	{#each links as link}
		<a class="link block" href={link}>{link}</a>
	{/each}
</div>

<Document collection="organizations" name="dyne" let:doc>
	<pre>{JSON.stringify(doc)}</pre>
	<img alt="ciao" src={doc.props?.logo} />
	<!-- <EntryContent /> -->
</Document>

<hr />

<Collection
	name="work_experiences"
	sort={[
		['current', 'asc'],
		['date_start', 'desc']
	]}
	let:entries
>
	<div class="flex gap-2">
		{#each entries as experience}
			<div class="rounded-lg border border-gray-300 p-4">
				<pre>{JSON.stringify(experience, null, 2)}</pre>

				<Relation to={experience.props?.organization} let:doc>
					<pre>{JSON.stringify(doc, null, 2)}</pre>
					<DocumentContent />
				</Relation>
			</div>
		{/each}
	</div>
</Collection>
