import type { CollectionName } from './database';
import database_config from '$database/config';
import database_index from './database_index';

type CollectionSchema<C extends CollectionName> = (typeof database_config)[C];
type CollectionInput<C extends CollectionName> = StaticEncode<(typeof database_config)[C]>;
type Collection<C extends CollectionName> = StaticDecode<(typeof database_config)[C]>;

export type CollectionEntry<C extends CollectionName> = (typeof database_index)[C][number];

function get_collection_schema<C extends CollectionName>(collection_name: C): CollectionSchema<C> {
	return database_config[collection_name];
}

export type EntryResponse<C extends CollectionName> = Collection<C> & {
	_content: ConstructorOfATypedSvelteComponent;
};

//

import { type StaticDecode, type StaticEncode, Type as T } from '@sinclair/typebox';
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
		get_entry_loaders(),
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
): Promise<EntryResponse<C>> {
	return pipe(
		get_entry_loaders(),
		R.toEntries,
		A.filter(([entry_path]) => entry_path.includes(`${collection_name}/${entry_name}`)),
		A.head,
		O.map(([, /* entry_name */ entry_loader]) => entry_loader),
		O.map((entry_loader) => parse_entry_loader(collection_name, entry_loader)),
		O.getOrThrow
	);
}

//

import { page as pageStore } from '$app/stores';
import { get as getStoreValue } from 'svelte/store';

export function page<C extends CollectionName>(collection_name: C): Promise<Collection<C>> {
	const page = getStoreValue(pageStore);
	const entry_name = pipe(
		O.fromNullable(page.route.id),
		O.flatMap(flow(S.replace('/+page.svelte', ''), S.split(`${collection_name}/`), A.last)),
		O.getOrThrow
	);
	return get(collection_name, entry_name);
}

//

type EntryLoader = () => Promise<unknown>;

// TODO - use effect
async function parse_entry_loader<C extends CollectionName>(
	collection_name: CollectionName,
	entry_loader: EntryLoader
): Promise<EntryResponse<C>> {
	try {
		const collection_schema = get_collection_schema(collection_name);
		const entry = await entry_loader();
		const entry_schema = T.Object({ data: T.Any(), default: T.Any() });
		if (Value.Check(entry_schema, entry)) {
			// ATTENZIONE QUI! il loader restituisce un getter! Capire bene come gestire
			const encoded_data = Value.Encode(collection_schema, entry.data);
			return { ...Value.Decode(collection_schema, encoded_data), _content: entry.default };
		} else {
			throw new Error('Missing: export const data = db.create(...)');
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
}

// }

// //

// export const load_collection = <C extends CollectionName>(collection_name: C) =>
// 	_.runPromise(
// 		pipe(
// 			collection_name,
// 			get_collection_config,
// 			(collection_config) => collection_config.loader(),
// 			R.toEntries,
// 			A.map(async ([entry_path, entry_loader]) => ({
// 				path: entry_path,
// 				data: await entry_loader()
// 			})),
// 			A.map((entry) => _.promise(() => entry)),
// 			(entry_list) => _.all(entry_list)
// 		)
// 	);
