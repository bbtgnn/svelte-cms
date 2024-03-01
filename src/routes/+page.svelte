<script lang="ts">
	import { Collection, Relation } from '$modules/components';
	import DocumentContent from '$modules/components/DocumentContent.svelte';
	import { db } from '$modules/index';
	import { href } from '$modules/utils';

	const links = db.get_paths();
</script>

<div class="flex">
	<div class="space-y-2 p-4">
		{#each links as link}
			<a class="link block" href={link}>{link}</a>
		{/each}
	</div>

	<div>
		<a href={href('/cv')} class="button">CV</a>

		<Doc collection="organizations" name="dyne" let:doc>
			<pre>{JSON.stringify(doc)}</pre>
			<img alt="ciao" src={doc.props?.logo} />
		</Doc>

		<hr />

		<Collection
			name="work_experiences"
			sort={[
				['current', 'asc'],
				['date_start', 'desc']
			]}
			let:documents
		>
			<div class="flex gap-2">
				{#each documents as experience}
					<div class="rounded-lg border border-gray-300 p-4">
						<!-- TODO: Componente come superdebug di superforms per testare i json, visibile solo in dev -->
						<pre>{JSON.stringify(experience, null, 2)}</pre>

						<Relation to={experience.props?.employer} let:doc>
							<pre>{JSON.stringify(doc, null, 2)}</pre>
							<DocumentContent />
						</Relation>
					</div>
				{/each}
			</div>
		</Collection>
	</div>
</div>
