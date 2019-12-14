
const oldDate = new Date();
oldDate.setMonth(oldDate.getMonth() - 8)

const today = new Date();

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jobOffers').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobOffers').insert([
        {jobId: 1, clientId: 1, talentId: 1, isClientOffer: false, status: 'open', price: '500'},
        {jobId: 1, clientId: 1, talentId: 1, isClientOffer: true, status: 'open', price: '450'},
        {jobId: 1, clientId: 1, talentId: 1, isClientOffer: false, status: 'open', price: '485'},
        {jobId: 1, clientId: 1, talentId: 1, isClientOffer: true, status: 'open', price: '475'},
        {jobId: 1, clientId: 1, talentId: 1, isClientOffer: false, status: 'Accepted', price: '500', completedDate: oldDate},
        {jobId: 2, clientId: 1, talentId: 2, isClientOffer: false, status: 'open', price: '500'},
        {jobId: 2, clientId: 1, talentId: 2, isClientOffer: true, status: 'Accepted', price: '500', completedDate: today},
        {jobId: 3, clientId: 2, talentId: 1, isClientOffer: false, status: 'open', price: '500'},
        {jobId: 3, clientId: 2, talentId: 1, isClientOffer: true, status: 'open', price: '500'},
        {jobId: 3, clientId: 2, talentId: 1, isClientOffer: false, status: 'open', price: '500'},
        {jobId: 3, clientId: 2, talentId: 1, isClientOffer: true, status: 'Accepted', price: '500', completedDate: today}
      ]);
    });
};
