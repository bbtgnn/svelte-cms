import * as F from '$modules/fields';
import { database } from '$modules/database';

//

export default database({
	organizations: F.Object({
		name: F.String(),
		location: F.String(),
		logo: F.Optional(F.File())
	}),

	work_experiences: F.Object({
		date_start: F.DateString('yyyy-MM'),
		date_end: F.Optional(F.DateString('yyyy-MM')),
		current: F.Optional(F.Boolean()),
		employer: F.Relation('organizations'),
		roles: F.Array(F.String()),
		description: F.Optional(F.String())
	}),

	education: F.Object({
		date_start: F.DateString('yyyy-MM'),
		date_end: F.Optional(F.DateString('yyyy-MM')),
		current: F.Optional(F.Boolean()),
		institution: F.Relation('organizations'),
		title: F.String(),
		description: F.Optional(F.String())
	}),

	projects: F.Object({})
});
