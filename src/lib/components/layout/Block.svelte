<script lang="ts">
	const cols = {
		full: [1, 4],
		right: [1, 3],
		left: [2, 4],
		center: [2, 3]
	};

	//

	export let align: keyof typeof cols = 'center';

	let className = '';
	export { className as class };
</script>

<div class="x-block-container">
	<div class="x-block">
		<div
			class={`x-block-content ${className}`}
			style:--col-start={cols[align][0]}
			style:--col-end={cols[align][1]}
		>
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	$w: 600px;

	.x-block-container {
		container: x-block / inline-size;
	}

	.x-block {
		display: grid;
		grid-template-columns: minmax(0, 1fr) $w minmax(0, 1fr);
	}

	@container x-block (width < #{$w}) {
		.x-block {
			display: block;
		}
	}

	.x-block-content {
		grid-column-start: var(--col-start);
		grid-column-end: var(--col-end);
	}
</style>
