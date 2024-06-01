"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import IconButton from '@mui/material/IconButton';

const Header = () => {
    const { user, isSignedIn } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className='flex justify-between items-center p-3 shadow-md border relative'>
            <div className='flex items-center gap-3'>
                <Image alt="LOGO" src={'/logo.svg'} width={40} height={40} />
                <p className='md:text-lg text-sm text-primary'>ExpenseTracker</p>
            </div>
            <div className='md:hidden'>
                <IconButton onClick={toggleMenu} className='border-b-2 border-transparent hover:border-primary transition-colors duration-300'>
                    {menuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
                </IconButton>
            </div>

            {menuOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-10' onClick={closeMenu}></div>
            )}
            <div className={`fixed top-5 left-0 w-[50%] h-[55%] flex flex-col items-center justify-center bg-white rounded-md z-20 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className='relative w-full px-5'>
                    <div className="absolute top-2 right-2">
                        <IconButton onClick={toggleMenu}>
                            <X className="w-6 h-6 text-primary" />
                        </IconButton>
                    </div>
                    <ul className='flex flex-col gap-2 mt-8 text-primary w-full'>
                        <li><Link href='/' onClick={closeMenu} className='block py-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300'>Home</Link></li>
                        <li><Link href='/Dashboard' onClick={closeMenu} className='block py-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300'>Dashboard</Link></li>
                        <li><Link href='/Dashboard/Budget' onClick={closeMenu} className='block py-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300'>Budgets</Link></li>
                        <li><Link href='/Dashboard/AllExpenses' onClick={closeMenu} className='block py-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300'>Expenses</Link></li>
                        {!isSignedIn && (
                            <li>
                                <Link href={'/sign-in'}>
                                    <button className='bg-primary text-white py-2 px-4 rounded-sm w-full mt-2'>Get Started</button>
                                </Link>
                            </li>
                        )}
                    </ul>

                    {isSignedIn && (
                        <div className='mt-5 w-full'>
                            <p className='flex items-center gap-3 font-medium text-primary'>Profile <UserButton /></p>
                        </div>
                    )}
                </div>
            </div>

            <div className={`hidden md:flex items-center ml-auto`}>
                <ul className='flex gap-6 text-primary'>
                    <li><Link href='/' className='py-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300'>Home</Link></li>
                    <li><Link href='/Dashboard' className='py-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300'>Dashboard</Link></li>
                    <li><Link href='/Dashboard/Budget' className='py-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300'>Budgets</Link></li>
                    <li><Link href='/Dashboard/AllExpenses' className='py-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300'>Expenses</Link></li>
                </ul>
                {isSignedIn ? (
                    <p className='flex items-center gap-3 font-medium text-primary ml-4'>Profile <UserButton /></p>
                ) : (
                    <Link href={'/sign-in'}>
                        <button className='bg-primary text-white py-2 px-4 rounded-sm ml-4'>Get Started</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
