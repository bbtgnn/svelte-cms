<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2021-05',
		date_end: '2022-02',
		employer: 'la-scuola-open-source',
		roles: ['Information manager', 'Project manager']
	});
</script>
