<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('work_experiences', {
		date_start: '2019-07',
		current: true,
		organization: 'freelance'
	});
</script>
