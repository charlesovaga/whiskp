// 'use client';

// import { AlignLeft, ChevronDown, HeartIcon, ShoppingBag, ShoppingCart } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { navItems } from '../../configs/constants';
// import Link from 'next/link';
// import ProfileIcon from '../../assets/svgs/profile-icon';
// import CoveredMealTray from '../../assets/svgs/covered-meal-tray';
// import useUser from '../../hooks/useUser';
// import { useStore } from '../../store';

// const HeaderBottom = () => {
//   const [show, setShow] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);
//   const {existingUser, isLoading} = useUser()
//    const wishlist = useStore((state:any) => state.wishlist);
//     const cart = useStore((state:any) => state.cart);

//   console.log(existingUser)

//   // Track scroll position
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []); // <-- Added dependency array

//   return (
//     <div
//       className={`w-full transition-all duration-300 ${
//         isSticky ? 'fixed top-0 left-0 z-50 bg-white shadow-lg' : 'relative'
//       }`}
//     >
//       <div
//         className={`w-[80%] relative m-auto flex items-center justify-between ${
//           isSticky ? 'pt-3' : 'py-0'
//         }`}
//       >
//         {/* All Dropdowns */}
//         <div
//           className={`w-[260px] ${
//             isSticky && '-mb-2'
//           } cursor-pointer flex items-center justify-between px-5 h-[45px]  bg-orange-600`}
//           onClick={() => setShow(!show)}
//         >
//           <div className="flex items-center gap-2">
//             <AlignLeft color="white" />
//             <span className="text-white font-medium">All Categories</span>
//           </div>
//           <ChevronDown color="white" />
//         </div>

//         {/* Dropdown menu */}
//         {show && (
//           <div
//             className={`absolute left-0 rounded-xl ${
//               isSticky ? 'top-[70px]' : 'top-[50px]'
//             } w-[260px] h-[400px] bg-[#f5f5f5] `}
            
//           >
         
//           </div>
//         )}

//         {/* Navigation Links */}
//         <div className="flex items-center ">
//             {navItems.map((i:NavitemsTypes, index:number) => (
//                 <Link className='px-5 font-medium text-sm hover:text-orange-600' href={i.href} key={index}>
//                     {i.title}
//                 </Link>)
//             )}
//         </div>

//         <div className="">
//             {isSticky && (
//                    <div className="flex item-center gap-8 pb-2">
//                    <div className="flex items-center gap-2">
//                 {
//                  !isLoading && existingUser ? (
//                      <>
//                      <Link href={"/profile"}
//                      className='border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]'>
//                      <ProfileIcon />
//                      </Link>
                   
//                      <Link href={"/profile"}>
//                      <span className='block font-medium'>Hello,</span>
//                      <span className="font-semibold">{existingUser?.name?.split(" ")[0]}</span>
//                  </Link>
//                       </>
//                  ) : (
//                    <>
//                    <Link href={"/login"}
//                    className='border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]'
//                  >
//                       <ProfileIcon/>
//                    </Link>
//                      <Link href={"/login"}>
//                      <span className='block font-medium'>Hello,</span>
//                      <span className="font-semibold">{isLoading ? "..." : "Sign In"}</span>
//                  </Link>
//                  </>
//                  )
//                 }
     
                   
//                      {/* <Link href={"/register"}>
//                          <span className='text-[#3489FF] font-[500]'>Register</span>
//                      </Link> */}
//                    </div>
//                    <div className="flex items-center gap-5">
//                      <Link href={"/wishlist"} className='relative'>
//                         <HeartIcon/>
//                      <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
//                          <span className="text-white font-medium text-sm">{wishlist?.length}</span>
//                      </div>
//                      </Link>
//                      <Link href={"/cart"} className='relative'>
//                         <ShoppingCart/>
//                      <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
//                          <span className="text-white font-medium text-sm">{cart?.length}</span>
//                      </div>
//                      </Link>
//                    </div>
//                  </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderBottom;


// Responsivness..



'use client';

import {
  AlignLeft,
  ChevronDown,
  
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { navItems } from '../../configs/constants';
import Link from 'next/link';

// import { useStore } from '../../store';

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  // const { existingUser, isLoading } = useUser();
  // const wishlist = useStore((state: any) => state.wishlist);
  // const cart = useStore((state: any) => state.cart);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isSticky ? 'hidden top-0 left-0 z-50 bg-white shadow-lg' : 'relative'
      }`}
    >
      <div
        className={`w-[90%] relative m-auto flex items-center justify-between ${
          isSticky ? 'pt-3' : 'py-0'
        }`}
      >
        {/* Hamburger (only visible below xl) */}
        {/* <div className="xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div> */}

        {/* All Categories (desktop only) */}
        <div
          className={`hidden xl:flex w-[260px] ${
            isSticky && '-mb-2'
          } cursor-pointer items-center justify-between px-5 h-[45px] bg-orange-600`}
          onClick={() => setShow(!show)}
        >
          <div className="flex items-center gap-2">
            <AlignLeft color="white" />
            <span className="text-white font-medium">All Categories</span>
          </div>
          <ChevronDown color="white" />
        </div>

        {/* Nav links (desktop only) */}
        <div className="hidden xl:flex items-center">
          {navItems.map((i: NavitemsTypes, index: number) => (
            <Link
              key={index}
              href={i.href}
              className="px-5 font-medium text-sm hover:text-orange-600"
            >
              {i.title}
            </Link>
          ))}
        </div>

        {/* Icons + User (sticky only) */}
        
        {/* <div className="hidden xl:block">
  <div className={`flex items-center gap-8 pb-2 ${isSticky ? '' : 'mt-2'}`}>
    <div className="flex items-center gap-2">
      {!isLoading && existingUser ? (
        <>
          <Link
            href="/profile"
            className="border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]"
          >
            <ProfileIcon />
          </Link>
          <Link href="/profile">
            <span className="block font-medium">Hello,</span>
            <span className="font-semibold">
              {existingUser?.name?.split(' ')[0]}
            </span>
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]"
          >
            <ProfileIcon />
          </Link>
          <Link href="/login">
            <span className="block font-medium">Hello,</span>
            <span className="font-semibold">
              {isLoading ? '...' : 'Sign In'}
            </span>
          </Link>
        </>
      )}
    </div>

    <div className="flex items-center gap-5">
      <Link href="/wishlist" className="relative">
        <HeartIcon />
        <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
          <span className="text-white font-medium text-sm">
            {wishlist?.length}
          </span>
        </div>
      </Link>
      <Link href="/cart" className="relative">
        <ShoppingCart />
        <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
          <span className="text-white font-medium text-sm">
            {cart?.length}
          </span>
        </div>
      </Link>
    </div>
  </div>
</div> */}

      </div>

     {/* Mobile Menu Slide-In with Blur Overlay */}
{mobileMenuOpen && (
  <>
    {/* Blur Background */}
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* Slide-in Sidebar */}
    <div className="fixed top-0 left-0 z-50 h-full w-[80%] max-w-xs bg-[#f5f5f5] shadow-lg p-6 transition-transform duration-300 transform translate-x-0">
      {/* All Categories */}
      <div
        className="flex items-center justify-between bg-orange-600 px-4 py-2 rounded mb-5 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <div className="flex items-center gap-2">
          <AlignLeft color="white" />
          <span className="text-white text-sm font-medium">
            All Categories
          </span>
        </div>
        <ChevronDown color="white" size={16} />
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-4">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-sm font-medium hover:text-orange-600"
            onClick={() => setMobileMenuOpen(false)} // auto-close
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  </>
)}

    </div>
  );
};

export default HeaderBottom;
