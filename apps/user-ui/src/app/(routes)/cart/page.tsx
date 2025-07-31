// "use client"
// import useDeviceTracking from 'apps/user-ui/src/hooks/useDeviceTracking'
// import useLocationTracking from 'apps/user-ui/src/hooks/useLocationTracking'
// import useUser from 'apps/user-ui/src/hooks/useUser'
// import { useStore } from 'apps/user-ui/src/store'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React, { useState } from 'react'

// function CartPage() {
//     const router = useRouter()
//     const { existingUser } = useUser()
//     const location = useLocationTracking()
//     const deviceInfo = useDeviceTracking()
//     const cart = useStore((state: any) => state.cart)
//     const [discountedProductId,setDiscountedProductId ] = useState("")
//     const [discountPercent, setDiscountPercent] = useState(0)
//     const removeFromcart = useStore((state: any) => state.removeFromCart)
//     const [loading, setLoading] = useState(false)
//      const [discountAmount, setDiscountAmount] = useState(0)


//  const decreaseQuantity = (id:string) => {
//         useStore.setState((state:any) => ({
//             cart: state.cart.map((item:any) =>
//                 item.id === id && item.quantity > 1 
//             ? { ...item, quantity: item.quantity - 1} 
//             : item
//             ),
//         }));
//     }

//     const increaseQuantity = (id:string) => {
//         useStore.setState((state:any) => ({
//             cart: state.cart.map((item:any) =>
//                 item.id === id 
//             ? { ...item, quantity: (item.quantity ?? 1) + 1} 
//             : item
//             ),
//         }));
//     }

//     const removeItem = (id:string) => {
//         removeFromcart(id, existingUser, location, deviceInfo);
//     }

//     const subtotal = cart.reduce(
//         (total: number, item: any) => total + (item.quantity ?? 0) * (item.sale_price ?? 0),
//         0
//       );
      

//   return (
//     <div className='w-full bg-white'>
//         <div className="md:w-[80%] w-[95%] mx-auto min-h-screen">
//             <div className="pb-[50px]">
//                 <h1 className="md:pt-[50px] font-medium text-[44px] leading-[1] mb-[16px] font-jost" >
//                     Shopping Cart
//                 </h1>

//                  {/* Breadcrumb */}
//             <Link href={"/"} className="text-[#55585b] hover:underline">
//                 Home
//             </Link>
//             <span className="inline-block p-[4.5px] mx-1 bg-[#a8acb0] rounded-full"></span>
//             <span className="text-[#55585b]">Cart</span>
//             </div>

//               {/* Cart Items  Empty*/}
//         {cart.length === 0 ? (
//             <div className="text-center text-gray-600 text-lg">
//                 Your cart is empty! Start adding products.
//             </div>
//         ) : (
//             <div className="lg:flex items-start gap-10">
//                 <table className="w-full border-collapse lg:w-[70%]">
//                     <thead className="rounded bg-[#f1f3f4]">
//                         <tr>
//                         <th className="py-3 text-left pl-6 align-middle">Product</th>
//                             <th className="py-3 text-left pl-8 align-middle">Price</th>
//                             <th className="py-3 text-left pl-4 align-middle">Quantity</th>
//                             <th className="py-3 text-left pl-6 align-middle">Unit</th>
//                             <th className="py-3 text-left pl-6 align-middle"></th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                          {cart.map((item: any) => (
                            
//                                                    <tr key={item.id} className="border-b border-b-[#0000000e]">
//                                                    <td className="flex items-center gap-4 p-4">
//                                                      <Image
//                                                        src={item.images[0]?.url} 
//                                                        alt={item.title}
//                                                        width={80}
//                                                        height={80}
//                                                        className="rounded" 
//                                                      />
//                                                   <div className="flex flex-col">
//                                                   <span className='font-medium'>{item.title}</span> 
//                                                   {item?.selectedOptions && (
//                                                     <div className="text-sm text-gray-500">
//                                                         {item?.selectedOptions?.color && (
//                                                             <span>
//                                                                 Color: {}
//                                                                 <span 
//                                                                 style={{backgroundColor: item?.selectedOptions?.color,
//                                                                     width:"12px",
//                                                                     height:"12px",
//                                                                     borderRadius: "100%",
//                                                                     display: "inline-block"    
//                                                                 }}
//                                                                 /> 
//                                                             </span>
//                                                         )}
//                                                         {
//                                                             item?.selectedOptions.size && (
//                                                                 <span>Size: {item?.selectedOptions?.size}</span>
//                                                             )
//                                                         }
//                                                     </div>
//                                                   )}
//                                                   </div> 
//                                                    </td>

