
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('member_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('member_types').insert([
        { name: 'captain', description: '', created_at: new Date(), updated_at: new Date() },
        { name: 'regular', description: '', created_at: new Date(), updated_at: new Date() }
      ]);
    });
};
