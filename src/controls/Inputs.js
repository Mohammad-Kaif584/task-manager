import React from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md'

function Inputs({ label, error, children }) { 
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase pl-1">
                {label}
            </label>
            <div className={`
                flex items-center gap-2 w-full bg-white
                border rounded-xl px-3 py-2.5 shadow-sm
                transition-all duration-200
                focus-within:ring-2 focus-within:ring-sky-200 focus-within:border-sky-200
                ${error
                    ? "border-red-400 focus-within:ring-red-300"
                    : "border-slate-200 hover:border-sky-300"
                }
            `}>
                {children}
            </div>
            {error && (
                <p className="text-red-500 text-xs font-medium flex items-center gap-1 mt-0.5 pl-1">
                    <MdOutlineErrorOutline size={13} className="shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}

export const inputCls = `
    flex-1 bg-transparent text-sm text-slate-700
    placeholder:text-slate-400 outline-none
    [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0px_1000px_white_inset]
    [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_white_inset]
    [&:-webkit-autofill]:[-webkit-text-fill-color:#334155]
`;

export default Inputs