import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import NotFound from "../components/NotFound";
import { POKEMON_API_URL } from "../services";

function PokemonDetail() {
  let { id } = useParams();
  const history = useHistory();
  const [pokemon, setPokemon] = useState();
  const [notFound, setNotFound] = useState(false);
  const [visibleImg, setVisibleImg] = useState("front_default");

  useEffect(() => {
    console.log(id);
    if (id) {
      getPokemon();
    } else {
      history.push("/");
    }
  }, [id]);

  async function getPokemon() {
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
              <div>{type.type.name}</div>
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
              <span className="cell">{stat.stat.name} </span>
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
