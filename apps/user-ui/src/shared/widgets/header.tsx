// // // "use client";
// // // import Link from 'next/link'
// // // import React from 'react'
// // // import { HeartIcon, Search, ShoppingCart } from 'lucide-react'
// // // import ProfileIcon from '../../assets/svgs/profile-icon'
// // // import CoveredMealTray from '../../assets/svgs/covered-meal-tray'
// // // import HeaderBottom from './HeaderBottom'
// // // import useUser from '../../hooks/useUser'
// // // import { useStore } from '../../store';

// // // const Header = () => {
// // //   const {existingUser, isLoading} = useUser()
// // //   const wishlist = useStore((state:any) => state.wishlist);
// // //   const cart = useStore((state:any) => state.cart);
// // //   return (
// // //     <div className='w-full bg-white'>
// // //       <div className="w-[80%] py-5 m-auto flex items-center justify-between">
// // //         <div>
// // //             <Link href={"/"}>
// // //             <span className="text-xl font-[600]">Whiskp</span>
// // //             </Link>
// // //         </div>
// // //         <div className="w-[50%] relative">
// // //             <input type="text" placeholder='Search for products...'
// // //             className='w-full h-[45px] border-[2.5px] border-orange-600 rounded-full px-4 focus:outline-none  font-medium font-poppins' />
// // //             <div className="w-[60px] cursor-pointer flex items-center justify-center h-[45px] bg-orange-600 absolute top-0 right-0 rounded-r-full ">
// // //                 <Search color='#fff'/>
// // //             </div>
           
// // //         </div>
// // //         <div className="flex item-center gap-8 pb-2">
// // //               <div className="flex items-center gap-2">
// // //            {
// // //             !isLoading && existingUser ? (
// // //                 <>
// // //                 <Link href={"/profile"}
// // //                 className='border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]'>
// // //                 <ProfileIcon />
// // //                 </Link>
              
// // //                 <Link href={"/profile"}>
// // //                 <span className='block font-medium'>Hello,</span>
// // //                 <span className="font-semibold">{existingUser?.name?.split(" ")[0]}</span>
// // //             </Link>
// // //                  </>
// // //             ) : (
// // //               <>
// // //               <Link href={"/login"}
// // //               className='border-2 w-[50px] h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]'
// // //             >
// // //                  <ProfileIcon/>
// // //               </Link>
// // //                 <Link href={"/login"}>
// // //                 <span className='block font-medium'>Hello,</span>
// // //                 <span className="font-semibold">{isLoading ? "..." : "Sign In"}</span>
// // //             </Link>
// // //             </>
// // //             )
// // //            }

              
// // //                 {/* <Link href={"/register"}>
// // //                     <span className='text-[#3489FF] font-[500]'>Register</span>
// // //                 </Link> */}
// // //               </div>
// // //               <div className="flex items-center gap-5">
// // //                 <Link href={"/wishlist"} className='relative'>
// // //                    <HeartIcon/>
// // //                 <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
// // //                     <span className="text-white font-medium text-sm">{wishlist?.length}</span>
// // //                 </div>
// // //                 </Link>
// // //                 <Link href={"/cart"} className='relative'>
// // //                    <ShoppingCart/>
// // //                 <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
// // //                     <span className="text-white font-medium text-sm">{cart?.length}</span>
// // //                 </div>
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //       </div>
// // //       <div className="border-b border-b-[#99999938]"/>
// // //         <HeaderBottom/>
     
// // //     </div>
// // //   )
// // // }

// // // export default Header

// // // Responsiveness..

// // 'use client';
// // import Link from 'next/link';
// // import React from 'react';
// // import { HeartIcon, Search, ShoppingCart } from 'lucide-react';
// // import ProfileIcon from '../../assets/svgs/profile-icon';
// // import HeaderBottom from './HeaderBottom';
// // import useUser from '../../hooks/useUser';
// // import { useStore } from '../../store';

// // const Header = () => {
// //   const { existingUser, isLoading } = useUser();
// //   const wishlist = useStore((state: any) => state.wishlist);
// //   const cart = useStore((state: any) => state.cart);

