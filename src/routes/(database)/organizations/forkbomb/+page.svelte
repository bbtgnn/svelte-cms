<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('organizations', {
		name: 'Forkbomb b.V.',
		location: 'Amsterdam, Paesi Bassi'
	});
</script>
