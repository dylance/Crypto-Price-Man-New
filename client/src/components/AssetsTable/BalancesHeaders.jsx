import React from 'react';

export const BalancesHeaders = ({ headers = [] }) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => {
          return <th key={header}>{header}</th>;
        })}
      </tr>
    </thead>
  );
};
