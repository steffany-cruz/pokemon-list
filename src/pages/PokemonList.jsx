import axios from "axios";
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import PokeLogo from "../assets/icons/pokeLogo.png";
import Pagination from "../components/Pagination";
import { POKEMON_API_URL } from "../services";

function PokemonList({ pokemonData, setOffset, loading }) {
  const history = useHistory();

  function onVisualize(name) {
    history.push(`/detail/${name}`);
  }

  async function getPokemonImg(id) {
    try {
      const response = await axios.get(`${POKEMON_API_URL}/${id}`);
      const { data } = response;
      return data.sprites.other["official-artwork"]["front_default"];
    } catch (error) {
      // setNotFound(true);
      console.log(error);
      return PokeLogo;
    }
  }

  return pokemonData ? (
    <div className="list">
      {loading ? (
        <div className="loading" />
      ) : (
        <ul data-testid="list">
          {pokemonData.results.map((pokemon) => (
            <li
              className="card"
              key={pokemon.name}
              onClick={() => onVisualize(pokemon.name)}
            >
              <img src={PokeLogo} alt="" />
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
      <Pagination data={pokemonData} setOffset={setOffset} />
    </div>
  ) : (
    <div className="loading" />
  );
}

export default withRouter(PokemonList);
