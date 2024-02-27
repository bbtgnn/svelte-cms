<script lang="ts" context="module">
	import { db } from '$modules';

	export const data = db.create('organizations', {
		name: 'Dyne.org',
		location: 'Amsterdam, Paesi Bassi'
	});
</script>

<p>Mo bellissima dyne</p>
<img src="./logo.jpeg" alt="dyne logo" />
