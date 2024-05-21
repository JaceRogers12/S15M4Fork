const db = require("../../data/db-config.js");

function getAll() {
    return db("pokemon");
}

function getById(id) {
    return db("pokemon")
        .where({id: id})
        .first();
}

async function insert(payload) {
    const [id] = await db("pokemon")
        .insert(payload);
    return await getById(id);
}

async function remove(id) {
    const deletedPokemon = await getById(id);
    await db("pokemon")
        .where({id: id})
        .del();
    return deletedPokemon;
}

module.exports = {
    getAll,
    getById,
    insert,
    remove
}