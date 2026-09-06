import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './SideBar'
import TopBar from './TopBar'
import { useAuthenticate } from '../useAuthenticate'

const pageTitles = {
    '/dashboard': { title: 'Dashboard', sub: "Welcome back! Here's what's happening." },
    '/tasks': { title: 'All Tasks', sub: 'View and manage all your tasks.' },
    '/get/user': { title: 'All Users', sub: 'View and manage all application users.' },
    '/profile': { title: 'Profile', sub: 'Manage your account settings.' },
}

export default function AppLayout() {
    const location = useLocation()
    const [authenticate] = useAuthenticate()
    const user = authenticate?.loginData
    const page = pageTitles[location.pathname] || { title: 'Task Board', sub: '' }

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="w-full max-h-screen bg-white">

            <Sidebar
                user={user}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">

                <TopBar
                    user={user}
                    sidebarOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen(prev => !prev)}
                />

               <main className="flex-1 px-5 sm:px-8 pt-8 pb-28 mt-16">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}