import { formatDate } from 'date-fns/format';
import { Type as T } from '@sinclair/typebox';
import type { CollectionName } from './config';
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

export const Relation = <C extends CollectionName>(collection: C) =>
	T.Transform(T.String())
		.Decode((id) => ({ collection, id, get: () => db.get(collection, id) }))
		.Encode((entry) => entry.id);
