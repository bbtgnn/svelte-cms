<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('organizations', {
		name: 'Liceo Scientifico Sante Simone',
		location: 'Conversano, Italia'
	});
</script>
