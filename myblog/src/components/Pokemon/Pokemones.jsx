import { useState, useEffect } from "react";
import axios from "axios";
import './pokemones.css'

const Pokemones = (url) => {    
  const [pokemonImg, setPokemonImg] = useState([]);


  useEffect(() => {
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
    mostrarPokemon();
  }, [url]);

  

  return (
      <img
        /* onClick={1} */ 
        className = "pokemon-img"
        src={pokemonImg}
        alt="imagen Pokemon"
        />
  ); 
};

export default Pokemones;
