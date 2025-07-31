"use client";
import Link from 'next/link'
import React from 'react'
import { HeartIcon, Search, ShoppingCart } from 'lucide-react'
import ProfileIcon from '../../assets/svgs/profile-icon'
import CoveredMealTray from '../../assets/svgs/covered-meal-tray'
import HeaderBottom from './HeaderBottom'
import useUser from '../../hooks/useUser'
import { useStore } from '../../store';

const Header = () => {
  const {existingUser, isLoading} = useUser()
  const wishlist = useStore((state:any) => state.wishlist);
  const cart = useStore((state:any) => state.cart);
  return (
    <div className='w-full bg-white'>
      <div className="w-[80%] py-5 m-auto flex items-center justify-between">
        <div>
            <Link href={"/"}>
            <span className="text-xl font-[600]">Whiskp</span>
            </Link>
        </div>
        <div className="w-[50%] relative">
            <input type="text" placeholder='Search for products...'
            className='w-full h-[45px] border-[2.5px] border-orange-600 rounded-full px-4 focus:outline-none  font-medium font-poppins' />
            <div className="w-[60px] cursor-pointer flex items-center justify-center h-[45px] bg-orange-600 absolute top-0 right-0 rounded-r-full ">
                <Search color='#fff'/>
            </div>
           
        </div>
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
                <Link href={"/wishlist"} className='relative'>
                   <HeartIcon/>
                <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
                    <span className="text-white font-medium text-sm">{wishlist?.length}</span>
                </div>
                </Link>
                <Link href={"/cart"} className='relative'>
                   <ShoppingCart/>
                <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
                    <span className="text-white font-medium text-sm">{cart?.length}</span>
                </div>
                </Link>
              </div>
            </div>
      </div>
      <div className="border-b border-b-[#99999938]"/>
        <HeaderBottom/>
     
    </div>
  )
}

export default Header
