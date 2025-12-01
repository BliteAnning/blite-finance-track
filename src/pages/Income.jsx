import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import IncomeOverview from '../components/IncomeOverview'
import axiosInstance from '../axiosInstance';
import Modal from '../components/Modal';
import AddIncomeForm from '../components/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../components/IncomeList';
import DeleteAlert from '../components/DeleteAlert';
import userAuth from '../hooks/userAuth';

const Income = () => {
  userAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null
  })
  //get all income
  const getIncomeDetails = async()=>{
    if(loading) return;
    setLoading(true)

    try {
      const response = await axiosInstance.get("/income/get-all-income")
      if(response.data.success){
        setIncomeData(response.data.data)
      }

      if(response.data.error){
        console.log("backend error", response.data.message);
        
      }

    } catch (error) {
      console.log("error", error);
      
    } finally {
      setLoading(false);
    }
  }

  //add Income
  const handleAddIncome = async(income)=>{
    const {source, amount, date, icon} = income;

    if(!source.trim()){
      toast.error("Source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be greater than 0')
      return
    }

    if(!date){
      toast.error("date is required")
      return;
    }


    try {
      const response = await axiosInstance.post("/income/add-income",{
        source, amount, date, icon
      })

      if(response.data.success){
        setOpenAddIncomeModal(false)
        toast.success("Income Added Successfully")
        getIncomeDetails();
      }

      if(response.data.error){
        console.log("error", response.data.message);
        
      }
    } catch (error) {
      console.log("catch error", error);
      
    }
  }

  //delete Income
  const deleteIncome = async (id)=>{
      
    try {
      const response = await axiosInstance.delete(`/income/delete-income/${id}`)
      if(response.data.success){
        setOpenDeleteAlert({show:false, data:null})
        toast.success("Income Deleted successfully")
        getIncomeDetails()
      }

    } catch (error) {
      console.log("error deleting income",error)
    }
  }

  //download income
  const downloadIncome = async () =>{
    try {
      const response = await axiosInstance.get("/income/download-income",{
        responseType:"blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error("error downloading income", error);
      toast.error("Failed to download income details. Please try again later")
      
    }
  }

  useEffect(()=>{
    getIncomeDetails();
    return ()=>{

    }
  },[])

  return (
    <DashboardLayout activeMenu={"Income"}>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome ={()=>setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList 
            transactions={incomeData}
            onDelete={(id)=>{
              setOpenDeleteAlert({show:true, data: id})
            }}
            onDownload={downloadIncome}
          />
        </div>
        <Modal
          isOpen ={openAddIncomeModal}
          onClose ={()=>setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal
          isOpen ={openDeleteAlert.show}
          onClose ={()=>setOpenDeleteAlert({show:false, data:null})}
          title="Delete Income"
        >
          <DeleteAlert
            content = "Are you sure you want to delete this income"
            onDelete={()=>deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income