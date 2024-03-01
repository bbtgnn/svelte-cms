<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2020-10',
		date_end: '2021-04',
		employer: 'ff3300',
		roles: ['Sviluppatore web', 'Creative coder']
	});
</script>
