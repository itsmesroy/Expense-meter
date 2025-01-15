import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

function ExpenseSummary({ expenses }) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  if (expenses.length === 0) {
    return <p>No expenses to summarize.</p>;
  }

  const COLORS = ["#ff6666", "#66b3ff", "#99ff99", "#ffcc99", "#ffccff"];

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));
  return(
    <div
      className="expense-summary"
      style={{ width: "250px", height: "250px", padding: "10px" }}
    >
      <PieChart width={230} height={230}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseSummary;