//                                                    <td className=" text-lg text-center">
//                                                         {
//                                                             item?.id===discountedProductId ? (
//                                                                 <div className="flex flex-col items-center">
//                                                                     <span className="line-through text-gray-500 text-sm">
//                                                                     ${item?.sale_price?.toFixed(2)}
//                                                                     </span> {" "}
//                                                                     <span className="text-green-600 font-semi-bold">
//                                                                         ${(
//                                                                             (item.sale_price * (100 - discountPercent)) / 
//                                                                             100
//                                                                         ).toFixed(2)}
//                                                                     </span>
//                                                                     <span className="text-xs text-green-700 bg-white">
//                                                                         Discount Applied
//                                                                     </span>
//                                                                 </div>
//                                                             ) : (
//                                                                 <span>
//                                                                     ${item.sale_price.toFixed(2)}
//                                                                 </span>

//                                                             )
//                                                         }
//                                                    </td>
//                                                   <td>
//                                                      <div className="flex justify-center px-8 items-center border border-gray-200 rounded-[20px] w-[90px] p-[2px]">
//                                                        <button className="text-black cursor-pointer text-2xl "
//                                                        onClick={() => decreaseQuantity(item.id)}
//                                                        >-</button>
//                                                        <span className='px-4'>{item?.quantity}</span>
//                                                        <button className="text-black cursor-pointer text-2xl "
//                                                         onClick={() => increaseQuantity(item?.id)}
//                                                        >+</button>
//                                                      </div>
//                                                    </td>
                                                 
//                                                     <td className="text-lg text-gray-700 px-7">
//                                                    {item.selectedOptions?.unit ? item.selectedOptions.unit : "-"}

// </td> 

                                              


                                                 
//                                                    {/* <td>
//                                                      <button 
//                                                        onClick={() => addToCart(item.id, existingUser, location, deviceInfo)}
//                                                        className="bg-[#2295ff] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[#007bff] transition-all"
//                                                      >
//                                                       Add To Cart
//                                                      </button>
//                                                    </td> */}
//                                                    <td>
//                                                      <button 
//                                                        onClick={() => removeItem(item?.id)}
//                                                        className="text-[#818487] cursor-pointer hover:text-[#ff1826] transition duration-200"
//                                                      >
//                                                       x Remove
//                                                      </button>
//                                                      </td>
                                                  
//                                                  </tr>
                                                 
//                                                 ))}
//                     </tbody>
//                 </table>
// {discountAmount > 0 && (
//     <div className="flex justify-between items-center text-[#010f1c] text-base font-medium pb-1">
//         <span className='font-jost'>
//             Discount ({discountPercent}%)
//         </span>
//         <span className="text-green-600">
//             -${discountAmount.toFixed(2)}
//         </span>
//     </div>
// )}
//             </div>
//         )}

//         </div>
//     </div> 
//   )
// }

// export default CartPage



