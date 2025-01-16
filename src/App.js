import { useState , useEffect} from "react";
import "./App.css";
import IncomeModal from "./components/IncomeModal.js"
import ExpenseModal from "./components/ExpenseModal.js"
import Modal from "react-modal";
import {useSnackbar} from 'notistack'
import ExpenseSummary from "./components/ExpenseSummary.js";
import ExpenseTrends from "./components/ExpenseTrends.js";
import ExpenseList from "./components/ExpenseList.js"
import DeleteExpenseModal from "./components/DeleteExpenseModal.js";
Modal.setAppElement('#root');
function App() {
  

  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isDeleteExpenseModalOpen, setIsDeleteExpenseModalOpen] =useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState([]);
  const [expenseToDelete, setExpenseToDelete] = useState([]);

  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem("walletBalance");
      const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
      if (savedBalance) {
        const parsedBalance = parseFloat(savedBalance);
        if (!isNaN(parsedBalance)) {
          setWalletBalance(parsedBalance);
        }
      }
  
      if (savedExpenses.length !== expenses.length) {
        setExpenses(savedExpenses);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [expenses.length]);

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
        <h1>Expense Tracker</h1>
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
                + Add Income
              </button>

            </div>
          </div>

          <div className="col-sm">
            <div className="add-expense">              
            <h2 style={{ display: "flex" }}>
                  <div style={{ color: "white" }}>Expenses:</div>₹
                  {expenses.reduce(
                    (total, expense) => total + expense.amount,
                    0
                  )}
                </h2>
                <button
                  onClick={openExpenseModal}
                  style={{
                    background:
                      "linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  + Add Expense
                </button>    
            </div>
          </div>
          <div className="col-sm">
        <ExpenseSummary expenses={expenses} />
          </div>
        </div>

        <div className="lower-section">         
            <div
              className="recent-transactions"            
            >
              <h2 style={{ fontStyle: "italic" }}>Recent Transactions</h2>
              <ExpenseList
                expenses={expenses}
                onEdit={openEditExpenseModal}
                onDelete={(id) => openDeleteExpenseModal(id)}
              />
            </div>

            <div
              className="expense-trends"
              style={{ width: "40%", height: "345px" }}
            >
              <div className="recent-transactions">
                <ExpenseTrends
                  expenses={expenses}
                  style={{ width: "100%", height: "100%" }}
                />
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

<DeleteExpenseModal
        isOpen={isDeleteExpenseModalOpen}
        onClose={closeDeleteExpenseModal}
        onDelete={removeExpense}
        expenseId={expenseToDelete}
      /> 
    </div>
  );
}

export default App;
