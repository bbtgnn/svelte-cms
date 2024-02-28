<script lang="ts">
	import { db } from '$modules';
	import type { CollectionName } from '$modules/database';
	import TransitionContainer from './TransitionContainer.svelte';

	//

	type C = $$Generic<CollectionName>;
	export let name: C;

	let className = '';
	export { className as class };
</script>

{#await db.get_collection(name) then entries}
	<TransitionContainer class={className}>
		<slot {entries} />
	</TransitionContainer>
{/await}
