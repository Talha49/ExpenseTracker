"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo'
import { deta } from '../../../utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../utils/schema'
import BudgetItems from './Budget/_components/BudgetItems'
const Dashboard = () => {
    
     const {user} = useUser()
      
  
     const [budgetLists, setBudgetLists] = useState([])
 
      useEffect(() => {
         user&&getBudgetList()
      },[user])
     const getBudgetList = async() => {
         const result = await deta.select({
             ...getTableColumns(Budgets),
             totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
             totalItem:sql `count(${Expenses.id})`.mapWith(Number)
         }).from(Budgets)
         .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
         .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
         .groupBy(Budgets.id)
         .orderBy(desc(Budgets.id))
         
     setBudgetLists(result)
     console.log("Resulr",result)
 
     }


    return (
        <div className='p-8'>
            <h2 className='font-bold text-3xl text-primary'>Hi, {user?.fullName} 🤘🏻</h2>
            <p className='text-gray-500'>Let's assess your financial circumstances and develop a plan to optimize your expenditures.</p>

<CardInfo  budgetLists={budgetLists}/>

<div className='py-6'>
     
     <h2 className='font-semibold mb-2 text-primary'>Latest Budgets</h2>
    <div className='grid md:grid-cols-2  grid-cols-1 gap-5'>
  
        {
            budgetLists.map((budget,index) => (
                <BudgetItems budgets={budget} key={index}/>
            ))
        }
    </div>
</div>
        </div>
    )
}

export default Dashboard
