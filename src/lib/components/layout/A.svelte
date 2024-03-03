<script lang="ts">
	export let href: string;
	export let external = false;
</script>

<a {href} class="anchor" target={external ? '_blank' : '_self'}><slot /></a>
