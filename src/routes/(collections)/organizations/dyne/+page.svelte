<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('organizations', {
		name: 'Dyne.org',
		location: 'Amsterdam, Paesi Bassi'
	});
</script>

<p>Mo bellissima dyne</p>

<pre>{JSON.stringify(data, null, 2)}</pre>

<img src="./logo.jpeg" alt="dyne logo" />

{#await db.get('organizations', 'dyne') then res}
	<pre>{JSON.stringify(res, null, 2)}</pre>
{:catch e}
	<pre>{JSON.stringify(e)}</pre>
{/await}
