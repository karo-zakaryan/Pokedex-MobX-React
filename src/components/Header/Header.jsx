import React from "react";

import FilterBox from "../FilterBox/FilterBox";
import PerSelect from "../PerSelect/PerSelect";
import SearchBox from "../SearchBox/SearchBox";
import "../../styles/Header.scss";

const Header = () => (
  <header>
    <div className="container">
      <div className="header">
        <SearchBox />
        <FilterBox />
        <PerSelect />
      </div>
    </div>
  </header>
);

export default Header;
