import { formatDate } from 'date-fns/format';
import { Type as T } from '@sinclair/typebox';

import tree from './types';
import type { CollectionEntry, CollectionName } from './database';
import { db } from '$lib';

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

export const RelationX = <C extends CollectionName>(collection: C) =>
	T.Union(tree[collection].map((item: CollectionEntry<C>) => T.Literal(item)));

export const Relation = <C extends CollectionName>(collection: C) =>
	T.Transform(T.Union(tree[collection].map((item: CollectionEntry<C>) => T.Literal(item))))
		.Decode((id) => ({ collection, id, get: () => db.get(collection, id) }))
		.Encode((entry) => entry.id);
