/*eslint-disable*/
import React from "react";

const SearchBox = ({ value, onChange, placeholder, label }) => {
  return (
    <React.Fragment>
      { label &&
        <div>
          <label>{ label }</label> <br />
        </div>
      }

      <input
        type="text"
        name="query"
        placeholder={ placeholder }
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </React.Fragment>
  );
};

export default SearchBox;
