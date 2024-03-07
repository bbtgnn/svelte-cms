<script lang="ts">
	import { href as hrefAdapter } from '$cms/utils';

	export let href: string;

	let className = '';
	export { className as class };
</script>

<a class={className} href={hrefAdapter(href)}><slot /></a>
