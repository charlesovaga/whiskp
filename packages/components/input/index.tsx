import React, { forwardRef } from "react";

interface BaseProps {
  label?: string;
  type?: "text" | "password" | "email" | "number" | "textarea";
    className?: string;
}

type InputProps = BaseProps & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextareaProps

const Input = forwardRef<HTMLInputElement | HTMLInputElement, Props> (

 ({
    label,
    type="text",
    className,
    ...props
 }, ref) => {
return ( <div className="w-full">
    {label && <label className="block mb-1 font-semibold text-gray-300">{label}</label>}
    {type === "textarea" ? (
        <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        className={`w-full p-2 border outline-none  border-gray-700 rounded-md bg-transparent text-white ${className}`}
        {...(props as TextareaProps)}
        />
    ) : (
        <input
        ref={ref as React.Ref<HTMLInputElement>}
        type={type}
        className={`w-full p-2 border outline-none  border-gray-700 rounded-md bg-transparent text-white ${className}`}
        {...(props as InputProps)}
        />
    )}
</div>
)
 })

Input.displayName = "Input";

export default Input;