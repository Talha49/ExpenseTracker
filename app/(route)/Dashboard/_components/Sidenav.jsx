"use client"
import React, { useEffect } from 'react'
 import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const Sidenav = () => {
 
    

   const params = usePathname()

   useEffect(() => {
       console.log("PATH", params)
   },[])


     const menuList = [
        {
            id:1,
            name: 'Dashboard',
            icon:LayoutGrid,
            path:'/Dashboard'
        },
        {
            id:2,
            name: 'Budget',
            icon:PiggyBank,
            path:'/Dashboard/Budget'
        },{
            id:3,
            name: 'Expenses',
            icon:ReceiptText,
            path: '/Dashboard/AllExpenses'
        }
        
     ]

 
    return (
        <div className='h-screen p-5 border shadow-sm'>
             <div className='flex items-center gap-3'>
            <Link href='/'><Image alt="LOGO" src='/logo.svg'    width={40} height={40}/></Link> 
            <p className='text-lg'>ExpenseTracker</p>
           </div>
           <div className='mt-5'>
           {
    menuList.map((menu, index) => (
       <Link href={menu.path}>
        <h2 className={`flex items-center gap-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${params == menu.path && 'text-primary bg-blue-100'}`} key={index}>
            <menu.icon /> {menu.name}
        </h2>
       </Link>
    ))
}

           </div>
        </div>
    )
}

export default Sidenav
