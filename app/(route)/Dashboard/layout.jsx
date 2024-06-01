"use client"
import React, { useEffect } from 'react'
import Sidenav from './_components/Sidenav'
import DashboardHeader from './_components/DashboardHeader'
import {deta} from '../../../utils/dbConfig'
import { useUser } from '@clerk/nextjs'
import { Budgets } from '../../../utils/schema'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
 
const DashboardLayout = ({children}) => {
      
    const {user} = useUser();
    const router = useRouter()
   useEffect(() =>{
    user&&checkUserBidgets()
   },[user])
   const checkUserBidgets = async() =>{
    const result =await deta.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result)
     if(result?.length == 0){
        router.push('/Dashboard/Budget')
     }  
}    
     

    return (
        <div>
            <div className='fixed md:w-64 hidden md:block '>
                <Sidenav/>
            </div>
             <div className='md:ml-64 '>
                <DashboardHeader />
               {children}
             </div>
        </div>
    )
}

export default DashboardLayout
