<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('organizations', {
		name: 'Studio di Architettura Francesco Ardito',
		location: 'Polignano a Mare, Italia'
	});
</script>
