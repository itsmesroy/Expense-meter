import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../App.css";
import ExpenseForm from "./ExpenseForm";
function ExpenseModal({
  isOpen,
  onClose,
  addExpense,
  editExpense,
  expenseToEdit,
  walletBalance,
  enqueueSnackbar,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title || "");
      setAmount(expenseToEdit.amount?.toString() || "");
      setCategory(expenseToEdit.category || "");
      setDate(expenseToEdit.date || "");
    } else {
      resetModalState();
    }
  }, [expenseToEdit, isOpen]);

  const resetModalState = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleSubmit = (expense) => {
    if (expenseToEdit) {
      editExpense(expense);
    } else {
      addExpense(expense);
    }
    onClose();
    resetModalState();
  };

  const handleClose = () => {
    onClose();
    resetModalState();
  };

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal"
      overlayClassName={`modal-overlay ${isOpen ? "open" : ""}`}
    >
      <h2>{expenseToEdit ? "Edit Expense" : "Add Expense"}</h2>
      <ExpenseForm
        addExpense={handleSubmit}
        closeExpenseModal={handleClose}
        walletBalance={walletBalance}
        enqueueSnackbar={enqueueSnackbar}
        expenseToEdit={{ title, amount, category, date }}
      />
    </Modal>
  );
}

export default ExpenseModal;
