
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jobs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {clientId: 1, jobTitle: 'Job One Title', jobDescription: 'Job One Description'},
        {clientId: 1, jobTitle: 'Job Two Title', jobDescription: 'Job One Description'},
        {clientId: 2, jobTitle: 'Job Two Title', jobDescription: 'Job One Description'},
      ]);
    });
};
