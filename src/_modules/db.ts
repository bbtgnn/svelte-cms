import type { CollectionName } from './database';
import database_config from '$database/config';
import { database_index } from './database_index';
import _ from 'lodash';

type CollectionSchema<C extends CollectionName> = (typeof database_config)[C];
type CollectionInput<C extends CollectionName> = StaticEncode<(typeof database_config)[C]>;
type Collection<C extends CollectionName> = StaticDecode<(typeof database_config)[C]>;

export type CollectionEntries<C extends CollectionName> = (typeof database_index)[C];
export type CollectionEntry<C extends CollectionName> = (typeof database_index)[C][number];

function get_collection_schema<C extends CollectionName>(collection_name: C): CollectionSchema<C> {
	return database_config[collection_name];
}

export type EntryResponse<C extends CollectionName> = Collection<C> & {
	_content: ConstructorOfATypedSvelteComponent;
};

type O = Collection<'work_experiences'>;

//

import { type StaticDecode, type StaticEncode, Type as T, type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

import {
	pipe,
	ReadonlyRecord as R,
	ReadonlyArray as A,
	Option as O,
	String as S,
	flow
} from 'effect';

import { href } from './utils';

import get_entry_loaders from '$database/export';

//

export function get_paths(): string[] {
	return pipe(
		get_entry_loaders,
		R.toEntries,
		A.map(([entry_path]) => entry_path),
		A.map(flow(S.replace('/+page.svelte', ''), S.replace('./', '/'), href))
	);
}

//

export function create<C extends CollectionName>(
	collection_name: C,
	data: CollectionInput<C>
): CollectionInput<C> {
	const collection_schema = get_collection_schema(collection_name);
	return Value.Decode(collection_schema, data);
}

export function get<C extends CollectionName>(
	collection_name: C,
	entry_name: CollectionEntry<C>
): EntryResponse<C> {
	return pipe(
		get_entry_loaders,
		R.toEntries,
		A.filter(([entry_path]) => entry_path.includes(`${collection_name}/${entry_name}`)),
		A.head,
		O.map(([, /* entry_name */ entry_loader]) => entry_loader),
		O.map((entry_loader) => parse_entry_loader(collection_name, entry_loader)),
		O.getOrThrow
	);
}

/* */

export const sort_order_schema = T.Union([T.Literal('asc'), T.Literal('desc')]);
export type SortOrder = Static<typeof sort_order_schema>;

export const base_sort_prop_schema = T.Tuple([T.String(), sort_order_schema]);
export type BaseSortProp<C extends CollectionName> = [keyof Collection<C>, SortOrder];
export type SortProp<C extends CollectionName> = BaseSortProp<C> | BaseSortProp<C>[];

export type ParsedSortProp = { keys: string[]; orders: SortOrder[] };

type GetCollectionOptions<C extends CollectionName> = {
	sort: SortProp<C>;
};

function parse_sort_prop<C extends CollectionName>(sortProp: SortProp<C>): ParsedSortProp {
	if (Value.Check(base_sort_prop_schema, sortProp))
		return {
			keys: [sortProp[0]],
			orders: [sortProp[1]]
		};
	else if (Value.Check(T.Array(base_sort_prop_schema), sortProp)) {
		return {
			keys: sortProp.map((base) => base[0]),
			orders: sortProp.map((base) => base[1])
		};
	} else
		return {
			keys: [],
			orders: []
		};
}

//

export function get_collection<C extends CollectionName>(
	collection_name: C,
	options: Partial<GetCollectionOptions<C>> = {}
): Array<EntryResponse<C>> {
	return pipe(
		get_entry_loaders,
		R.toEntries,
		A.filter(([entry_path]) => entry_path.includes(`./${collection_name}`)),
		A.map(([, /* entry_name */ entry_loader]) => entry_loader),
		A.map((entry_loader) => parse_entry_loader(collection_name, entry_loader)),
		(entries) => {
			if (options.sort) {
				const parsed = parse_sort_prop(options.sort);
				return _.orderBy(entries, parsed.keys, parsed.orders);
			} else {
				return entries;
			}
		}
	);
}

//

import { page as pageStore } from '$app/stores';
import { get as getStoreValue } from 'svelte/store';

export function page<C extends CollectionName>(collection_name: C): Collection<C> {
	const page = getStoreValue(pageStore);
	const entry_name = pipe(
		O.fromNullable(page.route.id),
		O.flatMap(flow(S.replace('/+page.svelte', ''), S.split(`${collection_name}/`), A.last)),
		O.getOrThrow
	);
	return get(collection_name, entry_name as CollectionEntry<C>);
}

//

// TODO - use effect
function parse_entry_loader<C extends CollectionName>(
	collection_name: CollectionName,
	entry_loader: unknown
): EntryResponse<C> {
	try {
		const collection_schema = get_collection_schema(collection_name);
		const entry_schema = T.Object({ data: T.Any(), default: T.Any() });
		if (Value.Check(entry_schema, entry_loader)) {
			const encoded_data = Value.Encode(collection_schema, entry_loader.data);
			return { ...Value.Decode(collection_schema, encoded_data), _content: entry_loader.default };
		} else {
			throw new Error('Missing: export const data = db.create(...)');
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
}
