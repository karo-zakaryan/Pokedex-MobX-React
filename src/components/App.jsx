import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react/index.js";

import Header from "./Header/Header";
import Pagination from "./Pagination/Pagination";
import PokemonList from "./PokemonList/PokemonList";
import "../styles/App.scss";

class App extends Component {
  componentDidMount() {
    this.fetchPokeList();
    this.fetchPokeTypes();
  }

  fetchPokeTypes = () => this.props.PokemonStore.getPokemonTypes();

  fetchPokeList = () => this.props.PokemonStore.getPokemonList();

  render() {
    return (
      <>
        <Header />
        <Pagination />
        <PokemonList />
      </>
    );
  }
}

App.propTypes = {
  PokemonStore: PropTypes.object
};

export default inject("PokemonStore")(observer(App));
