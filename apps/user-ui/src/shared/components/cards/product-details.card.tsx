// // import Image from 'next/image'
// // import React, { useState } from 'react'

// // function ProductDetailsCard({data, setOpen}:{data: any, setOpen: (open:boolean) => void}) {
// //   const [activeImage, setActiveImage] = useState(0);
// //   return (
// //     <div className='fixed top-0 left-0 w-full h-screen bg-[#0000001d]  flex items-center justify-center z-50'
// //       onClick={() => setOpen(false)}
// //       >
// //       <div className="w-[90%] md:w-[70%] md:mt-14 2xl:mt-0 h-max overflow-scroll min-h-[70vh] p-4 md:p-6 bg-white shadow-md rounded-lg"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <div className="w-full flex flex-col md:flex-row">
// //           <div className="w-full md:w-1/2 h-full">
// //           <Image 
// //           src={data?.images?.[activeImage]?.url}
// //           alt={data?.images?.[activeImage].url}
// //           width={400}
// //           height={400}
// //           className='w-full rounded-lg object-contain'
// //           />

// //           {/* Thumbnails */}
// //           <div className="flex gap-2 mt-4">
// //             {
// //               data?.images?.map((img:any, index:number) => (
// //                 <div key={index} className={`cursor-pointer border rounded-md ${activeImage === index ? ' border-gray-500 pt-1' : 'border-transparent'}`}
// //                   onClick={() => setActiveImage(index)}
// //                 >
// //                   <Image 
// //                     src={img?.url}
// //                     alt={`Thumbnail ${index}`}
// //                     width={80}
// //                     height={80}
// //                     className=' rounded-md'
// //                   />
// //                 </div>
// //               ))
// //             }
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     </div>
// //   )
// // }

// // export default ProductDetailsCard

// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useState } from 'react'
// import Ratings from '../ratings'
// import { Heart, MapPin, MessageCircle, ShoppingCartIcon, X } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// function ProductDetailsCard({
//   data,
//   setOpen,
// }: {
//   data: any
//   setOpen: (open: boolean) => void
// }) {
//   const [activeImage, setActiveImage] = useState(0)
//   const [isSelected, setIselected] = useState(data?.colors?.[0] || '')
//   const [isSizeSelected, setIsSizeelected] = useState(data?.sizes?.[0] || '')
//   const [quantity, setQuantity] = useState(1)
//   const [unit, setUnit] = useState('');

//   const estimatedDelivery = new Date()
//   estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

//   const router = useRouter()

//   return (
//     <div
//       className="fixed top-0 left-0 w-full h-screen bg-[#00000050] flex items-center justify-center z-50"
//       onClick={() => setOpen(false)}
//     >
//       <div
//         className="relative w-[95%] md:w-[80%] lg:w-[70%] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl p-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="w-full flex flex-col md:flex-row gap-6">
//           {/* LEFT IMAGE SECTION */}
//           <div className="w-full md:w-1/2 flex flex-col ">
//             <Image
//               src={data?.images?.[activeImage]?.url}
//               alt={`Product Image ${activeImage}`}
//               width={300}
//               height={300}
//               className="rounded-lg object-contain max-h-[300px]"
//             />

//             <div className="flex gap-2 mt-4 flex-wrap">
//               {data?.images?.map((img: any, index: number) => (
//                 <div
//                   key={index}
//                   onClick={() => setActiveImage(index)}
//                   className={`cursor-pointer border ${
//                     activeImage === index
//                       ? 'border-gray-600'
//                       : 'border-transparent'
//                   } rounded-md`}
//                 >
//                   <Image
//                     src={img?.url}
//                     alt={`Thumbnail ${index}`}
//                     width={60}
//                     height={60}
//                     className="rounded-md object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT DETAILS SECTION */}
//           <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
//           {/* Sellers info  */}
//          <div className="border-b relative pb-3 border-gray-200 flex items-center justify-between">
//               <div className="flex items-start gap-3">
//                 {/* Shop logo */}
//                 <Image
//                   src={data?.Shop?.avatar || 'https://via.placeholder.com/50'}
//                   alt={data?.Shop?.name}
//                   width={60}
//                   height={60}
//                   className="rounded-full w-[60px] h-[60px] object-cover"
//                   />
//                   <div>
//                     <Link 
//                     href={`/shop/${data?.Shop?.id}`}
//                     className='text-sm font-medium'
//                     >
//                     {data?.Shop?.name || 'Shop Name'}
//                     </Link>

