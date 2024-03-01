<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2023-10',
		current: true,
		employer: 'forkbomb',
		roles: ['Sviluppatore web']
	});
</script>
