const axios = require("axios");

const pokemonList = (req, res) => {
  /* res.send ("<h1>Pokemones</h1>") */
    const URL = "https://pokeapi.co:443/api/v2/pokemon/?offset=0&limit=5";
    axios.get(URL)
        .then((res) => {console.log(res.data.results);})
        .catch((err) => {console.log(err);});
};

module.exports = { pokemonList };
