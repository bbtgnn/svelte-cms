<script lang="ts">
	import Navbar from '$components/Navbar.svelte';
	import '../app.pcss';
</script>

<Navbar />

<div class="pt-8">
	<slot />
</div>
