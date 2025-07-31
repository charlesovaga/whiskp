"use client"
import {MoveRight} from "lucide-react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
    const router = useRouter()
    

    return(
        <div className="bg-[#115061] flex flex-col justify-center w-full">
            <div className="md:w-[80%] m-auto md:flex h-full items-center">
                <div className="md:w-1/2">
                <p className="font-roboto font-normal text-white pb-2 text-xl">
                    Starting from $8000
                </p>
                <h1 className="text-white text-6xl font-extrabold font-Roboto">
                    The best B2B <br />
                    Collection 2025
                </h1>
                <p className="font-Oregano text-3xl pt-4 text-white">
                    Exclusive offer <span className="text-yellow-400">10%</span> off
                    this week
                </p>
                <br />
                <button
                    onClick={() => router.push("/products")}
                    className="w-[140px] gap-2 font-semibold h-[40px] flex items-center justify-center bg-white rounded-md text-sm"
                >
                    Shop Now <MoveRight />
                </button>

                </div>
                <div className="md:w-1/2 flex justify-center">
                <Image
                src={
                    "https://ik.imageKit.io/fz0xzwtey/products/slider-img-1.png"
                }
                alt=""
                width={450}
                height={450}
                />
                </div>
            </div>
        </div>
    ) 
}
export default Hero