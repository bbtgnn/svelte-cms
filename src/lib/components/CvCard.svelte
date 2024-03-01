<script lang="ts">
	export let title: string | undefined = undefined;
	export let subtitle: string | undefined = undefined;

	export let date_start: string | undefined = undefined;
	export let date_end: string | undefined = undefined;
	export let current: boolean | undefined = undefined;
</script>

<div>
	{#if title}
		<p class="font-semibold">{title}</p>
	{/if}
	{#if subtitle}
		<p>{subtitle}</p>
	{/if}
	{#if date_start || date_end}
		<p>
			{#if date_start}
				<span>{date_start}</span>
			{/if}
			{#if date_start && (date_end || current)}
				<span>→</span>
			{/if}
			{#if date_end}
				<span>{date_end}</span>
			{/if}
			{#if current}
				<span>oggi</span>
			{/if}
		</p>
	{/if}

	<slot />
</div>
