import { useState, useEffect } from "react";
import axios from "axios";
import Pokemones from "./Pokemones";
import "./pokemones.css";

const PokeList = () => {
  
  const limit = 16;
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
      <h2 className="pokemones-title">Pokemones</h2>
      <div className="d-flex justify-content-end align-items-center pb-3">
        <button
          onClick={() => anterior !== null && setActual(anterior)}
          className="btn btn-secondary mx-3">ANT
        </button>
        <button
          onClick={() => siguiente !== null && setActual(siguiente)}
          className="btn btn-secondary">SIG
        </button>
      </div>
      <div className="pokemon-container">
        {pokemones.map((pokemon, i) => {
          return (
            <div key={i}>
              <div className="pokemon-card">
                <h4>{pokemon.name}</h4>
                <Pokemones url={pokemon.url} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="pokemones-cant">Cantidad total de Pokemones: {total}</div>
    </div>
  );
};

export default PokeList;
