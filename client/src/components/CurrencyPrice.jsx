import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CurrencyPrice = ({
  currency,
  baseCurrency = 'USD',
  updateAccountPrice,
  account,
}) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getPrice = async (currency, baseCurrency, account) => {
      try {
        const res = await axios.get(
          `/api/coinbase/price-ticker?productId=${currency}-${baseCurrency}`,
        );

        setPrice(res.data);
        updateAccountPrice(currency, baseCurrency, res.data.price, account);
      } catch (err) {
        console.log('The error is: ', err);
      }
    };
    getPrice(currency, baseCurrency, account, updateAccountPrice);
  }, [currency, baseCurrency, account]);

  return <div>{price ? price.price : '--.--'}</div>;
};
