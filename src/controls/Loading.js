import React from "react";
import { BsTruck } from "react-icons/bs";

export default function Loading({ text = "Loading data...", Icon,bgColor="", color = "bg-red-400" }) {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className=" px-10 py-8 w-full max-w-md">
 
                <div className="flex justify-center mb-4">
                    <div className={`w-14 h-14 rounded-full ${bgColor} flex items-center justify-center animate-pulse`}>
                        {Icon}
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-center text-gray-800">
                    {text}
                </h3>

                <div className="flex justify-center gap-2 mt-4">
                    <span className={`w-2.5 h-2.5 ${color} rounded-full animate-bounce`}></span>
                    <span className={`w-2.5 h-2.5 ${color} rounded-full animate-bounce delay-150`}></span>
                    <span className={`w-2.5 h-2.5 ${color} rounded-full animate-bounce delay-300`}></span>
                </div>

            
            </div>
        </div>
    );
}
