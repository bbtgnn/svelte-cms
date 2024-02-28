<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('organizations', {
		name: 'La Scuola Open Source',
		location: 'Bari, Italia'
	});
</script>

<p>Mo bellissima la sos</p>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
