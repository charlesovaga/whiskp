"use client"
import { useMutation } from '@tanstack/react-query'

import { Eye, EyeOff, } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import {useForm}  from "react-hook-form"
import axios, {AxiosError} from "axios"
import { countries } from 'apps/vendor-ui/src/utils/countries'
import CreateShop from 'apps/vendor-ui/src/shared/modules/auth/create-shop'
import PaystackLogo from 'apps/vendor-ui/src/assets/svgs/paystack-logo'
 
// type FormData = {
//     name: string
//     email: string
//     password: string
// }

function Signup() {
    const [activeStep, setAtiveStep] = useState(1)
    const [passwordVissible, setPasswordVisible] = useState(false)
    const [canResend, setcanResend] = useState(true)
    const [timer, setTimer] = useState(60)
    const [showOtp, setShowOtp] = useState(false)
    const [otp, setOtp] = useState(["", "", "", "", "", "", ])
    const [vendorData, setVendorData] = useState<FormData | null>(null)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [vendorId, setVendorId] = useState("")


    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const starResendTimer = () => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if(prev <= 1) {
                    clearInterval(interval)
                    setcanResend(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    const signupMutation = useMutation({
        mutationFn: async(data: FormData) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/vendor-registration`,
                data
            )
            return response.data
        },
        onSuccess: (_, formData) => {
            setVendorData(formData); // formData is now typed properly
            setShowOtp(true);
            setcanResend(false);
            setTimer(60)
            starResendTimer()
          }

        
    })

    const verifyOtpMutation = useMutation({
        mutationFn: async () => {
            if(!vendorData) return
            const response = await axios.post (`${process.env.NEXT_PUBLIC_SERVER_URI}/api/verify-vendor`,
                {
                    ...vendorData,
                    otp: otp.join(""),
                }
            )
            return response.data
        },
        onSuccess: (data) => {
           setVendorId(data?.vendor?.id)
           setAtiveStep(2)
        }
    })

    const onSubmit = (data: any) => {
        signupMutation.mutate(data)
    }
const handleOtpChange = (index:number, value:string) => {
    if (!/^[0-9]?$/.test(value)) return

const newOtp = [...otp]
newOtp[index]= value
setOtp(newOtp)

if (value && index < inputRefs.current.length - 1){
    inputRefs.current[index + 1]?. focus()
}
}

const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0){
        inputRefs.current[index - 1]?.focus()
    }
}

const resendOtp = () => {
    if(vendorData) {
        signupMutation.mutate(vendorData)
    }
}

const connectPaystack = async () => {
    console.log("Vendor ID before axios call:", vendorId);
try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/create-Paystack-link`,
        {vendorId}

        
        

       )
       console.log("Vendor ID before axios call:", vendorId);
       console.log("Sending vendorId:", vendorId);

       if (response.data.url){
        window.location.href = response.data.url
       }
} catch (error) {
    console.log("Paystack Connection Error:", error)


}
}

  return (
   <div className="w-full flex flex-col items-center pt-10 min-h-screen">

        {/* Onboarding stepper */}
        <div className="relative flex items-center justify-between md:w-[50%] mb-8">
            <div className="absolute top-[25%] left-0 w-[80%] md:w-[90%] h-1 bg-gray-300 -z-10"/>

            {[1, 2, 3].map((step) => (
  <div key={step}>
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
        step <= activeStep ? "bg-orange-600" : "bg-gray-300"
      }`}
    >
      {step}
    </div>
    <span className="ml-[-15px]">
        {
            step === 1 ? "Create Account" : step === 2 ? "Setup Shop" : "Connect Bank"
        }
    </span>
  </div>
))}
</div>

    {/* Steps content */}
    <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
        {
            activeStep === 1 && (
              <>
                {
            !showOtp ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-xl font-semibold text-center mb-4">
                        Create Account
                    </h3>
                <label className='block text-gray-700 mb-1'>Name</label>
                <input type="text" 
                placeholder='Charles'
                className='w-full p-2 border border-gray-300 outline-0 rounded mb-1'
                {...register("name", {
                    required: "Name is required",
                  
                })}
                />
            
                {errors.name && (
                    <p className="text-red-500 text-sm">
                        {String(errors.name.message)}
                    </p>
                )}
                <label className='block text-gray-700 mb-1'>Email</label>
                <input type="email" 
                placeholder='whiskpalete@gmail.com'
                className='w-full p-2 border border-gray-300 outline-0 rounded mb-1'
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                    }
                })}
                />
            
                {errors.email && (
                    <p className="text-red-500 text-sm">
                        {String(errors.email.message)}
                    </p>
                )}

            <label className='block text-gray-700 mb-1'>Phone Number</label>
                <input type="tel" 
                placeholder='+234810****'
                className='w-full p-2 border border-gray-300 outline-0 rounded-full mb-1'
                {...register("phone_number", {
                    required: "Phone Number is required",
                    pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: "Invalid phone number format",
                    },
                    minLength: {
                        value: 10,
                         message: "Phone number must be at least 10 digits"
                    },
                    maxLength: {
                        value: 15,
                         message: "Phone number cannot exceed 15 digits"
                    },
                })}
                />

            {errors.phone_number && (
                    <p className="text-red-500 text-sm">
                        {String(errors.phone_number.message)}
                    </p>
                )}

            <label className='block text-gray-700 mb-1'> Country</label>
            <select className="w-full p-2 border border-gray-300 outline-0 rounded-3xl"
                {...register("country", {required: "Country is required"})}>

                    <option value=""> Select your country</option>
                    {
                        countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))
                    }
            </select>
           

            {errors.country && (
                    <p className="text-red-500 text-sm">
                        {String(errors.country.message)}
                    </p>
                )}

                
        <label className='block text-gray-700 mb-1'>Password</label>
        <div className="relative">
        <input type={passwordVissible ? "text" : "password"} 
                placeholder='Min. 6 characters'
                className='w-full p-2 border border-gray-300 outline-0 rounded mb-1'
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    }
                })}
                />

                <button type='button' onClick={() => setPasswordVisible(!passwordVissible)} className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
{passwordVissible ? <Eye/> : <EyeOff/>}
                </button>
                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {String(errors.password.message)}
                    </p>
                )}

              
                </div>
               
                <button
  type="submit"
  disabled={signupMutation.isPending}
  className="w-full text-lg cursor-pointer mt-4 bg-black text-white py-2 rounded-lg flex items-center justify-center"
>
  {signupMutation.isPending ? (
    <div className="h-7 w-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Signup"
  )}
</button>

{
    signupMutation.isError && 
    signupMutation.error instanceof AxiosError && (
        <p className="text-red-500 text-sm mt-2">
            {
                signupMutation.error.response?.data?.message || 
                signupMutation.error.message
            }
        </p>
    )
}

<div className="pt-3 text-center">
                        Already have an account?{" "}
                        <Link href={"/login"} className='text-orange-600'>
                        Login 
                        </Link>
                    </div>
                  
            </form>
            ) : (
                <div>
                    <h3 className="text-xl font-semibold text-center mb-4">
                        Enter Otp
                    </h3>
                    <div className="flex justify-center gap-6">
                        {otp?.map((digit, index) => (
                            <input key={index} type="text" ref={(el) => {
                                if(el) inputRefs.current[index] = el
                            }}
                            maxLength={1}
                            className='w-12 h-12 text-center border border-gray-300 outline-none rounded-xl' 
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index,e)}
                            />
                        ))}
                    </div>
                    <button className="w-full mt-4 text-lg cursor-pointer bg-orange-600 text-white py-2 rounded-lg  flex items-center justify-center"
                    disabled={verifyOtpMutation.isPending}
                    onClick={() => verifyOtpMutation.mutate()}
                    >
                        {  verifyOtpMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                         
                        </div>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                    <p className="text-center text-sm mt-4">
                        {canResend ? (
                            <button
                            onClick={resendOtp}
                            className='text-orange-600 cursor-pointer'>
                            Resend OTP
                            </button>
                        ) : (
                            `Resend OTP in ${timer} s`
                        )
                         }
                    </p>

                    {
                        verifyOtpMutation?.isError &&
                        verifyOtpMutation.error instanceof AxiosError && (
                            <p className="text-red-500 text-sm-mt-2">
                                {verifyOtpMutation.error.response?.data?.message ||
                                verifyOtpMutation.error.message}
                            </p>
                        )
                    }

                </div>
            )
        }
              </>
            )
        }
          {
        activeStep === 2 && (
            <CreateShop
            vendorId={vendorId}
            setActiveStep={setAtiveStep}
        
            />
            
        )
    }


          {
        activeStep === 3 && (
           <div className="text-center">
            <h3 className="text-2xl font-semi-bold">
                Withdraw Method
            </h3>
            <br />
            <button className="w-full m-auto flex items-center justify-center gap-3 text-lg bg-[#334155] text-white py-2 rounded-lg"
            onClick={connectPaystack}>
               <p className="ml-24 gap-3 flex justify-center">
               Connect Paystack <PaystackLogo/>
               </p>
            </button>
           </div>
        )
    }
    </div>

  
</div>
  )
}

export default Signup

