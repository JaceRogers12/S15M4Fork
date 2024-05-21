const express = require("express");
const Pokemon = require("./pokemon-model.js");
const mids = require("./pokemon-middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    await Pokemon.getAll()
        .then(pokemon => {
            res.status(200).json(pokemon)
        }).catch(err => {
            next(err)
        })
    
})

router.post("/", mids.verifyPayload, async (req, res, next) => {
    await Pokemon.insert(req.body)
        .then(pokemon => {
            res.status(201).json(pokemon)
        }).catch(err => {
            next(err)
        })
})

router.delete("/:id", mids.verifyId, async (req, res, next) => {
    await Pokemon.remove(req.params.id)
        .then(pokemon => {
            res.status(200).json(pokemon)
        }).catch(err => {
            next(err)
        })
})

module.exports = router;