<script lang="ts">
	import { Collection, db, Entry, EntryContent } from '$modules';
	import Relation from '$modules/components/Relation.svelte';

	const links = db.get_paths();
</script>

<div class="space-y-2 p-4">
	{#each links as link}
		<a class="link block" href={link}>{link}</a>
	{/each}
</div>

{#await db.get('organizations', 'ff3300') then ff3300}
	{ff3300}
	<EntryContent content={ff3300._content} />
{/await}

<Entry collection="organizations" name="dyne" let:entry>
	<p>{entry.location}</p>
	<EntryContent />
</Entry>

{#await import('$database/organizations/dyne/+page.svelte') then res}
	<svelte:component this={res.default}></svelte:component>
{/await}

<hr />

{#await db.get_collection('work_experiences') then work_experiences}
	<div class="flex gap-2">
		{#each work_experiences as experience}
			<div class="rounded-lg border border-gray-300 p-4">
				{#if experience.current}
					<div>oggi</div>
				{/if}
				{experience.organization}
			</div>
		{/each}
	</div>
{/await}

<Collection name="work_experiences" let:entries>
	<div class="flex gap-2">
		{#each entries as experience}
			<div class="rounded-lg border border-gray-300 p-4">
				{#if experience.current}
					<div>oggi</div>
				{/if}

				<Relation relation={experience.organization} let:relation>
					<pre>{JSON.stringify(relation, null, 2)}</pre>
				</Relation>
			</div>
		{/each}
	</div>
</Collection>
