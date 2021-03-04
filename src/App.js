import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import { PokemonProvider } from "./context/PokemonContext";
import PokemonDetail from "./pages/PokemonDetail";
import PokemonList from "./pages/PokemonList";

export default function App() {
  return (
    <PokemonProvider>
      <Router>
        <Header />
        <div className="body">
          <SearchField />
          <Switch>
            <Route exact path="/" render={(props) => <PokemonList />} />
            <Route path="/detail/:id">
              <PokemonDetail />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </PokemonProvider>
  );
}
