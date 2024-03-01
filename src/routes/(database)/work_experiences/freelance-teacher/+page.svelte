<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2019-07',
		current: true,
		employer: 'freelance',
		roles: ['Docente in workshop']
	});
</script>
