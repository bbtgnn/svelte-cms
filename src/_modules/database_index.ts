import { Type as T } from '@sinclair/typebox';

export const database_index_schema = T.Object({
	education: T.Union([T.Literal('maturita-scientifica-sante-simone'), T.Literal('triennio-isia-urbino')]),
	organizations: T.Union([T.Literal('axant'), T.Literal('dyne'), T.Literal('ff3300'), T.Literal('forkbomb'), T.Literal('freelance'), T.Literal('la-scuola-open-source'), T.Literal('studio-ardito')]),
	projects: T.Union([T.Literal('join'), T.Literal('reaction-diffusion'), T.Literal('scabec'), T.Literal('signroom')]),
	work_experiences: T.Union([T.Literal('axant-ui-designer.svelte'), T.Literal('developer-dyne'), T.Literal('developer-forkbomb'), T.Literal('developer-sos'), T.Literal('ff3300-developer'), T.Literal('freelance-multi'), T.Literal('freelance-teacher'), T.Literal('sos-information-manager'), T.Literal('sos-workshop-organizer'), T.Literal('studio-ardito-designer')])
})

export const database_index = {
  "education": [
    "maturita-scientifica-sante-simone",
    "triennio-isia-urbino"
  ],
  "organizations": [
    "axant",
    "dyne",
    "ff3300",
    "forkbomb",
    "freelance",
    "la-scuola-open-source",
    "studio-ardito"
  ],
  "projects": [
    "join",
    "reaction-diffusion",
    "scabec",
    "signroom"
  ],
  "work_experiences": [
    "axant-ui-designer.svelte",
    "developer-dyne",
    "developer-forkbomb",
    "developer-sos",
    "ff3300-developer",
    "freelance-multi",
    "freelance-teacher",
    "sos-information-manager",
    "sos-workshop-organizer",
    "studio-ardito-designer"
  ]
} as const