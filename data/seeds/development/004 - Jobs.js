
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {clientId: 1, jobTitle: 'Job One Title', jobDescription: 'Job One Description', createdDate: new Date().toISOString().slice(0, 19).replace('T', ' ')},
        {clientId: 1, jobTitle: 'Job Two Title', jobDescription: 'Job Two Description', createdDate: new Date().toISOString().slice(0, 19).replace('T', ' ')},
        {clientId: 2, jobTitle: 'Job Three Title', jobDescription: 'Job Three Description', createdDate: new Date().toISOString().slice(0, 19).replace('T', ' ')},
      ]);
    });
};
