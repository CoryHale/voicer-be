
exports.up = function(knex) {
    return knex.schema
        .table('users', tbl => {
            tbl.integer('loyaltyLevel').defaultTo(1);
            tbl.integer('completedJobs').defaultTo(0);
            tbl.decimal('accountBalance', 8, 2).defaultTo(0);
        })
        .table('jobOffers', tbl => {
            tbl.date('completedDate');
        });
};

exports.down = function(knex) {
    return knex.schema
    .table('users', tbl => {
        tbl.dropColumn('loyaltyLevel');
        tbl.dropColumn('completedJobs');
        tbl.dropColumn('accountBalance');
    })
    .table('jobOffers', tbl => {
        tbl.dropColumn('completedDate');
    });
};
