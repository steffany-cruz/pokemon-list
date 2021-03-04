import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import PokeLogo from "../assets/icons/pokeLogo.png";
import Pagination from "../components/Pagination";
import { usePokemonContext } from "../context/PokemonContext";

function PokemonList() {
  const { pokemonData, loading, setOffset } = usePokemonContext();
  const history = useHistory();

  function onVisualize(name) {
    history.push(`/detail/${name}`);
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
