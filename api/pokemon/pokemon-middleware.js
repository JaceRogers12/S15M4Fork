const Pokemon = require("./pokemon-model.js");

function verifyId(req, res, next) {
    console.log("verifying Id");
    Pokemon.getById(req.params.id);
    next();
}

function verifyPayload(req, res, next) {
    console.log("verifying payload");
    next();
}

module.exports = {
    verifyId,
    verifyPayload
}