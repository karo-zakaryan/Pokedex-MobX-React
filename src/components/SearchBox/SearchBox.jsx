import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import "../../styles/SearchBox.scss";

class SearchBox extends Component {
  state = {
    value: ""
  };

  componentDidUpdate() {
    if (this.props.PokemonStore.searchTerm === "" && this.state.value) {
      this.setState({ value: "" });
    }
  }

  changeHandler = ({ target }) => {
    const { value } = target;

    this.setState({ value });
    this.props.PokemonStore.searchPokemon(value);
  };

  resetHandler = () => {
    this.setState({ value: "" });
    this.props.PokemonStore.searchPokemon("");
  };

  keyPressHandler = event => {
    if (event.key === "Enter") {
      const { value } = this.state;

      event.preventDefault();
      this.props.PokemonStore.searchPokemon(value);
    }
  };

  render() {
    const { value } = this.state;
    const { listStatus } = this.props.PokemonStore;

    return (
      <div className="by-name__search">
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="sbx-icon-search-8"
            viewBox="0 0 40 40"
          >
            <path
              d="M16 32c8.835 0 16-7.165 16-16 0-8.837-7.165-16-16-16C7.162 0 0 7.163 0 16c0 8.835 7.163 16 16 16zm0-5.76c5.654 0 10.24-4.586 10.24-10.24 0-5.656-4.586-10.24-10.24-10.24-5.656 0-10.24 4.584-10.24 10.24 0 5.654 4.584 10.24 10.24 10.24zM28.156 32.8c-1.282-1.282-1.278-3.363.002-4.643 1.282-1.284 3.365-1.28 4.642-.003l6.238 6.238c1.282 1.282 1.278 3.363-.002 4.643-1.283 1.283-3.366 1.28-4.643.002l-6.238-6.238z"
              fillRule="evenodd"
            />
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            id="sbx-icon-clear-3"
            viewBox="0 0 20 20"
          >
            <path
              d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
              fillRule="evenodd"
            />
          </symbol>
        </svg>

        <form noValidate="novalidate" className="searchbox sbx-twitter">
          <div role="search" className="sbx-twitter__wrapper">
            <input
              type="search"
              name="search"
              value={value}
              autoComplete="off"
              required="required"
              disabled={!listStatus}
              onChange={this.changeHandler}
              className="sbx-twitter__input"
              onKeyPress={this.keyPressHandler}
              placeholder="Search pokemon by name"
            />
            <button type="button" className="sbx-twitter__submit">
              <svg role="img" aria-label="Search">
                <use xlinkHref="#sbx-icon-search-8" />
              </svg>
            </button>
            <button
              type="reset"
              onClick={this.resetHandler}
              title="Clear the search query."
              className="sbx-twitter__reset"
            >
              <svg role="img" aria-label="Reset">
                <use xlinkHref="#sbx-icon-clear-3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SearchBox.propTypes = {
  PokemonStore: PropTypes.object
};

export default inject("PokemonStore")(observer(SearchBox));