// //   return (
// //     <div className="w-full bg-white">
// //       <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 py-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
// //         {/* Logo */}
// //         <div className="text-xl font-semibold">
// //           <Link href="/">Whiskp</Link>
// //         </div>

// //         {/* Search Bar */}
// //         <div className="w-full md:w-1/2 relative">
// //           <input
// //             type="text"
// //             placeholder="Search for products..."
// //             className="w-full h-[45px] border-[2.5px] border-orange-600 rounded-full px-4 pr-16 focus:outline-none font-medium"
// //           />
// //           <div className="w-[50px] md:w-[60px] h-[45px] bg-orange-600 absolute top-0 right-0 rounded-r-full flex items-center justify-center cursor-pointer">
// //             <Search color="#fff" />
// //           </div>
// //         </div>

// //         {/* Profile + Wishlist + Cart */}
// //         <div className="flex items-center gap-4 sm:gap-6">
// //           {/* Profile */}
// //           <div className="flex items-center gap-2">
// //             {existingUser && !isLoading ? (
// //               <>
// //                 <Link
// //                   href="/profile"
// //                   className="border-2 w-10 h-10 sm:w-[50px] sm:h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]"
// //                 >
// //                   <ProfileIcon />
// //                 </Link>
// //                 <Link href="/profile" className="hidden sm:block">
// //                   <span className="block text-sm font-medium">Hello,</span>
// //                   <span className="text-sm font-semibold">
// //                     {existingUser?.name?.split(' ')[0]}
// //                   </span>
// //                 </Link>
// //               </>
// //             ) : (
// //               <>
// //                 <Link
// //                   href="/login"
// //                   className="border-2 w-10 h-10 sm:w-[50px] sm:h-[50px] flex items-center justify-center rounded-full border-[#010f1c1a]"
// //                 >
// //                   <ProfileIcon />
// //                 </Link>
// //                 <Link href="/login" className="hidden sm:block">
// //                   <span className="block text-sm font-medium">Hello,</span>
// //                   <span className="text-sm font-semibold">
// //                     {isLoading ? '...' : 'Sign In'}
// //                   </span>
// //                 </Link>
// //               </>
// //             )}
// //           </div>

// //           {/* Wishlist + Cart */}
// //           {/* <div className="flex items-center gap-3 sm:gap-5">
// //             <Link href="/wishlist" className="relative">
// //               <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
// //               <div className="w-5 h-5 sm:w-6 sm:h-6 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
// //                 <span className="text-white">{wishlist?.length}</span>
// //               </div>
// //             </Link>
// //             <Link href="/cart" className="relative">
// //               <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
// //               <div className="w-5 h-5 sm:w-6 sm:h-6 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
// //                 <span className="text-white">{cart?.length}</span>
// //               </div>
// //             </Link>
// //           </div> */}

// //           {/* Responsivness */}

// //           <div className="fixed right-4 top-4 z-50 flex items-center gap-4 bg-white p-2 rounded-full shadow-md md:static md:shadow-none md:bg-transparent">
// //   <Link href="/wishlist" className="relative">
// //     <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
// //     <div className="w-5 h-5 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
// //       <span className="text-white">{wishlist?.length}</span>
// //     </div>
// //   </Link>
// //   <Link href="/cart" className="relative">
// //     <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
// //     <div className="w-5 h-5 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
// //       <span className="text-white">{cart?.length}</span>
// //     </div>
// //   </Link>
// // </div>

// //         </div>
// //       </div>

// //       {/* Border line */}
// //       <div className="border-b border-b-[#99999938]" />

// //       {/* HeaderBottom (already responsive) */}
// //       <HeaderBottom />
// //     </div>
// //   );
// // };

// // export default Header;


// // Responsivness might delete
// // 'use client';
// 'use client';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { HeartIcon, Menu, Search, ShoppingCart, X } from 'lucide-react';
// import ProfileIcon from '../../assets/svgs/profile-icon';
// import HeaderBottom from './HeaderBottom';
// import useUser from '../../hooks/useUser';
// import { useStore } from '../../store';

