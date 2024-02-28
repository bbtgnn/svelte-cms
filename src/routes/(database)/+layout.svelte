<script>
	import { href } from '$modules/utils';
</script>

<div class="bg-stone-100 p-4">
	<a class="link" href={href('/')}>← Home</a>
</div>

<div class="p-4">
	<slot />
</div>
