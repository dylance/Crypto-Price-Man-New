import React from 'react'
const imgPath = process.env.PUBLIC_URL + '/assets/img/logos/';

const BittrexCard = (props) => {
  return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <img alt={props.ticker.coin} src={imgPath + props.ticker.coin + '.png'}/>
          </li>
          <li className="list-group-item">Price: {props.ticker.Last}</li>
        </ul>
      </div>
    )
}

export default BittrexCard;
