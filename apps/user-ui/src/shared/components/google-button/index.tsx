import React from 'react'

function GoogleButton() {
  return (
    <div className='w-full flex justify-center'>
        <div className="h-[46px] cursor-pointer border border-blue-100 hover:bg-slate-50 flex items-center gap-2 px-3 rounded-[4px] my-2 bg-[rgba(210, 227,252,0.3)]">

        <svg
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  viewBox="0 0 48 48"
>
  <path
    fill="#4285F4"
    d="M24 9.5c3.54 0 6.29 1.47 8.2 3.41l6.1-6.1C34.68 2.88 29.74 0 24 0 14.89 0 7.05 5.84 3.72 14.19l7.65 5.94C13.16 14.2 18.2 9.5 24 9.5z"
  />
  <path
    fill="#34A853"
    d="M46.06 24.55c0-1.53-.14-3.01-.4-4.45H24v8.43h12.4c-.53 2.87-2.15 5.31-4.58 6.94l7.4 5.78C43.96 36.46 46.06 30.91 46.06 24.55z"
  />
  <path
    fill="#FBBC05"
    d="M11.37 28.12a14.43 14.43 0 010-8.24l-7.65-5.94a23.93 23.93 0 000 20.13l7.65-5.95z"
  />
  <path
    fill="#EA4335"
    d="M24 48c6.48 0 11.91-2.14 15.87-5.8l-7.4-5.78c-2.06 1.38-4.7 2.21-8.47 2.21-5.8 0-10.74-4.7-12.48-10.94l-7.65 5.95C7.05 42.16 14.89 48 24 48z"
  />
  <path fill="none" d="M0 0h48v48H0z" />
</svg>
<span className="text-[16px] opacity-[.8] font-Poppins "></span>
Sign In with Google
        </div>
    </div>
  )
}

export default GoogleButton
