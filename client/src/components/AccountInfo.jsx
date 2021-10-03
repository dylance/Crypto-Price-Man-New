import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AccountInfo = ({ coin, baseCurrency = 'USD' }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `/api/coinbase/sorted?coin=${ coin }&baseCurrency=${ baseCurrency }`
        );

        if (data && data.length > 0) {
          setTransactions(data);
        }
      } catch (err) {}
    }
    fetchData();
  }, [baseCurrency, coin]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '0',
        paddingTop: '80px',
        margin: 'auto',
        maxWidth: '1400px',
      }}
    >
      <div
        style={{
          boxShadow:
            '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>USD</th>
              <th>type</th>
              <th>price</th>
              <th>total at time</th>
              <th>{`${ coin } Bought`}</th>
              <th>total spent</th>
              <th>total sold</th>
              <th>cost / coin</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trans) => {
              return (
                <tr key={`${ trans.created_at }-${ trans.usdAmmount }`} style={{}}>
                  <th>
                    {(function () {
                      const str = trans.created_at.substring(0, 10).split('-');
                      return `${ str[1] }-${ str[2] }-${ str[0] }`;
                    }())}
                  </th>
                  <td>
                    {parseFloat(trans.usdAmmount)
                      .toFixed(3)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                  <td>{trans.type}</td>
                  <td>
                    {parseFloat(trans.price)
                      .toFixed(3)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                  <td>
                    {trans.totalAtTheTime && trans.totalAtTheTime.toFixed(3)}
                  </td>
                  <td>{trans.size && trans.size.toFixed(3)}</td>
                  <td>
                    {trans.totalBought
                      && trans.totalBought
                        .toFixed(3)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                  <td>{trans.totalSold && trans.totalSold.toFixed(3)}</td>
                  <td>
                    {(
                      (trans.totalBought - trans.totalSold)
                      / parseFloat(trans.totalAtTheTime)
                    )
                      .toFixed(3)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
