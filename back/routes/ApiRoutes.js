const express = require("express");
const router = express.Router();
const {listPokemon} = require("../controllers/ApiController");

router.get("/", listPokemon);
router.get("/:id", PokemonXid);


module.exports = router;