<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2021-09',
		date_end: '2021-03', // Note: This might be an error in the document, as the end date is before the start date.
		employer: 'la-scuola-open-source',
		roles: ['Organizzatore di workshop']
	});
</script>
