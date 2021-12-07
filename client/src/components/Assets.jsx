import React from 'react';
import styled from 'styled-components';

import { fetchData } from '../hooks/fetchData';
import { AssetsTable } from './Tables/AssetsTable';
import { AssetsTotals } from './AssetsTotals';
import { AssetsPieChart } from './AssetsPieChart';

const BalancesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
  padding-top: 80px;
  margin: auto;
  max-width: 1200px;
`;

const AssetsTableChartRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Assets = () => {
  /**
  Interface Asset {
    available: number;
    balance: number;
    currency: string;
    id: string;
    profile_id: string;
    BTCPrice: number | undefined;
    BTCTotal: number | undefined;
    USDPrice: number | undefined;
    USDTotal: number | undefined;
  }
   */
  const [{ data: assets }] = fetchData(
    '/api/coinbase/accounts?showAccountsWithBalance=true',
  );

  return (
    <>
      <BalancesWrapper>
        <AssetsTableChartRow>
          <AssetsTable assets={assets} />
          <AssetsPieChart accounts={assets} />
        </AssetsTableChartRow>
        <AssetsTotals assets={assets} />
      </BalancesWrapper>
    </>
  );
};
