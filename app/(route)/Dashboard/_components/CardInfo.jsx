"use client"
import { PiggyBank, ReceiptText, Wallet, Wallet2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardInfo = ({ budgetLists }) => {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        CalculateTotal();
    }, [budgetLists])

    const CalculateTotal = () => {
        let totalBudget = 0;
        let totalSpend = 0;
        budgetLists.forEach(element => {
            totalBudget += Number(element.amount);
            totalSpend += element.totalSpend;
        });
        setTotalBudget(totalBudget);
        setTotalSpend(totalSpend);
    }

    return (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Budget</h2>
                    <h2 className='font-bold text-2xl'>${totalBudget}</h2>
                </div>
                <PiggyBank className='bg-primary  p-3 h-12 w-12 rounded-full text-white' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Spend</h2>
                    <h2 className='font-bold text-2xl'>${totalSpend}</h2>
                </div>
                <ReceiptText className='bg-primary  p-3 h-12 w-12 rounded-full text-white' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Remaining Budget</h2>
                    <h2 className='font-bold text-2xl'>${totalBudget - totalSpend}</h2>
                </div>
                <Wallet className='bg-primary  p-3 h-12 w-12 rounded-full text-white' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>No Of Budgets</h2>
                    <h2 className='font-bold text-2xl'>{budgetLists?.length}</h2>
                </div>
                <Wallet2 className='bg-primary  p-3 h-12 w-12 rounded-full text-white' />
            </div>
        </div>
    )
}

export default CardInfo
