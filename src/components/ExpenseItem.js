import React from "react";
import deleteIcon from "../assets/deleteIcon.png";
import editIcon from "../assets/editIcon.png";

function ExpenseItem({ expense, onEdit, onDelete }) {
  const { title, amount, date } = expense;

  return(
    <div
      className="expense-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div
        className="expense-details"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{title}</p>
        <p style={{ color: "#888", fontSize: "0.9em" }}>
          {new Date(date).toLocaleDateString()}
        </p>
      </div>

      <p style={{ color: "#F4BB4A", fontSize: "1.1em", textAlign: "right" }}>
        <strong>₹</strong>
        {amount.toFixed(2)}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "5px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => onEdit(expense)}
            className="btn edit-button"
            style={{ backgroundColor: "transparent", border: "none", padding: "0" }}
          >
            <img src={editIcon} alt="edit-button" />
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="btn delete-button"
            style={{ backgroundColor: "transparent", border: "none", padding: "0" }}
          >
            <img src={deleteIcon} alt="delete-button" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
