import React from 'react';

const Header = () => {
  return (
    <div className="head-image" style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "assets/img/btc-header.jpg)"}}/>
  )
}

export default Header;
