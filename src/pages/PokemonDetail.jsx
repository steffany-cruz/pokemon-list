import React, { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import NotFound from "../components/NotFound";
import { usePokemonContext } from "../context/PokemonContext";

function PokemonDetail() {
  const { pokemon, notFound, getPokemon } = usePokemonContext();
  let { id } = useParams();
  const history = useHistory();
  const [visibleImg, setVisibleImg] = useState("front_default");

  useEffect(() => {
    if (id) {
      getPokemon(id);
    } else {
      history.push("/");
    }
  }, [id]);

  function customBaseStat(baseStat) {
    const style = { height: "24px", width: `${(baseStat * 100) / 255}%` };
    return style;
  }

  return notFound ? (
    <NotFound />
  ) : pokemon ? (
    <span>
      <span
        className="button"
        onClick={() => history.push("/")}
      >{`< Back`}</span>
      <div className="pokemon-info">
        <h2 className="pokemon-title">
          {pokemon.name} Nº {pokemon.id}
        </h2>
        <div className="flex pokemon-img">
          <img
            src={pokemon.sprites[visibleImg]}
            alt=""
            onMouseOver={() => setVisibleImg("back_default")}
            onMouseOut={() => setVisibleImg("front_default")}
          />
        </div>
      </div>
      <div className="grid pokemon-stats">
        <div className="row-basic">
          <div className="info-block">
            <div className="row-title">Height </div>
            <div>{pokemon.height * 10} cm</div>
          </div>
          <div className="info-block">
            <div className="row-title">Weight </div>
            <div>{pokemon.weight / 10} kg</div>
          </div>
          <div className="info-block">
            <div className="row-title">Type</div>
            {pokemon.types.map((type) => (
              <div className="cell">{type.type.name}</div>
            ))}
          </div>
          <div className="info-block">
            <div className="row-title">Abilities</div>
            {pokemon.abilities.map((ab) => (
              <li>
                {ab.ability.name} {ab.is_hidden && "(hidden)"}
              </li>
            ))}
          </div>
        </div>
        <div className="row-basic">
          <div className="row-title">Stats</div>
          {pokemon.stats.map((stat) => (
            <div>
              <div className="cell">{stat.stat.name}</div>
              <div class="stat-bar">
                <div style={customBaseStat(stat.base_stat)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </span>
  ) : (
    <div className="loading" />
  );
}

export default withRouter(PokemonDetail);
