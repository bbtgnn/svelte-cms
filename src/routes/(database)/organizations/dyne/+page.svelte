<script lang="ts" context="module">
	import { db } from '$modules';
	import logo from './logo.jpeg';

	export const data = db.create('organizations', {
		name: 'Dyne.org',
		location: 'Amsterdam, Paesi Bassi',
		logo
	});
</script>

<p>Mo bellissima dyne</p>
<img src={logo} alt="dyne logo" />
