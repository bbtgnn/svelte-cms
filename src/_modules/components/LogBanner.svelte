<script lang="ts">
	import { dev } from '$app/environment';
	import { config } from '$modules/config';

	//

	export let content: Error | undefined = undefined;

	export let name = 'Default log name';
	export let message = 'Default log message';

	if (content instanceof Error) {
		name = content.name;
		message = content.message;
	}
</script>

{#if dev || $config.showLogBanners}
	<div class="max-h-80 overflow-scroll border border-stone-300 bg-stone-100 p-4 text-stone-800">
		<p class="mb-4 font-bold">{name}</p>
		<pre>{message.trim()}</pre>
	</div>
{/if}
