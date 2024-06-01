import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Hero = () => {

  
    return (
     
     
<section className="bg-gray-100 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold text-primary sm:text-5xl">
        Manage Your Expense
        <strong className="font-extrabold text-red-700 sm:block"> Create Your Budget </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start Making Budget and Save Your Money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/Dashboard"
        >
          Dashboard
        </Link>

       
      </div>
    </div>
  </div>
  <Image src='/herooo.png' width={1000} height={700} alt='D' className='-mt-12 rounded-xl bottom-2'/>
  
</section>
    )
}

export default Hero
