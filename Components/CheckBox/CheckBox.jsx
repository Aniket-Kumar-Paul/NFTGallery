import React from "react";

// INTERNAL IMPORT
import Style from "./CheckBox.module.css"

const CheckBox = ({ category, setCategory }) => {
  return (
    <label
      className={Style.material_checkbox}
      onClick={() => setCategory(category)}
    >
      <input type="checkbox" />
      <span className={Style.checkmark}></span>
      {category}
    </label>
  );
};

export default CheckBox;
