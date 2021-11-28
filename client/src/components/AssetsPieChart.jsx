import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#FF1234',
  '#CC1234',
  '#f2a900',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${ (percent * 100).toFixed(1) }%`}
    </text>
  );
};

export const AssetsPieChart = ({ accounts = [] }) => {
  let total = 0;

  const data = accounts.map((account) => {
    const value = account.currency === 'USD'
      ? account.available
      : parseFloat(
        ((0 + account.available) * (0 + account.USDPrice)).toFixed(2)
      );

    total += value;

    return { name: account.currency, value };
  });
  console.log('The data is: ', data);

  console.log('The total is: ', total);

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={140}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${ entry.name }`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
