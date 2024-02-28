import { formatDate } from 'date-fns/format';
import { Type as T } from '@sinclair/typebox';
import { database_index, database_index_schema } from '$modules/database_index';
import type { CollectionName } from './database';
import type { CollectionEntry, EntryResponse } from './db';

export const String = T.String;
export const Number = T.Number;
export const Object = T.Object;
export const Optional = T.Optional;
export const Boolean = T.Boolean;

// import tree from './database_index';
// import type { CollectionEntry, CollectionName } from './database';
import { db } from '$modules';

/* Date */

type DateFormats = 'yyyy-MM' | 'yyyy-MM-dd';

export const DateString = (dateFormat: DateFormats) =>
	T.Transform(T.String()).Decode(stringToDate).Encode(dateToString(dateFormat));

// export const DateSpan = (dateFormat: DateFormats = 'yyyy-MM-dd') =>
// 	T.Object({
// 		date_start: DateString(dateFormat),
// 		date_end: Nullable(DateString(dateFormat)),
// 		current: T.Optional(T.Boolean())
// 	});

function stringToDate(v: string): Date | string {
	try {
		return new Date(v);
	} catch (e) {
		return v;
	}
}

function dateToString(dateFormat: string) {
	return (v: string | Date) => {
		if (typeof v === 'string') return v;
		else return formatDate(v, dateFormat);
	};
}

/* Relation */

type Relation<C extends CollectionName> = (typeof database_index_schema)['properties'][C];

// type O = CollectionEntries<'work_experiences'>;

// // Map each element of tuple T to TLiteral
// type MapLiteral<T extends readonly string[]> = {
// 	[P in keyof T]: TLiteral<T[P]>;
// };

// // Remove readonly from type
// type Writable<T> = { -readonly [P in keyof T]: T[P] };

// type RelationLiterals<C extends CollectionName> = Writable<MapLiteral<CollectionEntries<C>>>;
// type O = RelationLiterals<"organizations">

export function BaseRelation<C extends CollectionName>(collection_name: C): Relation<C> {
	const collection_entries = database_index[collection_name];
	// @ts-expect-error avoid ciccio
	return T.Union(collection_entries.map((name: CollectionEntry<C>) => T.Literal(name)));
}

export function Relation<C extends CollectionName>(collection_name: C) {
	return T.Transform(BaseRelation(collection_name))
		.Decode((id) => ({
			collection: collection_name,
			id,
			get: () => db.get(collection_name, id)
		}))
		.Encode((entry) => entry.id);
}

export type BaseRelationTransform<C extends CollectionName> = {
	collection: C;
	id: CollectionEntry<C>;
	get: () => EntryResponse<C>;
};
