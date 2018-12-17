/*eslint-disable*/
import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <React.Fragment>
      <label>Search for a coin:</label> <br />
      <input
        type="text"
        name="query"
        placeholder="BTC,ETH,XRP..."
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </React.Fragment>
  );
};

export default SearchBox;
