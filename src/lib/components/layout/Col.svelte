<script lang="ts">
	export let width = 1;
	export let align: 'top' | 'center' | 'bottom' = 'top';
</script>

<div
	class="relative basis-1"
	style:flex-grow={width}
	class:self-start={align == 'top'}
	class:self-end={align == 'bottom'}
	class:self-center={align == 'center'}
>
	<slot />
</div>
