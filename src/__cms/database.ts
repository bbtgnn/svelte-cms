import type { TAnySchema } from '@sinclair/typebox';
import { database_index } from './database_index';

//

export type CollectionName = keyof typeof database_index;

export function database<DatabaseConfig extends Partial<Record<CollectionName, TAnySchema>>>(
	config: DatabaseConfig
): DatabaseConfig {
	return config;
}
