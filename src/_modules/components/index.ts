import _ from 'lodash';

import Doc from './Document.svelte';
import DocumentContent from './DocumentContent.svelte';
import Collection from './Collection.svelte';
import Relation from './Relation.svelte';
import LogBanner from './LogBanner.svelte';

_.assign(globalThis, { Doc });
export { Doc, DocumentContent, Collection, Relation, LogBanner };
