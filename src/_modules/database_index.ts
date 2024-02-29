import { Type as T } from '@sinclair/typebox';

export const database_index_schema = T.Object({
	organizations: T.Union([T.Literal('dyne'), T.Literal('ff3300'), T.Literal('freelance'), T.Literal('la-scuola-open-source')]),
	projects: T.Union([T.Literal('join'), T.Literal('reaction-diffusion'), T.Literal('scabec'), T.Literal('signroom')]),
	work_experiences: T.Union([T.Literal('2019-07_oggi_freelance_docente'), T.Literal('2021-05_oggi_sos'), T.Literal('2021-09_2022-03_sos'), T.Literal('2022-10_oggi_dyne')])
})

export const database_index = {
  "organizations": [
    "dyne",
    "ff3300",
    "freelance",
    "la-scuola-open-source"
  ],
  "projects": [
    "join",
    "reaction-diffusion",
    "scabec",
    "signroom"
  ],
  "work_experiences": [
    "2019-07_oggi_freelance_docente",
    "2021-05_oggi_sos",
    "2021-09_2022-03_sos",
    "2022-10_oggi_dyne"
  ]
} as const