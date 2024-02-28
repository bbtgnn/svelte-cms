<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('organizations', {
		name: 'Freelance',
		location: 'Bari, Italia'
	});
</script>

<p>Mo bellissimo il freelance</p>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
