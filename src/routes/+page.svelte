<script lang="ts">
	import { db } from '$lib/index';
	import { pipe, flow, ReadonlyArray as A, ReadonlyRecord as R, String as S } from 'effect';

	const links = pipe(
		db.get_entries_loaders(),
		R.toEntries,
		A.map(([entry_path]) => entry_path),
		A.map(flow(S.replace('/+page.svelte', ''), S.replace('./', '/')))
	);
</script>

<div class="space-y-2 p-4">
	{#each links as link}
		<a class="anchor block" href={link}>{link}</a>
	{/each}
</div>
