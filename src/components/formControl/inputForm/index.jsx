import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

Input.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function Input(props) {
  const { form, name, label, disabled } = props;
  return (
    <Controller name={name} control={form.control}>
      <input type="text" />
    </Controller>
  );
}

export default Input;
