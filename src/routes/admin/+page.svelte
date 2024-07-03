<script lang="ts">
	import { Schema as S } from '@effect/schema';

	const Person = S.Struct({
		name: S.String,
		age: S.Number
	});

	console.log(Person);
</script>
