import { formatDate } from 'date-fns/format';
import { Type as T, type StaticDecode } from '@sinclair/typebox';
import { database_index, database_index_schema } from './database_index';
import type { CollectionName } from './database';

import { get_document } from '.';

//

export const String = T.String;
export const Number = T.Number;
export const Object = T.Object;
export const Optional = T.Optional;
export const Boolean = T.Boolean;
export const Union = T.Union;
export const Literal = T.Literal;
export const Array = T.Array;

/* Date */

type DateFormats = 'yyyy-MM' | 'yyyy-MM-dd';

export const DateString = (dateFormat: DateFormats) =>
	T.Transform(T.String()).Decode(stringToDate).Encode(dateToString(dateFormat));

// TODO - Aggiungere funzioni come kirby
// export const Date = (format: DateFormats) =>
// 	T.Transform(T.String()).Decode((date_string) => ({
// 		format: () => formatDate(date_string, format),
// 		_raw: date_string
// 	})).Encode(dateToString(format));

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

/* File */

// TODO - Add regex for path
export const File = () => T.String({});

/* Relation */

type Relation<C extends CollectionName> = (typeof database_index_schema)['properties'][C];

function BaseRelation<C extends CollectionName>(collection_name: C): Relation<C> {
	const collection_entries = database_index[collection_name];
	// @ts-expect-error - Avoid type overlap
	return T.Union(collection_entries.map((name: CollectionEntry<C>) => T.Literal(name)));
}

export const Relation = <C extends CollectionName>(collection_name: C) => {
	return T.Transform(BaseRelation(collection_name))
		.Decode((document) => ({
			collection: collection_name,
			document,
			get: () => get_document(collection_name, document)
		}))
		.Encode((field) => field.document);
};

export type RelationField<C extends CollectionName> = StaticDecode<ReturnType<typeof Relation<C>>>;
