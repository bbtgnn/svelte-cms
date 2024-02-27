<script lang="ts">
	import { db, Entry, EntryContent } from '$modules';

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
