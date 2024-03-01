<script lang="ts">
	import CvCard from '$lib/components/CvCard.svelte';
	import Collection from '$modules/components/Collection.svelte';
	import Relation from '$modules/components/Relation.svelte';
	import { formatDate } from 'date-fns/format';
</script>

<div class="mx-auto max-w-xl space-y-6">
	<h1>Curriculum Vitae</h1>

	<hr />

	<Collection name="education" sort={['date_start', 'desc']} let:documents>
		<div class="space-y-4">
			<h2>Formazione</h2>

			{#each documents as document}
				<Relation to={document.institution} let:doc={institution}>
					<CvCard
						title={document.title}
						subtitle={`${institution.name} (${institution.location})`}
						date_start={formatDate(document.date_start, 'MM/yyyy')}
						current={document.current}
					/>
				</Relation>
			{/each}
		</div>
	</Collection>

	<hr />

	<Collection name="work_experiences" sort={['date_start', 'desc']} let:documents>
		<div class="space-y-4">
			<h2>Esperienze lavorative attuali</h2>

			{#each documents as document}
				{#if document.current}
					<Relation to={document.employer} let:doc={employer}>
						<CvCard
							title={document.roles.join(', ')}
							subtitle={`${employer.name} (${employer.location})`}
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
							subtitle={`${employer.name} (${employer.location})`}
							date_start={formatDate(document.date_start, 'MM/yyyy')}
							date_end={formatDate(document.date_end, 'MM/yyyy')}
						/>
					</Relation>
				{/if}
			{/each}
		</div>
	</Collection>
</div>
