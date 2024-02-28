<script lang="ts">
	import TransitionContainer from './TransitionContainer.svelte';

	import { type BaseRelationTransform } from '$modules/fields';
	import type { CollectionName } from '$modules/database';

	type C = $$Generic<CollectionName>;

	export let relation: BaseRelationTransform<C>;

	let className = '';
	export { className as class };
</script>

{#await relation.get() then relation}
	<TransitionContainer class={className}>
		<slot {relation} />
	</TransitionContainer>
{/await}
