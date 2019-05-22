import axios from "axios";
import API from "../../api/API";
import { action, observable, configure, runInAction } from "mobx";

import "../../utils/helperFunctions/tagFilter/tagFilter";

configure({ enforceActions: "observed" });

class PokemonStore {
  @observable currentPage = 1;
  @observable offset = 0;
  @observable limit = 10;
  @observable searchTerm = "";
  @observable listStatus = false;
  @observable typeStatus = false;
  @observable pokemonData = {};
  @observable tagValues = [];
  @observable pokemonList = [];
  @observable pokemonTypes = [];
  @observable filteredPokemonList = [];
  @observable filteredPokemonList = [];
  @observable filteredListIsTag = null;

  @action searchExecuter = (arr, term) => {
    return arr.filter(({ name }) => {
      const validName = name.toLowerCase();
      const validTerm = term.toLowerCase();

      return validName.includes(validTerm);
    });
  };

  @action searchPokemon = term => {
    const list = this.tagValues.length
      ? this.filteredPokemonList
      : this.pokemonList;

    this.searchTerm = term.replace(/\s/g, "");

    if (this.tagValues.length) {
      this.filteredListIsTag = this.filteredPokemonList;
      this.filteredListIsTag = this.searchExecuter(
        this.filteredPokemonList,
        term
      );
    } else {
      this.filteredPokemonList = this.searchExecuter(list, term);
    }
  };

  @action filterPokemon = values => {
    this.tagValues = values;

    if (values.length) {
      const criteria = [{ field: "types", values }];
      const list = this.searchTerm
        ? this.filteredPokemonList
        : this.pokemonList;
      const filtered = list.tagFilter(criteria);

      this.filteredPokemonList = filtered;
    } else {
      this.filteredPokemonList = [];
      this.filteredListIsTag = null;
      this.searchTerm && this.searchPokemon(this.searchTerm);
    }
  };

  @action setPage = currentPage => {
    this.tagValues = [];
    this.searchTerm = "";
    this.filteredListIsTag = null;
    this.currentPage = currentPage;
    this.offset = (currentPage - 1) * this.limit;
    this.getPokemonList();
  };

  @action setPerPage = perPage => {
    this.limit = perPage;
    this.offset = (this.currentPage - 1) * this.limit;
    this.getPokemonList();
  };

  @action setListStatus = status => {
    this.listStatus = status;
  };

  @action sortByIdList = list => list.slice().sort((a, b) => a.id - b.id);

  @action passPokemonHandler = pokemon => {
    this.pokemonList.push(pokemon);
    this.pokemonList = this.sortByIdList(this.pokemonList);

    if (this.pokemonList.length === this.pokemonData.results.length) {
      this.listStatus = true;
    }
  };

  @action getPokemon = async url => {
    try {
      const { data } = await axios.get(url);
      runInAction(() => {
        this.passPokemonHandler(data);
      });
    } catch (error) {
      runInAction(() => {
        this.status = false;
      });
    }
  };

  @action getPokemonList = async (offset = this.offset, limit = this.limit) => {
    this.pokemonList = [];
    this.listStatus = false;

    try {
      const { data } = await API.get(
        `/pokemon/?offset=${offset}&limit=${limit}`
      );

      runInAction(() => {
        this.pokemonData = data;
        data.results.forEach(({ url }) => this.getPokemon(url));
      });
    } catch (error) {
      runInAction(() => {
        this.listStatus = false;
      });
    }
  };

  @action getPokemonTypes = async () => {
    this.typeStatus = false;

    try {
      const { data } = await API.get("type");

      runInAction(() => {
        this.pokemonTypes = data.results;
        this.typeStatus = true;
      });
    } catch (error) {
      runInAction(() => {
        this.typeStatus = false;
      });
    }
  };
}

export default new PokemonStore();
