<script lang="ts">
	import Collection from '$modules/components/Collection.svelte';
	import Document from '$modules/components/Document.svelte';
	import Relation from '$modules/components/Relation.svelte';
	import { href } from '$modules/utils';
	import { formatDate } from 'date-fns/format';
</script>

<a href={href('/')} class="button">Home</a>

<Collection name="work_experiences" sort={['date_start', 'desc']} let:documents>
	<!--  -->

	<h1>Esperienze lavorative attuali</h1>

	{#each documents as document}
		{#if document.current}
			<div class="rounded-xl border border-stone-300 p-4">
				<p>{document.roles.join(', ')}</p>
				<Document
					collection={document.employer.collection}
					name={document.employer.document}
					let:doc
				>
					<p>{doc.name}</p>
				</Document>
				<p>
					<span>
						{formatDate(document.date_start, 'MM / yyyy')}
					</span>
					<span>-></span>
					<span> oggi </span>
				</p>
			</div>
		{/if}
	{/each}

	<!--  -->

	<h1>Esperienze lavorative passate</h1>

	{#each documents as document}
		{#if document.date_end}
			<div class="rounded-xl border border-stone-300 p-4">
				<p>{document.roles.join(', ')}</p>
				<Relation to={document.employer} let:doc>
					<p>{doc.location}</p>
				</Relation>

				<p>
					<span>
						{formatDate(document.date_start, 'MM / yyyy')}
					</span>
					<span>-></span>
					<span> oggi </span>
				</p>
			</div>
		{/if}
	{/each}
</Collection>
