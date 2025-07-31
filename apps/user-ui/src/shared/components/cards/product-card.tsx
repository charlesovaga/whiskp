import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Ratings from '../ratings';
import { Eye, Heart, ShoppingCart, } from 'lucide-react';
import ProductDetailsCard from './product-details.card';
import { useStore } from 'apps/user-ui/src/store';
import useUser from 'apps/user-ui/src/hooks/useUser';
import useLocationTracking from 'apps/user-ui/src/hooks/useLocationTracking';
import useDeviceTracking from 'apps/user-ui/src/hooks/useDeviceTracking';


function ProductCard({product, isEvent}:{product:any;isEvent?:boolean}) {
 const [timeLeft, setTimeLeft] = useState("");
 const {existingUser} = useUser()
 const location = useLocationTracking()
 const deviceInfo = useDeviceTracking()
  const [open, setOpen] = useState(false);
  const addToWishlist = useStore((state:any) => state.addToWishlist);
  const removeFromWishlist = useStore((state:any) => state.removeFromWishlist);
  const wishlist = useStore((state:any) => state.wishlist);
  const addToCart = useStore((state:any) => state.addToCart);
  const isWishlisted = wishlist.some((item:any) => item.id === product.id);
  const cart = useStore((state:any) => state.cart);
  const isIncart = cart.some((item:any) => item.id === product.id);
  // const removeFromCart = useStore((state:any) => state.removeFromCart);

  console.log("Product unit:", product.unit);
  useEffect(() => {
    if(isEvent && product?.ending_date){
      const interval = setInterval(() => {
        const now =  Date.now();
        const endTime = new Date(product.ending_date).getTime();
        const diff = endTime - now
    
        if(diff <= 0) {
          setTimeLeft("Event ended");
          clearInterval(interval);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m left with this price`);
      }, 60000);

      return () => clearInterval(interval);
    }
    return;

  }, [isEvent, product?.ending_date]);

  return (
    <div className='w-full min-h-[350px] h-max bg-white rounded-lg relative '>
      {
        isEvent && (
            <div className='absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-sm shadow-sm'>
                OFFER
            </div>
        )
      }
      {
        product?.stock <= 5 && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-slate-700 text-[10px] font-semibold px-2">
                Limited Stock
            </div>

        )
      }
      <Link href={`/product/${product?.slug}`}
      >
        <img src={product ?.images[0]?.url ||
        "https://images.app.goo.gl/DCBwkzC7q7RyJrdo7" 

        } alt={product?.title} 
        width={300}
        height={300}
        className='w-full h-[200px] object-cover mx-auto rounded-t-md px-14 p-2'/>
      </Link>

      <Link
      href={`/shop/${product?.Shop?.id}`}
      className="block text-blue-500 text-sm font-medium my-2 px-2"
      >
        {product?.Shop?.name}
      </Link>

      <Link
      href={`/shop/${product?.slug}`}>
        <h3  className="text-base font-semibold px-2 text-gray-800 line-clamp-2">
        {product?.title}
        </h3>
        {product?.unit && (
  <p className="px-2 text-sm text-gray-500">Unit: {product.unit}</p>
)}
      </Link>

      <div className="mt-2 px-2">
        <Ratings  rating={product?.ratings}/>
      </div>

      <div className="mt-3 flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product?.sale_price}
          </span>
          <span className="text-sm line-through text-gray-400">
            ${product?.regular_price}
          </span>
        </div>
        <span className="text-sm text-green-500 font-medium">
          {product?.stock} in stock
        </span>
        {/* <span className="text-sm text-green-500 font-medium">
          {product.totalSales} sold
        </span> */}
      </div>

          {
            isEvent && timeLeft && (
              <div className="mt-2">
                <span className='inline-block text-xs bg-orange-100 text-orange-500 px-2 py-1 rounded-md'>
                 {timeLeft}
                </span>
              </div>
            )
          }
      <div className="absolute z-10 flex flex-col gap-3 right-3 top-10">
        <div className="bg-white rounded-full p-[6px] shadow-md">
          <Heart className='cursor-pointer hover:scale-110 transition '
          size={22}
          fill={isWishlisted ? "red": "transparent"}
          onClick={(() => 
            isWishlisted 
            ? removeFromWishlist(product.id, existingUser, location, deviceInfo) 
            : addToWishlist(  { ...product, quantity: 1, unit: product.unit },
              existingUser,
            location,
            deviceInfo)
          )
          }
          stroke={isWishlisted ? "red": "#4B5563"}
          />
        </div>
        <div className="bg-white rounded-full shadow-md p-[6px]">
        <Eye className='cursor-pointer text-[#4b5563] hover:scale-110 transition '
          size={22}
          onClick={() => setOpen(!open)}
        />
        </div>
        <div className="bg-white rounded-full p-[6px] shadow-md">
          <ShoppingCart 
          size={22}
          onClick={() =>
            !isIncart &&
            addToCart(  { ...product, quantity: 1, unit: product.unit }, existingUser, location, deviceInfo)
          }
          className="cursor-pointer text-[#4b5563] hover:scale-110 transition" 
          />
        </div>
      </div>
      {
        open && (
          <ProductDetailsCard data={product} setOpen={setOpen}/>
        )
      }
    </div>
  )
}

export default ProductCard


 