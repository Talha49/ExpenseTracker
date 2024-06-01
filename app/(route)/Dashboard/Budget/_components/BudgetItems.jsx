import Link from 'next/link'
import React from 'react'

const BudgetItems = ({budgets}) => {

   const progressPercentage = () => {
    const perc = (budgets?.totalSpend/budgets?.amount)*100
    return perc.toFixed(2)
   }
  

  return (
    <Link href={`/Dashboard/Expenses/${budgets?.id}`} >
     
     <div className='p-5 border rounded-lg hover:shadow-lg cursor-pointer h-[170px]'>
      <div className='flex gap-2 justify-between'>
      <div className='flex gap-2 items-center'>
        <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budgets?.icon}</h2>
        <div><h2 className='font-bold '>{budgets?.name}</h2>
        <h2 className='text-sm text-gray-500'>{budgets?.totalItem} Items</h2>
        </div>
      </div>
      <h2 className='font-bold text-primary text-lg'>${budgets?.amount}</h2>
      </div>
      <div className='mt-5'>

        <div className='flex justify-between items-center mb-3'>
          <h2 className='text-sm text-slate-400'>${budgets?.totalSpend?budgets?.totalSpend:0} Spend</h2>
          <h2 className='text-sm text-slate-400'>${budgets?.amount-budgets?.totalSpend} Remaining</h2>

        </div>
        <div className='w-full bg-slate-300 h-2  rounded-full'>
        <div className='w-[40%] bg-primary h-2  rounded-full' style={{
          width:`${progressPercentage()}%`
        }}>

        </div>
        </div>
      </div>
      </div>
    </Link>
   
  )
}

export default BudgetItems