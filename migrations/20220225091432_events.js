
exports.up = function (knex) {
	return knex.schema.createTableIfNotExists('events', (events) => {
		events.increments();
		events.string('name');
        events.text('description', 'longtext');
        events.date('event_date')
        events.time('event_time')
		events.integer('enabled').notNullable().defaultTo(0)
		events.integer('void').notNullable().defaultTo(0)
		events.timestamps();
	})
};

exports.down = function (knex) {
	return knex
		.schema
		.dropTableIfExists('events')
};
