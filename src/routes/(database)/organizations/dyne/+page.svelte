<script lang="ts" context="module">
	import { db } from '$modules';
	import { Document } from '$modules/components';
	import logo from './logo.jpeg';

	export const props = db.create('organizations', {
		name: 'Dyne.org',
		location: 'Amsterdam, Paesi Bassi',
		logo
	});
</script>

<p>Mo bellissima dyne</p>
<img src="./logo.jpeg" alt="dyne logo" />

<Document collection="organizations" name="freelance" let:doc>
	<pre>{JSON.stringify(doc, null, 2)}</pre>
</Document>
<img src={logo} alt="dyne logo" />
