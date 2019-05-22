import React, { memo } from "react";
import PropTypes from "prop-types";

import FusionCharts from "fusioncharts";
import ReactFC from "react-fusioncharts";
import ImageLoader from "../ImageLoader/ImageLoader";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import "../../styles/Pokemon.scss";

const Pokemon = ({ name, sprites, types, stats }) => {
  const data = stats.map(({ base_stat: value, stat }) => ({
    label: stat.name,
    value
  }));

  const chartConfigs = {
    type: "Pie3D",
    width: "100%",
    height: 250,
    dataSource: {
      chart: {
        enableMultiSlicing: 0,
        showLabels: false,
        theme: "fusion",
        legendScrollBgColor: "#fff"
      },
      data
    }
  };

  return (
    <div className="c-card-main-block">
      <div className="c-card-flip">
        <div className="c-card-flip__flipper">
          <div className="c-card-flip__front">
            <div className="c-card__header">
              <div className="c-card__img--container">
                <ImageLoader
                  src={sprites.front_default}
                  className="c-card__image"
                  alt="..."
                />
              </div>
            </div>

            <div className="c-card__body">
              <h2 className="c-card__title">{name}</h2>
            </div>

            <div className="c-card__footer">
              {types.map(({ type }) => (
                <div key={type.name} className={`chip ${type.name}`}>
                  {type.name}
                </div>
              ))}
            </div>
          </div>

          <div className="c-card-flip__back">
            <ReactFC {...chartConfigs} />
          </div>
        </div>
      </div>
    </div>
  );
};

Pokemon.propTypes = {
  name: PropTypes.string,
  sprites: PropTypes.object,
  types: PropTypes.array,
  stats: PropTypes.array
};

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default memo(Pokemon);
