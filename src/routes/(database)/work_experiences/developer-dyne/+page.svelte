<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2022-10',
		current: true,
		employer: 'dyne',
		roles: ['Sviluppatore web']
	});
</script>
