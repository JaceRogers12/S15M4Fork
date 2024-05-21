// const db = require("../../data/db-config.js");

function getAll() {
    console.log("getAll connected")
}

function getById(id) {
    console.log("getById connected")
}

async function insert(payload) {
    console.log("insert connected")
}

async function remove(id) {
    console.log("remove connected")
}

module.exports = {
    getAll,
    getById,
    insert,
    remove
}