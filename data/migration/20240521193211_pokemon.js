/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("pokemon", tbl => {
    tbl.increments();
    tbl.string("name", 24).notNullable().unique();
    tbl.string("type", 24).defaultTo("Normal");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pokemon");
};
