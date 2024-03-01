<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('education', {
		date_start: '2008-09',
		date_end: '2014-07',
		institution: 'liceo-scientifico-s-simone',
		title: 'Diploma di maturità scientifica',
		description: 'Votazione conseguita di 100/100 con lode'
	});
</script>
