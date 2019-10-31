exports.up = function(knex) {
  return knex.schema
    .createTable('languages', tbl => {
      tbl.increments('languageId');
      tbl.string('language').notNullable();
    })

    .createTable('accents', tbl => {
      tbl.increments('accentId');
      tbl.string('accent').notNullable();
      tbl
        .integer('languageId')
        .unsigned()
        .references('languageId')
        .inTable('languages');
    })

    .createTable('talentLanguages', tbl => {
      tbl.increments('talentLanguageId');
      tbl
        .integer('userId')
        .references('userId')
        .inTable('users');
      tbl
        .integer('languageId')
        .unsigned()
        .references('languageId')
        .inTable('languages');
    })
    .createTable('talentAccents', tbl => {
      tbl.increments('talentAccentId');
      tbl
        .integer('userId')
        .references('userId')
        .inTable('users');
      tbl
        .integer('accentId')
        .unsigned()
        .references('accentId')
        .inTable('accents');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('talentAccents')
    .dropTableIfExists('talentLanguages')
    .dropTableIfExists('accents')
    .dropTableIfExists('languages');
};
