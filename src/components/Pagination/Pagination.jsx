import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import ReactPaginate from "react-paginate";
import "../../styles/Pagination.scss";

class Pagination extends Component {
  state = {
    width: 0
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentDidUpdate() {
    const { pokemonData, setListStatus, offset } = this.props.PokemonStore;

    if (pokemonData.count < offset) {
      setListStatus(true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    const { innerWidth: width } = window;
    this.setState({ width });
  };

  pageChangeHandler = ({ selected }) => {
    this.props.PokemonStore.setPage(selected + 1);
  };

  render() {
    const { width } = this.state;
    const { pokemonData, limit, listStatus } = this.props.PokemonStore;

    const rangeDisplayed = width < 586 ? 1 : 3;
    const totalPages = Math.ceil(pokemonData.count / limit);

    return (
      <section>
        <div
          className="container"
          style={{ pointerEvents: !listStatus ? "none" : "auto" }}
        >
          <ReactPaginate
            nextLabel=">"
            breakLabel=".."
            initialPage={0}
            previousLabel="<"
            pageCount={totalPages}
            disableInitialCallback={true}
            containerClassName="pagination"
            pageClassName="pagination-page"
            nextClassName="pagination-next"
            pageRangeDisplayed={rangeDisplayed}
            marginPagesDisplayed={rangeDisplayed}
            onPageChange={this.pageChangeHandler}
            previousClassName="pagination-previous"
          />
        </div>
      </section>
    );
  }
}

Pagination.propTypes = {
  PokemonStore: PropTypes.object
};

export default inject("PokemonStore")(observer(Pagination));
