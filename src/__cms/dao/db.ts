import { pipe, Effect, ReadonlyArray as A, Either as E } from 'effect';
// Effect must be imported before other imports that use effect!

import type {
	Collection,
	CollectionInput,
	CollectionName,
	CollectionSchema,
	DocumentName,
	Document
} from '../types';
import database_config from '$database/config';

import {
	get_base_document,
	get_base_documents,
	parse_base_document,
	type BaseDocument
} from './base_document_handling';

import { Value } from '@sinclair/typebox/value';
import { base } from '$app/paths';
import { sort_documents, type GetCollectionOptions } from './sorting';

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
	return pipe(get_base_documents(), Effect.map(A.map((doc) => doc._path)), Effect.runSync);
}

export function create<C extends CollectionName>(
	collection_name: C,
	data: CollectionInput<C>
): Collection<C> | unknown {
	return pipe(
		get_collection_schema(collection_name),
		Effect.flatMap((schema) =>
			Effect.try({
				try: () => Value.Decode(schema, data),
				catch: () => new Error(`Invalid data: ${JSON.stringify(data, null, 2)}`)
			})
		),
		Effect.match({
			onFailure: (e) => {
				console.log(e);
				return data;
			},
			onSuccess: (a) => a
		}),
		Effect.runSync
	);
}

export function get_document<C extends CollectionName>(
	collection_name: C,
	document_name: DocumentName<C>
): Document<C> | undefined {
	return pipe(
		Effect.all([
			get_base_document(`${collection_name}/${document_name}`),
			get_collection_schema(collection_name)
		]),
		Effect.flatMap(([base_document, schema]) => parse_base_document(base_document, schema)),
		Effect.catchAll(() => Effect.succeed(undefined)),
		Effect.runSync
	);
}

export function get_collection<C extends CollectionName>(
	collection_name: C,
	options: GetCollectionOptions<C> = {}
) {
	return pipe(
		Effect.all([
			get_base_documents({ path_includes: `${base}/${collection_name}` }), // TODO - Fix
			get_collection_schema(collection_name)
		]),
		Effect.flatMap(([documents, schema]) => parse_base_documents(documents, schema)),
		Effect.map((documents) => sort_documents(documents, options.sort)),
		Effect.match({
			onFailure: (e) => {
				console.log(e);
				return [];
			},
			onSuccess: (a) => a
		}),
		Effect.runSync
	);
}

function parse_base_documents<C extends CollectionName>(
	documents: BaseDocument[],
	schema: CollectionSchema<C>
) {
	return pipe(
		documents,
		A.map((doc) =>
			pipe(
				parse_base_document(doc, schema),
				Effect.either,
				Effect.tap(
					E.match({
						onLeft: (e) => console.warn(e.message),
						onRight: () => {}
					})
				)
			)
		),
		Effect.all,
		Effect.map(A.filter(E.isRight)),
		Effect.map(A.map(E.getOrThrow))
	);
}
