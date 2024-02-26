import { readdir, stat } from 'fs/promises';
import path from 'node:path';

export async function writeCollectionsTypes() {
	const collections_folder_path = './src/routes/(collections)';
	const filename_list = await readdir(collections_folder_path);

	const folder_path_list = filename_list
		.map((filename) => path.join(collections_folder_path, filename))
		.map(async (path) => ({ path, stats: await stat(path) }));

	const folder_path_list_2 = (await Promise.all(folder_path_list))
		.filter((data) => data.stats.isDirectory())
		.map((data) => data.path)
		.map((p) => path.basename(p));

	stringUnionTypeTemplate;

	console.log(stringUnionTypeTemplate('CollectionName', folder_path_list_2));
}

function stringUnionTypeTemplate(name: string, strings: string[]) {
	return `type ${name} =${strings.map((s) => `\n\t| '${s}'`).join('')}`;
}
