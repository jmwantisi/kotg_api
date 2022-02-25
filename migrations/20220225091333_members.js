
exports.up = function (knex) {
	return knex.schema.createTableIfNotExists('members', (members) => {
		members.increments();
		members.string('firstname')
		members.string('lastname')
		members.string('phone_number')
		members.string('address')
		members.integer('enabled').notNullable().defaultTo(0)
		members.integer('void').notNullable().defaultTo(0)
		members.timestamps();
	})
};

exports.down = function (knex) {
	return knex
		.schema
		.dropTableIfExists('members')
};
