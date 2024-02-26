<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('work_experiences', {
		date_start: '2019-07',
		date_end: 'oggi',
		organization: 'freelance'
	});
</script>
