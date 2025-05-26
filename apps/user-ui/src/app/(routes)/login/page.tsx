"use client"
import { useMutation } from '@tanstack/react-query'
import GoogleButton from 'apps/user-ui/src/shared/components/google-button'
import axios, { AxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {useForm}  from "react-hook-form"
 
type FormData = {
    email: string
    password: string
}

function Login() {
    const [passwordVissible, setPasswordVisible] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const [rememberMe, setRememberMe] = useState(false)
    const router = useRouter()

    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>()

    const loginMutation = useMutation({
        mutationFn: async(data:FormData)=> {
            
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/login-user`,
            data,
            {withCredentials: true}
        )
        return response.data
        },
        onSuccess: (data) => {
            setServerError(null)
            router.push("/")
        },
        onError: (error:AxiosError) => {
            const errorMessage =
            (
                error.response?.data as {message?: string}
            )?.message || "Invalid credentials"
            setServerError(errorMessage)
        }
    })

    const onSubmit = (data:FormData) => {
        loginMutation.mutate(data)
    }
  return (
    <div className='w-full  py-10 min-h-[85vh] bg-[#f1f1f1]'>
        <h1 className="text-4xl font-poppins font-semibold text-black text-center">
            Login
        </h1>
        <p className="text-center text-lg font-medium py-3 text-[#00000099]">
            Home . Login
        </p>
      <div className="w-full flex justify-center">
        <div className="md:w-[480px] p-8 bg-white shadow rounded-lg ">
            <h3 className="text-3xl font-semibold text-center mb-2">
                Login to Whiskp
            </h3>
            <p className="text-center text-gray-500 mb-4">
                Don't have an account? {" "}
                <Link href={"/signup"} className="text-orange-600">
                Sign up
                </Link>
               
            </p>
            <GoogleButton/>
            <div className="flex items-center my-5 text-gray-400 text-sm">
                <div className="flex-1 border-t border-gray-300"/>

               <span className="px-3">or Sign in with Email</span>
               <div className="flex-1 border-t border-gray-300"/>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <div className="flex justify-between items-center my-4">
                <label className='flex items-center text-gray-600 '>
                    <input type="checkbox" className='mr-2' checked={rememberMe} onChange= {() => setRememberMe(!rememberMe)} />
                    Remember me
                </label>
                <Link href={"/forgot-password"} className='text-orange-500 text-sm'>
                Forgot Password?
                </Link>
                </div>
                    <button type='submit' 
                    disabled={loginMutation.isPending}
                    className="w-full text-lg cursor-pointer bg-black text-white py-2 rounded-lg flex items-center justify-center">
                     {loginMutation.isPending ? (
                        <div className="h-7 w-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Login"
                    )}
                    </button>
                    {serverError && (
                        <div className="text-red-500 text-sm mt-2">
                            {serverError}
                        </div>
                    )}
            </form>
        </div>
      </div>

      
    </div>
  )
}

export default Login



// <div className="flex min-h-screen bg-gray-50">
// {/* Left Side - Description */}
// <div className="w-1/2 flex flex-col items-start justify-center text-black p-8 relative">
//   <p className="ml-10 text-xl font-medium max-w-md pt-28 font-Poppins">
//     <span className="text-justify text-7xl text-slate-600">
//    <strong>Whiskp</strong> <br />
//     </span>
//     Whiskp is a modern food delivery platform that connects users with meals from local restaurants, home kitchens, and food vendors — all in one place. Designed for speed and simplicity, it lets you browse menus, customize orders, track deliveries in real-time, and schedule meals with ease across web and mobile.
//     <br />
//     {/* <span className="font-semibold">Now connected in one convenient place.</span> */}
//   </p>
// </div>

// {/* Right Side - Login Box */}
// <div className="w-1/2 flex items-center justify-center">
//   <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">
//     <h2 className="text-2xl font-extrabold text-black">Welcome</h2>
//     <p className="text-sm text-gray-600 mt-2">
//       Sign in below to manage your Whiskp account and more.
//     </p>

//     {/* Login Form */}
//     <form className="mt-6 space-y-4">
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email address
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           required
//           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//         />
//       </div>

//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           required
//           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full flex justify-center py-2 px-4 border border-transparent
//           rounded-full shadow-sm text-sm font-medium text-white bg-orange-500
//           hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2
//           focus:ring-orange-500 transition duration-150 ease-in-out"
//       >
//         Sign In
//       </button>
//     </form>

//     <p className="mt-8 text-center text-sm text-gray-400">
//       New to Whiskp?{' '}
//       <a href="/signup" className="font-medium text-orange-500 hover:text-orange-400">
//         Create an account
//       </a>
//     </p>
//   </div>
// </div>
// </div>