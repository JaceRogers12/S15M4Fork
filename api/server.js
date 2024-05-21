const express = require("express");
const pokemonRoutes = require("./pokemon/pokemon-routes.js");

const server = express();

server.use(express.json());

server.use("/api/pokemon", pokemonRoutes);

server.get("/", (req, res) => {
    res.status(200).send("Gotta catch 'em all!")
})

server.get("*", (req, res, next) => {
    next({status: 404, message: "There is nothing at that endpoint"})
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message || "There was an issue with the server"})
})

module.exports = server;