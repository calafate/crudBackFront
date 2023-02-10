const Pokemon = require("../models/Pokemon");

exports.listPokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.find();
        res.json({ data: pokemon, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}