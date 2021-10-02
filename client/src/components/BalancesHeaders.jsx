import React from 'react';

export const BalancesHeaders = ({ headers = [] }) => {
  console.log('The headers are: ', headers);
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
