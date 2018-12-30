/*eslint-disable*/
import React from "react";

const Select2 = ({ value, onChange }) => {
  return (
    <React.Fragment>
        <label>Data interval:</label> <br />
        <select onChange={ e => onChange(e.currentTarget.value) }>
            <option value="histoday">1 day</option>
            <option value="histohour">3 h</option>
            <option value="histominute">10 min</option>
        </select>
    </React.Fragment>
  );
};

export default Select2;
