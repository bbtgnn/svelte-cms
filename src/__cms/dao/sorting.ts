import type { Collection, CollectionName, Document } from '../types';
import { Type as T, type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import _ from 'lodash';

const sort_order_schema = T.Union([T.Literal('asc'), T.Literal('desc')]);
type SortOrder = Static<typeof sort_order_schema>;

const base_sort_prop_schema = T.Tuple([T.String(), sort_order_schema]);
type BaseSortProp<C extends CollectionName> = [keyof Collection<C>, SortOrder];

export type SortProp<C extends CollectionName> = BaseSortProp<C> | BaseSortProp<C>[];

type ParsedSortProp = { keys: string[]; orders: SortOrder[] };

export type GetCollectionOptions<C extends CollectionName> = {
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

export function sort_documents<C extends CollectionName>(
	documents: Document<C>[],
	sort_prop: SortProp<C> | undefined = undefined
): Document<C>[] {
	if (sort_prop) {
		const sort = parse_sort_prop(sort_prop);
		return _.orderBy(
			documents,
			sort.keys.map((k) => `props.${k}`),
			sort.orders
		);
	} else {
		return documents;
	}
}
