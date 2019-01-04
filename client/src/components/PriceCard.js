import React from 'react'
const imgPath = process.env.PUBLIC_URL + '/assets/img/logos/';

const PriceCard = (props) => {
  const ticker = props.ticker
  const stats = props.stats || 2
  console.log("stats.high is", stats)
  return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <img alt={ticker.coin} src={imgPath + ticker.coin.toLowerCase() + '.png'}/>
            {ticker.coin}
          </li>
          <li className="list-group-item">Price: {ticker.price}</li>
          <li className="list-group-item">Volume: {ticker.volume}</li>
          <li className="list-group-item">24 hr high: {stats.high || ticker.high}</li>
          <li className="list-group-item">24 hr low: {stats.low || ticker.low}</li>


        </ul>
      </div>
    )
}

export default PriceCard;

//{ stats !==  2 "undefined" && <li className="list-group-item">24 hr high: {stats.high}</li>}
//{ stats !==  2 "undefined" && <li className="list-group-item">24 hr low: {stats.low}</li>}