//                     {/* Shop ratings */}
//                     <span className="block mt-1">
//                       <Ratings rating={data?.Shop?.ratings} />
//                     </span>

//                     {/* Shop Location */}
//                     <p className='text-gray-600 mt-1 flex items-center gap-1 text-sm'>
//                     <MapPin size={20}/> {" "}
//                     {data?.Shop?.address || 'Location not available'}

//                     </p>


//                   </div>
//               </div>

//               {/* Chat with Vendor */}
//               <button 
//               className='flex items-center text-xs  gap-2 cursor-pointer right-0 top-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'
//               onClick={() => router.push(`/inbox>?shopId=${data?.Shop?.id}`)}>
//                 <MessageCircle size={18} />
//                 Chat with Vendor
//               </button>

//               <button
//               className='w-full absolute cursor-pointer right-[-5px] top-[-5px] flex justify-end my-2 mt-[-10px]'>
//               <X size={25}
//               onClick={() => setOpen(false)}
//               />
//               </button>
//           </div>
//           <h3 className="text-xl font-semibold mt-3">{data?.title}</h3>
//           <p className="mt-2 text-gray-700 whitespace-pre-wrap w-full">
//             {data?.short_description}{" "}
//           </p>

//           {/* Brand */}
//           {data?.brand && (
//             <p className="mt-2">
//               <strong>Brand:</strong> {data?.brand}
//             </p>
//           )}

//           {/* Color & Size selection */}
//           <div className="flex flex-col md:flex-row items-start gap-5 mt-4">
//             {/* color options */}
//             {
//               data?.colors?.length > 0 && (
//                 <div>
//                   <strong>Color:</strong>
//                   <div className="flex gap-2 mt-1">
//                     {data.colors.map((color: string, index: number) => (
//                       <button
//                       key={index}
//                       className={`w-8 h-8 cursor-pointer rounded-full border-2 transition-colors ${isSelected === color
//                         ? "border-gray-400 scale-110 shadow-md"
//                         : "border-transparent"
//                         }`}
//                         onClick={() => setIselected(color)}
//                         style={{ backgroundColor: color }}
//                       >

//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )
//             }
//             {/* Size options */}
//             {
//               data?.sizes?.length > 0 && (
//                 <div className="mt-4">
//                   <strong>Size:</strong>
//                   <div className="flex gap-2 mt-1">
//                     {data.sizes.map((size: string, index: number) => (
//                       <button
//                         key={index}
//                         className={`px-4 py-1 cursor-pointer border rounded-md transition-colors ${
//                           isSizeSelected === size
//                             ? "bg-gray-800 text-white"
//                             : "bg-gray-300 text-black"
//                         }`}
//                         onClick={() => setIsSizeelected(size)}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )
//             }
//           </div> 
//             {/* Price  */}
//             <div className="mt-5 flex items-center gap-2">
//               <h3 className="text-2xl font-semibold text-gray-900">
//                 ${data?.sale_price}
//               </h3>
//               {data?.regular_price && (
//                 <span className="text-xs line-through text-red-600">
//                   ${data?.regular_price}
//                 </span>
//               )}
//             </div>

//             <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">

//                 {/* Quantity Selector */}
//               <div className="flex items-center rounded-md">
//                 <button
//                   className="px-3 cursor-pointer py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400  font-semibold rounded-l-md"
//                   onClick={() => setQuantity((prev) => Math.max(1, prev - 1) )}
//                 >
//                   -
//                 </button>
//                 <span className="px-4 bg-gray-100 py-1">{quantity}</span>
//                 <button
//                   className="px-3 cursor-pointer py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 font-semibold rounded-r-md"
//                   onClick={() => setQuantity((prev) => prev + 1)}
//                   >
//                     +
//                   </button>
//                   </div> 
//                                         {/* Unit Selector */}

