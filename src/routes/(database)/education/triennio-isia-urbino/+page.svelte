<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('education', {
		date_start: '2016-09',
		date_end: '2020-07',
		institution: 'isia-urbino',
		title: 'Laurea triennale in progettazione grafica e comunicazione visiva',
		description: 'Laurea conseguita con votazione di 110/110 e Lode'
	});
</script>
