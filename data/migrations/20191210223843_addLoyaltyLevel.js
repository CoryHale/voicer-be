
exports.up = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.string('loyaltyLevel').defaultTo("Bronze");
        tbl.integer('completedJobs').defaultTo(0);
    });
};

exports.down = function(knex) {
    return knex.schema.table('users', tbl => {
        table.dropColumn('loyaltyLevel');
        table.dropColumn('completedJobs');
    });
};
