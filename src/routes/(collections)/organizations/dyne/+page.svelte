<script lang="ts" context="module">
	// import {c} from '$lib/index'
	// import { asset } from '$lib/utils';
	// import logo from './logo.jpeg';

	// console.log(logo);

	export const props = {
		name: 'Dyne.org',
		location: 'Amsterdam, Paesi Bassi'
	};

	import { db } from '$lib';
</script>

<p>Mo bellissima dyne</p>

<pre>{JSON.stringify(props, null, 2)}</pre>

<img src="./logo.jpeg" alt="dyne logo" />

{#await db.collection('organizations').get_one('dyne') then res}
	<pre>{JSON.stringify(res, null, 2)}</pre>
{/await}
