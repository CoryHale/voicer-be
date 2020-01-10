
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
        {clientId: 1, jobTitle: 'Job One Title', jobDescription: 'Job One Description', createdDate: new Date(), initialPrice: 300, status: 'Completed'},
        {clientId: 1, jobTitle: 'Job Two Title', jobDescription: 'Job Two Description', createdDate: new Date(), initialPrice: 500, status: 'Completed'},
        {clientId: 2, jobTitle: 'Job Three Title', jobDescription: 'Job Three Description', createdDate: new Date(), initialPrice: 300, status: 'Completed'},
        {clientId: 1, jobTitle: 'Job Four Title', jobDescription: 'Job Four Description', createdDate: new Date(), initialPrice: 500, status: 'Hiring'},
        {clientId: 2, jobTitle: 'Job Five Title', jobDescription: 'Job Five Description', createdDate: new Date(), initialPrice: 700, status: 'Hiring'},
        {clientId: 2, jobTitle: 'Job Six Title', jobDescription: 'Job Six Description', createdDate: new Date(), initialPrice: 700, status: 'Hiring'},
      ]);
    });
};


