
exports.up = function (knex) {
	return knex.schema.createTableIfNotExists('members', (members) => {
		members.increments();
		members.string('firstname')
		members.string('lastname')
		members.string('phone_number')
		members.string('address')
		members.integer('member_type_id').unsigned()
		members.foreign('member_type_id').references('id').inTable('member_types');
		members.integer('team_id').unsigned()
		members.foreign('team_id').references('id').inTable('teams');
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
