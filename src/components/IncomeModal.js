import React, { useState } from "react";
import Modal from "react-modal";
import "../App.css";

function IncomeModal({ isOpen, onClose, addIncome }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0 || isNaN(amount)) {
      setError("Enter a valid amount");
      return;
    }
    addIncome(parseFloat(amount));
    setError("");
    setAmount("");
    onClose();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value && !isNaN(value) && parseFloat(value) > 0) {
      setError("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName={`modal-overlay ${isOpen ? "open" : ""}`}
      style={{ width: "538px", height: "164px" }}
    >
      <h2>Add Balance</h2>
      <form onSubmit={handleSubmit} className="incomeForm" style={{ display: "flex", gap: "10px" }}>
        {error && <div className="error">{error}</div>}
        <input
          type="number"
          placeholder="Income Amount"
          value={amount}
          onChange={handleInputChange}
          required
          style={{ width: "300px" }}
        />
        <button
          type="submit"
          className="add-button"
          style={{ width: "145px", backgroundColor: "#F4BB4A" }}
        >
          Add Balance
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={onClose}
          style={{ width: "100px" }}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default IncomeModal;
