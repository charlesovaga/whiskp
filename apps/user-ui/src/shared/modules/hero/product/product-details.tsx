// "use client";
// import React, { useState } from "react";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";

// const ProductDetails = ({ productDetails }: { productDetails: any }) => {
//   const [currentImage, setCurrentImage] = useState(
//     productDetails?.images?.[0]?.url || ""
//   );

//   return (
//     <div className="w-full bg-[#f5f5f5] py-5">
//       <div className="w-[90%] bg-white lg:w-[80%] mx-auto pt-6 grid grid-cols-1 lg:grid-cols-[28%_44%_28%] gap-6 overflow-hidden">
//         {/* Left column - product images */}
//         <div className="p-4">
//         <ReactImageMagnify
//         {...{
//           smallImage: {
//             alt: "product Image",
//             isFliudWidth: true,
//             src: currentImage || "https://ik.imagekit.io/fzoxzwtey"
//           },
//           largeImage: {
//             src: currentImage || "https://ik.imagekit.io/fzoxzwtey",
//             width: 1200,
//             height:1200,
//           },
//           enlargedImageContainerDimensions:{
//             width: "150%",
//             height: "150%",
//           },
//           enlargedImageStyle: {
//             border: "none",
//             boxShadow: "none",
//           },
//           enlargedImagePosition: "right",
//         }}
//         />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


"use client";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Ratings from "../../../components/ratings";
import Link from "next/link";

const ProductDetails = ({ productDetails }: { productDetails: any }) => {
  const [currentImage, setCurrentImage] = useState(
    productDetails?.images?.[0]?.url || ""
  );
  const [currentIndex, setCurrentIndex] = useState(0)

  // Navigate to previous Image
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentImage(productDetails?.images[currentIndex - 1])
    }
  }


  // Navigate to next Image
  const indexImage = () => {
    if (currentIndex < productDetails?.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentImage(productDetails?.images[currentIndex + 1])
    }
  }

  return (
    <div className="w-full bg-[#f5f5f5] py-5">
      <div className="w-[90%] bg-white lg:w-[80%] mx-auto pt-6 grid grid-cols-1 lg:grid-cols-[28%_44%_28%] gap-6 overflow-hidden">
        <div className="p-4">
          <div className="relative w-full">

        
          <Zoom>
            <img
              alt="Product"
              className="w-full object-contain"
              src={currentImage || "https://ik.imagekit.io/fzoxzwtey"}
            />
          </Zoom>
        </div>

        {/* Thumbnail images array */}
        <div className="relative flex items-center gap-2 mt-4 overflow-hidden">
          {productDetails?.images?.length > 4 &&  (
            <button className="absolute left-0 bg-white rounded-full shadow-md z-10"
            onClick={prevImage}
            disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} />
          
            </button>
          )}

          <div className="flex gap-2 overflow--auto">
            {productDetails?.images?.map((img:any, index:number) => (
              <Image 
              key={index}
              src={
                img?.url ||
                "https://ik.imagekit..."
              }
              alt="Thumbnail"
              width={60}
              height={60}
              className={`cursor-pointer border rounded-lg p-1 ${
                currentImage === img? "border-blue-500"
                : "border-gray-300"
              }`}

              onClick={() => {
                setCurrentIndex(index)
                setCurrentImage(img?.url || "")

              }}
              />
            ))}
          </div>
          {productDetails?.images.length > 4 && (
            <button 
            className="absolute right-0 bg-white p-2 rounded-full shadow-md z-10"
            onClick={indexImage}
            disabled={currentIndex === productDetails?.images.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
        </div>
      
       
      {/* Middle Column - product details */}
      <div className="p-4">
        <h1 className="text-xl mb-2 font-medium">{productDetails?.title}</h1>
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-2 mt-2 text-yellow-500">
            <Ratings rating={productDetails?.rating} />
            <Link href={"reviews"} className="text-blue-500 hover:underline"   >
            (0 reviews)
            </Link>
           
          
            </div>
            <Heart 
          size={25}
          fill={"red"}
          className="cursor-pointer"
          color="transparent"
          />
          </div>
            </div>
            <div className="py-2 border-b border-gray-200">
             <span className="text-gray-500">
              Brand: {" " }
              <span className="text-blue-500">
                {productDetails?.brand || "No Brand"}
              </span>
              </span> 
            </div>
       
         
        </div>
      </div>
   
    
  );
};

export default ProductDetails;
