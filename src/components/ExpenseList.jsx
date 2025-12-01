import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div>
            <div>
                <h5>All Expenses</h5>
                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base' />Download
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {
                    transactions?.map((item) => {
                        return (
                            <TransactionInfoCard
                                key={item._id}
                                title={item.category}
                                icon={item.icon}
                                date={moment(item.date).format("Do MMM YYYY")}
                                amount={item.amount}
                                type="expense"
                                onDelete={()=> onDelete(item._id)}
                                hideDeleteBtn
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExpenseList