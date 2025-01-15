import { useState } from "react";
import "./App.css";
import IncomeModal from "./components/IncomeModal.js"
import ExpenseModal from "./components/ExpenseModal.js"
import Modal from "react-modal";
import {useSnackbar} from 'notistack'
Modal.setAppElement('#root');

function App() {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isDeleteExpenseModalOpen, setIsDeleteExpenseModalOpen] =useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState([]);
  const [expenseToDelete, setExpenseToDelete] = useState([]);

  const openIncomeModal = () => { console.log("Opening Income Modal"); setIsIncomeModalOpen(true)};
  const closeIncomeModal = () => setIsIncomeModalOpen(false);

  const openExpenseModal = () => setIsExpenseModalOpen(true);
  const closeExpenseModal = () => setIsExpenseModalOpen(false);

  const openEditExpenseModal = (expense) => {
    setExpenseToEdit(expense);
    openExpenseModal();
  };
  const closeEditExpenseModal = () => {
    closeExpenseModal();
    setExpenseToEdit(null);
  };
  const openDeleteExpenseModal = (expenseId) => {
    setIsDeleteExpenseModalOpen(true);
    setExpenseToDelete(expenseId);
  };
  const closeDeleteExpenseModal = () => {
    setIsDeleteExpenseModalOpen(false);
  };
  const addIncome = (amount) => {
    const newWalletBalance = walletBalance + amount;
    setWalletBalance(newWalletBalance);
    localStorage.setItem("WalletBalance", newWalletBalance);
  };


  const addExpense=(expense)=>{
    const newExpense = { ...expense, id: new Date().getTime() };
    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses))};

  const editExpense=(updatedExpense)=>{
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
  };

    const removeExpense = (expenseId) => {
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== expenseId
      );
      setExpenses(updatedExpenses);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      closeDeleteExpenseModal();
    };
  const {enqueueSnackbar} =useSnackbar();
  return (
    <div className="App">
        <h2>Expense Tracker</h2>
      <div className="Container">

        <div className="row align-items-center ">
          <div className="col-sm">
            <div className="wallet-balance">
              <h2>
                Wallet Balance: ₹ {walletBalance}
              </h2>
              <button
                className="button"
                type="button"
                style={{
                  background:
                    "linear-gradient(90deg, #B5DC52 0%, #89E148 100%)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={openIncomeModal} >
                +Add Income
              </button>
            </div>
          </div>

          <div className="col-sm">
            <div className="add-expense">              
              <h2>Expenses: ₹  {expenses.reduce(
                    (total, expense) => total + expense.amount,
                    0
                  )}</h2>
              <button type="button" onClick={openExpenseModal}style={{  background:
                   "linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",}}>
                +Add Expense
              </button>              
            </div>
          </div>



        </div>
      </div>
      <IncomeModal
      isOpen={isIncomeModalOpen}
      onClose={closeIncomeModal}
      addIncome={addIncome}/>
      
      <ExpenseModal
      isOpen={isExpenseModalOpen}
      onClose={closeEditExpenseModal}
      addExpense={addExpense}
      editExpense={editExpense}
      expenseToEdit={expenseToEdit}
      walletBalance={walletBalance}
      enqueueSnackbar={enqueueSnackbar}/>
    </div>
  );
}

export default App;
