import React, { useEffect, useState } from 'react';
import { createAxiosWithToken } from '../../../CreateAxios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Model from '../../../controls/Model';
import {
    AiOutlinePhone,
    AiOutlineUser,
    AiOutlineIdcard,
    AiOutlineLock,
} from "react-icons/ai";
import { MdOutlineDone, MdErrorOutline, MdPhoneInTalk, MdOutlineMailOutline } from "react-icons/md";
import { useToast } from '../../../toast/ToastProvider';
import { useAuthenticate } from '../../../useAuthenticate';
import Inputs, { inputCls } from "../../../controls/Inputs";
import { FaPhoneAlt } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import Button from '../../../controls/Button';

export default function AddUser({ isOpen, setIsOpen, id, getAllUser, editData }) {
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const [authenticate, setAuthenticate] = useAuthenticate()

    const schema = Yup.object().shape({
        userName: Yup.string().required("User Name is required").min(2).max(30),
        fullName: Yup.string().required("Full Name is required").min(3).max(30),
        phoneNumber: Yup.string().required("PhoneNo is required").matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
        address: Yup.string().required("Address is required").min(2).max(50),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required").min(6).max(20),
    });

    const { handleChange, handleSubmit, values, errors, touched, handleBlur, setValues, setFieldValue } = useFormik({
        initialValues: {
            id: "",
            userName: "",
            fullName: "",
            phoneNumber: "",
            address: "",
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit(val) {
            addUser(val);
        },
    });

    useEffect(() => {
        if (id)
            setValues(editData)
    }, [id])

    const addUser = (val) => {
        setLoading(true)
        createAxiosWithToken(authenticate.loginData.token).post('ApplicationUser/Add', val)
            .then(res => {
                console.log(res)
                if (res.data) {
                    toast.open("User Added Successfully.", "text-green-600", <MdOutlineDone />);
                    setIsOpen(!isOpen)
                    getAllUser()
                    setValues({
                        id: "",
                        userName: "",
                        fullName: "",
                        phoneNumber: "",
                        address: "",
                        email: "",
                        password: ""
                    });
                }
                else {
                    toast.open(res.data, "text-red-500", <MdErrorOutline />);
                }
                setLoading(false)
            })
            .catch(err => {
                console.error("Error Response:", err.response?.data);
                toast.open("Something went wrong!", "text-red-500", <MdErrorOutline />);
                setLoading(false)
            })
    };

    return (
        <Model title={id ? "Edit User" : "New User"} isOpen={isOpen} setIsOpen={setIsOpen}>

            <form onSubmit={handleSubmit} className="flex flex-col max-h-[70vh]">

                {/* Scrollable fields area — extra left/right padding on desktop */}
                <div className="px-5 md:px-8 py-5 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                        <Inputs label="User Name" error={touched.userName && errors.userName}>
                            <CgProfile className="text-blue-500 shrink-0" size={20} />
                            <input
                                id="userName"
                                name="userName"
                                autoComplete="off"
                                placeholder="Enter User Name"
                                className={inputCls}
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>

                        {/* ── Full Name ── */}
                        <Inputs label="Full Name" error={touched.fullName && errors.fullName}>
                            <AiOutlineIdcard className="text-purple-500 shrink-0" size={20} />
                            <input
                                id="fullName"
                                name="fullName"
                                autoComplete="off"
                                placeholder="Enter Full Name"
                                className={inputCls}
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>

                        <Inputs label="PhoneNo" error={touched.phoneNumber && errors.phoneNumber}>
                            <MdPhoneInTalk className="text-green-500 shrink-0" size={20} />

                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                autoComplete="off"
                                placeholder="Enter PhoneNumber"
                                className={inputCls}
                                maxLength={10}
                                value={values.phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    setFieldValue("phoneNumber", value);
                                }}
                                onBlur={handleBlur}
                            />
                        </Inputs>
                        <Inputs label="Address" error={touched.address && errors.address}>
                            <CiLocationOn className="text-blue-500 shrink-0" size={20} />
                            <input
                                id="address"
                                name="address"
                                autoComplete="off"
                                placeholder="Enter Address"
                                className={inputCls}
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>

                        <Inputs label="Email" error={touched.email && errors.email}>
                            <MdOutlineMailOutline className="text-gray-500 shrink-0" size={20} />
                            <input
                                id="email"
                                name="email"
                                autoComplete="off"
                                placeholder="Enter Email"
                                className={inputCls}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>

                        {/* ── Password ── */}
                        <Inputs label="Password" error={touched.password && errors.password}>
                            <AiOutlineLock className="text-amber-500 shrink-0" size={20} />
                            <input
                                id="password"
                                name="password"
                                autoComplete="off"
                                placeholder="Enter Password"
                                className={inputCls}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Inputs>

                    </div>
                </div>

                <div className="border-t border-slate-100 bg-white px-5 md:px-12 py-4 flex gap-3 shrink-0">
                    <Button
                        variant="cancel"
                        text="Cancel"
                        onClick={() => setIsOpen(false)}
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        text="Save"
                    />
                </div>
            </form>
        </Model>
    );
}