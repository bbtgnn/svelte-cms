<script lang="ts" context="module">
	import { db } from '$modules';

	export const props = db.create('projects', {});
</script>

<script lang="ts">
	import Content from '$lib/components/layout/Content.svelte';
	import Callout from '$lib/components/layout/Callout.svelte';
	import A from '$lib/components/layout/A.svelte';
	import Columns from '$lib/components/layout/Columns.svelte';
	import Col from '$lib/components/layout/Col.svelte';
	import Line from '$lib/components/layout/Line.svelte';
	import Block from '$lib/components/layout/Block.svelte';
</script>

<Content>
	<Block align="left">ciao</Block>

	<Block class="space-y-4">
		<h1>Reaction–Diffusion</h1>

		<p>
			In occasione della mostra “Il mestiere di grafico – oggi” organizzata da Triennale Milano e
			AIAP, mi è stato proposto (assieme a Roberto Arista) di realizzare un progetto sul tema della
			grafica programmata, in collaborazione con Lanificio Leo.
		</p>

		<Line />

		<p>
			Lanificio Leo è la più antica azienda tessile calabrese, che si è dotata di macchine
			elettroniche per la tessitura automatizzata.
		</p>

		<p>
			L’idea, quindi, era quella di lavorare sull’incontro tra tradizione (della tessitura) e
			modernità (delle macchine elettroniche e della grafica generata al computer).
		</p>
	</Block>

	<Block align="right">
		<img src="./files/arazzi.jpeg" alt="A tile" />
	</Block>

	<Block>
		<p>
			Ciò che accomuna la grafica generativa alla tessitura è quello di essere tecniche “discrete”.
			Non è possibile avere linee continue e sinuose: ogni elemento deve essere disegnato su una
			griglia fissa, utilizzando dei pixel (in un caso) o punti (nell’altro).
		</p>

		<p>
			Pertanto, sia io che Roberto (pur avendo lavorato su direzioni diverse) abbiamo ragionato su
			come valorizzare questo elemento “minimo”.
		</p>
	</Block>

	<Block align="left">
		<img src="./files/reaction-diffusion-1B-05dpi.jpg" alt="" />
	</Block>

	<Block>
		<Line />

		<p>
			L’algoritmo di reazione–diffusione nasce nell’ambito della chimica computazionale per
			descrivere l’interazione tra due reagenti (A e B, nero e bianco).
		</p>

		<p>
			Con il tempo si è scoperto che ha una grande varietà di utilizzi anche in altri ambiti: in
			biologia viene utilizzato per descrivere la maculazione degli animali
			<A href="https://pubmed.ncbi.nlm.nih.gov/12059958/">[→]</A>, la diffusione delle epidemie
			<A href="https://royalsocietypublishing.org/doi/10.1098/rspb.1986.0078">[→]</A>, la crescita
			di tumori <A href="https://doi.org/10.1142%2Fs0218339095000824">[→]</A> e non solo.
		</p>

		<Callout icon="💡">
			Proprio come per la grafica digitale e l’arazzo, lo studio dell’algoritmo avviene su una
			griglia. È stato quindi naturale pensare di “applicarlo” sulla griglia dell’arazzo.
		</Callout>

		<Columns>
			<Col>
				<p>Ogni cella della griglia contiene una certa quantità di reagente A e B.</p>
				<p>
					I reagenti si spostano tra le varie celle e le loro quantità variano secondo determinate
					equazioni.
				</p>
				<p>
					Quando la concentrazione di A in una cella supera B, questa viene colorata di bianco – al
					contrario, di nero.
				</p>
			</Col>

			<Col width={0.5} align="top">
				<img src="./files/rd-grid-cells.png" alt="" />
			</Col>
		</Columns>

		<p>
			Nonostante l’apparente semplicità di queste regole, le variazioni nei parametri delle
			equazioni riescono a generare una grande quantità di effetti visivi.
		</p>

		<Line />

		<p>Con l’algoritmo sono state generate tre immagini, che sono state intessute negli arazzi.</p>
	</Block>

	<Block>
		<Columns>
			<Col>
				<img src="./files/reaction-diffusion-2A-14dpi.bmp" alt="" class="h-auto w-full" />
			</Col>
			<Col width={0.7}>
				<img src="./files/reaction-diffusion-1B-05dpi.bmp" alt="" class="h-auto w-full" />
			</Col>
			<Col>
				<img src="./files/reaction-diffusion-3B-14dpi.bmp" alt="" class="h-auto w-full" />
			</Col>
		</Columns>
	</Block>

	<Block>
		<p>
			Nell’ottica di contrapporre tradizione e modernità, agli arazzi appesi sono stati affiancati
			dei monitor (di dimensione simile) che mostravano l’algoritmo “in movimento”.
		</p>
	</Block>

	<Block>
		<img src="./files/RF2A1969_-__Triennale_Milano_-_foto_Gianluca_Di_Ioia.jpg" alt="" />
	</Block>

	<Block>
		<Columns>
			<Col>
				<video src="./files/video1-exp.mp4" autoplay controls loop></video>
			</Col>
			<Col>
				<video src="./files/video2-exp.mp4" autoplay controls loop></video>
			</Col>
		</Columns>
	</Block>

	<Block>
		<img src="./files/RF2A1963_-__Triennale_Milano_-_foto_Gianluca_Di_Ioia.jpg" alt="" />
	</Block>
</Content>
