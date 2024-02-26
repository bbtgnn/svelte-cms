<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('work_experiences', {
		date_start: '2022-10',
		current: true,
		organization: 'dyne'
	});
</script>