// const Header = () => {
//   const { existingUser, isLoading } = useUser();
//   const wishlist = useStore((state: any) => state.wishlist);
//   const cart = useStore((state: any) => state.cart);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="w-full bg-white relative z-50">
//       <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 py-4 mx-auto flex items-center justify-between">
//         {/* Left: Logo + Hamburger */}
//         <div className="flex items-center gap-4">
//           <button
//             className="md:hidden"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu />
//           </button>
//           <Link href="/" className="text-xl font-semibold">
//             Whiskp
//           </Link>
//         </div>

//         {/* Middle: Search Bar (hidden on sm/md/lg) */}
//         <div className="hidden lg:block w-1/2 relative">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="w-full h-[45px] border-[2.5px] border-orange-600 rounded-full px-4 pr-16 focus:outline-none font-medium"
//           />
//           <div className="w-[50px] h-[45px] bg-orange-600 absolute top-0 right-0 rounded-r-full flex items-center justify-center cursor-pointer">
//             <Search color="#fff" />
//           </div>
//         </div>

//         {/* Right: Wishlist + Cart */}
//         <div className="flex items-center gap-4">
//           <Link href="/wishlist" className="relative">
//             <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
//             <div className="w-5 h-5 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
//               <span className="text-white">{wishlist?.length}</span>
//             </div>
//           </Link>
//           <Link href="/cart" className="relative">
//             <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
//             <div className="w-5 h-5 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
//               <span className="text-white">{cart?.length}</span>
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* Bottom Border */}
//       <div className="border-b border-b-[#99999938]" />

//       {/* Header Bottom Nav */}
//       <HeaderBottom />

//       {/* Sidebar Overlay */}
//       {sidebarOpen && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//             onClick={() => setSidebarOpen(false)}
//           />

//           <div className="fixed top-0 left-0 z-50 h-full w-[80%] max-w-xs bg-white shadow-lg p-6 transition-transform duration-300 transform translate-x-0">
//             <div className="flex justify-between items-center mb-6">
//               <span className="text-lg font-semibold">Menu</span>
//               <button onClick={() => setSidebarOpen(false)}>
//                 <X />
//               </button>
//             </div>

//             {/* Search in Sidebar */}
//             <div className="mb-6">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full h-10 border border-orange-600 rounded-full px-4 pr-12 focus:outline-none"
//                 />
//                 <div className="absolute top-0 right-0 h-full flex items-center pr-3">
//                   <Search className="text-orange-600" size={18} />
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Links */}
//             <div className="flex flex-col gap-4">
//               <Link href="/" onClick={() => setSidebarOpen(false)}>
//                 Home
//               </Link>
//               <Link href="/products" onClick={() => setSidebarOpen(false)}>
//                 Products
//               </Link>
//               <Link href="/shops" onClick={() => setSidebarOpen(false)}>
//                 Shops
//               </Link>
//             </div>

//             {/* Profile Link at Bottom */}
//             <div className="mt-10 border-t pt-4">
//               {!isLoading && existingUser ? (
//                 <Link
//                   href="/profile"
//                   className="flex items-center gap-3"
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <ProfileIcon />
//                   <div>
//                     <span className="block text-sm">Hello,</span>
//                     <span className="font-semibold">
//                       {existingUser?.name?.split(' ')[0]}
//                     </span>
//                   </div>
//                 </Link>
//               ) : (
//                 <Link
//                   href="/login"
//                   className="flex items-center gap-3"
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <ProfileIcon />
//                   <div>
//                     <span className="block text-sm">Hello,</span>
//                     <span className="font-semibold">
//                       {isLoading ? '...' : 'Sign In'}
//                     </span>
//                   </div>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Header;


// 'use client';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { HeartIcon, Menu, Search, ShoppingCart, X } from 'lucide-react';
// import ProfileIcon from '../../assets/svgs/profile-icon';
// import Logo from "../../../../api-gateway/src/assets/LofgoImage.png"
// import HeaderBottom from './HeaderBottom';
// import useUser from '../../hooks/useUser';
// import { useStore } from '../../store';
// import { navItems } from '../../configs/constants'; // ← imported here
// import Image from 'next/image';

