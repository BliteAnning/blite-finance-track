import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import userAuth from '../hooks/userAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import InfoCard from '../components/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io"
import { addThousandsSeparator } from '../utils/helper';
import RecentTransactions from '../components/RecentTransactions';
import FinancialOverview from '../components/FinancialOverview';
import ExpenseTransactions from '../components/ExpenseTransactions';
import Last30DaysExpenses from '../components/Last30DaysExpenses';
import RecentIncomeWithChart from '../components/RecentIncomeWithChart';
import RecentIncome from '../components/RecentIncome';

const Home = () => {
  userAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null)
  const [loading,setLoading] = useState(false)

  const getDashboardData = async ()=>{
    if(loading) return;

    setLoading(true)

    try {
      const response = await axiosInstance.get("/dashboard/get-dashboard-data")

      if (response.data.success){
        
        setDashboardData(response.data)  
      }

      if (response.data.error){
        console.log("backend error",response.data.message);
        
      }
    } catch (error) {
      console.log("error", error);
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getDashboardData();
    return ()=> {}
  },[])


  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon = {<IoMdCard/>}
            label ="Total Balance"
            value ={dashboardData?.totalBalance}
            color = "bg-primary"
          />
          <InfoCard
            icon = {<LuWalletMinimal/>}
            label ="Total Income"
            value ={dashboardData?.totalIncome}
            color = "bg-orange-500"
          />
          <InfoCard
            icon = {<LuHandCoins/>}
            label ="Total Expenses"
            value ={dashboardData?.totalExpenses }
            color = "bg-red-500"
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions = {dashboardData?.recentTransactions}
            onSeeMore = {()=> navigate("/expense")}
          />

          <FinancialOverview 
            totalBalance = {dashboardData?.totalBalance || 0}
            totalExpenses = {dashboardData?.totalExpenses || 0}
            totalIncome = {dashboardData?.totalIncome || 0}
          />

          <ExpenseTransactions
            transactions = {dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore ={()=>navigate("/expense")}
          />

          <Last30DaysExpenses
            data ={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data ={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome 
            transactions={dashboardData?.last60DaysIncome.transactions || []}
            onSeeMore={()=>navigate("/income")}
          />

        </div>
      </div>
    </DashboardLayout>

  )
}

export default Home