import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiTrello, FiArrowLeft } from 'react-icons/fi'
import { MdErrorOutline } from 'react-icons/md'
import { useToast } from '../../toast/ToastProvider'
import { useAuthenticate } from '../../useAuthenticate'
import { CreateAxios } from '../../CreateAxios'
import { setLoginInfo } from '../../LoginInfo'
import { CgProfile } from 'react-icons/cg'
import Inputs, { inputCls } from '../../controls/Inputs'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from 'react-icons/ai'

const images = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
]

const schema = yup.object().shape({
    userName: yup.string().required("Username is required"),
    password: yup.string().min(3, "Min 3 characters").max(15, "Max 15 characters").required("Password is required"),
})

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [authenticate, setAuthenticate] = useAuthenticate()
    const [show, setShow] = useState(false)

    const toast = useToast()

    const { handleChange, values, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues: { userName: "", password: "" },
        validationSchema: schema,
        onSubmit(val) { getLogin(val) }
    })

    const getLogin = (val) => {
        setLoading(true)
        CreateAxios.post("/ApplicationUser/Token", val)
            .then(res => {
                let mydata = res.data
                if (mydata) {
                    setAuthenticate({ isLogin: true, loginData: mydata })
                    setLoginInfo({ isLogin: true, loginData: mydata })
                } else {
                    toast.open(res.data.result.message, "text-red-400", <MdErrorOutline />)
                    setAuthenticate({ isLogin: false, loginData: "" })
                }
                setLoading(false)
            }).catch(() => {
                toast.open("Incorrect username or password!", "text-red-400", <MdErrorOutline />)
                setLoading(false)
            })
    }

    return (
        <div className="min-h-screen w-full flex bg-[#f1f5f9]">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-sky-300 to-sky-400">
                <div className="absolute inset-0 grid grid-cols-2">
                    <img src={images[0]} alt="" className="col-span-1 row-span-1 w-full h-full object-cover " />
                    <img src={images[1]} alt="" className="col-span-1 row-span-2 w-full h-full object-cover " />
                    <img src={images[2]} alt="" className="col-span-1 row-span-1 w-full h-full object-cover " />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/30 via-sky-300/30 to-sky-400/30" />

                <div className="relative z-10 flex flex-col justify-end p-12 text-white">
                    <h1 className="text-3xl font-bold mb-3">Task Manager</h1>
                    <p className="text-cyan-100 text-sm max-w-sm">
                        Plan, assign, and track your team's work — all in one place.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 relative flex items-center justify-center p-6 sm:p-10 overflow-hidden">
                <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-sky-600/20 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-sky-400/20 blur-2xl" />

                <div className="relative w-full max-w-sm bg-white/10 rounded-[20px] border border-gray-200 shadow-lg px-8 py-9">

                    <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                    <p className="text-sm text-gray-500 mt-1 mb-6">
                        Sign in to continue to your dashboard
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Inputs label="UserName" error={touched.userName && errors.userName}>
                            <CgProfile className="text-sky-500 shrink-0" size={20} />
                            <input
                                id="userName"
                                name="userName"
                                autoComplete="off"
                                placeholder="Enter UserName"
                                className={inputCls}
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>

                        <div className="relative">
                            <Inputs label="Password" error={touched.password && errors.password}>
                                <AiOutlineLock className="text-sky-500 shrink-0" size={20} />
                                <input
                                    id="password"
                                    name="password"
                                    type={show ? "text" : "password"}
                                    autoComplete="off"
                                    placeholder="Enter password"
                                    className={inputCls}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Inputs>
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                tabIndex={-1}
                                className="absolute right-3.5 top-[32px] text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {show ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                            </button>
                        </div>

                        <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="w-3.5 h-3.5 accent-sky-600 rounded"
                            />
                            <span className="text-xs text-gray-500">Keep me signed in</span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition
                ${loading
                                    ? "bg-gradient-to-br from-sky-300 to-sky-500 cursor-not-allowed"
                                    : "bg-gradient-to-br from-sky-300 to-sky-500 hover:from-sky-400 hover:to-sky-600 shadow-md"}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : "Sign in"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-[11px] text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="group w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/40 hover:bg-gray-100 text-sm font-medium text-gray-500 hover:text-gray-700 transition shadow-md"
                    >
                        <FiArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Go back
                    </button>
                </div>
            </div>
        </div>
    )
}