/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('pokemon').truncate()
  await knex('pokemon').insert([
    {name: "Treecko", type: "Grass"},
    {name: "Torchic", type: "Fire"},
    {name: "Mudkip", type: "Water"}
  ]);
};
