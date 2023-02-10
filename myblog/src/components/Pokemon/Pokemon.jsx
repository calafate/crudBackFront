import { useState, useEffect } from "react";
import axios from "axios";
import './pokemon.css'

const Pokemon = (url) => {    
  const [pokemonImg, setPokemonImg] = useState([]);


  useEffect(() => {
    mostrarPokemon();
  }, [url]);

  const mostrarPokemon = async () => {
    await axios
      .get(url.url)
      .then((res) => {
        setPokemonImg(res.data.sprites.other.home.front_default);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
      <img className = "pokemonImg"
          src={pokemonImg}
          alt="imagen Pokemon"
        />
  ); 
};

export default Pokemon;
