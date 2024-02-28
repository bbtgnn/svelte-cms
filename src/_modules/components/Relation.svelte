<script lang="ts">
	import TransitionContainer from './TransitionContainer.svelte';

	// import { type BaseRelationTransform } from '$modules/fields';
	import type { CollectionName } from '$modules/database';

	type C = $$Generic<CollectionName>;

	export let relation: unknown;
	// export let relation: BaseRelationTransform<C>;
	relation;
</script>

<!-- {#await relation.get() then relation}
	<TransitionContainer class={className}>
		<slot {relation} />
	</TransitionContainer>
{/await} -->
