import { Type as T, type TAnySchema } from '@sinclair/typebox';
import * as F from './fields';

//

export type CollectionName = 'organizations' | 'work_experiences';

export const collections = {
	organizations: T.Object({
		name: T.String(),
		location: T.String()
	}),

	work_experiences: T.Object({
		date_start: F.DateString('yyyy-MM'),
		date_end: T.Optional(F.DateString('yyyy-MM')),
		current: T.Optional(T.Boolean()),
		organization: F.Relation('organizations')
	})
} satisfies Record<CollectionName, TAnySchema>;

// TODO: crea attraverso funzione per nascondere "satisfies" e altri tipi
