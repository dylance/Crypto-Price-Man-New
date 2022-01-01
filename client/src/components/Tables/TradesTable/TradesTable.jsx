import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { TableHeaders } from '..';
import { formatDate, formatCurrency } from '../../../util';
import { TableWrapper, StyledTable } from './styled';

export const TradesTable = ({ coin, baseCurrency = 'USD' }) => {
  const [transactions, setTransactions] = useState([]);
  const decimalLimit = baseCurrency === 'USD' ? 2 : 7;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `/api/coinbase/trades?coin=${coin}&baseCurrency=${baseCurrency}`,
        );
        const { data: priceTicker } = await axios.get(
          `/api/coinbase/price-ticker?productId=${coin}-${baseCurrency}`,
        );

        const currentPrice = parseFloat(priceTicker.price);

        const tradesWithCurrentTotal = data.map((trade) => {
          const currentValue = trade.totalAtTheTime * currentPrice;
          return {
            ...trade,
            currentValue,
            costBasis:
              (trade.totalBought - trade.totalSold) /
              parseFloat(trade.totalAtTheTime),
            currentPurchaseValueGain:
              ((trade.size * currentPrice - trade.baseCurrencySpent) /
                trade.baseCurrencySpent) *
              100,
            gains:
              trade.totalAtTheTime * currentPrice -
              trade.totalBought +
              trade.totalSold,
            totalGains:
              ((currentValue - trade.totalBought) /
                parseFloat(trade.totalBought)) *
              100,
          };
        });

        if (data && data.length > 0) {
          setTransactions(tradesWithCurrentTotal);
        }
      } catch (err) {
        console.log('The error is: ', err);
      }
    }
    fetchData();
  }, [baseCurrency, coin]);

  console.log('Trades with tradesWithCurrentTotal is: ', transactions);

  if (transactions.length === 0) {
    return (
      <h2>{`No transactions with ${coin} and base of ${baseCurrency}`}</h2>
    );
  }

  return (
    <TableWrapper>
      <div>
        <StyledTable>
          <TableHeaders
            headers={[
              'Date',
              'Type',
              'Price',
              `${coin} Bought`,
              `${baseCurrency} Spent`,
              'Total Spent',
              'Current Total',
              'Total Sold',
              'Cost Basis',
              'Current Value',
              'Gains',
              'Percent Change',
              'Total Percent Change',
            ]}
          />

          <tbody>
            {transactions.map((transaction) => {
              const {
                created_at,
                baseCurrencySpent,
                type,
                price,
                // Represents total bought in base currency
                totalBought,
                size,
                totalAtTheTime,
                // Represents total bought in base currency
                totalSold,
                currentValue,
                gains,
                costBasis,
                totalGains,
                currentPurchaseValueGain,
              } = transaction;

              return (
                <tr key={`${created_at}-${baseCurrencySpent}`}>
                  <th>{formatDate(created_at)}</th>
                  <td>{type}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatCurrency(price, decimalLimit, baseCurrency)}
                  </td>
                  <td>{size.toFixed(3)}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatCurrency(
                      baseCurrencySpent,
                      decimalLimit,
                      baseCurrency,
                    )}
                  </td>
                  <td>
                    {formatCurrency(totalBought, decimalLimit, baseCurrency)}
                  </td>

                  <td>{totalAtTheTime.toFixed(3)}</td>
                  <td>
                    {formatCurrency(totalSold, decimalLimit, baseCurrency)}
                  </td>
                  <td>
                    {formatCurrency(costBasis, decimalLimit, baseCurrency)}
                  </td>
                  <td>
                    {formatCurrency(currentValue, decimalLimit, baseCurrency)}
                  </td>
                  <td>{formatCurrency(gains, decimalLimit, baseCurrency)}</td>
                  <td>{currentPurchaseValueGain.toFixed(2)}%</td>
                  <td>{totalGains.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </div>
    </TableWrapper>
  );
};
