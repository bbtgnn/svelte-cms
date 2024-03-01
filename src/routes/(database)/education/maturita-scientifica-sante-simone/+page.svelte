<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('education', {
		date_start: '2008-09',
		date_end: '2014-07',
		institution: "Liceo Scientifico 'S. Simone'",
		description: 'Diploma di maturità scientifica, 100/100 e Lode'
	});
</script>
