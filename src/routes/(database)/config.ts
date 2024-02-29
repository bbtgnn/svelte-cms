import * as F from '$modules/fields';
import { database } from '$modules';

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
		organization: F.Relation('organizations')
	}),

	projects: F.Object({})
});
