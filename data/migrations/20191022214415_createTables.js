
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('userId');
            tbl.string('username');
            tbl.string('password');
        })
        .createTable('talentProfiles', tbl => {
            tbl.increments('talentId');
            tbl.integer('userId').unsigned().references('userId').inTable('users');
        })
        .createTable('clientProfiles', tbl => {
            tbl.increments('clientId');
            tbl.integer('userId').unsigned().references('userId').inTable('users');
        })
        .createTable('jobs', tbl => {
            tbl.increments('jobId');
            tbl.integer('clientId').unsigned().references('clientId').inTable('clientProfiles');
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists()
};
