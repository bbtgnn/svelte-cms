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
): Collection<C> {
	const collection_schema = get_collection_schema(collection_name);
	const parsed_value = Value.Decode(collection_schema, data);
	return parsed_value;
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
	const collection_schema = get_collection_schema(collection_name);
	const raw_data = await entry_loader();
	const parsed_value = Value.Decode(T.Object({ data: collection_schema }), raw_data);
	return parsed_value.data;
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
