<script lang="ts">
	import { db } from '$lib/index';

	const links = db.get_paths();
</script>

<div class="space-y-2 p-4">
	{#each links as link}
		<a class="link block" href={link}>{link}</a>
	{/each}
</div>
