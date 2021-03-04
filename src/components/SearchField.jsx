import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SearchField() {
  const history = useHistory();
  const [pokemon, setPokemon] = useState();

  function onSubmit(e) {
    e.preventDefault();
    onVisualize(pokemon);
  }

  function onVisualize(name) {
    history.push(`/detail/${name}`);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="search-field"
        type="search"
        placeholder="Search Pokémon"
        onChange={(e) => setPokemon(e.target.value.toLowerCase())}
      />
    </form>
  );
}
