
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries

      // Statuses could be:
      // Hiring
      // Hired
      // Completed

      return knex('jobs').insert([
        {clientId: 1, jobTitle: 'Job One Title', jobDescription: 'Job One Description', createdDate: new Date().toISOString().slice(0, 19).replace('T', ' '), initialPrice: 300, status: 'Hiring'},
        {clientId: 1, jobTitle: 'Job Two Title', jobDescription: 'Job Two Description', createdDate: new Date().toISOString().slice(0, 19).replace('T', ' '), initialPrice: 500, status: 'Hiring'},
        {clientId: 2, jobTitle: 'Job Three Title', jobDescription: 'Job Three Description', createdDate: new Date().toISOString().slice(0, 19).replace('T', ' '), initialPrice: 700, status: 'Hiring'},
      ]);
    });
};


