import { Schema } from '@effect/schema';

export class Place extends Schema.Class<Place>('Place')({
	id: Schema.Number,
	city: Schema.String.pipe(Schema.nonEmpty())
}) {}

export class Organization extends Schema.Class<Organization>('Organization')({
	id: Schema.Number,
	name: Schema.String.pipe(Schema.nonEmpty()),
	place: Place
}) {}

export class DateSpan extends Schema.Class<DateSpan>('DateSpan')({
	id: Schema.Number,
	start: Schema.Date,
	end: Schema.Date.pipe(Schema.optional())
}) {}

export class CvEntry extends Schema.Class<CvEntry>('CvEntry')({
	id: Schema.Number,
	organization: Organization,
	title: Schema.String.pipe(Schema.nonEmpty()),
	description: Schema.String,
	period: DateSpan
}) {}