//                                         <div className="w-full sm:w-36">

// <select
//   value={unit}
//   onChange={(e) => setUnit(e.target.value)}
//   className="border border-gray-300 px-2 py-1 rounded-md bg-white text-gray-700 w-full sm:w-40"
// >
//   <option value="" disabled>Select unit</option>
//   <option value="kg">kg</option>
//   <option value="ton">ton</option>
//   <option value="liter">liter</option>
//   <option value="meter">meter</option>
//   <option value="pack">pack</option>
//   <option value="box">box</option>
//   <option value="carton">carton</option>
// </select>
// </div>
             
                


//             </div>
//             <div className="flex gap-4 mt-5">    
//                <button
//           className={`flex items-center gap-2 px-4 py-2 bg-[#ff5722] hover:bg-[#e64a19] text-white font-medium rounded-lg transition whitespace-nowrap`}
//           >
//             <ShoppingCartIcon  size={18}/>
//             Add to Cart
//           </button>
//           <button className="cursor-pointer opacity-[.7]">
//             <Heart size={20} fill="red" color='black' />
//           </button>
   
//           </div>
//  <div className="mt-3">
//   {data.stock > 0 ? (
//     <span className=" text-green-600 font-Semibold">
//       {data.stock} in stock
//     </span>
//   ) : (
//     <span className="text-red-600 font-Semibold">Out of stock</span>
//   )}
//  </div> {' '} 
//  <div className="mt-3 text-gray-600 text-sm">
//   Estimated Delivery: {" "}
//   <strong>{estimatedDelivery.toDateString()}</strong>
//  </div>
//    </div>


//           </div>
      

         

//          </div>
        
//     </div>
//   )
// }

// export default ProductDetailsCard


// X button Issue
// import Image from 'next/image'
// import React, { useState } from 'react'

// function ProductDetailsCard({data, setOpen}:{data: any, setOpen: (open:boolean) => void}) {
//   const [activeImage, setActiveImage] = useState(0);
//   return (
//     <div className='fixed top-0 left-0 w-full h-screen bg-[#0000001d]  flex items-center justify-center z-50'
//       onClick={() => setOpen(false)}
//       >
//       <div className="w-[90%] md:w-[70%] md:mt-14 2xl:mt-0 h-max overflow-scroll min-h-[70vh] p-4 md:p-6 bg-white shadow-md rounded-lg"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="w-full flex flex-col md:flex-row">
//           <div className="w-full md:w-1/2 h-full">
//           <Image 
//           src={data?.images?.[activeImage]?.url}
//           alt={data?.images?.[activeImage].url}
//           width={400}
//           height={400}
//           className='w-full rounded-lg object-contain'
//           />

//           {/* Thumbnails */}
//           <div className="flex gap-2 mt-4">
//             {
//               data?.images?.map((img:any, index:number) => (
//                 <div key={index} className={`cursor-pointer border rounded-md ${activeImage === index ? ' border-gray-500 pt-1' : 'border-transparent'}`}
//                   onClick={() => setActiveImage(index)}
//                 >
//                   <Image 
//                     src={img?.url}
//                     alt={`Thumbnail ${index}`}
//                     width={80}
//                     height={80}
//                     className=' rounded-md'
//                   />
//                 </div>
//               ))
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default ProductDetailsCard

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Ratings from '../ratings'
import { Heart, MapPin, MessageCircle, ShoppingCart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStore } from 'apps/user-ui/src/store'
import useUser from 'apps/user-ui/src/hooks/useUser'
import useLocationTracking from 'apps/user-ui/src/hooks/useLocationTracking'
import useDeviceTracking from 'apps/user-ui/src/hooks/useDeviceTracking'

