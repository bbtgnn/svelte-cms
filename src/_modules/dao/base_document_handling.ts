import {
	pipe,
	Effect,
	ReadonlyRecord as R,
	ReadonlyArray as A,
	Option as O,
	String as S
} from 'effect';

import { Type as T, type Static, type TAnySchema, type StaticDecode } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import document_module_record from '$database/export';

import { href } from '../utils';

//

const document_module_schema = T.Object({
	props: T.Optional(T.Object({})),
	default: T.Any()
});

const document_module_record_schema = T.Record(T.String(), document_module_schema);
type DocumentModuleRecord = Static<typeof document_module_record_schema>;

//

export type BaseDocument<Props extends object = object> = {
	props?: Props;
	path: string;
	content: ConstructorOfATypedSvelteComponent;
};

//

function get_document_module_record(): Effect.Effect<DocumentModuleRecord, Error, never> {
	if (Value.Check(document_module_record_schema, document_module_record))
		return Effect.succeed(document_module_record);
	else return Effect.fail(new Error('Invalid Vite glob import'));
}

function format_path(path: string): string {
	return pipe(path, S.replace('/+page.svelte', ''), S.replace('./', '/'), href);
}

function convert_document_module_record_to_base_documents(
	document_module_record: DocumentModuleRecord
): BaseDocument[] {
	return pipe(
		document_module_record,
		R.toEntries,
		A.map(([path, module]) => ({
			path: format_path(path),
			props: module.props,
			content: module.default
		}))
	);
}

export function get_base_documents(): Effect.Effect<BaseDocument[], Error, never> {
	return pipe(
		get_document_module_record(),
		Effect.map(convert_document_module_record_to_base_documents)
	);
}

export function get_base_document(
	path_fragment: string
): Effect.Effect<O.Option<BaseDocument>, Error, never> {
	return pipe(
		get_base_documents(),
		Effect.map((base_documents) =>
			pipe(
				base_documents,
				A.filter((doc) => doc.path.includes(path_fragment)),
				A.head
			)
		)
	);
}

export function parse_base_document<T extends TAnySchema>(
	base_document: BaseDocument,
	schema: T
): Effect.Effect<BaseDocument<StaticDecode<T>>, Error, never> {
	return Effect.try({
		try: () => {
			const encoded = Value.Encode(schema, base_document.props);
			const decoded = Value.Decode(schema, encoded);
			return {
				...base_document,
				props: decoded
			};
		},
		catch: () => {
			const errors = [...Value.Errors(schema, base_document.props)];
			console.log(base_document, errors);
			return new Error(`Parse error: ${base_document.path}`);
		}
	});
}
