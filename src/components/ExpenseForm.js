import React, { useState } from "react";

function ExpenseForm({ addExpense, closeExpenseModal, walletBalance }) {
  
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !category || !date) {
      setError("Please fill out all fields.");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (parseFloat(amount) > walletBalance) {
      setError("Insufficient wallet balance.");
      return;
    }

    const resetForm = () => {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setError("");
    };

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date,
    };
    console.log("Submitting Expense:", newExpense);
    addExpense(newExpense);
     resetForm();
    closeExpenseModal();
  };


  return (
    <div className="modal">
      <h2>Add Expense</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="input-group" style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="price"
            name="price"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select Category"
            name="category"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
          </select>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className="modal-buttons">
          <button
            type="submit"
            className="btn add-button"
            style={{ width: "250px", backgroundColor: "#F4BB4A" }}
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={closeExpenseModal}
            className="btn cancel-button"
            style={{ width: "100px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
