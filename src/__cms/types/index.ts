import { database_index } from '../database_index';
import database_config from '$database/config';
import type { StaticDecode, StaticEncode } from '@sinclair/typebox';
import type { BaseDocument } from '../dao/base_document_handling';

//

export type CollectionName = keyof typeof database_index;

export type CollectionSchema<C extends CollectionName> = (typeof database_config)[C];

export type CollectionInput<C extends CollectionName> = StaticEncode<(typeof database_config)[C]>;

export type Collection<C extends CollectionName> = StaticDecode<(typeof database_config)[C]>;

export type DocumentName<C extends CollectionName> = (typeof database_index)[C][number];

export type Document<C extends CollectionName> = BaseDocument<Collection<C>>;
