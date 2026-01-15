import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend, Cell} from 'recharts'

import Currency from '../utils/Currency'

const CustomBarChart = ({data}) => {
    console.log(data)
    const getBarColor = (index)=>{
        return index % 2 === 0 ? "#66CC66" : "#cfbefb";
    }

    const CustomTooltip = ({active, payload})=>{
        if(active && payload && payload.length){
            const income = payload[0].payload.income || [];
            return (
                 <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                <p className='text-xs font-semibold text-purple-500 mb-1'>{payload[0].payload.month}</p>
                {income.map((inc, idx) => (
                    <p key={idx} className='text-sm text-gray-600'>
                        {inc.source}: <span className='text-sm font-medium text-gray-900'>{Currency(inc.amount)}</span>
                    </p>
                ))}
                {/*<p className='text-xs font-bold text-purple-700 mt-1'>
                    Total: {Currency(payload[0].payload.totalAmount)}
                </p>*/}
            </div>
            )
        }
        return null
    }

  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width ="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke = "none"/>
                <XAxis dataKey="month" tick={{fontSize:12, fill:"#555"}} stroke="none"/>
                <YAxis tick={{fontSize:12, fill:"#555"}} stroke="none"/>
                <Tooltip content={CustomTooltip}/>

                <Bar 
                    dataKey="totalAmount"
                    fill='#FF8842'
                    radius={[10, 10, 0, 0]}
                    activeDot={{r:8, fill:"yellow"}}
                    activeStyle={{fill:"green"}}
                >
                    {data.map((entry, index)=>(
                        <Cell key={index} fill={getBarColor(index)}/>
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart