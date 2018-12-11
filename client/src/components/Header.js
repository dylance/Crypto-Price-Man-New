import React from 'react';

const Header = () => {
  return (
    <React.Fragment>

    <div className="head-image" style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "assets/img/btc-header.jpg)"}}>
      <nav className="navbar navbar-dark justify-content-between">
        <a className="navbar-brand">Crypto Price Man</a>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
      </nav>
    </div>
    </React.Fragment>
  )
}

export default Header;
