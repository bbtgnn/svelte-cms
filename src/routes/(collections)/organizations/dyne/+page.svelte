<script lang="ts" context="module">
	// import { asset } from '$lib/utils';
	import logo from './logo.jpeg';

	console.log(logo);

	export const props = {
		name: 'Dyne.org',
		location: 'Amsterdam, Paesi Bassi'
	};
</script>

<p>Mo bellissima dyne</p>

<pre>{JSON.stringify(props, null, 2)}</pre>

<img src={logo} alt="dyne logo" />
