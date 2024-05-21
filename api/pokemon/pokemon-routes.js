const express = require("express");
const Pokemon = require("./pokemon-model.js");
const mids = require("./pokemon-middleware.js");

const router = express.Router();

router.get("/", (req, res, next) => {
    Pokemon.getAll();
    res.status(200).json({message: "get pokemon connected"})
})

router.post("/", mids.verifyPayload, async (req, res, next) => {
    Pokemon.insert(req.payload);
    res.status(200).json({message: "post pokemon connected"})
})

router.delete("/:id", mids.verifyId, async (req, res, next) => {
    Pokemon.remove(req.params.id);
    res.status(200).json({message: "delete pokemon connected"})
})

module.exports = router;