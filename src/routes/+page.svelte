<script lang="ts">
	import { db } from '$modules/index';
	import { onMount } from 'svelte';

	// const links = db.get_paths();
	const o = db.get_document('organizations', 'dyne');
	console.log(o);
</script>

<!-- <div class="space-y-2 p-4">
	{#each links as link}
		<a class="link block" href={link}>{link}</a>
	{/each}
</div> -->

<!-- <svelte:component this={o.content}></svelte:component>
<pre>{JSON.stringify(o, null, 2)}</pre> -->
<!--

<Entry collection="organizations" name="dyne" let:entry>
	<pre>{JSON.stringify(entry)}</pre>
	<EntryContent />
</Entry>

<hr />

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
</Collection> -->
