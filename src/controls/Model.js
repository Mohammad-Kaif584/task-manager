import React from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'

export default function Modal({ isOpen, setIsOpen, title, children,icon }) {
  const changeIsOpen = () => setIsOpen(!isOpen)

  return createPortal(
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={
        (!isOpen ? "hidden " : "") +
        "flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full px-4 " +
        "bg-slate-900/40 backdrop-blur-sm"
      }
    >
      <div className="relative w-full max-w-xl">

        {/* Modal card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5  bg-gradient-to-br from-sky-500 to-sky-400">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-white tracking-tight">
                {title}
              </h3>
            </div>
            <button
              onClick={changeIsOpen}
              type="button"
              className="flex items-center justify-center w-7 h-7 rounded-lg
                bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600
                transition-all border border-slate-200"
            >
              <FiX size={14} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Body */}
          <div className="bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}