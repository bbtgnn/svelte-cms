<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2015-09',
		date_end: '2016-10',
		employer: 'studio-ardito',
		roles: ['Progettista grafico specializzato in brand identity']
	});
</script>
