<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('work_experiences', {
		date_start: '2016-02',
		current: true,
		employer: 'freelance',
		roles: ['Sviluppatore web', 'Information manager', 'UI/UX designer', 'Progettista grafico']
	});
</script>