function ProductDetailsCard({
  data,
  setOpen,
}: {
  data: any
  setOpen: (open: boolean) => void
}) {
  const [activeImage, setActiveImage] = useState(0)
  const [isSelected, setIselected] = useState(data?.colors?.[0] || '')
  const [isSizeSelected, setIsSizeelected] = useState(data?.sizes?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('');
  const {existingUser} = useUser()
  const location = useLocationTracking()
  const deviceInfo = useDeviceTracking()
   const addToWishlist = useStore((state:any) => state.addToWishlist);
   const removeFromWishlist = useStore((state:any) => state.removeFromWishlist);
   const wishlist = useStore((state:any) => state.wishlist);
   const addToCart = useStore((state:any) => state.addToCart);
   const isWishlisted = wishlist.some((item:any) => item.id === data.id);
   const cart = useStore((state:any) => state.cart);
   const isIncart = cart.some((item:any) => item.id === data.id);

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  const router = useRouter()

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-[#00000050] flex items-center justify-center z-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-[95%] md:w-[80%] lg:w-[70%] max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black z-50"
          onClick={() => setOpen(false)}
        >
          <X size={24} />
        </button>
        <div className="p-6 overflow-y-auto max-h-[90vh]">
        
        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* LEFT IMAGE SECTION */}
          <div className="w-full md:w-1/2 flex flex-col ">
            <Image
              src={data?.images?.[activeImage]?.url}
              alt={`Product Image ${activeImage}`}
              width={300}
              height={300}
              className="rounded-lg object-contain max-h-[300px]"
            />

            <div className="flex gap-2 mt-4 flex-wrap">
              {data?.images?.map((img: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`cursor-pointer border ${
                    activeImage === index
                      ? 'border-gray-600'
                      : 'border-transparent'
                  } rounded-md`}
                >
                  <Image
                    src={img?.url}
                    alt={`Thumbnail ${index}`}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS SECTION */}
          <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
          {/* Sellers info  */}
         <div className="border-b relative pb-3 border-gray-200 flex items-center justify-between">
              <div className="flex items-start gap-3">
                {/* Shop logo */}
                <Image
                  src={data?.Shop?.avatar || 'https://via.placeholder.com/50'}
                  alt={data?.Shop?.name}
                  width={60}
                  height={60}
                  className="rounded-full w-[60px] h-[60px] object-cover"
                  />
                  <div>
                    <Link 
                    href={`/shop/${data?.Shop?.id}`}
                    className='text-sm font-medium'
                    >
                    {data?.Shop?.name || 'Shop Name'}
                    </Link>

                    {/* Shop ratings */}
                    <span className="block mt-1">
                      <Ratings rating={data?.Shop?.ratings} />
                    </span>

                    {/* Shop Location */}
                    <p className='text-gray-600 mt-1 flex items-center gap-1 text-sm'>
                    <MapPin size={20}/> {" "}
                    {data?.Shop?.address || 'Location not available'}

                    </p>


                  </div>
              </div>

              {/* Chat with Vendor */}
              <button 
              className='flex items-center text-xs  gap-2 cursor-pointer right-0 top-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'
              onClick={() => router.push(`/inbox>?shopId=${data?.Shop?.id}`)}>
                <MessageCircle size={18} />
                Chat with Vendor
              </button>

              {/* <button
              className='w-full absolute cursor-pointer right-[-5px] top-[-5px] flex justify-end my-2 mt-[-10px]'>
              <X size={25}
              onClick={() => setOpen(false)}
              />
              </button> */}
          </div>
          <h3 className="text-xl font-semibold mt-3">{data?.title}</h3>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap w-full">
            {data?.short_description}{" "}
          </p>

          {/* Brand */}
          {data?.brand && (
            <p className="mt-2">
              <strong>Brand:</strong> {data?.brand}
            </p>
          )}

          {/* Color & Size selection */}
          <div className="flex flex-col md:flex-row items-start gap-5 mt-4">
            {/* color options */}
            {
              data?.colors?.length > 0 && (
                <div>
                  <strong>Color:</strong>
                  <div className="flex gap-2 mt-1">
                    {data.colors.map((color: string, index: number) => (
                      <button
                      key={index}
                      className={`w-8 h-8 cursor-pointer rounded-full border-2 transition-colors ${isSelected === color
                        ? "border-gray-400 scale-110 shadow-md"
                        : "border-transparent"
                        }`}
                        onClick={() => setIselected(color)}
                        style={{ backgroundColor: color }}
                      >

                      </button>
                    ))}
                  </div>
                </div>
              )
            }
            {/* Size options */}
            {
              data?.sizes?.length > 0 && (
                <div className="mt-4">
                  <strong>Size:</strong>
                  <div className="flex gap-2 mt-1">
                    {data.sizes.map((size: string, index: number) => (
                      <button
                        key={index}
                        className={`px-4 py-1 cursor-pointer border rounded-md transition-colors ${
                          isSizeSelected === size
                            ? "bg-gray-800 text-white"
                            : "bg-gray-300 text-black"
                        }`}
                        onClick={() => setIsSizeelected(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )
            }
          </div> 
            {/* Price  */}
            <div className="mt-5 flex items-center gap-2">
              <h3 className="text-2xl font-semibold text-gray-900">
                ${data?.sale_price}
              </h3>
              {data?.regular_price && (
                <span className="text-xs line-through text-red-600">
                  ${data?.regular_price}
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">

                {/* Quantity Selector */}
              <div className="flex items-center rounded-md">
                <button
                  className="px-3 cursor-pointer py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400  font-semibold rounded-l-md"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1) )}
                >
                  -
                </button>
                <span className="px-4 bg-gray-100 py-1">{quantity}</span>
                <button
                  className="px-3 cursor-pointer py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 font-semibold rounded-r-md"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                  </div> 
                                        {/* Unit Selector */}
{/* 
                                        <div className="w-full sm:w-36">

<select
  value={unit}
  onChange={(e) => setUnit(e.target.value)}
  className="border border-gray-300 px-2 py-1 rounded-md bg-white text-gray-700 w-full sm:w-40"
>
  <option value="" disabled>Select unit</option>
  <option value="kg">kg</option>
  <option value="ton">ton</option>
  <option value="liter">liter</option>
  <option value="meter">meter</option>
  <option value="pack">pack</option>
  <option value="box">box</option>
  <option value="carton">carton</option>
</select>
</div> */}
             
             <div className="flex gap-4 mt-1">    
               <button
               disabled={isIncart}
          onClick={() => addToCart({...data, quantity, unit, color: isSelected, size: isSizeSelected}, existingUser, location, deviceInfo )} 

          className={`flex items-center gap-2 px-4 py-2 bg-[#ff5722] hover:bg-[#e64a19] text-white font-medium rounded-lg transition whitespace-nowrap ${isIncart ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <ShoppingCart  size={18}/>
            Add to Cart
          </button>
          <button className="cursor-pointer opacity-[.7]">
            <Heart 
            size={20} 
           fill={isWishlisted ? "red": "transparent"}
           onClick={(() => 
             isWishlisted 
             ? removeFromWishlist(data.id, existingUser, location, deviceInfo) 
             : addToWishlist({...data, quantity: 1},
               existingUser,
             location,
             deviceInfo)
           )
           }
           color={isWishlisted ? "red": "#4B5563"} 
            />
          </button>
   
          </div> 


            </div>
           
 <div className="mt-3">
  {data.stock > 0 ? (
    <span className=" text-green-600 font-Semibold">
      {data.stock} in stock
    </span>
  ) : (
    <span className="text-red-600 font-Semibold">Out of stock</span>
  )}
 </div> {' '} 
 <div className="mt-3 text-gray-600 text-sm">
  Estimated Delivery: {" "}
  <strong>{estimatedDelivery.toDateString()}</strong>
 </div>
   </div>


          </div>
          </div>
      

         

         </div>
        
    </div>
  ) 
}

export default ProductDetailsCard
