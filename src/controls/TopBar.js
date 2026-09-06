import { useState, useRef, useEffect } from "react";
import { useAuthenticate } from '../useAuthenticate'
import { setLoginInfo } from '../LoginInfo'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiLogOut, FiChevronDown } from "react-icons/fi";

export default function TopBar({ onToggle, sidebarOpen, user }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [, setAuthenticate] = useAuthenticate()
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setDropdownOpen(false)
        setAuthenticate({ isLogin: false, loginData: '' })
        setLoginInfo({ isLogin: false, loginData: '' })
        navigate('/login')
    }

    const initials = user?.userName
        ? user.userName.slice(0, 2).toUpperCase()
        : 'U'

    return (
        <div className="fixed top-0 left-0 w-full h-16 pt-2 flex items-center justify-between px-5 z-50 bg-white border-b border-slate-200 shadow-sm">

            {/* Left — Toggle + Brand */}
            <div className="flex items-center gap-2 md:gap-4">
                <button
                    onClick={onToggle}
                    className="md:block hidden p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                    aria-label="Toggle sidebar"
                >
                    <FiMenu size={19} />
                </button>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-8 h-8 animate-bounce rounded-lg flex items-center justify-center font-black text-white text-sm bg-gradient-to-br from-sky-400 to-sky-500">
                            T
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-gray-400 tracking-tight">Task</span>
                        <span className="text-lg font-black text-sky-500 tracking-tight">Manager</span>
                    </div>
                </div>

                <div className="hidden md:block h-5 w-px bg-slate-200 mx-1" />
                <span className="hidden md:block text-[11px] text-slate-400 font-medium tracking-widest uppercase">
                    Dashboard
                </span>
            </div>

            {/* Right — Badge + Avatar Dropdown */}
            <div className="flex items-center gap-3">

                {/* Username badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white text-sky-500 border border-sky-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {user?.userName || 'User'}
                </div>

                {/* Avatar dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border transition-all
                            ${dropdownOpen
                                ? "bg-slate-100 border-slate-300"
                                : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                            }`}
                    >
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold bg-gradient-to-br from-sky-400 to-sky-600">
                            {initials}
                        </div>
                        <div className="hidden sm:flex flex-col items-start leading-none gap-0.5">
                            <span className="text-[12px] font-semibold text-slate-700">
                                {user?.userName || 'User'}
                            </span>
                            <span className="text-[10px] text-slate-400">
                                {user?.email || ''}
                            </span>
                        </div>
                        <FiChevronDown
                            size={13}
                            className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden z-50 bg-white border border-slate-200 shadow-2xl shadow-slate-200/60">

                            {/* Profile Header */}
                            <div className="relative px-4 py-4 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200 overflow-hidden">
                                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-cyan-200 via-transparent to-transparent opacity-60" />
                                <div className="relative flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md bg-gradient-to-br from-sky-300 to-sky-500">
                                        {initials}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[13px] font-bold text-slate-800 truncate">
                                            {user?.userName || 'User'}
                                        </p>
                                        <p className="text-[10.5px] text-slate-400 mt-0.5 truncate">
                                            {user?.email || ''}
                                        </p>
                                        <span className="inline-flex items-center gap-1 mt-1.5 text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200">
                                            <span className="w-1 h-1 rounded-full bg-current" />
                                            User
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Button */}
                            <div className="py-2 px-2">
                                <button
                                    onClick={() => { setDropdownOpen(false); navigate('/profile') }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12.5px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-blue-500">
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                        </svg>
                                    </div>
                                    Profile
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="px-2 pb-2 border-t border-slate-100">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl text-[12.5px] text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
                                        <FiLogOut className="text-red-500" size={13} />
                                    </div>
                                    Logout
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}