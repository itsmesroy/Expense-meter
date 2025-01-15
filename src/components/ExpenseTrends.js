import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseTrends({ expenses }) {
  const groupedByCategory = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  if (expenses.length === 0) {
    return <p>No expense trends available.</p>;
  }

  const data = Object.keys(groupedByCategory).map((category) => ({
    name: category,
    value: groupedByCategory[category],
  }));

  return(
    <div className="expense-trends">
      <h2 style={{ fontStyle: "italic" }}>Top Expenses</h2>
      <ResponsiveContainer width="80%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={false} />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseTrends;
