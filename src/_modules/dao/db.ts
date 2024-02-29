import { pipe, Effect, ReadonlyArray as A } from 'effect';
// Effect must be imported before other imports that use effect!

import type {
	Collection,
	CollectionInput,
	CollectionName,
	CollectionSchema,
	DocumentName,
	Document
} from '$modules/types';
import database_config from '$database/_config';

import {
	get_base_document,
	get_base_documents,
	parse_base_document
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
): Document<C> | Error {
	return pipe(
		Effect.all([
			get_base_document(`${collection_name}/${document_name}`),
			get_collection_schema(collection_name)
		]),
		Effect.flatMap(([base_document, schema]) => parse_base_document(base_document, schema)),
		Effect.catchAll((e) => Effect.succeed(e)),
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
			pipe(
				Effect.all(documents.map((doc) => parse_base_document(doc, schema))),
				Effect.map((documents) => sort_documents(documents, options.sort))
			)
		),
		Effect.runSync
	);
}
