import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { perOptions } from "../../utils/constants/constants";

import Select from "react-select";
import "../../styles/PerSelect.scss";

const PerSelect = ({ PokemonStore: { listStatus, setPerPage } }) => {
  let selectEl = null;

  const changeHandler = ({ value }) => {
    const { value: currentValue } = selectEl.state.value;

    currentValue !== value && setPerPage(value);
  };

  return (
    <Select
      onChange={changeHandler}
      options={perOptions}
      defaultValue={perOptions[0]}
      isSearchable={false}
      isDisabled={!listStatus}
      ref={el => (selectEl = el)}
      className="per-page__select"
      classNamePrefix="per-page__select"
    />
  );
};

PerSelect.propTypes = {
  PokemonStore: PropTypes.object
};

export default inject("PokemonStore")(observer(PerSelect));
