/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
Array.prototype.tagFilter = function(info) {
  let matches = [];
  let matchesFilter;
  let count;
  let types;

  matchesFilter = item => {
    count = 0;
    info.map((data, index) => {
      types = item[info[index]["field"]];
      return types.map(({ type }) => {
        if (info[index]["values"].indexOf(type.name) > -1) {
          count++;
        }
        return count;
      });
    });
    return count === info.length || count === types.length;
  };

  this.map((data, i) => {
    if (matchesFilter(this[i])) {
      matches.push(this[i]);
    }
    return matches;
  });

  return matches;
};
