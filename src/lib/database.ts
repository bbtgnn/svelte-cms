import { type StaticDecode, type StaticEncode, Type as T } from '@sinclair/typebox';
// import { Value as V } from '@sinclair/typebox/value';
import { collections } from './config';
// // import type { StaticDecode } from '@sinclair/typebox';
// import { Effect as _, ReadonlyRecord as R, pipe, ReadonlyArray as A } from 'effect';

import get_entry_loaders from '$collections';
import {
	pipe,
	ReadonlyRecord as R,
	ReadonlyArray as A,
	Option as O,
	String as S,
	flow
} from 'effect';
import { Value } from '@sinclair/typebox/value';
import { href } from './utils';
// import { page } from '$app/stores';
// import { get } from 'svelte/store';

//

export type CollectionName = keyof typeof collections;
export type CollectionSchema<C extends CollectionName> = (typeof collections)[C];
export type CollectionInput<C extends CollectionName> = StaticEncode<(typeof collections)[C]>;
export type Collection<C extends CollectionName> = StaticDecode<(typeof collections)[C]>;

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

function get_collection_schema<C extends CollectionName>(collection_name: C): CollectionSchema<C> {
	return collections[collection_name];
}

export function create<C extends CollectionName>(
	collection_name: C,
	data: CollectionInput<C>
): CollectionInput<C> {
	const collection_schema = get_collection_schema(collection_name);
	return Value.Decode(collection_schema, data);
}

export function get<C extends CollectionName>(
	collection_name: C,
	entry_name: string
): Promise<Collection<C>> {
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

type EntryLoader = () => Promise<unknown>;

// TODO - use effect
async function parse_entry_loader<C extends CollectionName>(
	collection_name: CollectionName,
	entry_loader: EntryLoader
): Promise<Collection<C>> {
	try {
		const collection_schema = get_collection_schema(collection_name);
		const entry = await entry_loader();
		const entry_schema = T.Object({ data: T.Any() });
		if (Value.Check(entry_schema, entry)) {
			// ATTENZIONE QUI! il loader restituisce un getter! Capire bene come gestire
			const encoded_data = Value.Encode(collection_schema, entry.data);
			return Value.Decode(collection_schema, encoded_data);
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
