import { Type as T } from '@sinclair/typebox';
import * as F from './fields';
import type { CollectionLoader } from './database';

//

export type CollectionName = 'organizations' | 'work_experiences';

export const collections = {
	// Due sorgenti:

	// 1. Il contenuto del file
	organizations: {
		loader: () => import.meta.glob('./organizations/*/+page.svelte'),
		filename_schema: T.Object({}),
		content_schema: T.Object({
			props: T.Object({
				name: T.String(),
				location: T.String()
			})
		})
	},

	// 2. Il nome del file
	work_experiences: {
		loader: () => import.meta.glob('./work_experiences/*/+page.svelte'),
		filename_schema: T.Object({
			date_start: F.DateString('yyyy_MM'),
			date_end: T.Union([F.DateString('yyyy_MM'), T.Literal('oggi')]),
			organizations: F.Relation('organizations')
		}),
		content_schema: T.Object({})
	}
} satisfies Record<CollectionName, CollectionLoader>;

// TODO: crea attraverso funzione per nascondere "satisfies" e altri tipi
