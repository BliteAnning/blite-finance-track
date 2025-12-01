import React, { useEffect, useState } from 'react'
import userAuth from '../hooks/userAuth'
import DashboardLayout from '../components/DashboardLayout';
import ExpenseOverview from '../components/ExpenseOverview';
import axiosInstance from '../axiosInstance';
import Modal from '../components/Modal';
import AddExpenseForm from '../components/AddExpenseForm';
import toast from 'react-hot-toast';
import ExpenseList from '../components/ExpenseList';
import DeleteAlert from '../components/DeleteAlert';
import axios from 'axios';


const Expense = () => {
  userAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const getExpenseDetails = async () => {
    if (loading) return;
    setLoading(true)

    try {
      const response = await axiosInstance.get("/expense/get-all-expense")
      if (response.data.success) {
        setExpenseData(response.data.data)
      }

      if (response.data.error) {
        console.log("backend error", response.data.message);

      }

    } catch (error) {
      console.log("error", error);

    } finally {
      setLoading(false);
    }
  }

  //add Income
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be greater than 0')
      return
    }

    if (!date) {
      toast.error("date is required")
      return;
    }


    try {
      const response = await axiosInstance.post("/expense/add-expense", {
        category, amount, date, icon
      })

      if (response.data.success) {
        setOpenAddExpenseModal(false)
        toast.success("Expense Added Successfully")
        getExpenseDetails();
      }

      if (response.data.error) {
        console.log("error", response.data.message);

      }
    } catch (error) {
      console.log("catch error", error);

    }
  }

  //delete Income
  const deleteExpense = async (id) => {

    try {
      const response = await axiosInstance.delete(`/expense/delete-expense/${id}`)
      if (response.data.success) {
        setOpenDeleteAlert({ show: false, data: null })
        toast.success("Expense Deleted successfully")
        getIncomeDetails()
      }

    } catch (error) {
      console.log("error deleting expense", error)
    }
  }

  //download income
  const downloadExpense = async () => {
    try {
      const response = await axiosInstance.get("/expense/download-expense",{
        responseType:"blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error("error downloading expense", error);
      toast.error("Failed to download expense details. Please try again later")
      
    }
  }

  useEffect(()=>{
    getExpenseDetails();
    return ()=>{};
  })


  return (
    <DashboardLayout activeMenu={"Expense"}>
      <div className='my-5 mx-auto'>
        <div>
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={()=>setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
        <ExpenseList
          transactions={expenseData}
          onDelete={(id)=>{
            setOpenDeleteAlert({show:true, data: id})
          }}
          onDownload ={downloadExpense}
        />
        <Modal
          isOpen={openAddExpenseModal}
          onClose={()=> setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>
         <Modal
          isOpen ={openDeleteAlert.show}
          onClose ={()=>setOpenDeleteAlert({show:false, data:null})}
          title="Delete expense"
        >
          <DeleteAlert
            content = "Are you sure you want to delete this expense"
            onDelete={()=>deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>

  )
}

export default Expense