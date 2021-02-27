import React from 'react';
import { Link } from 'react-router-dom';

const Exchanges = () => {
  return (
    <div className="exchanges">
      <Link to="/">Coinbase</Link>
      <Link to="/bittrex">Bittrex</Link>
      <Link to="/poloniex">Poloniex</Link>
      <Link to="/account">Account</Link>
    </div>
  );
};

export default Exchanges;
