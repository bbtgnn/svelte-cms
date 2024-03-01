<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('organizations', {
		name: 'ISIA Urbino',
		location: 'Urbino, Italia'
	});
</script>
