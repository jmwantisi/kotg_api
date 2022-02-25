
exports.up = function (knex) {
	return knex.schema.createTableIfNotExists('team_events', (team_events) => {
		team_events.increments();
		team_events.integer('team_id').unsigned().notNullable();
		team_events.foreign('team_id').references('id').inTable('teams');
		team_events.integer('event_id').unsigned().notNullable();
		team_events.foreign('event_id').references('id').inTable('events');
		team_events.integer('enabled').notNullable().defaultTo(0)
		team_events.integer('void').notNullable().defaultTo(0)
		team_events.timestamps();
	})
};

exports.down = function (knex) {
	return knex
		.schema
		.dropTableIfExists('team_events')
};
