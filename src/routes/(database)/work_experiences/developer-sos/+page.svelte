<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2021-05',
		current: true,
		employer: 'la-scuola-open-source',
		roles: ['Sviluppatore web']
	});
</script>
