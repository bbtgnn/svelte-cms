<script lang="ts" context="module">
	import { db } from '$modules';

	export const data = db.create('organizations', {
		name: 'Dyne.org',
		location: 'Amsterdam, Paesi Bassi'
	});
</script>

<p>Mo bellissima dyne</p>

{#await db.get('organizations', 'dyne') then res}
	<pre>{JSON.stringify(res, null, 2)}</pre>
{:catch e}
	<pre>{JSON.stringify(e)}</pre>
{/await}

<img src="./logo.jpeg" alt="dyne logo" />
