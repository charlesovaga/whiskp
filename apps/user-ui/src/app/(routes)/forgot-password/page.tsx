"use client"
import { useMutation } from '@tanstack/react-query'

import axios, { AxiosError } from 'axios'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import {useForm}  from "react-hook-form"
import toast from "react-hot-toast"
 
type FormData = {
    email: string
    password: string
}

function ForgotPassword() {
    const [step, setStep] = useState<"email" | "otp" | "reset">("email")
    const [otp, setOtp] = useState(["", "", "", "", "", "", ])
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [canResend, setcanResend] = useState(true)
    const [timer, setTimer] = useState(60)
    const [serverError, setServerError] = useState<string | null>(null)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const router = useRouter()

    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>()

    const startResendTimer = () => {
        setcanResend(false)
        setTimer(60)
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

    
    const requestOtpMutation = useMutation({
        mutationFn: async({email}: {email:string})=> {
            
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/forgot-password-user`,
        {email}
        )
        return response.data
        },
        onSuccess: (_, {email}) => {
            setUserEmail(email)
            setStep("otp")
            setServerError(null)
            setcanResend(false)
            startResendTimer()
    
          
        },
        onError: (error:AxiosError) => {
            const errorMessage =
            (
                error.response?.data as {message?: string}
            )?.message || "Invalid OTP. Please try again"
            setServerError(errorMessage)
        }
    })
    
    const verifyOtpMutation = useMutation({
        mutationFn: async()=> {

            if (!userEmail) return
            
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/verify-forgot-password-user`,
        {email: userEmail, otp: otp.join("")}
        )
        return response.data
        },
        onSuccess: () => {
         
            setStep("reset")
            setServerError(null)
          
        },
        onError: (error:AxiosError) => {
           
            const errorMessage =
            (
                error.response?.data as {message?: string}
            )?.message || "Invalid OTP. Please try again"
            setServerError(errorMessage)
        }
    })


    const resetPasswordMutation = useMutation({
        mutationFn: async({password}: {password:string})=> {
          if (!password) return
            console.error("Missing userEmail while resetting password") 
            
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/reset-password-user`,
        {email: userEmail, newPassword: password}
        )
        return response.data
        },
        onSuccess: () => {
          setStep("email")
           toast.success("Password reset successfully! Please login with your new password."
          )
            setServerError(null)
            router.push("/login")
          
        },
        onError: (error:AxiosError) => {
            const errorMessage =
            (
                error.response?.data as {message?: string}
            )?.message || "Failed to reset password. Please try again"
            setServerError(errorMessage)
        } 
    })

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
    const onSubmitEmail = ({email} : {email: string}) => {
        requestOtpMutation.mutate({email})
    }

    const onSubmitPassword = ({password} : {password: string}) => {
        resetPasswordMutation.mutate({password})
    }


    // const onSubmit = (data:FormData) => {
    //    console.log(data)
    // }
  return (
    <div className='w-full  py-10 min-h-[85vh] bg-[#f1f1f1]'>
        <h1 className="text-4xl font-poppins font-semibold text-black text-center">
            Forgot Password
        </h1>
        <p className="text-center text-lg font-medium py-3 text-[#00000099]">
            Home . Forgot Password
        </p>
      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg ">

            {
                step === "email" && (

                    <>
                              <h3 className="text-3xl font-semibold text-center mb-2">
                Login to Whiskp
            </h3>
            <p className="text-center text-gray-500 mb-4">
                Go back to? {" "}
                <Link href={"/login"} className="text-orange-600">
                Login
                </Link>
               
            </p>
          
    

            <form onSubmit={handleSubmit(onSubmitEmail)}>
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
                    <button type='submit' 
                    disabled={requestOtpMutation.isPending}
                    className="w-full text-lg cursor-pointer mt-4 bg-black text-white py-2 rounded-lg flex items-center justify-center">
                     {requestOtpMutation.isPending ? (
                        <div className="h-7 w-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Submit"
                    )}
                  
                    </button>
                    {serverError && (
                        <div className="text-red-500 text-sm mt-2">
                            {serverError}
                        </div>
                    )}
            </form>
            </>
                )
            }

            {
                step === "otp" && (
                    <>
                    <h3 className="text-3xl font-semibold text-center mb-2">
      Enter OTP
  </h3>
<div className="flex justify-center gap-6">
    {
        otp?.map((digit, index) => (
            <input
            key={index}
            ref={(el) => {
                if (el) inputRefs.current[index] = el
            }}
            type='text'
            maxLength={1}
            className='w-12 h-12 text-center border border-gray-300 outline-none rounded-xl' 
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index,e)}
            />
        ))
    }
</div>

<button 
 onClick={() => verifyOtpMutation.mutate()}
className="w-full mt-4 text-lg cursor-pointer bg-orange-600 text-white py-2 rounded-lg  flex items-center justify-center"
                    disabled={verifyOtpMutation.isPending}
                   
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
                            onClick={() => requestOtpMutation.mutate({email: userEmail!})}
                            className='text-orange-600 cursor-pointer'>
                            Resend OTP
                            </button>
                        ) : (
                            `Resend OTP in ${timer} s`
                        )
                         }
                    </p>

                    {serverError && (
              <div className="text-red-500 text-sm mt-2">
                  {serverError}
              </div>
          )}
  </>
                )
            }

            {
                step === "reset" && (
                    <>
                    <h3 className="text-xl font-semibold text-center mb-4">
                        Reset Password
                    </h3>
                    <form onSubmit={handleSubmit(onSubmitPassword)}>
                          <label className='block text-gray-700 mb-1'>New Password</label>
                                <input type= "password" 
                                        placeholder='Enter new password'
                                        className='w-full p-2 border border-gray-300 outline-0 rounded mb-1'
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            }
                                        })}
                                        />
                        
                                        <button type='submit'  className='w-full mt-4 text-lg cursor-pointer bg-black py-2 text-white flex items-center justify-center'
                                        disabled={resetPasswordMutation.isPending}>
                                     {  resetPasswordMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                         
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                       
                                        </button>
                                        {serverError && (
                                            <p className="text-red-500 text-sm">
                                               {serverError}
                                            </p>
                                        )}
                        
                                      
                                       
                    </form>
                    </>
                )
            }
  
        </div>
      </div>

      
    </div>
  )
}

export default ForgotPassword