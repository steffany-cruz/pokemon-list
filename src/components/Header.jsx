import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/pokemonLogo.png";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
      </Link>
    </header>
  );
}
