import React from 'react'
import { IoMdClose } from "react-icons/io";

export default function Toaster({ children, color = "white", Icon, id, close }) {
  return (
    <>
      <div id={id} class="flex items-center w-full max-w-xs">
        <div className='inline-flex items-center justify-center flex-shrink-0'>
        <div class={`flex items-center justify-center w-80 backdrop-blur-md ${color} bg-white border border-gray-200 rounded-xl shadow-xl px-5 py-4  animate-slide-in hover:scale-105 transition-transform duration-300 ease-in-out`}>
          {Icon &&
            <div class="flex-shrink-0  text-3xl">
              {Icon}
            </div>
          }
          <div class="ms-3 text-sm font-normal">{children} </div>
          <button onClick={() => close(id)} type='button' class="text-gray-700 hover:text-gray-400 transition ml-auto mb-6" >
            <IoMdClose />
          </button>
        </div>
        </div>
      </div>
    </>
  )
}