// const Header = () => {
//   const { existingUser, isLoading } = useUser();
//   const wishlist = useStore((state: any) => state.wishlist);
//   const cart = useStore((state: any) => state.cart);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="w-full bg-white relative z-50">
//       <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 py-4 mx-auto flex items-center justify-between">
//         {/* Left: Logo + Hamburger */}
//         <div className="flex items-center gap-4">
//           <button
//             className="xl:hidden"
//             onClick={() => setSidebarOpen(true)}
//             aria-label="Open menu"
//           >
//             <Menu />
//           </button>
   
//           <div className="flex items-center lg:items-start">
//   {/* Logo */}
 
//   {/* Center: Logo + Text */}
//   <Link
//     href="/"
//     className="flex items-center lg:items-start gap-1 absolute left-1/2 lg:left-16 lg:top-4 -translate-x-1/2"
//   >
//     <Image
//       src={Logo}
//       alt="B2bAgroAfrica Logo"
//       height={30}
//       style={{ width: "auto", height: "40px" }}
//       priority
//     />
//       {/* Texts */}
//   <div className="flex flex-col leading-tight ">
//     <h2 className="text-md text-orange-600 font-bold">b2b</h2>
//     <span className="text-green-950 text-md font-bold">AgroAfrica</span>
//   </div>
//   </Link>


// </div>





//         </div>

//         {/* Middle: Search Bar (hidden on sm/md/lg) */}
//         <div className="hidden lg:block lg:w-3/3 w-1/2 relative">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="w-full h-[45px] border-[2.5px] border-orange-600 rounded-full px-4 pr-16 focus:outline-none font-medium"
//           />
//           <div className="w-[50px] h-[45px] bg-orange-600 absolute top-0 right-0 rounded-r-full flex items-center justify-center cursor-pointer">
//             <Search color="#fff" />
//           </div>
//         </div>
        

//         {/* Right: Wishlist + Cart */}
//         <div className="flex items-center gap-4">
//           <Link href="/wishlist" className="relative">
//             <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
//             <div className="w-5 h-5 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
//               <span className="text-white">{wishlist?.length}</span>
//             </div>
//           </Link>
//           <Link href="/cart" className="relative">
//             <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
//             <div className="w-5 h-5 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
//               <span className="text-white">{cart?.length}</span>
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* Bottom Border */}
//       <div className="border-b border-b-[#99999938]" />

//       {/* Header Bottom Nav */}
//       <HeaderBottom />

//       {/* Sidebar Overlay */}
//       {sidebarOpen && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//             onClick={() => setSidebarOpen(false)}
//           />

//           <div className="fixed top-0 left-0 z-50 h-full w-[80%] max-w-xs bg-white shadow-lg p-6 transition-transform duration-300 transform translate-x-0">
//             <div className="flex justify-between items-center mb-6">
//               <span className="text-lg font-semibold">Menu</span>
//               <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
//                 <X />
//               </button>
//             </div>

//             {/* Search in Sidebar */}
//             <div className="mb-6">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full h-10 border border-orange-600 rounded-full px-4 pr-12 focus:outline-none"
//                 />
//                 <div className="absolute top-0 right-0 h-full flex items-center pr-3">
//                   <Search className="text-orange-600" size={18} />
//                 </div>
//               </div>
//             </div>

//             {/* Dynamic Navigation Links (from navItems) */}
//             <div className="flex flex-col gap-4">
//               {navItems.map((item, i) => (
//                 <Link
//                   key={i}
//                   href={item.href}
//                   onClick={() => setSidebarOpen(false)}
//                   className="text-base font-medium"
//                 >
//                   {item.title}
//                 </Link>
//               ))}
//             </div>

//             {/* Profile Link at Bottom */}
//             <div className="mt-10 border-t pt-4">
//               {!isLoading && existingUser ? (
//                 <Link
//                   href="/profile"
//                   className="flex items-center gap-3"
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <ProfileIcon />
//                   <div>
//                     <span className="block text-sm">Hello,</span>
//                     <span className="font-semibold">
//                       {existingUser?.name?.split(' ')[0]}
//                     </span>
//                   </div>
//                 </Link>
//               ) : (
//                 <Link
//                   href="/login"
//                   className="flex items-center gap-3"
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <ProfileIcon />
//                   <div>
//                     <span className="block text-sm">Hello,</span>
//                     <span className="font-semibold">
//                       {isLoading ? '...' : 'Sign In'}
//                     </span>
//                   </div>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Header;


