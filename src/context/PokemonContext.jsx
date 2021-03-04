import axios from "axios";
import constate from "constate";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { POKEMON_API_URL } from "../services";

function usePokemon() {
  const [pokemonData, setPokemonData] = useState();
  const [offset, setOffset] = useState(21);
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [notFound, setNotFound] = useState(false);
  const history = useHistory();

  async function getPokemons() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${POKEMON_API_URL}?limit=20&offset=${offset}`
      );
      const { data } = response;
      setPokemonData(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function getPokemon(id) {
    setNotFound(false);
    setPokemon();
    try {
      const response = await axios.get(`${POKEMON_API_URL}/${id}`);
      const { data } = response;
      if (data.results) {
        history.push("/");
      }
      setPokemon(data);
    } catch (error) {
      setNotFound(true);
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    getPokemons();
  }, [offset]);

  return {
    getPokemons,
    pokemonData,
    loading,
    getPokemon,
    pokemon,
    notFound,
    offset,
    setOffset,
  };
}

const [PokemonProvider, usePokemonContext] = constate(usePokemon);

export { PokemonProvider, usePokemonContext };
