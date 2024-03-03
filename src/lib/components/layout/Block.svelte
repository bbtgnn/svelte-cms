<script lang="ts">
	export let width = 1;

	let className = '';
	export { className as class };

	//

	const default_width = 600;
	$: calc_width = `${default_width * width}px`;
</script>

<div class={className}>
	<div
		class="relative mx-auto flex max-w-xl flex-col items-start gap-4 px-4"
		style:max-width={calc_width}
	>
		<slot />
	</div>
</div>
