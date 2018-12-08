import React from 'react'
const imgPath = process.env.PUBLIC_URL + '/assets/img/logos/';

const BtcCard = (props) => {
  return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <img alt={props.ticker.coin} src={imgPath + props.ticker.coin + '.png'}/>
          </li>
          <li className="list-group-item">Price: {props.ticker.price}</li>
          <li className="list-group-item">Volume: {props.ticker.volume}</li>
          <li className="list-group-item">24 hr high: {props.stats.high || "high"}</li>
          <li className="list-group-item">24 hr low: {props.stats.low || "low"}</li>
        </ul>
      </div>
    )
}

export default BtcCard;
