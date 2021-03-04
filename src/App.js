import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import PokemonDetail from "./pages/PokemonDetail";
import PokemonList from "./pages/PokemonList";
import { POKEMON_API_URL } from "./services";

export default function App() {
  const [pokemonData, setPokemonData] = useState();
  const [offset, setOffset] = useState(21);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    getPokemons();
  }, [offset]);

  return (
    <div>
      <Router>
        <Header />
        <div className="body">
          <SearchField />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <PokemonList {...{ pokemonData, setOffset, loading }} />
              )}
            />
            <Route path="/detail/:id">
              <PokemonDetail />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
