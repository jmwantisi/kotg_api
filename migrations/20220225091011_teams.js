
exports.up = function (knex) {
	return knex.schema.createTableIfNotExists('teams', (teams) => {
		teams.increments();
		teams.string('name');
		teams.text('description', 'longtext');
		teams.date('year_found')
		teams.integer('void').notNullable().defaultTo(0)
		teams.timestamps();
	})
};

exports.down = function (knex) {
	return knex
		.schema
		.dropTableIfExists('teams')
};
