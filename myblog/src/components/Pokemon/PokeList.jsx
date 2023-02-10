import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import "./pokemon.css";

const PokeList = () => {
  const limit = 12;
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
  const [pokemones, setPokemones] = useState([]);
  const [actual, setActual] = useState(URL);
  const [anterior, setAnterior] = useState(null);
  const [siguiente, setSiguiente] = useState(null);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const mostrarPokemon = async () => {
      await axios
        .get(actual)
        .then((res) => {
          setPokemones(res.data.results);
          setAnterior(res.data.previous);
          setSiguiente(res.data.next);
          setTotal(res.data.count)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    mostrarPokemon();
  }, [actual]);

  return (
    <div className="container mb-5">
      <h2 className="pokemonesTitulo">Pokemones</h2>
      <div className="d-flex justify-content-end align-items-center pb-2">
        <div>Cantidad Total de Pokemones: {total}</div>
        <button
          onClick={() => anterior !== null && setActual(anterior)}
          className="btn btn-secondary mx-3">ANT
        </button>
        <button
          onClick={() => siguiente !== null && setActual(siguiente)}
          className="btn btn-secondary">SIG
        </button>
      </div>
      <div className="pokemonContainer">
        {pokemones.map((pokemon, i) => {
          return (
            <div key={i}>
              <div className="pokemonCard">
                <h4>{pokemon.name}</h4>
                <Pokemon url={pokemon.url} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokeList;
