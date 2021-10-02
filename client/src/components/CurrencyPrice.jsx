import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CurrencyPrice = ({ currency, baseCurrency = 'USD' }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getPrice = async (currency, baseCurrency) => {
      try {
        const res = await axios.get(
          `/api/coinbase/price-ticker?productId=${currency}-${baseCurrency}`,
        );

        setPrice(res.data);
      } catch (err) {
        console.log('The error is: ', err);
      }
    };
    getPrice(currency, baseCurrency);
  }, [currency]);

  return <div>{price ? price.price : '--.--'}</div>;
};
