<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2021-07',
		date_end: '2021-11',
		employer: 'axant',
		roles: ['UI/UX designer']
	});
</script>
