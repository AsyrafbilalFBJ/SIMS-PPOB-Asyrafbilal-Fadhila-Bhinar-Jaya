"use client";

import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye  } from "react-icons/fa6";

function Input({id, label, type, Icon, placeholder, value, onChange, errorMessage}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="max-w-md my-7">
            {label && (
                <div className="mb-2 block">
                    <Label htmlFor={id} value={label} className="text-cyan-600" />
                </div>
            )}
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Icon className={`w-3 h-3 text-gray-300 
                        ${
                            type === "password" && errorMessage && "text-red-500"
                        }
                        `} />
                </span>
                <input
                    id={id} type={type === "password" && showPassword ? "text" : type} value={value} onChange={onChange} placeholder={placeholder} 
                    className={`w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded focus:ring-black focus:border-black placeholder:text-gray-300
                        ${
                            type === "password" && errorMessage && "border-red-500 focus:border-red-500 focus:ring-red-500"
                        }
                        `}
                />
                {type === "password" && (
                    <span
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={()=>setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <FaRegEyeSlash className="w-3 h-3 text-gray-300" />
                        ) : (
                            <FaRegEye className="w-3 h-3 text-gray-300" />
                        )}
                    </span>
                )}
                <span className="absolute -bottom-5 right-0 flex text-xs text-red-500">{errorMessage}</span>
            </div>
        </div>
    );
}

export default Input
