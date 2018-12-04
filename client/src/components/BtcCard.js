import React from 'react'

const BtcCard = (props) => {
  return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.ticker.coin}</li>
          <li className="list-group-item">Price: {props.ticker.price}</li>
          <li className="list-group-item">Volume: {props.ticker.volume}</li>
          <li className="list-group-item">24 hr high: {props.stats.high}</li>
          <li className="list-group-item">24 hr low: {props.stats.low}</li>
        </ul>
      </div>
    )
}

export default BtcCard;
