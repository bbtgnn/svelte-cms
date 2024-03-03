<script lang="ts">
	export let icon: string | undefined = undefined;
</script>

<div class="callout flex items-start gap-3 p-4">
	{#if icon}
		<div class="callout-icon">
			{icon}
		</div>
	{/if}

	<div class="grow">
		<slot />
	</div>
</div>
