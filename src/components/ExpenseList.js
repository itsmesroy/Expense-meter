
import React from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList( {expenses, onEdit, onDelete} ){
    if (!Array.isArray(expenses) || expenses.length === 0) {
        return <p>No expenses found.</p>;
      }
  return (
    <div className="expense-list">
    
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} onEdit={onEdit}
          />
        ))
}
    </div>
  );
}

export default ExpenseList;