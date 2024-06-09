import fs from 'fs/promises';
import path from 'node:path';
import { Effect, pipe, String as S, ReadonlyArray as A, ReadonlyRecord as R } from 'effect';
import fse from 'fs-extra';
import type { Plugin } from 'vite';

//

const collections_directory = 'src/routes/(database)';
const output_file = 'src/__cms/database_index.ts';

export function save_database_index_plugin(): Plugin {
	return {
		name: 'save_database_index',
		buildStart: () => {
			save_database_index(collections_directory, output_file);
		},
		handleHotUpdate: ({ file }) => {
			if (file.includes(output_file)) return;
			save_database_index(collections_directory, output_file);
		}
	};
}

export async function save_database_index(collections_directory: string, output_directory: string) {
	const o = pipe(
		filter_directory_content_by_type(collections_directory, 'file', true),
		Effect.map((file_path_array) =>
			pipe(
				file_path_array,
				A.filter(S.endsWith('/+page.svelte')),
				A.map((file_path) =>
					pipe(
						file_path,
						S.replace('+page.svelte', ''),
						S.replace(collections_directory, ''),
						S.split('/'),
						A.filter(S.isNonEmpty)
					)
				),
				A.groupBy(([collection_name]) => collection_name),
				R.map(A.map((a) => a[1]))
			)
		)
	);
	const res = await Effect.runPromise(o);
	await fs.writeFile(output_directory, file_template(res));
}

//

function filter_directory_content_by_type(
	directory_path: string,
	type: 'directory' | 'file',
	recursive = false
) {
	return pipe(
		Effect.tryPromise({
			try: () => fse.readdir(directory_path, { recursive }) as Promise<string[]>,
			catch: () => new Error('invalid_directory')
		}),
		Effect.map(A.map((file_name) => path.join(directory_path, file_name))),
		Effect.map(A.map((file_path) => filter_path_by_type(file_path, type))),
		Effect.flatMap((effects) => Effect.allSuccesses(effects))
	);
}

function filter_path_by_type(file_path: string, type: 'directory' | 'file') {
	return pipe(
		Effect.tryPromise({
			try: () => fs.stat(file_path),
			catch: () => new Error('file_not_found')
		}),
		Effect.map(
			(stats) => (stats.isDirectory() && type == 'directory') || (stats.isFile() && type == 'file')
		),
		Effect.if({
			onTrue: Effect.succeed(file_path),
			onFalse: Effect.fail(new Error(`file_not_${type}`))
		})
	);
}

/* Templates */

function file_template(database_index: Record<string, string[]>) {
	return [
		db_index_schema_template(database_index),
		db_index_template(JSON.stringify(database_index, null, 2))
	].join('\n\n');
}

function db_index_template(content: string): string {
	return `export const database_index = ${content} as const`;
}

function db_index_schema_template(database_index: Record<string, string[]>) {
	const rows = db_index_schema_rows_template(R.toEntries(database_index)).join(',\n\t');
	return `
import { Type as T } from '@sinclair/typebox';

export const database_index_schema = T.Object({\n\t${rows}\n})`.trim();
}

function db_index_schema_rows_template(rows: [string, string[]][]): string[] {
	return rows.map(([collection_name, entry_names]) =>
		db_index_schema_row_template(collection_name, entry_names)
	);
}

function db_index_schema_row_template(collection_name: string, entry_names: string[]): string {
	return `${collection_name}: T.Union([${db_index_schema_value_template(entry_names).join(', ')}])`;
}

function db_index_schema_value_template(entry_names: string[]): string[] {
	return entry_names.map((name) => `T.Literal('${name}')`);
}
