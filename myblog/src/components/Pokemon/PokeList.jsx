import React, { useState, useEffect } from "react";
import axios from 'axios';

const PokeList = () => {
  const URL = "https://pokeapi.co/api/v2/pokemon/ditto";
  const [poke, setPoke] = useState([]);

  useEffect(() => {
    const mostrarPokemon = async (limit=30) => {
        await axios
            .get(`{URL}pokemon?limit=${limit}`)
            .then((res) => {
            setPoke(res.data.data);
            })
            .catch((err) => {
            console.log(err);
            });
    };
    mostrarPokemon();
  }, [])
  

  return (
    <div className="container">
      <h2>PokeList</h2>
    <div className="row">
      {}
    </div>
    </div>
  );
};

export default PokeList;