"use client"
import useDeviceTracking from 'apps/user-ui/src/hooks/useDeviceTracking'
import useLocationTracking from 'apps/user-ui/src/hooks/useLocationTracking'
import useUser from 'apps/user-ui/src/hooks/useUser'
import { useStore } from 'apps/user-ui/src/store'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function CartPage() {
    const router = useRouter()
    const { existingUser } = useUser()
    const location = useLocationTracking()
    const deviceInfo = useDeviceTracking()
    const cart = useStore((state: any) => state.cart)
    const [discountedProductId,setDiscountedProductId ] = useState("")
    const [discountPercent, setDiscountPercent] = useState(0)
    const removeFromcart = useStore((state: any) => state.removeFromCart)
    const [loading, setLoading] = useState(false)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [couponCode, setCouponCode] = useState("")
    const [selectedAddressId, setSelectedAddressId] = useState("")


 const decreaseQuantity = (id:string) => {
        useStore.setState((state:any) => ({
            cart: state.cart.map((item:any) =>
                item.id === id && item.quantity > 1 
            ? { ...item, quantity: item.quantity - 1} 
            : item
            ),
        }));
    }

    const increaseQuantity = (id:string) => {
        useStore.setState((state:any) => ({
            cart: state.cart.map((item:any) =>
                item.id === id 
            ? { ...item, quantity: (item.quantity ?? 1) + 1} 
            : item
            ),
        }));
    }

    const removeItem = (id:string) => {
        removeFromcart(id, existingUser, location, deviceInfo);
    }

    const subtotal = cart.reduce(
        (total: number, item: any) => total + (item.quantity ?? 0) * (item.sale_price ?? 0),
        0
      );
      

  return (
    <div className='w-full bg-white'>
        <div className="md:w-[80%] w-[95%] mx-auto min-h-screen">
            <div className="pb-[50px]">
                <h1 className="md:pt-[50px] font-medium text-[44px] leading-[1] mb-[16px] font-jost" >
                    Shopping Cart
                </h1>

                 {/* Breadcrumb */}
            <Link href={"/"} className="text-[#55585b] hover:underline">
                Home
            </Link>
            <span className="inline-block p-[4.5px] mx-1 bg-[#a8acb0] rounded-full"></span>
            <span className="text-[#55585b]">Cart</span>
            </div>

              {/* Cart Items  Empty*/}
        {cart.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
                Your cart is empty! Start adding products.
            </div>
        ) : (
            <div className="lg:flex items-start gap-10">
               <table className="w-full border-collapse lg:w-[70%] table-fixed">
  <thead className="rounded bg-[#f1f3f4]">
    <tr>
      <th className="py-4 px-6 text-left w-[30%]">Product</th>
      <th className="py-4 px-6 text-left w-[15%]">Price</th>
      <th className="py-4 px-8 text-left w-[15%]">Quantity</th>
      <th className="py-4 px-16 text-left w-[20%]">Unit</th>
      <th className="py-4 px-6 text-left w-[10%]"></th>
    </tr>
  </thead>

  <tbody>
    {cart.map((item: any) => (
      <tr key={item.id} className="border-b border-b-[#0000000e]">
        <td className="p-4 flex items-center gap-4 w-[40%]">
          <Image
            src={item.images[0]?.url}
            alt={item.title}
            width={80}
            height={80}
            className="rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm md:text-base">{item.title}</span>
            {item?.selectedOptions && (
              <div className="text-sm text-gray-500 space-x-2">
                {item?.selectedOptions?.color && (
                  <span className="inline-flex items-center">
                    Color:{" "}
                    <span
                      style={{
                        backgroundColor: item?.selectedOptions?.color,
                        width: "12px",
                        height: "12px",
                        borderRadius: "100%",
                        display: "inline-block",
                        marginLeft: "4px"
                      }}
                    />
                  </span>
                )}
                {item?.selectedOptions?.size && (
                  <span>Size: {item?.selectedOptions?.size}</span>
                )}
              </div>
            )}
          </div>
        </td>

        <td className="text-left px-6 w-[15%]">
          {item?.id === discountedProductId ? (
            <div className="flex flex-col">
              <span className="line-through text-gray-500 text-sm">
                ${item?.sale_price?.toFixed(2)}
              </span>
              <span className="text-green-600 font-semibold text-sm">
                ${((item.sale_price * (100 - discountPercent)) / 100).toFixed(2)}
              </span>
              <span className="text-xs text-green-700">Discount Applied</span>
            </div>
          ) : (
            <span className="text-sm">${item.sale_price.toFixed(2)}</span>
          )}
        </td>

        <td className="w-[15%] px-6">
          <div className="flex justify-center items-center border border-gray-200 rounded-[20px] w-[100px] p-[4px]">
            <button
              className="text-black cursor-pointer text-xl"
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </button>
            <span className="px-4 text-sm">{item?.quantity}</span>
            <button
              className="text-black cursor-pointer text-xl"
              onClick={() => increaseQuantity(item?.id)}
            >
              +
            </button>
          </div>
        </td>

        <td className="text-sm px-16 w-[20%] text-gray-700">
          {item.selectedOptions?.unit ? item.selectedOptions.unit : "-"}
        </td>

        <td className="px-3 w-[10%]">
          <button
            onClick={() => removeItem(item?.id)}
            className="text-[#818487] cursor-pointer hover:text-[#ff1826] transition duration-200 text-sm"
          >
            x Remove
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

<div className="p-6 shadow-md w-full lg:w-[30%] bg-[#f9f9f9] rounded-lg">
    {discountAmount > 0 && (
        <div className="flex justify-between items-center text-[#010f1c] text-base font-medium pb-1">
            <span className='font-jost'>
                Discount ({discountPercent}%)
            </span>
            <span className="text-green-600">
                -${discountAmount.toFixed(2)}
            </span>
        </div>
    )}

    <div className="flex justify-between items-center text-[#010f1c] text-[20px] font-[550] pb-3">
        <span className="jost">Subtotal</span>
        <span>${(subtotal - discountAmount).toFixed(2)}</span>
    </div>
    <hr className="my-4 text-slate-200" />

    <div className="mb-4">
        <h4 className="mb-[7px] font-[500] text-[15px]">
            Have a Coupon?
        </h4>
        <div className="flex">
            <input type="text"
            value={couponCode}
            onChange={(e:any) => setCouponCode(e.target.value)}
            placeholder='Enter coupon code'
            className='w-full p-2 border border-gray-200 rounded-l-md focus:outline-none focus:border-blue-500'
            />
            <button
            className='bg-blue-500 cursor-pointer text-white px-4 rounded-r-md hover:bg-blue-600 transition-all'
            // onClick={() => couponCodeapply}
            >
                Apply
            </button>
            {/* { 
                error && (
                    <p className="text-sm pt-2 text-red-500">{error}</p>
                )
            } */}
        </div>
        <hr className='my-4 text-slate-200' />
        <div className="mb-4">
            <h4 className="mb-[7px] font-medium text-[15px]">
                Select Shipping Address
            </h4>
            <select className='w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500'
            value={selectedAddressId}
            onChange={(e) => setSelectedAddressId(e.target.value)}
            >
<option value="123">
    Home - New York - USA
</option>
            </select>
        </div>
        <hr className='my-4 text-slate-200' />
        <div className="mb-4">
            <h4 className="mb-[7px] font-medium text-[15px]">
                Select Payment Method
            </h4>
            <select className='w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500'
            value={selectedAddressId}
            onChange={(e) => setSelectedAddressId(e.target.value)}
            >
<option value="credit_card">
   Online Payment
</option>
<option value="credit_card">
  Cash on Delivery
</option>
            </select>
            </div>
            <hr className='my-4 text-slate-200' /> 

            <div className="flex justify-between items-center text-[#010f1c] text-[20px] font-[550] pb-3">
            <span className="jost">Total</span>
            <span>${(subtotal - discountAmount).toFixed(2)}</span>
            </div>

            <button
            disabled={loading} 
            className="w-full flex items-center justify-center gap-2 cursor-pointer mt-4 py-3 text-white transition-all rounded-lg bg-[#010f1c] hover:bg-[#0989FF]">
                {loading && <Loader2 className='animate-spin w-5 h-5'/>}
                {loading ? "Redirecting...": "Proceed to Checkout"}
            </button>
    </div>
</div>

            </div>
        )}
 
        </div>
    </div> 
  )
}

export default CartPage
