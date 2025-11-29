import React from 'react'
import Currency from '../utils/Currency'
import CustomPieChart from './CustomPieChart'


const COLORS = ["#835CF5", "#FA2C37", "#FF6900"]

const FinancialOverview = ({totalBalance, totalIncome, totalExpenses}) => {

    const balanceData = [
        {name:"Total Balance", amount: totalBalance},
        {name:"Total Expense", amount: totalExpenses},
        {name:"Total Income", amount: totalIncome}
    ]



  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>

        <CustomPieChart
            data = {balanceData}
            label="Total Balance"
            totalAmount={Currency(totalBalance)}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default FinancialOverview