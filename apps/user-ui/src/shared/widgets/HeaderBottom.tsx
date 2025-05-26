'use client';

import { AlignLeft, ChevronDown, HeartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { navItems } from '../../configs/constants';
import Link from 'next/link';
import ProfileIcon from '../../assets/svgs/profile-icon';
import CoveredMealTray from '../../assets/svgs/covered-meal-tray';
import useUser from '../../hooks/useUser';

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const {existingUser, isLoading} = useUser()

  console.log(existingUser)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // <-- Added dependency array

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 z-50 bg-white shadow-lg' : 'relative'
      }`}
    >
      <div
        className={`w-[80%] relative m-auto flex items-center justify-between ${
          isSticky ? 'pt-3' : 'py-0'
        }`}
      >
        {/* All Dropdowns */}
        <div
          className={`w-[260px] ${
            isSticky && '-mb-2'
          } cursor-pointer flex items-center justify-between px-5 h-[45px] rounded-xl bg-orange-600`}
          onClick={() => setShow(!show)}
        >
          <div className="flex items-center gap-2">
            <AlignLeft color="white" />
            <span className="text-white font-medium">All Categories</span>
          </div>
          <ChevronDown color="white" />
        </div>

        {/* Dropdown menu */}
        {show && (
          <div
            className={`absolute left-0 rounded-xl ${
              isSticky ? 'top-[70px]' : 'top-[50px]'
            } w-[260px] h-[400px] bg-[#f5f5f5] `}
            
          >
         
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex items-center ">
            {navItems.map((i:NavitemsTypes, index:number) => (
                <Link className='px-5 font-medium text-sm hover:text-orange-600' href={i.href} key={index}>
                    {i.title}
                </Link>)
            )}
        </div>

        <div className="">
            {isSticky && (
                   <div className="flex item-center gap-8 pb-2">
                   <div className="flex items-center gap-2">
                {
                 !isLoading && existingUser ? (
                     <>
                     <Link href={"/profile"}
                     className='border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]'>
                     <ProfileIcon />
                     </Link>
                   
                     <Link href={"/profile"}>
                     <span className='block font-medium'>Hello,</span>
                     <span className="font-semibold">{existingUser?.name?.split(" ")[0]}</span>
                 </Link>
                      </>
                 ) : (
                   <>
                   <Link href={"/login"}
                   className='border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]'
                 >
                      <ProfileIcon/>
                   </Link>
                     <Link href={"/login"}>
                     <span className='block font-medium'>Hello,</span>
                     <span className="font-semibold">{isLoading ? "..." : "Sign In"}</span>
                 </Link>
                 </>
                 )
                }
     
                   
                     {/* <Link href={"/register"}>
                         <span className='text-[#3489FF] font-[500]'>Register</span>
                     </Link> */}
                   </div>
                   <div className="flex items-center gap-5">
                     <Link href={"/cravings"} className='relative'>
                        <CoveredMealTray/>
                     <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
                         <span className="text-white font-medium text-sm">0</span>
                     </div>
                     </Link>
                     <Link href={"/meal-tray"} className='relative'>
                        <HeartIcon/>
                     <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
                         <span className="text-white font-medium text-sm">0</span>
                     </div>
                     </Link>
                   </div>
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
