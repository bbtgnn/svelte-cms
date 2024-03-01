<script lang="ts">
	import CvCard from '$lib/components/CvCard.svelte';
	import Collection from '$modules/components/Collection.svelte';
	import Document from '$modules/components/Document.svelte';
	import Relation from '$modules/components/Relation.svelte';
	import { href } from '$modules/utils';
	import { formatDate } from 'date-fns/format';
</script>

<a href={href('/')} class="button">Home</a>

<div class="mx-auto max-w-xl space-y-6">
	<h1>Curriculum Vitae</h1>

	<hr />

	<Collection name="work_experiences" sort={['date_start', 'desc']} let:documents>
		<!--  -->

		<div class="space-y-4">
			<h2>Esperienze lavorative attuali</h2>

			{#each documents as document}
				{#if document.current}
					<Relation to={document.employer} let:doc>
						<CvCard
							title={document.roles.join(', ')}
							subtitle={doc.name}
							date_start={formatDate(document.date_start, 'MM/yyyy')}
							current={document.current}
						/>
					</Relation>
				{/if}
			{/each}
		</div>

		<hr />

		<div class="space-y-4">
			<h2>Esperienze lavorative passate</h2>

			{#each documents as document}
				{#if document.date_end}
					<Relation to={document.employer} let:doc={employer}>
						<CvCard
							title={document.roles.join(', ')}
							subtitle={employer.name}
							date_start={formatDate(document.date_start, 'MM/yyyy')}
							date_end={formatDate(document.date_end, 'MM/yyyy')}
						/>
					</Relation>
				{/if}
			{/each}
		</div>
	</Collection>
</div>
