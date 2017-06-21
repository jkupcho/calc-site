import React from 'react';

export const Label = ({children, ...rest}) => {
  return (
      <label className="label">{children}</label>
  );
}

export const NumberInput = ({label, value, onChange}) => {
  return (
    <div className="field">
      <Label>{label}</Label>
      <p className="control">
        <input type="number" className="input" onChange={onChange} defaultValue={value} />
      </p>
    </div>
  );
}