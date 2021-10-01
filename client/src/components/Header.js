import React from 'react';

import Login from './Login';

export const Header = () => {
  return (
    <>
      <div
        className="head-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/btc-header.jpg)`,
        }}
      >
        <nav className="navbar navbar-dark justify-content-between">
          <a href="/" className="navbar-brand">
            Crypto Price Man
          </a>
          <Login />
        </nav>
      </div>
    </>
  );
};
