const Pokemon = require("./pokemon-model.js");

function verifyId(req, res, next) {
    let pokemon = Pokemon.getById(req.params.id);
    if (!pokemon) {
        next({status: 404, message: "There is no pokemon by that id"})
    } else {
        next();
    }
}

function verifyPayload(req, res, next) {
    let {name} =  req.body;
    if (!name) {
        next({status: 422, message: "Pokemon must have a name"})
    } else {
        next();
    }
}

module.exports = {
    verifyId,
    verifyPayload
}