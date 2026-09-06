import React from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiList, FiFilter, FiArrowRight } from 'react-icons/fi'
import SideBar from '../../controls/SideBar'

export default function DashBoard() {

    const cards = [
        {
            to: "/get/user",
            icon: <FiUsers />,
            title: "Application Users",
            desc: "View and manage all registered users in the system.",
        },
        {
            to: "/tasks",
            icon: <FiList />,
            title: "All Tasks",
            desc: "Browse the complete list of tasks assigned across the team.",
        },
        {
            to: "/status",
            icon: <FiFilter />,
            title: "Filter by Status",
            desc: "Quickly filter tasks by Pending, In Progress, or Completed.",
        },
    ]

    return (
        <div className='min-h-screen'>

            {/* ── BOLD GRADIENT HERO ── */}
            <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-cyan-600 pb-20 pt-16 px-6 text-center relative overflow-hidden">

                {/* subtle glow decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>

                <h1 className="relative text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
                    Welcome to TaskManager
                </h1>
                <p className="relative text-sm sm:text-base text-sky-100 max-w-md mx-auto leading-relaxed">
                    Manage your tasks efficiently, stay organized, track progress, and achieve your goals with ease.
                </p>
            </div>

            {/* ── QUICK ACCESS (glass cards overlapping hero) ── */}
            <div className="max-w-4xl mx-auto px-6 -mt-12 relative pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {cards.map((card, i) => (
                        <Link
                            key={i}
                            to={card.to}
                            className="group bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-sky-500 text-white text-lg mb-5 transition-colors duration-300">
                                {card.icon}
                            </div>

                            <h3 className="text-base font-bold text-sky-700 mb-2 transition-colors">
                                {card.title}
                            </h3>

                            <p className="text-xs text-gray-400 leading-relaxed mb-4">{card.desc}</p>

                            <div className="flex items-center gap-1 text-xs font-semibold text-sky-600  transition-all">
                                Explore <FiArrowRight />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}