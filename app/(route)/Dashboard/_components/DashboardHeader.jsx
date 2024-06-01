import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import IconButton from '@mui/material/IconButton';

const DashboardHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className='p-5 shadow-sm border-b flex justify-between items-center relative'>
            <div className='md:hidden'>
                <IconButton onClick={toggleMenu} className='border-b-2 border-transparent hover:border-primary transition-colors duration-300'>
                    {menuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
                </IconButton>
            </div>
            {menuOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-10' onClick={closeMenu}></div>
            )}
            <div className={`fixed top-5 left-0 w-[50%] h-[40%] flex items-center justify-center bg-white z-20 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className='relative'>
                    <div className="absolute top-2 right-2">
                        <IconButton onClick={toggleMenu}>
                            <X className="w-6 h-6 text-primary" />
                        </IconButton>
                    </div>
                    <ul className='flex flex-col gap-2 mt-8 text-primary '>
                        <li className='border-b-2'><Link href='/' onClick={closeMenu}>Home</Link></li>
                        <li className='border-b-2'><Link href='/Dashboard' onClick={closeMenu}>Dashboard</Link></li>
                        <li className='border-b-2'><Link href='/Dashboard/Budget' onClick={closeMenu}>Budgets</Link></li>
                        <li className='border-b-2'><Link href='/Dashboard/AllExpenses' onClick={closeMenu}>Expenses</Link></li>
                    </ul>
                </div>
            </div>
            <div className='ml-auto'>
                <p className='flex items-center gap-3 font-medium text-primary'>Profile <UserButton /></p>
            </div>
        </div>
    );
};

export default DashboardHeader;
