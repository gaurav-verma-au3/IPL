import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Chart = props => {
  return (
    <BarChart
      width={window.innerWidth / 1.2}
      height={400}
      data={props.data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="played" stackId="a" fill="#8884d8" />
      <Bar dataKey="wins" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
};

export default Chart;
