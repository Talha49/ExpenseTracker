"use client"
import React, { useEffect, useState } from 'react'
import { deta } from '../../../../utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import ExpenseListTable from '../Expenses/_components/ExpenseListTable'

const AllExpense = () => {

    const {user} = useUser()
       
    useEffect(() => {
        user&&getBudgetList()
     },[user])
  
    const [budgetLists, setBudgetLists] = useState([])
    const [expenseList, setExpenseLists] = useState([])


    console.log("BBBB", budgetLists)
    console.log("pppp", expenseList)
  const getBudgetList = async() =>{
 const result = await deta.select({
    ...getTableColumns(Budgets),

    totalSpend:sql`sum(${Expenses.amount})`.mapWith(Number),
    totalItem:sql`count(${Expenses.id})`.mapWith(Number)
 }).from(Budgets)
 .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
 .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
 .groupBy(Budgets.id)
 .orderBy(desc(Budgets.id))


 setBudgetLists(result)
 getAllExpenses()
  }

  const getAllExpenses=async()=>{
   
     const result = await deta.select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdAt:Expenses.createdAt
     }).from(Budgets)
     .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
     .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
     .orderBy(desc(Expenses.id))
    
     setExpenseLists(result)
 
  }
 
  
  return (
    <div className='px-5 '>
        
        
        <h2 className='font-bold text-lg pt-2'>All Expense</h2>

        <div>
            <ExpenseListTable expenseInfo={expenseList} refreshdata={() => getBudgetList()}  /> 
        </div>

    </div>
  )
}

export default AllExpense 