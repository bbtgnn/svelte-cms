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
		// TODO - this union doesn't work with static decode!
		date_end: T.Union([F.DateString('yyyy-MM'), T.Literal('oggi')]),
		organization: F.Relation('organizations')
	})
} satisfies Record<CollectionName, TAnySchema>;

// TODO: crea attraverso funzione per nascondere "satisfies" e altri tipi
