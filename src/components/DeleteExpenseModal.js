import React from 'react'
import Modal from "react-modal"
import "../App.css"


function DeleteExpenseModal( {expenseId, isOpen, onClose, onDelete}){
    const handleDelete=()=>{
        onDelete(expenseId)
    };
    return(
        <Modal className="modal" isOpen={isOpen} onRequestClose={onClose}>
            <h2>Do you want to delete this expense?</h2>
            <button onClick={handleDelete} className="modal-buttons">
               Delete
            </button>
            <button onClick={onClose} className='btn cancel-button'> 
                Cancel
            </button>
        </Modal>
    )
}
export default DeleteExpenseModal;
