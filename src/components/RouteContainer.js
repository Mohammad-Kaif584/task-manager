import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import GetTaskByStatus from './app/Tasks/GetTaskByStatus'
import AddTask from './app/Tasks/AddTask'
import EditTask from './app/Tasks/EditTask'
import DeleteTask from './app/Tasks/DeleteTask'
import GetAll from './app/Tasks/GetAll'
import GetAllUser from './app/Users/GetAllUser'
import AddUser from './app/Users/AddUser'
import EditUser from './app/Users/EditUser'
import DeleteUser from './app/Users/DeleteUser'
import ChangePassword from './app/Users/ChangePassword'
import LoginPage from './auth/LoginPage'
import GetAllPage from './app/Tasks/GetAllPage'
import { useAuthenticate } from '../useAuthenticate'
import DashBoard from './app/DashBoard'
import AppLayout from '../controls/AppLayout'

export default function RouteContainer() {
    const [authenticate] = useAuthenticate()

    return (
        <BrowserRouter>
            <Routes>
                {authenticate.isLogin ? (
                    <>
                        {/* ── Protected routes inside AppLayout (Sidebar + Topbar) ── */}
                            <Route path="/dashboard" element={<DashBoard />} />

                        <Route element={<AppLayout />}>

                            <Route path="/tasks" element={<GetAll />} />
                            <Route path="/get/user" element={<GetAllUser />} />
                            <Route path="/profile" element={<ChangePassword />} />
                            <Route path="/status" element={<GetTaskByStatus />} />

                        </Route>

                        {/* ── Other protected routes (bina layout ke, pehle jaisi) ── */}
                        <Route path="/get" element={<GetAll />} />
                        <Route path="/get/user" element={<GetAllUser />} />
                        <Route path="/status" element={<GetTaskByStatus />} />
                        <Route path="/add" element={<AddTask />} />
                        <Route path="/edit" element={<EditTask />} />
                        <Route path="/delete" element={<DeleteTask />} />
                        <Route path="/adduser" element={<AddUser />} />
                        <Route path="/edituser" element={<EditUser />} />
                        <Route path="/deleteuser" element={<DeleteUser />} />
                        <Route path="/changepass" element={<ChangePassword />} />

                        {/* ── Redirect unknown → dashboard ── */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </>
                ) : (
                    <>
                        {/* ── Public routes ── */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/getAllPage" element={<GetAllPage />} />

                        {/* ── Redirect unknown → public page ── */}
                        <Route path="*" element={<Navigate to="/getAllPage" replace />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}