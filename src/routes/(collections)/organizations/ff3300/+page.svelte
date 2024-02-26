<script lang="ts" context="module">
	import { db } from '$lib';

	export const data = db.create('organizations', {
		name: 'Studio FF3300',
		location: 'Bari, Italia'
	});
</script>

<p>Mo bellissima ff</p>
<pre>{JSON.stringify(data, null, 2)}</pre>
