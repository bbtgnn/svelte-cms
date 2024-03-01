<script lang="ts">
	import Collection from '$modules/components/Collection.svelte';
	import Relation from '$modules/components/Relation.svelte';
	import { href } from '$modules/utils';
	import { formatDate } from 'date-fns/format';
</script>

<a href={href('/')} class="button">Home</a>

<Collection name="work_experiences" sort={['date_start', 'desc']} let:documents>
	<div class="flex flex-col">
		<h1>Esperienze lavorative attuali</h1>
		{#each documents as document}
			{#if document.props?.current}
				<div class="rounded-xl border border-stone-300 p-4">
					<p>{document.props.roles.join(', ')}</p>
					<Doc
						collection={document.props.employer.collection}
						name={document.props.employer.document}
						let:doc
					>
						<p>{doc.props?.name}</p>
					</Doc>
					<p>
						<span>
							{formatDate(document.props.date_start, 'MM / yyyy')}
						</span>
						<span>-></span>
						<span> oggi </span>
					</p>
				</div>
				<Doc collection="education" name="triennio-isia-urbino"></Doc>
			{/if}
		{/each}

		<h1>Esperienze lavorative passate</h1>
		{#each documents as document}
			{#if document.props?.date_end}
				<div class="rounded-xl border border-stone-300 p-4">
					<p>{document.props.roles.join(', ')}</p>
					<Doc collection="organizations" name={document.props.employer.document} let:doc>
						<p>{doc.props?.name}</p>
					</Doc>
					<p>
						<span>
							{formatDate(document.props.date_start, 'MM / yyyy')}
						</span>
						<span>-></span>
						<span> oggi </span>
					</p>
				</div>
				<!-- <pre>{JSON.stringify(document, null, 2)}</pre> -->
			{/if}
		{/each}
	</div>
</Collection>
