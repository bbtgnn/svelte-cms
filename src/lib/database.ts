import type { TObject } from '@sinclair/typebox';
// import { collections } from './config';
// // import type { StaticDecode } from '@sinclair/typebox';
// import { Effect as _, ReadonlyRecord as R, pipe, ReadonlyArray as A } from 'effect';

import get_entries_loaders from '../routes/(collections)';

export { get_entries_loaders };

// //

export type EntryLoader = () => Promise<unknown>;

export type CollectionLoader = {
	content_schema: TObject;
	filename_schema: TObject;
	loader: () => Record<string, EntryLoader>;
};

// //

// type CollectionName = keyof typeof collections;
// type CollectionConfig<C extends CollectionName> = (typeof collections)[C];
// // type CollectionType<C extends CollectionName> = StaticDecode<
// // 	CollectionConfig<C>['content_schema']
// // > &
// // 	StaticDecode<CollectionConfig<C>['filename_schema']>;

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
