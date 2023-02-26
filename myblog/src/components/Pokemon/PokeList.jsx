import { useState, useEffect } from "react";
import axios from "axios";
import Pokemones from "./Pokemones";
import "./pokemones.css";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";


const PokeList = () => {
  
  const URL = process.env.REACT_APP_URL;

  const [pokemones, setPokemones] = useState([]);
  const [actual, setActual] = useState(`${URL}/pokemon/list`);
  const [anterior, setAnterior] = useState(null);
  const [siguiente, setSiguiente] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    const mostrarPokemon = async () => {
      await axios.get(actual)
        .then((res) => {
          setPokemones(res.data.results);
          setAnterior(res.data.previous);
          setSiguiente(res.data.next);
          setTotal(res.data.count)
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false)
    };
    mostrarPokemon();
  }, [actual]);


  return (
    <div className = "container mb-5">
      <nav className = "link-inicio">
        <Link to="/">Inicio</Link>
      </nav>
      <h2 className="pokemones-title">Pokemones</h2>
      {isLoading&&<Spinner />}
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
