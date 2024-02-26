<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('work_experiences', {
		date_start: '2021-05',
		current: true,
		organization: 'sos'
	});
</script>
