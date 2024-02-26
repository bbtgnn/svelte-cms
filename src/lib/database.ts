import type { StaticDecode, TObject } from '@sinclair/typebox';
import { collections } from './config';
// // import type { StaticDecode } from '@sinclair/typebox';
// import { Effect as _, ReadonlyRecord as R, pipe, ReadonlyArray as A } from 'effect';

import get_entries_loaders from '$collections';
import { pipe, ReadonlyRecord as R, ReadonlyArray as A, Option as O } from 'effect';
// import { page } from '$app/stores';
// import { get } from 'svelte/store';

export { get_entries_loaders };

// //

export type EntryLoader = () => Promise<unknown>;

export type CollectionLoader = {
	content_schema: TObject;
	filename_schema: TObject;
	loader: () => Record<string, EntryLoader>;
};

// //

type CollectionName = keyof typeof collections;
type CollectionConfig<C extends CollectionName> = (typeof collections)[C];
type CollectionType<C extends CollectionName> = StaticDecode<
	CollectionConfig<C>['content_schema']
> &
	StaticDecode<CollectionConfig<C>['filename_schema']>;

//

export interface CollectionService<C extends CollectionName> {
	get_one: (id: string) => Promise<unknown>;
	current?: () => Promise<CollectionType<C>>;
}

export function collection<C extends CollectionName>(name: C): CollectionService<C> {
	return {
		get_one: (slug: string) =>
			pipe(
				get_entries_loaders(),
				R.toEntries,
				A.filter(([entry_name]) => entry_name.includes(`${name}/${slug}`)),
				A.head,
				O.map(async ([, /* entry_name */ entry_loader]) => {
					const o = await entry_loader();
					console.log(o);
					return o;
				}),
				O.getOrThrow
			)
		// const e =
		// // const o = await import(`../routes/(collections)/${name}/${slug}/+page.svelte`);
		// console.log(o);
		// return o;

		// async current() {
		// 	const pageStore = get(page)
		// 	pageStore.route
		// }
	};
}

// //

// export function get_collection_config<C extends CollectionName>(
// 	collectionName: C
// ): CollectionConfig<C> {
// 	return collections[collectionName];
// }

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
