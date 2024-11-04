import React from "react";

const Checkbox = ({ type, label, checked, onChange, disabled, value }) => {
  return (
    <label>
      <input
        type={type}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
      {label}
    </label>
  );
};

export default Checkbox;
