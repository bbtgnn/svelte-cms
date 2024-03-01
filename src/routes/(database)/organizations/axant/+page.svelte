<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('organizations', {
		name: 'Axant',
		location: 'Milano, Italia'
	});
</script>
