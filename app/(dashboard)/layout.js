import React from 'react'
import Link from 'next/link';
import { BsFillDoorClosedFill } from "react-icons/bs";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import ThemeSwap from '@/components/ThemeSwap';
import Account from '@/components/Account';

//***********This is the layout so every page in the dashboard will have this navigation***********

function layout({children}) {
  
  return (
    <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <BsFillDoorOpenFill className='w-8 h-8'/>
              </label>
            </div> 
            <div className=" flex flex-1 px-2 mx-2 gap-2"><FaBook className="text-xl hidden lg:block" /><Link href="/home">Book App</Link></div>
            <ThemeSwap />
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li><Link href="/booksearch">Get Specific Book</Link></li>
                <li><Link href="/chatbot">Chat Bot</Link></li>
                <li><Link href="/savedbooks">Saved Books</Link></li>
              </ul>
            </div>
            <Account />
          </div>
          {/* Page content here */}
          {children}
        </div> 
        <div className="drawer-side h-full">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-full min-h-full bg-base-200">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <BsFillDoorClosedFill  className='w-8 h-8'/>
              </label>
              {/* Sidebar content here */}
              <li><Link href="/booksearch">Get Specific Book</Link></li>
              <li><Link href="/chatbot">Chat Bot</Link></li>
              <li><Link href="/savedbooks">Saved Books</Link></li>
          </ul>
        </div>
    </div>
  )
}

export default layout