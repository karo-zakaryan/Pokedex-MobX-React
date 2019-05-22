import chroma from "chroma-js";

export const perOptions = [
  { value: 10, label: "Per 10" },
  { value: 20, label: "Per 20" },
  { value: 50, label: "Per 50" }
];

export const typeColors = [
  { color: "#a4acaf", name: "normal" },
  { color: "#d56723", name: "fighting" },
  { color: "#3dc7ef", name: "flying" },
  { color: "#b97fc9", name: "poison" },
  { color: "#f7de3f", name: "ground" },
  { color: "#a38c21", name: "rock" },
  { color: "#729f3f", name: "bug" },
  { color: "#7b62a3", name: "ghost" },
  { color: "#9eb7b8", name: "steel" },
  { color: "#fd7d24", name: "fire" },
  { color: "#4592c4", name: "water" },
  { color: "#9bcc50", name: "grass" },
  { color: "#eed535", name: "electric" },
  { color: "#f366b9", name: "psychic" },
  { color: "#51c4e7", name: "ice" },
  { color: "#53a4cf", name: "dragon" },
  { color: "#707070", name: "dark" },
  { color: "#fdb9e9", name: "fairy" },
  { color: "#000", name: "unknown" },
  { color: "#000", name: "shadow" }
];

export const typeColourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default"
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css()
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white"
    }
  })
};
