<script lang="ts">
	import { fly } from 'svelte/transition';

	let className = '';
	export { className as class };
</script>

<div transition:fly class={className}>
	<slot />
</div>
