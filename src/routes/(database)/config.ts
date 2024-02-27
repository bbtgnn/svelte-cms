import { Type as T } from '@sinclair/typebox';
import * as F from '$modules/fields';
import { database } from '$modules';

//

export default database({
	organizations: T.Object({
		name: T.String(),
		location: T.String()
	}),

	work_experiences: T.Object({
		date_start: F.DateString('yyyy-MM'),
		date_end: T.Optional(F.DateString('yyyy-MM')),
		current: T.Optional(T.Boolean()),
		organization: F.Relation()
	}),

	projects: T.Object({})
});
