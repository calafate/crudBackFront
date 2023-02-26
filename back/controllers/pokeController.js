const axios = require("axios");

const pokemonList = async (req, res) => {

  const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=16";

  await axios.get(URL)
      .then(response => {res.send(response.data)})
      .catch((err) => {console.log(err);}); 
};

module.exports = { pokemonList };
