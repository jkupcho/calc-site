import React from 'react';

export const Label = ({children, ...rest}) => {
  return (
      <label className="label">{children}</label>
  );
}