const express = require("express");
const router = express.Router();
const {pokemonList} = require("../controllers/pokeController");

router.get("/list", pokemonList);


module.exports = router;