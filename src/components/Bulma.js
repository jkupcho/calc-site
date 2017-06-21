import React from 'react';

export const Label = ({children, ...rest}) => {
  return (
    <div className="field-label is-normal">
      <label className="label">{children}</label>
    </div>
  );
}