"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { deta } from '../../../../../utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItems from './BudgetItems'
const BudgetList = () => {
  
    const {user} = useUser();
    const [budgetLists, setBudgetLists] = useState()

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
  

    }
    return (
        <div className='mt-7'>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
           <CreateBudget refreshData={() => getBudgetList()}/>
             {
                budgetLists?.length>0  ? budgetLists?.map((budgets, index) => (
                    <BudgetItems budgets={budgets}/>
                )):[1,2,3,4,5,6].map((item,index) => (
                    <div key={index} className='w-full bg-slate-200 rounded-lg h-[100px]'>

                    </div>
                ))

             }
           
        </div>
        
        </div>
    )
}

export default BudgetList
