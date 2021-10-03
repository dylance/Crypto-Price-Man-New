import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#FF1234',
  '#CC1234',
  '#001234',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export const AssetsPieChart = ({ accounts = [] }) => {
  const data = accounts.map((account) => {
    let value =
      account.currency === 'USD'
        ? account.available
        : parseFloat(
            ((0 + account.available) * (0 + account.USDPrice)).toFixed(2),
          );

    if (account.currency === 'BTC') {
      value = value + 1.4535 * (0 + account.USDPrice);
    }

    return { name: account.currency, value };
  });

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={700} height={700}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
