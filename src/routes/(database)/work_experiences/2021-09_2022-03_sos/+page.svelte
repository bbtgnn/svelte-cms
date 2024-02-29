<script lang="ts" context="module">
	import { db } from '$modules';

	export const data = db.create('work_experiences', {
		date_start: '2021-09',
		date_end: '2022-03',
		current: false,
		organization: 'freelance'
	});
</script>
