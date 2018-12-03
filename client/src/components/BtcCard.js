import React from 'react'

const BtcCard = (props) => {
  return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.prices.coin}</li>
          <li className="list-group-item">Price: {props.prices.price}</li>
          <li className="list-group-item">Volume: {props.prices.volume}</li>
        </ul>
      </div>
    )

}

export default BtcCard;
