import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ApexChart = ({ url }) => {
  useEffect(async () => {
    try {
      const res = await axios.get(url);
      // const res2 = await axios.get('/api/coinbase/eth-ticker');
      console.log('The response is: ', res);
      console.log('The res is: ', res.data);

      const dataArray = await res.data.map((candle) => {
        console.log('Type of : is', typeof candle[0]);
        console.log(
          'The date is: ',
          new Date(candle[0]).toISOString().substring(0, 10),
        );
        return {
          x: new Date(candle[0] * 1000),
          y: [candle[3], candle[1], candle[2], candle[4]],
        };
      });

      // const dataArray2 = await res2.data.map((candle) => {
      //   return {
      //     x: new Date(candle[0]),
      //     y: [candle[3], candle[1], candle[2], candle[4]],
      //   };
      // });
      await setCandles([{ name: 'candle', data: dataArray }]);
    } catch (err) {
      console.log('The error is: ', err);
    }
  }, []);

  const [candles, setCandles] = useState([]);

  //
  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={candles}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
