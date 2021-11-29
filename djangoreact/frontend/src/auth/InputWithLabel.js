/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function InputWithLabel({ label, ...rest }) {
  return (
    <div className="input_label_box">
      <h3 className="lable">{label}</h3>
      <input {...rest} />
    </div>
  );
}

export default InputWithLabel;
