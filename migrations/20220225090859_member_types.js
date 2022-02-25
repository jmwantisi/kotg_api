
exports.up = function (knex) {
	return knex.schema.createTableIfNotExists('member_types', (member_types) => {
		member_types.increments();
		member_types.string('name');
		member_types.text('description', 'longtext');
		member_types.integer('enabled').notNullable().defaultTo(0)
		member_types.integer('void').notNullable().defaultTo(0)
		member_types.timestamps();
	})
};

exports.down = function (knex) {
	return knex
		.schema
		.dropTableIfExists('member_types')
};
