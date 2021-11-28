import React from 'react';
import { Link } from 'react-router-dom';

import { coinFullNames } from '../../constants';
import { AssetNameWrapper } from './styled';

export const AssetName = ({ currency }) => {
  return (
    <AssetNameWrapper>
      <div>
        <img
          src={`${ process.env.PUBLIC_URL }/assets/img/logos/${ currency }.png`}
          height='40'
          alt='USD'
        />
      </div>

      <div>
        <div>{coinFullNames[currency]}</div>
        <Link to={`/coin/${ currency }`}>{currency}</Link>
      </div>
    </AssetNameWrapper>
  );
};
