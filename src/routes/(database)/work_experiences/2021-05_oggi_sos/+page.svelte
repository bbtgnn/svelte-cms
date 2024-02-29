<script lang="ts" context="module">
	import { db } from '$modules/index';

	export const props = db.create('work_experiences', {
		date_start: '2021-05',
		current: true,
		organization: 'la-scuola-open-source'
	});
</script>
