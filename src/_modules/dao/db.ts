import { pipe, Effect, ReadonlyArray as A, Option as O } from 'effect';
// Effect must be the imported before other imports that use effect!

import { Type as T, type Static } from '@sinclair/typebox';

import type {
	Collection,
	CollectionInput,
	CollectionName,
	CollectionSchema,
	DocumentName,
	Document
} from '$modules/types';
import database_config from '$database/config';

import {
	get_base_document,
	get_base_documents,
	parse_base_document
} from './base_document_handling';

import { Value } from '@sinclair/typebox/value';
import _ from 'lodash';
import { base } from '$app/paths';

//

function get_collection_schema<C extends CollectionName>(
	collection_name: C
): Effect.Effect<CollectionSchema<C>, Error, never> {
	const schema = database_config[collection_name];
	if (schema) return Effect.succeed(schema);
	else return Effect.fail(new Error(`Schema for "${collection_name}" not found`));
}

//

export function get_paths(): string[] {
	return pipe(get_base_documents(), Effect.map(A.map((doc) => doc.path)), Effect.runSync);
}

export function create<C extends CollectionName>(
	collection_name: C,
	data: CollectionInput<C>
): Collection<C> {
	return pipe(
		get_collection_schema(collection_name),
		Effect.flatMap((schema) =>
			Effect.try({
				try: () => Value.Decode(schema, data),
				catch: () => new Error(`Invalid data`)
			})
		),
		Effect.runSync
	);
}

export function get_document<C extends CollectionName>(
	collection_name: C,
	document_name: DocumentName<C>
): Document<C> {
	return pipe(
		Effect.all([
			get_base_document(`${collection_name}/${document_name}`),
			get_collection_schema(collection_name)
		]),
		Effect.map(([base_document, schema]) => ({
			base_document: O.getOrThrow(base_document), // TODO - Review
			schema
		})),
		Effect.flatMap(({ base_document, schema }) => parse_base_document(base_document, schema)),
		Effect.runSync
	);
}

export function get_collection<C extends CollectionName>(
	collection_name: C,
	options: GetCollectionOptions<C> = {}
): Document<C>[] {
	return pipe(
		Effect.all([
			pipe(
				get_base_documents(),
				Effect.map(A.filter((doc) => doc.path.includes(`${base}/${collection_name}`)))
			),
			get_collection_schema(collection_name)
		]),
		Effect.flatMap(([documents, schema]) =>
			Effect.all(documents.map((doc) => parse_base_document(doc, schema)))
		),
		Effect.map((documents) => {
			if (options.sort) {
				const sort = parse_sort_prop(options.sort);
				return _.orderBy(
					documents,
					sort.keys.map((k) => `props.${k}`),
					sort.orders
				);
			} else {
				return documents;
			}
		}),
		Effect.runSync
	);
}

export const sort_order_schema = T.Union([T.Literal('asc'), T.Literal('desc')]);
export type SortOrder = Static<typeof sort_order_schema>;

export const base_sort_prop_schema = T.Tuple([T.String(), sort_order_schema]);
export type BaseSortProp<C extends CollectionName> = [keyof Collection<C>, SortOrder];
export type SortProp<C extends CollectionName> = BaseSortProp<C> | BaseSortProp<C>[];

export type ParsedSortProp = { keys: string[]; orders: SortOrder[] };

type GetCollectionOptions<C extends CollectionName> = {
	sort?: SortProp<C>;
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