// Responsiveness,, might delete
'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { HeartIcon, Menu, Search, ShoppingCart, X } from 'lucide-react';
import ProfileIcon from '../../assets/svgs/profile-icon';
import Logo from "../../../../api-gateway/src/assets/LofgoImage.png";
import HeaderBottom from './HeaderBottom';
import useUser from '../../hooks/useUser';
import { useStore } from '../../store';
import { navItems } from '../../configs/constants';
import Image from 'next/image';

const Header = () => {
  const { existingUser, isLoading } = useUser();
  const wishlist = useStore((state: any) => state.wishlist);
  const cart = useStore((state: any) => state.cart);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full bg-white relative z-50 sticky top-0">
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 py-4 mx-auto flex items-center justify-between">
        
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            className="xl:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          <Link
            href="/"
            className="flex items-center gap-1 absolute left-1/3 ml-4 lg:left-96 lg:ml-12 xl:left-6 lg:top-4 -translate-x-1/2"
          >
            <Image
              src={Logo}
              alt="B2bAgroAfrica Logo"
              height={30}
              style={{ width: 'auto', height: '40px' }}
              priority
            />
            <div className="flex flex-col leading-tight">
              <h2 className="text-md text-orange-600 font-bold">b2b</h2>
              <span className="text-green-950 text-md font-bold">AgroAfrica</span>
            </div>
          </Link>
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden xl:block lg:w-3/3 w-1/2 relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full h-[45px] border-[2.5px] border-orange-600 rounded-full px-4 pr-16 focus:outline-none font-medium"
          />
          <div className="w-[50px] h-[45px] bg-orange-600 absolute top-0 right-0 rounded-r-full flex items-center justify-center cursor-pointer">
            <Search color="#fff" />
          </div>
        </div>

        {/* Right: Profile + Wishlist + Cart */}
        <div className="flex items-center gap-6">
          {/* Profile (always visible) */}
          {!isLoading && existingUser ? (
            <Link href="/profile" className="flex items-center gap-2">
              <ProfileIcon />
              <div className="hidden sm:block">
                <span className="block text-sm">Hello,</span>
                <span className="font-semibold">
                  {existingUser?.name?.split(' ')[0]}
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2">
              <ProfileIcon />
              <div className="hidden sm:block">
                <span className="block text-sm">Hello,</span>
                <span className="font-semibold">
                  {isLoading ? '...' : 'Sign In'}
                </span>
              </div>
            </Link>
          )}

          {/* Wishlist */}
          <Link href="/wishlist" className="relative">
            <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <div className="w-5 h-5 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
              <span className="text-white">{wishlist?.length}</span>
            </div>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <div className="w-5 h-5 text-xs border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute -top-2 -right-2">
              <span className="text-white">{cart?.length}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-b border-b-[#99999938]" />

      {/* Nav */}
      <HeaderBottom />

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 z-50 h-full w-[80%] max-w-xs bg-white shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                <X />
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-10 border border-orange-600 rounded-full px-4 pr-12 focus:outline-none"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                  <Search className="text-orange-600" size={18} />
                </div>
              </div>
            </div>

            {/* Nav Items */}
            <div className="flex flex-col gap-4">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="text-base font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Profile in Sidebar */}
            <div className="mt-10 border-t pt-4">
              {!isLoading && existingUser ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3"
                  onClick={() => setSidebarOpen(false)}
                >
                  <ProfileIcon />
                  <div>
                    <span className="block text-sm">Hello,</span>
                    <span className="font-semibold">
                      {existingUser?.name?.split(' ')[0]}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3"
                  onClick={() => setSidebarOpen(false)}
                >
                  <ProfileIcon />
                  <div>
                    <span className="block text-sm">Hello,</span>
                    <span className="font-semibold">
                      {isLoading ? '...' : 'Sign In'}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
