<script>
	export let disco;
	export let durata;
	export let anno;
	export let artista;

	export let image;
</script>

<div class="card_musica">
	<img class="card_musica__immagine" src={image} alt="Copertina del disco" />

	<div class="card_musica__centro">
		<p>{artista}</p>
		<p class="card_musica__disco">{disco}</p>
	</div>

	<div class="card_musica__footer">
		<p>{durata}</p>
		<p>{anno}</p>
	</div>
</div>

<style>
	.card_musica {
		background-color: pink;
		width: 300px;
		border-radius: 20px;
		padding: 20px;
		color: white;
		font-family: sans-serif;
	}

	.card_musica__disco {
		font-size: 25px;
	}

	.card_musica__immagine {
		object-fit: cover;
		aspect-ratio: 1;
		width: 100%;
		border-radius: 10px;
	}

	.card_musica__centro {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.card_musica__footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
